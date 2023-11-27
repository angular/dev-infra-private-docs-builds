import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The directive will set target of anchor elements to '_blank' for the external links.
 * We can opt-out this behavior by adding `noBlankForExternalLink` attribute to anchor element.
 */
export declare class ExternalLink implements OnInit {
    private readonly anchor;
    private readonly platformId;
    private readonly window;
    target?: '_blank' | '_self' | '_parent' | '_top' | '';
    ngOnInit(): void;
    private setAnchorTarget;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExternalLink, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ExternalLink, "a[href]:not([noBlankForExternalLink])", never, {}, {}, never, never, true, never>;
}
