/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, Input, forwardRef, signal } from '@angular/core';
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
SlideToggle.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.0", ngImport: i0, type: SlideToggle, deps: [], target: i0.ɵɵFactoryTarget.Component });
SlideToggle.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.0-next.0", type: SlideToggle, isStandalone: true, selector: "docs-slide-toggle", inputs: { buttonId: "buttonId", label: "label", disabled: "disabled" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SlideToggle),
            multi: true,
        },
    ], ngImport: i0, template: "<label [attr.for]=\"buttonId\">\n  <span class=\"docs-label\">{{ label }}</span>\n  <div class=\"docs-toggle\">\n    <input\n      type=\"checkbox\"\n      [id]=\"buttonId\"\n      role=\"switch\"\n      (click)=\"toggle()\"\n      [class.docs-toggle-active]=\"checked()\"\n      [checked]=\"checked()\"\n    />\n    <span class=\"docs-slider\"></span>\n  </div>\n</label>\n", styles: [":host,label{display:inline-flex;gap:.5em;align-items:center}.docs-label{font-size:.875rem;font-style:normal;font-weight:500;line-height:160%;letter-spacing:-0.00875rem;color:var(--quaternary-contrast)}.docs-toggle{position:relative;display:inline-block;width:3rem;height:1.5rem;border:1px solid var(--senary-contrast);border-radius:34px}.docs-toggle input{opacity:0;width:0;height:0}.docs-slider{position:absolute;cursor:pointer;border-radius:34px;inset:0;background-color:var(--septenary-contrast);transition:background-color .3s ease,border-color .3s ease}.docs-slider::before{content:\"\";position:absolute;inset:0;border-radius:34px;background:var(--pink-to-purple-horizontal-gradient);opacity:0;transition:opacity .3s ease}.docs-slider::after{position:absolute;content:\"\";height:1.25rem;width:1.25rem;left:.125rem;bottom:.125rem;background-color:var(--page-background);transition:transform .3s ease,background-color .3s ease;border-radius:50%}input:checked+.docs-slider::before{opacity:1}input:checked+.docs-slider::after{transform:translateX(1.5rem)}/*# sourceMappingURL=slide-toggle.component.css.map */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.0", ngImport: i0, type: SlideToggle, decorators: [{
            type: Component,
            args: [{ selector: 'docs-slide-toggle', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => SlideToggle),
                            multi: true,
                        },
                    ], template: "<label [attr.for]=\"buttonId\">\n  <span class=\"docs-label\">{{ label }}</span>\n  <div class=\"docs-toggle\">\n    <input\n      type=\"checkbox\"\n      [id]=\"buttonId\"\n      role=\"switch\"\n      (click)=\"toggle()\"\n      [class.docs-toggle-active]=\"checked()\"\n      [checked]=\"checked()\"\n    />\n    <span class=\"docs-slider\"></span>\n  </div>\n</label>\n", styles: [":host,label{display:inline-flex;gap:.5em;align-items:center}.docs-label{font-size:.875rem;font-style:normal;font-weight:500;line-height:160%;letter-spacing:-0.00875rem;color:var(--quaternary-contrast)}.docs-toggle{position:relative;display:inline-block;width:3rem;height:1.5rem;border:1px solid var(--senary-contrast);border-radius:34px}.docs-toggle input{opacity:0;width:0;height:0}.docs-slider{position:absolute;cursor:pointer;border-radius:34px;inset:0;background-color:var(--septenary-contrast);transition:background-color .3s ease,border-color .3s ease}.docs-slider::before{content:\"\";position:absolute;inset:0;border-radius:34px;background:var(--pink-to-purple-horizontal-gradient);opacity:0;transition:opacity .3s ease}.docs-slider::after{position:absolute;content:\"\";height:1.25rem;width:1.25rem;left:.125rem;bottom:.125rem;background-color:var(--page-background);transition:transform .3s ease,background-color .3s ease;border-radius:50%}input:checked+.docs-slider::before{opacity:1}input:checked+.docs-slider::after{transform:translateX(1.5rem)}/*# sourceMappingURL=slide-toggle.component.css.map */\n"] }]
        }], propDecorators: { buttonId: [{
                type: Input,
                args: [{ required: true }]
            }], label: [{
                type: Input,
                args: [{ required: true }]
            }], disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtdG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zbGlkZS10b2dnbGUvc2xpZGUtdG9nZ2xlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zbGlkZS10b2dnbGUvc2xpZGUtdG9nZ2xlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUYsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFpQnZFLE1BQU0sT0FBTyxXQUFXO0lBZnhCO1FBa0JXLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFMUIsK0NBQStDO1FBQ3ZDLGFBQVEsR0FBNkIsQ0FBQyxDQUFVLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUN4RCxjQUFTLEdBQWUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXRCLFlBQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FnQzVDO0lBOUJDLCtDQUErQztJQUMvQyxVQUFVLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGdCQUFnQixDQUFDLEVBQU87UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELCtDQUErQztJQUMvQyxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsZ0JBQWdCLENBQUMsVUFBbUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDN0IsQ0FBQztJQUVELGlEQUFpRDtJQUNqRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzsrR0F4Q1UsV0FBVzttR0FBWCxXQUFXLHdJQVJYO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQzFDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRiwwQkN6Qkgsd1hBY0EsbXBDRENZLFlBQVk7a0dBWVgsV0FBVztrQkFmdkIsU0FBUzsrQkFDRSxtQkFBbUIsY0FDakIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLG1CQUNOLHVCQUF1QixDQUFDLE1BQU0sYUFHcEM7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDOzRCQUMxQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjs4QkFHd0IsUUFBUTtzQkFBaEMsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ0UsS0FBSztzQkFBN0IsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ2QsUUFBUTtzQkFBaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgc2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jcy1zbGlkZS10b2dnbGUnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnLi9zbGlkZS10b2dnbGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zbGlkZS10b2dnbGUuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTbGlkZVRvZ2dsZSksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZVRvZ2dsZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIGJ1dHRvbklkITogc3RyaW5nO1xuICBASW5wdXQoe3JlcXVpcmVkOiB0cnVlfSkgbGFiZWwhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkID0gKF86IGJvb2xlYW4pID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBjaGVja2VkID0gc2lnbmFsKGZhbHNlKTtcblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICB3cml0ZVZhbHVlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2VkLnNldCh2YWx1ZSk7XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgLy8gVG9nZ2xlcyB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgc2xpZGUtdG9nZ2xlLlxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNoZWNrZWQudXBkYXRlKChjaGVja2VkKSA9PiAhY2hlY2tlZCk7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLmNoZWNrZWQoKSk7XG4gICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgfVxufVxuIiwiPGxhYmVsIFthdHRyLmZvcl09XCJidXR0b25JZFwiPlxuICA8c3BhbiBjbGFzcz1cImRvY3MtbGFiZWxcIj57eyBsYWJlbCB9fTwvc3Bhbj5cbiAgPGRpdiBjbGFzcz1cImRvY3MtdG9nZ2xlXCI+XG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgW2lkXT1cImJ1dHRvbklkXCJcbiAgICAgIHJvbGU9XCJzd2l0Y2hcIlxuICAgICAgKGNsaWNrKT1cInRvZ2dsZSgpXCJcbiAgICAgIFtjbGFzcy5kb2NzLXRvZ2dsZS1hY3RpdmVdPVwiY2hlY2tlZCgpXCJcbiAgICAgIFtjaGVja2VkXT1cImNoZWNrZWQoKVwiXG4gICAgLz5cbiAgICA8c3BhbiBjbGFzcz1cImRvY3Mtc2xpZGVyXCI+PC9zcGFuPlxuICA8L2Rpdj5cbjwvbGFiZWw+XG4iXX0=