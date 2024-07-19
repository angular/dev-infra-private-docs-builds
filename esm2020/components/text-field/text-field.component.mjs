/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, afterNextRender, forwardRef, signal, } from '@angular/core';
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
TextField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: TextField, deps: [], target: i0.ɵɵFactoryTarget.Component });
TextField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0-next.1", type: TextField, isStandalone: true, selector: "docs-text-field", inputs: { name: "name", placeholder: "placeholder", disabled: "disabled", hideIcon: "hideIcon", autofocus: "autofocus" }, host: { classAttribute: "docs-form-element" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextField),
            multi: true,
        },
    ], viewQueries: [{ propertyName: "input", first: true, predicate: ["inputRef"], descendants: true }], ngImport: i0, template: "@if (!hideIcon) {\n<docs-icon class=\"docs-icon_high-contrast\">search</docs-icon>\n}\n<input\n  #inputRef\n  type=\"text\"\n  [attr.placeholder]=\"placeholder\"\n  [attr.name]=\"name\"\n  [ngModel]=\"value()\"\n  (ngModelChange)=\"setValue($event)\"\n  class=\"docs-text-field\"\n/>\n", styles: [".docs-text-field{font-size:1.125rem}docs-icon+.docs-text-field{font-size:1rem}/*# sourceMappingURL=text-field.component.css.map */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: IconComponent, selector: "docs-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: TextField, decorators: [{
            type: Component,
            args: [{ selector: 'docs-text-field', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [CommonModule, FormsModule, IconComponent], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => TextField),
                            multi: true,
                        },
                    ], host: {
                        class: 'docs-form-element',
                    }, template: "@if (!hideIcon) {\n<docs-icon class=\"docs-icon_high-contrast\">search</docs-icon>\n}\n<input\n  #inputRef\n  type=\"text\"\n  [attr.placeholder]=\"placeholder\"\n  [attr.name]=\"name\"\n  [ngModel]=\"value()\"\n  (ngModelChange)=\"setValue($event)\"\n  class=\"docs-text-field\"\n/>\n", styles: [".docs-text-field{font-size:1.125rem}docs-icon+.docs-text-field{font-size:1rem}/*# sourceMappingURL=text-field.component.css.map */\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvdGV4dC1maWVsZC90ZXh0LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy90ZXh0LWZpZWxkL3RleHQtZmllbGQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBdUIsV0FBVyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDOzs7QUFvQnJELE1BQU0sT0FBTyxTQUFTO0lBZXBCO1FBWlMsU0FBSSxHQUFrQixJQUFJLENBQUM7UUFDM0IsZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRTNCLCtDQUErQztRQUN2QyxhQUFRLEdBQTRCLENBQUMsQ0FBUyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDdEQsY0FBUyxHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUV0QixVQUFLLEdBQUcsTUFBTSxDQUFnQixJQUFJLENBQUMsQ0FBQztRQUdyRCxlQUFlLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0NBQStDO0lBQy9DLFVBQVUsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsZ0JBQWdCLENBQUMsRUFBTztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0NBQStDO0lBQy9DLGlCQUFpQixDQUFDLEVBQU87UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELCtDQUErQztJQUMvQyxnQkFBZ0IsQ0FBRSxVQUFtQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUM3QixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs2R0FuRFUsU0FBUztpR0FBVCxTQUFTLHVPQVhUO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQ3hDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRiw2SENuQ0gsK1JBWUEsNkxEY1ksWUFBWSw4QkFBRSxXQUFXLCttQkFBRSxhQUFhO2tHQWN2QyxTQUFTO2tCQWxCckIsU0FBUzsrQkFDRSxpQkFBaUIsY0FDZixJQUFJLG1CQUNDLHVCQUF1QixDQUFDLE1BQU0sV0FDdEMsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxhQUd4Qzt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUM7NEJBQ3hDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGLFFBQ0s7d0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtxQkFDM0I7d0RBRzhCLEtBQUs7c0JBQW5DLFNBQVM7dUJBQUMsVUFBVTtnQkFFWixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgYWZ0ZXJOZXh0UmVuZGVyLFxuICBmb3J3YXJkUmVmLFxuICBzaWduYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3Jtc01vZHVsZSwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7SWNvbkNvbXBvbmVudH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3MtdGV4dC1maWVsZCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgSWNvbkNvbXBvbmVudF0sXG4gIHRlbXBsYXRlVXJsOiAnLi90ZXh0LWZpZWxkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGV4dC1maWVsZC5jb21wb25lbnQuc2NzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRleHRGaWVsZCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdkb2NzLWZvcm0tZWxlbWVudCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFRleHRGaWVsZCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnaW5wdXRSZWYnKSBwcml2YXRlIGlucHV0PzogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBoaWRlSWNvbiA9IGZhbHNlO1xuICBASW5wdXQoKSBhdXRvZm9jdXMgPSBmYWxzZTtcblxuICAvLyBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIENvbnRyb2xWYWx1ZUFjY2Vzc29yLlxuICBwcml2YXRlIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZCA9IChfOiBzdHJpbmcpID0+IHt9O1xuICBwcml2YXRlIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSB2YWx1ZSA9IHNpZ25hbDxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBhZnRlck5leHRSZW5kZXIoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYXV0b2ZvY3VzKSB7XG4gICAgICAgIHRoaXMuaW5wdXQ/Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUuc2V0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3IuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3Nvci5cbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52YWx1ZS5zZXQodmFsdWUpO1xuICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gIH1cbn1cbiIsIkBpZiAoIWhpZGVJY29uKSB7XG48ZG9jcy1pY29uIGNsYXNzPVwiZG9jcy1pY29uX2hpZ2gtY29udHJhc3RcIj5zZWFyY2g8L2RvY3MtaWNvbj5cbn1cbjxpbnB1dFxuICAjaW5wdXRSZWZcbiAgdHlwZT1cInRleHRcIlxuICBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiXG4gIFthdHRyLm5hbWVdPVwibmFtZVwiXG4gIFtuZ01vZGVsXT1cInZhbHVlKClcIlxuICAobmdNb2RlbENoYW5nZSk9XCJzZXRWYWx1ZSgkZXZlbnQpXCJcbiAgY2xhc3M9XCJkb2NzLXRleHQtZmllbGRcIlxuLz5cbiJdfQ==