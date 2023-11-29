import { TableOfContentsLevel } from '../../interfaces/index.js';
import * as i0 from "@angular/core";
export declare class TableOfContents {
    contentSourceElement: HTMLElement;
    private readonly scrollSpy;
    private readonly tableOfContentsLoader;
    activeItemId: import("@angular/core").WritableSignal<string | null>;
    shouldDisplayScrollToTop: import("@angular/core").Signal<boolean>;
    TableOfContentsLevel: typeof TableOfContentsLevel;
    tableOfContentItems(): import("../../interfaces/table-of-contents-item.js").TableOfContentsItem[];
    ngAfterViewInit(): void;
    scrollToTop(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableOfContents, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableOfContents, "docs-table-of-contents", never, { "contentSourceElement": { "alias": "contentSourceElement"; "required": true; }; }, {}, never, never, true, never>;
}
