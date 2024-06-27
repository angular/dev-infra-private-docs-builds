/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, afterNextRender, computed, inject, signal, } from '@angular/core';
import * as i0 from "@angular/core";
export class IconComponent {
    constructor() {
        this.fontSize = computed(() => {
            return IconComponent.isFontLoaded() ? null : 0;
        });
        this.MATERIAL_SYMBOLS_OUTLINED = 'material-symbols-outlined';
        if (IconComponent.isFontLoaded()) {
            return;
        }
        const document = inject(DOCUMENT);
        afterNextRender(async () => {
            IconComponent.whenFontLoad ?? (IconComponent.whenFontLoad = document.fonts.load('normal 1px "Material Symbols Outlined"'));
            await IconComponent.whenFontLoad;
            IconComponent.isFontLoaded.set(true);
        });
    }
}
IconComponent.isFontLoaded = signal(false);
IconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0-next.4", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
IconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.0-next.4", type: IconComponent, isStandalone: true, selector: "docs-icon", host: { attributes: { "aria-hidden": "true", "translate": "no" }, properties: { "class": "MATERIAL_SYMBOLS_OUTLINED", "style.font-size.px": "fontSize()" } }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".docs-icon_high-contrast{color:var(--primary-contrast)}/*# sourceMappingURL=icon.component.css.map */\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0-next.4", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'docs-icon', standalone: true, host: {
                        '[class]': 'MATERIAL_SYMBOLS_OUTLINED',
                        '[style.font-size.px]': 'fontSize()',
                        'aria-hidden': 'true',
                        'translate': 'no',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n", styles: [".docs-icon_high-contrast{color:var(--primary-contrast)}/*# sourceMappingURL=icon.component.css.map */\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvaWNvbi9pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9pY29uL2ljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQzs7QUFldkIsTUFBTSxPQUFPLGFBQWE7SUFXeEI7UUFWQSxhQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUN2QixPQUFPLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7UUFFZ0IsOEJBQXlCLEdBQUcsMkJBQTJCLENBQUM7UUFPekUsSUFBSSxhQUFhLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztZQUNqQyxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDekIsYUFBYSxDQUFDLFlBQVksS0FBMUIsYUFBYSxDQUFDLFlBQVksR0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFDO1lBQzdGLE1BQU0sYUFBYSxDQUFDLFlBQVksQ0FBQztZQUNqQyxhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBZmMsMEJBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEFBQWhCLENBQWlCO2lIQVBqQyxhQUFhO3FHQUFiLGFBQWEsbU9DL0IxQiw2QkFDQTtrR0Q4QmEsYUFBYTtrQkFiekIsU0FBUzsrQkFDRSxXQUFXLGNBQ1QsSUFBSSxRQUdWO3dCQUNKLFNBQVMsRUFBRSwyQkFBMkI7d0JBQ3RDLHNCQUFzQixFQUFFLFlBQVk7d0JBQ3BDLGFBQWEsRUFBRSxNQUFNO3dCQUNyQixXQUFXLEVBQUUsSUFBSTtxQkFDbEIsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBhZnRlck5leHRSZW5kZXIsXG4gIGNvbXB1dGVkLFxuICBpbmplY3QsXG4gIHNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3MtaWNvbicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY29uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2ljb24uY29tcG9uZW50LnNjc3MnLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzc10nOiAnTUFURVJJQUxfU1lNQk9MU19PVVRMSU5FRCcsXG4gICAgJ1tzdHlsZS5mb250LXNpemUucHhdJzogJ2ZvbnRTaXplKCknLFxuICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAndHJhbnNsYXRlJzogJ25vJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEljb25Db21wb25lbnQge1xuICBmb250U2l6ZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gSWNvbkNvbXBvbmVudC5pc0ZvbnRMb2FkZWQoKSA/IG51bGwgOiAwO1xuICB9KTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgTUFURVJJQUxfU1lNQk9MU19PVVRMSU5FRCA9ICdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJztcblxuICBwcml2YXRlIHN0YXRpYyBpc0ZvbnRMb2FkZWQgPSBzaWduYWwoZmFsc2UpO1xuICAvKiogU2hhcmUgdGhlIHNhbWUgcHJvbWlzZSBhY3Jvc3MgZGlmZmVyZW50IGluc3RhbmNlcyBvZiB0aGUgY29tcG9uZW50ICovXG4gIHByaXZhdGUgc3RhdGljIHdoZW5Gb250TG9hZD86IFByb21pc2U8Rm9udEZhY2VbXT4gfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgaWYgKEljb25Db21wb25lbnQuaXNGb250TG9hZGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG4gICAgYWZ0ZXJOZXh0UmVuZGVyKGFzeW5jICgpID0+IHtcbiAgICAgIEljb25Db21wb25lbnQud2hlbkZvbnRMb2FkID8/PSBkb2N1bWVudC5mb250cy5sb2FkKCdub3JtYWwgMXB4IFwiTWF0ZXJpYWwgU3ltYm9scyBPdXRsaW5lZFwiJyk7XG4gICAgICBhd2FpdCBJY29uQ29tcG9uZW50LndoZW5Gb250TG9hZDtcbiAgICAgIEljb25Db21wb25lbnQuaXNGb250TG9hZGVkLnNldCh0cnVlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19