/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input, forwardRef, signal } from '@angular/core';
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
Select.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0-next.2", ngImport: i0, type: Select, deps: [], target: i0.ɵɵFactoryTarget.Component });
Select.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.0-next.2", type: Select, isStandalone: true, selector: "docs-select", inputs: { id: ["selectId", "id"], name: "name", options: "options", disabled: "disabled" }, host: { classAttribute: "docs-form-element" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Select),
            multi: true,
        },
    ], ngImport: i0, template: "<select [attr.id]=\"id\" [attr.name]=\"name\" [ngModel]=\"selectedOption()\" (ngModelChange)=\"setOption($event)\">\n  @for (item of options; track item) {\n    <option [value]=\"item.value\">{{ item.label }}</option>\n  }\n</select>\n", styles: ["/*# sourceMappingURL=select.component.css.map */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0-next.2", ngImport: i0, type: Select, decorators: [{
            type: Component,
            args: [{ selector: 'docs-select', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [CommonModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => Select),
                            multi: true,
                        },
                    ], host: {
                        class: 'docs-form-element',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBdUIsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1RixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7OztBQTJCN0MsTUFBTSxPQUFPLE1BQU07SUFsQm5CO1FBc0JXLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsK0NBQStDO1FBQ3ZDLGFBQVEsR0FBdUMsQ0FBQyxDQUFvQixFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDNUUsY0FBUyxHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUV0QixtQkFBYyxHQUFHLE1BQU0sQ0FBMkIsSUFBSSxDQUFDLENBQUM7S0ErQjVFO0lBN0JDLCtDQUErQztJQUMvQyxVQUFVLENBQUMsS0FBd0I7UUFDakMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELCtDQUErQztJQUMvQyxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsaUJBQWlCLENBQUMsRUFBTztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFFLFVBQW1CO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBeUI7UUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzswR0F4Q1UsTUFBTTs4RkFBTixNQUFNLHFNQVhOO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3JDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRiwwQkNoQ0gsNk9BS0EsMkdEa0JZLFlBQVksOEJBQUUsV0FBVztrR0FjeEIsTUFBTTtrQkFsQmxCLFNBQVM7K0JBQ0UsYUFBYSxjQUNYLElBQUksbUJBQ0MsdUJBQXVCLENBQUMsTUFBTSxXQUN0QyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsYUFHekI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDOzRCQUNyQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRixRQUNLO3dCQUNKLEtBQUssRUFBRSxtQkFBbUI7cUJBQzNCOzhCQUcyQyxFQUFFO3NCQUE3QyxLQUFLO3VCQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFDO2dCQUNqQixJQUFJO3NCQUE1QixLQUFLO3VCQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztnQkFDRSxPQUFPO3NCQUEvQixLQUFLO3VCQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztnQkFDZCxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiwgRm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQsIGZvcndhcmRSZWYsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxudHlwZSBTZWxlY3RPcHRpb25WYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0T3B0aW9uIHtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IFNlbGVjdE9wdGlvblZhbHVlO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLXNlbGVjdCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3QpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnZG9jcy1mb3JtLWVsZW1lbnQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3QgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWUsIGFsaWFzOiAnc2VsZWN0SWQnfSkgaWQhOiBzdHJpbmc7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBuYW1lITogc3RyaW5nO1xuICBASW5wdXQoe3JlcXVpcmVkOiB0cnVlfSkgb3B0aW9ucyE6IFNlbGVjdE9wdGlvbltdO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogU2VsZWN0T3B0aW9uVmFsdWUpID0+IHZvaWQgPSAoXzogU2VsZWN0T3B0aW9uVmFsdWUpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzZWxlY3RlZE9wdGlvbiA9IHNpZ25hbDxTZWxlY3RPcHRpb25WYWx1ZSB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHdyaXRlVmFsdWUodmFsdWU6IFNlbGVjdE9wdGlvblZhbHVlKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbi5zZXQodmFsdWUpO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBzZXRPcHRpb24oJGV2ZW50OiBTZWxlY3RPcHRpb25WYWx1ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbi5zZXQoJGV2ZW50KTtcbiAgICB0aGlzLm9uQ2hhbmdlKCRldmVudCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxufVxuIiwiPHNlbGVjdCBbYXR0ci5pZF09XCJpZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtuZ01vZGVsXT1cInNlbGVjdGVkT3B0aW9uKClcIiAobmdNb2RlbENoYW5nZSk9XCJzZXRPcHRpb24oJGV2ZW50KVwiPlxuICBAZm9yIChpdGVtIG9mIG9wdGlvbnM7IHRyYWNrIGl0ZW0pIHtcbiAgICA8b3B0aW9uIFt2YWx1ZV09XCJpdGVtLnZhbHVlXCI+e3sgaXRlbS5sYWJlbCB9fTwvb3B0aW9uPlxuICB9XG48L3NlbGVjdD5cbiJdfQ==