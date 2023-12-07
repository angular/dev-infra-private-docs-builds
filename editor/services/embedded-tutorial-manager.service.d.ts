/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { FileSystemTree } from '@webcontainer/api';
export declare const TUTORIALS_COMMON_DIRECTORY = "common";
export declare const TUTORIALS_METADATA_WEB_PATH = "web_path";
export declare const TUTORIALS_SOURCE_CODE_WEB_PATH = "code_web_path";
/**
 * A service responsible for the current tutorial, retrieving and providing
 * its source code and metadata.
 */
export declare class EmbeddedTutorialManager {
    readonly tutorialId: import("@angular/core").WritableSignal<string>;
    readonly tutorialFilesystemTree: import("@angular/core").WritableSignal<FileSystemTree | null>;
    readonly commonFilesystemTree: import("@angular/core").WritableSignal<FileSystemTree | null>;
    readonly type: import("@angular/core").WritableSignal<import("../../interfaces/tutorial.js").TutorialType | undefined>;
    private readonly allFiles;
    readonly hiddenFiles: import("@angular/core").WritableSignal<string[]>;
    readonly tutorialFiles: import("@angular/core").WritableSignal<import("../../interfaces/tutorial.js").FileAndContentRecord>;
    readonly openFiles: import("@angular/core").WritableSignal<string[]>;
    readonly answerFiles: import("@angular/core").WritableSignal<import("../../interfaces/tutorial.js").FileAndContentRecord>;
    readonly dependencies: import("@angular/core").WritableSignal<Record<string, string> | undefined>;
    private _shouldReInstallDependencies;
    readonly shouldReInstallDependencies: import("@angular/core").Signal<boolean>;
    private metadata;
    private _shouldChangeTutorial$;
    readonly tutorialChanged$: import("rxjs").Observable<boolean>;
    private readonly _filesToDeleteFromPreviousProject;
    readonly filesToDeleteFromPreviousProject: import("@angular/core").Signal<Set<string>>;
    fetchAndSetTutorialFiles(tutorial: string): Promise<void>;
    revealAnswer(): void;
    resetRevealAnswer(): void;
    fetchCommonFiles(): Promise<FileSystemTree>;
    private fetchTutorialSourceCode;
    private fetchTutorialMetadata;
    /**
     * Compare previous and new dependencies to determine if the dependencies changed.
     */
    private checkIfDependenciesChanged;
    private computeFilesToRemove;
}
