/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
export class SlideToggle {
    constructor() {
        this.disabled = false;
        // Implemented as part of ControlValueAccessor.
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.checked = signal(false);
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.checked.set(value);
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
    // Toggles the checked state of the slide-toggle.
    toggle() {
        if (this.disabled) {
            return;
        }
        this.checked.update((checked) => !checked);
        this.onChange(this.checked());
        this.onTouched();
    }
}
SlideToggle.ɵfac = function SlideToggle_Factory(t) { return new (t || SlideToggle)(); };
SlideToggle.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SlideToggle, selectors: [["docs-slide-toggle"]], inputs: { buttonId: "buttonId", label: "label", disabled: "disabled" }, standalone: true, features: [i0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => SlideToggle),
                multi: true,
            },
        ]), i0.ɵɵStandaloneFeature], decls: 6, vars: 6, consts: [[1, "adev-label"], [1, "adev-toggle"], ["type", "checkbox", "role", "switch", 3, "id", "checked", "click"], [1, "adev-slider"]], template: function SlideToggle_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "label")(1, "span", 0);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 1)(4, "input", 2);
        i0.ɵɵlistener("click", function SlideToggle_Template_input_click_4_listener() { return ctx.toggle(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelement(5, "span", 3);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵattribute("for", ctx.buttonId);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(ctx.label);
        i0.ɵɵadvance(2);
        i0.ɵɵclassProp("adev-toggle-active", ctx.checked());
        i0.ɵɵproperty("id", ctx.buttonId)("checked", ctx.checked());
    } }, dependencies: [CommonModule], styles: ["[_nghost-%COMP%], label[_ngcontent-%COMP%]{display:inline-flex;gap:.5em;align-items:center}.adev-label[_ngcontent-%COMP%]{font-size:.875rem;font-style:normal;font-weight:500;line-height:160%;letter-spacing:-0.00875rem;color:var(--quaternary-contrast)}.adev-toggle[_ngcontent-%COMP%]{position:relative;display:inline-block;width:3rem;height:1.5rem;border:1px solid var(--senary-contrast);border-radius:34px}.adev-toggle[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{opacity:0;width:0;height:0}.adev-slider[_ngcontent-%COMP%]{position:absolute;cursor:pointer;border-radius:34px;inset:0;background-color:var(--septenary-contrast);transition:background-color .3s ease,border-color .3s ease}.adev-slider[_ngcontent-%COMP%]::before{content:\"\";position:absolute;inset:0;border-radius:34px;background:var(--pink-to-purple-horizontal-gradient);opacity:0;transition:opacity .3s ease}.adev-slider[_ngcontent-%COMP%]::after{position:absolute;content:\"\";height:1.25rem;width:1.25rem;left:.125rem;bottom:.125rem;background-color:var(--page-background);transition:transform .3s ease,background-color .3s ease;border-radius:50%}input[_ngcontent-%COMP%]:checked + .adev-slider[_ngcontent-%COMP%]::before{opacity:1}input[_ngcontent-%COMP%]:checked + .adev-slider[_ngcontent-%COMP%]::after{transform:translateX(1.5rem)}/*# sourceMappingURL=slide-toggle.component.css.map */"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SlideToggle, [{
        type: Component,
        args: [{ selector: 'docs-slide-toggle', standalone: true, imports: [CommonModule], providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => SlideToggle),
                        multi: true,
                    },
                ], template: "<label [attr.for]=\"buttonId\">\n  <span class=\"adev-label\">{{ label }}</span>\n  <div class=\"adev-toggle\">\n    <input\n      type=\"checkbox\"\n      [id]=\"buttonId\"\n      role=\"switch\"\n      (click)=\"toggle()\"\n      [class.adev-toggle-active]=\"checked()\"\n      [checked]=\"checked()\"\n    />\n    <span class=\"adev-slider\"></span>\n  </div>\n</label>\n", styles: [":host,label{display:inline-flex;gap:.5em;align-items:center}.adev-label{font-size:.875rem;font-style:normal;font-weight:500;line-height:160%;letter-spacing:-0.00875rem;color:var(--quaternary-contrast)}.adev-toggle{position:relative;display:inline-block;width:3rem;height:1.5rem;border:1px solid var(--senary-contrast);border-radius:34px}.adev-toggle input{opacity:0;width:0;height:0}.adev-slider{position:absolute;cursor:pointer;border-radius:34px;inset:0;background-color:var(--septenary-contrast);transition:background-color .3s ease,border-color .3s ease}.adev-slider::before{content:\"\";position:absolute;inset:0;border-radius:34px;background:var(--pink-to-purple-horizontal-gradient);opacity:0;transition:opacity .3s ease}.adev-slider::after{position:absolute;content:\"\";height:1.25rem;width:1.25rem;left:.125rem;bottom:.125rem;background-color:var(--page-background);transition:transform .3s ease,background-color .3s ease;border-radius:50%}input:checked+.adev-slider::before{opacity:1}input:checked+.adev-slider::after{transform:translateX(1.5rem)}/*# sourceMappingURL=slide-toggle.component.css.map */\n"] }]
    }], null, { buttonId: [{
            type: Input,
            args: [{ required: true }]
        }], label: [{
            type: Input,
            args: [{ required: true }]
        }], disabled: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SlideToggle, { className: "SlideToggle", filePath: "docs/components/slide-toggle/slide-toggle.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zbGlkZS10b2dnbGUvc2xpZGUtdG9nZ2xlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zbGlkZS10b2dnbGUvc2xpZGUtdG9nZ2xlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFnQnZFLE1BQU0sT0FBTyxXQUFXO0lBZHhCO1FBaUJXLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsK0NBQStDO1FBQ3ZDLGFBQVEsR0FBNkIsQ0FBQyxDQUFVLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN4RCxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXRCLFlBQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FnQzVDO0lBOUJDLCtDQUErQztJQUMvQyxVQUFVLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtDQUErQztJQUMvQyxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDN0IsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOztzRUF4Q1UsV0FBVzs4REFBWCxXQUFXLGlLQVJYO1lBQ1Q7Z0JBQ0UsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQzFDLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjtRQ3hCSCw2QkFBNkIsY0FBQTtRQUNGLFlBQVc7UUFBQSxpQkFBTztRQUMzQyw4QkFBeUIsZUFBQTtRQUtyQix1RkFBUyxZQUFRLElBQUM7UUFKcEIsaUJBT0U7UUFDRiwwQkFBaUM7UUFDbkMsaUJBQU0sRUFBQTs7UUFaRCxtQ0FBcUI7UUFDRCxlQUFXO1FBQVgsK0JBQVc7UUFPaEMsZUFBc0M7UUFBdEMsbURBQXNDO1FBSHRDLGlDQUFlLDBCQUFBO3dCRFVULFlBQVk7aUZBV1gsV0FBVztjQWR2QixTQUFTOzJCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsYUFHWjtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUM7d0JBQzFDLEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGO2dCQUd3QixRQUFRO2tCQUFoQyxLQUFLO21CQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztZQUNFLEtBQUs7a0JBQTdCLEtBQUs7bUJBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ2QsUUFBUTtrQkFBaEIsS0FBSzs7a0ZBSEssV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBzaWduYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLXNsaWRlLXRvZ2dsZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZVVybDogJy4vc2xpZGUtdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2xpZGUtdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2xpZGVUb2dnbGUpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2xpZGVUb2dnbGUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBidXR0b25JZCE6IHN0cmluZztcbiAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIGxhYmVsITogc3RyaW5nO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZCA9IChfOiBib29sZWFuKSA9PiB7fTtcbiAgcHJpdmF0ZSBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgY2hlY2tlZCA9IHNpZ25hbChmYWxzZSk7XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tlZC5zZXQodmFsdWUpO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIC8vIFRvZ2dsZXMgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIHNsaWRlLXRvZ2dsZS5cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jaGVja2VkLnVwZGF0ZSgoY2hlY2tlZCkgPT4gIWNoZWNrZWQpO1xuICAgIHRoaXMub25DaGFuZ2UodGhpcy5jaGVja2VkKCkpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cbn1cbiIsIjxsYWJlbCBbYXR0ci5mb3JdPVwiYnV0dG9uSWRcIj5cbiAgPHNwYW4gY2xhc3M9XCJhZGV2LWxhYmVsXCI+e3sgbGFiZWwgfX08L3NwYW4+XG4gIDxkaXYgY2xhc3M9XCJhZGV2LXRvZ2dsZVwiPlxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgIFtpZF09XCJidXR0b25JZFwiXG4gICAgICByb2xlPVwic3dpdGNoXCJcbiAgICAgIChjbGljayk9XCJ0b2dnbGUoKVwiXG4gICAgICBbY2xhc3MuYWRldi10b2dnbGUtYWN0aXZlXT1cImNoZWNrZWQoKVwiXG4gICAgICBbY2hlY2tlZF09XCJjaGVja2VkKClcIlxuICAgIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJhZGV2LXNsaWRlclwiPjwvc3Bhbj5cbiAgPC9kaXY+XG48L2xhYmVsPlxuIl19