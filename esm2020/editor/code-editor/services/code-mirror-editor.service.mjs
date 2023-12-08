/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, filter, map } from 'rxjs';
import { EditorState } from '@codemirror/state';
import { EditorView, placeholder as placeholderExtension } from '@codemirror/view';
import { EmbeddedTutorialManager } from '../../services/embedded-tutorial-manager.service';
import { NodeRuntimeSandbox } from '../../services/node-runtime-sandbox.service';
import { TypingsLoader } from '../../services/typings-loader.service';
import { CODE_EDITOR_EXTENSIONS } from '../constants/code-editor-extensions';
import { LANGUAGES } from '../constants/code-editor-languages';
import { getAutocompleteExtension } from '../extensions/autocomplete';
import { getDiagnosticsExtension } from '../extensions/diagnostics';
import { getTooltipExtension } from '../extensions/tooltip';
import { DiagnosticsState } from './diagnostics-state.service';
import { NodeRuntimeState } from '../../services/node-runtime-state.service';
/**
 * The delay between the last typed character and the actual file save.
 * This is used to prevent saving the file on every keystroke.
 *
 * Important! this value is intentionally set a bit higher than it needs to be, because sending
 * changes too frequently to the web container appears to put it in a state where it stops picking
 * up changes. See issue #691 for context.
 */
export const EDITOR_CONTENT_CHANGE_DELAY_MILLIES = 500;
const INITIAL_STATES = {
    _editorView: null,
    files: [],
    currentFile: {
        filename: '',
        content: '',
        language: LANGUAGES['ts'],
    },
    contentChangeListenerSubscription$: undefined,
    tutorialChangeListener$: undefined,
    createdFile$: undefined,
};
let CodeMirrorEditor = class CodeMirrorEditor {
    constructor() {
        // TODO: handle files created by the user, e.g. after running `ng generate component`
        this.files = signal(INITIAL_STATES.files);
        this.openFiles = signal(INITIAL_STATES.files);
        this.currentFile = signal(INITIAL_STATES.currentFile);
        // An instance of web worker used to run virtual TypeScript environment in the browser.
        // It allows to enrich CodeMirror UX for TypeScript files.
        this.tsVfsWorker = null;
        // EventManager gives ability to communicate between tsVfsWorker and CodeMirror instance
        this.eventManager$ = new Subject();
        this.nodeRuntimeSandbox = inject(NodeRuntimeSandbox);
        this.nodeRuntimeState = inject(NodeRuntimeState);
        this.embeddedTutorialManager = inject(EmbeddedTutorialManager);
        this.typingsLoader = inject(TypingsLoader);
        this.destroyRef = inject(DestroyRef);
        this.diagnosticsState = inject(DiagnosticsState);
        this._editorView = INITIAL_STATES._editorView;
        this._editorStates = new Map();
        this.contentChanged$ = new Subject();
        this.contentChangeListener$ = this.contentChanged$.asObservable();
        this.contentChangeListenerSubscription$ = INITIAL_STATES.contentChangeListenerSubscription$;
        this.tutorialChangeListener$ = INITIAL_STATES.tutorialChangeListener$;
        this.createdFileListener$ = INITIAL_STATES.createdFile$;
        // Method is responsible for sending request to Typescript VFS worker.
        this.sendRequestToTsVfs = (request) => {
            if (!this.tsVfsWorker)
                return;
            // Send message to tsVfsWorker only when current file is TypeScript file.
            if (!this.currentFile().filename.endsWith('.ts'))
                return;
            this.tsVfsWorker.postMessage(request);
            // tslint:disable-next-line:semicolon
        };
    }
    init(parentElement) {
        if (this._editorView)
            return;
        if (!this.nodeRuntimeState.error()) {
            this.initTypescriptVfsWorker();
            this.saveLibrariesTypes();
        }
        this._editorView = new EditorView({
            parent: parentElement,
            state: this.createEditorState(),
            dispatchTransactions: (transactions, view) => {
                view.update(transactions);
                for (const transaction of transactions) {
                    if (transaction.docChanged && this.currentFile().filename) {
                        this.contentChanged$.next(transaction.state.doc.toString());
                        this.changeFileContentsOnRealTime(transaction);
                    }
                }
            },
        });
        this.listenToProjectChanges();
        this.contentChangeListenerSubscription$ = this.contentChangeListener$
            .pipe(debounceTime(EDITOR_CONTENT_CHANGE_DELAY_MILLIES), takeUntilDestroyed(this.destroyRef))
            .subscribe(async (fileContents) => {
            await this.changeFileContentsScheduled(fileContents);
        });
        this.createdFileListener$ = this.nodeRuntimeSandbox.createdFile$.subscribe(async (createdFile) => {
            await this.addCreatedFileToCodeEditor(createdFile);
        });
        // Create TypeScript virtual filesystem when default files map is created
        // and files are set
        this.eventManager$
            .pipe(filter((event) => event.action === "default-fs-ready" /* TsVfsWorkerActions.INIT_DEFAULT_FILE_SYSTEM_MAP */ &&
            this.files().length > 0), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.createVfsEnv();
        });
    }
    disable() {
        this._editorView?.destroy();
        this._editorView = null;
        this._editorView = INITIAL_STATES._editorView;
        this.files.set(INITIAL_STATES.files);
        this.currentFile.set(INITIAL_STATES.currentFile);
        this._editorStates.clear();
        this.contentChangeListenerSubscription$?.unsubscribe();
        this.contentChangeListenerSubscription$ = INITIAL_STATES.contentChangeListenerSubscription$;
        this.tutorialChangeListener$?.unsubscribe();
        this.tutorialChangeListener$ = INITIAL_STATES.tutorialChangeListener$;
        this.createdFileListener$?.unsubscribe();
        this.createdFileListener$ = INITIAL_STATES.createdFile$;
    }
    changeCurrentFile(fileName) {
        if (!this._editorView)
            return;
        const newFile = this.files().find((file) => file.filename === fileName);
        if (!newFile)
            throw new Error(`File '${fileName}' not found`);
        this.currentFile.set(newFile);
        const editorState = this._editorStates.get(newFile.filename) ?? this.createEditorState();
        this._editorView.setState(editorState);
    }
    initTypescriptVfsWorker() {
        if (this.tsVfsWorker) {
            return;
        }
        this.tsVfsWorker = new Worker('./workers/typescript-vfs.worker', { type: 'module' });
        this.tsVfsWorker.addEventListener('message', ({ data }) => {
            this.eventManager$.next(data);
        });
    }
    saveLibrariesTypes() {
        this.typingsLoader.typings$
            .pipe(filter((typings) => typings.length > 0), takeUntilDestroyed(this.destroyRef))
            .subscribe((typings) => {
            this.sendRequestToTsVfs({
                action: "define-types-request" /* TsVfsWorkerActions.DEFINE_TYPES_REQUEST */,
                data: typings,
            });
            // Reset current file to trigger diagnostics after preload @angular libraries.
            this._editorView?.setState(this._editorStates.get(this.currentFile().filename));
        });
    }
    getVfsEnvFileSystemMap() {
        const fileSystemMap = new Map();
        for (const file of this.files().filter((file) => file.filename.endsWith('.ts'))) {
            fileSystemMap.set(`/${file.filename}`, file.content);
        }
        return fileSystemMap;
    }
    /**
     * Create virtual environment for TypeScript files
     */
    createVfsEnv() {
        this.sendRequestToTsVfs({
            action: "create-vfs-env-request" /* TsVfsWorkerActions.CREATE_VFS_ENV_REQUEST */,
            data: this.getVfsEnvFileSystemMap(),
        });
    }
    /**
     * Update virtual TypeScript file system with current code editor files
     */
    updateVfsEnv() {
        this.sendRequestToTsVfs({
            action: "update-vfs-env-request" /* TsVfsWorkerActions.UPDATE_VFS_ENV_REQUEST */,
            data: this.getVfsEnvFileSystemMap(),
        });
    }
    listenToProjectChanges() {
        this.tutorialChangeListener$ = this.embeddedTutorialManager.tutorialChanged$
            .pipe(map(() => this.embeddedTutorialManager.tutorialFiles()), filter((tutorialFiles) => Object.keys(tutorialFiles).length > 0), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.changeProject();
        });
    }
    changeProject() {
        this.setProjectFiles();
        this._editorStates.clear();
        this.changeCurrentFile(this.currentFile().filename);
        this.updateVfsEnv();
    }
    setProjectFiles() {
        const tutorialFiles = this.getTutorialFiles(this.embeddedTutorialManager.tutorialFiles());
        const openFiles = [];
        // iterate openFiles to keep files order
        for (const openFileName of this.embeddedTutorialManager.openFiles()) {
            const openFile = tutorialFiles.find(({ filename }) => filename === openFileName);
            if (openFile) {
                openFiles.push(openFile);
            }
        }
        this.files.set(tutorialFiles);
        this.openFiles.set(openFiles);
        this.changeCurrentFile(openFiles[0].filename);
    }
    /**
     * Update the code editor files when files are created
     */
    async addCreatedFileToCodeEditor(createdFile) {
        const fileContents = await this.nodeRuntimeSandbox.readFile(createdFile);
        this.embeddedTutorialManager.tutorialFiles.update((files) => ({
            ...files,
            [createdFile]: fileContents,
        }));
        this.embeddedTutorialManager.openFiles.update((files) => [...files, createdFile]);
        this.setProjectFiles();
        this.updateVfsEnv();
        this.saveLibrariesTypes();
    }
    async createFile(filename) {
        // if file already exists, use its content
        const content = await this.nodeRuntimeSandbox.readFile(filename).catch((error) => {
            // empty content if file does not exist
            if (error.message.includes('ENOENT'))
                return '';
            else
                throw error;
        });
        await this.nodeRuntimeSandbox.writeFile(filename, content);
        this.embeddedTutorialManager.tutorialFiles.update((files) => ({
            ...files,
            [filename]: content,
        }));
        this.embeddedTutorialManager.openFiles.update((files) => [...files, filename]);
        this.setProjectFiles();
        this.updateVfsEnv();
        this.saveLibrariesTypes();
        this.changeCurrentFile(filename);
    }
    async deleteFile(deletedFile) {
        await this.nodeRuntimeSandbox.deleteFile(deletedFile);
        this.embeddedTutorialManager.tutorialFiles.update((files) => {
            delete files[deletedFile];
            return files;
        });
        this.embeddedTutorialManager.openFiles.update((files) => files.filter((file) => file !== deletedFile));
        this.setProjectFiles();
        this.updateVfsEnv();
        this.saveLibrariesTypes();
    }
    createEditorState() {
        const newEditorState = EditorState.create({
            doc: this.currentFile().content,
            extensions: [
                ...CODE_EDITOR_EXTENSIONS,
                this.currentFile().language,
                placeholderExtension('Type your code here...'),
                ...this.getLanguageExtensions(),
            ],
        });
        this._editorStates.set(this.currentFile().filename, newEditorState);
        return newEditorState;
    }
    getLanguageExtensions() {
        if (this.currentFile().filename.endsWith('.ts')) {
            return [
                getAutocompleteExtension(this.eventManager$, this.currentFile, this.sendRequestToTsVfs),
                getDiagnosticsExtension(this.eventManager$, this.currentFile, this.sendRequestToTsVfs, this.diagnosticsState),
                getTooltipExtension(this.eventManager$, this.currentFile, this.sendRequestToTsVfs),
            ];
        }
        return [];
    }
    /**
     * Write the new file contents to the sandbox filesystem
     */
    async changeFileContentsScheduled(newContent) {
        try {
            await this.nodeRuntimeSandbox.writeFile(this.currentFile().filename, newContent);
        }
        catch (err) {
            // Note: `writeFile` throws if the sandbox is not initialized yet, which can happen if
            // the user starts typing right after the page loads.
            // Here the error is ignored as it is expected.
        }
    }
    /**
     * Change file contents on files signals and update the editor state
     */
    changeFileContentsOnRealTime(transaction) {
        this._editorStates.set(this.currentFile().filename, transaction.state);
        const newContent = transaction.state.doc.toString();
        this.currentFile.update((currentFile) => ({ ...currentFile, content: newContent }));
        this.files.update((files) => files.map((file) => file.filename === this.currentFile().filename ? { ...file, content: newContent } : file));
        // send current file content to Ts Vfs worker to run diagnostics on current file state
        this.sendRequestToTsVfs({
            action: "code-changed" /* TsVfsWorkerActions.CODE_CHANGED */,
            data: {
                file: this.currentFile().filename,
                code: newContent,
            },
        });
    }
    getTutorialFiles(files) {
        const languagesExtensions = Object.keys(LANGUAGES);
        const tutorialFiles = Object.entries(files)
            .filter((fileAndContent) => typeof fileAndContent[1] === 'string')
            .map(([filename, content]) => {
            const extension = languagesExtensions.find((extension) => filename.endsWith(extension));
            const language = extension ? LANGUAGES[extension] : LANGUAGES['ts'];
            return {
                filename,
                content,
                language,
            };
        });
        return tutorialFiles;
    }
};
CodeMirrorEditor = __decorate([
    Injectable({ providedIn: 'root' })
], CodeMirrorEditor);
export { CodeMirrorEditor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1taXJyb3ItZWRpdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9jb2RlLWVkaXRvci9zZXJ2aWNlcy9jb2RlLW1pcnJvci1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyxPQUFPLEVBQWdCLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRXRFLE9BQU8sRUFBQyxXQUFXLEVBQWMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsVUFBVSxFQUFFLFdBQVcsSUFBSSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWpGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUdwRSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDN0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFJN0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFHM0U7Ozs7Ozs7R0FPRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1DQUFtQyxHQUFHLEdBQUcsQ0FBQztBQUV2RCxNQUFNLGNBQWMsR0FBRztJQUNyQixXQUFXLEVBQUUsSUFBSTtJQUVqQixLQUFLLEVBQUUsRUFBRTtJQUVULFdBQVcsRUFBRTtRQUNYLFFBQVEsRUFBRSxFQUFFO1FBQ1osT0FBTyxFQUFFLEVBQUU7UUFDWCxRQUFRLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQztLQUMxQjtJQUVELGtDQUFrQyxFQUFFLFNBQVM7SUFDN0MsdUJBQXVCLEVBQUUsU0FBUztJQUNsQyxZQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDO0FBR0ssSUFBTSxnQkFBZ0IsR0FBdEIsTUFBTSxnQkFBZ0I7SUFBdEI7UUFDTCxxRkFBcUY7UUFDckYsVUFBSyxHQUFHLE1BQU0sQ0FBZSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsY0FBUyxHQUFHLE1BQU0sQ0FBZSxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxNQUFNLENBQWEsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTdELHVGQUF1RjtRQUN2RiwwREFBMEQ7UUFDbEQsZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO1FBQzFDLHdGQUF3RjtRQUN2RSxrQkFBYSxHQUFHLElBQUksT0FBTyxFQUFpQixDQUFDO1FBRTdDLHVCQUFrQixHQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hELHFCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVDLDRCQUF1QixHQUFHLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFELGtCQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3RDLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMscUJBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFckQsZ0JBQVcsR0FBc0IsY0FBYyxDQUFDLFdBQVcsQ0FBQztRQUNuRCxrQkFBYSxHQUFHLElBQUksR0FBRyxFQUF1QyxDQUFDO1FBRS9ELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUN4QywyQkFBc0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RFLHVDQUFrQyxHQUN4QyxjQUFjLENBQUMsa0NBQWtDLENBQUM7UUFFNUMsNEJBQXVCLEdBQzdCLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQztRQUVqQyx5QkFBb0IsR0FBNkIsY0FBYyxDQUFDLFlBQVksQ0FBQztRQXFIckYsc0VBQXNFO1FBQzlELHVCQUFrQixHQUFHLENBQUksT0FBeUIsRUFBRSxFQUFFO1lBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFBRSxPQUFPO1lBRTlCLHlFQUF5RTtZQUN6RSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUFFLE9BQU87WUFFekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEMscUNBQXFDO1FBQ3ZDLENBQUMsQ0FBQztJQTBPSixDQUFDO0lBdFdDLElBQUksQ0FBQyxhQUEwQjtRQUM3QixJQUFJLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUU3QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDaEMsTUFBTSxFQUFFLGFBQWE7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMvQixvQkFBb0IsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFMUIsS0FBSyxNQUFNLFdBQVcsSUFBSSxZQUFZLEVBQUUsQ0FBQztvQkFDdkMsSUFBSSxXQUFXLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNqRCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLGtDQUFrQyxHQUFHLElBQUksQ0FBQyxzQkFBc0I7YUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM1RixTQUFTLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUN4RSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUU7WUFDcEIsTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUNGLENBQUM7UUFFRix5RUFBeUU7UUFDekUsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxhQUFhO2FBQ2YsSUFBSSxDQUNILE1BQU0sQ0FDSixDQUFDLEtBQUssRUFBRSxFQUFFLENBQ1IsS0FBSyxDQUFDLE1BQU0sNkVBQW9EO1lBQ2hFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUMxQixFQUNELGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDcEM7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRWpELElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxrQ0FBa0MsR0FBRyxjQUFjLENBQUMsa0NBQWtDLENBQUM7UUFFNUYsSUFBSSxDQUFDLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxjQUFjLENBQUMsdUJBQXVCLENBQUM7UUFFdEUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDO0lBQzFELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxRQUFnQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBRTlCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLE9BQU87WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsUUFBUSxhQUFhLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLHVCQUF1QjtRQUM3QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsaUNBQWlDLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUVuRixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUE4QixFQUFFLEVBQUU7WUFDbkYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUTthQUN4QixJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUN2QyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQ3BDO2FBQ0EsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dCQUN0QixNQUFNLHNFQUF5QztnQkFDL0MsSUFBSSxFQUFFLE9BQU87YUFDZCxDQUFDLENBQUM7WUFFSCw4RUFBOEU7WUFDOUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBYU8sc0JBQXNCO1FBQzVCLE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBRWhELEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hGLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBc0I7WUFDM0MsTUFBTSwwRUFBMkM7WUFDakQsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBc0I7WUFDM0MsTUFBTSwwRUFBMkM7WUFDakQsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtTQUNwQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sc0JBQXNCO1FBQzVCLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCO2FBQ3pFLElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQ3ZELE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ2hFLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDcEM7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGFBQWE7UUFDbkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLGVBQWU7UUFDckIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRTFGLE1BQU0sU0FBUyxHQUFpQixFQUFFLENBQUM7UUFFbkMsd0NBQXdDO1FBQ3hDLEtBQUssTUFBTSxZQUFZLElBQUksSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUM7WUFDcEUsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsQ0FBQztZQUUvRSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNLLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxXQUFtQjtRQUMxRCxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUQsR0FBRyxLQUFLO1lBQ1IsQ0FBQyxXQUFXLENBQUMsRUFBRSxZQUFZO1NBQzVCLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUVsRixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQWdCO1FBQy9CLDBDQUEwQztRQUMxQyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDL0UsdUNBQXVDO1lBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUFFLE9BQU8sRUFBRSxDQUFDOztnQkFDM0MsTUFBTSxLQUFLLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVELEdBQUcsS0FBSztZQUNSLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTztTQUNwQixDQUFDLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFL0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBbUI7UUFDbEMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDMUQsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDdEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUM3QyxDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDeEMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPO1lBQy9CLFVBQVUsRUFBRTtnQkFDVixHQUFHLHNCQUFzQjtnQkFFekIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVE7Z0JBRTNCLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDO2dCQUU5QyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRTthQUNoQztTQUNGLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFcEUsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDaEQsT0FBTztnQkFDTCx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dCQUN2Rix1QkFBdUIsQ0FDckIsSUFBSSxDQUFDLGFBQWEsRUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQ3RCO2dCQUNELG1CQUFtQixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDbkYsQ0FBQztRQUNKLENBQUM7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7T0FFRztJQUNLLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxVQUFrQjtRQUMxRCxJQUFJLENBQUM7WUFDSCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRixDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLHNGQUFzRjtZQUN0RixxREFBcUQ7WUFDckQsK0NBQStDO1FBQ2pELENBQUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSyw0QkFBNEIsQ0FBQyxXQUF3QjtRQUMzRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2RSxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVwRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDakIsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN0RixDQUNGLENBQUM7UUFFRixzRkFBc0Y7UUFDdEYsSUFBSSxDQUFDLGtCQUFrQixDQUFvQjtZQUN6QyxNQUFNLHNEQUFpQztZQUN2QyxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRO2dCQUNqQyxJQUFJLEVBQUUsVUFBVTthQUNqQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxLQUEyQjtRQUNsRCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7YUFDeEMsTUFBTSxDQUNMLENBQUMsY0FBYyxFQUFzQyxFQUFFLENBQ3JELE9BQU8sY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FDeEM7YUFDQSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQzNCLE1BQU0sU0FBUyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3hGLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEUsT0FBTztnQkFDTCxRQUFRO2dCQUNSLE9BQU87Z0JBQ1AsUUFBUTthQUNULENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVMLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRixDQUFBO0FBdFlZLGdCQUFnQjtJQUQ1QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7R0FDcEIsZ0JBQWdCLENBc1k1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEZXN0cm95UmVmLCBJbmplY3RhYmxlLCBpbmplY3QsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGRlYm91bmNlVGltZSwgZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0VkaXRvclN0YXRlLCBUcmFuc2FjdGlvbn0gZnJvbSAnQGNvZGVtaXJyb3Ivc3RhdGUnO1xuaW1wb3J0IHtFZGl0b3JWaWV3LCBwbGFjZWhvbGRlciBhcyBwbGFjZWhvbGRlckV4dGVuc2lvbn0gZnJvbSAnQGNvZGVtaXJyb3Ivdmlldyc7XG5cbmltcG9ydCB7RW1iZWRkZWRUdXRvcmlhbE1hbmFnZXJ9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2VtYmVkZGVkLXR1dG9yaWFsLW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQge05vZGVSdW50aW1lU2FuZGJveH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm9kZS1ydW50aW1lLXNhbmRib3guc2VydmljZSc7XG5pbXBvcnQge1R5cGluZ3NMb2FkZXJ9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3R5cGluZ3MtbG9hZGVyLnNlcnZpY2UnO1xuXG5pbXBvcnQge0ZpbGVBbmRDb250ZW50UmVjb3JkfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL2luZGV4JztcbmltcG9ydCB7Q09ERV9FRElUT1JfRVhURU5TSU9OU30gZnJvbSAnLi4vY29uc3RhbnRzL2NvZGUtZWRpdG9yLWV4dGVuc2lvbnMnO1xuaW1wb3J0IHtMQU5HVUFHRVN9IGZyb20gJy4uL2NvbnN0YW50cy9jb2RlLWVkaXRvci1sYW5ndWFnZXMnO1xuaW1wb3J0IHtnZXRBdXRvY29tcGxldGVFeHRlbnNpb259IGZyb20gJy4uL2V4dGVuc2lvbnMvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7Z2V0RGlhZ25vc3RpY3NFeHRlbnNpb259IGZyb20gJy4uL2V4dGVuc2lvbnMvZGlhZ25vc3RpY3MnO1xuaW1wb3J0IHtnZXRUb29sdGlwRXh0ZW5zaW9ufSBmcm9tICcuLi9leHRlbnNpb25zL3Rvb2x0aXAnO1xuaW1wb3J0IHtEaWFnbm9zdGljc1N0YXRlfSBmcm9tICcuL2RpYWdub3N0aWNzLXN0YXRlLnNlcnZpY2UnO1xuaW1wb3J0IHtUc1Zmc1dvcmtlckFjdGlvbnN9IGZyb20gJy4uL3dvcmtlcnMvZW51bXMvYWN0aW9ucyc7XG5pbXBvcnQge0NvZGVDaGFuZ2VSZXF1ZXN0fSBmcm9tICcuLi93b3JrZXJzL2ludGVyZmFjZXMvY29kZS1jaGFuZ2UtcmVxdWVzdCc7XG5pbXBvcnQge0FjdGlvbk1lc3NhZ2V9IGZyb20gJy4uL3dvcmtlcnMvaW50ZXJmYWNlcy9tZXNzYWdlJztcbmltcG9ydCB7Tm9kZVJ1bnRpbWVTdGF0ZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm9kZS1ydW50aW1lLXN0YXRlLnNlcnZpY2UnO1xuaW1wb3J0IHtFZGl0b3JGaWxlfSBmcm9tICcuLi9pbnRlcmZhY2VzL2VkaXRvci1maWxlJztcblxuLyoqXG4gKiBUaGUgZGVsYXkgYmV0d2VlbiB0aGUgbGFzdCB0eXBlZCBjaGFyYWN0ZXIgYW5kIHRoZSBhY3R1YWwgZmlsZSBzYXZlLlxuICogVGhpcyBpcyB1c2VkIHRvIHByZXZlbnQgc2F2aW5nIHRoZSBmaWxlIG9uIGV2ZXJ5IGtleXN0cm9rZS5cbiAqXG4gKiBJbXBvcnRhbnQhIHRoaXMgdmFsdWUgaXMgaW50ZW50aW9uYWxseSBzZXQgYSBiaXQgaGlnaGVyIHRoYW4gaXQgbmVlZHMgdG8gYmUsIGJlY2F1c2Ugc2VuZGluZ1xuICogY2hhbmdlcyB0b28gZnJlcXVlbnRseSB0byB0aGUgd2ViIGNvbnRhaW5lciBhcHBlYXJzIHRvIHB1dCBpdCBpbiBhIHN0YXRlIHdoZXJlIGl0IHN0b3BzIHBpY2tpbmdcbiAqIHVwIGNoYW5nZXMuIFNlZSBpc3N1ZSAjNjkxIGZvciBjb250ZXh0LlxuICovXG5leHBvcnQgY29uc3QgRURJVE9SX0NPTlRFTlRfQ0hBTkdFX0RFTEFZX01JTExJRVMgPSA1MDA7XG5cbmNvbnN0IElOSVRJQUxfU1RBVEVTID0ge1xuICBfZWRpdG9yVmlldzogbnVsbCxcblxuICBmaWxlczogW10sXG5cbiAgY3VycmVudEZpbGU6IHtcbiAgICBmaWxlbmFtZTogJycsXG4gICAgY29udGVudDogJycsXG4gICAgbGFuZ3VhZ2U6IExBTkdVQUdFU1sndHMnXSxcbiAgfSxcblxuICBjb250ZW50Q2hhbmdlTGlzdGVuZXJTdWJzY3JpcHRpb24kOiB1bmRlZmluZWQsXG4gIHR1dG9yaWFsQ2hhbmdlTGlzdGVuZXIkOiB1bmRlZmluZWQsXG4gIGNyZWF0ZWRGaWxlJDogdW5kZWZpbmVkLFxufTtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQ29kZU1pcnJvckVkaXRvciB7XG4gIC8vIFRPRE86IGhhbmRsZSBmaWxlcyBjcmVhdGVkIGJ5IHRoZSB1c2VyLCBlLmcuIGFmdGVyIHJ1bm5pbmcgYG5nIGdlbmVyYXRlIGNvbXBvbmVudGBcbiAgZmlsZXMgPSBzaWduYWw8RWRpdG9yRmlsZVtdPihJTklUSUFMX1NUQVRFUy5maWxlcyk7XG4gIG9wZW5GaWxlcyA9IHNpZ25hbDxFZGl0b3JGaWxlW10+KElOSVRJQUxfU1RBVEVTLmZpbGVzKTtcbiAgY3VycmVudEZpbGUgPSBzaWduYWw8RWRpdG9yRmlsZT4oSU5JVElBTF9TVEFURVMuY3VycmVudEZpbGUpO1xuXG4gIC8vIEFuIGluc3RhbmNlIG9mIHdlYiB3b3JrZXIgdXNlZCB0byBydW4gdmlydHVhbCBUeXBlU2NyaXB0IGVudmlyb25tZW50IGluIHRoZSBicm93c2VyLlxuICAvLyBJdCBhbGxvd3MgdG8gZW5yaWNoIENvZGVNaXJyb3IgVVggZm9yIFR5cGVTY3JpcHQgZmlsZXMuXG4gIHByaXZhdGUgdHNWZnNXb3JrZXI6IFdvcmtlciB8IG51bGwgPSBudWxsO1xuICAvLyBFdmVudE1hbmFnZXIgZ2l2ZXMgYWJpbGl0eSB0byBjb21tdW5pY2F0ZSBiZXR3ZWVuIHRzVmZzV29ya2VyIGFuZCBDb2RlTWlycm9yIGluc3RhbmNlXG4gIHByaXZhdGUgcmVhZG9ubHkgZXZlbnRNYW5hZ2VyJCA9IG5ldyBTdWJqZWN0PEFjdGlvbk1lc3NhZ2U+KCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBub2RlUnVudGltZVNhbmRib3ggPSBpbmplY3QoTm9kZVJ1bnRpbWVTYW5kYm94KTtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlUnVudGltZVN0YXRlID0gaW5qZWN0KE5vZGVSdW50aW1lU3RhdGUpO1xuICBwcml2YXRlIHJlYWRvbmx5IGVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyID0gaW5qZWN0KEVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyKTtcbiAgcHJpdmF0ZSByZWFkb25seSB0eXBpbmdzTG9hZGVyID0gaW5qZWN0KFR5cGluZ3NMb2FkZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGlhZ25vc3RpY3NTdGF0ZSA9IGluamVjdChEaWFnbm9zdGljc1N0YXRlKTtcblxuICBwcml2YXRlIF9lZGl0b3JWaWV3OiBFZGl0b3JWaWV3IHwgbnVsbCA9IElOSVRJQUxfU1RBVEVTLl9lZGl0b3JWaWV3O1xuICBwcml2YXRlIHJlYWRvbmx5IF9lZGl0b3JTdGF0ZXMgPSBuZXcgTWFwPEVkaXRvckZpbGVbJ2ZpbGVuYW1lJ10sIEVkaXRvclN0YXRlPigpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29udGVudENoYW5nZWQkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbnRlbnRDaGFuZ2VMaXN0ZW5lciQgPSB0aGlzLmNvbnRlbnRDaGFuZ2VkJC5hc09ic2VydmFibGUoKTtcbiAgcHJpdmF0ZSBjb250ZW50Q2hhbmdlTGlzdGVuZXJTdWJzY3JpcHRpb24kOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQgPVxuICAgIElOSVRJQUxfU1RBVEVTLmNvbnRlbnRDaGFuZ2VMaXN0ZW5lclN1YnNjcmlwdGlvbiQ7XG5cbiAgcHJpdmF0ZSB0dXRvcmlhbENoYW5nZUxpc3RlbmVyJDogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkID1cbiAgICBJTklUSUFMX1NUQVRFUy50dXRvcmlhbENoYW5nZUxpc3RlbmVyJDtcblxuICBwcml2YXRlIGNyZWF0ZWRGaWxlTGlzdGVuZXIkOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQgPSBJTklUSUFMX1NUQVRFUy5jcmVhdGVkRmlsZSQ7XG5cbiAgaW5pdChwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lZGl0b3JWaWV3KSByZXR1cm47XG5cbiAgICBpZiAoIXRoaXMubm9kZVJ1bnRpbWVTdGF0ZS5lcnJvcigpKSB7XG4gICAgICB0aGlzLmluaXRUeXBlc2NyaXB0VmZzV29ya2VyKCk7XG4gICAgICB0aGlzLnNhdmVMaWJyYXJpZXNUeXBlcygpO1xuICAgIH1cblxuICAgIHRoaXMuX2VkaXRvclZpZXcgPSBuZXcgRWRpdG9yVmlldyh7XG4gICAgICBwYXJlbnQ6IHBhcmVudEVsZW1lbnQsXG4gICAgICBzdGF0ZTogdGhpcy5jcmVhdGVFZGl0b3JTdGF0ZSgpLFxuICAgICAgZGlzcGF0Y2hUcmFuc2FjdGlvbnM6ICh0cmFuc2FjdGlvbnMsIHZpZXcpID0+IHtcbiAgICAgICAgdmlldy51cGRhdGUodHJhbnNhY3Rpb25zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHRyYW5zYWN0aW9uIG9mIHRyYW5zYWN0aW9ucykge1xuICAgICAgICAgIGlmICh0cmFuc2FjdGlvbi5kb2NDaGFuZ2VkICYmIHRoaXMuY3VycmVudEZpbGUoKS5maWxlbmFtZSkge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50Q2hhbmdlZCQubmV4dCh0cmFuc2FjdGlvbi5zdGF0ZS5kb2MudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUZpbGVDb250ZW50c09uUmVhbFRpbWUodHJhbnNhY3Rpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMubGlzdGVuVG9Qcm9qZWN0Q2hhbmdlcygpO1xuXG4gICAgdGhpcy5jb250ZW50Q2hhbmdlTGlzdGVuZXJTdWJzY3JpcHRpb24kID0gdGhpcy5jb250ZW50Q2hhbmdlTGlzdGVuZXIkXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoRURJVE9SX0NPTlRFTlRfQ0hBTkdFX0RFTEFZX01JTExJRVMpLCB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSlcbiAgICAgIC5zdWJzY3JpYmUoYXN5bmMgKGZpbGVDb250ZW50cykgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmNoYW5nZUZpbGVDb250ZW50c1NjaGVkdWxlZChmaWxlQ29udGVudHMpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmNyZWF0ZWRGaWxlTGlzdGVuZXIkID0gdGhpcy5ub2RlUnVudGltZVNhbmRib3guY3JlYXRlZEZpbGUkLnN1YnNjcmliZShcbiAgICAgIGFzeW5jIChjcmVhdGVkRmlsZSkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLmFkZENyZWF0ZWRGaWxlVG9Db2RlRWRpdG9yKGNyZWF0ZWRGaWxlKTtcbiAgICAgIH0sXG4gICAgKTtcblxuICAgIC8vIENyZWF0ZSBUeXBlU2NyaXB0IHZpcnR1YWwgZmlsZXN5c3RlbSB3aGVuIGRlZmF1bHQgZmlsZXMgbWFwIGlzIGNyZWF0ZWRcbiAgICAvLyBhbmQgZmlsZXMgYXJlIHNldFxuICAgIHRoaXMuZXZlbnRNYW5hZ2VyJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICAoZXZlbnQpID0+XG4gICAgICAgICAgICBldmVudC5hY3Rpb24gPT09IFRzVmZzV29ya2VyQWN0aW9ucy5JTklUX0RFRkFVTFRfRklMRV9TWVNURU1fTUFQICYmXG4gICAgICAgICAgICB0aGlzLmZpbGVzKCkubGVuZ3RoID4gMCxcbiAgICAgICAgKSxcbiAgICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZiksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jcmVhdGVWZnNFbnYoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZGlzYWJsZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0b3JWaWV3Py5kZXN0cm95KCk7XG4gICAgdGhpcy5fZWRpdG9yVmlldyA9IG51bGw7XG5cbiAgICB0aGlzLl9lZGl0b3JWaWV3ID0gSU5JVElBTF9TVEFURVMuX2VkaXRvclZpZXc7XG4gICAgdGhpcy5maWxlcy5zZXQoSU5JVElBTF9TVEFURVMuZmlsZXMpO1xuICAgIHRoaXMuY3VycmVudEZpbGUuc2V0KElOSVRJQUxfU1RBVEVTLmN1cnJlbnRGaWxlKTtcblxuICAgIHRoaXMuX2VkaXRvclN0YXRlcy5jbGVhcigpO1xuXG4gICAgdGhpcy5jb250ZW50Q2hhbmdlTGlzdGVuZXJTdWJzY3JpcHRpb24kPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuY29udGVudENoYW5nZUxpc3RlbmVyU3Vic2NyaXB0aW9uJCA9IElOSVRJQUxfU1RBVEVTLmNvbnRlbnRDaGFuZ2VMaXN0ZW5lclN1YnNjcmlwdGlvbiQ7XG5cbiAgICB0aGlzLnR1dG9yaWFsQ2hhbmdlTGlzdGVuZXIkPy51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudHV0b3JpYWxDaGFuZ2VMaXN0ZW5lciQgPSBJTklUSUFMX1NUQVRFUy50dXRvcmlhbENoYW5nZUxpc3RlbmVyJDtcblxuICAgIHRoaXMuY3JlYXRlZEZpbGVMaXN0ZW5lciQ/LnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5jcmVhdGVkRmlsZUxpc3RlbmVyJCA9IElOSVRJQUxfU1RBVEVTLmNyZWF0ZWRGaWxlJDtcbiAgfVxuXG4gIGNoYW5nZUN1cnJlbnRGaWxlKGZpbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2VkaXRvclZpZXcpIHJldHVybjtcblxuICAgIGNvbnN0IG5ld0ZpbGUgPSB0aGlzLmZpbGVzKCkuZmluZCgoZmlsZSkgPT4gZmlsZS5maWxlbmFtZSA9PT0gZmlsZU5hbWUpO1xuICAgIGlmICghbmV3RmlsZSkgdGhyb3cgbmV3IEVycm9yKGBGaWxlICcke2ZpbGVOYW1lfScgbm90IGZvdW5kYCk7XG5cbiAgICB0aGlzLmN1cnJlbnRGaWxlLnNldChuZXdGaWxlKTtcblxuICAgIGNvbnN0IGVkaXRvclN0YXRlID0gdGhpcy5fZWRpdG9yU3RhdGVzLmdldChuZXdGaWxlLmZpbGVuYW1lKSA/PyB0aGlzLmNyZWF0ZUVkaXRvclN0YXRlKCk7XG5cbiAgICB0aGlzLl9lZGl0b3JWaWV3LnNldFN0YXRlKGVkaXRvclN0YXRlKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFR5cGVzY3JpcHRWZnNXb3JrZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudHNWZnNXb3JrZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRzVmZzV29ya2VyID0gbmV3IFdvcmtlcignLi93b3JrZXJzL3R5cGVzY3JpcHQtdmZzLndvcmtlcicsIHt0eXBlOiAnbW9kdWxlJ30pO1xuXG4gICAgdGhpcy50c1Zmc1dvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKHtkYXRhfTogTWVzc2FnZUV2ZW50PEFjdGlvbk1lc3NhZ2U+KSA9PiB7XG4gICAgICB0aGlzLmV2ZW50TWFuYWdlciQubmV4dChkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZUxpYnJhcmllc1R5cGVzKCk6IHZvaWQge1xuICAgIHRoaXMudHlwaW5nc0xvYWRlci50eXBpbmdzJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigodHlwaW5ncykgPT4gdHlwaW5ncy5sZW5ndGggPiAwKSxcbiAgICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZiksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh0eXBpbmdzKSA9PiB7XG4gICAgICAgIHRoaXMuc2VuZFJlcXVlc3RUb1RzVmZzKHtcbiAgICAgICAgICBhY3Rpb246IFRzVmZzV29ya2VyQWN0aW9ucy5ERUZJTkVfVFlQRVNfUkVRVUVTVCxcbiAgICAgICAgICBkYXRhOiB0eXBpbmdzLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXNldCBjdXJyZW50IGZpbGUgdG8gdHJpZ2dlciBkaWFnbm9zdGljcyBhZnRlciBwcmVsb2FkIEBhbmd1bGFyIGxpYnJhcmllcy5cbiAgICAgICAgdGhpcy5fZWRpdG9yVmlldz8uc2V0U3RhdGUodGhpcy5fZWRpdG9yU3RhdGVzLmdldCh0aGlzLmN1cnJlbnRGaWxlKCkuZmlsZW5hbWUpISk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIE1ldGhvZCBpcyByZXNwb25zaWJsZSBmb3Igc2VuZGluZyByZXF1ZXN0IHRvIFR5cGVzY3JpcHQgVkZTIHdvcmtlci5cbiAgcHJpdmF0ZSBzZW5kUmVxdWVzdFRvVHNWZnMgPSA8VD4ocmVxdWVzdDogQWN0aW9uTWVzc2FnZTxUPikgPT4ge1xuICAgIGlmICghdGhpcy50c1Zmc1dvcmtlcikgcmV0dXJuO1xuXG4gICAgLy8gU2VuZCBtZXNzYWdlIHRvIHRzVmZzV29ya2VyIG9ubHkgd2hlbiBjdXJyZW50IGZpbGUgaXMgVHlwZVNjcmlwdCBmaWxlLlxuICAgIGlmICghdGhpcy5jdXJyZW50RmlsZSgpLmZpbGVuYW1lLmVuZHNXaXRoKCcudHMnKSkgcmV0dXJuO1xuXG4gICAgdGhpcy50c1Zmc1dvcmtlci5wb3N0TWVzc2FnZShyZXF1ZXN0KTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6c2VtaWNvbG9uXG4gIH07XG5cbiAgcHJpdmF0ZSBnZXRWZnNFbnZGaWxlU3lzdGVtTWFwKCk6IE1hcDxzdHJpbmcsIHN0cmluZz4ge1xuICAgIGNvbnN0IGZpbGVTeXN0ZW1NYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIHRoaXMuZmlsZXMoKS5maWx0ZXIoKGZpbGUpID0+IGZpbGUuZmlsZW5hbWUuZW5kc1dpdGgoJy50cycpKSkge1xuICAgICAgZmlsZVN5c3RlbU1hcC5zZXQoYC8ke2ZpbGUuZmlsZW5hbWV9YCwgZmlsZS5jb250ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZVN5c3RlbU1hcDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdmlydHVhbCBlbnZpcm9ubWVudCBmb3IgVHlwZVNjcmlwdCBmaWxlc1xuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVWZnNFbnYoKTogdm9pZCB7XG4gICAgdGhpcy5zZW5kUmVxdWVzdFRvVHNWZnM8TWFwPHN0cmluZywgc3RyaW5nPj4oe1xuICAgICAgYWN0aW9uOiBUc1Zmc1dvcmtlckFjdGlvbnMuQ1JFQVRFX1ZGU19FTlZfUkVRVUVTVCxcbiAgICAgIGRhdGE6IHRoaXMuZ2V0VmZzRW52RmlsZVN5c3RlbU1hcCgpLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB2aXJ0dWFsIFR5cGVTY3JpcHQgZmlsZSBzeXN0ZW0gd2l0aCBjdXJyZW50IGNvZGUgZWRpdG9yIGZpbGVzXG4gICAqL1xuICBwcml2YXRlIHVwZGF0ZVZmc0VudigpOiB2b2lkIHtcbiAgICB0aGlzLnNlbmRSZXF1ZXN0VG9Uc1ZmczxNYXA8c3RyaW5nLCBzdHJpbmc+Pih7XG4gICAgICBhY3Rpb246IFRzVmZzV29ya2VyQWN0aW9ucy5VUERBVEVfVkZTX0VOVl9SRVFVRVNULFxuICAgICAgZGF0YTogdGhpcy5nZXRWZnNFbnZGaWxlU3lzdGVtTWFwKCksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvUHJvamVjdENoYW5nZXMoKSB7XG4gICAgdGhpcy50dXRvcmlhbENoYW5nZUxpc3RlbmVyJCA9IHRoaXMuZW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIudHV0b3JpYWxDaGFuZ2VkJFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoKSA9PiB0aGlzLmVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyLnR1dG9yaWFsRmlsZXMoKSksXG4gICAgICAgIGZpbHRlcigodHV0b3JpYWxGaWxlcykgPT4gT2JqZWN0LmtleXModHV0b3JpYWxGaWxlcykubGVuZ3RoID4gMCksXG4gICAgICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhbmdlUHJvamVjdCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVByb2plY3QoKSB7XG4gICAgdGhpcy5zZXRQcm9qZWN0RmlsZXMoKTtcblxuICAgIHRoaXMuX2VkaXRvclN0YXRlcy5jbGVhcigpO1xuXG4gICAgdGhpcy5jaGFuZ2VDdXJyZW50RmlsZSh0aGlzLmN1cnJlbnRGaWxlKCkuZmlsZW5hbWUpO1xuXG4gICAgdGhpcy51cGRhdGVWZnNFbnYoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UHJvamVjdEZpbGVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHR1dG9yaWFsRmlsZXMgPSB0aGlzLmdldFR1dG9yaWFsRmlsZXModGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci50dXRvcmlhbEZpbGVzKCkpO1xuXG4gICAgY29uc3Qgb3BlbkZpbGVzOiBFZGl0b3JGaWxlW10gPSBbXTtcblxuICAgIC8vIGl0ZXJhdGUgb3BlbkZpbGVzIHRvIGtlZXAgZmlsZXMgb3JkZXJcbiAgICBmb3IgKGNvbnN0IG9wZW5GaWxlTmFtZSBvZiB0aGlzLmVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyLm9wZW5GaWxlcygpKSB7XG4gICAgICBjb25zdCBvcGVuRmlsZSA9IHR1dG9yaWFsRmlsZXMuZmluZCgoe2ZpbGVuYW1lfSkgPT4gZmlsZW5hbWUgPT09IG9wZW5GaWxlTmFtZSk7XG5cbiAgICAgIGlmIChvcGVuRmlsZSkge1xuICAgICAgICBvcGVuRmlsZXMucHVzaChvcGVuRmlsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5maWxlcy5zZXQodHV0b3JpYWxGaWxlcyk7XG4gICAgdGhpcy5vcGVuRmlsZXMuc2V0KG9wZW5GaWxlcyk7XG4gICAgdGhpcy5jaGFuZ2VDdXJyZW50RmlsZShvcGVuRmlsZXNbMF0uZmlsZW5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY29kZSBlZGl0b3IgZmlsZXMgd2hlbiBmaWxlcyBhcmUgY3JlYXRlZFxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBhZGRDcmVhdGVkRmlsZVRvQ29kZUVkaXRvcihjcmVhdGVkRmlsZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZmlsZUNvbnRlbnRzID0gYXdhaXQgdGhpcy5ub2RlUnVudGltZVNhbmRib3gucmVhZEZpbGUoY3JlYXRlZEZpbGUpO1xuXG4gICAgdGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci50dXRvcmlhbEZpbGVzLnVwZGF0ZSgoZmlsZXMpID0+ICh7XG4gICAgICAuLi5maWxlcyxcbiAgICAgIFtjcmVhdGVkRmlsZV06IGZpbGVDb250ZW50cyxcbiAgICB9KSk7XG5cbiAgICB0aGlzLmVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyLm9wZW5GaWxlcy51cGRhdGUoKGZpbGVzKSA9PiBbLi4uZmlsZXMsIGNyZWF0ZWRGaWxlXSk7XG5cbiAgICB0aGlzLnNldFByb2plY3RGaWxlcygpO1xuXG4gICAgdGhpcy51cGRhdGVWZnNFbnYoKTtcblxuICAgIHRoaXMuc2F2ZUxpYnJhcmllc1R5cGVzKCk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVGaWxlKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICAvLyBpZiBmaWxlIGFscmVhZHkgZXhpc3RzLCB1c2UgaXRzIGNvbnRlbnRcbiAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgdGhpcy5ub2RlUnVudGltZVNhbmRib3gucmVhZEZpbGUoZmlsZW5hbWUpLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgLy8gZW1wdHkgY29udGVudCBpZiBmaWxlIGRvZXMgbm90IGV4aXN0XG4gICAgICBpZiAoZXJyb3IubWVzc2FnZS5pbmNsdWRlcygnRU5PRU5UJykpIHJldHVybiAnJztcbiAgICAgIGVsc2UgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG5cbiAgICBhd2FpdCB0aGlzLm5vZGVSdW50aW1lU2FuZGJveC53cml0ZUZpbGUoZmlsZW5hbWUsIGNvbnRlbnQpO1xuXG4gICAgdGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci50dXRvcmlhbEZpbGVzLnVwZGF0ZSgoZmlsZXMpID0+ICh7XG4gICAgICAuLi5maWxlcyxcbiAgICAgIFtmaWxlbmFtZV06IGNvbnRlbnQsXG4gICAgfSkpO1xuXG4gICAgdGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci5vcGVuRmlsZXMudXBkYXRlKChmaWxlcykgPT4gWy4uLmZpbGVzLCBmaWxlbmFtZV0pO1xuXG4gICAgdGhpcy5zZXRQcm9qZWN0RmlsZXMoKTtcblxuICAgIHRoaXMudXBkYXRlVmZzRW52KCk7XG5cbiAgICB0aGlzLnNhdmVMaWJyYXJpZXNUeXBlcygpO1xuXG4gICAgdGhpcy5jaGFuZ2VDdXJyZW50RmlsZShmaWxlbmFtZSk7XG4gIH1cblxuICBhc3luYyBkZWxldGVGaWxlKGRlbGV0ZWRGaWxlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm5vZGVSdW50aW1lU2FuZGJveC5kZWxldGVGaWxlKGRlbGV0ZWRGaWxlKTtcblxuICAgIHRoaXMuZW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIudHV0b3JpYWxGaWxlcy51cGRhdGUoKGZpbGVzKSA9PiB7XG4gICAgICBkZWxldGUgZmlsZXNbZGVsZXRlZEZpbGVdO1xuICAgICAgcmV0dXJuIGZpbGVzO1xuICAgIH0pO1xuXG4gICAgdGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci5vcGVuRmlsZXMudXBkYXRlKChmaWxlcykgPT5cbiAgICAgIGZpbGVzLmZpbHRlcigoZmlsZSkgPT4gZmlsZSAhPT0gZGVsZXRlZEZpbGUpLFxuICAgICk7XG5cbiAgICB0aGlzLnNldFByb2plY3RGaWxlcygpO1xuXG4gICAgdGhpcy51cGRhdGVWZnNFbnYoKTtcblxuICAgIHRoaXMuc2F2ZUxpYnJhcmllc1R5cGVzKCk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUVkaXRvclN0YXRlKCk6IEVkaXRvclN0YXRlIHtcbiAgICBjb25zdCBuZXdFZGl0b3JTdGF0ZSA9IEVkaXRvclN0YXRlLmNyZWF0ZSh7XG4gICAgICBkb2M6IHRoaXMuY3VycmVudEZpbGUoKS5jb250ZW50LFxuICAgICAgZXh0ZW5zaW9uczogW1xuICAgICAgICAuLi5DT0RFX0VESVRPUl9FWFRFTlNJT05TLFxuXG4gICAgICAgIHRoaXMuY3VycmVudEZpbGUoKS5sYW5ndWFnZSxcblxuICAgICAgICBwbGFjZWhvbGRlckV4dGVuc2lvbignVHlwZSB5b3VyIGNvZGUgaGVyZS4uLicpLFxuXG4gICAgICAgIC4uLnRoaXMuZ2V0TGFuZ3VhZ2VFeHRlbnNpb25zKCksXG4gICAgICBdLFxuICAgIH0pO1xuXG4gICAgdGhpcy5fZWRpdG9yU3RhdGVzLnNldCh0aGlzLmN1cnJlbnRGaWxlKCkuZmlsZW5hbWUsIG5ld0VkaXRvclN0YXRlKTtcblxuICAgIHJldHVybiBuZXdFZGl0b3JTdGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TGFuZ3VhZ2VFeHRlbnNpb25zKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRGaWxlKCkuZmlsZW5hbWUuZW5kc1dpdGgoJy50cycpKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBnZXRBdXRvY29tcGxldGVFeHRlbnNpb24odGhpcy5ldmVudE1hbmFnZXIkLCB0aGlzLmN1cnJlbnRGaWxlLCB0aGlzLnNlbmRSZXF1ZXN0VG9Uc1ZmcyksXG4gICAgICAgIGdldERpYWdub3N0aWNzRXh0ZW5zaW9uKFxuICAgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyJCxcbiAgICAgICAgICB0aGlzLmN1cnJlbnRGaWxlLFxuICAgICAgICAgIHRoaXMuc2VuZFJlcXVlc3RUb1RzVmZzLFxuICAgICAgICAgIHRoaXMuZGlhZ25vc3RpY3NTdGF0ZSxcbiAgICAgICAgKSxcbiAgICAgICAgZ2V0VG9vbHRpcEV4dGVuc2lvbih0aGlzLmV2ZW50TWFuYWdlciQsIHRoaXMuY3VycmVudEZpbGUsIHRoaXMuc2VuZFJlcXVlc3RUb1RzVmZzKSxcbiAgICAgIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyaXRlIHRoZSBuZXcgZmlsZSBjb250ZW50cyB0byB0aGUgc2FuZGJveCBmaWxlc3lzdGVtXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGNoYW5nZUZpbGVDb250ZW50c1NjaGVkdWxlZChuZXdDb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5ub2RlUnVudGltZVNhbmRib3gud3JpdGVGaWxlKHRoaXMuY3VycmVudEZpbGUoKS5maWxlbmFtZSwgbmV3Q29udGVudCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBOb3RlOiBgd3JpdGVGaWxlYCB0aHJvd3MgaWYgdGhlIHNhbmRib3ggaXMgbm90IGluaXRpYWxpemVkIHlldCwgd2hpY2ggY2FuIGhhcHBlbiBpZlxuICAgICAgLy8gdGhlIHVzZXIgc3RhcnRzIHR5cGluZyByaWdodCBhZnRlciB0aGUgcGFnZSBsb2Fkcy5cbiAgICAgIC8vIEhlcmUgdGhlIGVycm9yIGlzIGlnbm9yZWQgYXMgaXQgaXMgZXhwZWN0ZWQuXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSBmaWxlIGNvbnRlbnRzIG9uIGZpbGVzIHNpZ25hbHMgYW5kIHVwZGF0ZSB0aGUgZWRpdG9yIHN0YXRlXG4gICAqL1xuICBwcml2YXRlIGNoYW5nZUZpbGVDb250ZW50c09uUmVhbFRpbWUodHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdG9yU3RhdGVzLnNldCh0aGlzLmN1cnJlbnRGaWxlKCkuZmlsZW5hbWUsIHRyYW5zYWN0aW9uLnN0YXRlKTtcblxuICAgIGNvbnN0IG5ld0NvbnRlbnQgPSB0cmFuc2FjdGlvbi5zdGF0ZS5kb2MudG9TdHJpbmcoKTtcblxuICAgIHRoaXMuY3VycmVudEZpbGUudXBkYXRlKChjdXJyZW50RmlsZSkgPT4gKHsuLi5jdXJyZW50RmlsZSwgY29udGVudDogbmV3Q29udGVudH0pKTtcblxuICAgIHRoaXMuZmlsZXMudXBkYXRlKChmaWxlcykgPT5cbiAgICAgIGZpbGVzLm1hcCgoZmlsZSkgPT5cbiAgICAgICAgZmlsZS5maWxlbmFtZSA9PT0gdGhpcy5jdXJyZW50RmlsZSgpLmZpbGVuYW1lID8gey4uLmZpbGUsIGNvbnRlbnQ6IG5ld0NvbnRlbnR9IDogZmlsZSxcbiAgICAgICksXG4gICAgKTtcblxuICAgIC8vIHNlbmQgY3VycmVudCBmaWxlIGNvbnRlbnQgdG8gVHMgVmZzIHdvcmtlciB0byBydW4gZGlhZ25vc3RpY3Mgb24gY3VycmVudCBmaWxlIHN0YXRlXG4gICAgdGhpcy5zZW5kUmVxdWVzdFRvVHNWZnM8Q29kZUNoYW5nZVJlcXVlc3Q+KHtcbiAgICAgIGFjdGlvbjogVHNWZnNXb3JrZXJBY3Rpb25zLkNPREVfQ0hBTkdFRCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZmlsZTogdGhpcy5jdXJyZW50RmlsZSgpLmZpbGVuYW1lLFxuICAgICAgICBjb2RlOiBuZXdDb250ZW50LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VHV0b3JpYWxGaWxlcyhmaWxlczogRmlsZUFuZENvbnRlbnRSZWNvcmQpOiBFZGl0b3JGaWxlW10ge1xuICAgIGNvbnN0IGxhbmd1YWdlc0V4dGVuc2lvbnMgPSBPYmplY3Qua2V5cyhMQU5HVUFHRVMpO1xuXG4gICAgY29uc3QgdHV0b3JpYWxGaWxlcyA9IE9iamVjdC5lbnRyaWVzKGZpbGVzKVxuICAgICAgLmZpbHRlcihcbiAgICAgICAgKGZpbGVBbmRDb250ZW50KTogZmlsZUFuZENvbnRlbnQgaXMgW3N0cmluZywgc3RyaW5nXSA9PlxuICAgICAgICAgIHR5cGVvZiBmaWxlQW5kQ29udGVudFsxXSA9PT0gJ3N0cmluZycsXG4gICAgICApXG4gICAgICAubWFwKChbZmlsZW5hbWUsIGNvbnRlbnRdKSA9PiB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IGxhbmd1YWdlc0V4dGVuc2lvbnMuZmluZCgoZXh0ZW5zaW9uKSA9PiBmaWxlbmFtZS5lbmRzV2l0aChleHRlbnNpb24pKTtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBleHRlbnNpb24gPyBMQU5HVUFHRVNbZXh0ZW5zaW9uXSA6IExBTkdVQUdFU1sndHMnXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGZpbGVuYW1lLFxuICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgIHJldHVybiB0dXRvcmlhbEZpbGVzO1xuICB9XG59XG4iXX0=