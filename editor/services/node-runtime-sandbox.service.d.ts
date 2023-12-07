/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="node" />
import { FileAndContent } from '../../interfaces/index.js';
export declare const DEV_SERVER_READY_MSG = "Watch mode enabled. Watching for file changes...";
export declare const OUT_OF_MEMORY_MSG = "Out of memory";
export declare const PACKAGE_MANAGER = "npm";
export declare enum LoadingStep {
    NOT_STARTED = 0,
    BOOT = 1,
    LOAD_FILES = 2,
    INSTALL = 3,
    START_DEV_SERVER = 4,
    READY = 5,
    ERROR = 6
}
/**
 * This service is responsible for handling the WebContainer instance, which
 * allows running a Node.js environment in the browser. It is used by the
 * embedded editor to run an executable Angular project in the browser.
 *
 * It boots the WebContainer, loads the project files into the WebContainer
 * filesystem, install the project dependencies and starts the dev server.
 */
export declare class NodeRuntimeSandbox {
    private readonly _createdFile$;
    readonly createdFile$: import("rxjs").Observable<string>;
    private readonly _createdFiles;
    private interactiveShellProcess;
    private interactiveShellWriter;
    private readonly destroyRef;
    private readonly alertManager;
    private readonly terminalHandler;
    private embeddedTutorialManager;
    private readonly nodeRuntimeState;
    private readonly typingsLoader;
    private readonly _isProjectInitialized;
    private readonly _isAngularCliInitialized;
    private urlToPreview$;
    private readonly _previewUrl$;
    private readonly processes;
    private devServerProcess;
    private webContainerPromise;
    get previewUrl$(): import("rxjs").Observable<string | null>;
    init(): Promise<void>;
    reset(): Promise<void>;
    restartDevServer(): Promise<void>;
    getSolutionFiles(): Promise<FileAndContent[]>;
    /**
     * Initialize the WebContainer for an Angular project
     */
    private initProject;
    private handleProjectChanges;
    private handleFilesToDeleteOnProjectChange;
    private handleInstallDependenciesOnProjectChange;
    /**
     * Initialize the WebContainer for the Angular CLI
     */
    private initAngularCli;
    writeFile(path: string, content: string | Buffer): Promise<void>;
    readFile(filePath: string): Promise<string>;
    deleteFile(filepath: string): Promise<void>;
    /**
     * Implemented based on:
     * https://webcontainers.io/tutorial/7-add-interactivity#_2-start-the-shell
     */
    private startInteractiveTerminal;
    private mountProjectFiles;
    private setLoading;
    private mountFiles;
    private boot;
    private terminate;
    private handleWebcontainerErrors;
    private checkForOutOfMemoryError;
    private setErrorState;
    private installDependencies;
    private loadTypes;
    private installAngularCli;
    private startDevServer;
    /**
     * Spawn a process in the WebContainer and store the process in the service.
     * Later on the stored process can be used to kill the process on `cleanup`
     */
    private spawn;
    /**
     * Kill existing processes and remove files from the WebContainer
     * when switching tutorials that have diferent requirements
     */
    private cleanup;
    private killExistingProcesses;
    private removeFiles;
}
