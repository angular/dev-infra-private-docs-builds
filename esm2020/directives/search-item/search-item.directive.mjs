/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Directive, ElementRef, Input, inject, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class SearchItem {
    constructor() {
        this.disabled = false;
        this.elementRef = inject((ElementRef));
        this._isActive = signal(false);
    }
    get isActive() {
        return this._isActive();
    }
    setActiveStyles() {
        this._isActive.set(true);
    }
    setInactiveStyles() {
        this._isActive.set(false);
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
SearchItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0-next.4", ngImport: i0, type: SearchItem, deps: [], target: i0.ɵɵFactoryTarget.Directive });
SearchItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.0-next.4", type: SearchItem, isStandalone: true, selector: "[docsSearchItem]", inputs: { item: "item", disabled: "disabled" }, host: { properties: { "class.active": "isActive" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0-next.4", ngImport: i0, type: SearchItem, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9kaXJlY3RpdmVzL3NlYXJjaC1pdGVtL3NlYXJjaC1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFXM0UsTUFBTSxPQUFPLFVBQVU7SUFQdkI7UUFTVyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRVQsZUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFBLFVBQXlCLENBQUEsQ0FBQyxDQUFDO1FBRXhELGNBQVMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0F5Qm5DO0lBdkJDLElBQWMsUUFBUTtRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE1BQU0sRUFBQyxTQUFTLEVBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9ELENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7OEdBOUJVLFVBQVU7a0dBQVYsVUFBVTtrR0FBVixVQUFVO2tCQVB0QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUU7d0JBQ0osZ0JBQWdCLEVBQUUsVUFBVTtxQkFDN0I7aUJBQ0Y7OEJBRVUsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgaW5qZWN0LCBzaWduYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIaWdobGlnaHRhYmxlfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1NlYXJjaFJlc3VsdH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9zZWFyY2gtcmVzdWx0cyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkb2NzU2VhcmNoSXRlbV0nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2lzQWN0aXZlJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoSXRlbSBpbXBsZW1lbnRzIEhpZ2hsaWdodGFibGUge1xuICBASW5wdXQoKSBpdGVtPzogU2VhcmNoUmVzdWx0O1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudFJlZiA9IGluamVjdChFbGVtZW50UmVmPEhUTUxMSUVsZW1lbnQ+KTtcblxuICBwcml2YXRlIF9pc0FjdGl2ZSA9IHNpZ25hbChmYWxzZSk7XG5cbiAgcHJvdGVjdGVkIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNBY3RpdmUoKTtcbiAgfVxuXG4gIHNldEFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9pc0FjdGl2ZS5zZXQodHJ1ZSk7XG4gIH1cblxuICBzZXRJbmFjdGl2ZVN0eWxlcygpOiB2b2lkIHtcbiAgICB0aGlzLl9pc0FjdGl2ZS5zZXQoZmFsc2UpO1xuICB9XG5cbiAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuaXRlbT8uaGllcmFyY2h5KSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IHtoaWVyYXJjaHl9ID0gdGhpcy5pdGVtO1xuICAgIHJldHVybiBgJHtoaWVyYXJjaHkubHZsMH0ke2hpZXJhcmNoeS5sdmwxfSR7aGllcmFyY2h5Lmx2bDJ9YDtcbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudFJlZj8ubmF0aXZlRWxlbWVudC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6ICduZWFyZXN0J30pO1xuICB9XG59XG4iXX0=