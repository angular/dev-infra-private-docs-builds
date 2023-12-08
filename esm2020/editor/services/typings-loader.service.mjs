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
import { toObservable } from '@angular/core/rxjs-interop';
/**
 * This service is responsible for retrieving the types definitions for the
 * predefined dependencies.
 */
let TypingsLoader = class TypingsLoader {
    constructor() {
        this.librariesToGetTypesFrom = [
            '@angular/common',
            '@angular/core',
            '@angular/forms',
            '@angular/router',
            '@angular/platform-browser',
            '@angular/material',
            '@angular/cdk',
        ];
        this._typings = signal([]);
        this.typings = this._typings.asReadonly();
        this.typings$ = toObservable(this._typings);
    }
    /**
     * Retrieve types from the predefined libraries and set the types files and contents in the `typings` signal
     */
    async retrieveTypeDefinitions(webContainer) {
        this.webContainer = webContainer;
        const typesDefinitions = [];
        try {
            const filesToRead = await this.getFilesToRead();
            if (filesToRead && filesToRead.length > 0) {
                await Promise.all(filesToRead.map((path) => webContainer.fs.readFile(path, 'utf-8').then((content) => {
                    typesDefinitions.push({ path, content });
                })));
                this._typings.set(typesDefinitions);
            }
        }
        catch (error) {
            // ignore "ENOENT" errors as this can happen while reading files and resetting the WebContainer
            if (error?.message.startsWith('ENOENT')) {
                return;
            }
            else {
                throw error;
            }
        }
    }
    /**
     * Get the list of files to read the types definitions from the predefined libraries
     */
    async getFilesToRead() {
        if (!this.webContainer)
            return;
        const filesToRead = [];
        const directoriesToRead = [];
        for (const library of this.librariesToGetTypesFrom) {
            // The library's package.json is where the type definitions are defined
            const packageJsonContent = await this.webContainer.fs
                .readFile(`./node_modules/${library}/package.json`, 'utf-8')
                .catch((error) => {
                // Note: "ENOENT" errors occurs:
                //    - While reseting the NodeRuntimeSandbox.
                //    - When the library is not a dependency in the project, its package.json won't exist.
                //
                // In both cases we ignore the error to continue the process.
                if (error?.message.startsWith('ENOENT')) {
                    return;
                }
                throw error;
            });
            // if the package.json content is empty, skip this library
            if (!packageJsonContent)
                continue;
            const packageJson = JSON.parse(packageJsonContent);
            // If the package.json doesn't have `exports`, skip this library
            if (!packageJson?.exports)
                continue;
            // Based on `exports` we can identify paths to the types definition files
            for (const exportKey of Object.keys(packageJson.exports)) {
                const exportEntry = packageJson.exports[exportKey];
                const types = exportEntry.typings ?? exportEntry.types;
                if (types) {
                    const path = `/node_modules/${library}/${this.normalizePath(types)}`;
                    // If the path contains `*` we need to read the directory files
                    if (path.includes('*')) {
                        const directory = path.substring(0, path.lastIndexOf('/'));
                        directoriesToRead.push(directory);
                    }
                    else {
                        filesToRead.push(path);
                    }
                }
            }
        }
        const directoryFiles = (await Promise.all(directoriesToRead.map((directory) => this.getTypeDefinitionFilesFromDirectory(directory)))).flat();
        for (const file of directoryFiles) {
            filesToRead.push(file);
        }
        return filesToRead;
    }
    async getTypeDefinitionFilesFromDirectory(directory) {
        if (!this.webContainer)
            throw new Error('this.webContainer is not defined');
        const files = await this.webContainer.fs.readdir(directory);
        return files.filter(this.isTypeDefinitionFile).map((file) => `${directory}/${file}`);
    }
    isTypeDefinitionFile(path) {
        return path.endsWith('.d.ts');
    }
    normalizePath(path) {
        if (path.startsWith('./')) {
            return path.substring(2);
        }
        if (path.startsWith('.')) {
            return path.substring(1);
        }
        return path;
    }
};
TypingsLoader = __decorate([
    Injectable({ providedIn: 'root' })
], TypingsLoader);
export { TypingsLoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwaW5ncy1sb2FkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL3NlcnZpY2VzL3R5cGluZ3MtbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBSXhEOzs7R0FHRztBQUVJLElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFBbkI7UUFDWSw0QkFBdUIsR0FBRztZQUN6QyxpQkFBaUI7WUFDakIsZUFBZTtZQUNmLGdCQUFnQjtZQUNoQixpQkFBaUI7WUFDakIsMkJBQTJCO1lBQzNCLG1CQUFtQjtZQUNuQixjQUFjO1NBQ2YsQ0FBQztRQUlNLGFBQVEsR0FBRyxNQUFNLENBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0IsWUFBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDckMsYUFBUSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUEwSGxELENBQUM7SUF4SEM7O09BRUc7SUFDSCxLQUFLLENBQUMsdUJBQXVCLENBQUMsWUFBMEI7UUFDdEQsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFFakMsTUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFFdEMsSUFBSSxDQUFDO1lBQ0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFaEQsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUs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QU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUE7QUF6SVksYUFBYTtJQUR6QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7R0FDcEIsYUFBYSxDQXlJekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgc2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dG9PYnNlcnZhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge1dlYkNvbnRhaW5lcn0gZnJvbSAnQHdlYmNvbnRhaW5lci9hcGknO1xuaW1wb3J0IHtUeXBpbmd9IGZyb20gJy4uL2NvZGUtZWRpdG9yL3dvcmtlcnMvaW50ZXJmYWNlcy9kZWZpbmUtdHlwZXMtcmVxdWVzdCc7XG5cbi8qKlxuICogVGhpcyBzZXJ2aWNlIGlzIHJlc3BvbnNpYmxlIGZvciByZXRyaWV2aW5nIHRoZSB0eXBlcyBkZWZpbml0aW9ucyBmb3IgdGhlXG4gKiBwcmVkZWZpbmVkIGRlcGVuZGVuY2llcy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgVHlwaW5nc0xvYWRlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGlicmFyaWVzVG9HZXRUeXBlc0Zyb20gPSBbXG4gICAgJ0Bhbmd1bGFyL2NvbW1vbicsXG4gICAgJ0Bhbmd1bGFyL2NvcmUnLFxuICAgICdAYW5ndWxhci9mb3JtcycsXG4gICAgJ0Bhbmd1bGFyL3JvdXRlcicsXG4gICAgJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInLFxuICAgICdAYW5ndWxhci9tYXRlcmlhbCcsXG4gICAgJ0Bhbmd1bGFyL2NkaycsXG4gIF07XG5cbiAgcHJpdmF0ZSB3ZWJDb250YWluZXI6IFdlYkNvbnRhaW5lciB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF90eXBpbmdzID0gc2lnbmFsPFR5cGluZ1tdPihbXSk7XG4gIHJlYWRvbmx5IHR5cGluZ3MgPSB0aGlzLl90eXBpbmdzLmFzUmVhZG9ubHkoKTtcbiAgcmVhZG9ubHkgdHlwaW5ncyQgPSB0b09ic2VydmFibGUodGhpcy5fdHlwaW5ncyk7XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlIHR5cGVzIGZyb20gdGhlIHByZWRlZmluZWQgbGlicmFyaWVzIGFuZCBzZXQgdGhlIHR5cGVzIGZpbGVzIGFuZCBjb250ZW50cyBpbiB0aGUgYHR5cGluZ3NgIHNpZ25hbFxuICAgKi9cbiAgYXN5bmMgcmV0cmlldmVUeXBlRGVmaW5pdGlvbnMod2ViQ29udGFpbmVyOiBXZWJDb250YWluZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLndlYkNvbnRhaW5lciA9IHdlYkNvbnRhaW5lcjtcblxuICAgIGNvbnN0IHR5cGVzRGVmaW5pdGlvbnM6IFR5cGluZ1tdID0gW107XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZmlsZXNUb1JlYWQgPSBhd2FpdCB0aGlzLmdldEZpbGVzVG9SZWFkKCk7XG5cbiAgICAgIGlmIChmaWxlc1RvUmVhZCAmJiBmaWxlc1RvUmVhZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgIGZpbGVzVG9SZWFkLm1hcCgocGF0aCkgPT5cbiAgICAgICAgICAgIHdlYkNvbnRhaW5lci5mcy5yZWFkRmlsZShwYXRoLCAndXRmLTgnKS50aGVuKChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAgIHR5cGVzRGVmaW5pdGlvbnMucHVzaCh7cGF0aCwgY29udGVudH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl90eXBpbmdzLnNldCh0eXBlc0RlZmluaXRpb25zKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBpZ25vcmUgXCJFTk9FTlRcIiBlcnJvcnMgYXMgdGhpcyBjYW4gaGFwcGVuIHdoaWxlIHJlYWRpbmcgZmlsZXMgYW5kIHJlc2V0dGluZyB0aGUgV2ViQ29udGFpbmVyXG4gICAgICBpZiAoZXJyb3I/Lm1lc3NhZ2Uuc3RhcnRzV2l0aCgnRU5PRU5UJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbGlzdCBvZiBmaWxlcyB0byByZWFkIHRoZSB0eXBlcyBkZWZpbml0aW9ucyBmcm9tIHRoZSBwcmVkZWZpbmVkIGxpYnJhcmllc1xuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBnZXRGaWxlc1RvUmVhZCgpIHtcbiAgICBpZiAoIXRoaXMud2ViQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICBjb25zdCBmaWxlc1RvUmVhZDogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBkaXJlY3Rvcmllc1RvUmVhZDogc3RyaW5nW10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgbGlicmFyeSBvZiB0aGlzLmxpYnJhcmllc1RvR2V0VHlwZXNGcm9tKSB7XG4gICAgICAvLyBUaGUgbGlicmFyeSdzIHBhY2thZ2UuanNvbiBpcyB3aGVyZSB0aGUgdHlwZSBkZWZpbml0aW9ucyBhcmUgZGVmaW5lZFxuICAgICAgY29uc3QgcGFja2FnZUpzb25Db250ZW50ID0gYXdhaXQgdGhpcy53ZWJDb250YWluZXIuZnNcbiAgICAgICAgLnJlYWRGaWxlKGAuL25vZGVfbW9kdWxlcy8ke2xpYnJhcnl9L3BhY2thZ2UuanNvbmAsICd1dGYtOCcpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAvLyBOb3RlOiBcIkVOT0VOVFwiIGVycm9ycyBvY2N1cnM6XG4gICAgICAgICAgLy8gICAgLSBXaGlsZSByZXNldGluZyB0aGUgTm9kZVJ1bnRpbWVTYW5kYm94LlxuICAgICAgICAgIC8vICAgIC0gV2hlbiB0aGUgbGlicmFyeSBpcyBub3QgYSBkZXBlbmRlbmN5IGluIHRoZSBwcm9qZWN0LCBpdHMgcGFja2FnZS5qc29uIHdvbid0IGV4aXN0LlxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gSW4gYm90aCBjYXNlcyB3ZSBpZ25vcmUgdGhlIGVycm9yIHRvIGNvbnRpbnVlIHRoZSBwcm9jZXNzLlxuICAgICAgICAgIGlmIChlcnJvcj8ubWVzc2FnZS5zdGFydHNXaXRoKCdFTk9FTlQnKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gaWYgdGhlIHBhY2thZ2UuanNvbiBjb250ZW50IGlzIGVtcHR5LCBza2lwIHRoaXMgbGlicmFyeVxuICAgICAgaWYgKCFwYWNrYWdlSnNvbkNvbnRlbnQpIGNvbnRpbnVlO1xuXG4gICAgICBjb25zdCBwYWNrYWdlSnNvbiA9IEpTT04ucGFyc2UocGFja2FnZUpzb25Db250ZW50KSBhcyBhbnk7XG5cbiAgICAgIC8vIElmIHRoZSBwYWNrYWdlLmpzb24gZG9lc24ndCBoYXZlIGBleHBvcnRzYCwgc2tpcCB0aGlzIGxpYnJhcnlcbiAgICAgIGlmICghcGFja2FnZUpzb24/LmV4cG9ydHMpIGNvbnRpbnVlO1xuXG4gICAgICAvLyBCYXNlZCBvbiBgZXhwb3J0c2Agd2UgY2FuIGlkZW50aWZ5IHBhdGhzIHRvIHRoZSB0eXBlcyBkZWZpbml0aW9uIGZpbGVzXG4gICAgICBmb3IgKGNvbnN0IGV4cG9ydEtleSBvZiBPYmplY3Qua2V5cyhwYWNrYWdlSnNvbi5leHBvcnRzKSkge1xuICAgICAgICBjb25zdCBleHBvcnRFbnRyeSA9IHBhY2thZ2VKc29uLmV4cG9ydHNbZXhwb3J0S2V5XTtcbiAgICAgICAgY29uc3QgdHlwZXM6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGV4cG9ydEVudHJ5LnR5cGluZ3MgPz8gZXhwb3J0RW50cnkudHlwZXM7XG5cbiAgICAgICAgaWYgKHR5cGVzKSB7XG4gICAgICAgICAgY29uc3QgcGF0aCA9IGAvbm9kZV9tb2R1bGVzLyR7bGlicmFyeX0vJHt0aGlzLm5vcm1hbGl6ZVBhdGgodHlwZXMpfWA7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgcGF0aCBjb250YWlucyBgKmAgd2UgbmVlZCB0byByZWFkIHRoZSBkaXJlY3RvcnkgZmlsZXNcbiAgICAgICAgICBpZiAocGF0aC5pbmNsdWRlcygnKicpKSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSBwYXRoLnN1YnN0cmluZygwLCBwYXRoLmxhc3RJbmRleE9mKCcvJykpO1xuXG4gICAgICAgICAgICBkaXJlY3Rvcmllc1RvUmVhZC5wdXNoKGRpcmVjdG9yeSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbGVzVG9SZWFkLnB1c2gocGF0aCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGlyZWN0b3J5RmlsZXMgPSAoXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgZGlyZWN0b3JpZXNUb1JlYWQubWFwKChkaXJlY3RvcnkpID0+IHRoaXMuZ2V0VHlwZURlZmluaXRpb25GaWxlc0Zyb21EaXJlY3RvcnkoZGlyZWN0b3J5KSksXG4gICAgICApXG4gICAgKS5mbGF0KCk7XG5cbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZGlyZWN0b3J5RmlsZXMpIHtcbiAgICAgIGZpbGVzVG9SZWFkLnB1c2goZmlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVzVG9SZWFkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRUeXBlRGVmaW5pdGlvbkZpbGVzRnJvbURpcmVjdG9yeShkaXJlY3Rvcnk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgICBpZiAoIXRoaXMud2ViQ29udGFpbmVyKSB0aHJvdyBuZXcgRXJyb3IoJ3RoaXMud2ViQ29udGFpbmVyIGlzIG5vdCBkZWZpbmVkJyk7XG5cbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IHRoaXMud2ViQ29udGFpbmVyLmZzLnJlYWRkaXIoZGlyZWN0b3J5KTtcblxuICAgIHJldHVybiBmaWxlcy5maWx0ZXIodGhpcy5pc1R5cGVEZWZpbml0aW9uRmlsZSkubWFwKChmaWxlKSA9PiBgJHtkaXJlY3Rvcnl9LyR7ZmlsZX1gKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUeXBlRGVmaW5pdGlvbkZpbGUocGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHBhdGguZW5kc1dpdGgoJy5kLnRzJyk7XG4gIH1cblxuICBwcml2YXRlIG5vcm1hbGl6ZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAocGF0aC5zdGFydHNXaXRoKCcuLycpKSB7XG4gICAgICByZXR1cm4gcGF0aC5zdWJzdHJpbmcoMik7XG4gICAgfVxuICAgIGlmIChwYXRoLnN0YXJ0c1dpdGgoJy4nKSkge1xuICAgICAgcmV0dXJuIHBhdGguc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxufVxuIl19