/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class Select {
    constructor() {
        this.disabled = false;
        // Implemented as part of ControlValueAccessor.
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.selectedOption = signal(null);
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.selectedOption.set(value);
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
    setOption($event) {
        if (this.disabled) {
            return;
        }
        this.selectedOption.set($event);
        this.onChange($event);
        this.onTouched();
    }
}
Select.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: Select, deps: [], target: i0.ɵɵFactoryTarget.Component });
Select.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.1.0-next.1", type: Select, isStandalone: true, selector: "docs-select", inputs: { id: ["selectId", "id"], name: "name", options: "options", disabled: "disabled" }, host: { classAttribute: "adev-form-element" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Select),
            multi: true,
        },
    ], ngImport: i0, template: "<select [attr.id]=\"id\" [attr.name]=\"name\" [ngModel]=\"selectedOption()\" (ngModelChange)=\"setOption($event)\">\n  @for (item of options; track item) {\n    <option [value]=\"item.value\">{{ item.label }}</option>\n  }\n</select>\n", styles: ["/*# sourceMappingURL=select.component.css.map */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: Select, decorators: [{
            type: Component,
            args: [{ selector: 'docs-select', standalone: true, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => Select),
                            multi: true,
                        },
                    ], host: {
                        class: 'adev-form-element',
                    }, template: "<select [attr.id]=\"id\" [attr.name]=\"name\" [ngModel]=\"selectedOption()\" (ngModelChange)=\"setOption($event)\">\n  @for (item of options; track item) {\n    <option [value]=\"item.value\">{{ item.label }}</option>\n  }\n</select>\n", styles: ["/*# sourceMappingURL=select.component.css.map */\n"] }]
        }], propDecorators: { id: [{
                type: Input,
                args: [{ required: true, alias: 'selectId' }]
            }], name: [{
                type: Input,
                args: [{ required: true }]
            }], options: [{
                type: Input,
                args: [{ required: true }]
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBdUIsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7OztBQTBCN0MsTUFBTSxPQUFPLE1BQU07SUFqQm5CO1FBcUJXLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsK0NBQStDO1FBQ3ZDLGFBQVEsR0FBdUMsQ0FBQyxDQUFvQixFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDNUUsY0FBUyxHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUV0QixtQkFBYyxHQUFHLE1BQU0sQ0FBMkIsSUFBSSxDQUFDLENBQUM7S0ErQjVFO0lBN0JDLCtDQUErQztJQUMvQyxVQUFVLENBQUMsS0FBd0I7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELCtDQUErQztJQUMvQyxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFFLFVBQW1CO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBeUI7UUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzswR0F4Q1UsTUFBTTs4RkFBTixNQUFNLHFNQVhOO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3JDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRiwwQkMvQkgsNk9BS0EsMkdEaUJZLFlBQVksOEJBQUUsV0FBVztrR0FjeEIsTUFBTTtrQkFqQmxCLFNBQVM7K0JBQ0UsYUFBYSxjQUNYLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsYUFHekI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDOzRCQUNyQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRixRQUNLO3dCQUNKLEtBQUssRUFBRSxtQkFBbUI7cUJBQzNCOzhCQUcyQyxFQUFFO3NCQUE3QyxLQUFLO3VCQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFDO2dCQUNqQixJQUFJO3NCQUE1QixLQUFLO3VCQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztnQkFDRSxPQUFPO3NCQUEvQixLQUFLO3VCQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztnQkFDZCxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgc2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG50eXBlIFNlbGVjdE9wdGlvblZhbHVlID0gc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RPcHRpb24ge1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZTogU2VsZWN0T3B0aW9uVmFsdWU7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3Mtc2VsZWN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VsZWN0LmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ2FkZXYtZm9ybS1lbGVtZW50JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBASW5wdXQoe3JlcXVpcmVkOiB0cnVlLCBhbGlhczogJ3NlbGVjdElkJ30pIGlkITogc3RyaW5nO1xuICBASW5wdXQoe3JlcXVpcmVkOiB0cnVlfSkgbmFtZSE6IHN0cmluZztcbiAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIG9wdGlvbnMhOiBTZWxlY3RPcHRpb25bXTtcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IFNlbGVjdE9wdGlvblZhbHVlKSA9PiB2b2lkID0gKF86IFNlbGVjdE9wdGlvblZhbHVlKSA9PiB7fTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2VsZWN0ZWRPcHRpb24gPSBzaWduYWw8U2VsZWN0T3B0aW9uVmFsdWUgfCBudWxsPihudWxsKTtcblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICB3cml0ZVZhbHVlKHZhbHVlOiBTZWxlY3RPcHRpb25WYWx1ZSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24uc2V0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgc2V0T3B0aW9uKCRldmVudDogU2VsZWN0T3B0aW9uVmFsdWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb24uc2V0KCRldmVudCk7XG4gICAgdGhpcy5vbkNoYW5nZSgkZXZlbnQpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cbn1cbiIsIjxzZWxlY3QgW2F0dHIuaWRdPVwiaWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbbmdNb2RlbF09XCJzZWxlY3RlZE9wdGlvbigpXCIgKG5nTW9kZWxDaGFuZ2UpPVwic2V0T3B0aW9uKCRldmVudClcIj5cbiAgQGZvciAoaXRlbSBvZiBvcHRpb25zOyB0cmFjayBpdGVtKSB7XG4gICAgPG9wdGlvbiBbdmFsdWVdPVwiaXRlbS52YWx1ZVwiPnt7IGl0ZW0ubGFiZWwgfX08L29wdGlvbj5cbiAgfVxuPC9zZWxlY3Q+XG4iXX0=