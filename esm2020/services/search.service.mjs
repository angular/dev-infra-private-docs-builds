/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Injectable, afterNextRender, inject, signal } from '@angular/core';
import { ENVIRONMENT } from '../providers/index';
import { toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, filter, from, of, switchMap } from 'rxjs';
import algoliasearch from 'algoliasearch/lite';
import { NavigationEnd, Router } from '@angular/router';
import * as i0 from "@angular/core";
export const SEARCH_DELAY = 200;
// Maximum number of facet values to return for each facet during a regular search.
export const MAX_VALUE_PER_FACET = 5;
export class Search {
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
}
Search.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0-next.0", ngImport: i0, type: Search, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
Search.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.0-next.0", ngImport: i0, type: Search, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0-next.0", ngImport: i0, type: Search, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9kb2NzL3NlcnZpY2VzL3NlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMvRCxPQUFPLGFBQTZCLE1BQU0sb0JBQW9CLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFdEQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUNoQyxtRkFBbUY7QUFDbkYsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBS3JDLE1BQU0sT0FBTyxNQUFNO0lBNEJqQjtRQTNCaUIsaUJBQVksR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUIsbUJBQWMsR0FBRyxNQUFNLENBQTZCLFNBQVMsQ0FBQyxDQUFDO1FBRS9ELFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixXQUFNLEdBQWtCLGFBQXFCLENBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUMzQixDQUFDO1FBQ2UsVUFBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTlFLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM3QyxrQkFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFakQsbUJBQWMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FDbEQsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUMxQixTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNsQixPQUFPLENBQUMsQ0FBQyxLQUFLO2dCQUNaLENBQUMsQ0FBQyxJQUFJLENBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUN2QixpQkFBaUIsRUFBRSxtQkFBbUI7aUJBQ3ZDLENBQUMsQ0FDSDtnQkFDSCxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFHQSxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVPLHFCQUFxQjtRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUNyQixRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FDdEUsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDBCQUEwQixDQUFDLEtBQXFCO1FBQ3RELE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFFckMsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDMUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sK0JBQStCO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDeEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7MEdBL0RVLE1BQU07OEdBQU4sTUFBTSxjQUZMLE1BQU07a0dBRVAsTUFBTTtrQkFIbEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgYWZ0ZXJOZXh0UmVuZGVyLCBpbmplY3QsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0VOVklST05NRU5UfSBmcm9tICcuLi9wcm92aWRlcnMvaW5kZXgnO1xuaW1wb3J0IHtTZWFyY2hSZXN1bHR9IGZyb20gJy4uL2ludGVyZmFjZXMvaW5kZXgnO1xuaW1wb3J0IHt0b09ic2VydmFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lLCBmaWx0ZXIsIGZyb20sIG9mLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IGFsZ29saWFzZWFyY2gsIHtTZWFyY2hDbGllbnR9IGZyb20gJ2FsZ29saWFzZWFyY2gvbGl0ZSc7XG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuZXhwb3J0IGNvbnN0IFNFQVJDSF9ERUxBWSA9IDIwMDtcbi8vIE1heGltdW0gbnVtYmVyIG9mIGZhY2V0IHZhbHVlcyB0byByZXR1cm4gZm9yIGVhY2ggZmFjZXQgZHVyaW5nIGEgcmVndWxhciBzZWFyY2guXG5leHBvcnQgY29uc3QgTUFYX1ZBTFVFX1BFUl9GQUNFVCA9IDU7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2gge1xuICBwcml2YXRlIHJlYWRvbmx5IF9zZWFyY2hRdWVyeSA9IHNpZ25hbCgnJyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3NlYXJjaFJlc3VsdHMgPSBzaWduYWw8dW5kZWZpbmVkIHwgU2VhcmNoUmVzdWx0W10+KHVuZGVmaW5lZCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXIgPSBpbmplY3QoUm91dGVyKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWcgPSBpbmplY3QoRU5WSVJPTk1FTlQpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNsaWVudDogU2VhcmNoQ2xpZW50ID0gKGFsZ29saWFzZWFyY2ggYXMgYW55KShcbiAgICB0aGlzLmNvbmZpZy5hbGdvbGlhLmFwcElkLFxuICAgIHRoaXMuY29uZmlnLmFsZ29saWEuYXBpS2V5LFxuICApO1xuICBwcml2YXRlIHJlYWRvbmx5IGluZGV4ID0gdGhpcy5jbGllbnQuaW5pdEluZGV4KHRoaXMuY29uZmlnLmFsZ29saWEuaW5kZXhOYW1lKTtcblxuICBzZWFyY2hRdWVyeSA9IHRoaXMuX3NlYXJjaFF1ZXJ5LmFzUmVhZG9ubHkoKTtcbiAgc2VhcmNoUmVzdWx0cyA9IHRoaXMuX3NlYXJjaFJlc3VsdHMuYXNSZWFkb25seSgpO1xuXG4gIHNlYXJjaFJlc3VsdHMkID0gdG9PYnNlcnZhYmxlKHRoaXMuc2VhcmNoUXVlcnkpLnBpcGUoXG4gICAgZGVib3VuY2VUaW1lKFNFQVJDSF9ERUxBWSksXG4gICAgc3dpdGNoTWFwKChxdWVyeSkgPT4ge1xuICAgICAgcmV0dXJuICEhcXVlcnlcbiAgICAgICAgPyBmcm9tKFxuICAgICAgICAgICAgdGhpcy5pbmRleC5zZWFyY2gocXVlcnksIHtcbiAgICAgICAgICAgICAgbWF4VmFsdWVzUGVyRmFjZXQ6IE1BWF9WQUxVRV9QRVJfRkFDRVQsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApXG4gICAgICAgIDogb2YodW5kZWZpbmVkKTtcbiAgICB9KSxcbiAgKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBhZnRlck5leHRSZW5kZXIoKCkgPT4ge1xuICAgICAgdGhpcy5saXN0ZW5Ub1NlYXJjaFJlc3VsdHMoKTtcbiAgICAgIHRoaXMucmVzZXRTZWFyY2hRdWVyeU9uTmF2aWdhdGlvbkVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU2VhcmNoUXVlcnkocXVlcnk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3NlYXJjaFF1ZXJ5LnNldChxdWVyeSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvU2VhcmNoUmVzdWx0cygpOiB2b2lkIHtcbiAgICB0aGlzLnNlYXJjaFJlc3VsdHMkLnN1YnNjcmliZSgocmVzcG9uc2UpID0+IHtcbiAgICAgIHRoaXMuX3NlYXJjaFJlc3VsdHMuc2V0KFxuICAgICAgICByZXNwb25zZSA/IHRoaXMuZ2V0VW5pcXVlU2VhcmNoUmVzdWx0SXRlbXMocmVzcG9uc2UuaGl0cykgOiB1bmRlZmluZWQsXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRVbmlxdWVTZWFyY2hSZXN1bHRJdGVtcyhpdGVtczogU2VhcmNoUmVzdWx0W10pOiBTZWFyY2hSZXN1bHRbXSB7XG4gICAgY29uc3QgdW5pcXVlVXJscyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgcmV0dXJuIGl0ZW1zLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0udXJsICYmICF1bmlxdWVVcmxzLmhhcyhpdGVtLnVybCkpIHtcbiAgICAgICAgdW5pcXVlVXJscy5hZGQoaXRlbS51cmwpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTZWFyY2hRdWVyeU9uTmF2aWdhdGlvbkVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5ldmVudHMucGlwZShmaWx0ZXIoKGV2ZW50KSA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVTZWFyY2hRdWVyeSgnJyk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==