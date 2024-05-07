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
IconComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-rc.0", ngImport: i0, type: IconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
IconComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.0-rc.0", type: IconComponent, isStandalone: true, selector: "docs-icon", host: { attributes: { "aria-hidden": "true" }, properties: { "class": "MATERIAL_SYMBOLS_OUTLINED", "style.font-size.px": "fontSize()" } }, ngImport: i0, template: "<ng-content></ng-content>\n", styles: [".docs-icon_high-contrast{color:var(--primary-contrast)}/*# sourceMappingURL=icon.component.css.map */\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-rc.0", ngImport: i0, type: IconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'docs-icon', standalone: true, host: {
                        '[class]': 'MATERIAL_SYMBOLS_OUTLINED',
                        '[style.font-size.px]': 'fontSize()',
                        'aria-hidden': 'true',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n", styles: [".docs-icon_high-contrast{color:var(--primary-contrast)}/*# sourceMappingURL=icon.component.css.map */\n"] }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvaWNvbi9pY29uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9pY29uL2ljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQzs7QUFjdkIsTUFBTSxPQUFPLGFBQWE7SUFXeEI7UUFWQSxhQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUN2QixPQUFPLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7UUFFZ0IsOEJBQXlCLEdBQUcsMkJBQTJCLENBQUM7UUFPekUsSUFBSSxhQUFhLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQztZQUNqQyxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsQyxlQUFlLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDekIsYUFBYSxDQUFDLFlBQVksS0FBMUIsYUFBYSxDQUFDLFlBQVksR0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxFQUFDO1lBQzdGLE1BQU0sYUFBYSxDQUFDLFlBQVksQ0FBQztZQUNqQyxhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBZmMsMEJBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEFBQWhCLENBQWlCOytHQVBqQyxhQUFhO21HQUFiLGFBQWEsZ05DOUIxQiw2QkFDQTtnR0Q2QmEsYUFBYTtrQkFaekIsU0FBUzsrQkFDRSxXQUFXLGNBQ1QsSUFBSSxRQUdWO3dCQUNKLFNBQVMsRUFBRSwyQkFBMkI7d0JBQ3RDLHNCQUFzQixFQUFFLFlBQVk7d0JBQ3BDLGFBQWEsRUFBRSxNQUFNO3FCQUN0QixtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIGFmdGVyTmV4dFJlbmRlcixcbiAgY29tcHV0ZWQsXG4gIGluamVjdCxcbiAgc2lnbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jcy1pY29uJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGVVcmw6ICcuL2ljb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vaWNvbi5jb21wb25lbnQuc2NzcycsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6ICdNQVRFUklBTF9TWU1CT0xTX09VVExJTkVEJyxcbiAgICAnW3N0eWxlLmZvbnQtc2l6ZS5weF0nOiAnZm9udFNpemUoKScsXG4gICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgSWNvbkNvbXBvbmVudCB7XG4gIGZvbnRTaXplID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiBJY29uQ29tcG9uZW50LmlzRm9udExvYWRlZCgpID8gbnVsbCA6IDA7XG4gIH0pO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBNQVRFUklBTF9TWU1CT0xTX09VVExJTkVEID0gJ21hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQnO1xuXG4gIHByaXZhdGUgc3RhdGljIGlzRm9udExvYWRlZCA9IHNpZ25hbChmYWxzZSk7XG4gIC8qKiBTaGFyZSB0aGUgc2FtZSBwcm9taXNlIGFjcm9zcyBkaWZmZXJlbnQgaW5zdGFuY2VzIG9mIHRoZSBjb21wb25lbnQgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgd2hlbkZvbnRMb2FkPzogUHJvbWlzZTxGb250RmFjZVtdPiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoSWNvbkNvbXBvbmVudC5pc0ZvbnRMb2FkZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRvY3VtZW50ID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgICBhZnRlck5leHRSZW5kZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgSWNvbkNvbXBvbmVudC53aGVuRm9udExvYWQgPz89IGRvY3VtZW50LmZvbnRzLmxvYWQoJ25vcm1hbCAxcHggXCJNYXRlcmlhbCBTeW1ib2xzIE91dGxpbmVkXCInKTtcbiAgICAgIGF3YWl0IEljb25Db21wb25lbnQud2hlbkZvbnRMb2FkO1xuICAgICAgSWNvbkNvbXBvbmVudC5pc0ZvbnRMb2FkZWQuc2V0KHRydWUpO1xuICAgIH0pO1xuICB9XG59XG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4iXX0=