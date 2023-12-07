/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { isFirefox, isIos } from '../../utils/index.js';
import { ErrorType, NodeRuntimeState } from '../services/node-runtime-state.service.js';
import * as i0 from "@angular/core";
function PreviewError_Case_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, "Open angular.dev on desktop to code in your browser.");
    i0.ɵɵelementEnd();
} }
function PreviewError_Case_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, " We're currently working on supporting Firefox with our development server. Meanwhile, try running the page using a different browser. ");
    i0.ɵɵelementEnd();
} }
function PreviewError_Case_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PreviewError_Case_1_Conditional_0_Template, 2, 0, "p")(1, PreviewError_Case_1_Conditional_1_Template, 2, 0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵconditional(0, ctx_r0.isIos ? 0 : ctx_r0.isFirefox ? 1 : -1);
} }
function PreviewError_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, " We couldn't start the tutorial app. Please ensure third party cookies are enabled for this site. ");
    i0.ɵɵelementEnd();
} }
function PreviewError_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1, " We couldn't start the tutorial app because your browser is out of memory. To free up memory, close angular.dev tutorials in other tabs or windows, and refresh the page. ");
    i0.ɵɵelementEnd();
} }
function PreviewError_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, " The error message is: ");
    i0.ɵɵelementStart(2, "code");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.error().message);
} }
export class PreviewError {
    constructor() {
        this.nodeRuntimeState = inject(NodeRuntimeState);
        this.isIos = isIos;
        this.isFirefox = isFirefox;
        this.error = this.nodeRuntimeState.error;
        this.ErrorType = ErrorType;
    }
}
PreviewError.ɵfac = function PreviewError_Factory(t) { return new (t || PreviewError)(); };
PreviewError.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PreviewError, selectors: [["docs-tutorial-preview-error"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 5, vars: 2, consts: [[1, "adev-preview-error", "adev-light-mode", "adev-mini-scroll-track"]], template: function PreviewError_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, PreviewError_Case_1_Template, 2, 1)(2, PreviewError_Case_2_Template, 2, 0)(3, PreviewError_Case_3_Template, 2, 0)(4, PreviewError_Conditional_4_Template, 4, 1, "small");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        let PreviewError_contFlowTmp;
        let tmp_1_0;
        let tmp_2_0;
        let tmp_3_0;
        let tmp_4_0;
        i0.ɵɵadvance(1);
        i0.ɵɵconditional(1, (PreviewError_contFlowTmp = true) === (((tmp_1_0 = ctx.error()) == null ? null : tmp_1_0.type) === ctx.ErrorType.UNSUPPORTED_BROWSER_ENVIRONMENT) ? 1 : PreviewError_contFlowTmp === (((tmp_2_0 = ctx.error()) == null ? null : tmp_2_0.type) === ctx.ErrorType.COOKIES || ((tmp_2_0 = ctx.error()) == null ? null : tmp_2_0.type) === ctx.ErrorType.UNKNOWN) ? 2 : PreviewError_contFlowTmp === (((tmp_3_0 = ctx.error()) == null ? null : tmp_3_0.type) === ctx.ErrorType.OUT_OF_MEMORY) ? 3 : -1);
        i0.ɵɵadvance(3);
        i0.ɵɵconditional(4, ((tmp_4_0 = ctx.error()) == null ? null : tmp_4_0.message) ? 4 : -1);
    } }, styles: ["[_nghost-%COMP%]{margin:5% auto}.adev-preview-error[_ngcontent-%COMP%]{border:1px solid var(--senary-contrast);border-radius:.25rem;padding:1rem}.adev-preview-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:flex;gap:.5rem;font-weight:600;margin-top:0}.adev-preview-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]::before{content:\"error\";font-family:var(--icons);color:var(--orange-red);font-size:1.5rem;font-weight:500}.adev-preview-error[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]:not(pre   *)[_ngcontent-%COMP%]{white-space:pre-wrap;background:linear-gradient(90deg, var(--hot-red) 0%, var(--orange-red) 100%);background-clip:text;-webkit-background-clip:text;color:rgba(0,0,0,0)}.adev-preview-error[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]:not(pre   *)[_ngcontent-%COMP%]::before{background:rgba(0,0,0,0)}/*# sourceMappingURL=preview-error.component.css.map */"], changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PreviewError, [{
        type: Component,
        args: [{ standalone: true, selector: 'docs-tutorial-preview-error', changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf, NgSwitch, NgSwitchCase], template: "<div class=\"adev-preview-error adev-light-mode adev-mini-scroll-track\">\n  @switch (true) {\n    @case (error()?.type === ErrorType.UNSUPPORTED_BROWSER_ENVIRONMENT) {\n      @if(isIos) {\n        <p>Open angular.dev on desktop to code in your browser.</p>\n      } @else if(isFirefox) {\n        <p>\n          We're currently working on supporting Firefox with our development server. Meanwhile, try \n          running the page using a different browser.\n        </p>\n      }\n    } \n    @case (error()?.type === ErrorType.COOKIES || error()?.type === ErrorType.UNKNOWN) {\n      <p>\n        We couldn't start the tutorial app. Please ensure third party cookies are enabled for this\n        site.\n      </p>\n    } \n    @case (error()?.type === ErrorType.OUT_OF_MEMORY) {\n      <p>\n        We couldn't start the tutorial app because your browser is out of memory. To free up memory,\n        close angular.dev tutorials in other tabs or windows, and refresh the page.\n      </p>\n    }\n  }\n\n  @if (error()?.message) {\n    <small>\n      The error message is:\n      <code>{{ error()!.message }}</code>\n    </small>\n  }\n</div>\n", styles: [":host{margin:5% auto}.adev-preview-error{border:1px solid var(--senary-contrast);border-radius:.25rem;padding:1rem}.adev-preview-error p{display:flex;gap:.5rem;font-weight:600;margin-top:0}.adev-preview-error p::before{content:\"error\";font-family:var(--icons);color:var(--orange-red);font-size:1.5rem;font-weight:500}.adev-preview-error code:not(pre *){white-space:pre-wrap;background:linear-gradient(90deg, var(--hot-red) 0%, var(--orange-red) 100%);background-clip:text;-webkit-background-clip:text;color:rgba(0,0,0,0)}.adev-preview-error code:not(pre *)::before{background:rgba(0,0,0,0)}/*# sourceMappingURL=preview-error.component.css.map */\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PreviewError, { className: "PreviewError", filePath: "docs/editor/preview/preview-error.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy1lcnJvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9wcmV2aWV3L3ByZXZpZXctZXJyb3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvcHJldmlldy9wcmV2aWV3LWVycm9yLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsT0FBTyxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDOzs7SUNSOUUseUJBQUc7SUFBQSxvRUFBb0Q7SUFBQSxpQkFBSTs7O0lBRTNELHlCQUFHO0lBQ0QsdUpBRUY7SUFBQSxpQkFBSTs7O0lBTk4sdUVBRUMscURBQUE7OztJQUZELGlFQUVDOzs7SUFRRCx5QkFBRztJQUNELGtIQUVGO0lBQUEsaUJBQUk7OztJQUdKLHlCQUFHO0lBQ0QsMExBRUY7SUFBQSxpQkFBSTs7O0lBS04sNkJBQU87SUFDTCx1Q0FDQTtJQUFBLDRCQUFNO0lBQUEsWUFBc0I7SUFBQSxpQkFBTyxFQUFBOzs7SUFBN0IsZUFBc0I7SUFBdEIsNENBQXNCOztBRFBsQyxNQUFNLE9BQU8sWUFBWTtJQVJ6QjtRQVNtQixxQkFBZ0IsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVwRCxVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2QsY0FBUyxHQUFHLFNBQVMsQ0FBQztRQUV0QixVQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQztRQUNwQyxjQUFTLEdBQUcsU0FBUyxDQUFDO0tBQ2hDOzt3RUFSWSxZQUFZOytEQUFaLFlBQVk7UUN0QnpCLDhCQUF1RTtRQUVuRSxvREFTQyx1Q0FBQSx1Q0FBQSx1REFBQTtRQXFCTCxpQkFBTTs7Ozs7OztRQS9CSixlQXVCQztRQXZCRCx3ZkF1QkM7UUFFRCxlQUtDO1FBTEQsd0ZBS0M7O2lGRFRVLFlBQVk7Y0FSeEIsU0FBUzs2QkFDSSxJQUFJLFlBQ04sNkJBQTZCLG1CQUd0Qix1QkFBdUIsQ0FBQyxNQUFNLFdBQ3RDLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7O2tGQUU1QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdJZiwgTmdTd2l0Y2gsIE5nU3dpdGNoQ2FzZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNGaXJlZm94LCBpc0lvc30gZnJvbSAnLi4vLi4vdXRpbHMvaW5kZXguanMnO1xuXG5pbXBvcnQge0Vycm9yVHlwZSwgTm9kZVJ1bnRpbWVTdGF0ZX0gZnJvbSAnLi4vc2VydmljZXMvbm9kZS1ydW50aW1lLXN0YXRlLnNlcnZpY2UuanMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6ICdkb2NzLXR1dG9yaWFsLXByZXZpZXctZXJyb3InLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJldmlldy1lcnJvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3ByZXZpZXctZXJyb3IuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGltcG9ydHM6IFtOZ0lmLCBOZ1N3aXRjaCwgTmdTd2l0Y2hDYXNlXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJldmlld0Vycm9yIHtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlUnVudGltZVN0YXRlID0gaW5qZWN0KE5vZGVSdW50aW1lU3RhdGUpO1xuXG4gIHJlYWRvbmx5IGlzSW9zID0gaXNJb3M7XG4gIHJlYWRvbmx5IGlzRmlyZWZveCA9IGlzRmlyZWZveDtcblxuICByZWFkb25seSBlcnJvciA9IHRoaXMubm9kZVJ1bnRpbWVTdGF0ZS5lcnJvcjtcbiAgcmVhZG9ubHkgRXJyb3JUeXBlID0gRXJyb3JUeXBlO1xufVxuIiwiPGRpdiBjbGFzcz1cImFkZXYtcHJldmlldy1lcnJvciBhZGV2LWxpZ2h0LW1vZGUgYWRldi1taW5pLXNjcm9sbC10cmFja1wiPlxuICBAc3dpdGNoICh0cnVlKSB7XG4gICAgQGNhc2UgKGVycm9yKCk/LnR5cGUgPT09IEVycm9yVHlwZS5VTlNVUFBPUlRFRF9CUk9XU0VSX0VOVklST05NRU5UKSB7XG4gICAgICBAaWYoaXNJb3MpIHtcbiAgICAgICAgPHA+T3BlbiBhbmd1bGFyLmRldiBvbiBkZXNrdG9wIHRvIGNvZGUgaW4geW91ciBicm93c2VyLjwvcD5cbiAgICAgIH0gQGVsc2UgaWYoaXNGaXJlZm94KSB7XG4gICAgICAgIDxwPlxuICAgICAgICAgIFdlJ3JlIGN1cnJlbnRseSB3b3JraW5nIG9uIHN1cHBvcnRpbmcgRmlyZWZveCB3aXRoIG91ciBkZXZlbG9wbWVudCBzZXJ2ZXIuIE1lYW53aGlsZSwgdHJ5IFxuICAgICAgICAgIHJ1bm5pbmcgdGhlIHBhZ2UgdXNpbmcgYSBkaWZmZXJlbnQgYnJvd3Nlci5cbiAgICAgICAgPC9wPlxuICAgICAgfVxuICAgIH0gXG4gICAgQGNhc2UgKGVycm9yKCk/LnR5cGUgPT09IEVycm9yVHlwZS5DT09LSUVTIHx8IGVycm9yKCk/LnR5cGUgPT09IEVycm9yVHlwZS5VTktOT1dOKSB7XG4gICAgICA8cD5cbiAgICAgICAgV2UgY291bGRuJ3Qgc3RhcnQgdGhlIHR1dG9yaWFsIGFwcC4gUGxlYXNlIGVuc3VyZSB0aGlyZCBwYXJ0eSBjb29raWVzIGFyZSBlbmFibGVkIGZvciB0aGlzXG4gICAgICAgIHNpdGUuXG4gICAgICA8L3A+XG4gICAgfSBcbiAgICBAY2FzZSAoZXJyb3IoKT8udHlwZSA9PT0gRXJyb3JUeXBlLk9VVF9PRl9NRU1PUlkpIHtcbiAgICAgIDxwPlxuICAgICAgICBXZSBjb3VsZG4ndCBzdGFydCB0aGUgdHV0b3JpYWwgYXBwIGJlY2F1c2UgeW91ciBicm93c2VyIGlzIG91dCBvZiBtZW1vcnkuIFRvIGZyZWUgdXAgbWVtb3J5LFxuICAgICAgICBjbG9zZSBhbmd1bGFyLmRldiB0dXRvcmlhbHMgaW4gb3RoZXIgdGFicyBvciB3aW5kb3dzLCBhbmQgcmVmcmVzaCB0aGUgcGFnZS5cbiAgICAgIDwvcD5cbiAgICB9XG4gIH1cblxuICBAaWYgKGVycm9yKCk/Lm1lc3NhZ2UpIHtcbiAgICA8c21hbGw+XG4gICAgICBUaGUgZXJyb3IgbWVzc2FnZSBpczpcbiAgICAgIDxjb2RlPnt7IGVycm9yKCkhLm1lc3NhZ2UgfX08L2NvZGU+XG4gICAgPC9zbWFsbD5cbiAgfVxuPC9kaXY+XG4iXX0=