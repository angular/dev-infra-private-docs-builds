/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, afterNextRender, inject, signal } from '@angular/core';
import { ENVIRONMENT } from '../providers/index.js';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter, from, of, switchMap } from 'rxjs';
import algoliasearch from 'algoliasearch/lite.js';
import { NavigationEnd, Router } from '@angular/router';
export const SEARCH_DELAY = 200;
// Maximum number of facet values to return for each facet during a regular search.
export const MAX_VALUE_PER_FACET = 5;
let Search = class Search {
    constructor() {
        this._searchQuery = signal('');
        this._searchResults = signal(undefined);
        this.router = inject(Router);
        this.config = inject(ENVIRONMENT);
        this.client = algoliasearch(this.config.algolia.appId, this.config.algolia.apiKey);
        this.index = this.client.initIndex(this.config.algolia.indexName);
        this.searchQuery = this._searchQuery.asReadonly();
        this.searchResults = this._searchResults.asReadonly();
        this.searchResults$ = toObservable(this.searchQuery).pipe(debounceTime(SEARCH_DELAY), switchMap((query) => {
            return !!query
                ? from(this.index.search(query, {
                    maxValuesPerFacet: MAX_VALUE_PER_FACET,
                }))
                : of(undefined);
        }));
        afterNextRender(() => {
            this.listenToSearchResults();
            this.resetSearchQueryOnNavigationEnd();
        });
    }
    updateSearchQuery(query) {
        this._searchQuery.set(query);
    }
    listenToSearchResults() {
        this.searchResults$.subscribe((response) => {
            this._searchResults.set(response ? this.getUniqueSearchResultItems(response.hits) : undefined);
        });
    }
    getUniqueSearchResultItems(items) {
        const uniqueUrls = new Set();
        return items.filter((item) => {
            if (item.url && !uniqueUrls.has(item.url)) {
                uniqueUrls.add(item.url);
                return true;
            }
            return false;
        });
    }
    resetSearchQueryOnNavigationEnd() {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.updateSearchQuery('');
        });
    }
};
Search = __decorate([
    Injectable({
        providedIn: 'root',
    }),
    __metadata("design:paramtypes", [])
], Search);
export { Search };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9kb2NzL3NlcnZpY2VzL3NlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRWxELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLGFBQTZCLE1BQU0sdUJBQXVCLENBQUM7QUFDbEUsT0FBTyxFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ2hDLG1GQUFtRjtBQUNuRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFLOUIsSUFBTSxNQUFNLEdBQVosTUFBTSxNQUFNO0lBNEJqQjtRQTNCaUIsaUJBQVksR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUIsbUJBQWMsR0FBRyxNQUFNLENBQTZCLFNBQVMsQ0FBQyxDQUFDO1FBRS9ELFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixXQUFNLEdBQWtCLGFBQXFCLENBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUMzQixDQUFDO1FBQ2UsVUFBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTlFLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QyxrQkFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFakQsbUJBQWMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDbEQsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUMxQixTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNsQixPQUFPLENBQUMsQ0FBQyxLQUFLO2dCQUNaLENBQUMsQ0FBQyxJQUFJLENBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUN2QixpQkFBaUIsRUFBRSxtQkFBbUI7aUJBQ3ZDLENBQUMsQ0FDSDtnQkFDSCxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFHQSxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDdEUsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDBCQUEwQixDQUFDLEtBQXFCO1FBQ3RELE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFFckMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDMUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sK0JBQStCO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDeEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUFoRVksTUFBTTtJQUhsQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDOztHQUNXLE1BQU0sQ0FnRWxCIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIGFmdGVyTmV4dFJlbmRlciwgaW5qZWN0LCBzaWduYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFTlZJUk9OTUVOVH0gZnJvbSAnLi4vcHJvdmlkZXJzL2luZGV4LmpzJztcbmltcG9ydCB7U2VhcmNoUmVzdWx0fSBmcm9tICcuLi9pbnRlcmZhY2VzL2luZGV4LmpzJztcbmltcG9ydCB7dG9PYnNlcnZhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge2RlYm91bmNlVGltZSwgZmlsdGVyLCBmcm9tLCBvZiwgc3dpdGNoTWFwfSBmcm9tICdyeGpzJztcbmltcG9ydCBhbGdvbGlhc2VhcmNoLCB7U2VhcmNoQ2xpZW50fSBmcm9tICdhbGdvbGlhc2VhcmNoL2xpdGUuanMnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uRW5kLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmV4cG9ydCBjb25zdCBTRUFSQ0hfREVMQVkgPSAyMDA7XG4vLyBNYXhpbXVtIG51bWJlciBvZiBmYWNldCB2YWx1ZXMgdG8gcmV0dXJuIGZvciBlYWNoIGZhY2V0IGR1cmluZyBhIHJlZ3VsYXIgc2VhcmNoLlxuZXhwb3J0IGNvbnN0IE1BWF9WQUxVRV9QRVJfRkFDRVQgPSA1O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoIHtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2VhcmNoUXVlcnkgPSBzaWduYWwoJycpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9zZWFyY2hSZXN1bHRzID0gc2lnbmFsPHVuZGVmaW5lZCB8IFNlYXJjaFJlc3VsdFtdPih1bmRlZmluZWQpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnID0gaW5qZWN0KEVOVklST05NRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjbGllbnQ6IFNlYXJjaENsaWVudCA9IChhbGdvbGlhc2VhcmNoIGFzIGFueSkoXG4gICAgdGhpcy5jb25maWcuYWxnb2xpYS5hcHBJZCxcbiAgICB0aGlzLmNvbmZpZy5hbGdvbGlhLmFwaUtleSxcbiAgKTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbmRleCA9IHRoaXMuY2xpZW50LmluaXRJbmRleCh0aGlzLmNvbmZpZy5hbGdvbGlhLmluZGV4TmFtZSk7XG5cbiAgc2VhcmNoUXVlcnkgPSB0aGlzLl9zZWFyY2hRdWVyeS5hc1JlYWRvbmx5KCk7XG4gIHNlYXJjaFJlc3VsdHMgPSB0aGlzLl9zZWFyY2hSZXN1bHRzLmFzUmVhZG9ubHkoKTtcblxuICBzZWFyY2hSZXN1bHRzJCA9IHRvT2JzZXJ2YWJsZSh0aGlzLnNlYXJjaFF1ZXJ5KS5waXBlKFxuICAgIGRlYm91bmNlVGltZShTRUFSQ0hfREVMQVkpLFxuICAgIHN3aXRjaE1hcCgocXVlcnkpID0+IHtcbiAgICAgIHJldHVybiAhIXF1ZXJ5XG4gICAgICAgID8gZnJvbShcbiAgICAgICAgICAgIHRoaXMuaW5kZXguc2VhcmNoKHF1ZXJ5LCB7XG4gICAgICAgICAgICAgIG1heFZhbHVlc1BlckZhY2V0OiBNQVhfVkFMVUVfUEVSX0ZBQ0VULFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKVxuICAgICAgICA6IG9mKHVuZGVmaW5lZCk7XG4gICAgfSksXG4gICk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgYWZ0ZXJOZXh0UmVuZGVyKCgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuVG9TZWFyY2hSZXN1bHRzKCk7XG4gICAgICB0aGlzLnJlc2V0U2VhcmNoUXVlcnlPbk5hdmlnYXRpb25FbmQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVNlYXJjaFF1ZXJ5KHF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9zZWFyY2hRdWVyeS5zZXQocXVlcnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Ub1NlYXJjaFJlc3VsdHMoKTogdm9pZCB7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRzJC5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICB0aGlzLl9zZWFyY2hSZXN1bHRzLnNldChcbiAgICAgICAgcmVzcG9uc2UgPyB0aGlzLmdldFVuaXF1ZVNlYXJjaFJlc3VsdEl0ZW1zKHJlc3BvbnNlLmhpdHMpIDogdW5kZWZpbmVkLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0VW5pcXVlU2VhcmNoUmVzdWx0SXRlbXMoaXRlbXM6IFNlYXJjaFJlc3VsdFtdKTogU2VhcmNoUmVzdWx0W10ge1xuICAgIGNvbnN0IHVuaXF1ZVVybHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLnVybCAmJiAhdW5pcXVlVXJscy5oYXMoaXRlbS51cmwpKSB7XG4gICAgICAgIHVuaXF1ZVVybHMuYWRkKGl0ZW0udXJsKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U2VhcmNoUXVlcnlPbk5hdmlnYXRpb25FbmQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlU2VhcmNoUXVlcnkoJycpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=