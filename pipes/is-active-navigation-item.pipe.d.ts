/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { PipeTransform } from '@angular/core';
import { NavigationItem } from '../interfaces/index.js';
import * as i0 from "@angular/core";
export declare class IsActiveNavigationItem implements PipeTransform {
    transform(itemToCheck: NavigationItem, activeItem: NavigationItem | null): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsActiveNavigationItem, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsActiveNavigationItem, "isActiveNavigationItem", true>;
}
