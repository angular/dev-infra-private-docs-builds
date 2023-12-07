/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { WebContainer } from '@webcontainer/api';
import { Typing } from '../code-editor/workers/interfaces/define-types-request.js';
/**
 * This service is responsible for retrieving the types definitions for the
 * predefined dependencies.
 */
export declare class TypingsLoader {
    private readonly librariesToGetTypesFrom;
    private webContainer;
    private _typings;
    readonly typings: import("@angular/core").Signal<Typing[]>;
    readonly typings$: import("rxjs/dist/types/index.js").Observable<Typing[]>;
    /**
     * Retrieve types from the predefined libraries and set the types files and contents in the `typings` signal
     */
    retrieveTypeDefinitions(webContainer: WebContainer): Promise<void>;
    /**
     * Get the list of files to read the types definitions from the predefined libraries
     */
    private getFilesToRead;
    private getTypeDefinitionFilesFromDirectory;
    private isTypeDefinitionFile;
    private normalizePath;
}
