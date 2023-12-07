import { AfterViewInit, ElementRef } from '@angular/core';
import { LoadingStep } from '../services/node-runtime-sandbox.service.js';
import type { PreviewError } from './preview-error.component.js';
import * as i0 from "@angular/core";
export declare class Preview implements AfterViewInit {
    previewIframe: ElementRef<HTMLIFrameElement> | undefined;
    private readonly changeDetectorRef;
    private readonly destroyRef;
    private readonly nodeRuntimeSandbox;
    private readonly nodeRuntimeState;
    loadingProgressValue: import("@angular/core").Signal<number>;
    loadingEnum: typeof LoadingStep;
    previewErrorComponent: typeof PreviewError | undefined;
    constructor();
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Preview, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Preview, "docs-tutorial-preview", never, {}, {}, never, never, true, never>;
}
