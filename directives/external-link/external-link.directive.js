/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { isExternalLink } from '../../utils/index.js';
import { WINDOW } from '../../providers/index.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtbGluay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2RpcmVjdGl2ZXMvZXh0ZXJuYWwtbGluay9leHRlcm5hbC1saW5rLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBVSxXQUFXLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7O0FBRWhEOzs7R0FHRztBQVFILE1BQU0sT0FBTyxZQUFZO0lBUHpCO1FBUW1CLFdBQU0sR0FBa0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELGVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakMsV0FBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQWlCMUM7SUFiQyxRQUFRO1FBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QyxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hGLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLENBQUM7SUFDSCxDQUFDOzt3RUFuQlUsWUFBWTsrREFBWixZQUFZOzs7aUZBQVosWUFBWTtjQVB4QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVDQUF1QztnQkFDakQsSUFBSSxFQUFFO29CQUNKLGVBQWUsRUFBRSxRQUFRO2lCQUMxQjtnQkFDRCxVQUFVLEVBQUUsSUFBSTthQUNqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXQsIFBMQVRGT1JNX0lELCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc0V4dGVybmFsTGlua30gZnJvbSAnLi4vLi4vdXRpbHMvaW5kZXguanMnO1xuaW1wb3J0IHtXSU5ET1d9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9pbmRleC5qcyc7XG5cbi8qKlxuICogVGhlIGRpcmVjdGl2ZSB3aWxsIHNldCB0YXJnZXQgb2YgYW5jaG9yIGVsZW1lbnRzIHRvICdfYmxhbmsnIGZvciB0aGUgZXh0ZXJuYWwgbGlua3MuXG4gKiBXZSBjYW4gb3B0LW91dCB0aGlzIGJlaGF2aW9yIGJ5IGFkZGluZyBgbm9CbGFua0ZvckV4dGVybmFsTGlua2AgYXR0cmlidXRlIHRvIGFuY2hvciBlbGVtZW50LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdhW2hyZWZdOm5vdChbbm9CbGFua0ZvckV4dGVybmFsTGlua10pJyxcbiAgaG9zdDoge1xuICAgICdbYXR0ci50YXJnZXRdJzogJ3RhcmdldCcsXG4gIH0sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIEV4dGVybmFsTGluayBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgYW5jaG9yOiBFbGVtZW50UmVmPEhUTUxBbmNob3JFbGVtZW50PiA9IGluamVjdChFbGVtZW50UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlkID0gaW5qZWN0KFBMQVRGT1JNX0lEKTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW5kb3cgPSBpbmplY3QoV0lORE9XKTtcblxuICB0YXJnZXQ/OiAnX2JsYW5rJyB8ICdfc2VsZicgfCAnX3BhcmVudCcgfCAnX3RvcCcgfCAnJztcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldEFuY2hvclRhcmdldCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBbmNob3JUYXJnZXQoKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzRXh0ZXJuYWxMaW5rKHRoaXMuYW5jaG9yLm5hdGl2ZUVsZW1lbnQuaHJlZiwgdGhpcy53aW5kb3cubG9jYXRpb24ub3JpZ2luKSkge1xuICAgICAgdGhpcy50YXJnZXQgPSAnX2JsYW5rJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==