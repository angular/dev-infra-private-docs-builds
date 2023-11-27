import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ClickOutside {
    ignoredElementsIds: string[];
    clickOutside: EventEmitter<void>;
    private readonly document;
    private readonly elementRef;
    onClick($event: PointerEvent): void;
    private wasClickedOnIgnoredElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickOutside, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickOutside, "[docsClickOutside]", never, { "ignoredElementsIds": { "alias": "docsClickOutsideIgnore"; "required": false; }; }, { "clickOutside": "docsClickOutside"; }, never, never, true, never>;
}
