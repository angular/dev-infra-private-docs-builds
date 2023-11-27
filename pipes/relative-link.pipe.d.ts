/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class RelativeLink implements PipeTransform {
    transform(absoluteUrl: string, result?: 'relative' | 'pathname' | 'hash'): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RelativeLink, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<RelativeLink, "relativeLink", true>;
}
