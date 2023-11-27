/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, afterNextRender, inject, } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["*"];
export class IconComponent {
    get fontSize() {
        return IconComponent.isFontLoaded ? null : 0;
    }
    constructor() {
        this.cdRef = inject(ChangeDetectorRef);
        this.MATERIAL_SYMBOLS_OUTLINED = 'material-symbols-outlined';
        if (IconComponent.isFontLoaded) {
            return;
        }
        const document = inject(DOCUMENT);
        afterNextRender(async () => {
            IconComponent.whenFontLoad ?? (IconComponent.whenFontLoad = document.fonts.load('normal 1px "Material Symbols Outlined"'));
            await IconComponent.whenFontLoad;
            IconComponent.isFontLoaded = true;
            // We need to ensure CD is triggered on the component when the font is loaded
            this.cdRef.markForCheck();
        });
    }
}
IconComponent.isFontLoaded = false;
IconComponent.ɵfac = function IconComponent_Factory(t) { return new (t || IconComponent)(); };
IconComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IconComponent, selectors: [["docs-icon"]], hostAttrs: ["aria-hidden", "true"], hostVars: 4, hostBindings: function IconComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassMap(ctx.MATERIAL_SYMBOLS_OUTLINED);
        i0.ɵɵstyleProp("font-size", ctx.fontSize, "px");
    } }, standalone: true, features: [i0.ɵɵStandaloneFeature], ngContentSelectors: _c0, decls: 1, vars: 0, template: function IconComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵprojection(0);
    } }, styles: [".docs-icon_high-contrast[_ngcontent-%COMP%]{color:var(--primary-contrast)}/*# sourceMappingURL=icon.component.css.map */"], changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IconComponent, [{
        type: Component,
        args: [{ selector: 'docs-icon', standalone: true, host: {
                    '[class]': 'MATERIAL_SYMBOLS_OUTLINED',
                    '[style.font-size.px]': 'fontSize',
                    'aria-hidden': 'true',
                }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n", styles: [".docs-icon_high-contrast{color:var(--primary-contrast)}/*# sourceMappingURL=icon.component.css.map */\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IconComponent, { className: "IconComponent", filePath: "docs/components/icon/icon.component.ts", lineNumber: 30 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvaWNvbi9pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9pY29uL2ljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDOzs7QUFjdkIsTUFBTSxPQUFPLGFBQWE7SUFHeEIsSUFBSSxRQUFRO1FBQ1YsT0FBTyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBUUQ7UUFaaUIsVUFBSyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBTWhDLDhCQUF5QixHQUFHLDJCQUEyQixDQUFDO1FBT3pFLElBQUksYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQy9CLE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLGVBQWUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN6QixhQUFhLENBQUMsWUFBWSxLQUExQixhQUFhLENBQUMsWUFBWSxHQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLEVBQUM7WUFDN0YsTUFBTSxhQUFhLENBQUMsWUFBWSxDQUFDO1lBQ2pDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBRWxDLDZFQUE2RTtZQUM3RSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFsQmMsMEJBQVksR0FBWSxLQUFLLEFBQWpCLENBQWtCOzBFQVRsQyxhQUFhO2dFQUFiLGFBQWE7Ozs7O1FDN0IxQixrQkFBeUI7O2lGRDZCWixhQUFhO2NBWnpCLFNBQVM7MkJBQ0UsV0FBVyxjQUNULElBQUksUUFHVjtvQkFDSixTQUFTLEVBQUUsMkJBQTJCO29CQUN0QyxzQkFBc0IsRUFBRSxVQUFVO29CQUNsQyxhQUFhLEVBQUUsTUFBTTtpQkFDdEIsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07O2tGQUVwQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIGFmdGVyTmV4dFJlbmRlcixcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jcy1pY29uJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGVVcmw6ICcuL2ljb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vaWNvbi5jb21wb25lbnQuc2NzcycsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdNQVRFUklBTF9TWU1CT0xTX09VVExJTkVEJyxcbiAgICAnW3N0eWxlLmZvbnQtc2l6ZS5weF0nOiAnZm9udFNpemUnLFxuICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEljb25Db21wb25lbnQge1xuICBwcml2YXRlIHJlYWRvbmx5IGNkUmVmID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcblxuICBnZXQgZm9udFNpemUoKTogbnVtYmVyIHwgbnVsbCB7XG4gICAgcmV0dXJuIEljb25Db21wb25lbnQuaXNGb250TG9hZGVkID8gbnVsbCA6IDA7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgTUFURVJJQUxfU1lNQk9MU19PVVRMSU5FRCA9ICdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJztcblxuICBwcml2YXRlIHN0YXRpYyBpc0ZvbnRMb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgLyoqIFNoYXJlIHRoZSBzYW1lIHByb21pc2UgYWNyb3NzIGRpZmZlcmVudCBpbnN0YW5jZXMgb2YgdGhlIGNvbXBvbmVudCAqL1xuICBwcml2YXRlIHN0YXRpYyB3aGVuRm9udExvYWQ/OiBQcm9taXNlPEZvbnRGYWNlW10+IHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmIChJY29uQ29tcG9uZW50LmlzRm9udExvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRvY3VtZW50ID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgICBhZnRlck5leHRSZW5kZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgSWNvbkNvbXBvbmVudC53aGVuRm9udExvYWQgPz89IGRvY3VtZW50LmZvbnRzLmxvYWQoJ25vcm1hbCAxcHggXCJNYXRlcmlhbCBTeW1ib2xzIE91dGxpbmVkXCInKTtcbiAgICAgIGF3YWl0IEljb25Db21wb25lbnQud2hlbkZvbnRMb2FkO1xuICAgICAgSWNvbkNvbXBvbmVudC5pc0ZvbnRMb2FkZWQgPSB0cnVlO1xuXG4gICAgICAvLyBXZSBuZWVkIHRvIGVuc3VyZSBDRCBpcyB0cmlnZ2VyZWQgb24gdGhlIGNvbXBvbmVudCB3aGVuIHRoZSBmb250IGlzIGxvYWRlZFxuICAgICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19