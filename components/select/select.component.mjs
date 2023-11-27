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
function Select_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 1);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", item_r1.value);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r1.label);
} }
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
Select.ɵfac = function Select_Factory(t) { return new (t || Select)(); };
Select.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Select, selectors: [["docs-select"]], hostAttrs: [1, "adev-form-element"], inputs: { id: ["selectId", "id"], name: "name", options: "options", disabled: "disabled" }, standalone: true, features: [i0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => Select),
                multi: true,
            },
        ]), i0.ɵɵStandaloneFeature], decls: 3, vars: 3, consts: [[3, "ngModel", "ngModelChange"], [3, "value"]], template: function Select_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "select", 0);
        i0.ɵɵlistener("ngModelChange", function Select_Template_select_ngModelChange_0_listener($event) { return ctx.setOption($event); });
        i0.ɵɵrepeaterCreate(1, Select_For_2_Template, 2, 2, "option", 1, i0.ɵɵrepeaterTrackByIdentity);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngModel", ctx.selectedOption());
        i0.ɵɵattribute("id", ctx.id)("name", ctx.name);
        i0.ɵɵadvance(1);
        i0.ɵɵrepeater(ctx.options);
    } }, dependencies: [CommonModule, FormsModule, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgModel], styles: ["/*# sourceMappingURL=select.component.css.map */"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Select, [{
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
    }], null, { id: [{
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
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Select, { className: "Select", filePath: "docs/components/select/select.component.ts", lineNumber: 37 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBdUIsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7SUNSekMsaUNBQTZCO0lBQUEsWUFBZ0I7SUFBQSxpQkFBUzs7O0lBQTlDLHFDQUFvQjtJQUFDLGVBQWdCO0lBQWhCLG1DQUFnQjs7QURrQ2pELE1BQU0sT0FBTyxNQUFNO0lBakJuQjtRQXFCVyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCLCtDQUErQztRQUN2QyxhQUFRLEdBQXVDLENBQUMsQ0FBb0IsRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzVFLGNBQVMsR0FBZSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFdEIsbUJBQWMsR0FBRyxNQUFNLENBQTJCLElBQUksQ0FBQyxDQUFDO0tBK0I1RTtJQTdCQywrQ0FBK0M7SUFDL0MsVUFBVSxDQUFDLEtBQXdCO1FBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELCtDQUErQztJQUMvQyxnQkFBZ0IsQ0FBRSxVQUFtQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUM3QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQXlCO1FBQ2pDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7NERBeENVLE1BQU07eURBQU4sTUFBTSxvTkFYTjtZQUNUO2dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUNyQyxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0Y7UUMvQkgsaUNBQTJHO1FBQXBDLHlHQUFpQixxQkFBaUIsSUFBQztRQUN4Ryw4RkFFQztRQUNILGlCQUFTOztRQUppQyw4Q0FBNEI7UUFBOUQsNEJBQWMsa0JBQUE7UUFDcEIsZUFFQztRQUZELDBCQUVDO3dCRG1CUyxZQUFZLEVBQUUsV0FBVztpRkFjeEIsTUFBTTtjQWpCbEIsU0FBUzsyQkFDRSxhQUFhLGNBQ1gsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxhQUd6QjtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUM7d0JBQ3JDLEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGLFFBQ0s7b0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtpQkFDM0I7Z0JBRzJDLEVBQUU7a0JBQTdDLEtBQUs7bUJBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUM7WUFDakIsSUFBSTtrQkFBNUIsS0FBSzttQkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7WUFDRSxPQUFPO2tCQUEvQixLQUFLO21CQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztZQUNkLFFBQVE7a0JBQWhCLEtBQUs7O2tGQUpLLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBzaWduYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbnR5cGUgU2VsZWN0T3B0aW9uVmFsdWUgPSBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdE9wdGlvbiB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBTZWxlY3RPcHRpb25WYWx1ZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jcy1zZWxlY3QnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWxlY3QpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAnYWRldi1mb3JtLWVsZW1lbnQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3QgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWUsIGFsaWFzOiAnc2VsZWN0SWQnfSkgaWQhOiBzdHJpbmc7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBuYW1lITogc3RyaW5nO1xuICBASW5wdXQoe3JlcXVpcmVkOiB0cnVlfSkgb3B0aW9ucyE6IFNlbGVjdE9wdGlvbltdO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogU2VsZWN0T3B0aW9uVmFsdWUpID0+IHZvaWQgPSAoXzogU2VsZWN0T3B0aW9uVmFsdWUpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzZWxlY3RlZE9wdGlvbiA9IHNpZ25hbDxTZWxlY3RPcHRpb25WYWx1ZSB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHdyaXRlVmFsdWUodmFsdWU6IFNlbGVjdE9wdGlvblZhbHVlKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbi5zZXQodmFsdWUpO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBzZXRPcHRpb24oJGV2ZW50OiBTZWxlY3RPcHRpb25WYWx1ZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbi5zZXQoJGV2ZW50KTtcbiAgICB0aGlzLm9uQ2hhbmdlKCRldmVudCk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxufVxuIiwiPHNlbGVjdCBbYXR0ci5pZF09XCJpZFwiIFthdHRyLm5hbWVdPVwibmFtZVwiIFtuZ01vZGVsXT1cInNlbGVjdGVkT3B0aW9uKClcIiAobmdNb2RlbENoYW5nZSk9XCJzZXRPcHRpb24oJGV2ZW50KVwiPlxuICBAZm9yIChpdGVtIG9mIG9wdGlvbnM7IHRyYWNrIGl0ZW0pIHtcbiAgICA8b3B0aW9uIFt2YWx1ZV09XCJpdGVtLnZhbHVlXCI+e3sgaXRlbS5sYWJlbCB9fTwvb3B0aW9uPlxuICB9XG48L3NlbGVjdD5cbiJdfQ==