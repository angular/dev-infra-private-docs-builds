/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export class NavigationState {
    constructor() {
        this.router = inject(Router);
        this._activeNavigationItem = signal(null);
        this._expandedItems = signal([]);
        this._isMobileNavVisible = signal(false);
        this.primaryActiveRouteItem = signal(null);
        this.activeNavigationItem = this._activeNavigationItem.asReadonly();
        this.expandedItems = this._expandedItems.asReadonly();
        this.isMobileNavVisible = this._isMobileNavVisible.asReadonly();
    }
    async toggleItem(item) {
        if (!item.children) {
            return;
        }
        if (item.isExpanded) {
            this.collapse(item);
        }
        else if (item.children && item.children.length > 0 && item.children[0].path) {
            // It resolves false, when the user has displayed the page, then changed the slide to a secondary navigation component
            // and wants to reopen the slide, where the first item is the currently displayed page
            const navigationSucceeds = await this.navigateToFirstPageOfTheCategory(item.children[0].path);
            if (!navigationSucceeds) {
                this.expand(item);
            }
        }
    }
    cleanExpandedState() {
        this._expandedItems.set([]);
    }
    expandItemHierarchy(item, shouldExpand, skipExpandPredicateFn) {
        if (skipExpandPredicateFn && skipExpandPredicateFn(item)) {
            // When `skipExpandPredicateFn` returns `true` then we should trigger `cleanExpandedState`
            // to be sure that first navigation slide will be displayed.
            this.cleanExpandedState();
            return;
        }
        // Returns item when parent node was already expanded
        const parentItem = this._expandedItems().find((expandedItem) => item.parent?.label === expandedItem.label && item.parent?.path === expandedItem.path);
        if (parentItem) {
            // If the parent item is expanded, then we should display all expanded items up to the active item level.
            // This provides us with an appropriate list of expanded elements also when the user navigates using browser buttons.
            this._expandedItems.update((expandedItems) => expandedItems.filter((item) => item.level !== undefined &&
                parentItem.level !== undefined &&
                item.level <= parentItem.level));
        }
        else {
            let itemsToExpand = [];
            let node = item.parent;
            while (node && shouldExpand(node)) {
                itemsToExpand.push({ ...node, isExpanded: true });
                node = node.parent;
            }
            this._expandedItems.set(itemsToExpand.reverse());
        }
    }
    setActiveNavigationItem(item) {
        this._activeNavigationItem.set(item);
    }
    setMobileNavigationListVisibility(isVisible) {
        this._isMobileNavVisible.set(isVisible);
    }
    expand(item) {
        // Add item to the expanded items list
        this._expandedItems.update((expandedItems) => {
            return [...(expandedItems ?? []), { ...item, isExpanded: true }];
        });
    }
    collapse(item) {
        item.isExpanded = false;
        this._expandedItems.update((expandedItems) => expandedItems.slice(0, -1));
    }
    async navigateToFirstPageOfTheCategory(path) {
        return this.router.navigateByUrl(path);
    }
}
NavigationState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: NavigationState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NavigationState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: NavigationState, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: NavigationState, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9zZXJ2aWNlcy9uYXZpZ2F0aW9uLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFLdkMsTUFBTSxPQUFPLGVBQWU7SUFINUI7UUFJbUIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QiwwQkFBcUIsR0FBRyxNQUFNLENBQXdCLElBQUksQ0FBQyxDQUFDO1FBQzVELG1CQUFjLEdBQUcsTUFBTSxDQUFtQixFQUFFLENBQUMsQ0FBQztRQUM5Qyx3QkFBbUIsR0FBRyxNQUFNLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFOUQsMkJBQXNCLEdBQUcsTUFBTSxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUNyRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0Qsa0JBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pELHVCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQXlGNUQ7SUF2RkMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFvQjtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzlFLHNIQUFzSDtZQUN0SCxzRkFBc0Y7WUFDdEYsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlGLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLElBQW9CLEVBQ3BCLFlBQStDLEVBQy9DLHFCQUF5RDtRQUV6RCxJQUFJLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDekQsMEZBQTBGO1lBQzFGLDREQUE0RDtZQUM1RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixPQUFPO1FBQ1QsQ0FBQztRQUNELHFEQUFxRDtRQUNyRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUMzQyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQ2YsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEtBQUssWUFBWSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxZQUFZLENBQUMsSUFBSSxDQUN2RixDQUFDO1FBRUYsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNmLHlHQUF5RztZQUN6RyxxSEFBcUg7WUFDckgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUMzQyxhQUFhLENBQUMsTUFBTSxDQUNsQixDQUFDLElBQUksRUFBRSxFQUFFLENBQ1AsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTO2dCQUN4QixVQUFVLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQzlCLElBQUksQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLEtBQUssQ0FDakMsQ0FDRixDQUFDO1FBQ0osQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLGFBQWEsR0FBcUIsRUFBRSxDQUFDO1lBRXpDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFFdkIsT0FBTyxJQUFJLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQ2xDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztnQkFDaEQsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDckIsQ0FBQztZQUVELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7SUFDSCxDQUFDO0lBRUQsdUJBQXVCLENBQUMsSUFBMkI7UUFDakQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsaUNBQWlDLENBQUMsU0FBa0I7UUFDbEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU8sTUFBTSxDQUFDLElBQW9CO1FBQ2pDLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUMsR0FBRyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDakUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sUUFBUSxDQUFDLElBQW9CO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVPLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxJQUFZO1FBQ3pELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7bUhBbEdVLGVBQWU7dUhBQWYsZUFBZSxjQUZkLE1BQU07a0dBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgaW5qZWN0LCBzaWduYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uSXRlbX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbmRleCc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TdGF0ZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBfYWN0aXZlTmF2aWdhdGlvbkl0ZW0gPSBzaWduYWw8TmF2aWdhdGlvbkl0ZW0gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfZXhwYW5kZWRJdGVtcyA9IHNpZ25hbDxOYXZpZ2F0aW9uSXRlbVtdPihbXSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2lzTW9iaWxlTmF2VmlzaWJsZSA9IHNpZ25hbDxib29sZWFuPihmYWxzZSk7XG5cbiAgcHJpbWFyeUFjdGl2ZVJvdXRlSXRlbSA9IHNpZ25hbDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgYWN0aXZlTmF2aWdhdGlvbkl0ZW0gPSB0aGlzLl9hY3RpdmVOYXZpZ2F0aW9uSXRlbS5hc1JlYWRvbmx5KCk7XG4gIGV4cGFuZGVkSXRlbXMgPSB0aGlzLl9leHBhbmRlZEl0ZW1zLmFzUmVhZG9ubHkoKTtcbiAgaXNNb2JpbGVOYXZWaXNpYmxlID0gdGhpcy5faXNNb2JpbGVOYXZWaXNpYmxlLmFzUmVhZG9ubHkoKTtcblxuICBhc3luYyB0b2dnbGVJdGVtKGl0ZW06IE5hdmlnYXRpb25JdGVtKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpdGVtLmNoaWxkcmVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGl0ZW0uaXNFeHBhbmRlZCkge1xuICAgICAgdGhpcy5jb2xsYXBzZShpdGVtKTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5jaGlsZHJlbi5sZW5ndGggPiAwICYmIGl0ZW0uY2hpbGRyZW5bMF0ucGF0aCkge1xuICAgICAgLy8gSXQgcmVzb2x2ZXMgZmFsc2UsIHdoZW4gdGhlIHVzZXIgaGFzIGRpc3BsYXllZCB0aGUgcGFnZSwgdGhlbiBjaGFuZ2VkIHRoZSBzbGlkZSB0byBhIHNlY29uZGFyeSBuYXZpZ2F0aW9uIGNvbXBvbmVudFxuICAgICAgLy8gYW5kIHdhbnRzIHRvIHJlb3BlbiB0aGUgc2xpZGUsIHdoZXJlIHRoZSBmaXJzdCBpdGVtIGlzIHRoZSBjdXJyZW50bHkgZGlzcGxheWVkIHBhZ2VcbiAgICAgIGNvbnN0IG5hdmlnYXRpb25TdWNjZWVkcyA9IGF3YWl0IHRoaXMubmF2aWdhdGVUb0ZpcnN0UGFnZU9mVGhlQ2F0ZWdvcnkoaXRlbS5jaGlsZHJlblswXS5wYXRoKTtcblxuICAgICAgaWYgKCFuYXZpZ2F0aW9uU3VjY2VlZHMpIHtcbiAgICAgICAgdGhpcy5leHBhbmQoaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xlYW5FeHBhbmRlZFN0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2V4cGFuZGVkSXRlbXMuc2V0KFtdKTtcbiAgfVxuXG4gIGV4cGFuZEl0ZW1IaWVyYXJjaHkoXG4gICAgaXRlbTogTmF2aWdhdGlvbkl0ZW0sXG4gICAgc2hvdWxkRXhwYW5kOiAoaXRlbTogTmF2aWdhdGlvbkl0ZW0pID0+IGJvb2xlYW4sXG4gICAgc2tpcEV4cGFuZFByZWRpY2F0ZUZuPzogKGl0ZW06IE5hdmlnYXRpb25JdGVtKSA9PiBib29sZWFuLFxuICApOiB2b2lkIHtcbiAgICBpZiAoc2tpcEV4cGFuZFByZWRpY2F0ZUZuICYmIHNraXBFeHBhbmRQcmVkaWNhdGVGbihpdGVtKSkge1xuICAgICAgLy8gV2hlbiBgc2tpcEV4cGFuZFByZWRpY2F0ZUZuYCByZXR1cm5zIGB0cnVlYCB0aGVuIHdlIHNob3VsZCB0cmlnZ2VyIGBjbGVhbkV4cGFuZGVkU3RhdGVgXG4gICAgICAvLyB0byBiZSBzdXJlIHRoYXQgZmlyc3QgbmF2aWdhdGlvbiBzbGlkZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICAgIHRoaXMuY2xlYW5FeHBhbmRlZFN0YXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFJldHVybnMgaXRlbSB3aGVuIHBhcmVudCBub2RlIHdhcyBhbHJlYWR5IGV4cGFuZGVkXG4gICAgY29uc3QgcGFyZW50SXRlbSA9IHRoaXMuX2V4cGFuZGVkSXRlbXMoKS5maW5kKFxuICAgICAgKGV4cGFuZGVkSXRlbSkgPT5cbiAgICAgICAgaXRlbS5wYXJlbnQ/LmxhYmVsID09PSBleHBhbmRlZEl0ZW0ubGFiZWwgJiYgaXRlbS5wYXJlbnQ/LnBhdGggPT09IGV4cGFuZGVkSXRlbS5wYXRoLFxuICAgICk7XG5cbiAgICBpZiAocGFyZW50SXRlbSkge1xuICAgICAgLy8gSWYgdGhlIHBhcmVudCBpdGVtIGlzIGV4cGFuZGVkLCB0aGVuIHdlIHNob3VsZCBkaXNwbGF5IGFsbCBleHBhbmRlZCBpdGVtcyB1cCB0byB0aGUgYWN0aXZlIGl0ZW0gbGV2ZWwuXG4gICAgICAvLyBUaGlzIHByb3ZpZGVzIHVzIHdpdGggYW4gYXBwcm9wcmlhdGUgbGlzdCBvZiBleHBhbmRlZCBlbGVtZW50cyBhbHNvIHdoZW4gdGhlIHVzZXIgbmF2aWdhdGVzIHVzaW5nIGJyb3dzZXIgYnV0dG9ucy5cbiAgICAgIHRoaXMuX2V4cGFuZGVkSXRlbXMudXBkYXRlKChleHBhbmRlZEl0ZW1zKSA9PlxuICAgICAgICBleHBhbmRlZEl0ZW1zLmZpbHRlcihcbiAgICAgICAgICAoaXRlbSkgPT5cbiAgICAgICAgICAgIGl0ZW0ubGV2ZWwgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGFyZW50SXRlbS5sZXZlbCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBpdGVtLmxldmVsIDw9IHBhcmVudEl0ZW0ubGV2ZWwsXG4gICAgICAgICksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaXRlbXNUb0V4cGFuZDogTmF2aWdhdGlvbkl0ZW1bXSA9IFtdO1xuXG4gICAgICBsZXQgbm9kZSA9IGl0ZW0ucGFyZW50O1xuXG4gICAgICB3aGlsZSAobm9kZSAmJiBzaG91bGRFeHBhbmQobm9kZSkpIHtcbiAgICAgICAgaXRlbXNUb0V4cGFuZC5wdXNoKHsuLi5ub2RlLCBpc0V4cGFuZGVkOiB0cnVlfSk7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZXhwYW5kZWRJdGVtcy5zZXQoaXRlbXNUb0V4cGFuZC5yZXZlcnNlKCkpO1xuICAgIH1cbiAgfVxuXG4gIHNldEFjdGl2ZU5hdmlnYXRpb25JdGVtKGl0ZW06IE5hdmlnYXRpb25JdGVtIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZU5hdmlnYXRpb25JdGVtLnNldChpdGVtKTtcbiAgfVxuXG4gIHNldE1vYmlsZU5hdmlnYXRpb25MaXN0VmlzaWJpbGl0eShpc1Zpc2libGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9pc01vYmlsZU5hdlZpc2libGUuc2V0KGlzVmlzaWJsZSk7XG4gIH1cblxuICBwcml2YXRlIGV4cGFuZChpdGVtOiBOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuICAgIC8vIEFkZCBpdGVtIHRvIHRoZSBleHBhbmRlZCBpdGVtcyBsaXN0XG4gICAgdGhpcy5fZXhwYW5kZWRJdGVtcy51cGRhdGUoKGV4cGFuZGVkSXRlbXMpID0+IHtcbiAgICAgIHJldHVybiBbLi4uKGV4cGFuZGVkSXRlbXMgPz8gW10pLCB7Li4uaXRlbSwgaXNFeHBhbmRlZDogdHJ1ZX1dO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjb2xsYXBzZShpdGVtOiBOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuICAgIGl0ZW0uaXNFeHBhbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2V4cGFuZGVkSXRlbXMudXBkYXRlKChleHBhbmRlZEl0ZW1zKSA9PiBleHBhbmRlZEl0ZW1zLnNsaWNlKDAsIC0xKSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIG5hdmlnYXRlVG9GaXJzdFBhZ2VPZlRoZUNhdGVnb3J5KHBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHBhdGgpO1xuICB9XG59XG4iXX0=