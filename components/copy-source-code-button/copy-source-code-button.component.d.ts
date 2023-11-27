/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { WritableSignal } from '@angular/core';
import * as i0 from "@angular/core";
export declare const REMOVED_LINE_CLASS_NAME = ".hljs-ln-line.remove";
export declare const CONFIRMATION_DISPLAY_TIME_MS = 2000;
export declare class CopySourceCodeButton {
    private readonly changeDetector;
    private readonly clipboard;
    private readonly elementRef;
    protected readonly showCopySuccess: WritableSignal<boolean>;
    protected readonly showCopyFailure: WritableSignal<boolean>;
    copySourceCode(): void;
    private getSourceCode;
    private showResult;
    static ɵfac: i0.ɵɵFactoryDeclaration<CopySourceCodeButton, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CopySourceCodeButton, "button[docs-copy-source-code]", never, {}, {}, never, never, true, never>;
}
