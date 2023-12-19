/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, ElementRef, Input, ViewChild, afterNextRender, forwardRef, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class TextField {
    constructor() {
        this.name = null;
        this.placeholder = null;
        this.disabled = false;
        this.hideIcon = false;
        this.autofocus = false;
        // Implemented as part of ControlValueAccessor.
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.value = signal(null);
        afterNextRender(() => {
            if (this.autofocus) {
                this.input?.nativeElement.focus();
            }
        });
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.value.set(value);
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    setValue(value) {
        if (this.disabled) {
            return;
        }
        this.value.set(value);
        this.onChange(value);
        this.onTouched();
    }
}
TextField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.4", ngImport: i0, type: TextField, deps: [], target: i0.ɵɵFactoryTarget.Component });
TextField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.1.0-next.4", type: TextField, isStandalone: true, selector: "docs-text-field", inputs: { name: "name", placeholder: "placeholder", disabled: "disabled", hideIcon: "hideIcon", autofocus: "autofocus" }, host: { classAttribute: "adev-form-element" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextField),
            multi: true,
        },
    ], viewQueries: [{ propertyName: "input", first: true, predicate: ["inputRef"], descendants: true }], ngImport: i0, template: "@if (!hideIcon) {\n<docs-icon class=\"docs-icon_high-contrast\">search</docs-icon>\n}\n<input\n  #inputRef\n  type=\"text\"\n  [attr.placeholder]=\"placeholder\"\n  [attr.name]=\"name\"\n  [ngModel]=\"value()\"\n  (ngModelChange)=\"setValue($event)\"\n  class=\"adev-text-field\"\n/>\n", styles: [".adev-text-field{font-size:1.125rem}docs-icon+.adev-text-field{font-size:1rem}/*# sourceMappingURL=text-field.component.css.map */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: IconComponent, selector: "docs-icon" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.4", ngImport: i0, type: TextField, decorators: [{
            type: Component,
            args: [{ selector: 'docs-text-field', standalone: true, imports: [CommonModule, FormsModule, IconComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => TextField),
                            multi: true,
                        },
                    ], host: {
                        class: 'adev-form-element',
                    }, template: "@if (!hideIcon) {\n<docs-icon class=\"docs-icon_high-contrast\">search</docs-icon>\n}\n<input\n  #inputRef\n  type=\"text\"\n  [attr.placeholder]=\"placeholder\"\n  [attr.name]=\"name\"\n  [ngModel]=\"value()\"\n  (ngModelChange)=\"setValue($event)\"\n  class=\"adev-text-field\"\n/>\n", styles: [".adev-text-field{font-size:1.125rem}docs-icon+.adev-text-field{font-size:1rem}/*# sourceMappingURL=text-field.component.css.map */\n"] }]
        }], ctorParameters: () => [], propDecorators: { input: [{
                type: ViewChild,
                args: ['inputRef']
            }], name: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], disabled: [{
                type: Input
            }], hideIcon: [{
                type: Input
            }], autofocus: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvdGV4dC1maWVsZC90ZXh0LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy90ZXh0LWZpZWxkL3RleHQtZmllbGQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUF1QixXQUFXLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7OztBQW1CckQsTUFBTSxPQUFPLFNBQVM7SUFlcEI7UUFaUyxTQUFJLEdBQWtCLElBQUksQ0FBQztRQUMzQixnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFM0IsK0NBQStDO1FBQ3ZDLGFBQVEsR0FBNEIsQ0FBQyxDQUFTLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN0RCxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXRCLFVBQUssR0FBRyxNQUFNLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBR3JELGVBQWUsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELCtDQUErQztJQUMvQyxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFFLFVBQW1CO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7OzZHQW5EVSxTQUFTO2lHQUFULFNBQVMsdU9BWFQ7UUFDVDtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDeEMsS0FBSyxFQUFFLElBQUk7U0FDWjtLQUNGLDZIQ2pDSCwrUkFZQSw2TERZWSxZQUFZLDhCQUFFLFdBQVcsK21CQUFFLGFBQWE7a0dBY3ZDLFNBQVM7a0JBakJyQixTQUFTOytCQUNFLGlCQUFpQixjQUNmLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDLGFBR3hDO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQzs0QkFDeEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0YsUUFDSzt3QkFDSixLQUFLLEVBQUUsbUJBQW1CO3FCQUMzQjt3REFHOEIsS0FBSztzQkFBbkMsU0FBUzt1QkFBQyxVQUFVO2dCQUVaLElBQUk7c0JBQVosS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBWaWV3Q2hpbGQsXG4gIGFmdGVyTmV4dFJlbmRlcixcbiAgZm9yd2FyZFJlZixcbiAgc2lnbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybXNNb2R1bGUsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0ljb25Db21wb25lbnR9IGZyb20gJy4uL2ljb24vaWNvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLXRleHQtZmllbGQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgSWNvbkNvbXBvbmVudF0sXG4gIHRlbXBsYXRlVXJsOiAnLi90ZXh0LWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dC1maWVsZC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRleHRGaWVsZCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhZGV2LWZvcm0tZWxlbWVudCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFRleHRGaWVsZCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnaW5wdXRSZWYnKSBwcml2YXRlIGlucHV0PzogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBoaWRlSWNvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhdXRvZm9jdXMgPSBmYWxzZTtcblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCA9IChfOiBzdHJpbmcpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSB2YWx1ZSA9IHNpZ25hbDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBhZnRlck5leHRSZW5kZXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYXV0b2ZvY3VzKSB7XG4gICAgICAgIHRoaXMuaW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUuc2V0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52YWx1ZS5zZXQodmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cbn1cbiIsIkBpZiAoIWhpZGVJY29uKSB7XG48ZG9jcy1pY29uIGNsYXNzPVwiZG9jcy1pY29uX2hpZ2gtY29udHJhc3RcIj5zZWFyY2g8L2RvY3MtaWNvbj5cbn1cbjxpbnB1dFxuICAjaW5wdXRSZWZcbiAgdHlwZT1cInRleHRcIlxuICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gIFtuZ01vZGVsXT1cInZhbHVlKClcIlxuICAobmdNb2RlbENoYW5nZSk9XCJzZXRWYWx1ZSgkZXZlbnQpXCJcbiAgY2xhc3M9XCJhZGV2LXRleHQtZmllbGRcIlxuLz5cbiJdfQ==