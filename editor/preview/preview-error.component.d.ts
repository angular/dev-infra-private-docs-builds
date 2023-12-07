import { ErrorType } from '../services/node-runtime-state.service.js';
import * as i0 from "@angular/core";
export declare class PreviewError {
    private readonly nodeRuntimeState;
    readonly isIos: boolean;
    readonly isFirefox: boolean;
    readonly error: import("@angular/core").Signal<import("../services/node-runtime-state.service.js").NodeRuntimeError | undefined>;
    readonly ErrorType: typeof ErrorType;
    static ɵfac: i0.ɵɵFactoryDeclaration<PreviewError, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PreviewError, "docs-tutorial-preview-error", never, {}, {}, never, never, true, never>;
}
