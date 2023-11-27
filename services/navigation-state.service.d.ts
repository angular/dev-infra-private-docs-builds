/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { NavigationItem } from '../interfaces';
export declare class NavigationState {
    private readonly router;
    private readonly _activeNavigationItem;
    private readonly _expandedItems;
    private readonly _isMobileNavVisible;
    primaryActiveRouteItem: import("@angular/core").WritableSignal<string | null>;
    activeNavigationItem: import("@angular/core").Signal<NavigationItem | null>;
    expandedItems: import("@angular/core").Signal<NavigationItem[]>;
    isMobileNavVisible: import("@angular/core").Signal<boolean>;
    toggleItem(item: NavigationItem): Promise<void>;
    cleanExpandedState(): void;
    expandItemHierarchy(item: NavigationItem, shouldExpand: (item: NavigationItem) => boolean, skipExpandPredicateFn?: (item: NavigationItem) => boolean): void;
    setActiveNavigationItem(item: NavigationItem | null): void;
    setMobileNavigationListVisibility(isVisible: boolean): void;
    private expand;
    private collapse;
    private navigateToFirstPageOfTheCategory;
}
