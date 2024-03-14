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
export function setCookieConsent(state) {
    try {
        if (window.gtag) {
            const consentOptions = {
                ad_user_data: state,
                ad_personalization: state,
                ad_storage: state,
                analytics_storage: state,
            };
            if (state === 'denied') {
                window.gtag('consent', 'default', {
                    ...consentOptions,
                    wait_for_update: 500,
                });
            }
            else if (state === 'granted') {
                window.gtag('consent', 'update', {
                    ...consentOptions,
                });
            }
        }
    }
    catch {
        if (state === 'denied') {
            console.error('Unable to set default cookie consent.');
        }
        else if (state === 'granted') {
            console.error('Unable to grant cookie consent.');
        }
    }
}
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
CookiePopup.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.0", ngImport: i0, type: CookiePopup, deps: [], target: i0.ɵɵFactoryTarget.Component });
CookiePopup.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.0-next.0", type: CookiePopup, isStandalone: true, selector: "docs-cookie-popup", ngImport: i0, template: "@if (!hasAccepted()) {\n<div class=\"docs-cookies-popup docs-invert-mode\">\n  <p>This site uses cookies from Google to deliver its services and to analyze traffic.</p>\n\n  <div>\n    <a href=\"https://policies.google.com/technologies/cookies\" target=\"_blank\" rel=\"noopener\">\n      <button class=\"docs-primary-btn\" [attr.text]=\"'Learn more'\" aria-label=\"Learn More\">\n        Learn more\n      </button>\n    </a>\n    <button\n      type=\"button\"\n      (click)=\"accept()\"\n      class=\"docs-primary-btn\"\n      [attr.text]=\"'Ok, Got it'\"\n      aria-label=\"Ok, Got it\"\n    >\n      Ok, Got it\n    </button>\n  </div>\n</div>\n}\n", styles: [":host{position:fixed;bottom:.5rem;right:.5rem;z-index:var(--z-index-cookie-consent);opacity:0;visibility:hidden;animation:1s linear forwards .5s fadeIn}.docs-cookies-popup{padding:1rem;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;font-size:.875rem;max-width:265px;transition:background-color .3s ease,border-color .3s ease,color .3s ease;box-shadow:0 0 10px 0 rgba(0,0,0,.1)}.docs-cookies-popup>div{display:flex;gap:.5rem;align-items:center;width:100%;margin-block-start:1rem}.docs-cookies-popup p{margin-block:0;color:var(--primary-contrast)}@keyframes fadeIn{100%{opacity:100%;visibility:visible}}/*# sourceMappingURL=cookie-popup.component.css.map */\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.0", ngImport: i0, type: CookiePopup, decorators: [{
            type: Component,
            args: [{ selector: 'docs-cookie-popup', standalone: true, imports: [NgIf], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (!hasAccepted()) {\n<div class=\"docs-cookies-popup docs-invert-mode\">\n  <p>This site uses cookies from Google to deliver its services and to analyze traffic.</p>\n\n  <div>\n    <a href=\"https://policies.google.com/technologies/cookies\" target=\"_blank\" rel=\"noopener\">\n      <button class=\"docs-primary-btn\" [attr.text]=\"'Learn more'\" aria-label=\"Learn More\">\n        Learn more\n      </button>\n    </a>\n    <button\n      type=\"button\"\n      (click)=\"accept()\"\n      class=\"docs-primary-btn\"\n      [attr.text]=\"'Ok, Got it'\"\n      aria-label=\"Ok, Got it\"\n    >\n      Ok, Got it\n    </button>\n  </div>\n</div>\n}\n", styles: [":host{position:fixed;bottom:.5rem;right:.5rem;z-index:var(--z-index-cookie-consent);opacity:0;visibility:hidden;animation:1s linear forwards .5s fadeIn}.docs-cookies-popup{padding:1rem;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;font-size:.875rem;max-width:265px;transition:background-color .3s ease,border-color .3s ease,color .3s ease;box-shadow:0 0 10px 0 rgba(0,0,0,.1)}.docs-cookies-popup>div{display:flex;gap:.5rem;align-items:center;width:100%;margin-block-start:1rem}.docs-cookies-popup p{margin-block:0;color:var(--primary-contrast)}@keyframes fadeIn{100%{opacity:100%;visibility:visible}}/*# sourceMappingURL=cookie-popup.component.css.map */\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29va2llLXBvcHVwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb29raWUtcG9wdXAvY29va2llLXBvcHVwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb29raWUtcG9wdXAvY29va2llLXBvcHVwLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDckMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHVCQUF1QixDQUFDOztBQU9wRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUM7QUFDbEQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEtBQTJCO0lBQzFELElBQUksQ0FBQztRQUNILElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLE1BQU0sY0FBYyxHQUFHO2dCQUNyQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsa0JBQWtCLEVBQUUsS0FBSztnQkFDekIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGlCQUFpQixFQUFFLEtBQUs7YUFDekIsQ0FBQztZQUVGLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUU7b0JBQ2hDLEdBQUcsY0FBYztvQkFDakIsZUFBZSxFQUFFLEdBQUc7aUJBQ3JCLENBQUMsQ0FBQztZQUNMLENBQUM7aUJBQU0sSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRTtvQkFDL0IsR0FBRyxjQUFjO2lCQUNsQixDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFBQyxNQUFNLENBQUM7UUFDUCxJQUFJLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN2QixPQUFPLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDekQsQ0FBQzthQUFNLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztRQUNuRCxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFVRCxNQUFNLE9BQU8sV0FBVztJQU10QjtRQUxpQixpQkFBWSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV0RCwyREFBMkQ7UUFDM0QsZ0JBQVcsR0FBRyxNQUFNLENBQVUsS0FBSyxDQUFDLENBQUM7UUFHbkMseURBQXlEO1FBQ3pELG1EQUFtRDtRQUNuRCxJQUFJLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7SUFFRCxxQ0FBcUM7SUFDM0IsTUFBTTtRQUNkLElBQUksQ0FBQztZQUNILElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztRQUVWLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNCLDZDQUE2QztRQUM3QyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixDQUFDOzsrR0ExQlUsV0FBVzttR0FBWCxXQUFXLDZFQ3hEeEIsa3BCQXNCQTtrR0RrQ2EsV0FBVztrQkFSdkIsU0FBUzsrQkFDRSxtQkFBbUIsY0FDakIsSUFBSSxXQUNQLENBQUMsSUFBSSxDQUFDLG1CQUdFLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgaW5qZWN0LCBzaWduYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ0lmfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtMT0NBTF9TVE9SQUdFfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvaW5kZXgnO1xuXG4vKipcbiAqIERlY2VsYXJlIGd0YWcgYXMgcGFydCBvZiB0aGUgd2luZG93IGluIHRoaXMgZmlsZSBhcyBndGFnIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgbG9hZGVkLlxuICovXG5kZWNsYXJlIGNvbnN0IHdpbmRvdzogV2luZG93ICYgdHlwZW9mIGdsb2JhbFRoaXMgJiB7Z3RhZz86IEZ1bmN0aW9ufTtcblxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfS0VZID0gJ2RvY3MtYWNjZXB0cy1jb29raWVzJztcbmV4cG9ydCBmdW5jdGlvbiBzZXRDb29raWVDb25zZW50KHN0YXRlOiAnZGVuaWVkJyB8ICdncmFudGVkJyk6IHZvaWQge1xuICB0cnkge1xuICAgIGlmICh3aW5kb3cuZ3RhZykge1xuICAgICAgY29uc3QgY29uc2VudE9wdGlvbnMgPSB7XG4gICAgICAgIGFkX3VzZXJfZGF0YTogc3RhdGUsXG4gICAgICAgIGFkX3BlcnNvbmFsaXphdGlvbjogc3RhdGUsXG4gICAgICAgIGFkX3N0b3JhZ2U6IHN0YXRlLFxuICAgICAgICBhbmFseXRpY3Nfc3RvcmFnZTogc3RhdGUsXG4gICAgICB9O1xuXG4gICAgICBpZiAoc3RhdGUgPT09ICdkZW5pZWQnKSB7XG4gICAgICAgIHdpbmRvdy5ndGFnKCdjb25zZW50JywgJ2RlZmF1bHQnLCB7XG4gICAgICAgICAgLi4uY29uc2VudE9wdGlvbnMsXG4gICAgICAgICAgd2FpdF9mb3JfdXBkYXRlOiA1MDAsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2dyYW50ZWQnKSB7XG4gICAgICAgIHdpbmRvdy5ndGFnKCdjb25zZW50JywgJ3VwZGF0ZScsIHtcbiAgICAgICAgICAuLi5jb25zZW50T3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICBpZiAoc3RhdGUgPT09ICdkZW5pZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gc2V0IGRlZmF1bHQgY29va2llIGNvbnNlbnQuJyk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2dyYW50ZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdVbmFibGUgdG8gZ3JhbnQgY29va2llIGNvbnNlbnQuJyk7XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3MtY29va2llLXBvcHVwJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nSWZdLFxuICB0ZW1wbGF0ZVVybDogJy4vY29va2llLXBvcHVwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29va2llLXBvcHVwLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb29raWVQb3B1cCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9jYWxTdG9yYWdlID0gaW5qZWN0KExPQ0FMX1NUT1JBR0UpO1xuXG4gIC8qKiBXaGV0aGVyIHRoZSB1c2VyIGhhcyBhY2NlcHRlZCB0aGUgY29va2llIGRpc2NsYWltZXIuICovXG4gIGhhc0FjY2VwdGVkID0gc2lnbmFsPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBOZWVkcyB0byBiZSBpbiBhIHRyeS9jYXRjaCwgYmVjYXVzZSBzb21lIGJyb3dzZXJzIHdpbGxcbiAgICAvLyB0aHJvdyB3aGVuIHVzaW5nIGBsb2NhbFN0b3JhZ2VgIGluIHByaXZhdGUgbW9kZS5cbiAgICB0cnkge1xuICAgICAgdGhpcy5oYXNBY2NlcHRlZC5zZXQodGhpcy5sb2NhbFN0b3JhZ2U/LmdldEl0ZW0oU1RPUkFHRV9LRVkpID09PSAndHJ1ZScpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5oYXNBY2NlcHRlZC5zZXQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBBY2NlcHRzIHRoZSBjb29raWUgZGlzY2xhaW1lci4gKi9cbiAgcHJvdGVjdGVkIGFjY2VwdCgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2U/LnNldEl0ZW0oU1RPUkFHRV9LRVksICd0cnVlJyk7XG4gICAgfSBjYXRjaCB7fVxuXG4gICAgdGhpcy5oYXNBY2NlcHRlZC5zZXQodHJ1ZSk7XG5cbiAgICAvLyBFbmFibGUgR29vZ2xlIEFuYWx5dGljcyBjb25zZW50IHByb3BlcnRpZXNcbiAgICBzZXRDb29raWVDb25zZW50KCdncmFudGVkJyk7XG4gIH1cbn1cbiIsIkBpZiAoIWhhc0FjY2VwdGVkKCkpIHtcbjxkaXYgY2xhc3M9XCJkb2NzLWNvb2tpZXMtcG9wdXAgZG9jcy1pbnZlcnQtbW9kZVwiPlxuICA8cD5UaGlzIHNpdGUgdXNlcyBjb29raWVzIGZyb20gR29vZ2xlIHRvIGRlbGl2ZXIgaXRzIHNlcnZpY2VzIGFuZCB0byBhbmFseXplIHRyYWZmaWMuPC9wPlxuXG4gIDxkaXY+XG4gICAgPGEgaHJlZj1cImh0dHBzOi8vcG9saWNpZXMuZ29vZ2xlLmNvbS90ZWNobm9sb2dpZXMvY29va2llc1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwiZG9jcy1wcmltYXJ5LWJ0blwiIFthdHRyLnRleHRdPVwiJ0xlYXJuIG1vcmUnXCIgYXJpYS1sYWJlbD1cIkxlYXJuIE1vcmVcIj5cbiAgICAgICAgTGVhcm4gbW9yZVxuICAgICAgPC9idXR0b24+XG4gICAgPC9hPlxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgKGNsaWNrKT1cImFjY2VwdCgpXCJcbiAgICAgIGNsYXNzPVwiZG9jcy1wcmltYXJ5LWJ0blwiXG4gICAgICBbYXR0ci50ZXh0XT1cIidPaywgR290IGl0J1wiXG4gICAgICBhcmlhLWxhYmVsPVwiT2ssIEdvdCBpdFwiXG4gICAgPlxuICAgICAgT2ssIEdvdCBpdFxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxufVxuIl19