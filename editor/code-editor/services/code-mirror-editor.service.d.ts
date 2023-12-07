/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { EditorFile } from '../interfaces/editor-file.js';
/**
 * The delay between the last typed character and the actual file save.
 * This is used to prevent saving the file on every keystroke.
 *
 * Important! this value is intentionally set a bit higher than it needs to be, because sending
 * changes too frequently to the web container appears to put it in a state where it stops picking
 * up changes. See issue #691 for context.
 */
export declare const EDITOR_CONTENT_CHANGE_DELAY_MILLIES = 500;
export declare class CodeMirrorEditor {
    files: import("@angular/core").WritableSignal<EditorFile[]>;
    openFiles: import("@angular/core").WritableSignal<EditorFile[]>;
    currentFile: import("@angular/core").WritableSignal<EditorFile>;
    private tsVfsWorker;
    private readonly eventManager$;
    private readonly nodeRuntimeSandbox;
    private readonly nodeRuntimeState;
    private readonly embeddedTutorialManager;
    private readonly typingsLoader;
    private readonly destroyRef;
    private readonly diagnosticsState;
    private _editorView;
    private readonly _editorStates;
    private readonly contentChanged$;
    private readonly contentChangeListener$;
    private contentChangeListenerSubscription$;
    private tutorialChangeListener$;
    private createdFileListener$;
    init(parentElement: HTMLElement): void;
    disable(): void;
    changeCurrentFile(fileName: string): void;
    private initTypescriptVfsWorker;
    private saveLibrariesTypes;
    private sendRequestToTsVfs;
    private getVfsEnvFileSystemMap;
    /**
     * Create virtual environment for TypeScript files
     */
    private createVfsEnv;
    /**
     * Update virtual TypeScript file system with current code editor files
     */
    private updateVfsEnv;
    private listenToProjectChanges;
    private changeProject;
    private setProjectFiles;
    /**
     * Update the code editor files when files are created
     */
    private addCreatedFileToCodeEditor;
    createFile(filename: string): Promise<void>;
    deleteFile(deletedFile: string): Promise<void>;
    private createEditorState;
    private getLanguageExtensions;
    /**
     * Write the new file contents to the sandbox filesystem
     */
    private changeFileContentsScheduled;
    /**
     * Change file contents on files signals and update the editor state
     */
    private changeFileContentsOnRealTime;
    private getTutorialFiles;
}
