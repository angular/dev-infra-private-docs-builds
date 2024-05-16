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
import { setCookieConsent } from '../../utils';
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
        // Enable Google Analytics consent properties
        setCookieConsent('granted');
    }
}
CookiePopup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-rc.2", ngImport: i0, type: CookiePopup, deps: [], target: i0.ɵɵFactoryTarget.Component });
CookiePopup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.0-rc.2", type: CookiePopup, isStandalone: true, selector: "docs-cookie-popup", ngImport: i0, template: "@if (!hasAccepted()) {\n<div class=\"docs-cookies-popup docs-invert-mode\">\n  <p>This site uses cookies from Google to deliver its services and to analyze traffic.</p>\n\n  <div>\n    <a href=\"https://policies.google.com/technologies/cookies\" target=\"_blank\" rel=\"noopener\">\n      <button class=\"docs-primary-btn\" [attr.text]=\"'Learn more'\" aria-label=\"Learn More\">\n        Learn more\n      </button>\n    </a>\n    <button\n      type=\"button\"\n      (click)=\"accept()\"\n      class=\"docs-primary-btn\"\n      [attr.text]=\"'Ok, Got it'\"\n      aria-label=\"Ok, Got it\"\n    >\n      Ok, Got it\n    </button>\n  </div>\n</div>\n}\n", styles: [":host{position:fixed;bottom:.5rem;right:.5rem;z-index:var(--z-index-cookie-consent);opacity:0;visibility:hidden;animation:1s linear forwards .5s fadeIn}.docs-cookies-popup{padding:1rem;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;font-size:.875rem;max-width:265px;transition:background-color .3s ease,border-color .3s ease,color .3s ease;box-shadow:0 0 10px 0 rgba(0,0,0,.1)}.docs-cookies-popup>div{display:flex;gap:.5rem;align-items:center;width:100%;margin-block-start:1rem}.docs-cookies-popup p{margin-block:0;color:var(--primary-contrast)}@keyframes fadeIn{100%{opacity:100%;visibility:visible}}/*# sourceMappingURL=cookie-popup.component.css.map */\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-rc.2", ngImport: i0, type: CookiePopup, decorators: [{
            type: Component,
            args: [{ selector: 'docs-cookie-popup', standalone: true, imports: [NgIf], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!hasAccepted()) {\n<div class=\"docs-cookies-popup docs-invert-mode\">\n  <p>This site uses cookies from Google to deliver its services and to analyze traffic.</p>\n\n  <div>\n    <a href=\"https://policies.google.com/technologies/cookies\" target=\"_blank\" rel=\"noopener\">\n      <button class=\"docs-primary-btn\" [attr.text]=\"'Learn more'\" aria-label=\"Learn More\">\n        Learn more\n      </button>\n    </a>\n    <button\n      type=\"button\"\n      (click)=\"accept()\"\n      class=\"docs-primary-btn\"\n      [attr.text]=\"'Ok, Got it'\"\n      aria-label=\"Ok, Got it\"\n    >\n      Ok, Got it\n    </button>\n  </div>\n</div>\n}\n", styles: [":host{position:fixed;bottom:.5rem;right:.5rem;z-index:var(--z-index-cookie-consent);opacity:0;visibility:hidden;animation:1s linear forwards .5s fadeIn}.docs-cookies-popup{padding:1rem;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;font-size:.875rem;max-width:265px;transition:background-color .3s ease,border-color .3s ease,color .3s ease;box-shadow:0 0 10px 0 rgba(0,0,0,.1)}.docs-cookies-popup>div{display:flex;gap:.5rem;align-items:center;width:100%;margin-block-start:1rem}.docs-cookies-popup p{margin-block:0;color:var(--primary-contrast)}@keyframes fadeIn{100%{opacity:100%;visibility:visible}}/*# sourceMappingURL=cookie-popup.component.css.map */\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLXBvcHVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb29raWUtcG9wdXAvY29va2llLXBvcHVwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb29raWUtcG9wdXAvY29va2llLXBvcHVwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGFBQWEsQ0FBQzs7QUFPN0MsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDO0FBVWxELE1BQU0sT0FBTyxXQUFXO0lBTXRCO1FBTGlCLGlCQUFZLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXRELDJEQUEyRDtRQUMzRCxnQkFBVyxHQUFHLE1BQU0sQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUduQyx5REFBeUQ7UUFDekQsbURBQW1EO1FBQ25ELElBQUksQ0FBQztZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0gsQ0FBQztJQUVELHFDQUFxQztJQUMzQixNQUFNO1FBQ2QsSUFBSSxDQUFDO1lBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO1FBRVYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFM0IsNkNBQTZDO1FBQzdDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7OzZHQTFCVSxXQUFXO2lHQUFYLFdBQVcsNkVDNUJ4QixrcEJBc0JBO2dHRE1hLFdBQVc7a0JBUnZCLFNBQVM7K0JBQ0UsbUJBQW1CLGNBQ2pCLElBQUksV0FDUCxDQUFDLElBQUksQ0FBQyxtQkFHRSx1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIGluamVjdCwgc2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmdJZn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TE9DQUxfU1RPUkFHRX0gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2luZGV4JztcbmltcG9ydCB7c2V0Q29va2llQ29uc2VudH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuXG4vKipcbiAqIERlY2VsYXJlIGd0YWcgYXMgcGFydCBvZiB0aGUgd2luZG93IGluIHRoaXMgZmlsZSBhcyBndGFnIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgbG9hZGVkLlxuICovXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogV2luZG93ICYgdHlwZW9mIGdsb2JhbFRoaXMgJiB7Z3RhZz86IEZ1bmN0aW9ufTtcblxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfS0VZID0gJ2RvY3MtYWNjZXB0cy1jb29raWVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jcy1jb29raWUtcG9wdXAnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdJZl0sXG4gIHRlbXBsYXRlVXJsOiAnLi9jb29raWUtcG9wdXAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb29raWUtcG9wdXAuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvb2tpZVBvcHVwIHtcbiAgcHJpdmF0ZSByZWFkb25seSBsb2NhbFN0b3JhZ2UgPSBpbmplY3QoTE9DQUxfU1RPUkFHRSk7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIHVzZXIgaGFzIGFjY2VwdGVkIHRoZSBjb29raWUgZGlzY2xhaW1lci4gKi9cbiAgaGFzQWNjZXB0ZWQgPSBzaWduYWw8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIE5lZWRzIHRvIGJlIGluIGEgdHJ5L2NhdGNoLCBiZWNhdXNlIHNvbWUgYnJvd3NlcnMgd2lsbFxuICAgIC8vIHRocm93IHdoZW4gdXNpbmcgYGxvY2FsU3RvcmFnZWAgaW4gcHJpdmF0ZSBtb2RlLlxuICAgIHRyeSB7XG4gICAgICB0aGlzLmhhc0FjY2VwdGVkLnNldCh0aGlzLmxvY2FsU3RvcmFnZT8uZ2V0SXRlbShTVE9SQUdFX0tFWSkgPT09ICd0cnVlJyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aGlzLmhhc0FjY2VwdGVkLnNldChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEFjY2VwdHMgdGhlIGNvb2tpZSBkaXNjbGFpbWVyLiAqL1xuICBwcm90ZWN0ZWQgYWNjZXB0KCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZT8uc2V0SXRlbShTVE9SQUdFX0tFWSwgJ3RydWUnKTtcbiAgICB9IGNhdGNoIHt9XG5cbiAgICB0aGlzLmhhc0FjY2VwdGVkLnNldCh0cnVlKTtcblxuICAgIC8vIEVuYWJsZSBHb29nbGUgQW5hbHl0aWNzIGNvbnNlbnQgcHJvcGVydGllc1xuICAgIHNldENvb2tpZUNvbnNlbnQoJ2dyYW50ZWQnKTtcbiAgfVxufVxuIiwiQGlmICghaGFzQWNjZXB0ZWQoKSkge1xuPGRpdiBjbGFzcz1cImRvY3MtY29va2llcy1wb3B1cCBkb2NzLWludmVydC1tb2RlXCI+XG4gIDxwPlRoaXMgc2l0ZSB1c2VzIGNvb2tpZXMgZnJvbSBHb29nbGUgdG8gZGVsaXZlciBpdHMgc2VydmljZXMgYW5kIHRvIGFuYWx5emUgdHJhZmZpYy48L3A+XG5cbiAgPGRpdj5cbiAgICA8YSBocmVmPVwiaHR0cHM6Ly9wb2xpY2llcy5nb29nbGUuY29tL3RlY2hub2xvZ2llcy9jb29raWVzXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJkb2NzLXByaW1hcnktYnRuXCIgW2F0dHIudGV4dF09XCInTGVhcm4gbW9yZSdcIiBhcmlhLWxhYmVsPVwiTGVhcm4gTW9yZVwiPlxuICAgICAgICBMZWFybiBtb3JlXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2E+XG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAoY2xpY2spPVwiYWNjZXB0KClcIlxuICAgICAgY2xhc3M9XCJkb2NzLXByaW1hcnktYnRuXCJcbiAgICAgIFthdHRyLnRleHRdPVwiJ09rLCBHb3QgaXQnXCJcbiAgICAgIGFyaWEtbGFiZWw9XCJPaywgR290IGl0XCJcbiAgICA+XG4gICAgICBPaywgR290IGl0XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG59XG4iXX0=