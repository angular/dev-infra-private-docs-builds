import { Highlightable } from '@angular/cdk/a11y';
import { SearchResult } from '../../interfaces/search-results';
import * as i0 from "@angular/core";
export declare class SearchItem implements Highlightable {
    item?: SearchResult;
    disabled: boolean;
    private readonly elementRef;
    private _isActive;
    protected get isActive(): boolean;
    setActiveStyles(): void;
    setInactiveStyles(): void;
    getLabel(): string;
    scrollIntoView(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SearchItem, "[docsSearchItem]", never, { "item": { "alias": "item"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
