/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { LOCAL_STORAGE } from '../../providers/index';
import * as i0 from "@angular/core";
export const STORAGE_KEY = 'docs-accepts-cookies';
export class CookiePopup {
    constructor() {
        this.localStorage = inject(LOCAL_STORAGE);
        /** Whether the user has accepted the cookie disclaimer. */
        this.hasAccepted = signal(false);
        // Needs to be in a try/catch, because some browsers will
        // throw when using `localStorage` in private mode.
        try {
            this.hasAccepted.set(this.localStorage?.getItem(STORAGE_KEY) === 'true');
        }
        catch {
            this.hasAccepted.set(false);
        }
    }
    /** Accepts the cookie disclaimer. */
    accept() {
        try {
            this.localStorage?.setItem(STORAGE_KEY, 'true');
        }
        catch { }
        this.hasAccepted.set(true);
    }
}
CookiePopup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.0-next.0", ngImport: i0, type: CookiePopup, deps: [], target: i0.ɵɵFactoryTarget.Component });
CookiePopup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.2.0-next.0", type: CookiePopup, isStandalone: true, selector: "docs-cookie-popup", ngImport: i0, template: "@if (!hasAccepted()) {\n<div class=\"docs-cookies-popup adev-invert-mode\">\n  <p>This site uses cookies from Google to deliver its services and to analyze traffic.</p>\n\n  <div>\n    <a href=\"https://policies.google.com/technologies/cookies\" target=\"_blank\" rel=\"noopener\">\n      <button class=\"adev-primary-btn\" [attr.text]=\"'Learn more'\" aria-label=\"Learn More\">\n        Learn more\n      </button>\n    </a>\n    <button\n      type=\"button\"\n      (click)=\"accept()\"\n      class=\"adev-primary-btn\"\n      [attr.text]=\"'Ok, Got it'\"\n      aria-label=\"Ok, Got it\"\n    >\n      Ok, Got it\n    </button>\n  </div>\n</div>\n}\n", styles: [":host{position:fixed;bottom:.5rem;right:.5rem;z-index:var(--z-index-cookie-consent);opacity:0;visibility:hidden;animation:1s linear forwards .5s fadeIn}.docs-cookies-popup{padding:1rem;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;font-size:.875rem;max-width:265px;transition:background-color .3s ease,border-color .3s ease,color .3s ease;box-shadow:0 0 10px 0 rgba(0,0,0,.1)}.docs-cookies-popup>div{display:flex;gap:.5rem;align-items:center;width:100%;margin-block-start:1rem}.docs-cookies-popup p{margin-block:0;color:var(--primary-contrast)}@keyframes fadeIn{100%{opacity:100%;visibility:visible}}/*# sourceMappingURL=cookie-popup.component.css.map */\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.0-next.0", ngImport: i0, type: CookiePopup, decorators: [{
            type: Component,
            args: [{ selector: 'docs-cookie-popup', standalone: true, imports: [NgIf], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!hasAccepted()) {\n<div class=\"docs-cookies-popup adev-invert-mode\">\n  <p>This site uses cookies from Google to deliver its services and to analyze traffic.</p>\n\n  <div>\n    <a href=\"https://policies.google.com/technologies/cookies\" target=\"_blank\" rel=\"noopener\">\n      <button class=\"adev-primary-btn\" [attr.text]=\"'Learn more'\" aria-label=\"Learn More\">\n        Learn more\n      </button>\n    </a>\n    <button\n      type=\"button\"\n      (click)=\"accept()\"\n      class=\"adev-primary-btn\"\n      [attr.text]=\"'Ok, Got it'\"\n      aria-label=\"Ok, Got it\"\n    >\n      Ok, Got it\n    </button>\n  </div>\n</div>\n}\n", styles: [":host{position:fixed;bottom:.5rem;right:.5rem;z-index:var(--z-index-cookie-consent);opacity:0;visibility:hidden;animation:1s linear forwards .5s fadeIn}.docs-cookies-popup{padding:1rem;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;font-size:.875rem;max-width:265px;transition:background-color .3s ease,border-color .3s ease,color .3s ease;box-shadow:0 0 10px 0 rgba(0,0,0,.1)}.docs-cookies-popup>div{display:flex;gap:.5rem;align-items:center;width:100%;margin-block-start:1rem}.docs-cookies-popup p{margin-block:0;color:var(--primary-contrast)}@keyframes fadeIn{100%{opacity:100%;visibility:visible}}/*# sourceMappingURL=cookie-popup.component.css.map */\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLXBvcHVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb29raWUtcG9wdXAvY29va2llLXBvcHVwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb29raWUtcG9wdXAvY29va2llLXBvcHVwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQUVwRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUM7QUFVbEQsTUFBTSxPQUFPLFdBQVc7SUFNdEI7UUFMaUIsaUJBQVksR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdEQsMkRBQTJEO1FBQzNELGdCQUFXLEdBQUcsTUFBTSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBR25DLHlEQUF5RDtRQUN6RCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLE1BQU0sQ0FBQztZQUNQLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDSCxDQUFDO0lBRUQscUNBQXFDO0lBQzNCLE1BQU07UUFDZCxJQUFJLENBQUM7WUFDSCxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7UUFFVixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOzsrR0F2QlUsV0FBVzttR0FBWCxXQUFXLDZFQ3RCeEIsa3BCQXNCQTtrR0RBYSxXQUFXO2tCQVJ2QixTQUFTOytCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBQ1AsQ0FBQyxJQUFJLENBQUMsbUJBR0UsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBpbmplY3QsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nSWZ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0xPQ0FMX1NUT1JBR0V9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBTVE9SQUdFX0tFWSA9ICdkb2NzLWFjY2VwdHMtY29va2llcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3MtY29va2llLXBvcHVwJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nSWZdLFxuICB0ZW1wbGF0ZVVybDogJy4vY29va2llLXBvcHVwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29va2llLXBvcHVwLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb29raWVQb3B1cCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9jYWxTdG9yYWdlID0gaW5qZWN0KExPQ0FMX1NUT1JBR0UpO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIGhhcyBhY2NlcHRlZCB0aGUgY29va2llIGRpc2NsYWltZXIuICovXG4gIGhhc0FjY2VwdGVkID0gc2lnbmFsPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBOZWVkcyB0byBiZSBpbiBhIHRyeS9jYXRjaCwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIHdpbGxcbiAgICAvLyB0aHJvdyB3aGVuIHVzaW5nIGBsb2NhbFN0b3JhZ2VgIGluIHByaXZhdGUgbW9kZS5cbiAgICB0cnkge1xuICAgICAgdGhpcy5oYXNBY2NlcHRlZC5zZXQodGhpcy5sb2NhbFN0b3JhZ2U/LmdldEl0ZW0oU1RPUkFHRV9LRVkpID09PSAndHJ1ZScpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5oYXNBY2NlcHRlZC5zZXQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBBY2NlcHRzIHRoZSBjb29raWUgZGlzY2xhaW1lci4gKi9cbiAgcHJvdGVjdGVkIGFjY2VwdCgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2U/LnNldEl0ZW0oU1RPUkFHRV9LRVksICd0cnVlJyk7XG4gICAgfSBjYXRjaCB7fVxuXG4gICAgdGhpcy5oYXNBY2NlcHRlZC5zZXQodHJ1ZSk7XG4gIH1cbn1cbiIsIkBpZiAoIWhhc0FjY2VwdGVkKCkpIHtcbjxkaXYgY2xhc3M9XCJkb2NzLWNvb2tpZXMtcG9wdXAgYWRldi1pbnZlcnQtbW9kZVwiPlxuICA8cD5UaGlzIHNpdGUgdXNlcyBjb29raWVzIGZyb20gR29vZ2xlIHRvIGRlbGl2ZXIgaXRzIHNlcnZpY2VzIGFuZCB0byBhbmFseXplIHRyYWZmaWMuPC9wPlxuXG4gIDxkaXY+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vcG9saWNpZXMuZ29vZ2xlLmNvbS90ZWNobm9sb2dpZXMvY29va2llc1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYWRldi1wcmltYXJ5LWJ0blwiIFthdHRyLnRleHRdPVwiJ0xlYXJuIG1vcmUnXCIgYXJpYS1sYWJlbD1cIkxlYXJuIE1vcmVcIj5cbiAgICAgICAgTGVhcm4gbW9yZVxuICAgICAgPC9idXR0b24+XG4gICAgPC9hPlxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgKGNsaWNrKT1cImFjY2VwdCgpXCJcbiAgICAgIGNsYXNzPVwiYWRldi1wcmltYXJ5LWJ0blwiXG4gICAgICBbYXR0ci50ZXh0XT1cIidPaywgR290IGl0J1wiXG4gICAgICBhcmlhLWxhYmVsPVwiT2ssIEdvdCBpdFwiXG4gICAgPlxuICAgICAgT2ssIEdvdCBpdFxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxufVxuIl19