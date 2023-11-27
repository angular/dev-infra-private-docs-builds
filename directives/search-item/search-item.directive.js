/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Directive, ElementRef, Input, inject } from '@angular/core';
import * as i0 from "@angular/core";
export class SearchItem {
    constructor() {
        this.disabled = false;
        this.elementRef = inject((ElementRef));
        this._isActive = false;
    }
    get isActive() {
        return this._isActive;
    }
    setActiveStyles() {
        this._isActive = true;
    }
    setInactiveStyles() {
        this._isActive = false;
    }
    getLabel() {
        if (!this.item?.hierarchy) {
            return '';
        }
        const { hierarchy } = this.item;
        return `${hierarchy.lvl0}${hierarchy.lvl1}${hierarchy.lvl2}`;
    }
    scrollIntoView() {
        this.elementRef?.nativeElement.scrollIntoView({ block: 'nearest' });
    }
}
SearchItem.ɵfac = function SearchItem_Factory(t) { return new (t || SearchItem)(); };
SearchItem.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: SearchItem, selectors: [["", "docsSearchItem", ""]], hostVars: 2, hostBindings: function SearchItem_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("active", ctx.isActive);
    } }, inputs: { item: "item", disabled: "disabled" }, standalone: true });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchItem, [{
        type: Directive,
        args: [{
                selector: '[docsSearchItem]',
                standalone: true,
                host: {
                    '[class.active]': 'isActive',
                },
            }]
    }], null, { item: [{
            type: Input
        }], disabled: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9kaXJlY3RpdmVzL3NlYXJjaC1pdGVtL3NlYXJjaC1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQVduRSxNQUFNLE9BQU8sVUFBVTtJQVB2QjtRQVNXLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFVCxlQUFVLEdBQUcsTUFBTSxDQUFDLENBQUEsVUFBeUIsQ0FBQSxDQUFDLENBQUM7UUFFeEQsY0FBUyxHQUFHLEtBQUssQ0FBQztLQXlCM0I7SUF2QkMsSUFBYyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE1BQU0sRUFBQyxTQUFTLEVBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7b0VBOUJVLFVBQVU7NkRBQVYsVUFBVTs7O2lGQUFWLFVBQVU7Y0FQdEIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixJQUFJLEVBQUU7b0JBQ0osZ0JBQWdCLEVBQUUsVUFBVTtpQkFDN0I7YUFDRjtnQkFFVSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0hpZ2hsaWdodGFibGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7U2VhcmNoUmVzdWx0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3NlYXJjaC1yZXN1bHRzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RvY3NTZWFyY2hJdGVtXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFjdGl2ZV0nOiAnaXNBY3RpdmUnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hJdGVtIGltcGxlbWVudHMgSGlnaGxpZ2h0YWJsZSB7XG4gIEBJbnB1dCgpIGl0ZW0/OiBTZWFyY2hSZXN1bHQ7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50UmVmID0gaW5qZWN0KEVsZW1lbnRSZWY8SFRNTExJRWxlbWVudD4pO1xuXG4gIHByaXZhdGUgX2lzQWN0aXZlID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNBY3RpdmU7XG4gIH1cblxuICBzZXRBY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICB9XG5cbiAgc2V0SW5hY3RpdmVTdHlsZXMoKTogdm9pZCB7XG4gICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIGdldExhYmVsKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLml0ZW0/LmhpZXJhcmNoeSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBjb25zdCB7aGllcmFyY2h5fSA9IHRoaXMuaXRlbTtcbiAgICByZXR1cm4gYCR7aGllcmFyY2h5Lmx2bDB9JHtoaWVyYXJjaHkubHZsMX0ke2hpZXJhcmNoeS5sdmwyfWA7XG4gIH1cblxuICBzY3JvbGxJbnRvVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnRSZWY/Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiAnbmVhcmVzdCd9KTtcbiAgfVxufVxuIl19