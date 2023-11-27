import * as i0 from "@angular/core";
export declare const STORAGE_KEY = "docs-accepts-cookies";
export declare class CookiePopup {
    private readonly localStorage;
    /** Whether the user has accepted the cookie disclaimer. */
    hasAccepted: import("@angular/core").WritableSignal<boolean>;
    constructor();
    /** Accepts the cookie disclaimer. */
    protected accept(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CookiePopup, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CookiePopup, "docs-cookie-popup", never, {}, {}, never, never, true, never>;
}
