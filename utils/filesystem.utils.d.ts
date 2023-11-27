/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="node" />
type FileAndContent = any;
interface DirEnt<T> {
    name: T;
    isFile(): boolean;
    isDirectory(): boolean;
}
interface FileSystemAPI {
    readdir(path: string, options: {
        encoding?: BufferEncoding | null;
        withFileTypes: true;
    }): Promise<DirEnt<string>[]>;
    readFile(path: string, encoding?: string): Promise<string>;
}
export declare const checkFilesInDirectory: (dir: string, fs: FileSystemAPI, filterFoldersPredicate?: (path?: string) => boolean, files?: FileAndContent[]) => Promise<any[]>;
export {};
