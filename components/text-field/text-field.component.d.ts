import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare class TextField implements ControlValueAccessor {
    private input?;
    name: string | null;
    placeholder: string | null;
    disabled: boolean;
    hideIcon: boolean;
    autofocus: boolean;
    private onChange;
    private onTouched;
    protected readonly value: import("@angular/core").WritableSignal<string | null>;
    constructor();
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    setValue(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextField, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextField, "docs-text-field", never, { "name": { "alias": "name"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "hideIcon": { "alias": "hideIcon"; "required": false; }; "autofocus": { "alias": "autofocus"; "required": false; }; }, {}, never, never, true, never>;
}
