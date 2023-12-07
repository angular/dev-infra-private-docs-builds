/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export declare class DownloadManager {
    private readonly document;
    private readonly environmentInjector;
    private readonly platformId;
    /**
     * Generate ZIP with the current state of the solution in the EmbeddedEditor
     */
    downloadCurrentStateOfTheSolution(name: string): Promise<void>;
    private saveFile;
}
