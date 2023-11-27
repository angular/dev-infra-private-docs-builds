import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class SlideToggle implements ControlValueAccessor {
    buttonId: string;
    label: string;
    disabled: boolean;
    private onChange;
    private onTouched;
    protected readonly checked: import("@angular/core").WritableSignal<boolean>;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SlideToggle, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SlideToggle, "docs-slide-toggle", never, { "buttonId": { "alias": "buttonId"; "required": true; }; "label": { "alias": "label"; "required": true; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
