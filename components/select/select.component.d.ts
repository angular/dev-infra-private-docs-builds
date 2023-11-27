/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
type SelectOptionValue = string | number | boolean;
export interface SelectOption {
    label: string;
    value: SelectOptionValue;
}
export declare class Select implements ControlValueAccessor {
    id: string;
    name: string;
    options: SelectOption[];
    disabled: boolean;
    private onChange;
    private onTouched;
    protected readonly selectedOption: import("@angular/core").WritableSignal<SelectOptionValue | null>;
    writeValue(value: SelectOptionValue): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    setOption($event: SelectOptionValue): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Select, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Select, "docs-select", never, { "id": { "alias": "selectId"; "required": true; }; "name": { "alias": "name"; "required": true; }; "options": { "alias": "options"; "required": true; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
export {};
