/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { SearchItem } from '../../directives/search-item/search-item.directive.js';
import * as i0 from "@angular/core";
export declare class SearchDialog implements OnInit, AfterViewInit, OnDestroy {
    onClose: EventEmitter<void>;
    dialog?: ElementRef<HTMLDialogElement>;
    items?: QueryList<SearchItem>;
    private readonly destroyRef;
    private readonly ngZone;
    private readonly search;
    private readonly relativeLink;
    private readonly router;
    private readonly window;
    private keyManager?;
    searchQuery: import("@angular/core").Signal<string>;
    searchResults: import("@angular/core").Signal<import("../../interfaces/search-results.js").SearchResult[] | undefined>;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    closeSearchDialog(): void;
    updateSearchQuery(query: string): void;
    private updateActiveItemWhenResultsChanged;
    private navigateToTheActiveItem;
    private scrollToActiveItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchDialog, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchDialog, "docs-search-dialog", never, {}, { "onClose": "onClose"; }, never, never, true, never>;
}
