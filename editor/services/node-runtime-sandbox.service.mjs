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
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { checkFilesInDirectory } from '../../utils/index.js';
import { WebContainer } from '@webcontainer/api';
import { BehaviorSubject, filter, map, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertManager } from './alert-manager.service.js';
import { EmbeddedTutorialManager } from './embedded-tutorial-manager.service.js';
import { ErrorType, NodeRuntimeState } from './node-runtime-state.service.js';
import { TerminalHandler } from './terminal-handler.service.js';
import { TypingsLoader } from './typings-loader.service.js';
export const DEV_SERVER_READY_MSG = 'Watch mode enabled. Watching for file changes...';
export const OUT_OF_MEMORY_MSG = 'Out of memory';
export const PACKAGE_MANAGER = 'npm';
export var LoadingStep;
(function (LoadingStep) {
    LoadingStep[LoadingStep["NOT_STARTED"] = 0] = "NOT_STARTED";
    LoadingStep[LoadingStep["BOOT"] = 1] = "BOOT";
    LoadingStep[LoadingStep["LOAD_FILES"] = 2] = "LOAD_FILES";
    LoadingStep[LoadingStep["INSTALL"] = 3] = "INSTALL";
    LoadingStep[LoadingStep["START_DEV_SERVER"] = 4] = "START_DEV_SERVER";
    LoadingStep[LoadingStep["READY"] = 5] = "READY";
    LoadingStep[LoadingStep["ERROR"] = 6] = "ERROR";
})(LoadingStep || (LoadingStep = {}));
/**
 * This service is responsible for handling the WebContainer instance, which
 * allows running a Node.js environment in the browser. It is used by the
 * embedded editor to run an executable Angular project in the browser.
 *
 * It boots the WebContainer, loads the project files into the WebContainer
 * filesystem, install the project dependencies and starts the dev server.
 */
let NodeRuntimeSandbox = class NodeRuntimeSandbox {
    constructor() {
        this._createdFile$ = new Subject();
        this.createdFile$ = this._createdFile$.asObservable();
        this._createdFiles = signal(new Set());
        this.destroyRef = inject(DestroyRef);
        this.alertManager = inject(AlertManager);
        this.terminalHandler = inject(TerminalHandler);
        this.embeddedTutorialManager = inject(EmbeddedTutorialManager);
        this.nodeRuntimeState = inject(NodeRuntimeState);
        this.typingsLoader = inject(TypingsLoader);
        this._isProjectInitialized = signal(false);
        this._isAngularCliInitialized = signal(false);
        this.urlToPreview$ = new BehaviorSubject('');
        this._previewUrl$ = this.urlToPreview$.asObservable();
        this.processes = new Set();
    }
    get previewUrl$() {
        return this._previewUrl$;
    }
    async init() {
        // Note: the error state can already be set when loading the NodeRuntimeSanbox
        // in an unsupported environment.
        if (this.nodeRuntimeState.error()) {
            return;
        }
        try {
            if (!this.embeddedTutorialManager.type())
                throw Error("Tutorial type isn't available, can not initialize the NodeRuntimeSandbox");
            console.time('Load time');
            let webContainer;
            if (this.nodeRuntimeState.loadingStep() === LoadingStep.NOT_STARTED) {
                this.alertManager.init();
                webContainer = await this.boot();
                await this.handleWebcontainerErrors();
            }
            else {
                webContainer = await this.webContainerPromise;
            }
            await this.startInteractiveTerminal(webContainer);
            this.terminalHandler.clearTerminals();
            if (this.embeddedTutorialManager.type() === "cli" /* TutorialType.CLI */) {
                await this.initAngularCli();
            }
            else {
                await this.initProject();
            }
            console.timeEnd('Load time');
        }
        catch (error) {
            this.setErrorState(error.message);
        }
    }
    async reset() {
        // if a reset is running, don't allow another to start
        if (this.nodeRuntimeState.isResetting()) {
            return;
        }
        this.nodeRuntimeState.setIsResetting(true);
        if (this.nodeRuntimeState.loadingStep() === LoadingStep.READY) {
            await this.restartDevServer();
        }
        else {
            await this.cleanup();
            this.setLoading(LoadingStep.BOOT);
            // force re-initialization
            this._isProjectInitialized.set(false);
            await this.init();
        }
        this.nodeRuntimeState.setIsResetting(false);
    }
    async restartDevServer() {
        this.devServerProcess?.kill();
        await this.startDevServer();
    }
    async getSolutionFiles() {
        const webContainer = await this.webContainerPromise;
        const excludeFolders = ['node_modules', '.angular', 'dist'];
        return await checkFilesInDirectory('/', webContainer.fs, (path) => !!path && !excludeFolders.includes(path));
    }
    /**
     * Initialize the WebContainer for an Angular project
     */
    async initProject() {
        // prevent re-initializion
        if (this._isProjectInitialized())
            return;
        // clean up the sandbox if it was initialized before so that the CLI can
        // be initialized without conflicts
        if (this._isAngularCliInitialized()) {
            await this.cleanup();
            this._isAngularCliInitialized.set(false);
        }
        this._isProjectInitialized.set(true);
        await this.mountProjectFiles();
        this.handleProjectChanges();
        const exitCode = await this.installDependencies();
        if (![143 /* PROCESS_EXIT_CODE.SIGTERM */, 0 /* PROCESS_EXIT_CODE.SUCCESS */].includes(exitCode))
            throw new Error('Installation failed');
        await Promise.all([this.loadTypes(), this.startDevServer()]);
    }
    handleProjectChanges() {
        this.embeddedTutorialManager.tutorialChanged$
            .pipe(map((tutorialChanged) => ({
            tutorialChanged,
            tutorialFiles: this.embeddedTutorialManager.tutorialFiles(),
        })), filter(({ tutorialChanged, tutorialFiles }) => tutorialChanged && Object.keys(tutorialFiles).length > 0), takeUntilDestroyed(this.destroyRef))
            .subscribe(async () => {
            await Promise.all([this.mountProjectFiles(), this.handleFilesToDeleteOnProjectChange()]);
            if (this.embeddedTutorialManager.shouldReInstallDependencies()) {
                await this.handleInstallDependenciesOnProjectChange();
            }
        });
    }
    async handleFilesToDeleteOnProjectChange() {
        const filesToDelete = Array.from(new Set([
            ...this.embeddedTutorialManager.filesToDeleteFromPreviousProject(),
            ...Array.from(this._createdFiles()),
        ]));
        if (filesToDelete.length) {
            await Promise.all(filesToDelete.map((file) => this.deleteFile(file)));
        }
        // reset created files
        this._createdFiles.set(new Set());
    }
    async handleInstallDependenciesOnProjectChange() {
        // Note: restartDevServer is not used here because we need to kill
        // the dev server process before installing dependencies to avoid
        // errors in the console
        this.devServerProcess?.kill();
        await this.installDependencies();
        await Promise.all([this.loadTypes(), this.startDevServer()]);
    }
    /**
     * Initialize the WebContainer for the Angular CLI
     */
    async initAngularCli() {
        // prevent re-initializion
        if (this._isAngularCliInitialized())
            return;
        // clean up the sandbox if a project was initialized before so the CLI can
        // be initialized without conflicts
        if (this._isProjectInitialized()) {
            await this.cleanup();
            this.urlToPreview$.next(null);
            this._isProjectInitialized.set(false);
        }
        this._isAngularCliInitialized.set(true);
        this.setLoading(LoadingStep.INSTALL);
        const exitCode = await this.installAngularCli();
        if (![143 /* PROCESS_EXIT_CODE.SIGTERM */, 0 /* PROCESS_EXIT_CODE.SUCCESS */].includes(exitCode))
            this.setLoading(LoadingStep.READY);
    }
    async writeFile(path, content) {
        const webContainer = await this.webContainerPromise;
        try {
            await webContainer.fs.writeFile(path, content);
        }
        catch (err) {
            if (err.message.startsWith('ENOENT')) {
                const directory = path.split('/').slice(0, -1).join('/');
                await webContainer.fs.mkdir(directory, {
                    recursive: true,
                });
                await webContainer.fs.writeFile(path, content);
            }
            else {
                throw err;
            }
        }
    }
    async readFile(filePath) {
        const webContainer = await this.webContainerPromise;
        return webContainer.fs.readFile(filePath, 'utf-8');
    }
    async deleteFile(filepath) {
        const webContainer = await this.webContainerPromise;
        return webContainer.fs.rm(filepath);
    }
    /**
     * Implemented based on:
     * https://webcontainers.io/tutorial/7-add-interactivity#_2-start-the-shell
     */
    async startInteractiveTerminal(webContainer) {
        // return existing shell process if it's already running
        if (this.interactiveShellProcess)
            return this.interactiveShellProcess;
        const terminal = this.terminalHandler.interactiveTerminalInstance;
        // use WebContainer spawn directly so that the proccess isn't killed on
        // cleanup
        const shellProcess = await webContainer.spawn('bash');
        this.interactiveShellProcess = shellProcess;
        // keep the regex out of the write stream to avoid recreating on every write
        const ngGenerateTerminalOutputRegex = /(\u001b\[\d+m)?([^\s]+)(\u001b\[\d+m)?/g;
        await shellProcess.output.pipeTo(new WritableStream({
            write: (data) => {
                this.checkForOutOfMemoryError(data.toString());
                terminal.write(data);
                if (data.includes('CREATE') && data.endsWith('\r\n')) {
                    const match = data.match(ngGenerateTerminalOutputRegex);
                    const filename = match?.[1];
                    if (filename) {
                        this._createdFile$.next(filename);
                        this._createdFiles.update((files) => files.add(filename));
                    }
                }
            },
        }));
        const input = shellProcess.input.getWriter();
        this.interactiveShellWriter = input;
        terminal.onData((data) => {
            input.write(data);
        });
        terminal.breakProcess$.subscribe(() => {
            // Write CTRL + C into shell to break active process
            input.write('\x03');
        });
        return shellProcess;
    }
    async mountProjectFiles() {
        if (!this.embeddedTutorialManager.tutorialFilesystemTree()) {
            return;
        }
        // The files are mounted on init and when the project changes. If the loading step is ready,
        // the project changed, so we don't need to change the loading step.
        if (this.nodeRuntimeState.loadingStep() !== LoadingStep.READY) {
            this.setLoading(LoadingStep.LOAD_FILES);
        }
        const tutorialHasFiles = Object.keys(this.embeddedTutorialManager.tutorialFilesystemTree()).length >
            0;
        if (tutorialHasFiles) {
            await Promise.all([
                this.mountFiles(this.embeddedTutorialManager.commonFilesystemTree()),
                this.mountFiles(this.embeddedTutorialManager.tutorialFilesystemTree()),
            ]);
        }
    }
    setLoading(loading) {
        this.nodeRuntimeState.setLoadingStep(loading);
    }
    async mountFiles(fileSystemTree) {
        const webContainer = await this.webContainerPromise;
        await webContainer.mount(fileSystemTree);
    }
    async boot() {
        this.setLoading(LoadingStep.BOOT);
        if (!this.webContainerPromise) {
            this.webContainerPromise = WebContainer.boot();
        }
        return await this.webContainerPromise;
    }
    terminate(webContainer) {
        webContainer?.teardown();
        this.webContainerPromise = undefined;
    }
    async handleWebcontainerErrors() {
        const webContainer = await this.webContainerPromise;
        webContainer.on('error', ({ message }) => {
            if (this.checkForOutOfMemoryError(message))
                return;
            this.setErrorState(message, ErrorType.UNKNOWN);
        });
    }
    checkForOutOfMemoryError(message) {
        if (message.toLowerCase().includes(OUT_OF_MEMORY_MSG.toLowerCase())) {
            this.setErrorState(message, ErrorType.OUT_OF_MEMORY);
            return true;
        }
        return false;
    }
    setErrorState(message, type) {
        this.nodeRuntimeState.setError({ message, type });
        this.nodeRuntimeState.setLoadingStep(LoadingStep.ERROR);
        this.terminate();
    }
    async installDependencies() {
        this.setLoading(LoadingStep.INSTALL);
        const installProcess = await this.spawn(PACKAGE_MANAGER, ['install']);
        await installProcess.output.pipeTo(new WritableStream({
            write: (data) => {
                this.terminalHandler.readonlyTerminalInstance.write(data);
            },
        }));
        // wait for install command to exit
        return installProcess.exit;
    }
    async loadTypes() {
        const webContainer = await this.webContainerPromise;
        await this.typingsLoader.retrieveTypeDefinitions(webContainer);
    }
    async installAngularCli() {
        // install Angular CLI
        const installProcess = await this.spawn(PACKAGE_MANAGER, ['install', '@angular/cli@latest']);
        await installProcess.output.pipeTo(new WritableStream({
            write: (data) => {
                this.terminalHandler.interactiveTerminalInstance.write(data);
            },
        }));
        const exitCode = await installProcess.exit;
        // Simulate pressing `Enter` in shell
        await this.interactiveShellWriter?.write('\x0D');
        return exitCode;
    }
    async startDevServer() {
        const webContainer = await this.webContainerPromise;
        this.setLoading(LoadingStep.START_DEV_SERVER);
        this.devServerProcess = await this.spawn(PACKAGE_MANAGER, ['run', 'start']);
        // wait for `server-ready` event, forward the dev server url
        webContainer.on('server-ready', (port, url) => {
            this.urlToPreview$.next(url);
        });
        // wait until the dev server finishes the first compilation
        await new Promise((resolve, reject) => {
            if (!this.devServerProcess) {
                reject('dev server is not running');
                return;
            }
            this.devServerProcess.output.pipeTo(new WritableStream({
                write: (data) => {
                    this.terminalHandler.readonlyTerminalInstance.write(data);
                    if (this.checkForOutOfMemoryError(data.toString())) {
                        reject(new Error(data.toString()));
                        return;
                    }
                    if (this.nodeRuntimeState.loadingStep() !== LoadingStep.READY &&
                        data.toString().includes(DEV_SERVER_READY_MSG)) {
                        resolve();
                        this.setLoading(LoadingStep.READY);
                    }
                },
            }));
        });
    }
    /**
     * Spawn a process in the WebContainer and store the process in the service.
     * Later on the stored process can be used to kill the process on `cleanup`
     */
    async spawn(command, args = []) {
        const webContainer = await this.webContainerPromise;
        const process = await webContainer.spawn(command, args);
        const transformStream = new TransformStream({
            transform: (chunk, controller) => {
                this.checkForOutOfMemoryError(chunk.toString());
                controller.enqueue(chunk);
            },
        });
        process.output = process.output.pipeThrough(transformStream);
        this.processes.add(process);
        return process;
    }
    /**
     * Kill existing processes and remove files from the WebContainer
     * when switching tutorials that have diferent requirements
     */
    async cleanup() {
        // await the proccess to be killed before removing the files because
        // a process can create files during the promise
        await this.killExistingProcesses();
        await this.removeFiles();
    }
    async killExistingProcesses() {
        await Promise.all(Array.from(this.processes).map((process) => process.kill()));
        this.processes.clear();
    }
    async removeFiles() {
        const webcontainer = await this.webContainerPromise;
        await webcontainer.spawn('rm', ['-rf', './**']);
    }
};
NodeRuntimeSandbox = __decorate([
    Injectable({ providedIn: 'root' })
], NodeRuntimeSandbox);
export { NodeRuntimeSandbox };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1ydW50aW1lLXNhbmRib3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL3NlcnZpY2VzL25vZGUtcnVudGltZS1zYW5kYm94LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRCxPQUFPLEVBQWlCLFlBQVksRUFBc0IsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRixPQUFPLEVBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBSzNELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMvRSxPQUFPLEVBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxrREFBa0QsQ0FBQztBQUN2RixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxlQUFlLENBQUM7QUFRakQsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQztBQUVyQyxNQUFNLENBQU4sSUFBWSxXQVFYO0FBUkQsV0FBWSxXQUFXO0lBQ3JCLDJEQUFXLENBQUE7SUFDWCw2Q0FB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QTtBQTdlWSxrQkFBa0I7SUFEOUIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO0dBQ3BCLGtCQUFrQixDQTZlOUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGVzdHJveVJlZiwgaW5qZWN0LCBJbmplY3RhYmxlLCBzaWduYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtjaGVja0ZpbGVzSW5EaXJlY3Rvcnl9IGZyb20gJy4uLy4uL3V0aWxzL2luZGV4LmpzJztcbmltcG9ydCB7RmlsZVN5c3RlbVRyZWUsIFdlYkNvbnRhaW5lciwgV2ViQ29udGFpbmVyUHJvY2Vzc30gZnJvbSAnQHdlYmNvbnRhaW5lci9hcGknO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGZpbHRlciwgbWFwLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtGaWxlQW5kQ29udGVudH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbmRleC5qcyc7XG5pbXBvcnQge1R1dG9yaWFsVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbmRleC5qcyc7XG5cbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge0FsZXJ0TWFuYWdlcn0gZnJvbSAnLi9hbGVydC1tYW5hZ2VyLnNlcnZpY2UuanMnO1xuaW1wb3J0IHtFbWJlZGRlZFR1dG9yaWFsTWFuYWdlcn0gZnJvbSAnLi9lbWJlZGRlZC10dXRvcmlhbC1tYW5hZ2VyLnNlcnZpY2UuanMnO1xuaW1wb3J0IHtFcnJvclR5cGUsIE5vZGVSdW50aW1lU3RhdGV9IGZyb20gJy4vbm9kZS1ydW50aW1lLXN0YXRlLnNlcnZpY2UuanMnO1xuaW1wb3J0IHtUZXJtaW5hbEhhbmRsZXJ9IGZyb20gJy4vdGVybWluYWwtaGFuZGxlci5zZXJ2aWNlLmpzJztcbmltcG9ydCB7VHlwaW5nc0xvYWRlcn0gZnJvbSAnLi90eXBpbmdzLWxvYWRlci5zZXJ2aWNlLmpzJztcblxuZXhwb3J0IGNvbnN0IERFVl9TRVJWRVJfUkVBRFlfTVNHID0gJ1dhdGNoIG1vZGUgZW5hYmxlZC4gV2F0Y2hpbmcgZm9yIGZpbGUgY2hhbmdlcy4uLic7XG5leHBvcnQgY29uc3QgT1VUX09GX01FTU9SWV9NU0cgPSAnT3V0IG9mIG1lbW9yeSc7XG5cbmNvbnN0IGVudW0gUFJPQ0VTU19FWElUX0NPREUge1xuICBTVUNDRVNTID0gMCwgLy8gcHJvY2VzcyBleGl0ZWQgc3VjY2VzZnVsbHlcbiAgRVJST1IgPSAxMCwgLy8gcHJvY2VzcyBleGl0ZWQgd2l0aCBlcnJvclxuICBTSUdURVJNID0gMTQzLCAvLyAxNDMgPSBncmFjZWZ1bGx5IHRlcm1pbmF0ZWQgYnkgU0lHVEVSTSwgZS5nLiBDdHJsICsgQ1xufVxuXG5leHBvcnQgY29uc3QgUEFDS0FHRV9NQU5BR0VSID0gJ25wbSc7XG5cbmV4cG9ydCBlbnVtIExvYWRpbmdTdGVwIHtcbiAgTk9UX1NUQVJURUQsXG4gIEJPT1QsXG4gIExPQURfRklMRVMsXG4gIElOU1RBTEwsXG4gIFNUQVJUX0RFVl9TRVJWRVIsXG4gIFJFQURZLFxuICBFUlJPUixcbn1cblxuLyoqXG4gKiBUaGlzIHNlcnZpY2UgaXMgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIHRoZSBXZWJDb250YWluZXIgaW5zdGFuY2UsIHdoaWNoXG4gKiBhbGxvd3MgcnVubmluZyBhIE5vZGUuanMgZW52aXJvbm1lbnQgaW4gdGhlIGJyb3dzZXIuIEl0IGlzIHVzZWQgYnkgdGhlXG4gKiBlbWJlZGRlZCBlZGl0b3IgdG8gcnVuIGFuIGV4ZWN1dGFibGUgQW5ndWxhciBwcm9qZWN0IGluIHRoZSBicm93c2VyLlxuICpcbiAqIEl0IGJvb3RzIHRoZSBXZWJDb250YWluZXIsIGxvYWRzIHRoZSBwcm9qZWN0IGZpbGVzIGludG8gdGhlIFdlYkNvbnRhaW5lclxuICogZmlsZXN5c3RlbSwgaW5zdGFsbCB0aGUgcHJvamVjdCBkZXBlbmRlbmNpZXMgYW5kIHN0YXJ0cyB0aGUgZGV2IHNlcnZlci5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTm9kZVJ1bnRpbWVTYW5kYm94IHtcbiAgcHJpdmF0ZSByZWFkb25seSBfY3JlYXRlZEZpbGUkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICByZWFkb25seSBjcmVhdGVkRmlsZSQgPSB0aGlzLl9jcmVhdGVkRmlsZSQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfY3JlYXRlZEZpbGVzID0gc2lnbmFsPFNldDxzdHJpbmc+PihuZXcgU2V0KCkpO1xuXG4gIHByaXZhdGUgaW50ZXJhY3RpdmVTaGVsbFByb2Nlc3M6IFdlYkNvbnRhaW5lclByb2Nlc3MgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgaW50ZXJhY3RpdmVTaGVsbFdyaXRlcjogV3JpdGFibGVTdHJlYW1EZWZhdWx0V3JpdGVyIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBhbGVydE1hbmFnZXIgPSBpbmplY3QoQWxlcnRNYW5hZ2VyKTtcbiAgcHJpdmF0ZSByZWFkb25seSB0ZXJtaW5hbEhhbmRsZXIgPSBpbmplY3QoVGVybWluYWxIYW5kbGVyKTtcbiAgcHJpdmF0ZSBlbWJlZGRlZFR1dG9yaWFsTWFuYWdlciA9IGluamVjdChFbWJlZGRlZFR1dG9yaWFsTWFuYWdlcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgbm9kZVJ1bnRpbWVTdGF0ZSA9IGluamVjdChOb2RlUnVudGltZVN0YXRlKTtcbiAgcHJpdmF0ZSByZWFkb25seSB0eXBpbmdzTG9hZGVyID0gaW5qZWN0KFR5cGluZ3NMb2FkZXIpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgX2lzUHJvamVjdEluaXRpYWxpemVkID0gc2lnbmFsKGZhbHNlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfaXNBbmd1bGFyQ2xpSW5pdGlhbGl6ZWQgPSBzaWduYWwoZmFsc2UpO1xuXG4gIHByaXZhdGUgdXJsVG9QcmV2aWV3JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nIHwgbnVsbD4oJycpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9wcmV2aWV3VXJsJCA9IHRoaXMudXJsVG9QcmV2aWV3JC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IHByb2Nlc3NlczogU2V0PFdlYkNvbnRhaW5lclByb2Nlc3M+ID0gbmV3IFNldCgpO1xuICBwcml2YXRlIGRldlNlcnZlclByb2Nlc3M6IFdlYkNvbnRhaW5lclByb2Nlc3MgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgd2ViQ29udGFpbmVyUHJvbWlzZTogUHJvbWlzZTxXZWJDb250YWluZXI+IHwgdW5kZWZpbmVkO1xuXG4gIGdldCBwcmV2aWV3VXJsJCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJldmlld1VybCQ7XG4gIH1cblxuICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIE5vdGU6IHRoZSBlcnJvciBzdGF0ZSBjYW4gYWxyZWFkeSBiZSBzZXQgd2hlbiBsb2FkaW5nIHRoZSBOb2RlUnVudGltZVNhbmJveFxuICAgIC8vIGluIGFuIHVuc3VwcG9ydGVkIGVudmlyb25tZW50LlxuICAgIGlmICh0aGlzLm5vZGVSdW50aW1lU3RhdGUuZXJyb3IoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIudHlwZSgpKVxuICAgICAgICB0aHJvdyBFcnJvcihcIlR1dG9yaWFsIHR5cGUgaXNuJ3QgYXZhaWxhYmxlLCBjYW4gbm90IGluaXRpYWxpemUgdGhlIE5vZGVSdW50aW1lU2FuZGJveFwiKTtcblxuICAgICAgY29uc29sZS50aW1lKCdMb2FkIHRpbWUnKTtcblxuICAgICAgbGV0IHdlYkNvbnRhaW5lcjogV2ViQ29udGFpbmVyO1xuICAgICAgaWYgKHRoaXMubm9kZVJ1bnRpbWVTdGF0ZS5sb2FkaW5nU3RlcCgpID09PSBMb2FkaW5nU3RlcC5OT1RfU1RBUlRFRCkge1xuICAgICAgICB0aGlzLmFsZXJ0TWFuYWdlci5pbml0KCk7XG5cbiAgICAgICAgd2ViQ29udGFpbmVyID0gYXdhaXQgdGhpcy5ib290KCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5oYW5kbGVXZWJjb250YWluZXJFcnJvcnMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlYkNvbnRhaW5lciA9IGF3YWl0IHRoaXMud2ViQ29udGFpbmVyUHJvbWlzZSE7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc3RhcnRJbnRlcmFjdGl2ZVRlcm1pbmFsKHdlYkNvbnRhaW5lcik7XG4gICAgICB0aGlzLnRlcm1pbmFsSGFuZGxlci5jbGVhclRlcm1pbmFscygpO1xuXG4gICAgICBpZiAodGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci50eXBlKCkgPT09IFR1dG9yaWFsVHlwZS5DTEkpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0QW5ndWxhckNsaSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0UHJvamVjdCgpO1xuICAgICAgfVxuXG4gICAgICBjb25zb2xlLnRpbWVFbmQoJ0xvYWQgdGltZScpO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRoaXMuc2V0RXJyb3JTdGF0ZShlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZXNldCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBpZiBhIHJlc2V0IGlzIHJ1bm5pbmcsIGRvbid0IGFsbG93IGFub3RoZXIgdG8gc3RhcnRcbiAgICBpZiAodGhpcy5ub2RlUnVudGltZVN0YXRlLmlzUmVzZXR0aW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5vZGVSdW50aW1lU3RhdGUuc2V0SXNSZXNldHRpbmcodHJ1ZSk7XG5cbiAgICBpZiAodGhpcy5ub2RlUnVudGltZVN0YXRlLmxvYWRpbmdTdGVwKCkgPT09IExvYWRpbmdTdGVwLlJFQURZKSB7XG4gICAgICBhd2FpdCB0aGlzLnJlc3RhcnREZXZTZXJ2ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5jbGVhbnVwKCk7XG4gICAgICB0aGlzLnNldExvYWRpbmcoTG9hZGluZ1N0ZXAuQk9PVCk7XG5cbiAgICAgIC8vIGZvcmNlIHJlLWluaXRpYWxpemF0aW9uXG4gICAgICB0aGlzLl9pc1Byb2plY3RJbml0aWFsaXplZC5zZXQoZmFsc2UpO1xuXG4gICAgICBhd2FpdCB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICB0aGlzLm5vZGVSdW50aW1lU3RhdGUuc2V0SXNSZXNldHRpbmcoZmFsc2UpO1xuICB9XG5cbiAgYXN5bmMgcmVzdGFydERldlNlcnZlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmRldlNlcnZlclByb2Nlc3M/LmtpbGwoKTtcbiAgICBhd2FpdCB0aGlzLnN0YXJ0RGV2U2VydmVyKCk7XG4gIH1cblxuICBhc3luYyBnZXRTb2x1dGlvbkZpbGVzKCk6IFByb21pc2U8RmlsZUFuZENvbnRlbnRbXT4ge1xuICAgIGNvbnN0IHdlYkNvbnRhaW5lciA9IGF3YWl0IHRoaXMud2ViQ29udGFpbmVyUHJvbWlzZSE7XG5cbiAgICBjb25zdCBleGNsdWRlRm9sZGVycyA9IFsnbm9kZV9tb2R1bGVzJywgJy5hbmd1bGFyJywgJ2Rpc3QnXTtcblxuICAgIHJldHVybiBhd2FpdCBjaGVja0ZpbGVzSW5EaXJlY3RvcnkoXG4gICAgICAnLycsXG4gICAgICB3ZWJDb250YWluZXIuZnMsXG4gICAgICAocGF0aD86IHN0cmluZykgPT4gISFwYXRoICYmICFleGNsdWRlRm9sZGVycy5pbmNsdWRlcyhwYXRoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIFdlYkNvbnRhaW5lciBmb3IgYW4gQW5ndWxhciBwcm9qZWN0XG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGluaXRQcm9qZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIHByZXZlbnQgcmUtaW5pdGlhbGl6aW9uXG4gICAgaWYgKHRoaXMuX2lzUHJvamVjdEluaXRpYWxpemVkKCkpIHJldHVybjtcblxuICAgIC8vIGNsZWFuIHVwIHRoZSBzYW5kYm94IGlmIGl0IHdhcyBpbml0aWFsaXplZCBiZWZvcmUgc28gdGhhdCB0aGUgQ0xJIGNhblxuICAgIC8vIGJlIGluaXRpYWxpemVkIHdpdGhvdXQgY29uZmxpY3RzXG4gICAgaWYgKHRoaXMuX2lzQW5ndWxhckNsaUluaXRpYWxpemVkKCkpIHtcbiAgICAgIGF3YWl0IHRoaXMuY2xlYW51cCgpO1xuICAgICAgdGhpcy5faXNBbmd1bGFyQ2xpSW5pdGlhbGl6ZWQuc2V0KGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pc1Byb2plY3RJbml0aWFsaXplZC5zZXQodHJ1ZSk7XG5cbiAgICBhd2FpdCB0aGlzLm1vdW50UHJvamVjdEZpbGVzKCk7XG5cbiAgICB0aGlzLmhhbmRsZVByb2plY3RDaGFuZ2VzKCk7XG5cbiAgICBjb25zdCBleGl0Q29kZSA9IGF3YWl0IHRoaXMuaW5zdGFsbERlcGVuZGVuY2llcygpO1xuXG4gICAgaWYgKCFbUFJPQ0VTU19FWElUX0NPREUuU0lHVEVSTSwgUFJPQ0VTU19FWElUX0NPREUuU1VDQ0VTU10uaW5jbHVkZXMoZXhpdENvZGUpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnN0YWxsYXRpb24gZmFpbGVkJyk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbdGhpcy5sb2FkVHlwZXMoKSwgdGhpcy5zdGFydERldlNlcnZlcigpXSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVByb2plY3RDaGFuZ2VzKCkge1xuICAgIHRoaXMuZW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIudHV0b3JpYWxDaGFuZ2VkJFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgodHV0b3JpYWxDaGFuZ2VkKSA9PiAoe1xuICAgICAgICAgIHR1dG9yaWFsQ2hhbmdlZCxcbiAgICAgICAgICB0dXRvcmlhbEZpbGVzOiB0aGlzLmVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyLnR1dG9yaWFsRmlsZXMoKSxcbiAgICAgICAgfSkpLFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgKHt0dXRvcmlhbENoYW5nZWQsIHR1dG9yaWFsRmlsZXN9KSA9PlxuICAgICAgICAgICAgdHV0b3JpYWxDaGFuZ2VkICYmIE9iamVjdC5rZXlzKHR1dG9yaWFsRmlsZXMpLmxlbmd0aCA+IDAsXG4gICAgICAgICksXG4gICAgICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFt0aGlzLm1vdW50UHJvamVjdEZpbGVzKCksIHRoaXMuaGFuZGxlRmlsZXNUb0RlbGV0ZU9uUHJvamVjdENoYW5nZSgpXSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIuc2hvdWxkUmVJbnN0YWxsRGVwZW5kZW5jaWVzKCkpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUluc3RhbGxEZXBlbmRlbmNpZXNPblByb2plY3RDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUZpbGVzVG9EZWxldGVPblByb2plY3RDaGFuZ2UoKSB7XG4gICAgY29uc3QgZmlsZXNUb0RlbGV0ZSA9IEFycmF5LmZyb20oXG4gICAgICBuZXcgU2V0KFtcbiAgICAgICAgLi4udGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci5maWxlc1RvRGVsZXRlRnJvbVByZXZpb3VzUHJvamVjdCgpLFxuICAgICAgICAuLi5BcnJheS5mcm9tKHRoaXMuX2NyZWF0ZWRGaWxlcygpKSxcbiAgICAgIF0pLFxuICAgICk7XG5cbiAgICBpZiAoZmlsZXNUb0RlbGV0ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKGZpbGVzVG9EZWxldGUubWFwKChmaWxlKSA9PiB0aGlzLmRlbGV0ZUZpbGUoZmlsZSkpKTtcbiAgICB9XG5cbiAgICAvLyByZXNldCBjcmVhdGVkIGZpbGVzXG4gICAgdGhpcy5fY3JlYXRlZEZpbGVzLnNldChuZXcgU2V0KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVJbnN0YWxsRGVwZW5kZW5jaWVzT25Qcm9qZWN0Q2hhbmdlKCkge1xuICAgIC8vIE5vdGU6IHJlc3RhcnREZXZTZXJ2ZXIgaXMgbm90IHVzZWQgaGVyZSBiZWNhdXNlIHdlIG5lZWQgdG8ga2lsbFxuICAgIC8vIHRoZSBkZXYgc2VydmVyIHByb2Nlc3MgYmVmb3JlIGluc3RhbGxpbmcgZGVwZW5kZW5jaWVzIHRvIGF2b2lkXG4gICAgLy8gZXJyb3JzIGluIHRoZSBjb25zb2xlXG4gICAgdGhpcy5kZXZTZXJ2ZXJQcm9jZXNzPy5raWxsKCk7XG4gICAgYXdhaXQgdGhpcy5pbnN0YWxsRGVwZW5kZW5jaWVzKCk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW3RoaXMubG9hZFR5cGVzKCksIHRoaXMuc3RhcnREZXZTZXJ2ZXIoKV0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIFdlYkNvbnRhaW5lciBmb3IgdGhlIEFuZ3VsYXIgQ0xJXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGluaXRBbmd1bGFyQ2xpKCkge1xuICAgIC8vIHByZXZlbnQgcmUtaW5pdGlhbGl6aW9uXG4gICAgaWYgKHRoaXMuX2lzQW5ndWxhckNsaUluaXRpYWxpemVkKCkpIHJldHVybjtcblxuICAgIC8vIGNsZWFuIHVwIHRoZSBzYW5kYm94IGlmIGEgcHJvamVjdCB3YXMgaW5pdGlhbGl6ZWQgYmVmb3JlIHNvIHRoZSBDTEkgY2FuXG4gICAgLy8gYmUgaW5pdGlhbGl6ZWQgd2l0aG91dCBjb25mbGljdHNcbiAgICBpZiAodGhpcy5faXNQcm9qZWN0SW5pdGlhbGl6ZWQoKSkge1xuICAgICAgYXdhaXQgdGhpcy5jbGVhbnVwKCk7XG4gICAgICB0aGlzLnVybFRvUHJldmlldyQubmV4dChudWxsKTtcbiAgICAgIHRoaXMuX2lzUHJvamVjdEluaXRpYWxpemVkLnNldChmYWxzZSk7XG4gICAgfVxuXG4gICAgdGhpcy5faXNBbmd1bGFyQ2xpSW5pdGlhbGl6ZWQuc2V0KHRydWUpO1xuXG4gICAgdGhpcy5zZXRMb2FkaW5nKExvYWRpbmdTdGVwLklOU1RBTEwpO1xuICAgIGNvbnN0IGV4aXRDb2RlID0gYXdhaXQgdGhpcy5pbnN0YWxsQW5ndWxhckNsaSgpO1xuXG4gICAgaWYgKCFbUFJPQ0VTU19FWElUX0NPREUuU0lHVEVSTSwgUFJPQ0VTU19FWElUX0NPREUuU1VDQ0VTU10uaW5jbHVkZXMoZXhpdENvZGUpKVxuICAgICAgdGhpcy5zZXRMb2FkaW5nKExvYWRpbmdTdGVwLlJFQURZKTtcbiAgfVxuXG4gIGFzeW5jIHdyaXRlRmlsZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyB8IEJ1ZmZlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHdlYkNvbnRhaW5lciA9IGF3YWl0IHRoaXMud2ViQ29udGFpbmVyUHJvbWlzZSE7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgd2ViQ29udGFpbmVyLmZzLndyaXRlRmlsZShwYXRoLCBjb250ZW50KTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgaWYgKGVyci5tZXNzYWdlLnN0YXJ0c1dpdGgoJ0VOT0VOVCcpKSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IHBhdGguc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuam9pbignLycpO1xuXG4gICAgICAgIGF3YWl0IHdlYkNvbnRhaW5lci5mcy5ta2RpcihkaXJlY3RvcnksIHtcbiAgICAgICAgICByZWN1cnNpdmU6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHdlYkNvbnRhaW5lci5mcy53cml0ZUZpbGUocGF0aCwgY29udGVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVhZEZpbGUoZmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3Qgd2ViQ29udGFpbmVyID0gYXdhaXQgdGhpcy53ZWJDb250YWluZXJQcm9taXNlITtcblxuICAgIHJldHVybiB3ZWJDb250YWluZXIuZnMucmVhZEZpbGUoZmlsZVBhdGgsICd1dGYtOCcpO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlRmlsZShmaWxlcGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgd2ViQ29udGFpbmVyID0gYXdhaXQgdGhpcy53ZWJDb250YWluZXJQcm9taXNlITtcblxuICAgIHJldHVybiB3ZWJDb250YWluZXIuZnMucm0oZmlsZXBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGVkIGJhc2VkIG9uOlxuICAgKiBodHRwczovL3dlYmNvbnRhaW5lcnMuaW8vdHV0b3JpYWwvNy1hZGQtaW50ZXJhY3Rpdml0eSNfMi1zdGFydC10aGUtc2hlbGxcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgc3RhcnRJbnRlcmFjdGl2ZVRlcm1pbmFsKHdlYkNvbnRhaW5lcjogV2ViQ29udGFpbmVyKTogUHJvbWlzZTxXZWJDb250YWluZXJQcm9jZXNzPiB7XG4gICAgLy8gcmV0dXJuIGV4aXN0aW5nIHNoZWxsIHByb2Nlc3MgaWYgaXQncyBhbHJlYWR5IHJ1bm5pbmdcbiAgICBpZiAodGhpcy5pbnRlcmFjdGl2ZVNoZWxsUHJvY2VzcykgcmV0dXJuIHRoaXMuaW50ZXJhY3RpdmVTaGVsbFByb2Nlc3M7XG5cbiAgICBjb25zdCB0ZXJtaW5hbCA9IHRoaXMudGVybWluYWxIYW5kbGVyLmludGVyYWN0aXZlVGVybWluYWxJbnN0YW5jZTtcblxuICAgIC8vIHVzZSBXZWJDb250YWluZXIgc3Bhd24gZGlyZWN0bHkgc28gdGhhdCB0aGUgcHJvY2Nlc3MgaXNuJ3Qga2lsbGVkIG9uXG4gICAgLy8gY2xlYW51cFxuICAgIGNvbnN0IHNoZWxsUHJvY2VzcyA9IGF3YWl0IHdlYkNvbnRhaW5lci5zcGF3bignYmFzaCcpO1xuXG4gICAgdGhpcy5pbnRlcmFjdGl2ZVNoZWxsUHJvY2VzcyA9IHNoZWxsUHJvY2VzcztcblxuICAgIC8vIGtlZXAgdGhlIHJlZ2V4IG91dCBvZiB0aGUgd3JpdGUgc3RyZWFtIHRvIGF2b2lkIHJlY3JlYXRpbmcgb24gZXZlcnkgd3JpdGVcbiAgICBjb25zdCBuZ0dlbmVyYXRlVGVybWluYWxPdXRwdXRSZWdleCA9IC8oXFx1MDAxYlxcW1xcZCttKT8oW15cXHNdKykoXFx1MDAxYlxcW1xcZCttKT8vZztcblxuICAgIGF3YWl0IHNoZWxsUHJvY2Vzcy5vdXRwdXQucGlwZVRvKFxuICAgICAgbmV3IFdyaXRhYmxlU3RyZWFtKHtcbiAgICAgICAgd3JpdGU6IChkYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy5jaGVja0Zvck91dE9mTWVtb3J5RXJyb3IoZGF0YS50b1N0cmluZygpKTtcbiAgICAgICAgICB0ZXJtaW5hbC53cml0ZShkYXRhKTtcblxuICAgICAgICAgIGlmIChkYXRhLmluY2x1ZGVzKCdDUkVBVEUnKSAmJiBkYXRhLmVuZHNXaXRoKCdcXHJcXG4nKSkge1xuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBkYXRhLm1hdGNoKG5nR2VuZXJhdGVUZXJtaW5hbE91dHB1dFJlZ2V4KTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVuYW1lID0gbWF0Y2g/LlsxXTtcblxuICAgICAgICAgICAgaWYgKGZpbGVuYW1lKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2NyZWF0ZWRGaWxlJC5uZXh0KGZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgdGhpcy5fY3JlYXRlZEZpbGVzLnVwZGF0ZSgoZmlsZXMpID0+IGZpbGVzLmFkZChmaWxlbmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBpbnB1dCA9IHNoZWxsUHJvY2Vzcy5pbnB1dC5nZXRXcml0ZXIoKTtcbiAgICB0aGlzLmludGVyYWN0aXZlU2hlbGxXcml0ZXIgPSBpbnB1dDtcblxuICAgIHRlcm1pbmFsLm9uRGF0YSgoZGF0YSkgPT4ge1xuICAgICAgaW5wdXQud3JpdGUoZGF0YSk7XG4gICAgfSk7XG5cbiAgICB0ZXJtaW5hbC5icmVha1Byb2Nlc3MkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBXcml0ZSBDVFJMICsgQyBpbnRvIHNoZWxsIHRvIGJyZWFrIGFjdGl2ZSBwcm9jZXNzXG4gICAgICBpbnB1dC53cml0ZSgnXFx4MDMnKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzaGVsbFByb2Nlc3M7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG1vdW50UHJvamVjdEZpbGVzKCkge1xuICAgIGlmICghdGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci50dXRvcmlhbEZpbGVzeXN0ZW1UcmVlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGUgZmlsZXMgYXJlIG1vdW50ZWQgb24gaW5pdCBhbmQgd2hlbiB0aGUgcHJvamVjdCBjaGFuZ2VzLiBJZiB0aGUgbG9hZGluZyBzdGVwIGlzIHJlYWR5LFxuICAgIC8vIHRoZSBwcm9qZWN0IGNoYW5nZWQsIHNvIHdlIGRvbid0IG5lZWQgdG8gY2hhbmdlIHRoZSBsb2FkaW5nIHN0ZXAuXG4gICAgaWYgKHRoaXMubm9kZVJ1bnRpbWVTdGF0ZS5sb2FkaW5nU3RlcCgpICE9PSBMb2FkaW5nU3RlcC5SRUFEWSkge1xuICAgICAgdGhpcy5zZXRMb2FkaW5nKExvYWRpbmdTdGVwLkxPQURfRklMRVMpO1xuICAgIH1cblxuICAgIGNvbnN0IHR1dG9yaWFsSGFzRmlsZXMgPVxuICAgICAgT2JqZWN0LmtleXModGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci50dXRvcmlhbEZpbGVzeXN0ZW1UcmVlKCkgYXMgRmlsZVN5c3RlbVRyZWUpLmxlbmd0aCA+XG4gICAgICAwO1xuXG4gICAgaWYgKHR1dG9yaWFsSGFzRmlsZXMpIHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgdGhpcy5tb3VudEZpbGVzKHRoaXMuZW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIuY29tbW9uRmlsZXN5c3RlbVRyZWUoKSBhcyBGaWxlU3lzdGVtVHJlZSksXG4gICAgICAgIHRoaXMubW91bnRGaWxlcyh0aGlzLmVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyLnR1dG9yaWFsRmlsZXN5c3RlbVRyZWUoKSBhcyBGaWxlU3lzdGVtVHJlZSksXG4gICAgICBdKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldExvYWRpbmcobG9hZGluZzogTG9hZGluZ1N0ZXApIHtcbiAgICB0aGlzLm5vZGVSdW50aW1lU3RhdGUuc2V0TG9hZGluZ1N0ZXAobG9hZGluZyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG1vdW50RmlsZXMoZmlsZVN5c3RlbVRyZWU6IEZpbGVTeXN0ZW1UcmVlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgd2ViQ29udGFpbmVyID0gYXdhaXQgdGhpcy53ZWJDb250YWluZXJQcm9taXNlITtcblxuICAgIGF3YWl0IHdlYkNvbnRhaW5lci5tb3VudChmaWxlU3lzdGVtVHJlZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGJvb3QoKTogUHJvbWlzZTxXZWJDb250YWluZXI+IHtcbiAgICB0aGlzLnNldExvYWRpbmcoTG9hZGluZ1N0ZXAuQk9PVCk7XG5cbiAgICBpZiAoIXRoaXMud2ViQ29udGFpbmVyUHJvbWlzZSkge1xuICAgICAgdGhpcy53ZWJDb250YWluZXJQcm9taXNlID0gV2ViQ29udGFpbmVyLmJvb3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMud2ViQ29udGFpbmVyUHJvbWlzZTtcbiAgfVxuXG4gIHByaXZhdGUgdGVybWluYXRlKHdlYkNvbnRhaW5lcj86IFdlYkNvbnRhaW5lcik6IHZvaWQge1xuICAgIHdlYkNvbnRhaW5lcj8udGVhcmRvd24oKTtcbiAgICB0aGlzLndlYkNvbnRhaW5lclByb21pc2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVdlYmNvbnRhaW5lckVycm9ycygpIHtcbiAgICBjb25zdCB3ZWJDb250YWluZXIgPSBhd2FpdCB0aGlzLndlYkNvbnRhaW5lclByb21pc2UhO1xuXG4gICAgd2ViQ29udGFpbmVyLm9uKCdlcnJvcicsICh7bWVzc2FnZX0pID0+IHtcbiAgICAgIGlmICh0aGlzLmNoZWNrRm9yT3V0T2ZNZW1vcnlFcnJvcihtZXNzYWdlKSkgcmV0dXJuO1xuXG4gICAgICB0aGlzLnNldEVycm9yU3RhdGUobWVzc2FnZSwgRXJyb3JUeXBlLlVOS05PV04pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0Zvck91dE9mTWVtb3J5RXJyb3IobWVzc2FnZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKG1lc3NhZ2UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhPVVRfT0ZfTUVNT1JZX01TRy50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgdGhpcy5zZXRFcnJvclN0YXRlKG1lc3NhZ2UsIEVycm9yVHlwZS5PVVRfT0ZfTUVNT1JZKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RXJyb3JTdGF0ZShtZXNzYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQsIHR5cGU/OiBFcnJvclR5cGUpIHtcbiAgICB0aGlzLm5vZGVSdW50aW1lU3RhdGUuc2V0RXJyb3Ioe21lc3NhZ2UsIHR5cGV9KTtcbiAgICB0aGlzLm5vZGVSdW50aW1lU3RhdGUuc2V0TG9hZGluZ1N0ZXAoTG9hZGluZ1N0ZXAuRVJST1IpO1xuICAgIHRoaXMudGVybWluYXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGluc3RhbGxEZXBlbmRlbmNpZXMoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICB0aGlzLnNldExvYWRpbmcoTG9hZGluZ1N0ZXAuSU5TVEFMTCk7XG5cbiAgICBjb25zdCBpbnN0YWxsUHJvY2VzcyA9IGF3YWl0IHRoaXMuc3Bhd24oUEFDS0FHRV9NQU5BR0VSLCBbJ2luc3RhbGwnXSk7XG5cbiAgICBhd2FpdCBpbnN0YWxsUHJvY2Vzcy5vdXRwdXQucGlwZVRvKFxuICAgICAgbmV3IFdyaXRhYmxlU3RyZWFtKHtcbiAgICAgICAgd3JpdGU6IChkYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy50ZXJtaW5hbEhhbmRsZXIucmVhZG9ubHlUZXJtaW5hbEluc3RhbmNlLndyaXRlKGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIC8vIHdhaXQgZm9yIGluc3RhbGwgY29tbWFuZCB0byBleGl0XG4gICAgcmV0dXJuIGluc3RhbGxQcm9jZXNzLmV4aXQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGxvYWRUeXBlcygpIHtcbiAgICBjb25zdCB3ZWJDb250YWluZXIgPSBhd2FpdCB0aGlzLndlYkNvbnRhaW5lclByb21pc2UhO1xuICAgIGF3YWl0IHRoaXMudHlwaW5nc0xvYWRlci5yZXRyaWV2ZVR5cGVEZWZpbml0aW9ucyh3ZWJDb250YWluZXIhKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaW5zdGFsbEFuZ3VsYXJDbGkoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAvLyBpbnN0YWxsIEFuZ3VsYXIgQ0xJXG4gICAgY29uc3QgaW5zdGFsbFByb2Nlc3MgPSBhd2FpdCB0aGlzLnNwYXduKFBBQ0tBR0VfTUFOQUdFUiwgWydpbnN0YWxsJywgJ0Bhbmd1bGFyL2NsaUBsYXRlc3QnXSk7XG5cbiAgICBhd2FpdCBpbnN0YWxsUHJvY2Vzcy5vdXRwdXQucGlwZVRvKFxuICAgICAgbmV3IFdyaXRhYmxlU3RyZWFtKHtcbiAgICAgICAgd3JpdGU6IChkYXRhKSA9PiB7XG4gICAgICAgICAgdGhpcy50ZXJtaW5hbEhhbmRsZXIuaW50ZXJhY3RpdmVUZXJtaW5hbEluc3RhbmNlLndyaXRlKGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGNvbnN0IGV4aXRDb2RlID0gYXdhaXQgaW5zdGFsbFByb2Nlc3MuZXhpdDtcblxuICAgIC8vIFNpbXVsYXRlIHByZXNzaW5nIGBFbnRlcmAgaW4gc2hlbGxcbiAgICBhd2FpdCB0aGlzLmludGVyYWN0aXZlU2hlbGxXcml0ZXI/LndyaXRlKCdcXHgwRCcpO1xuXG4gICAgcmV0dXJuIGV4aXRDb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzdGFydERldlNlcnZlcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB3ZWJDb250YWluZXIgPSBhd2FpdCB0aGlzLndlYkNvbnRhaW5lclByb21pc2UhO1xuXG4gICAgdGhpcy5zZXRMb2FkaW5nKExvYWRpbmdTdGVwLlNUQVJUX0RFVl9TRVJWRVIpO1xuXG4gICAgdGhpcy5kZXZTZXJ2ZXJQcm9jZXNzID0gYXdhaXQgdGhpcy5zcGF3bihQQUNLQUdFX01BTkFHRVIsIFsncnVuJywgJ3N0YXJ0J10pO1xuXG4gICAgLy8gd2FpdCBmb3IgYHNlcnZlci1yZWFkeWAgZXZlbnQsIGZvcndhcmQgdGhlIGRldiBzZXJ2ZXIgdXJsXG4gICAgd2ViQ29udGFpbmVyLm9uKCdzZXJ2ZXItcmVhZHknLCAocG9ydDogbnVtYmVyLCB1cmw6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy51cmxUb1ByZXZpZXckLm5leHQodXJsKTtcbiAgICB9KTtcblxuICAgIC8vIHdhaXQgdW50aWwgdGhlIGRldiBzZXJ2ZXIgZmluaXNoZXMgdGhlIGZpcnN0IGNvbXBpbGF0aW9uXG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmRldlNlcnZlclByb2Nlc3MpIHtcbiAgICAgICAgcmVqZWN0KCdkZXYgc2VydmVyIGlzIG5vdCBydW5uaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kZXZTZXJ2ZXJQcm9jZXNzLm91dHB1dC5waXBlVG8oXG4gICAgICAgIG5ldyBXcml0YWJsZVN0cmVhbSh7XG4gICAgICAgICAgd3JpdGU6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRlcm1pbmFsSGFuZGxlci5yZWFkb25seVRlcm1pbmFsSW5zdGFuY2Uud3JpdGUoZGF0YSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrRm9yT3V0T2ZNZW1vcnlFcnJvcihkYXRhLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoZGF0YS50b1N0cmluZygpKSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB0aGlzLm5vZGVSdW50aW1lU3RhdGUubG9hZGluZ1N0ZXAoKSAhPT0gTG9hZGluZ1N0ZXAuUkVBRFkgJiZcbiAgICAgICAgICAgICAgZGF0YS50b1N0cmluZygpLmluY2x1ZGVzKERFVl9TRVJWRVJfUkVBRFlfTVNHKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgdGhpcy5zZXRMb2FkaW5nKExvYWRpbmdTdGVwLlJFQURZKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU3Bhd24gYSBwcm9jZXNzIGluIHRoZSBXZWJDb250YWluZXIgYW5kIHN0b3JlIHRoZSBwcm9jZXNzIGluIHRoZSBzZXJ2aWNlLlxuICAgKiBMYXRlciBvbiB0aGUgc3RvcmVkIHByb2Nlc3MgY2FuIGJlIHVzZWQgdG8ga2lsbCB0aGUgcHJvY2VzcyBvbiBgY2xlYW51cGBcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgc3Bhd24oY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSA9IFtdKTogUHJvbWlzZTxXZWJDb250YWluZXJQcm9jZXNzPiB7XG4gICAgY29uc3Qgd2ViQ29udGFpbmVyID0gYXdhaXQgdGhpcy53ZWJDb250YWluZXJQcm9taXNlITtcblxuICAgIGNvbnN0IHByb2Nlc3MgPSBhd2FpdCB3ZWJDb250YWluZXIuc3Bhd24oY29tbWFuZCwgYXJncyk7XG5cbiAgICBjb25zdCB0cmFuc2Zvcm1TdHJlYW0gPSBuZXcgVHJhbnNmb3JtU3RyZWFtKHtcbiAgICAgIHRyYW5zZm9ybTogKGNodW5rLCBjb250cm9sbGVyKSA9PiB7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JPdXRPZk1lbW9yeUVycm9yKGNodW5rLnRvU3RyaW5nKCkpO1xuICAgICAgICBjb250cm9sbGVyLmVucXVldWUoY2h1bmspO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHByb2Nlc3Mub3V0cHV0ID0gcHJvY2Vzcy5vdXRwdXQucGlwZVRocm91Z2godHJhbnNmb3JtU3RyZWFtKTtcblxuICAgIHRoaXMucHJvY2Vzc2VzLmFkZChwcm9jZXNzKTtcblxuICAgIHJldHVybiBwcm9jZXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIEtpbGwgZXhpc3RpbmcgcHJvY2Vzc2VzIGFuZCByZW1vdmUgZmlsZXMgZnJvbSB0aGUgV2ViQ29udGFpbmVyXG4gICAqIHdoZW4gc3dpdGNoaW5nIHR1dG9yaWFscyB0aGF0IGhhdmUgZGlmZXJlbnQgcmVxdWlyZW1lbnRzXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGNsZWFudXAoKSB7XG4gICAgLy8gYXdhaXQgdGhlIHByb2NjZXNzIHRvIGJlIGtpbGxlZCBiZWZvcmUgcmVtb3ZpbmcgdGhlIGZpbGVzIGJlY2F1c2VcbiAgICAvLyBhIHByb2Nlc3MgY2FuIGNyZWF0ZSBmaWxlcyBkdXJpbmcgdGhlIHByb21pc2VcbiAgICBhd2FpdCB0aGlzLmtpbGxFeGlzdGluZ1Byb2Nlc3NlcygpO1xuICAgIGF3YWl0IHRoaXMucmVtb3ZlRmlsZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMga2lsbEV4aXN0aW5nUHJvY2Vzc2VzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IFByb21pc2UuYWxsKEFycmF5LmZyb20odGhpcy5wcm9jZXNzZXMpLm1hcCgocHJvY2VzcykgPT4gcHJvY2Vzcy5raWxsKCkpKTtcbiAgICB0aGlzLnByb2Nlc3Nlcy5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZW1vdmVGaWxlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB3ZWJjb250YWluZXIgPSBhd2FpdCB0aGlzLndlYkNvbnRhaW5lclByb21pc2UhO1xuXG4gICAgYXdhaXQgd2ViY29udGFpbmVyLnNwYXduKCdybScsIFsnLXJmJywgJy4vKionXSk7XG4gIH1cbn1cbiJdfQ==