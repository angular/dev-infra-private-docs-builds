/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ViewChild, effect, inject, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, map } from 'rxjs';
import { LoadingStep } from '../services/node-runtime-sandbox.service.js';
import { NodeRuntimeSandbox } from '../services/node-runtime-sandbox.service.js';
import { NodeRuntimeState } from '../services/node-runtime-state.service.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["preview"];
function Preview_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "iframe", 3, 4);
} }
function Preview_Conditional_2_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function Preview_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, Preview_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngComponentOutlet", ctx_r1.previewErrorComponent);
} }
function Preview_Conditional_3_Case_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1, "Starting");
    i0.ɵɵelementEnd();
} }
function Preview_Conditional_3_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1, "Booting");
    i0.ɵɵelementEnd();
} }
function Preview_Conditional_3_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1, "Creating project");
    i0.ɵɵelementEnd();
} }
function Preview_Conditional_3_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 11);
    i0.ɵɵtext(1, "Installing packages");
    i0.ɵɵelementEnd();
} }
function Preview_Conditional_3_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1, " Initializing dev server ");
    i0.ɵɵelementEnd();
} }
function Preview_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtemplate(1, Preview_Conditional_3_Case_1_Template, 2, 0)(2, Preview_Conditional_3_Case_2_Template, 2, 0)(3, Preview_Conditional_3_Case_3_Template, 2, 0)(4, Preview_Conditional_3_Case_4_Template, 2, 0)(5, Preview_Conditional_3_Case_5_Template, 2, 0);
    i0.ɵɵelement(6, "progress", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    let Preview_Conditional_3_contFlowTmp;
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, (Preview_Conditional_3_contFlowTmp = ctx_r2.loadingProgressValue()) === ctx_r2.loadingEnum.NOT_STARTED ? 1 : Preview_Conditional_3_contFlowTmp === ctx_r2.loadingEnum.BOOT ? 2 : Preview_Conditional_3_contFlowTmp === ctx_r2.loadingEnum.LOAD_FILES ? 3 : Preview_Conditional_3_contFlowTmp === ctx_r2.loadingEnum.INSTALL ? 4 : Preview_Conditional_3_contFlowTmp === ctx_r2.loadingEnum.START_DEV_SERVER ? 5 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.loadingProgressValue())("max", ctx_r2.loadingEnum.READY);
} }
export class Preview {
    constructor() {
        this.changeDetectorRef = inject(ChangeDetectorRef);
        this.destroyRef = inject(DestroyRef);
        this.nodeRuntimeSandbox = inject(NodeRuntimeSandbox);
        this.nodeRuntimeState = inject(NodeRuntimeState);
        this.loadingProgressValue = this.nodeRuntimeState.loadingStep;
        this.loadingEnum = LoadingStep;
        effect(async () => {
            if (this.nodeRuntimeState.loadingStep() === LoadingStep.ERROR) {
                const { PreviewError } = await import('./preview-error.component.js');
                this.previewErrorComponent = PreviewError;
                this.changeDetectorRef.markForCheck();
            }
        });
    }
    ngAfterViewInit() {
        this.nodeRuntimeSandbox.previewUrl$
            .pipe(map((url) => ({ url, previewIframe: this.previewIframe })), filter((value) => !!value.previewIframe), 
        // Note: The delay is being used here to workaround the flickering issue
        // while switching tutorials
        delay(100), takeUntilDestroyed(this.destroyRef))
            .subscribe(({ url, previewIframe }) => {
            // Known issue - Binding to the src of an iframe causes the iframe to flicker: https://github.com/angular/angular/issues/16994
            previewIframe.nativeElement.src = url ?? '';
        });
    }
}
Preview.ɵfac = function Preview_Factory(t) { return new (t || Preview)(); };
Preview.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Preview, selectors: [["docs-tutorial-preview"]], viewQuery: function Preview_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.previewIframe = _t.first);
    } }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 4, vars: 3, consts: [[1, "adev-embedded-editor-preview-container"], ["class", "adev-embedded-editor-preview", "allow", "cross-origin-isolated", "title", "Editor preview"], ["class", "adev-embedded-editor-preview-loading"], ["allow", "cross-origin-isolated", "title", "Editor preview", 1, "adev-embedded-editor-preview"], ["preview", ""], [4, "ngComponentOutlet"], [1, "adev-embedded-editor-preview-loading"], ["title", "Preview progress", 3, "value", "max"], [1, "adev-embedded-editor-preview-loading-starting"], [1, "adev-embedded-editor-preview-loading-boot"], [1, "adev-embedded-editor-preview-loading-load-files"], [1, "adev-embedded-editor-preview-loading-install"], [1, "adev-embedded-editor-preview-loading-start-dev-server"]], template: function Preview_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, Preview_Conditional_1_Template, 2, 0, "iframe", 1)(2, Preview_Conditional_2_Template, 1, 1, "ng-container")(3, Preview_Conditional_3_Template, 7, 3, "div", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵconditional(1, ctx.loadingProgressValue() !== ctx.loadingEnum.ERROR ? 1 : -1);
        i0.ɵɵadvance(1);
        i0.ɵɵconditional(2, ctx.previewErrorComponent ? 2 : -1);
        i0.ɵɵadvance(1);
        i0.ɵɵconditional(3, ctx.loadingProgressValue() < ctx.loadingEnum.READY && ctx.loadingProgressValue() !== ctx.loadingEnum.ERROR ? 3 : -1);
    } }, dependencies: [CommonModule, i1.NgComponentOutlet], styles: ["[_nghost-%COMP%]{display:block;height:calc(100% - 50px)}.adev-dark-mode   [_nghost-%COMP%]   .adev-embedded-editor-preview-container[_ngcontent-%COMP%]{background:var(--gray-100)}[_nghost-%COMP%]:has(.adev-preview-error)   .adev-embedded-editor-preview-container[_ngcontent-%COMP%]{overflow-y:auto}.adev-embedded-editor-preview-container[_ngcontent-%COMP%]{display:flex;width:100%;height:100%;position:relative;color:#000;background:#fff;transition:background .3s ease;box-sizing:border-box}.adev-embedded-editor-preview-container[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%]{width:100%;height:100%;border:0}.adev-embedded-editor-preview-container[_ngcontent-%COMP%]   .adev-embedded-editor-preview-loading[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:.5rem;position:absolute;inset:0;margin:auto;width:100%;height:100%;background:#fff}/*# sourceMappingURL=preview.component.css.map */"], changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Preview, [{
        type: Component,
        args: [{ standalone: true, selector: 'docs-tutorial-preview', changeDetection: ChangeDetectionStrategy.OnPush, imports: [CommonModule, NgIf, NgSwitch, NgSwitchCase], template: "<div class=\"adev-embedded-editor-preview-container\">\n  @if (loadingProgressValue() !== loadingEnum.ERROR) {\n  <iframe\n    #preview\n    class=\"adev-embedded-editor-preview\"\n    allow=\"cross-origin-isolated\"\n    title=\"Editor preview\"\n  ></iframe>\n  } @if (previewErrorComponent) {\n  <ng-container\n    *ngComponentOutlet=\"previewErrorComponent\"\n  />\n  } @if (loadingProgressValue() < loadingEnum.READY && loadingProgressValue() !== loadingEnum.ERROR)\n  {\n  <div class=\"adev-embedded-editor-preview-loading\">\n    @switch (loadingProgressValue()) { @case (loadingEnum.NOT_STARTED) {\n    <span class=\"adev-embedded-editor-preview-loading-starting\">Starting</span>\n    } @case (loadingEnum.BOOT) {\n    <span class=\"adev-embedded-editor-preview-loading-boot\">Booting</span>\n    } @case (loadingEnum.LOAD_FILES) {\n    <span class=\"adev-embedded-editor-preview-loading-load-files\">Creating project</span>\n    } @case (loadingEnum.INSTALL) {\n    <span class=\"adev-embedded-editor-preview-loading-install\">Installing packages</span>\n    } @case (loadingEnum.START_DEV_SERVER) {\n    <span class=\"adev-embedded-editor-preview-loading-start-dev-server\">\n      Initializing dev server\n    </span>\n    } }\n    <progress\n      title=\"Preview progress\"\n      [value]=\"loadingProgressValue()\"\n      [max]=\"loadingEnum.READY\"\n    ></progress>\n  </div>\n  }\n</div>\n", styles: [":host{display:block;height:calc(100% - 50px)}.adev-dark-mode :host .adev-embedded-editor-preview-container{background:var(--gray-100)}:host:has(.adev-preview-error) .adev-embedded-editor-preview-container{overflow-y:auto}.adev-embedded-editor-preview-container{display:flex;width:100%;height:100%;position:relative;color:#000;background:#fff;transition:background .3s ease;box-sizing:border-box}.adev-embedded-editor-preview-container iframe{width:100%;height:100%;border:0}.adev-embedded-editor-preview-container .adev-embedded-editor-preview-loading{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:.5rem;position:absolute;inset:0;margin:auto;width:100%;height:100%;background:#fff}/*# sourceMappingURL=preview.component.css.map */\n"] }]
    }], () => [], { previewIframe: [{
            type: ViewChild,
            args: ['preview']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Preview, { className: "Preview", filePath: "docs/editor/preview/preview.component.ts", lineNumber: 43 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9wcmV2aWV3L3ByZXZpZXcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvcHJldmlldy9wcmV2aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUV4QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDL0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7Ozs7O0lDdkJ6RSwrQkFLVTs7O0lBRVYsd0JBRUU7OztJQUZGLHdGQUVFOzs7SUFEQyxnRUFBd0M7OztJQU16QywrQkFBNEQ7SUFBQSx3QkFBUTtJQUFBLGlCQUFPOzs7SUFFM0UsK0JBQXdEO0lBQUEsdUJBQU87SUFBQSxpQkFBTzs7O0lBRXRFLGdDQUE4RDtJQUFBLGdDQUFnQjtJQUFBLGlCQUFPOzs7SUFFckYsZ0NBQTJEO0lBQUEsbUNBQW1CO0lBQUEsaUJBQU87OztJQUVyRixnQ0FBb0U7SUFDbEUseUNBQ0Y7SUFBQSxpQkFBTzs7O0lBWlQsOEJBQWtEO0lBQ2IsNkRBRWxDLGdEQUFBLGdEQUFBLGdEQUFBLGdEQUFBO0lBV0QsOEJBSVk7SUFDZCxpQkFBTTs7OztJQWxCSixlQVlHO0lBWkgseWFBWUc7SUFHRCxlQUFnQztJQUFoQyxxREFBZ0MsaUNBQUE7O0FEWXRDLE1BQU0sT0FBTyxPQUFPO0lBYWxCO1FBVmlCLHNCQUFpQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlDLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsdUJBQWtCLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEQscUJBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFN0QseUJBQW9CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQztRQUN6RCxnQkFBVyxHQUFHLFdBQVcsQ0FBQztRQUt4QixNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDaEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLEtBQUssV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM5RCxNQUFNLEVBQUMsWUFBWSxFQUFDLEdBQUcsTUFBTSxNQUFNLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFFcEUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFlBQVksQ0FBQztnQkFFMUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVc7YUFDaEMsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBQyxDQUFDLENBQUMsRUFDeEQsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFtQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDekUsd0VBQXdFO1FBQ3hFLDRCQUE0QjtRQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ1Ysa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUNwQzthQUNBLFNBQVMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLGFBQWEsRUFBQyxFQUFFLEVBQUU7WUFDbEMsOEhBQThIO1lBQzlILGFBQWEsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs4REF2Q1UsT0FBTzswREFBUCxPQUFPOzs7Ozs7UUMxQ3BCLDhCQUFvRDtRQUNsRCxtRUFPQyx5REFBQSxtREFBQTtRQTJCSCxpQkFBTTs7UUFsQ0osZUFPQztRQVBELGtGQU9DO1FBQUMsZUFJRDtRQUpDLHVEQUlEO1FBQUMsZUFzQkQ7UUF0QkMsd0lBc0JEO3dCRE1TLFlBQVk7aUZBRVgsT0FBTztjQVJuQixTQUFTOzZCQUNJLElBQUksWUFDTix1QkFBdUIsbUJBR2hCLHVCQUF1QixDQUFDLE1BQU0sV0FDdEMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7b0JBRy9CLGFBQWE7a0JBQWxDLFNBQVM7bUJBQUMsU0FBUzs7a0ZBRFQsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIE5nSWYsIE5nU3dpdGNoLCBOZ1N3aXRjaENhc2V9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRGVzdHJveVJlZixcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxuICBlZmZlY3QsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtkZWxheSwgZmlsdGVyLCBtYXB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0xvYWRpbmdTdGVwfSBmcm9tICcuLi9zZXJ2aWNlcy9ub2RlLXJ1bnRpbWUtc2FuZGJveC5zZXJ2aWNlLmpzJztcbmltcG9ydCB7Tm9kZVJ1bnRpbWVTYW5kYm94fSBmcm9tICcuLi9zZXJ2aWNlcy9ub2RlLXJ1bnRpbWUtc2FuZGJveC5zZXJ2aWNlLmpzJztcbmltcG9ydCB7Tm9kZVJ1bnRpbWVTdGF0ZX0gZnJvbSAnLi4vc2VydmljZXMvbm9kZS1ydW50aW1lLXN0YXRlLnNlcnZpY2UuanMnO1xuXG5pbXBvcnQgdHlwZSB7UHJldmlld0Vycm9yfSBmcm9tICcuL3ByZXZpZXctZXJyb3IuY29tcG9uZW50LmpzJztcblxudHlwZSBQcmV2aWV3VXJsRW1pdHRlZFZhbHVlID0ge1xuICB1cmw6IHN0cmluZyB8IG51bGw7XG4gIHByZXZpZXdJZnJhbWU6IEVsZW1lbnRSZWY8SFRNTElGcmFtZUVsZW1lbnQ+O1xufTtcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnZG9jcy10dXRvcmlhbC1wcmV2aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ByZXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcmV2aWV3LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOZ0lmLCBOZ1N3aXRjaCwgTmdTd2l0Y2hDYXNlXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJldmlldyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdwcmV2aWV3JykgcHJldmlld0lmcmFtZTogRWxlbWVudFJlZjxIVE1MSUZyYW1lRWxlbWVudD4gfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjaGFuZ2VEZXRlY3RvclJlZiA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlUnVudGltZVNhbmRib3ggPSBpbmplY3QoTm9kZVJ1bnRpbWVTYW5kYm94KTtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlUnVudGltZVN0YXRlID0gaW5qZWN0KE5vZGVSdW50aW1lU3RhdGUpO1xuXG4gIGxvYWRpbmdQcm9ncmVzc1ZhbHVlID0gdGhpcy5ub2RlUnVudGltZVN0YXRlLmxvYWRpbmdTdGVwO1xuICBsb2FkaW5nRW51bSA9IExvYWRpbmdTdGVwO1xuXG4gIHByZXZpZXdFcnJvckNvbXBvbmVudDogdHlwZW9mIFByZXZpZXdFcnJvciB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBlZmZlY3QoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubm9kZVJ1bnRpbWVTdGF0ZS5sb2FkaW5nU3RlcCgpID09PSBMb2FkaW5nU3RlcC5FUlJPUikge1xuICAgICAgICBjb25zdCB7UHJldmlld0Vycm9yfSA9IGF3YWl0IGltcG9ydCgnLi9wcmV2aWV3LWVycm9yLmNvbXBvbmVudC5qcycpO1xuXG4gICAgICAgIHRoaXMucHJldmlld0Vycm9yQ29tcG9uZW50ID0gUHJldmlld0Vycm9yO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5ub2RlUnVudGltZVNhbmRib3gucHJldmlld1VybCRcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHVybCkgPT4gKHt1cmwsIHByZXZpZXdJZnJhbWU6IHRoaXMucHJldmlld0lmcmFtZX0pKSxcbiAgICAgICAgZmlsdGVyKCh2YWx1ZSk6IHZhbHVlIGlzIFByZXZpZXdVcmxFbWl0dGVkVmFsdWUgPT4gISF2YWx1ZS5wcmV2aWV3SWZyYW1lKSxcbiAgICAgICAgLy8gTm90ZTogVGhlIGRlbGF5IGlzIGJlaW5nIHVzZWQgaGVyZSB0byB3b3JrYXJvdW5kIHRoZSBmbGlja2VyaW5nIGlzc3VlXG4gICAgICAgIC8vIHdoaWxlIHN3aXRjaGluZyB0dXRvcmlhbHNcbiAgICAgICAgZGVsYXkoMTAwKSxcbiAgICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZiksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCh7dXJsLCBwcmV2aWV3SWZyYW1lfSkgPT4ge1xuICAgICAgICAvLyBLbm93biBpc3N1ZSAtIEJpbmRpbmcgdG8gdGhlIHNyYyBvZiBhbiBpZnJhbWUgY2F1c2VzIHRoZSBpZnJhbWUgdG8gZmxpY2tlcjogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTY5OTRcbiAgICAgICAgcHJldmlld0lmcmFtZS5uYXRpdmVFbGVtZW50LnNyYyA9IHVybCA/PyAnJztcbiAgICAgIH0pO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiYWRldi1lbWJlZGRlZC1lZGl0b3ItcHJldmlldy1jb250YWluZXJcIj5cbiAgQGlmIChsb2FkaW5nUHJvZ3Jlc3NWYWx1ZSgpICE9PSBsb2FkaW5nRW51bS5FUlJPUikge1xuICA8aWZyYW1lXG4gICAgI3ByZXZpZXdcbiAgICBjbGFzcz1cImFkZXYtZW1iZWRkZWQtZWRpdG9yLXByZXZpZXdcIlxuICAgIGFsbG93PVwiY3Jvc3Mtb3JpZ2luLWlzb2xhdGVkXCJcbiAgICB0aXRsZT1cIkVkaXRvciBwcmV2aWV3XCJcbiAgPjwvaWZyYW1lPlxuICB9IEBpZiAocHJldmlld0Vycm9yQ29tcG9uZW50KSB7XG4gIDxuZy1jb250YWluZXJcbiAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJwcmV2aWV3RXJyb3JDb21wb25lbnRcIlxuICAvPlxuICB9IEBpZiAobG9hZGluZ1Byb2dyZXNzVmFsdWUoKSA8IGxvYWRpbmdFbnVtLlJFQURZICYmIGxvYWRpbmdQcm9ncmVzc1ZhbHVlKCkgIT09IGxvYWRpbmdFbnVtLkVSUk9SKVxuICB7XG4gIDxkaXYgY2xhc3M9XCJhZGV2LWVtYmVkZGVkLWVkaXRvci1wcmV2aWV3LWxvYWRpbmdcIj5cbiAgICBAc3dpdGNoIChsb2FkaW5nUHJvZ3Jlc3NWYWx1ZSgpKSB7IEBjYXNlIChsb2FkaW5nRW51bS5OT1RfU1RBUlRFRCkge1xuICAgIDxzcGFuIGNsYXNzPVwiYWRldi1lbWJlZGRlZC1lZGl0b3ItcHJldmlldy1sb2FkaW5nLXN0YXJ0aW5nXCI+U3RhcnRpbmc8L3NwYW4+XG4gICAgfSBAY2FzZSAobG9hZGluZ0VudW0uQk9PVCkge1xuICAgIDxzcGFuIGNsYXNzPVwiYWRldi1lbWJlZGRlZC1lZGl0b3ItcHJldmlldy1sb2FkaW5nLWJvb3RcIj5Cb290aW5nPC9zcGFuPlxuICAgIH0gQGNhc2UgKGxvYWRpbmdFbnVtLkxPQURfRklMRVMpIHtcbiAgICA8c3BhbiBjbGFzcz1cImFkZXYtZW1iZWRkZWQtZWRpdG9yLXByZXZpZXctbG9hZGluZy1sb2FkLWZpbGVzXCI+Q3JlYXRpbmcgcHJvamVjdDwvc3Bhbj5cbiAgICB9IEBjYXNlIChsb2FkaW5nRW51bS5JTlNUQUxMKSB7XG4gICAgPHNwYW4gY2xhc3M9XCJhZGV2LWVtYmVkZGVkLWVkaXRvci1wcmV2aWV3LWxvYWRpbmctaW5zdGFsbFwiPkluc3RhbGxpbmcgcGFja2FnZXM8L3NwYW4+XG4gICAgfSBAY2FzZSAobG9hZGluZ0VudW0uU1RBUlRfREVWX1NFUlZFUikge1xuICAgIDxzcGFuIGNsYXNzPVwiYWRldi1lbWJlZGRlZC1lZGl0b3ItcHJldmlldy1sb2FkaW5nLXN0YXJ0LWRldi1zZXJ2ZXJcIj5cbiAgICAgIEluaXRpYWxpemluZyBkZXYgc2VydmVyXG4gICAgPC9zcGFuPlxuICAgIH0gfVxuICAgIDxwcm9ncmVzc1xuICAgICAgdGl0bGU9XCJQcmV2aWV3IHByb2dyZXNzXCJcbiAgICAgIFt2YWx1ZV09XCJsb2FkaW5nUHJvZ3Jlc3NWYWx1ZSgpXCJcbiAgICAgIFttYXhdPVwibG9hZGluZ0VudW0uUkVBRFlcIlxuICAgID48L3Byb2dyZXNzPlxuICA8L2Rpdj5cbiAgfVxuPC9kaXY+XG4iXX0=