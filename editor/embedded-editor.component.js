/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { NgIf, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, ElementRef, PLATFORM_ID, ViewChild, computed, inject, signal, } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { IconComponent } from '../components/icon/icon.component.js';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { distinctUntilChanged, map } from 'rxjs';
import { MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES } from './services/alert-manager.service.js';
import { AngularSplitModule } from 'angular-split';
import { CodeEditor } from './code-editor/code-editor.component.js';
import { DiagnosticsState } from './code-editor/services/diagnostics-state.service.js';
import { EditorUiState } from './services/editor-ui-state.service.js';
import { LoadingStep } from './services/node-runtime-sandbox.service.js';
import { NodeRuntimeSandbox } from './services/node-runtime-sandbox.service.js';
import { NodeRuntimeState } from './services/node-runtime-state.service.js';
import { Preview } from './preview/preview.component.js';
import { TerminalType } from './services/terminal-handler.service.js';
import { Terminal } from './terminal/terminal.component.js';
import * as i0 from "@angular/core";
import * as i1 from "angular-split";
import * as i2 from "@angular/material/tabs";
const _c0 = ["editorContainer"];
function EmbeddedEditor_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "docs-tutorial-code-editor", 8);
} }
function EmbeddedEditor_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "docs-tutorial-terminal", 9);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("type", ctx_r2.TerminalType.INTERACTIVE);
} }
function EmbeddedEditor_Conditional_7_Conditional_1_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "docs-tutorial-preview");
} }
function EmbeddedEditor_Conditional_7_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "as-split-area", 11)(1, "div", 21)(2, "div", 22)(3, "span");
    i0.ɵɵtext(4, "Preview");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(5, EmbeddedEditor_Conditional_7_Conditional_1_Conditional_5_Template, 1, 0, "docs-tutorial-preview");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("size", 50)("order", 1);
    i0.ɵɵadvance(5);
    i0.ɵɵconditional(5, !ctx_r4.displayPreviewInMatTabGroup() ? 5 : -1);
} }
function EmbeddedEditor_Conditional_7_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-tab", 14);
    i0.ɵɵelement(1, "docs-tutorial-preview");
    i0.ɵɵelementEnd();
} }
function EmbeddedEditor_Conditional_7_ng_template_6_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "docs-icon", 23);
    i0.ɵɵtext(1, "error");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r8.errorsCount(), " ");
} }
function EmbeddedEditor_Conditional_7_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Console ");
    i0.ɵɵtemplate(1, EmbeddedEditor_Conditional_7_ng_template_6_Conditional_1_Template, 4, 1);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, ctx_r6.errorsCount() ? 1 : -1);
} }
function EmbeddedEditor_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "as-split", 10);
    i0.ɵɵtemplate(1, EmbeddedEditor_Conditional_7_Conditional_1_Template, 6, 3, "as-split-area", 11);
    i0.ɵɵelementStart(2, "as-split-area", 12)(3, "mat-tab-group", 13);
    i0.ɵɵtemplate(4, EmbeddedEditor_Conditional_7_Conditional_4_Template, 2, 0, "mat-tab", 14);
    i0.ɵɵelementStart(5, "mat-tab", 15);
    i0.ɵɵtemplate(6, EmbeddedEditor_Conditional_7_ng_template_6_Template, 2, 1, "ng-template", 16);
    i0.ɵɵelement(7, "docs-tutorial-terminal", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "mat-tab", 18);
    i0.ɵɵelement(9, "docs-tutorial-terminal", 17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 19);
    i0.ɵɵlistener("click", function EmbeddedEditor_Conditional_7_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.reset()); });
    i0.ɵɵelementStart(11, "docs-icon", 20);
    i0.ɵɵtext(12, "refresh");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, !ctx_r3.displayPreviewInMatTabGroup() ? 1 : -1);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("size", 50)("order", 2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(4, ctx_r3.displayPreviewInMatTabGroup() ? 4 : -1);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("type", ctx_r3.TerminalType.READONLY);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("type", ctx_r3.TerminalType.INTERACTIVE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("disabled", !ctx_r3.shouldEnableReset());
} }
export const EMBEDDED_EDITOR_SELECTOR = 'embedded-editor';
export const LARGE_EDITOR_WIDTH_BREAKPOINT = 950;
export const LARGE_EDITOR_HEIGHT_BREAKPOINT = 550;
export class EmbeddedEditor {
    constructor() {
        this.platformId = inject(PLATFORM_ID);
        this.changeDetector = inject(ChangeDetectorRef);
        this.destroyRef = inject(DestroyRef);
        this.diagnosticsState = inject(DiagnosticsState);
        this.editorUiState = inject(EditorUiState);
        this.nodeRuntimeState = inject(NodeRuntimeState);
        this.nodeRuntimeSandbox = inject(NodeRuntimeSandbox);
        this.splitDirection = 'vertical';
        this.MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES;
        this.TerminalType = TerminalType;
        this.displayOnlyTerminal = computed(() => this.editorUiState.uiState().displayOnlyInteractiveTerminal);
        this.errorsCount = signal(0);
        this.displayPreviewInMatTabGroup = signal(true);
        this.shouldEnableReset = computed(() => this.nodeRuntimeState.loadingStep() > LoadingStep.BOOT &&
            !this.nodeRuntimeState.isResetting());
        this.errorsCount$ = this.diagnosticsState.diagnostics$.pipe(map((diagnosticsItem) => diagnosticsItem.filter((item) => item.severity === 'error').length), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef));
        this.displayPreviewInMatTabGroup$ = toObservable(this.displayPreviewInMatTabGroup).pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef));
    }
    ngOnInit() {
        this.listenToErrorsCount();
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.setFirstTabAsActiveAfterResize();
            this.setResizeObserver();
        }
    }
    ngOnDestroy() {
        this.resizeObserver?.disconnect();
    }
    setVisibleEmbeddedEditorTabs() {
        this.displayPreviewInMatTabGroup.set(!this.isLargeEmbeddedEditor());
    }
    async reset() {
        await this.nodeRuntimeSandbox.reset();
    }
    setFirstTabAsActiveAfterResize() {
        this.displayPreviewInMatTabGroup$.subscribe(() => {
            this.changeDetector.detectChanges();
            this.matTabGroup.selectedIndex = 0;
        });
    }
    listenToErrorsCount() {
        this.errorsCount$.subscribe((errorsCount) => {
            this.errorsCount.set(errorsCount);
        });
    }
    // Listen to resizing of Embedded Editor and set proper list of the tabs for the current resolution.
    setResizeObserver() {
        this.resizeObserver = new ResizeObserver((_) => {
            this.setVisibleEmbeddedEditorTabs();
            this.splitDirection = this.isLargeEmbeddedEditor() ? 'horizontal' : 'vertical';
        });
        this.resizeObserver.observe(this.editorContainer.nativeElement);
    }
    isLargeEmbeddedEditor() {
        const editorContainer = this.editorContainer.nativeElement;
        const width = editorContainer.offsetWidth;
        const height = editorContainer.offsetHeight;
        return width > LARGE_EDITOR_WIDTH_BREAKPOINT && height > LARGE_EDITOR_HEIGHT_BREAKPOINT;
    }
}
EmbeddedEditor.ɵfac = function EmbeddedEditor_Factory(t) { return new (t || EmbeddedEditor)(); };
EmbeddedEditor.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmbeddedEditor, selectors: [["embedded-editor"]], viewQuery: function EmbeddedEditor_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(MatTabGroup, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.editorContainer = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.matTabGroup = _t.first);
    } }, standalone: true, features: [i0.ɵɵProvidersFeature([EditorUiState]), i0.ɵɵStandaloneFeature], decls: 8, vars: 6, consts: [[1, "adev-editor-container"], ["editorContainer", ""], ["restrictMove", "true", "gutterSize", "5", 1, "adev-editor", 3, "direction"], [1, "adev-left-side", 3, "size"], ["class", "adev-tutorial-code-editor"], ["class", "docs-tutorial-terminal-only", 3, "type"], [3, "size"], ["class", "adev-right-side", "direction", "vertical", "restrictMove", "true", "gutterSize", "5"], [1, "adev-tutorial-code-editor"], [1, "docs-tutorial-terminal-only", 3, "type"], ["direction", "vertical", "restrictMove", "true", "gutterSize", "5", 1, "adev-right-side"], [3, "size", "order"], [1, "adev-editor-tabs-and-refresh", 3, "size", "order"], ["animationDuration", "0ms", "mat-stretch-tabs", "false", 1, "adev-editor-tabs"], ["label", "Preview"], ["label", "Console"], ["mat-tab-label", ""], [1, "docs-tutorial-terminal", 3, "type"], ["label", "Terminal"], ["type", "button", "title", "Refresh the preview", 1, "adev-refresh-btn", 3, "disabled", "click"], [1, "docs-icon"], [1, "adev-preview-section"], [1, "adev-preview-header"], [1, "docs-icon_high-contrast"]], template: function EmbeddedEditor_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0, 1)(2, "as-split", 2)(3, "as-split-area", 3);
        i0.ɵɵtemplate(4, EmbeddedEditor_Conditional_4_Template, 1, 0, "docs-tutorial-code-editor", 4)(5, EmbeddedEditor_Conditional_5_Template, 1, 1, "docs-tutorial-terminal", 5);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "as-split-area", 6);
        i0.ɵɵtemplate(7, EmbeddedEditor_Conditional_7_Template, 13, 7, "as-split", 7);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("direction", ctx.splitDirection);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("size", 50);
        i0.ɵɵadvance(1);
        i0.ɵɵconditional(4, !ctx.displayOnlyTerminal() ? 4 : -1);
        i0.ɵɵadvance(1);
        i0.ɵɵconditional(5, ctx.displayOnlyTerminal() ? 5 : -1);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("size", 50);
        i0.ɵɵadvance(1);
        i0.ɵɵconditional(7, !ctx.displayOnlyTerminal() ? 7 : -1);
    } }, dependencies: [AngularSplitModule, i1.SplitComponent, i1.SplitAreaDirective, CodeEditor, Preview, Terminal, MatTabsModule, i2.MatTabLabel, i2.MatTab, i2.MatTabGroup, IconComponent], styles: ["as-split[_ngcontent-%COMP%]     .as-split-gutter{flex-basis:5px !important;background-color:inherit !important;position:relative}as-split.as-horizontal.adev-editor[_ngcontent-%COMP%]     .as-split-gutter{border-inline:1px solid var(--senary-contrast) !important}as-split.as-vertical.adev-editor[_ngcontent-%COMP%]     .as-split-gutter{border-block-start:1px solid var(--senary-contrast) !important}as-split.as-vertical.adev-right-side[_ngcontent-%COMP%]     .as-split-gutter{border-block-start:1px solid var(--senary-contrast) !important}.adev-editor-container[_ngcontent-%COMP%]{container-type:size;container-name:embedded-editor;height:100%;position:relative}.adev-editor[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:stretch;border:1px solid var(--senary-contrast);transition:border-color .3s ease;border-radius:.25rem;overflow:hidden;height:100%}@container embedded-editor (min-width: $width-breakpoint){.adev-editor[_ngcontent-%COMP%]{flex-direction:row}}@container embedded-editor (max-width: $width-breakpoint){.adev-editor[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]{height:50%}}.adev-editor[_ngcontent-%COMP%]:has(.adev-editor-tabs)   .adev-tutorial-code-editor[_ngcontent-%COMP%]{display:block;box-sizing:border-box;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-editor[_ngcontent-%COMP%]:has(.adev-editor-tabs)   .adev-tutorial-code-editor[_ngcontent-%COMP%]{border-inline-end:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-editor[_ngcontent-%COMP%]:has(.adev-editor-tabs)   .adev-tutorial-code-editor[_ngcontent-%COMP%]{border-block-end:1px solid var(--senary-contrast)}}.adev-tutorial-code-editor[_ngcontent-%COMP%]{width:100%;height:100%}.adev-right-side[_ngcontent-%COMP%]{height:100%;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-right-side[_ngcontent-%COMP%]{border-inline-start:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-right-side[_ngcontent-%COMP%]{border-block-start:1px solid var(--senary-contrast)}}.adev-editor-tabs-and-refresh[_ngcontent-%COMP%]{position:relative;height:100%;transition:border-color 0s;border-block-start:1px solid var(--senary-contrast)}.adev-editor-tabs[_ngcontent-%COMP%]{height:100%;display:block}.adev-refresh-btn[_ngcontent-%COMP%]{position:absolute;top:0;right:0;height:48px;width:46px;display:flex;align-items:center;flex-grow:1;border-inline-start:1px solid var(--senary-contrast);background:var(--octonary-contrast);z-index:var(--z-index-content)}.adev-refresh-btn[_ngcontent-%COMP%]   docs-icon[_ngcontent-%COMP%]{color:var(--gray-400);margin:auto;font-size:1.3rem;transition:color .3s ease}.adev-refresh-btn[_ngcontent-%COMP%]:hover   docs-icon[_ngcontent-%COMP%]{color:var(--primary-contrast)}.adev-refresh-btn[_ngcontent-%COMP%]:disabled   docs-icon[_ngcontent-%COMP%]{color:var(--gray-400)}.adev-console-section[_ngcontent-%COMP%]{display:block}.adev-preview-section[_ngcontent-%COMP%]{height:100%;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-preview-section[_ngcontent-%COMP%]{border-block-end:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-preview-section[_ngcontent-%COMP%]{border-block-start:1px solid var(--senary-contrast)}}.adev-preview-header[_ngcontent-%COMP%]{border-block-end:1px solid var(--senary-contrast);font-size:.875rem;padding:.98rem 1.25rem;display:flex;align-items:center;background-color:var(--octonary-contrast);transition:background-color .3s ease,border-color .3s ease}.adev-preview-header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--bright-blue);margin-inline-start:.5rem;margin-inline-end:.25rem;font-size:1.25rem}.adev-preview-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--primary-contrast)}.adev-alert[_ngcontent-%COMP%]{position:absolute;inset:0;border-radius:.25rem;display:flex;justify-content:center;align-items:center;background-color:color-mix(var(--page-background) 50%, transparent);backdrop-filter:blur(3px);height:100%;width:100%;z-index:100}.adev-alert[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-block:0}.adev-alert[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-block-end:1rem}.adev-alert[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-width:300px;border:1px solid var(--quinary-contrast);border-radius:.25rem;background-color:color-mix(in srgb, var(--page-background) 90%, transparent);padding:1.5rem}.adev-alert[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{align-self:flex-end}/*# sourceMappingURL=embedded-editor.component.css.map */"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmbeddedEditor, [{
        type: Component,
        args: [{ standalone: true, selector: EMBEDDED_EDITOR_SELECTOR, imports: [AngularSplitModule, CodeEditor, Preview, Terminal, NgIf, MatTabsModule, IconComponent], providers: [EditorUiState], template: "<div class=\"adev-editor-container\" #editorContainer>\n  <as-split class=\"adev-editor\" [direction]=\"splitDirection\" restrictMove=\"true\" gutterSize=\"5\">\n    <as-split-area class=\"adev-left-side\" [size]=\"50\">\n      <!-- Code Editor -->\n      @if (!displayOnlyTerminal()) {\n      <docs-tutorial-code-editor class=\"adev-tutorial-code-editor\" />\n      }\n\n      <!-- CLI Terminal -->\n      @if (displayOnlyTerminal()) {\n      <docs-tutorial-terminal\n        class=\"docs-tutorial-terminal-only\"\n        [type]=\"TerminalType.INTERACTIVE\"\n      />\n      }\n    </as-split-area>\n\n    <as-split-area [size]=\"50\">\n      <!-- Preview, Termnial & Console -->\n      @if (!displayOnlyTerminal()) {\n      <as-split class=\"adev-right-side\" direction=\"vertical\" restrictMove=\"true\" gutterSize=\"5\">\n        <!-- Preview Section: for larger screens -->\n        @if (!displayPreviewInMatTabGroup()) {\n        <as-split-area [size]=\"50\" [order]=\"1\">\n          <!-- Preview Section: for larger screens -->\n          <div class=\"adev-preview-section\">\n            <div class=\"adev-preview-header\">\n              <span>Preview</span>\n            </div>\n            @if (!displayPreviewInMatTabGroup()) {\n            <docs-tutorial-preview />\n            }\n          </div>\n        </as-split-area>\n        }\n\n        <as-split-area class=\"adev-editor-tabs-and-refresh\" [size]=\"50\" [order]=\"2\">\n          <!-- Container to hide preview, console and footer when only the interactive terminal is used  -->\n          <mat-tab-group class=\"adev-editor-tabs\" animationDuration=\"0ms\" mat-stretch-tabs=\"false\">\n            @if (displayPreviewInMatTabGroup()) {\n            <mat-tab label=\"Preview\">\n              <docs-tutorial-preview />\n            </mat-tab>\n            }\n            <mat-tab label=\"Console\">\n              <ng-template mat-tab-label>\n                Console @if (errorsCount()) {\n                <docs-icon class=\"docs-icon_high-contrast\">error</docs-icon>\n                <span>\n                  {{ errorsCount() }}\n                </span>\n                }\n              </ng-template>\n              <docs-tutorial-terminal\n                [type]=\"TerminalType.READONLY\"\n                class=\"docs-tutorial-terminal\"\n              />\n            </mat-tab>\n            <mat-tab label=\"Terminal\">\n              <docs-tutorial-terminal\n                [type]=\"TerminalType.INTERACTIVE\"\n                class=\"docs-tutorial-terminal\"\n              />\n            </mat-tab>\n          </mat-tab-group>\n\n          <button\n            type=\"button\"\n            (click)=\"reset()\"\n            title=\"Refresh the preview\"\n            [disabled]=\"!shouldEnableReset()\"\n            class=\"adev-refresh-btn\"\n          >\n            <docs-icon class=\"docs-icon\">refresh</docs-icon>\n          </button>\n        </as-split-area>\n      </as-split>\n      }\n    </as-split-area>\n  </as-split>\n</div>\n", styles: ["as-split ::ng-deep .as-split-gutter{flex-basis:5px !important;background-color:inherit !important;position:relative}as-split.as-horizontal.adev-editor ::ng-deep .as-split-gutter{border-inline:1px solid var(--senary-contrast) !important}as-split.as-vertical.adev-editor ::ng-deep .as-split-gutter{border-block-start:1px solid var(--senary-contrast) !important}as-split.as-vertical.adev-right-side ::ng-deep .as-split-gutter{border-block-start:1px solid var(--senary-contrast) !important}.adev-editor-container{container-type:size;container-name:embedded-editor;height:100%;position:relative}.adev-editor{display:flex;flex-direction:column;align-items:stretch;border:1px solid var(--senary-contrast);transition:border-color .3s ease;border-radius:.25rem;overflow:hidden;height:100%}@container embedded-editor (min-width: $width-breakpoint){.adev-editor{flex-direction:row}}@container embedded-editor (max-width: $width-breakpoint){.adev-editor>div{height:50%}}.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{display:block;box-sizing:border-box;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{border-inline-end:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{border-block-end:1px solid var(--senary-contrast)}}.adev-tutorial-code-editor{width:100%;height:100%}.adev-right-side{height:100%;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-right-side{border-inline-start:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-right-side{border-block-start:1px solid var(--senary-contrast)}}.adev-editor-tabs-and-refresh{position:relative;height:100%;transition:border-color 0s;border-block-start:1px solid var(--senary-contrast)}.adev-editor-tabs{height:100%;display:block}.adev-refresh-btn{position:absolute;top:0;right:0;height:48px;width:46px;display:flex;align-items:center;flex-grow:1;border-inline-start:1px solid var(--senary-contrast);background:var(--octonary-contrast);z-index:var(--z-index-content)}.adev-refresh-btn docs-icon{color:var(--gray-400);margin:auto;font-size:1.3rem;transition:color .3s ease}.adev-refresh-btn:hover docs-icon{color:var(--primary-contrast)}.adev-refresh-btn:disabled docs-icon{color:var(--gray-400)}.adev-console-section{display:block}.adev-preview-section{height:100%;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-preview-section{border-block-end:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-preview-section{border-block-start:1px solid var(--senary-contrast)}}.adev-preview-header{border-block-end:1px solid var(--senary-contrast);font-size:.875rem;padding:.98rem 1.25rem;display:flex;align-items:center;background-color:var(--octonary-contrast);transition:background-color .3s ease,border-color .3s ease}.adev-preview-header i{color:var(--bright-blue);margin-inline-start:.5rem;margin-inline-end:.25rem;font-size:1.25rem}.adev-preview-header span{color:var(--primary-contrast)}.adev-alert{position:absolute;inset:0;border-radius:.25rem;display:flex;justify-content:center;align-items:center;background-color:color-mix(var(--page-background) 50%, transparent);backdrop-filter:blur(3px);height:100%;width:100%;z-index:100}.adev-alert h2{margin-block:0}.adev-alert p{margin-block-end:1rem}.adev-alert div{display:flex;flex-direction:column;max-width:300px;border:1px solid var(--quinary-contrast);border-radius:.25rem;background-color:color-mix(in srgb, var(--page-background) 90%, transparent);padding:1.5rem}.adev-alert div button{align-self:flex-end}/*# sourceMappingURL=embedded-editor.component.css.map */\n"] }]
    }], null, { editorContainer: [{
            type: ViewChild,
            args: ['editorContainer']
        }], matTabGroup: [{
            type: ViewChild,
            args: [MatTabGroup]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmbeddedEditor, { className: "EmbeddedEditor", filePath: "docs/editor/embedded-editor.component.ts", lineNumber: 54 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWRkZWQtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL2VtYmVkZGVkLWVkaXRvci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9lbWJlZGRlZC1lZGl0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBR1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUUsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxXQUFXLEVBQUUsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUvQyxPQUFPLEVBQUMsdUNBQXVDLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQ3JGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFDdkUsT0FBTyxFQUFDLGtCQUFr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RUMsNkVBQUE7UUFTSCxpQkFBZ0I7UUFFaEIsd0NBQTJCO1FBRXpCLDZFQTBEQztRQUNILGlCQUFnQixFQUFBLEVBQUE7O1FBN0VZLGVBQTRCO1FBQTVCLDhDQUE0QjtRQUNsQixlQUFXO1FBQVgseUJBQVc7UUFFL0MsZUFFQztRQUZELHdEQUVDO1FBR0QsZUFLQztRQUxELHVEQUtDO1FBR1ksZUFBVztRQUFYLHlCQUFXO1FBRXhCLGVBMERDO1FBMURELHdEQTBEQzt3QkQzQkssa0JBQWtCLDRDQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFRLGFBQWEsNkNBQUUsYUFBYTtpRkFHcEYsY0FBYztjQVIxQixTQUFTOzZCQUNJLElBQUksWUFDTix3QkFBd0IsV0FHekIsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxhQUNyRixDQUFDLGFBQWEsQ0FBQztnQkFHSSxlQUFlO2tCQUE1QyxTQUFTO21CQUFDLGlCQUFpQjtZQUNKLFdBQVc7a0JBQWxDLFNBQVM7bUJBQUMsV0FBVzs7a0ZBRlgsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ0lmLCBpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERlc3Ryb3lSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBQTEFURk9STV9JRCxcbiAgVmlld0NoaWxkLFxuICBjb21wdXRlZCxcbiAgaW5qZWN0LFxuICBzaWduYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWQsIHRvT2JzZXJ2YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtJY29uQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2ljb24vaWNvbi5jb21wb25lbnQuanMnO1xuaW1wb3J0IHtNYXRUYWJHcm91cCwgTWF0VGFic01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge01BWF9SRUNPTU1FTkRFRF9XRUJDT05UQUlORVJTX0lOU1RBTkNFU30gZnJvbSAnLi9zZXJ2aWNlcy9hbGVydC1tYW5hZ2VyLnNlcnZpY2UuanMnO1xuXG5pbXBvcnQge0FuZ3VsYXJTcGxpdE1vZHVsZX0gZnJvbSAnYW5ndWxhci1zcGxpdCc7XG5pbXBvcnQge0NvZGVFZGl0b3J9IGZyb20gJy4vY29kZS1lZGl0b3IvY29kZS1lZGl0b3IuY29tcG9uZW50LmpzJztcbmltcG9ydCB7RGlhZ25vc3RpY3NTdGF0ZX0gZnJvbSAnLi9jb2RlLWVkaXRvci9zZXJ2aWNlcy9kaWFnbm9zdGljcy1zdGF0ZS5zZXJ2aWNlLmpzJztcbmltcG9ydCB7RWRpdG9yVWlTdGF0ZX0gZnJvbSAnLi9zZXJ2aWNlcy9lZGl0b3ItdWktc3RhdGUuc2VydmljZS5qcyc7XG5pbXBvcnQge0xvYWRpbmdTdGVwfSBmcm9tICcuL3NlcnZpY2VzL25vZGUtcnVudGltZS1zYW5kYm94LnNlcnZpY2UuanMnO1xuaW1wb3J0IHtOb2RlUnVudGltZVNhbmRib3h9IGZyb20gJy4vc2VydmljZXMvbm9kZS1ydW50aW1lLXNhbmRib3guc2VydmljZS5qcyc7XG5pbXBvcnQge05vZGVSdW50aW1lU3RhdGV9IGZyb20gJy4vc2VydmljZXMvbm9kZS1ydW50aW1lLXN0YXRlLnNlcnZpY2UuanMnO1xuaW1wb3J0IHtQcmV2aWV3fSBmcm9tICcuL3ByZXZpZXcvcHJldmlldy5jb21wb25lbnQuanMnO1xuaW1wb3J0IHtUZXJtaW5hbFR5cGV9IGZyb20gJy4vc2VydmljZXMvdGVybWluYWwtaGFuZGxlci5zZXJ2aWNlLmpzJztcbmltcG9ydCB7VGVybWluYWx9IGZyb20gJy4vdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50LmpzJztcblxuZXhwb3J0IGNvbnN0IEVNQkVEREVEX0VESVRPUl9TRUxFQ1RPUiA9ICdlbWJlZGRlZC1lZGl0b3InO1xuZXhwb3J0IGNvbnN0IExBUkdFX0VESVRPUl9XSURUSF9CUkVBS1BPSU5UID0gOTUwO1xuZXhwb3J0IGNvbnN0IExBUkdFX0VESVRPUl9IRUlHSFRfQlJFQUtQT0lOVCA9IDU1MDtcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiBFTUJFRERFRF9FRElUT1JfU0VMRUNUT1IsXG4gIHRlbXBsYXRlVXJsOiAnLi9lbWJlZGRlZC1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lbWJlZGRlZC1lZGl0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgaW1wb3J0czogW0FuZ3VsYXJTcGxpdE1vZHVsZSwgQ29kZUVkaXRvciwgUHJldmlldywgVGVybWluYWwsIE5nSWYsIE1hdFRhYnNNb2R1bGUsIEljb25Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtFZGl0b3JVaVN0YXRlXSxcbn0pXG5leHBvcnQgY2xhc3MgRW1iZWRkZWRFZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2VkaXRvckNvbnRhaW5lcicpIGVkaXRvckNvbnRhaW5lciE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKE1hdFRhYkdyb3VwKSBtYXRUYWJHcm91cCE6IE1hdFRhYkdyb3VwO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZCA9IGluamVjdChQTEFURk9STV9JRCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3IgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkaWFnbm9zdGljc1N0YXRlID0gaW5qZWN0KERpYWdub3N0aWNzU3RhdGUpO1xuICBwcml2YXRlIHJlYWRvbmx5IGVkaXRvclVpU3RhdGUgPSBpbmplY3QoRWRpdG9yVWlTdGF0ZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbm9kZVJ1bnRpbWVTdGF0ZSA9IGluamVjdChOb2RlUnVudGltZVN0YXRlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlUnVudGltZVNhbmRib3ggPSBpbmplY3QoTm9kZVJ1bnRpbWVTYW5kYm94KTtcblxuICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXI7XG5cbiAgcHJvdGVjdGVkIHNwbGl0RGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ3ZlcnRpY2FsJztcblxuICByZWFkb25seSBNQVhfUkVDT01NRU5ERURfV0VCQ09OVEFJTkVSU19JTlNUQU5DRVMgPSBNQVhfUkVDT01NRU5ERURfV0VCQ09OVEFJTkVSU19JTlNUQU5DRVM7XG5cbiAgcmVhZG9ubHkgVGVybWluYWxUeXBlID0gVGVybWluYWxUeXBlO1xuICByZWFkb25seSBkaXNwbGF5T25seVRlcm1pbmFsID0gY29tcHV0ZWQoXG4gICAgKCkgPT4gdGhpcy5lZGl0b3JVaVN0YXRlLnVpU3RhdGUoKS5kaXNwbGF5T25seUludGVyYWN0aXZlVGVybWluYWwsXG4gICk7XG4gIHJlYWRvbmx5IGVycm9yc0NvdW50ID0gc2lnbmFsPG51bWJlcj4oMCk7XG4gIHJlYWRvbmx5IGRpc3BsYXlQcmV2aWV3SW5NYXRUYWJHcm91cCA9IHNpZ25hbDxib29sZWFuPih0cnVlKTtcblxuICByZWFkb25seSBzaG91bGRFbmFibGVSZXNldCA9IGNvbXB1dGVkKFxuICAgICgpID0+XG4gICAgICB0aGlzLm5vZGVSdW50aW1lU3RhdGUubG9hZGluZ1N0ZXAoKSA+IExvYWRpbmdTdGVwLkJPT1QgJiZcbiAgICAgICF0aGlzLm5vZGVSdW50aW1lU3RhdGUuaXNSZXNldHRpbmcoKSxcbiAgKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGVycm9yc0NvdW50JCA9IHRoaXMuZGlhZ25vc3RpY3NTdGF0ZS5kaWFnbm9zdGljcyQucGlwZShcbiAgICBtYXAoKGRpYWdub3N0aWNzSXRlbSkgPT4gZGlhZ25vc3RpY3NJdGVtLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5zZXZlcml0eSA9PT0gJ2Vycm9yJykubGVuZ3RoKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICApO1xuICBwcml2YXRlIHJlYWRvbmx5IGRpc3BsYXlQcmV2aWV3SW5NYXRUYWJHcm91cCQgPSB0b09ic2VydmFibGUoXG4gICAgdGhpcy5kaXNwbGF5UHJldmlld0luTWF0VGFiR3JvdXAsXG4gICkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5Ub0Vycm9yc0NvdW50KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuc2V0Rmlyc3RUYWJBc0FjdGl2ZUFmdGVyUmVzaXplKCk7XG5cbiAgICAgIHRoaXMuc2V0UmVzaXplT2JzZXJ2ZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBzZXRWaXNpYmxlRW1iZWRkZWRFZGl0b3JUYWJzKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheVByZXZpZXdJbk1hdFRhYkdyb3VwLnNldCghdGhpcy5pc0xhcmdlRW1iZWRkZWRFZGl0b3IoKSk7XG4gIH1cblxuICBhc3luYyByZXNldCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm5vZGVSdW50aW1lU2FuZGJveC5yZXNldCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGaXJzdFRhYkFzQWN0aXZlQWZ0ZXJSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5UHJldmlld0luTWF0VGFiR3JvdXAkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMubWF0VGFiR3JvdXAuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvRXJyb3JzQ291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5lcnJvcnNDb3VudCQuc3Vic2NyaWJlKChlcnJvcnNDb3VudCkgPT4ge1xuICAgICAgdGhpcy5lcnJvcnNDb3VudC5zZXQoZXJyb3JzQ291bnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gTGlzdGVuIHRvIHJlc2l6aW5nIG9mIEVtYmVkZGVkIEVkaXRvciBhbmQgc2V0IHByb3BlciBsaXN0IG9mIHRoZSB0YWJzIGZvciB0aGUgY3VycmVudCByZXNvbHV0aW9uLlxuICBwcml2YXRlIHNldFJlc2l6ZU9ic2VydmVyKCkge1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcbiAgICAgIHRoaXMuc2V0VmlzaWJsZUVtYmVkZGVkRWRpdG9yVGFicygpO1xuXG4gICAgICB0aGlzLnNwbGl0RGlyZWN0aW9uID0gdGhpcy5pc0xhcmdlRW1iZWRkZWRFZGl0b3IoKSA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGlzTGFyZ2VFbWJlZGRlZEVkaXRvcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBlZGl0b3JDb250YWluZXIgPSB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHdpZHRoID0gZWRpdG9yQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IGVkaXRvckNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG5cbiAgICByZXR1cm4gd2lkdGggPiBMQVJHRV9FRElUT1JfV0lEVEhfQlJFQUtQT0lOVCAmJiBoZWlnaHQgPiBMQVJHRV9FRElUT1JfSEVJR0hUX0JSRUFLUE9JTlQ7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhZGV2LWVkaXRvci1jb250YWluZXJcIiAjZWRpdG9yQ29udGFpbmVyPlxuICA8YXMtc3BsaXQgY2xhc3M9XCJhZGV2LWVkaXRvclwiIFtkaXJlY3Rpb25dPVwic3BsaXREaXJlY3Rpb25cIiByZXN0cmljdE1vdmU9XCJ0cnVlXCIgZ3V0dGVyU2l6ZT1cIjVcIj5cbiAgICA8YXMtc3BsaXQtYXJlYSBjbGFzcz1cImFkZXYtbGVmdC1zaWRlXCIgW3NpemVdPVwiNTBcIj5cbiAgICAgIDwhLS0gQ29kZSBFZGl0b3IgLS0+XG4gICAgICBAaWYgKCFkaXNwbGF5T25seVRlcm1pbmFsKCkpIHtcbiAgICAgIDxkb2NzLXR1dG9yaWFsLWNvZGUtZWRpdG9yIGNsYXNzPVwiYWRldi10dXRvcmlhbC1jb2RlLWVkaXRvclwiIC8+XG4gICAgICB9XG5cbiAgICAgIDwhLS0gQ0xJIFRlcm1pbmFsIC0tPlxuICAgICAgQGlmIChkaXNwbGF5T25seVRlcm1pbmFsKCkpIHtcbiAgICAgIDxkb2NzLXR1dG9yaWFsLXRlcm1pbmFsXG4gICAgICAgIGNsYXNzPVwiZG9jcy10dXRvcmlhbC10ZXJtaW5hbC1vbmx5XCJcbiAgICAgICAgW3R5cGVdPVwiVGVybWluYWxUeXBlLklOVEVSQUNUSVZFXCJcbiAgICAgIC8+XG4gICAgICB9XG4gICAgPC9hcy1zcGxpdC1hcmVhPlxuXG4gICAgPGFzLXNwbGl0LWFyZWEgW3NpemVdPVwiNTBcIj5cbiAgICAgIDwhLS0gUHJldmlldywgVGVybW5pYWwgJiBDb25zb2xlIC0tPlxuICAgICAgQGlmICghZGlzcGxheU9ubHlUZXJtaW5hbCgpKSB7XG4gICAgICA8YXMtc3BsaXQgY2xhc3M9XCJhZGV2LXJpZ2h0LXNpZGVcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIHJlc3RyaWN0TW92ZT1cInRydWVcIiBndXR0ZXJTaXplPVwiNVwiPlxuICAgICAgICA8IS0tIFByZXZpZXcgU2VjdGlvbjogZm9yIGxhcmdlciBzY3JlZW5zIC0tPlxuICAgICAgICBAaWYgKCFkaXNwbGF5UHJldmlld0luTWF0VGFiR3JvdXAoKSkge1xuICAgICAgICA8YXMtc3BsaXQtYXJlYSBbc2l6ZV09XCI1MFwiIFtvcmRlcl09XCIxXCI+XG4gICAgICAgICAgPCEtLSBQcmV2aWV3IFNlY3Rpb246IGZvciBsYXJnZXIgc2NyZWVucyAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRldi1wcmV2aWV3LXNlY3Rpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZGV2LXByZXZpZXctaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxzcGFuPlByZXZpZXc8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIEBpZiAoIWRpc3BsYXlQcmV2aWV3SW5NYXRUYWJHcm91cCgpKSB7XG4gICAgICAgICAgICA8ZG9jcy10dXRvcmlhbC1wcmV2aWV3IC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYXMtc3BsaXQtYXJlYT5cbiAgICAgICAgfVxuXG4gICAgICAgIDxhcy1zcGxpdC1hcmVhIGNsYXNzPVwiYWRldi1lZGl0b3ItdGFicy1hbmQtcmVmcmVzaFwiIFtzaXplXT1cIjUwXCIgW29yZGVyXT1cIjJcIj5cbiAgICAgICAgICA8IS0tIENvbnRhaW5lciB0byBoaWRlIHByZXZpZXcsIGNvbnNvbGUgYW5kIGZvb3RlciB3aGVuIG9ubHkgdGhlIGludGVyYWN0aXZlIHRlcm1pbmFsIGlzIHVzZWQgIC0tPlxuICAgICAgICAgIDxtYXQtdGFiLWdyb3VwIGNsYXNzPVwiYWRldi1lZGl0b3ItdGFic1wiIGFuaW1hdGlvbkR1cmF0aW9uPVwiMG1zXCIgbWF0LXN0cmV0Y2gtdGFicz1cImZhbHNlXCI+XG4gICAgICAgICAgICBAaWYgKGRpc3BsYXlQcmV2aWV3SW5NYXRUYWJHcm91cCgpKSB7XG4gICAgICAgICAgICA8bWF0LXRhYiBsYWJlbD1cIlByZXZpZXdcIj5cbiAgICAgICAgICAgICAgPGRvY3MtdHV0b3JpYWwtcHJldmlldyAvPlxuICAgICAgICAgICAgPC9tYXQtdGFiPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPG1hdC10YWIgbGFiZWw9XCJDb25zb2xlXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBtYXQtdGFiLWxhYmVsPlxuICAgICAgICAgICAgICAgIENvbnNvbGUgQGlmIChlcnJvcnNDb3VudCgpKSB7XG4gICAgICAgICAgICAgICAgPGRvY3MtaWNvbiBjbGFzcz1cImRvY3MtaWNvbl9oaWdoLWNvbnRyYXN0XCI+ZXJyb3I8L2RvY3MtaWNvbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHt7IGVycm9yc0NvdW50KCkgfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICA8ZG9jcy10dXRvcmlhbC10ZXJtaW5hbFxuICAgICAgICAgICAgICAgIFt0eXBlXT1cIlRlcm1pbmFsVHlwZS5SRUFET05MWVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkb2NzLXR1dG9yaWFsLXRlcm1pbmFsXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbWF0LXRhYj5cbiAgICAgICAgICAgIDxtYXQtdGFiIGxhYmVsPVwiVGVybWluYWxcIj5cbiAgICAgICAgICAgICAgPGRvY3MtdHV0b3JpYWwtdGVybWluYWxcbiAgICAgICAgICAgICAgICBbdHlwZV09XCJUZXJtaW5hbFR5cGUuSU5URVJBQ1RJVkVcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZG9jcy10dXRvcmlhbC10ZXJtaW5hbFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L21hdC10YWI+XG4gICAgICAgICAgPC9tYXQtdGFiLWdyb3VwPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAoY2xpY2spPVwicmVzZXQoKVwiXG4gICAgICAgICAgICB0aXRsZT1cIlJlZnJlc2ggdGhlIHByZXZpZXdcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFzaG91bGRFbmFibGVSZXNldCgpXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWRldi1yZWZyZXNoLWJ0blwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRvY3MtaWNvbiBjbGFzcz1cImRvY3MtaWNvblwiPnJlZnJlc2g8L2RvY3MtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9hcy1zcGxpdC1hcmVhPlxuICAgICAgPC9hcy1zcGxpdD5cbiAgICAgIH1cbiAgICA8L2FzLXNwbGl0LWFyZWE+XG4gIDwvYXMtc3BsaXQ+XG48L2Rpdj5cbiJdfQ==