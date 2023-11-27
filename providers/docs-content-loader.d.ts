/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { InjectionToken } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DocContent, DocsContentLoader } from '../interfaces';
export declare const DOCS_CONTENT_LOADER: InjectionToken<DocsContentLoader>;
export declare function contentResolver(contentPath: string): ResolveFn<DocContent | undefined>;
