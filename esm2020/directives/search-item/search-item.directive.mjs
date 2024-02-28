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
SearchItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0-next.1", ngImport: i0, type: SearchItem, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SearchItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.3.0-next.1", type: SearchItem, isStandalone: true, selector: "[docsSearchItem]", inputs: { item: "item", disabled: "disabled" }, host: { properties: { "class.active": "isActive" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0-next.1", ngImport: i0, type: SearchItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[docsSearchItem]',
                    standalone: true,
                    host: {
                        '[class.active]': 'isActive',
                    },
                }]
        }], propDecorators: { item: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9kaXJlY3RpdmVzL3NlYXJjaC1pdGVtL3NlYXJjaC1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQVduRSxNQUFNLE9BQU8sVUFBVTtJQVB2QjtRQVNXLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFVCxlQUFVLEdBQUcsTUFBTSxDQUFDLENBQUEsVUFBeUIsQ0FBQSxDQUFDLENBQUM7UUFFeEQsY0FBUyxHQUFHLEtBQUssQ0FBQztLQXlCM0I7SUF2QkMsSUFBYyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE1BQU0sRUFBQyxTQUFTLEVBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7OEdBOUJVLFVBQVU7a0dBQVYsVUFBVTtrR0FBVixVQUFVO2tCQVB0QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUU7d0JBQ0osZ0JBQWdCLEVBQUUsVUFBVTtxQkFDN0I7aUJBQ0Y7OEJBRVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SGlnaGxpZ2h0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtTZWFyY2hSZXN1bHR9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvc2VhcmNoLXJlc3VsdHMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZG9jc1NlYXJjaEl0ZW1dJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYWN0aXZlXSc6ICdpc0FjdGl2ZScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaEl0ZW0gaW1wbGVtZW50cyBIaWdobGlnaHRhYmxlIHtcbiAgQElucHV0KCkgaXRlbT86IFNlYXJjaFJlc3VsdDtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRSZWYgPSBpbmplY3QoRWxlbWVudFJlZjxIVE1MTElFbGVtZW50Pik7XG5cbiAgcHJpdmF0ZSBfaXNBY3RpdmUgPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgZ2V0IGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9pc0FjdGl2ZTtcbiAgfVxuXG4gIHNldEFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBzZXRJbmFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuaXRlbT8uaGllcmFyY2h5KSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IHtoaWVyYXJjaHl9ID0gdGhpcy5pdGVtO1xuICAgIHJldHVybiBgJHtoaWVyYXJjaHkubHZsMH0ke2hpZXJhcmNoeS5sdmwxfSR7aGllcmFyY2h5Lmx2bDJ9YDtcbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudFJlZj8ubmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6ICduZWFyZXN0J30pO1xuICB9XG59XG4iXX0=