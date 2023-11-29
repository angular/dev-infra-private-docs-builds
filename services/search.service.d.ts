/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { SearchResult } from '../interfaces/index.js';
export declare const SEARCH_DELAY = 200;
export declare const MAX_VALUE_PER_FACET = 5;
export declare class Search {
    private readonly _searchQuery;
    private readonly _searchResults;
    private readonly router;
    private readonly config;
    private readonly client;
    private readonly index;
    searchQuery: import("@angular/core").Signal<string>;
    searchResults: import("@angular/core").Signal<SearchResult[] | undefined>;
    searchResults$: import("rxjs").Observable<import("@algolia/client-search/dist/client-search.js").SearchResponse<unknown> | undefined>;
    constructor();
    updateSearchQuery(query: string): void;
    private listenToSearchResults;
    private getUniqueSearchResultItems;
    private resetSearchQueryOnNavigationEnd;
}
