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
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export const TUTORIALS_COMMON_DIRECTORY = 'common';
export const TUTORIALS_METADATA_WEB_PATH = 'web_path';
export const TUTORIALS_SOURCE_CODE_WEB_PATH = 'code_web_path';
/**
 * A service responsible for the current tutorial, retrieving and providing
 * its source code and metadata.
 */
let EmbeddedTutorialManager = class EmbeddedTutorialManager {
    constructor() {
        this.tutorialId = signal('');
        this.tutorialFilesystemTree = signal(null);
        this.commonFilesystemTree = signal(null);
        this.type = signal(undefined);
        this.allFiles = signal([]);
        this.hiddenFiles = signal([]);
        this.tutorialFiles = signal({});
        this.openFiles = signal([]);
        this.answerFiles = signal({});
        this.dependencies = signal(undefined);
        this._shouldReInstallDependencies = signal(false);
        this.shouldReInstallDependencies = this._shouldReInstallDependencies.asReadonly();
        this.metadata = signal(undefined);
        this._shouldChangeTutorial$ = new BehaviorSubject(false);
        this.tutorialChanged$ = this._shouldChangeTutorial$.asObservable();
        this._filesToDeleteFromPreviousProject = signal(new Set());
        this.filesToDeleteFromPreviousProject = this._filesToDeleteFromPreviousProject.asReadonly();
    }
    async fetchAndSetTutorialFiles(tutorial) {
        const [commonSourceCode, tutorialSourceCode, metadata] = await Promise.all([
            this.fetchCommonFiles(),
            this.fetchTutorialSourceCode(tutorial),
            this.fetchTutorialMetadata(tutorial),
        ]);
        const projectChanged = !!this.tutorialId() && this.tutorialId() !== tutorial;
        this.tutorialId.set(tutorial);
        this.type.set(metadata.type);
        this.metadata.set(metadata);
        if (tutorialSourceCode) {
            if (projectChanged) {
                const filesToRemove = this.computeFilesToRemove(metadata.allFiles, this.allFiles());
                if (filesToRemove) {
                    this._filesToDeleteFromPreviousProject.set(filesToRemove);
                }
                this._shouldReInstallDependencies.set(this.checkIfDependenciesChanged(metadata.dependencies ?? {}));
            }
            this.tutorialFilesystemTree.set(tutorialSourceCode);
            this.dependencies.set(metadata.dependencies ?? {});
            this.tutorialFiles.set(metadata.tutorialFiles);
            this.answerFiles.set(metadata.answerFiles ?? {});
            this.openFiles.set(metadata.openFiles);
            this.hiddenFiles.set(metadata.hiddenFiles);
            this.allFiles.set(metadata.allFiles);
            // set common only once
            if (!this.commonFilesystemTree())
                this.commonFilesystemTree.set(commonSourceCode);
        }
        this._shouldChangeTutorial$.next(projectChanged);
    }
    revealAnswer() {
        const answerFilenames = Object.keys(this.answerFiles());
        const openFilesAndAnswer = Array.from(
        // use Set to remove duplicates, spread openFiles first to keep files order
        new Set([...this.openFiles(), ...answerFilenames])).filter((filename) => !this.hiddenFiles()?.includes(filename));
        const tutorialFiles = Object.fromEntries(openFilesAndAnswer.map((file) => [file, this.answerFiles()[file]]));
        const allFilesWithAnswer = [...this.allFiles(), ...answerFilenames];
        const filesToDelete = this.computeFilesToRemove(allFilesWithAnswer, this.allFiles());
        if (filesToDelete) {
            this._filesToDeleteFromPreviousProject.set(filesToDelete);
        }
        this.allFiles.set(allFilesWithAnswer);
        this.tutorialFiles.set(tutorialFiles);
        this.openFiles.set(openFilesAndAnswer);
        this._shouldChangeTutorial$.next(true);
    }
    resetRevealAnswer() {
        const allFilesWithoutAnswer = this.metadata().allFiles;
        const filesToDelete = this.computeFilesToRemove(allFilesWithoutAnswer, this.allFiles());
        if (filesToDelete) {
            this._filesToDeleteFromPreviousProject.set(filesToDelete);
        }
        this.tutorialFiles.set(this.metadata().tutorialFiles);
        this.openFiles.set(this.metadata().openFiles);
        this._shouldChangeTutorial$.next(true);
    }
    async fetchCommonFiles() {
        if (this.commonFilesystemTree() !== null)
            return this.commonFilesystemTree();
        const commonFiles = await this.fetchTutorialSourceCode(TUTORIALS_COMMON_DIRECTORY);
        this.tutorialFilesystemTree.set(commonFiles);
        return commonFiles;
    }
    async fetchTutorialSourceCode(tutorial) {
        const tutorialSourceCode = await fetch(`${TUTORIALS_SOURCE_CODE_WEB_PATH}/${tutorial}.json`);
        if (!tutorialSourceCode.ok)
            throw new Error(`Missing source code for tutorial ${tutorial}`);
        return await tutorialSourceCode.json();
    }
    async fetchTutorialMetadata(tutorial) {
        const tutorialSourceCode = await fetch(`${TUTORIALS_METADATA_WEB_PATH}/${tutorial}.json`);
        if (!tutorialSourceCode.ok)
            throw new Error(`Missing metadata for ${tutorial}`);
        return await tutorialSourceCode.json();
    }
    /**
     * Compare previous and new dependencies to determine if the dependencies changed.
     */
    checkIfDependenciesChanged(newDeps) {
        const existingDeps = this.dependencies();
        for (const name of Object.keys(newDeps)) {
            if (existingDeps?.[name] !== newDeps[name]) {
                return true;
            }
        }
        return false;
    }
    computeFilesToRemove(newFiles, existingFiles) {
        // All existing files are candidates for removal.
        const filesToDelete = new Set(existingFiles);
        // Retain files that are present in the new project.
        for (const file of newFiles) {
            filesToDelete.delete(file);
        }
        return filesToDelete;
    }
};
EmbeddedTutorialManager = __decorate([
    Injectable({ providedIn: 'root' })
], EmbeddedTutorialManager);
export { EmbeddedTutorialManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWRkZWQtdHV0b3JpYWwtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3Ivc2VydmljZXMvZW1iZWRkZWQtdHV0b3JpYWwtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFJckMsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQUcsUUFBUSxDQUFDO0FBQ25ELE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLFVBQVUsQ0FBQztBQUN0RCxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FBRyxlQUFlLENBQUM7QUFFOUQ7OztHQUdHO0FBRUksSUFBTSx1QkFBdUIsR0FBN0IsTUFBTSx1QkFBdUI7SUFBN0I7UUFDSSxlQUFVLEdBQUcsTUFBTSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLDJCQUFzQixHQUFHLE1BQU0sQ0FBd0IsSUFBSSxDQUFDLENBQUM7UUFDN0QseUJBQW9CLEdBQUcsTUFBTSxDQUF3QixJQUFJLENBQUMsQ0FBQztRQUUzRCxTQUFJLEdBQUcsTUFBTSxDQUF1QyxTQUFTLENBQUMsQ0FBQztRQUV2RCxhQUFRLEdBQUcsTUFBTSxDQUErQixFQUFFLENBQUMsQ0FBQztRQUU1RCxnQkFBVyxHQUFHLE1BQU0sQ0FBa0MsRUFBRSxDQUFDLENBQUM7UUFDMUQsa0JBQWEsR0FBRyxNQUFNLENBQW9DLEVBQUUsQ0FBQyxDQUFDO1FBQzlELGNBQVMsR0FBRyxNQUFNLENBQWdDLEVBQUUsQ0FBQyxDQUFDO1FBRXRELGdCQUFXLEdBQUcsTUFBTSxDQUErQyxFQUFFLENBQUMsQ0FBQztRQUV2RSxpQkFBWSxHQUFHLE1BQU0sQ0FBK0MsU0FBUyxD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QUN2QixDQUFDO0NBQ0YsQ0FBQTtBQXJLWSx1QkFBdUI7SUFEbkMsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO0dBQ3BCLHVCQUF1QixDQXFLbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgc2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RmlsZVN5c3RlbVRyZWV9IGZyb20gJ0B3ZWJjb250YWluZXIvYXBpJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtUdXRvcmlhbE1ldGFkYXRhfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2luZGV4LmpzJztcblxuZXhwb3J0IGNvbnN0IFRVVE9SSUFMU19DT01NT05fRElSRUNUT1JZID0gJ2NvbW1vbic7XG5leHBvcnQgY29uc3QgVFVUT1JJQUxTX01FVEFEQVRBX1dFQl9QQVRIID0gJ3dlYl9wYXRoJztcbmV4cG9ydCBjb25zdCBUVVRPUklBTFNfU09VUkNFX0NPREVfV0VCX1BBVEggPSAnY29kZV93ZWJfcGF0aCc7XG5cbi8qKlxuICogQSBzZXJ2aWNlIHJlc3BvbnNpYmxlIGZvciB0aGUgY3VycmVudCB0dXRvcmlhbCwgcmV0cmlldmluZyBhbmQgcHJvdmlkaW5nXG4gKiBpdHMgc291cmNlIGNvZGUgYW5kIG1ldGFkYXRhLlxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBFbWJlZGRlZFR1dG9yaWFsTWFuYWdlciB7XG4gIHJlYWRvbmx5IHR1dG9yaWFsSWQgPSBzaWduYWw8c3RyaW5nPignJyk7XG4gIHJlYWRvbmx5IHR1dG9yaWFsRmlsZXN5c3RlbVRyZWUgPSBzaWduYWw8RmlsZVN5c3RlbVRyZWUgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgY29tbW9uRmlsZXN5c3RlbVRyZWUgPSBzaWduYWw8RmlsZVN5c3RlbVRyZWUgfCBudWxsPihudWxsKTtcblxuICByZWFkb25seSB0eXBlID0gc2lnbmFsPFR1dG9yaWFsTWV0YWRhdGFbJ3R5cGUnXSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGFsbEZpbGVzID0gc2lnbmFsPFR1dG9yaWFsTWV0YWRhdGFbJ2FsbEZpbGVzJ10+KFtdKTtcblxuICByZWFkb25seSBoaWRkZW5GaWxlcyA9IHNpZ25hbDxUdXRvcmlhbE1ldGFkYXRhWydoaWRkZW5GaWxlcyddPihbXSk7XG4gIHJlYWRvbmx5IHR1dG9yaWFsRmlsZXMgPSBzaWduYWw8VHV0b3JpYWxNZXRhZGF0YVsndHV0b3JpYWxGaWxlcyddPih7fSk7XG4gIHJlYWRvbmx5IG9wZW5GaWxlcyA9IHNpZ25hbDxUdXRvcmlhbE1ldGFkYXRhWydvcGVuRmlsZXMnXT4oW10pO1xuXG4gIHJlYWRvbmx5IGFuc3dlckZpbGVzID0gc2lnbmFsPE5vbk51bGxhYmxlPFR1dG9yaWFsTWV0YWRhdGFbJ2Fuc3dlckZpbGVzJ10+Pih7fSk7XG5cbiAgcmVhZG9ubHkgZGVwZW5kZW5jaWVzID0gc2lnbmFsPFR1dG9yaWFsTWV0YWRhdGFbJ2RlcGVuZGVuY2llcyddIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICBwcml2YXRlIF9zaG91bGRSZUluc3RhbGxEZXBlbmRlbmNpZXMgPSBzaWduYWw8Ym9vbGVhbj4oZmFsc2UpO1xuICByZWFkb25seSBzaG91bGRSZUluc3RhbGxEZXBlbmRlbmNpZXMgPSB0aGlzLl9zaG91bGRSZUluc3RhbGxEZXBlbmRlbmNpZXMuYXNSZWFkb25seSgpO1xuXG4gIHByaXZhdGUgbWV0YWRhdGEgPSBzaWduYWw8VHV0b3JpYWxNZXRhZGF0YSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICBwcml2YXRlIF9zaG91bGRDaGFuZ2VUdXRvcmlhbCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVhZG9ubHkgdHV0b3JpYWxDaGFuZ2VkJCA9IHRoaXMuX3Nob3VsZENoYW5nZVR1dG9yaWFsJC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9maWxlc1RvRGVsZXRlRnJvbVByZXZpb3VzUHJvamVjdCA9IHNpZ25hbChuZXcgU2V0PHN0cmluZz4oKSk7XG4gIHJlYWRvbmx5IGZpbGVzVG9EZWxldGVGcm9tUHJldmlvdXNQcm9qZWN0ID0gdGhpcy5fZmlsZXNUb0RlbGV0ZUZyb21QcmV2aW91c1Byb2plY3QuYXNSZWFkb25seSgpO1xuXG4gIGFzeW5jIGZldGNoQW5kU2V0VHV0b3JpYWxGaWxlcyh0dXRvcmlhbDogc3RyaW5nKSB7XG4gICAgY29uc3QgW2NvbW1vblNvdXJjZUNvZGUsIHR1dG9yaWFsU291cmNlQ29kZSwgbWV0YWRhdGFdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5mZXRjaENvbW1vbkZpbGVzKCksXG4gICAgICB0aGlzLmZldGNoVHV0b3JpYWxTb3VyY2VDb2RlKHR1dG9yaWFsKSxcbiAgICAgIHRoaXMuZmV0Y2hUdXRvcmlhbE1ldGFkYXRhKHR1dG9yaWFsKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IHByb2plY3RDaGFuZ2VkID0gISF0aGlzLnR1dG9yaWFsSWQoKSAmJiB0aGlzLnR1dG9yaWFsSWQoKSAhPT0gdHV0b3JpYWw7XG5cbiAgICB0aGlzLnR1dG9yaWFsSWQuc2V0KHR1dG9yaWFsKTtcbiAgICB0aGlzLnR5cGUuc2V0KG1ldGFkYXRhLnR5cGUpO1xuXG4gICAgdGhpcy5tZXRhZGF0YS5zZXQobWV0YWRhdGEpO1xuXG4gICAgaWYgKHR1dG9yaWFsU291cmNlQ29kZSkge1xuICAgICAgaWYgKHByb2plY3RDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGZpbGVzVG9SZW1vdmUgPSB0aGlzLmNvbXB1dGVGaWxlc1RvUmVtb3ZlKG1ldGFkYXRhLmFsbEZpbGVzLCB0aGlzLmFsbEZpbGVzKCkpO1xuICAgICAgICBpZiAoZmlsZXNUb1JlbW92ZSkge1xuICAgICAgICAgIHRoaXMuX2ZpbGVzVG9EZWxldGVGcm9tUHJldmlvdXNQcm9qZWN0LnNldChmaWxlc1RvUmVtb3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3Nob3VsZFJlSW5zdGFsbERlcGVuZGVuY2llcy5zZXQoXG4gICAgICAgICAgdGhpcy5jaGVja0lmRGVwZW5kZW5jaWVzQ2hhbmdlZChtZXRhZGF0YS5kZXBlbmRlbmNpZXMgPz8ge30pLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnR1dG9yaWFsRmlsZXN5c3RlbVRyZWUuc2V0KHR1dG9yaWFsU291cmNlQ29kZSk7XG4gICAgICB0aGlzLmRlcGVuZGVuY2llcy5zZXQobWV0YWRhdGEuZGVwZW5kZW5jaWVzID8/IHt9KTtcblxuICAgICAgdGhpcy50dXRvcmlhbEZpbGVzLnNldChtZXRhZGF0YS50dXRvcmlhbEZpbGVzKTtcbiAgICAgIHRoaXMuYW5zd2VyRmlsZXMuc2V0KG1ldGFkYXRhLmFuc3dlckZpbGVzID8/IHt9KTtcbiAgICAgIHRoaXMub3BlbkZpbGVzLnNldChtZXRhZGF0YS5vcGVuRmlsZXMpO1xuICAgICAgdGhpcy5oaWRkZW5GaWxlcy5zZXQobWV0YWRhdGEuaGlkZGVuRmlsZXMpO1xuICAgICAgdGhpcy5hbGxGaWxlcy5zZXQobWV0YWRhdGEuYWxsRmlsZXMpO1xuXG4gICAgICAvLyBzZXQgY29tbW9uIG9ubHkgb25jZVxuICAgICAgaWYgKCF0aGlzLmNvbW1vbkZpbGVzeXN0ZW1UcmVlKCkpIHRoaXMuY29tbW9uRmlsZXN5c3RlbVRyZWUuc2V0KGNvbW1vblNvdXJjZUNvZGUpO1xuICAgIH1cblxuICAgIHRoaXMuX3Nob3VsZENoYW5nZVR1dG9yaWFsJC5uZXh0KHByb2plY3RDaGFuZ2VkKTtcbiAgfVxuXG4gIHJldmVhbEFuc3dlcigpIHtcbiAgICBjb25zdCBhbnN3ZXJGaWxlbmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmFuc3dlckZpbGVzKCkpO1xuXG4gICAgY29uc3Qgb3BlbkZpbGVzQW5kQW5zd2VyID0gQXJyYXkuZnJvbShcbiAgICAgIC8vIHVzZSBTZXQgdG8gcmVtb3ZlIGR1cGxpY2F0ZXMsIHNwcmVhZCBvcGVuRmlsZXMgZmlyc3QgdG8ga2VlcCBmaWxlcyBvcmRlclxuICAgICAgbmV3IFNldChbLi4udGhpcy5vcGVuRmlsZXMoKSwgLi4uYW5zd2VyRmlsZW5hbWVzXSksXG4gICAgKS5maWx0ZXIoKGZpbGVuYW1lKSA9PiAhdGhpcy5oaWRkZW5GaWxlcygpPy5pbmNsdWRlcyhmaWxlbmFtZSkpO1xuXG4gICAgY29uc3QgdHV0b3JpYWxGaWxlcyA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIG9wZW5GaWxlc0FuZEFuc3dlci5tYXAoKGZpbGUpID0+IFtmaWxlLCB0aGlzLmFuc3dlckZpbGVzKClbZmlsZV1dKSxcbiAgICApO1xuXG4gICAgY29uc3QgYWxsRmlsZXNXaXRoQW5zd2VyID0gWy4uLnRoaXMuYWxsRmlsZXMoKSwgLi4uYW5zd2VyRmlsZW5hbWVzXTtcblxuICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSB0aGlzLmNvbXB1dGVGaWxlc1RvUmVtb3ZlKGFsbEZpbGVzV2l0aEFuc3dlciwgdGhpcy5hbGxGaWxlcygpKTtcblxuICAgIGlmIChmaWxlc1RvRGVsZXRlKSB7XG4gICAgICB0aGlzLl9maWxlc1RvRGVsZXRlRnJvbVByZXZpb3VzUHJvamVjdC5zZXQoZmlsZXNUb0RlbGV0ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5hbGxGaWxlcy5zZXQoYWxsRmlsZXNXaXRoQW5zd2VyKTtcbiAgICB0aGlzLnR1dG9yaWFsRmlsZXMuc2V0KHR1dG9yaWFsRmlsZXMpO1xuICAgIHRoaXMub3BlbkZpbGVzLnNldChvcGVuRmlsZXNBbmRBbnN3ZXIpO1xuICAgIHRoaXMuX3Nob3VsZENoYW5nZVR1dG9yaWFsJC5uZXh0KHRydWUpO1xuICB9XG5cbiAgcmVzZXRSZXZlYWxBbnN3ZXIoKSB7XG4gICAgY29uc3QgYWxsRmlsZXNXaXRob3V0QW5zd2VyID0gdGhpcy5tZXRhZGF0YSgpIS5hbGxGaWxlcztcbiAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gdGhpcy5jb21wdXRlRmlsZXNUb1JlbW92ZShhbGxGaWxlc1dpdGhvdXRBbnN3ZXIsIHRoaXMuYWxsRmlsZXMoKSk7XG5cbiAgICBpZiAoZmlsZXNUb0RlbGV0ZSkge1xuICAgICAgdGhpcy5fZmlsZXNUb0RlbGV0ZUZyb21QcmV2aW91c1Byb2plY3Quc2V0KGZpbGVzVG9EZWxldGUpO1xuICAgIH1cblxuICAgIHRoaXMudHV0b3JpYWxGaWxlcy5zZXQodGhpcy5tZXRhZGF0YSgpIS50dXRvcmlhbEZpbGVzKTtcbiAgICB0aGlzLm9wZW5GaWxlcy5zZXQodGhpcy5tZXRhZGF0YSgpIS5vcGVuRmlsZXMpO1xuICAgIHRoaXMuX3Nob3VsZENoYW5nZVR1dG9yaWFsJC5uZXh0KHRydWUpO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hDb21tb25GaWxlcygpOiBQcm9taXNlPEZpbGVTeXN0ZW1UcmVlPiB7XG4gICAgaWYgKHRoaXMuY29tbW9uRmlsZXN5c3RlbVRyZWUoKSAhPT0gbnVsbCkgcmV0dXJuIHRoaXMuY29tbW9uRmlsZXN5c3RlbVRyZWUoKSBhcyBGaWxlU3lzdGVtVHJlZTtcblxuICAgIGNvbnN0IGNvbW1vbkZpbGVzID0gYXdhaXQgdGhpcy5mZXRjaFR1dG9yaWFsU291cmNlQ29kZShUVVRPUklBTFNfQ09NTU9OX0RJUkVDVE9SWSk7XG5cbiAgICB0aGlzLnR1dG9yaWFsRmlsZXN5c3RlbVRyZWUuc2V0KGNvbW1vbkZpbGVzKTtcblxuICAgIHJldHVybiBjb21tb25GaWxlcztcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZmV0Y2hUdXRvcmlhbFNvdXJjZUNvZGUodHV0b3JpYWw6IHN0cmluZyk6IFByb21pc2U8RmlsZVN5c3RlbVRyZWU+IHtcbiAgICBjb25zdCB0dXRvcmlhbFNvdXJjZUNvZGUgPSBhd2FpdCBmZXRjaChgJHtUVVRPUklBTFNfU09VUkNFX0NPREVfV0VCX1BBVEh9LyR7dHV0b3JpYWx9Lmpzb25gKTtcblxuICAgIGlmICghdHV0b3JpYWxTb3VyY2VDb2RlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYE1pc3Npbmcgc291cmNlIGNvZGUgZm9yIHR1dG9yaWFsICR7dHV0b3JpYWx9YCk7XG5cbiAgICByZXR1cm4gYXdhaXQgdHV0b3JpYWxTb3VyY2VDb2RlLmpzb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZmV0Y2hUdXRvcmlhbE1ldGFkYXRhKHR1dG9yaWFsOiBzdHJpbmcpOiBQcm9taXNlPFR1dG9yaWFsTWV0YWRhdGE+IHtcbiAgICBjb25zdCB0dXRvcmlhbFNvdXJjZUNvZGUgPSBhd2FpdCBmZXRjaChgJHtUVVRPUklBTFNfTUVUQURBVEFfV0VCX1BBVEh9LyR7dHV0b3JpYWx9Lmpzb25gKTtcblxuICAgIGlmICghdHV0b3JpYWxTb3VyY2VDb2RlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgbWV0YWRhdGEgZm9yICR7dHV0b3JpYWx9YCk7XG5cbiAgICByZXR1cm4gYXdhaXQgdHV0b3JpYWxTb3VyY2VDb2RlLmpzb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXJlIHByZXZpb3VzIGFuZCBuZXcgZGVwZW5kZW5jaWVzIHRvIGRldGVybWluZSBpZiB0aGUgZGVwZW5kZW5jaWVzIGNoYW5nZWQuXG4gICAqL1xuICBwcml2YXRlIGNoZWNrSWZEZXBlbmRlbmNpZXNDaGFuZ2VkKFxuICAgIG5ld0RlcHM6IE5vbk51bGxhYmxlPFR1dG9yaWFsTWV0YWRhdGFbJ2RlcGVuZGVuY2llcyddPixcbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXhpc3RpbmdEZXBzID0gdGhpcy5kZXBlbmRlbmNpZXMoKTtcblxuICAgIGZvciAoY29uc3QgbmFtZSBvZiBPYmplY3Qua2V5cyhuZXdEZXBzKSkge1xuICAgICAgaWYgKGV4aXN0aW5nRGVwcz8uW25hbWVdICE9PSBuZXdEZXBzW25hbWVdKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgY29tcHV0ZUZpbGVzVG9SZW1vdmUoXG4gICAgbmV3RmlsZXM6IFR1dG9yaWFsTWV0YWRhdGFbJ2FsbEZpbGVzJ10sXG4gICAgZXhpc3RpbmdGaWxlczogVHV0b3JpYWxNZXRhZGF0YVsnYWxsRmlsZXMnXSxcbiAgKTogU2V0PHN0cmluZz4gfCB1bmRlZmluZWQge1xuICAgIC8vIEFsbCBleGlzdGluZyBmaWxlcyBhcmUgY2FuZGlkYXRlcyBmb3IgcmVtb3ZhbC5cbiAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gbmV3IFNldChleGlzdGluZ0ZpbGVzKTtcblxuICAgIC8vIFJldGFpbiBmaWxlcyB0aGF0IGFyZSBwcmVzZW50IGluIHRoZSBuZXcgcHJvamVjdC5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgbmV3RmlsZXMpIHtcbiAgICAgIGZpbGVzVG9EZWxldGUuZGVsZXRlKGZpbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWxlc1RvRGVsZXRlO1xuICB9XG59XG4iXX0=