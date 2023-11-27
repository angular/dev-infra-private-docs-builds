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
import { ENVIRONMENT } from '../providers';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter, from, of, switchMap } from 'rxjs';
import algoliasearch from 'algoliasearch/lite';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9kb2NzL3NlcnZpY2VzL3NlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxhQUFhLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV0RCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ2hDLG1GQUFtRjtBQUNuRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFLOUIsSUFBTSxNQUFNLEdBQVosTUFBTSxNQUFNO0lBeUJqQjtRQXhCaUIsaUJBQVksR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUIsbUJBQWMsR0FBRyxNQUFNLENBQTZCLFNBQVMsQ0FBQyxDQUFDO1FBRS9ELFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixXQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RSxVQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFOUUsZ0JBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUVqRCxtQkFBYyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUNsRCxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQzFCLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxDQUFDLEtBQUs7Z0JBQ1osQ0FBQyxDQUFDLElBQUksQ0FDRixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7b0JBQ3ZCLGlCQUFpQixFQUFFLG1CQUFtQjtpQkFDdkMsQ0FBQyxDQUNIO2dCQUNILENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUdBLGVBQWUsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBYTtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8scUJBQXFCO1FBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUN0RSxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sMEJBQTBCLENBQUMsS0FBcUI7UUFDdEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUVyQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMzQixJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUMxQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekIsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywrQkFBK0I7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN4RixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQTdEWSxNQUFNO0lBSGxCLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7O0dBQ1csTUFBTSxDQTZEbEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgYWZ0ZXJOZXh0UmVuZGVyLCBpbmplY3QsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0VOVklST05NRU5UfSBmcm9tICcuLi9wcm92aWRlcnMnO1xuaW1wb3J0IHtTZWFyY2hSZXN1bHR9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHt0b09ic2VydmFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBmaWx0ZXIsIGZyb20sIG9mLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IGFsZ29saWFzZWFyY2ggZnJvbSAnYWxnb2xpYXNlYXJjaC9saXRlJztcbmltcG9ydCB7TmF2aWdhdGlvbkVuZCwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5leHBvcnQgY29uc3QgU0VBUkNIX0RFTEFZID0gMjAwO1xuLy8gTWF4aW11bSBudW1iZXIgb2YgZmFjZXQgdmFsdWVzIHRvIHJldHVybiBmb3IgZWFjaCBmYWNldCBkdXJpbmcgYSByZWd1bGFyIHNlYXJjaC5cbmV4cG9ydCBjb25zdCBNQVhfVkFMVUVfUEVSX0ZBQ0VUID0gNTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NlYXJjaFF1ZXJ5ID0gc2lnbmFsKCcnKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfc2VhcmNoUmVzdWx0cyA9IHNpZ25hbDx1bmRlZmluZWQgfCBTZWFyY2hSZXN1bHRbXT4odW5kZWZpbmVkKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlciA9IGluamVjdChSb3V0ZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZyA9IGluamVjdChFTlZJUk9OTUVOVCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2xpZW50ID0gYWxnb2xpYXNlYXJjaCh0aGlzLmNvbmZpZy5hbGdvbGlhLmFwcElkLCB0aGlzLmNvbmZpZy5hbGdvbGlhLmFwaUtleSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5kZXggPSB0aGlzLmNsaWVudC5pbml0SW5kZXgodGhpcy5jb25maWcuYWxnb2xpYS5pbmRleE5hbWUpO1xuXG4gIHNlYXJjaFF1ZXJ5ID0gdGhpcy5fc2VhcmNoUXVlcnkuYXNSZWFkb25seSgpO1xuICBzZWFyY2hSZXN1bHRzID0gdGhpcy5fc2VhcmNoUmVzdWx0cy5hc1JlYWRvbmx5KCk7XG5cbiAgc2VhcmNoUmVzdWx0cyQgPSB0b09ic2VydmFibGUodGhpcy5zZWFyY2hRdWVyeSkucGlwZShcbiAgICBkZWJvdW5jZVRpbWUoU0VBUkNIX0RFTEFZKSxcbiAgICBzd2l0Y2hNYXAoKHF1ZXJ5KSA9PiB7XG4gICAgICByZXR1cm4gISFxdWVyeVxuICAgICAgICA/IGZyb20oXG4gICAgICAgICAgICB0aGlzLmluZGV4LnNlYXJjaChxdWVyeSwge1xuICAgICAgICAgICAgICBtYXhWYWx1ZXNQZXJGYWNldDogTUFYX1ZBTFVFX1BFUl9GQUNFVCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgIClcbiAgICAgICAgOiBvZih1bmRlZmluZWQpO1xuICAgIH0pLFxuICApO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGFmdGVyTmV4dFJlbmRlcigoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlblRvU2VhcmNoUmVzdWx0cygpO1xuICAgICAgdGhpcy5yZXNldFNlYXJjaFF1ZXJ5T25OYXZpZ2F0aW9uRW5kKCk7XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTZWFyY2hRdWVyeShxdWVyeTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fc2VhcmNoUXVlcnkuc2V0KHF1ZXJ5KTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9TZWFyY2hSZXN1bHRzKCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoUmVzdWx0cyQuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xuICAgICAgdGhpcy5fc2VhcmNoUmVzdWx0cy5zZXQoXG4gICAgICAgIHJlc3BvbnNlID8gdGhpcy5nZXRVbmlxdWVTZWFyY2hSZXN1bHRJdGVtcyhyZXNwb25zZS5oaXRzKSA6IHVuZGVmaW5lZCxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFVuaXF1ZVNlYXJjaFJlc3VsdEl0ZW1zKGl0ZW1zOiBTZWFyY2hSZXN1bHRbXSk6IFNlYXJjaFJlc3VsdFtdIHtcbiAgICBjb25zdCB1bmlxdWVVcmxzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS51cmwgJiYgIXVuaXF1ZVVybHMuaGFzKGl0ZW0udXJsKSkge1xuICAgICAgICB1bmlxdWVVcmxzLmFkZChpdGVtLnVybCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFNlYXJjaFF1ZXJ5T25OYXZpZ2F0aW9uRW5kKCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcigoZXZlbnQpID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZVNlYXJjaFF1ZXJ5KCcnKTtcbiAgICB9KTtcbiAgfVxufVxuIl19