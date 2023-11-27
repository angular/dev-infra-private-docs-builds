/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { EventEmitter } from '@angular/core';
import { NavigationItem } from '../../interfaces';
import * as i0 from "@angular/core";
export declare class NavigationList {
    navigationItems: NavigationItem[];
    displayItemsToLevel: number;
    collapsableLevel: number | undefined;
    expandableLevel: number;
    isDropdownView: boolean;
    linkClicked: EventEmitter<void>;
    private readonly navigationState;
    expandedItems: import("@angular/core").Signal<NavigationItem[]>;
    activeItem: import("@angular/core").Signal<NavigationItem | null>;
    toggle(item: NavigationItem): void;
    emitClickOnLink(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationList, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationList, "docs-navigation-list", never, { "navigationItems": { "alias": "navigationItems"; "required": true; }; "displayItemsToLevel": { "alias": "displayItemsToLevel"; "required": false; }; "collapsableLevel": { "alias": "collapsableLevel"; "required": false; }; "expandableLevel": { "alias": "expandableLevel"; "required": false; }; "isDropdownView": { "alias": "isDropdownView"; "required": false; }; }, { "linkClicked": "linkClicked"; }, never, never, true, never>;
}
