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
const _c0 = ["inputRef"];
function TextField_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "docs-icon", 3);
    i0.ɵɵtext(1, "search");
    i0.ɵɵelementEnd();
} }
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
TextField.ɵfac = function TextField_Factory(t) { return new (t || TextField)(); };
TextField.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TextField, selectors: [["docs-text-field"]], viewQuery: function TextField_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.input = _t.first);
    } }, hostAttrs: [1, "adev-form-element"], inputs: { name: "name", placeholder: "placeholder", disabled: "disabled", hideIcon: "hideIcon", autofocus: "autofocus" }, standalone: true, features: [i0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => TextField),
                multi: true,
            },
        ]), i0.ɵɵStandaloneFeature], decls: 3, vars: 4, consts: [["class", "docs-icon_high-contrast"], ["type", "text", 1, "adev-text-field", 3, "ngModel", "ngModelChange"], ["inputRef", ""], [1, "docs-icon_high-contrast"]], template: function TextField_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, TextField_Conditional_0_Template, 2, 0, "docs-icon", 0);
        i0.ɵɵelementStart(1, "input", 1, 2);
        i0.ɵɵlistener("ngModelChange", function TextField_Template_input_ngModelChange_1_listener($event) { return ctx.setValue($event); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵconditional(0, !ctx.hideIcon ? 0 : -1);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngModel", ctx.value());
        i0.ɵɵattribute("placeholder", ctx.placeholder)("name", ctx.name);
    } }, dependencies: [CommonModule, FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, IconComponent], styles: [".adev-text-field[_ngcontent-%COMP%]{font-size:1.125rem}docs-icon[_ngcontent-%COMP%] + .adev-text-field[_ngcontent-%COMP%]{font-size:1rem}/*# sourceMappingURL=text-field.component.css.map */"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextField, [{
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
    }], () => [], { input: [{
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
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TextField, { className: "TextField", filePath: "docs/components/text-field/text-field.component.ts", lineNumber: 39 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvdGV4dC1maWVsZC90ZXh0LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy90ZXh0LWZpZWxkL3RleHQtZmllbGQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUF1QixXQUFXLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0lDbEJyRCxvQ0FBMkM7SUFBQSxzQkFBTTtJQUFBLGlCQUFZOztBRHFDN0QsTUFBTSxPQUFPLFNBQVM7SUFlcEI7UUFaUyxTQUFJLEdBQWtCLElBQUksQ0FBQztRQUMzQixnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFFM0IsK0NBQStDO1FBQ3ZDLGFBQVEsR0FBNEIsQ0FBQyxDQUFTLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN0RCxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXRCLFVBQUssR0FBRyxNQUFNLENBQWdCLElBQUksQ0FBQyxDQUFDO1FBR3JELGVBQWUsQ0FBQyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELCtDQUErQztJQUMvQyxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFFLFVBQW1CO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBYTtRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7O2tFQW5EVSxTQUFTOzREQUFULFNBQVM7Ozs7OzJOQVhUO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ3hDLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjtRQ2pDSCx3RUFFQztRQUNELG1DQVFFO1FBRkEsMkdBQWlCLG9CQUFnQixJQUFDO1FBTnBDLGlCQVFFOztRQVhGLDJDQUVDO1FBTUMsZUFBbUI7UUFBbkIscUNBQW1CO1FBRm5CLDhDQUFnQyxrQkFBQTt3QkRrQnRCLFlBQVksRUFBRSxXQUFXLDJEQUFFLGFBQWE7aUZBY3ZDLFNBQVM7Y0FqQnJCLFNBQVM7MkJBQ0UsaUJBQWlCLGNBQ2YsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUMsYUFHeEM7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDO3dCQUN4QyxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRixRQUNLO29CQUNKLEtBQUssRUFBRSxtQkFBbUI7aUJBQzNCO29CQUc4QixLQUFLO2tCQUFuQyxTQUFTO21CQUFDLFVBQVU7WUFFWixJQUFJO2tCQUFaLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLOztrRkFQSyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBWaWV3Q2hpbGQsXG4gIGFmdGVyTmV4dFJlbmRlcixcbiAgZm9yd2FyZFJlZixcbiAgc2lnbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybXNNb2R1bGUsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0ljb25Db21wb25lbnR9IGZyb20gJy4uL2ljb24vaWNvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLXRleHQtZmllbGQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgSWNvbkNvbXBvbmVudF0sXG4gIHRlbXBsYXRlVXJsOiAnLi90ZXh0LWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dC1maWVsZC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRleHRGaWVsZCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdhZGV2LWZvcm0tZWxlbWVudCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFRleHRGaWVsZCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnaW5wdXRSZWYnKSBwcml2YXRlIGlucHV0PzogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBoaWRlSWNvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhdXRvZm9jdXMgPSBmYWxzZTtcblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCA9IChfOiBzdHJpbmcpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSB2YWx1ZSA9IHNpZ25hbDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBhZnRlck5leHRSZW5kZXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYXV0b2ZvY3VzKSB7XG4gICAgICAgIHRoaXMuaW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUuc2V0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52YWx1ZS5zZXQodmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cbn1cbiIsIkBpZiAoIWhpZGVJY29uKSB7XG48ZG9jcy1pY29uIGNsYXNzPVwiZG9jcy1pY29uX2hpZ2gtY29udHJhc3RcIj5zZWFyY2g8L2RvY3MtaWNvbj5cbn1cbjxpbnB1dFxuICAjaW5wdXRSZWZcbiAgdHlwZT1cInRleHRcIlxuICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gIFtuZ01vZGVsXT1cInZhbHVlKClcIlxuICAobmdNb2RlbENoYW5nZSk9XCJzZXRWYWx1ZSgkZXZlbnQpXCJcbiAgY2xhc3M9XCJhZGV2LXRleHQtZmllbGRcIlxuLz5cbiJdfQ==