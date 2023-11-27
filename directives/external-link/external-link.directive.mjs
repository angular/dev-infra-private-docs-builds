/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isExternalLink } from '../../utils';
import { WINDOW } from '../../providers';
import * as i0 from "@angular/core";
/**
 * The directive will set target of anchor elements to '_blank' for the external links.
 * We can opt-out this behavior by adding `noBlankForExternalLink` attribute to anchor element.
 */
export class ExternalLink {
    constructor() {
        this.anchor = inject(ElementRef);
        this.platformId = inject(PLATFORM_ID);
        this.window = inject(WINDOW);
    }
    ngOnInit() {
        this.setAnchorTarget();
    }
    setAnchorTarget() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (isExternalLink(this.anchor.nativeElement.href, this.window.location.origin)) {
            this.target = '_blank';
        }
    }
}
ExternalLink.ɵfac = function ExternalLink_Factory(t) { return new (t || ExternalLink)(); };
ExternalLink.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ExternalLink, selectors: [["a", "href", "", 3, "noBlankForExternalLink", ""]], hostVars: 1, hostBindings: function ExternalLink_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵattribute("target", ctx.target);
    } }, standalone: true });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExternalLink, [{
        type: Directive,
        args: [{
                selector: 'a[href]:not([noBlankForExternalLink])',
                host: {
                    '[attr.target]': 'target',
                },
                standalone: true,
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtbGluay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2RpcmVjdGl2ZXMvZXh0ZXJuYWwtbGluay9leHRlcm5hbC1saW5rLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBVSxXQUFXLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDM0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQUV2Qzs7O0dBR0c7QUFRSCxNQUFNLE9BQU8sWUFBWTtJQVB6QjtRQVFtQixXQUFNLEdBQWtDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxlQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FpQjFDO0lBYkMsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sZUFBZTtRQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDeEMsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoRixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN6QixDQUFDO0lBQ0gsQ0FBQzs7d0VBbkJVLFlBQVk7K0RBQVosWUFBWTs7O2lGQUFaLFlBQVk7Y0FQeEIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7Z0JBQ2pELElBQUksRUFBRTtvQkFDSixlQUFlLEVBQUUsUUFBUTtpQkFDMUI7Z0JBQ0QsVUFBVSxFQUFFLElBQUk7YUFDakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25Jbml0LCBQTEFURk9STV9JRCwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNFeHRlcm5hbExpbmt9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7V0lORE9XfSBmcm9tICcuLi8uLi9wcm92aWRlcnMnO1xuXG4vKipcbiAqIFRoZSBkaXJlY3RpdmUgd2lsbCBzZXQgdGFyZ2V0IG9mIGFuY2hvciBlbGVtZW50cyB0byAnX2JsYW5rJyBmb3IgdGhlIGV4dGVybmFsIGxpbmtzLlxuICogV2UgY2FuIG9wdC1vdXQgdGhpcyBiZWhhdmlvciBieSBhZGRpbmcgYG5vQmxhbmtGb3JFeHRlcm5hbExpbmtgIGF0dHJpYnV0ZSB0byBhbmNob3IgZWxlbWVudC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYVtocmVmXTpub3QoW25vQmxhbmtGb3JFeHRlcm5hbExpbmtdKScsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIudGFyZ2V0XSc6ICd0YXJnZXQnLFxuICB9LFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBFeHRlcm5hbExpbmsgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHJlYWRvbmx5IGFuY2hvcjogRWxlbWVudFJlZjxIVE1MQW5jaG9yRWxlbWVudD4gPSBpbmplY3QoRWxlbWVudFJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZCA9IGluamVjdChQTEFURk9STV9JRCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luZG93ID0gaW5qZWN0KFdJTkRPVyk7XG5cbiAgdGFyZ2V0PzogJ19ibGFuaycgfCAnX3NlbGYnIHwgJ19wYXJlbnQnIHwgJ190b3AnIHwgJyc7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRBbmNob3JUYXJnZXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QW5jaG9yVGFyZ2V0KCk6IHZvaWQge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0V4dGVybmFsTGluayh0aGlzLmFuY2hvci5uYXRpdmVFbGVtZW50LmhyZWYsIHRoaXMud2luZG93LmxvY2F0aW9uLm9yaWdpbikpIHtcbiAgICAgIHRoaXMudGFyZ2V0ID0gJ19ibGFuayc7XG4gICAgfVxuICB9XG59XG4iXX0=