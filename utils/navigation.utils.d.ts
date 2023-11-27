/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { NavigationItem } from '../interfaces';
export declare const flatNavigationData: (tree: NavigationItem[]) => NavigationItem[];
export declare const getNavigationItemsTree: (tree: NavigationItem[], mapFn: (item: NavigationItem) => void) => NavigationItem[];
export declare const findNavigationItem: (items: NavigationItem[], predicate: (item: NavigationItem) => boolean) => NavigationItem | null;
export declare const isExternalLink: (link: string, windowOrigin: string) => boolean;
export declare const markExternalLinks: (item: NavigationItem, origin: string) => void;
export declare const mapNavigationItemsToRoutes: (navigationItems: NavigationItem[], additionalRouteProperties: Partial<Route>) => Route[];
export declare const normalizePath: (path: string) => string;
export declare const getBaseUrlAfterRedirects: (url: string, router: Router) => string;
export declare function handleHrefClickEventWithRouter(e: Event, router: Router): void;
export declare function getActivatedRouteSnapshotFromRouter(router: Router): ActivatedRouteSnapshot;
