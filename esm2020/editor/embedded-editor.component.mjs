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
import { IconComponent } from '../components/icon/icon.component';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { distinctUntilChanged, map } from 'rxjs';
import { MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES } from './services/alert-manager.service';
import { AngularSplitModule } from 'angular-split';
import { CodeEditor } from './code-editor/code-editor.component';
import { DiagnosticsState } from './code-editor/services/diagnostics-state.service';
import { EditorUiState } from './services/editor-ui-state.service';
import { LoadingStep } from './services/node-runtime-sandbox.service';
import { NodeRuntimeSandbox } from './services/node-runtime-sandbox.service';
import { NodeRuntimeState } from './services/node-runtime-state.service';
import { Preview } from './preview/preview.component';
import { TerminalType } from './services/terminal-handler.service';
import { Terminal } from './terminal/terminal.component';
import * as i0 from "@angular/core";
import * as i1 from "angular-split";
import * as i2 from "@angular/material/tabs";
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
EmbeddedEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: EmbeddedEditor, deps: [], target: i0.ɵɵFactoryTarget.Component });
EmbeddedEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.1.0-next.1", type: EmbeddedEditor, isStandalone: true, selector: "embedded-editor", providers: [EditorUiState], viewQueries: [{ propertyName: "editorContainer", first: true, predicate: ["editorContainer"], descendants: true }, { propertyName: "matTabGroup", first: true, predicate: MatTabGroup, descendants: true }], ngImport: i0, template: "<div class=\"adev-editor-container\" #editorContainer>\n  <as-split class=\"adev-editor\" [direction]=\"splitDirection\" restrictMove=\"true\" gutterSize=\"5\">\n    <as-split-area class=\"adev-left-side\" [size]=\"50\">\n      <!-- Code Editor -->\n      @if (!displayOnlyTerminal()) {\n      <docs-tutorial-code-editor class=\"adev-tutorial-code-editor\" />\n      }\n\n      <!-- CLI Terminal -->\n      @if (displayOnlyTerminal()) {\n      <docs-tutorial-terminal\n        class=\"docs-tutorial-terminal-only\"\n        [type]=\"TerminalType.INTERACTIVE\"\n      />\n      }\n    </as-split-area>\n\n    <as-split-area [size]=\"50\">\n      <!-- Preview, Termnial & Console -->\n      @if (!displayOnlyTerminal()) {\n      <as-split class=\"adev-right-side\" direction=\"vertical\" restrictMove=\"true\" gutterSize=\"5\">\n        <!-- Preview Section: for larger screens -->\n        @if (!displayPreviewInMatTabGroup()) {\n        <as-split-area [size]=\"50\" [order]=\"1\">\n          <!-- Preview Section: for larger screens -->\n          <div class=\"adev-preview-section\">\n            <div class=\"adev-preview-header\">\n              <span>Preview</span>\n            </div>\n            @if (!displayPreviewInMatTabGroup()) {\n            <docs-tutorial-preview />\n            }\n          </div>\n        </as-split-area>\n        }\n\n        <as-split-area class=\"adev-editor-tabs-and-refresh\" [size]=\"50\" [order]=\"2\">\n          <!-- Container to hide preview, console and footer when only the interactive terminal is used  -->\n          <mat-tab-group class=\"adev-editor-tabs\" animationDuration=\"0ms\" mat-stretch-tabs=\"false\">\n            @if (displayPreviewInMatTabGroup()) {\n            <mat-tab label=\"Preview\">\n              <docs-tutorial-preview />\n            </mat-tab>\n            }\n            <mat-tab label=\"Console\">\n              <ng-template mat-tab-label>\n                Console @if (errorsCount()) {\n                <docs-icon class=\"docs-icon_high-contrast\">error</docs-icon>\n                <span>\n                  {{ errorsCount() }}\n                </span>\n                }\n              </ng-template>\n              <docs-tutorial-terminal\n                [type]=\"TerminalType.READONLY\"\n                class=\"docs-tutorial-terminal\"\n              />\n            </mat-tab>\n            <mat-tab label=\"Terminal\">\n              <docs-tutorial-terminal\n                [type]=\"TerminalType.INTERACTIVE\"\n                class=\"docs-tutorial-terminal\"\n              />\n            </mat-tab>\n          </mat-tab-group>\n\n          <button\n            type=\"button\"\n            (click)=\"reset()\"\n            title=\"Refresh the preview\"\n            [disabled]=\"!shouldEnableReset()\"\n            class=\"adev-refresh-btn\"\n          >\n            <docs-icon class=\"docs-icon\">refresh</docs-icon>\n          </button>\n        </as-split-area>\n      </as-split>\n      }\n    </as-split-area>\n  </as-split>\n</div>\n", styles: ["as-split ::ng-deep .as-split-gutter{flex-basis:5px !important;background-color:inherit !important;position:relative}as-split.as-horizontal.adev-editor ::ng-deep .as-split-gutter{border-inline:1px solid var(--senary-contrast) !important}as-split.as-vertical.adev-editor ::ng-deep .as-split-gutter{border-block-start:1px solid var(--senary-contrast) !important}as-split.as-vertical.adev-right-side ::ng-deep .as-split-gutter{border-block-start:1px solid var(--senary-contrast) !important}.adev-editor-container{container-type:size;container-name:embedded-editor;height:100%;position:relative}.adev-editor{display:flex;flex-direction:column;align-items:stretch;border:1px solid var(--senary-contrast);transition:border-color .3s ease;border-radius:.25rem;overflow:hidden;height:100%}@container embedded-editor (min-width: $width-breakpoint){.adev-editor{flex-direction:row}}@container embedded-editor (max-width: $width-breakpoint){.adev-editor>div{height:50%}}.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{display:block;box-sizing:border-box;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{border-inline-end:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{border-block-end:1px solid var(--senary-contrast)}}.adev-tutorial-code-editor{width:100%;height:100%}.adev-right-side{height:100%;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-right-side{border-inline-start:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-right-side{border-block-start:1px solid var(--senary-contrast)}}.adev-editor-tabs-and-refresh{position:relative;height:100%;transition:border-color 0s;border-block-start:1px solid var(--senary-contrast)}.adev-editor-tabs{height:100%;display:block}.adev-refresh-btn{position:absolute;top:0;right:0;height:48px;width:46px;display:flex;align-items:center;flex-grow:1;border-inline-start:1px solid var(--senary-contrast);background:var(--octonary-contrast);z-index:var(--z-index-content)}.adev-refresh-btn docs-icon{color:var(--gray-400);margin:auto;font-size:1.3rem;transition:color .3s ease}.adev-refresh-btn:hover docs-icon{color:var(--primary-contrast)}.adev-refresh-btn:disabled docs-icon{color:var(--gray-400)}.adev-console-section{display:block}.adev-preview-section{height:100%;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-preview-section{border-block-end:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-preview-section{border-block-start:1px solid var(--senary-contrast)}}.adev-preview-header{border-block-end:1px solid var(--senary-contrast);font-size:.875rem;padding:.98rem 1.25rem;display:flex;align-items:center;background-color:var(--octonary-contrast);transition:background-color .3s ease,border-color .3s ease}.adev-preview-header i{color:var(--bright-blue);margin-inline-start:.5rem;margin-inline-end:.25rem;font-size:1.25rem}.adev-preview-header span{color:var(--primary-contrast)}.adev-alert{position:absolute;inset:0;border-radius:.25rem;display:flex;justify-content:center;align-items:center;background-color:color-mix(var(--page-background) 50%, transparent);backdrop-filter:blur(3px);height:100%;width:100%;z-index:100}.adev-alert h2{margin-block:0}.adev-alert p{margin-block-end:1rem}.adev-alert div{display:flex;flex-direction:column;max-width:300px;border:1px solid var(--quinary-contrast);border-radius:.25rem;background-color:color-mix(in srgb, var(--page-background) 90%, transparent);padding:1.5rem}.adev-alert div button{align-self:flex-end}/*# sourceMappingURL=embedded-editor.component.css.map */\n"], dependencies: [{ kind: "ngmodule", type: AngularSplitModule }, { kind: "component", type: i1.SplitComponent, selector: "as-split", inputs: ["direction", "unit", "gutterSize", "gutterStep", "restrictMove", "useTransition", "disabled", "dir", "gutterDblClickDuration", "gutterClickDeltaPx", "gutterAriaLabel"], outputs: ["transitionEnd", "dragStart", "dragEnd", "gutterClick", "gutterDblClick"], exportAs: ["asSplit"] }, { kind: "directive", type: i1.SplitAreaDirective, selector: "as-split-area, [as-split-area]", inputs: ["order", "size", "minSize", "maxSize", "lockSize", "visible"], exportAs: ["asSplitArea"] }, { kind: "component", type: CodeEditor, selector: "docs-tutorial-code-editor" }, { kind: "component", type: Preview, selector: "docs-tutorial-preview" }, { kind: "component", type: Terminal, selector: "docs-tutorial-terminal", inputs: ["type"] }, { kind: "ngmodule", type: MatTabsModule }, { kind: "directive", type: i2.MatTabLabel, selector: "[mat-tab-label], [matTabLabel]" }, { kind: "component", type: i2.MatTab, selector: "mat-tab", inputs: ["disabled", "label", "aria-label", "aria-labelledby", "labelClass", "bodyClass"], exportAs: ["matTab"] }, { kind: "component", type: i2.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "fitInkBarToContent", "mat-stretch-tabs", "dynamicHeight", "selectedIndex", "headerPosition", "animationDuration", "contentTabIndex", "disablePagination", "disableRipple", "preserveContent", "backgroundColor"], outputs: ["selectedIndexChange", "focusChange", "animationDone", "selectedTabChange"], exportAs: ["matTabGroup"] }, { kind: "component", type: IconComponent, selector: "docs-icon" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: EmbeddedEditor, decorators: [{
            type: Component,
            args: [{ standalone: true, selector: EMBEDDED_EDITOR_SELECTOR, imports: [AngularSplitModule, CodeEditor, Preview, Terminal, NgIf, MatTabsModule, IconComponent], providers: [EditorUiState], template: "<div class=\"adev-editor-container\" #editorContainer>\n  <as-split class=\"adev-editor\" [direction]=\"splitDirection\" restrictMove=\"true\" gutterSize=\"5\">\n    <as-split-area class=\"adev-left-side\" [size]=\"50\">\n      <!-- Code Editor -->\n      @if (!displayOnlyTerminal()) {\n      <docs-tutorial-code-editor class=\"adev-tutorial-code-editor\" />\n      }\n\n      <!-- CLI Terminal -->\n      @if (displayOnlyTerminal()) {\n      <docs-tutorial-terminal\n        class=\"docs-tutorial-terminal-only\"\n        [type]=\"TerminalType.INTERACTIVE\"\n      />\n      }\n    </as-split-area>\n\n    <as-split-area [size]=\"50\">\n      <!-- Preview, Termnial & Console -->\n      @if (!displayOnlyTerminal()) {\n      <as-split class=\"adev-right-side\" direction=\"vertical\" restrictMove=\"true\" gutterSize=\"5\">\n        <!-- Preview Section: for larger screens -->\n        @if (!displayPreviewInMatTabGroup()) {\n        <as-split-area [size]=\"50\" [order]=\"1\">\n          <!-- Preview Section: for larger screens -->\n          <div class=\"adev-preview-section\">\n            <div class=\"adev-preview-header\">\n              <span>Preview</span>\n            </div>\n            @if (!displayPreviewInMatTabGroup()) {\n            <docs-tutorial-preview />\n            }\n          </div>\n        </as-split-area>\n        }\n\n        <as-split-area class=\"adev-editor-tabs-and-refresh\" [size]=\"50\" [order]=\"2\">\n          <!-- Container to hide preview, console and footer when only the interactive terminal is used  -->\n          <mat-tab-group class=\"adev-editor-tabs\" animationDuration=\"0ms\" mat-stretch-tabs=\"false\">\n            @if (displayPreviewInMatTabGroup()) {\n            <mat-tab label=\"Preview\">\n              <docs-tutorial-preview />\n            </mat-tab>\n            }\n            <mat-tab label=\"Console\">\n              <ng-template mat-tab-label>\n                Console @if (errorsCount()) {\n                <docs-icon class=\"docs-icon_high-contrast\">error</docs-icon>\n                <span>\n                  {{ errorsCount() }}\n                </span>\n                }\n              </ng-template>\n              <docs-tutorial-terminal\n                [type]=\"TerminalType.READONLY\"\n                class=\"docs-tutorial-terminal\"\n              />\n            </mat-tab>\n            <mat-tab label=\"Terminal\">\n              <docs-tutorial-terminal\n                [type]=\"TerminalType.INTERACTIVE\"\n                class=\"docs-tutorial-terminal\"\n              />\n            </mat-tab>\n          </mat-tab-group>\n\n          <button\n            type=\"button\"\n            (click)=\"reset()\"\n            title=\"Refresh the preview\"\n            [disabled]=\"!shouldEnableReset()\"\n            class=\"adev-refresh-btn\"\n          >\n            <docs-icon class=\"docs-icon\">refresh</docs-icon>\n          </button>\n        </as-split-area>\n      </as-split>\n      }\n    </as-split-area>\n  </as-split>\n</div>\n", styles: ["as-split ::ng-deep .as-split-gutter{flex-basis:5px !important;background-color:inherit !important;position:relative}as-split.as-horizontal.adev-editor ::ng-deep .as-split-gutter{border-inline:1px solid var(--senary-contrast) !important}as-split.as-vertical.adev-editor ::ng-deep .as-split-gutter{border-block-start:1px solid var(--senary-contrast) !important}as-split.as-vertical.adev-right-side ::ng-deep .as-split-gutter{border-block-start:1px solid var(--senary-contrast) !important}.adev-editor-container{container-type:size;container-name:embedded-editor;height:100%;position:relative}.adev-editor{display:flex;flex-direction:column;align-items:stretch;border:1px solid var(--senary-contrast);transition:border-color .3s ease;border-radius:.25rem;overflow:hidden;height:100%}@container embedded-editor (min-width: $width-breakpoint){.adev-editor{flex-direction:row}}@container embedded-editor (max-width: $width-breakpoint){.adev-editor>div{height:50%}}.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{display:block;box-sizing:border-box;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{border-inline-end:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-editor:has(.adev-editor-tabs) .adev-tutorial-code-editor{border-block-end:1px solid var(--senary-contrast)}}.adev-tutorial-code-editor{width:100%;height:100%}.adev-right-side{height:100%;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-right-side{border-inline-start:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-right-side{border-block-start:1px solid var(--senary-contrast)}}.adev-editor-tabs-and-refresh{position:relative;height:100%;transition:border-color 0s;border-block-start:1px solid var(--senary-contrast)}.adev-editor-tabs{height:100%;display:block}.adev-refresh-btn{position:absolute;top:0;right:0;height:48px;width:46px;display:flex;align-items:center;flex-grow:1;border-inline-start:1px solid var(--senary-contrast);background:var(--octonary-contrast);z-index:var(--z-index-content)}.adev-refresh-btn docs-icon{color:var(--gray-400);margin:auto;font-size:1.3rem;transition:color .3s ease}.adev-refresh-btn:hover docs-icon{color:var(--primary-contrast)}.adev-refresh-btn:disabled docs-icon{color:var(--gray-400)}.adev-console-section{display:block}.adev-preview-section{height:100%;transition:border-color 0s}@container embedded-editor (min-width: $width-breakpoint){.adev-preview-section{border-block-end:1px solid var(--senary-contrast)}}@container embedded-editor (max-width: $width-breakpoint){.adev-preview-section{border-block-start:1px solid var(--senary-contrast)}}.adev-preview-header{border-block-end:1px solid var(--senary-contrast);font-size:.875rem;padding:.98rem 1.25rem;display:flex;align-items:center;background-color:var(--octonary-contrast);transition:background-color .3s ease,border-color .3s ease}.adev-preview-header i{color:var(--bright-blue);margin-inline-start:.5rem;margin-inline-end:.25rem;font-size:1.25rem}.adev-preview-header span{color:var(--primary-contrast)}.adev-alert{position:absolute;inset:0;border-radius:.25rem;display:flex;justify-content:center;align-items:center;background-color:color-mix(var(--page-background) 50%, transparent);backdrop-filter:blur(3px);height:100%;width:100%;z-index:100}.adev-alert h2{margin-block:0}.adev-alert p{margin-block-end:1rem}.adev-alert div{display:flex;flex-direction:column;max-width:300px;border:1px solid var(--quinary-contrast);border-radius:.25rem;background-color:color-mix(in srgb, var(--page-background) 90%, transparent);padding:1.5rem}.adev-alert div button{align-self:flex-end}/*# sourceMappingURL=embedded-editor.component.css.map */\n"] }]
        }], propDecorators: { editorContainer: [{
                type: ViewChild,
                args: ['editorContainer']
            }], matTabGroup: [{
                type: ViewChild,
                args: [MatTabGroup]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWRkZWQtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL2VtYmVkZGVkLWVkaXRvci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9lbWJlZGRlZC1lZGl0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixVQUFVLEVBR1YsV0FBVyxFQUNYLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsa0JBQWtCLEVBQUUsWUFBWSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDNUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxXQUFXLEVBQUUsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUvQyxPQUFPLEVBQUMsdUNBQXVDLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUV6RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQy9ELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDcEUsT0FBTyxFQUFDLGtCQUFr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QUFLLEdBQUcsNkJBQTZCLElBQUksTUFBTSxHQUFHLDhCQUE4QixDQUFDO0lBQzFGLENBQUM7O2tIQS9GVSxjQUFjO3NHQUFkLGNBQWMsOERBRmQsQ0FBQyxhQUFhLENBQUMsNEtBSWYsV0FBVyxnREN2RHhCLHc5RkFpRkEsbzBIRC9CWSxrQkFBa0Isc2tCQUFFLFVBQVUsc0VBQUUsT0FBTyxrRUFBRSxRQUFRLG9GQUFRLGFBQWEscXNCQUFFLGFBQWE7a0dBR3BGLGNBQWM7a0JBUjFCLFNBQVM7aUNBQ0ksSUFBSSxZQUNOLHdCQUF3QixXQUd6QixDQUFDLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDLGFBQ3JGLENBQUMsYUFBYSxDQUFDOzhCQUdJLGVBQWU7c0JBQTVDLFNBQVM7dUJBQUMsaUJBQWlCO2dCQUNKLFdBQVc7c0JBQWxDLFNBQVM7dUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ0lmLCBpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIERlc3Ryb3lSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBQTEFURk9STV9JRCxcbiAgVmlld0NoaWxkLFxuICBjb21wdXRlZCxcbiAgaW5qZWN0LFxuICBzaWduYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWQsIHRvT2JzZXJ2YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtJY29uQ29tcG9uZW50fSBmcm9tICcuLi9jb21wb25lbnRzL2ljb24vaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtNYXRUYWJHcm91cCwgTWF0VGFic01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQge2Rpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge01BWF9SRUNPTU1FTkRFRF9XRUJDT05UQUlORVJTX0lOU1RBTkNFU30gZnJvbSAnLi9zZXJ2aWNlcy9hbGVydC1tYW5hZ2VyLnNlcnZpY2UnO1xuXG5pbXBvcnQge0FuZ3VsYXJTcGxpdE1vZHVsZX0gZnJvbSAnYW5ndWxhci1zcGxpdCc7XG5pbXBvcnQge0NvZGVFZGl0b3J9IGZyb20gJy4vY29kZS1lZGl0b3IvY29kZS1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7RGlhZ25vc3RpY3NTdGF0ZX0gZnJvbSAnLi9jb2RlLWVkaXRvci9zZXJ2aWNlcy9kaWFnbm9zdGljcy1zdGF0ZS5zZXJ2aWNlJztcbmltcG9ydCB7RWRpdG9yVWlTdGF0ZX0gZnJvbSAnLi9zZXJ2aWNlcy9lZGl0b3ItdWktc3RhdGUuc2VydmljZSc7XG5pbXBvcnQge0xvYWRpbmdTdGVwfSBmcm9tICcuL3NlcnZpY2VzL25vZGUtcnVudGltZS1zYW5kYm94LnNlcnZpY2UnO1xuaW1wb3J0IHtOb2RlUnVudGltZVNhbmRib3h9IGZyb20gJy4vc2VydmljZXMvbm9kZS1ydW50aW1lLXNhbmRib3guc2VydmljZSc7XG5pbXBvcnQge05vZGVSdW50aW1lU3RhdGV9IGZyb20gJy4vc2VydmljZXMvbm9kZS1ydW50aW1lLXN0YXRlLnNlcnZpY2UnO1xuaW1wb3J0IHtQcmV2aWV3fSBmcm9tICcuL3ByZXZpZXcvcHJldmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHtUZXJtaW5hbFR5cGV9IGZyb20gJy4vc2VydmljZXMvdGVybWluYWwtaGFuZGxlci5zZXJ2aWNlJztcbmltcG9ydCB7VGVybWluYWx9IGZyb20gJy4vdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IEVNQkVEREVEX0VESVRPUl9TRUxFQ1RPUiA9ICdlbWJlZGRlZC1lZGl0b3InO1xuZXhwb3J0IGNvbnN0IExBUkdFX0VESVRPUl9XSURUSF9CUkVBS1BPSU5UID0gOTUwO1xuZXhwb3J0IGNvbnN0IExBUkdFX0VESVRPUl9IRUlHSFRfQlJFQUtQT0lOVCA9IDU1MDtcblxuQENvbXBvbmVudCh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiBFTUJFRERFRF9FRElUT1JfU0VMRUNUT1IsXG4gIHRlbXBsYXRlVXJsOiAnLi9lbWJlZGRlZC1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9lbWJlZGRlZC1lZGl0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgaW1wb3J0czogW0FuZ3VsYXJTcGxpdE1vZHVsZSwgQ29kZUVkaXRvciwgUHJldmlldywgVGVybWluYWwsIE5nSWYsIE1hdFRhYnNNb2R1bGUsIEljb25Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtFZGl0b3JVaVN0YXRlXSxcbn0pXG5leHBvcnQgY2xhc3MgRW1iZWRkZWRFZGl0b3IgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2VkaXRvckNvbnRhaW5lcicpIGVkaXRvckNvbnRhaW5lciE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKE1hdFRhYkdyb3VwKSBtYXRUYWJHcm91cCE6IE1hdFRhYkdyb3VwO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZCA9IGluamVjdChQTEFURk9STV9JRCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3IgPSBpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkaWFnbm9zdGljc1N0YXRlID0gaW5qZWN0KERpYWdub3N0aWNzU3RhdGUpO1xuICBwcml2YXRlIHJlYWRvbmx5IGVkaXRvclVpU3RhdGUgPSBpbmplY3QoRWRpdG9yVWlTdGF0ZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbm9kZVJ1bnRpbWVTdGF0ZSA9IGluamVjdChOb2RlUnVudGltZVN0YXRlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBub2RlUnVudGltZVNhbmRib3ggPSBpbmplY3QoTm9kZVJ1bnRpbWVTYW5kYm94KTtcblxuICBwcml2YXRlIHJlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXI7XG5cbiAgcHJvdGVjdGVkIHNwbGl0RGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ3ZlcnRpY2FsJztcblxuICByZWFkb25seSBNQVhfUkVDT01NRU5ERURfV0VCQ09OVEFJTkVSU19JTlNUQU5DRVMgPSBNQVhfUkVDT01NRU5ERURfV0VCQ09OVEFJTkVSU19JTlNUQU5DRVM7XG5cbiAgcmVhZG9ubHkgVGVybWluYWxUeXBlID0gVGVybWluYWxUeXBlO1xuICByZWFkb25seSBkaXNwbGF5T25seVRlcm1pbmFsID0gY29tcHV0ZWQoXG4gICAgKCkgPT4gdGhpcy5lZGl0b3JVaVN0YXRlLnVpU3RhdGUoKS5kaXNwbGF5T25seUludGVyYWN0aXZlVGVybWluYWwsXG4gICk7XG4gIHJlYWRvbmx5IGVycm9yc0NvdW50ID0gc2lnbmFsPG51bWJlcj4oMCk7XG4gIHJlYWRvbmx5IGRpc3BsYXlQcmV2aWV3SW5NYXRUYWJHcm91cCA9IHNpZ25hbDxib29sZWFuPih0cnVlKTtcblxuICByZWFkb25seSBzaG91bGRFbmFibGVSZXNldCA9IGNvbXB1dGVkKFxuICAgICgpID0+XG4gICAgICB0aGlzLm5vZGVSdW50aW1lU3RhdGUubG9hZGluZ1N0ZXAoKSA+IExvYWRpbmdTdGVwLkJPT1QgJiZcbiAgICAgICF0aGlzLm5vZGVSdW50aW1lU3RhdGUuaXNSZXNldHRpbmcoKSxcbiAgKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGVycm9yc0NvdW50JCA9IHRoaXMuZGlhZ25vc3RpY3NTdGF0ZS5kaWFnbm9zdGljcyQucGlwZShcbiAgICBtYXAoKGRpYWdub3N0aWNzSXRlbSkgPT4gZGlhZ25vc3RpY3NJdGVtLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5zZXZlcml0eSA9PT0gJ2Vycm9yJykubGVuZ3RoKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICApO1xuICBwcml2YXRlIHJlYWRvbmx5IGRpc3BsYXlQcmV2aWV3SW5NYXRUYWJHcm91cCQgPSB0b09ic2VydmFibGUoXG4gICAgdGhpcy5kaXNwbGF5UHJldmlld0luTWF0VGFiR3JvdXAsXG4gICkucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5Ub0Vycm9yc0NvdW50KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMuc2V0Rmlyc3RUYWJBc0FjdGl2ZUFmdGVyUmVzaXplKCk7XG5cbiAgICAgIHRoaXMuc2V0UmVzaXplT2JzZXJ2ZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG4gIH1cblxuICBzZXRWaXNpYmxlRW1iZWRkZWRFZGl0b3JUYWJzKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheVByZXZpZXdJbk1hdFRhYkdyb3VwLnNldCghdGhpcy5pc0xhcmdlRW1iZWRkZWRFZGl0b3IoKSk7XG4gIH1cblxuICBhc3luYyByZXNldCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm5vZGVSdW50aW1lU2FuZGJveC5yZXNldCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGaXJzdFRhYkFzQWN0aXZlQWZ0ZXJSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5UHJldmlld0luTWF0VGFiR3JvdXAkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMubWF0VGFiR3JvdXAuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvRXJyb3JzQ291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5lcnJvcnNDb3VudCQuc3Vic2NyaWJlKChlcnJvcnNDb3VudCkgPT4ge1xuICAgICAgdGhpcy5lcnJvcnNDb3VudC5zZXQoZXJyb3JzQ291bnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gTGlzdGVuIHRvIHJlc2l6aW5nIG9mIEVtYmVkZGVkIEVkaXRvciBhbmQgc2V0IHByb3BlciBsaXN0IG9mIHRoZSB0YWJzIGZvciB0aGUgY3VycmVudCByZXNvbHV0aW9uLlxuICBwcml2YXRlIHNldFJlc2l6ZU9ic2VydmVyKCkge1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKF8pID0+IHtcbiAgICAgIHRoaXMuc2V0VmlzaWJsZUVtYmVkZGVkRWRpdG9yVGFicygpO1xuXG4gICAgICB0aGlzLnNwbGl0RGlyZWN0aW9uID0gdGhpcy5pc0xhcmdlRW1iZWRkZWRFZGl0b3IoKSA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lZGl0b3JDb250YWluZXIubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGlzTGFyZ2VFbWJlZGRlZEVkaXRvcigpOiBib29sZWFuIHtcbiAgICBjb25zdCBlZGl0b3JDb250YWluZXIgPSB0aGlzLmVkaXRvckNvbnRhaW5lci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHdpZHRoID0gZWRpdG9yQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IGVkaXRvckNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG5cbiAgICByZXR1cm4gd2lkdGggPiBMQVJHRV9FRElUT1JfV0lEVEhfQlJFQUtQT0lOVCAmJiBoZWlnaHQgPiBMQVJHRV9FRElUT1JfSEVJR0hUX0JSRUFLUE9JTlQ7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhZGV2LWVkaXRvci1jb250YWluZXJcIiAjZWRpdG9yQ29udGFpbmVyPlxuICA8YXMtc3BsaXQgY2xhc3M9XCJhZGV2LWVkaXRvclwiIFtkaXJlY3Rpb25dPVwic3BsaXREaXJlY3Rpb25cIiByZXN0cmljdE1vdmU9XCJ0cnVlXCIgZ3V0dGVyU2l6ZT1cIjVcIj5cbiAgICA8YXMtc3BsaXQtYXJlYSBjbGFzcz1cImFkZXYtbGVmdC1zaWRlXCIgW3NpemVdPVwiNTBcIj5cbiAgICAgIDwhLS0gQ29kZSBFZGl0b3IgLS0+XG4gICAgICBAaWYgKCFkaXNwbGF5T25seVRlcm1pbmFsKCkpIHtcbiAgICAgIDxkb2NzLXR1dG9yaWFsLWNvZGUtZWRpdG9yIGNsYXNzPVwiYWRldi10dXRvcmlhbC1jb2RlLWVkaXRvclwiIC8+XG4gICAgICB9XG5cbiAgICAgIDwhLS0gQ0xJIFRlcm1pbmFsIC0tPlxuICAgICAgQGlmIChkaXNwbGF5T25seVRlcm1pbmFsKCkpIHtcbiAgICAgIDxkb2NzLXR1dG9yaWFsLXRlcm1pbmFsXG4gICAgICAgIGNsYXNzPVwiZG9jcy10dXRvcmlhbC10ZXJtaW5hbC1vbmx5XCJcbiAgICAgICAgW3R5cGVdPVwiVGVybWluYWxUeXBlLklOVEVSQUNUSVZFXCJcbiAgICAgIC8+XG4gICAgICB9XG4gICAgPC9hcy1zcGxpdC1hcmVhPlxuXG4gICAgPGFzLXNwbGl0LWFyZWEgW3NpemVdPVwiNTBcIj5cbiAgICAgIDwhLS0gUHJldmlldywgVGVybW5pYWwgJiBDb25zb2xlIC0tPlxuICAgICAgQGlmICghZGlzcGxheU9ubHlUZXJtaW5hbCgpKSB7XG4gICAgICA8YXMtc3BsaXQgY2xhc3M9XCJhZGV2LXJpZ2h0LXNpZGVcIiBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiIHJlc3RyaWN0TW92ZT1cInRydWVcIiBndXR0ZXJTaXplPVwiNVwiPlxuICAgICAgICA8IS0tIFByZXZpZXcgU2VjdGlvbjogZm9yIGxhcmdlciBzY3JlZW5zIC0tPlxuICAgICAgICBAaWYgKCFkaXNwbGF5UHJldmlld0luTWF0VGFiR3JvdXAoKSkge1xuICAgICAgICA8YXMtc3BsaXQtYXJlYSBbc2l6ZV09XCI1MFwiIFtvcmRlcl09XCIxXCI+XG4gICAgICAgICAgPCEtLSBQcmV2aWV3IFNlY3Rpb246IGZvciBsYXJnZXIgc2NyZWVucyAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRldi1wcmV2aWV3LXNlY3Rpb25cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZGV2LXByZXZpZXctaGVhZGVyXCI+XG4gICAgICAgICAgICAgIDxzcGFuPlByZXZpZXc8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIEBpZiAoIWRpc3BsYXlQcmV2aWV3SW5NYXRUYWJHcm91cCgpKSB7XG4gICAgICAgICAgICA8ZG9jcy10dXRvcmlhbC1wcmV2aWV3IC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYXMtc3BsaXQtYXJlYT5cbiAgICAgICAgfVxuXG4gICAgICAgIDxhcy1zcGxpdC1hcmVhIGNsYXNzPVwiYWRldi1lZGl0b3ItdGFicy1hbmQtcmVmcmVzaFwiIFtzaXplXT1cIjUwXCIgW29yZGVyXT1cIjJcIj5cbiAgICAgICAgICA8IS0tIENvbnRhaW5lciB0byBoaWRlIHByZXZpZXcsIGNvbnNvbGUgYW5kIGZvb3RlciB3aGVuIG9ubHkgdGhlIGludGVyYWN0aXZlIHRlcm1pbmFsIGlzIHVzZWQgIC0tPlxuICAgICAgICAgIDxtYXQtdGFiLWdyb3VwIGNsYXNzPVwiYWRldi1lZGl0b3ItdGFic1wiIGFuaW1hdGlvbkR1cmF0aW9uPVwiMG1zXCIgbWF0LXN0cmV0Y2gtdGFicz1cImZhbHNlXCI+XG4gICAgICAgICAgICBAaWYgKGRpc3BsYXlQcmV2aWV3SW5NYXRUYWJHcm91cCgpKSB7XG4gICAgICAgICAgICA8bWF0LXRhYiBsYWJlbD1cIlByZXZpZXdcIj5cbiAgICAgICAgICAgICAgPGRvY3MtdHV0b3JpYWwtcHJldmlldyAvPlxuICAgICAgICAgICAgPC9tYXQtdGFiPlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPG1hdC10YWIgbGFiZWw9XCJDb25zb2xlXCI+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBtYXQtdGFiLWxhYmVsPlxuICAgICAgICAgICAgICAgIENvbnNvbGUgQGlmIChlcnJvcnNDb3VudCgpKSB7XG4gICAgICAgICAgICAgICAgPGRvY3MtaWNvbiBjbGFzcz1cImRvY3MtaWNvbl9oaWdoLWNvbnRyYXN0XCI+ZXJyb3I8L2RvY3MtaWNvbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHt7IGVycm9yc0NvdW50KCkgfX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICA8ZG9jcy10dXRvcmlhbC10ZXJtaW5hbFxuICAgICAgICAgICAgICAgIFt0eXBlXT1cIlRlcm1pbmFsVHlwZS5SRUFET05MWVwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJkb2NzLXR1dG9yaWFsLXRlcm1pbmFsXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvbWF0LXRhYj5cbiAgICAgICAgICAgIDxtYXQtdGFiIGxhYmVsPVwiVGVybWluYWxcIj5cbiAgICAgICAgICAgICAgPGRvY3MtdHV0b3JpYWwtdGVybWluYWxcbiAgICAgICAgICAgICAgICBbdHlwZV09XCJUZXJtaW5hbFR5cGUuSU5URVJBQ1RJVkVcIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwiZG9jcy10dXRvcmlhbC10ZXJtaW5hbFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L21hdC10YWI+XG4gICAgICAgICAgPC9tYXQtdGFiLWdyb3VwPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAoY2xpY2spPVwicmVzZXQoKVwiXG4gICAgICAgICAgICB0aXRsZT1cIlJlZnJlc2ggdGhlIHByZXZpZXdcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cIiFzaG91bGRFbmFibGVSZXNldCgpXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYWRldi1yZWZyZXNoLWJ0blwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRvY3MtaWNvbiBjbGFzcz1cImRvY3MtaWNvblwiPnJlZnJlc2g8L2RvY3MtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9hcy1zcGxpdC1hcmVhPlxuICAgICAgPC9hcy1zcGxpdD5cbiAgICAgIH1cbiAgICA8L2FzLXNwbGl0LWFyZWE+XG4gIDwvYXMtc3BsaXQ+XG48L2Rpdj5cbiJdfQ==