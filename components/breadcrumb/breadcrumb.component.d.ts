/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { OnInit } from '@angular/core';
import { NavigationItem } from '../../interfaces/index.js';
import * as i0 from "@angular/core";
export declare class Breadcrumb implements OnInit {
    private readonly navigationState;
    breadcrumbItems: import("@angular/core").WritableSignal<NavigationItem[]>;
    ngOnInit(): void;
    private setBreadcrumbItemsBasedOnNavigationStructure;
    static ɵfac: i0.ɵɵFactoryDeclaration<Breadcrumb, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Breadcrumb, "docs-breadcrumb", never, {}, {}, never, never, true, never>;
}
