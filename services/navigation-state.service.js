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
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
let NavigationState = class NavigationState {
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
};
NavigationState = __decorate([
    Injectable({
        providedIn: 'root',
    })
], NavigationState);
export { NavigationState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1zdGF0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9zZXJ2aWNlcy9uYXZpZ2F0aW9uLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUtoQyxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBQXJCO1FBQ1ksV0FBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4QiwwQkFBcUIsR0FBRyxNQUFNLENBQXdCLElBQUksQ0FBQyxDQUFDO1FBQzVELG1CQUFjLEdBQUcsTUFBTSxDQUFtQixFQUFFLENBQUMsQ0FBQztRQUM5Qyx3QkFBbUIsR0FBRyxNQUFNLENBQVUsS0FBSyxDQUFDLENBQUM7UUFFOUQsMkJBQXNCLEdBQUcsTUFBTSxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUNyRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDL0Qsa0JBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pELHVCQUFrQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQXlGN0QsQ0FBQztJQXZGQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQW9CO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUUsc0hBQXNIO1lBQ3RILHNGQUFzRjtZQUN0RixNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUYsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsSUFBb0IsRUFDcEIsWUFBK0MsRUFDL0MscUJBQXlEO1FBRXpELElBQUkscUJBQXFCLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN6RCwwRkFBMEY7WUFDMUYsNERBQTREO1lBQzVELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzFCLE9BQU87UUFDVCxDQUFDO1FBQ0QscURBQXFEO1FBQ3JELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzNDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FDZixJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssS0FBSyxZQUFZLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLFlBQVksQ0FBQyxJQUFJLENBQ3ZGLENBQUM7UUFFRixJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ2YseUdBQXlHO1lBQ3pHLHFIQUFxSDtZQUNySCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQzNDLGFBQWEsQ0FBQyxNQUFNLENBQ2xCLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDUCxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQ3hCLFVBQVUsQ0FBQyxLQUFLLEtBQUssU0FBUztnQkFDOUIsSUFBSSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsS0FBSyxDQUNqQyxDQUNGLENBQUM7UUFDSixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksYUFBYSxHQUFxQixFQUFFLENBQUM7WUFFekMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUV2QixPQUFPLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDbEMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyQixDQUFDO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxJQUEyQjtRQUNqRCxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxpQ0FBaUMsQ0FBQyxTQUFrQjtRQUNsRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxNQUFNLENBQUMsSUFBb0I7UUFDakMsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBQyxHQUFHLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxRQUFRLENBQUMsSUFBb0I7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU8sS0FBSyxDQUFDLGdDQUFnQyxDQUFDLElBQVk7UUFDekQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0YsQ0FBQTtBQW5HWSxlQUFlO0lBSDNCLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxlQUFlLENBbUczQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBpbmplY3QsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25JdGVtfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXRlIHtcbiAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXIgPSBpbmplY3QoUm91dGVyKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9hY3RpdmVOYXZpZ2F0aW9uSXRlbSA9IHNpZ25hbDxOYXZpZ2F0aW9uSXRlbSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIHJlYWRvbmx5IF9leHBhbmRlZEl0ZW1zID0gc2lnbmFsPE5hdmlnYXRpb25JdGVtW10+KFtdKTtcbiAgcHJpdmF0ZSByZWFkb25seSBfaXNNb2JpbGVOYXZWaXNpYmxlID0gc2lnbmFsPGJvb2xlYW4+KGZhbHNlKTtcblxuICBwcmltYXJ5QWN0aXZlUm91dGVJdGVtID0gc2lnbmFsPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBhY3RpdmVOYXZpZ2F0aW9uSXRlbSA9IHRoaXMuX2FjdGl2ZU5hdmlnYXRpb25JdGVtLmFzUmVhZG9ubHkoKTtcbiAgZXhwYW5kZWRJdGVtcyA9IHRoaXMuX2V4cGFuZGVkSXRlbXMuYXNSZWFkb25seSgpO1xuICBpc01vYmlsZU5hdlZpc2libGUgPSB0aGlzLl9pc01vYmlsZU5hdlZpc2libGUuYXNSZWFkb25seSgpO1xuXG4gIGFzeW5jIHRvZ2dsZUl0ZW0oaXRlbTogTmF2aWdhdGlvbkl0ZW0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXRlbS5pc0V4cGFuZGVkKSB7XG4gICAgICB0aGlzLmNvbGxhcHNlKGl0ZW0pO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgaXRlbS5jaGlsZHJlblswXS5wYXRoKSB7XG4gICAgICAvLyBJdCByZXNvbHZlcyBmYWxzZSwgd2hlbiB0aGUgdXNlciBoYXMgZGlzcGxheWVkIHRoZSBwYWdlLCB0aGVuIGNoYW5nZWQgdGhlIHNsaWRlIHRvIGEgc2Vjb25kYXJ5IG5hdmlnYXRpb24gY29tcG9uZW50XG4gICAgICAvLyBhbmQgd2FudHMgdG8gcmVvcGVuIHRoZSBzbGlkZSwgd2hlcmUgdGhlIGZpcnN0IGl0ZW0gaXMgdGhlIGN1cnJlbnRseSBkaXNwbGF5ZWQgcGFnZVxuICAgICAgY29uc3QgbmF2aWdhdGlvblN1Y2NlZWRzID0gYXdhaXQgdGhpcy5uYXZpZ2F0ZVRvRmlyc3RQYWdlT2ZUaGVDYXRlZ29yeShpdGVtLmNoaWxkcmVuWzBdLnBhdGgpO1xuXG4gICAgICBpZiAoIW5hdmlnYXRpb25TdWNjZWVkcykge1xuICAgICAgICB0aGlzLmV4cGFuZChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbGVhbkV4cGFuZGVkU3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5fZXhwYW5kZWRJdGVtcy5zZXQoW10pO1xuICB9XG5cbiAgZXhwYW5kSXRlbUhpZXJhcmNoeShcbiAgICBpdGVtOiBOYXZpZ2F0aW9uSXRlbSxcbiAgICBzaG91bGRFeHBhbmQ6IChpdGVtOiBOYXZpZ2F0aW9uSXRlbSkgPT4gYm9vbGVhbixcbiAgICBza2lwRXhwYW5kUHJlZGljYXRlRm4/OiAoaXRlbTogTmF2aWdhdGlvbkl0ZW0pID0+IGJvb2xlYW4sXG4gICk6IHZvaWQge1xuICAgIGlmIChza2lwRXhwYW5kUHJlZGljYXRlRm4gJiYgc2tpcEV4cGFuZFByZWRpY2F0ZUZuKGl0ZW0pKSB7XG4gICAgICAvLyBXaGVuIGBza2lwRXhwYW5kUHJlZGljYXRlRm5gIHJldHVybnMgYHRydWVgIHRoZW4gd2Ugc2hvdWxkIHRyaWdnZXIgYGNsZWFuRXhwYW5kZWRTdGF0ZWBcbiAgICAgIC8vIHRvIGJlIHN1cmUgdGhhdCBmaXJzdCBuYXZpZ2F0aW9uIHNsaWRlIHdpbGwgYmUgZGlzcGxheWVkLlxuICAgICAgdGhpcy5jbGVhbkV4cGFuZGVkU3RhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gUmV0dXJucyBpdGVtIHdoZW4gcGFyZW50IG5vZGUgd2FzIGFscmVhZHkgZXhwYW5kZWRcbiAgICBjb25zdCBwYXJlbnRJdGVtID0gdGhpcy5fZXhwYW5kZWRJdGVtcygpLmZpbmQoXG4gICAgICAoZXhwYW5kZWRJdGVtKSA9PlxuICAgICAgICBpdGVtLnBhcmVudD8ubGFiZWwgPT09IGV4cGFuZGVkSXRlbS5sYWJlbCAmJiBpdGVtLnBhcmVudD8ucGF0aCA9PT0gZXhwYW5kZWRJdGVtLnBhdGgsXG4gICAgKTtcblxuICAgIGlmIChwYXJlbnRJdGVtKSB7XG4gICAgICAvLyBJZiB0aGUgcGFyZW50IGl0ZW0gaXMgZXhwYW5kZWQsIHRoZW4gd2Ugc2hvdWxkIGRpc3BsYXkgYWxsIGV4cGFuZGVkIGl0ZW1zIHVwIHRvIHRoZSBhY3RpdmUgaXRlbSBsZXZlbC5cbiAgICAgIC8vIFRoaXMgcHJvdmlkZXMgdXMgd2l0aCBhbiBhcHByb3ByaWF0ZSBsaXN0IG9mIGV4cGFuZGVkIGVsZW1lbnRzIGFsc28gd2hlbiB0aGUgdXNlciBuYXZpZ2F0ZXMgdXNpbmcgYnJvd3NlciBidXR0b25zLlxuICAgICAgdGhpcy5fZXhwYW5kZWRJdGVtcy51cGRhdGUoKGV4cGFuZGVkSXRlbXMpID0+XG4gICAgICAgIGV4cGFuZGVkSXRlbXMuZmlsdGVyKFxuICAgICAgICAgIChpdGVtKSA9PlxuICAgICAgICAgICAgaXRlbS5sZXZlbCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICBwYXJlbnRJdGVtLmxldmVsICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgIGl0ZW0ubGV2ZWwgPD0gcGFyZW50SXRlbS5sZXZlbCxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpdGVtc1RvRXhwYW5kOiBOYXZpZ2F0aW9uSXRlbVtdID0gW107XG5cbiAgICAgIGxldCBub2RlID0gaXRlbS5wYXJlbnQ7XG5cbiAgICAgIHdoaWxlIChub2RlICYmIHNob3VsZEV4cGFuZChub2RlKSkge1xuICAgICAgICBpdGVtc1RvRXhwYW5kLnB1c2goey4uLm5vZGUsIGlzRXhwYW5kZWQ6IHRydWV9KTtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9leHBhbmRlZEl0ZW1zLnNldChpdGVtc1RvRXhwYW5kLnJldmVyc2UoKSk7XG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aXZlTmF2aWdhdGlvbkl0ZW0oaXRlbTogTmF2aWdhdGlvbkl0ZW0gfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5fYWN0aXZlTmF2aWdhdGlvbkl0ZW0uc2V0KGl0ZW0pO1xuICB9XG5cbiAgc2V0TW9iaWxlTmF2aWdhdGlvbkxpc3RWaXNpYmlsaXR5KGlzVmlzaWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2lzTW9iaWxlTmF2VmlzaWJsZS5zZXQoaXNWaXNpYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgZXhwYW5kKGl0ZW06IE5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG4gICAgLy8gQWRkIGl0ZW0gdG8gdGhlIGV4cGFuZGVkIGl0ZW1zIGxpc3RcbiAgICB0aGlzLl9leHBhbmRlZEl0ZW1zLnVwZGF0ZSgoZXhwYW5kZWRJdGVtcykgPT4ge1xuICAgICAgcmV0dXJuIFsuLi4oZXhwYW5kZWRJdGVtcyA/PyBbXSksIHsuLi5pdGVtLCBpc0V4cGFuZGVkOiB0cnVlfV07XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNvbGxhcHNlKGl0ZW06IE5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG4gICAgaXRlbS5pc0V4cGFuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fZXhwYW5kZWRJdGVtcy51cGRhdGUoKGV4cGFuZGVkSXRlbXMpID0+IGV4cGFuZGVkSXRlbXMuc2xpY2UoMCwgLTEpKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbmF2aWdhdGVUb0ZpcnN0UGFnZU9mVGhlQ2F0ZWdvcnkocGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwocGF0aCk7XG4gIH1cbn1cbiJdfQ==