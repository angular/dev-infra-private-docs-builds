/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild, inject, signal, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { debounceTime, map } from 'rxjs';
import { TerminalType } from '../services/terminal-handler.service.js';
import { EmbeddedTutorialManager } from '../services/embedded-tutorial-manager.service.js';
import { CodeMirrorEditor } from './services/code-mirror-editor.service.js';
import { DiagnosticsState } from './services/diagnostics-state.service.js';
import { DownloadManager } from '../services/download-manager.service.js';
import { IconComponent } from '../../components/icon/icon.component.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/tabs";
const _c0 = ["codeEditorWrapper"];
const _c1 = ["createFileInput"];
function CodeEditor_For_4_ng_template_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function CodeEditor_For_4_ng_template_2_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const file_r4 = i0.ɵɵnextContext(2).$implicit; const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.deleteFile(file_r4.filename)); });
    i0.ɵɵelementStart(1, "docs-icon");
    i0.ɵɵtext(2, "delete");
    i0.ɵɵelementEnd()();
} }
function CodeEditor_For_4_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵtemplate(1, CodeEditor_For_4_ng_template_2_Conditional_1_Template, 3, 0, "button", 10);
} if (rf & 2) {
    const file_r4 = i0.ɵɵnextContext().$implicit;
    const _r9 = i0.ɵɵreference(1);
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", file_r4.filename.replace("src/", ""), " ");
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, _r9.isActive && ctx_r10.canDeleteFile(file_r4.filename) ? 1 : -1);
} }
function CodeEditor_For_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-tab", null, 8);
    i0.ɵɵtemplate(2, CodeEditor_For_4_ng_template_2_Template, 2, 2, "ng-template", 9);
    i0.ɵɵelementEnd();
} }
function CodeEditor_Conditional_5_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 12);
    i0.ɵɵlistener("submit", function CodeEditor_Conditional_5_ng_template_1_Template_form_submit_0_listener($event) { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r18.createFile($event)); });
    i0.ɵɵelementStart(1, "input", 13, 14);
    i0.ɵɵlistener("keydown", function CodeEditor_Conditional_5_ng_template_1_Template_input_keydown_1_listener($event) { return $event.stopPropagation(); });
    i0.ɵɵelementEnd()();
} }
function CodeEditor_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-tab");
    i0.ɵɵtemplate(1, CodeEditor_Conditional_5_ng_template_1_Template, 3, 0, "ng-template", 9);
    i0.ɵɵelementEnd();
} }
function CodeEditor_Conditional_14_For_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const error_r22 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate3("(line: ", error_r22.lineNumber, ":", error_r22.characterPosition, ") ", error_r22.message, "");
} }
function CodeEditor_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "button", 16);
    i0.ɵɵlistener("click", function CodeEditor_Conditional_14_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r28); const ctx_r27 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r27.closeErrorsBox()); });
    i0.ɵɵelementStart(2, "docs-icon", 17);
    i0.ɵɵtext(3, "close");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "ul");
    i0.ɵɵrepeaterCreate(5, CodeEditor_Conditional_14_For_6_Template, 2, 3, "li", null, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵrepeater(ctx_r3.errors());
} }
export const REQUIRED_FILES = new Set(['src/main.ts', 'src/index.html']);
export class CodeEditor {
    constructor() {
        this.destroyRef = inject(DestroyRef);
        this.codeMirrorEditor = inject(CodeMirrorEditor);
        this.diagnosticsState = inject(DiagnosticsState);
        this.downloadManager = inject(DownloadManager);
        this.embeddedTutorialManager = inject(EmbeddedTutorialManager);
        this.errors$ = this.diagnosticsState.diagnostics$.pipe(
        // Display errors one second after code update
        debounceTime(1000), map((diagnosticsItem) => diagnosticsItem
            .filter((item) => item.severity === 'error')
            .sort((a, b) => a.lineNumber != b.lineNumber
            ? a.lineNumber - b.lineNumber
            : a.characterPosition - b.characterPosition)), takeUntilDestroyed(this.destroyRef));
        this.TerminalType = TerminalType;
        this.displayErrorsBox = signal(false);
        this.errors = signal([]);
        this.files = this.codeMirrorEditor.openFiles;
        this.isCreatingFile = signal(false);
    }
    set setFileInputRef(element) {
        if (element) {
            element.nativeElement.focus();
            this.createFileInputRef = element;
        }
    }
    ngAfterViewInit() {
        this.codeMirrorEditor.init(this.codeEditorWrapperRef.nativeElement);
        this.listenToDiagnosticsChange();
        this.listenToTabChange();
        this.setSelectedTabOnTutorialChange();
    }
    ngOnDestroy() {
        this.codeMirrorEditor.disable();
    }
    async downloadCurrentCodeEditorState() {
        const name = this.embeddedTutorialManager.tutorialId();
        await this.downloadManager.downloadCurrentStateOfTheSolution(name);
    }
    closeErrorsBox() {
        this.displayErrorsBox.set(false);
    }
    canDeleteFile(filename) {
        return !REQUIRED_FILES.has(filename);
    }
    async deleteFile(filename) {
        await this.codeMirrorEditor.deleteFile(filename);
        this.matTabGroup.selectedIndex = 0;
    }
    onAddButtonClick() {
        this.isCreatingFile.set(true);
        this.matTabGroup.selectedIndex = this.files().length;
    }
    async createFile(event) {
        if (!this.createFileInputRef)
            return;
        event.preventDefault();
        const newFileInputValue = this.createFileInputRef.nativeElement.value;
        if (newFileInputValue) {
            if (newFileInputValue.includes('..')) {
                alert('File name can not contain ".."');
                return;
            }
            // src is hidden from users, here we manually add it to the new filename
            const newFile = 'src/' + newFileInputValue;
            if (this.files().find(({ filename }) => filename.includes(newFile))) {
                alert('File already exists');
                return;
            }
            await this.codeMirrorEditor.createFile(newFile);
        }
        this.isCreatingFile.set(false);
    }
    listenToDiagnosticsChange() {
        this.errors$.subscribe((diagnostics) => {
            this.errors.set(diagnostics);
            this.displayErrorsBox.set(diagnostics.length > 0);
        });
    }
    setSelectedTabOnTutorialChange() {
        this.embeddedTutorialManager.tutorialChanged$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            // selected file on project change is always the first
            this.matTabGroup.selectedIndex = 0;
        });
    }
    listenToTabChange() {
        this.matTabGroup.selectedIndexChange
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((index) => {
            const selectedFile = this.files()[index];
            if (selectedFile) {
                this.codeMirrorEditor.changeCurrentFile(selectedFile.filename);
            }
        });
    }
}
CodeEditor.ɵfac = function CodeEditor_Factory(t) { return new (t || CodeEditor)(); };
CodeEditor.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CodeEditor, selectors: [["docs-tutorial-code-editor"]], viewQuery: function CodeEditor_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(MatTabGroup, 5);
        i0.ɵɵviewQuery(_c1, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.codeEditorWrapperRef = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.matTabGroup = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.setFileInputRef = _t.first);
    } }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 15, vars: 2, consts: [[1, "adev-code-editor-tabs"], [1, "adev-tabs-and-plus"], ["animationDuration", "0ms", "mat-stretch-tabs", "false"], ["aria-label", "Add a new file", 1, "adev-add-file", 3, "click"], ["type", "button", "aria-label", "Download current code in editor", 1, "adev-editor-download-button", 3, "click"], [1, "adev-code-editor-wrapper"], ["codeEditorWrapper", ""], ["class", "adev-inline-errors-box"], ["tab", ""], ["mat-tab-label", ""], ["class", "adev-delete-file", "aria-label", "Delete file"], ["aria-label", "Delete file", 1, "adev-delete-file", 3, "click"], [3, "submit"], ["name", "new-file", 1, "adev-new-file-input", 3, "keydown"], ["createFileInput", ""], [1, "adev-inline-errors-box"], ["type", "button", 3, "click"], [1, "docs-icon_high-contrast"]], template: function CodeEditor_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "mat-tab-group", 2);
        i0.ɵɵrepeaterCreate(3, CodeEditor_For_4_Template, 3, 0, "mat-tab", null, i0.ɵɵrepeaterTrackByIdentity);
        i0.ɵɵtemplate(5, CodeEditor_Conditional_5_Template, 2, 0, "mat-tab");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "button", 3);
        i0.ɵɵlistener("click", function CodeEditor_Template_button_click_6_listener() { return ctx.onAddButtonClick(); });
        i0.ɵɵelementStart(7, "docs-icon");
        i0.ɵɵtext(8, "add");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(9, "button", 4);
        i0.ɵɵlistener("click", function CodeEditor_Template_button_click_9_listener() { return ctx.downloadCurrentCodeEditorState(); });
        i0.ɵɵelementStart(10, "docs-icon");
        i0.ɵɵtext(11, "download");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelement(12, "div", 5, 6);
        i0.ɵɵtemplate(14, CodeEditor_Conditional_14_Template, 7, 0, "div", 7);
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵrepeater(ctx.files());
        i0.ɵɵadvance(2);
        i0.ɵɵconditional(5, ctx.isCreatingFile() ? 5 : -1);
        i0.ɵɵadvance(9);
        i0.ɵɵconditional(14, ctx.displayErrorsBox() ? 14 : -1);
    } }, dependencies: [MatTabsModule, i1.MatTabLabel, i1.MatTab, i1.MatTabGroup, IconComponent], styles: ["[_nghost-%COMP%]{--code-editor-selection-background: color-mix( in srgb, var(--selection-background) 5%, var(--octonary-contrast) );--code-editor-focused-selection-background: color-mix( in srgb, var(--selection-background) 12%, var(--octonary-contrast) );--code-editor-text-base-color: var(--primary-contrast);--code-editor-tooltip-background: color-mix( in srgb, var(--bright-blue), var(--page-background) 90% );--code-editor-tooltip-color: var(--primary-contrast);--code-editor-tooltip-border: 1px solid color-mix(in srgb, var(--bright-blue), var(--page-background) 70%);--code-editor-tooltip-border-radius: 0.25rem;--code-editor-autocomplete-item-background: var(--senary-contrast);--code-editor-autocomplete-item-color: var(--primary-contrast);--code-name: var(--primary-contrast);--code-editor-cursor-color: var(--code-name);--code-variable-name: var(--bright-blue);--code-property-name: var(--code-name);--code-definition-keyword: var(--electric-violet);--code-comment: var(--electric-violet);--code-line-comment: var(--symbolic-gray);--code-block-comment: var(--symbolic-brown);--code-doc-comment: var(--code-comment);--code-keyword: var(--electric-violet);--code-modifier: var(--code-keyword);--code-operator-keyword: var(--code-keyword);--code-control-keyword: var(--code-keyword);--code-module-keyword: var(--code-keyword);--code-brace: var(--vivid-pink);--code-bool: var(--bright-blue);--code-string: var(--orange-red);--code-regexp: var(--orange-red);--code-tags: var(--bright-blue);--code-component: var(--primary-contrast);--code-type-name: var(--vivid-pink);--code-self: var(--orange-red);position:relative}.adev-code-editor-tabs[_ngcontent-%COMP%]{display:flex;background:var(--octonary-contrast);border-block-end:1px solid var(--senary-contrast);transition:background .3s ease,border .3s ease}.adev-tabs-and-plus[_ngcontent-%COMP%]{display:flex;width:calc(100% - 2.875rem);min-height:48px}.adev-add-file[_ngcontent-%COMP%]   docs-icon[_ngcontent-%COMP%], .adev-delete-file[_ngcontent-%COMP%]   docs-icon[_ngcontent-%COMP%]{color:var(--gray-400);transition:color .3s ease;font-size:1.2rem}.adev-add-file[_ngcontent-%COMP%]:hover   docs-icon[_ngcontent-%COMP%], .adev-delete-file[_ngcontent-%COMP%]:hover   docs-icon[_ngcontent-%COMP%]{color:var(--primary-contrast)}.adev-delete-file[_ngcontent-%COMP%]{padding-inline-start:.1rem;padding-inline-end:0;margin-block-start:.2rem}.adev-delete-file[_ngcontent-%COMP%]   docs-icon[_ngcontent-%COMP%]{font-size:1rem}.adev-new-file-input[_ngcontent-%COMP%]{color:var(--primary-contrast);border:none;border-radius:0;border-block-end:1px solid var(--senary-contrast);background:rgba(0,0,0,0);outline:none;transition:color .3s ease}.adev-new-file-input[_ngcontent-%COMP%]:focus{background:rgba(0,0,0,0);border-block-end:1px solid var(--primary-contrast)}.adev-code-editor-wrapper[_ngcontent-%COMP%]{height:calc(100% - 49px)}.adev-code-editor-wrapper-hidden[_ngcontent-%COMP%]{display:none}.adev-inline-errors-box[_ngcontent-%COMP%]{position:absolute;bottom:.5rem;left:.5rem;right:.5rem;padding:.25rem;background-color:color-mix(in srgb, var(--bright-blue), var(--page-background) 90%);border:1px solid color-mix(in srgb, var(--bright-blue), var(--page-background) 70%);border-radius:.25rem}.adev-inline-errors-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{position:absolute;top:0;right:0;padding:.25rem}.adev-inline-errors-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   docs-icon[_ngcontent-%COMP%]{font-size:1.25rem;color:var(--quaternary-contrast);transition:color .3s ease}.adev-inline-errors-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover   docs-icon[_ngcontent-%COMP%]{color:var(--primary-contrast)}.adev-inline-errors-box[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding:0;margin:0;margin-inline:1.25rem;color:var(--tertiary-contrast);max-height:200px;overflow:auto}.adev-editor-download-button[_ngcontent-%COMP%]{padding:0;width:2.875rem;border-radius:0 .19rem 0 0;background:var(--octonary-contrast);border-inline-start:1px solid var(--senary-contrast)}.adev-editor-download-button[_ngcontent-%COMP%]   docs-icon[_ngcontent-%COMP%]{color:var(--gray-400);transition:color .3s ease;font-size:1.3rem}.adev-editor-download-button[_ngcontent-%COMP%]:hover   docs-icon[_ngcontent-%COMP%]{color:var(--primary-contrast)}/*# sourceMappingURL=code-editor.component.css.map */"], changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CodeEditor, [{
        type: Component,
        args: [{ selector: 'docs-tutorial-code-editor', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf, NgFor, MatTabsModule, IconComponent], template: "<!-- Code Editor Tabs -->\n<div class=\"adev-code-editor-tabs\">\n  <div class=\"adev-tabs-and-plus\">\n    <mat-tab-group animationDuration=\"0ms\" mat-stretch-tabs=\"false\">\n      <!--\n        Hint: we would like to keep only one instance of #codeEditorWrapper,\n        that's why we're not placing this element as content of mat-tab, just to\n        not call another time init method from CodeMirrorEditor service.\n      -->\n      @for (file of files(); track file) {\n      <mat-tab #tab>\n        <ng-template mat-tab-label>\n          {{ file.filename.replace('src/', '') }}\n          @if (tab.isActive && canDeleteFile(file.filename)) {\n          <button\n            class=\"adev-delete-file\"\n            aria-label=\"Delete file\"\n            (click)=\"deleteFile(file.filename)\"\n          >\n            <docs-icon>delete</docs-icon>\n          </button>\n          }\n        </ng-template>\n      </mat-tab>\n      } @if (isCreatingFile()) {\n      <mat-tab>\n        <ng-template mat-tab-label>\n          <form (submit)=\"createFile($event)\">\n            <input\n              name=\"new-file\"\n              class=\"adev-new-file-input\"\n              #createFileInput\n              (keydown)=\"$event.stopPropagation()\"\n            />\n          </form>\n        </ng-template>\n      </mat-tab>\n      }\n    </mat-tab-group>\n\n    <button class=\"adev-add-file\" (click)=\"onAddButtonClick()\" aria-label=\"Add a new file\">\n      <docs-icon>add</docs-icon>\n    </button>\n  </div>\n\n  <button\n    class=\"adev-editor-download-button\"\n    type=\"button\"\n    (click)=\"downloadCurrentCodeEditorState()\"\n    aria-label=\"Download current code in editor\"\n  >\n    <docs-icon>download</docs-icon>\n  </button>\n</div>\n<!-- Code Editor -->\n<div #codeEditorWrapper class=\"adev-code-editor-wrapper\"></div>\n\n@if (displayErrorsBox()) {\n<div class=\"adev-inline-errors-box\">\n  <button type=\"button\" (click)=\"closeErrorsBox()\">\n    <docs-icon class=\"docs-icon_high-contrast\">close</docs-icon>\n  </button>\n  <ul>\n    @for (error of errors(); track error) {\n    <li>(line: {{ error.lineNumber }}:{{ error.characterPosition }}) {{ error.message }}</li>\n    }\n  </ul>\n</div>\n}\n", styles: [":host{--code-editor-selection-background: color-mix( in srgb, var(--selection-background) 5%, var(--octonary-contrast) );--code-editor-focused-selection-background: color-mix( in srgb, var(--selection-background) 12%, var(--octonary-contrast) );--code-editor-text-base-color: var(--primary-contrast);--code-editor-tooltip-background: color-mix( in srgb, var(--bright-blue), var(--page-background) 90% );--code-editor-tooltip-color: var(--primary-contrast);--code-editor-tooltip-border: 1px solid color-mix(in srgb, var(--bright-blue), var(--page-background) 70%);--code-editor-tooltip-border-radius: 0.25rem;--code-editor-autocomplete-item-background: var(--senary-contrast);--code-editor-autocomplete-item-color: var(--primary-contrast);--code-name: var(--primary-contrast);--code-editor-cursor-color: var(--code-name);--code-variable-name: var(--bright-blue);--code-property-name: var(--code-name);--code-definition-keyword: var(--electric-violet);--code-comment: var(--electric-violet);--code-line-comment: var(--symbolic-gray);--code-block-comment: var(--symbolic-brown);--code-doc-comment: var(--code-comment);--code-keyword: var(--electric-violet);--code-modifier: var(--code-keyword);--code-operator-keyword: var(--code-keyword);--code-control-keyword: var(--code-keyword);--code-module-keyword: var(--code-keyword);--code-brace: var(--vivid-pink);--code-bool: var(--bright-blue);--code-string: var(--orange-red);--code-regexp: var(--orange-red);--code-tags: var(--bright-blue);--code-component: var(--primary-contrast);--code-type-name: var(--vivid-pink);--code-self: var(--orange-red);position:relative}.adev-code-editor-tabs{display:flex;background:var(--octonary-contrast);border-block-end:1px solid var(--senary-contrast);transition:background .3s ease,border .3s ease}.adev-tabs-and-plus{display:flex;width:calc(100% - 2.875rem);min-height:48px}.adev-add-file docs-icon,.adev-delete-file docs-icon{color:var(--gray-400);transition:color .3s ease;font-size:1.2rem}.adev-add-file:hover docs-icon,.adev-delete-file:hover docs-icon{color:var(--primary-contrast)}.adev-delete-file{padding-inline-start:.1rem;padding-inline-end:0;margin-block-start:.2rem}.adev-delete-file docs-icon{font-size:1rem}.adev-new-file-input{color:var(--primary-contrast);border:none;border-radius:0;border-block-end:1px solid var(--senary-contrast);background:rgba(0,0,0,0);outline:none;transition:color .3s ease}.adev-new-file-input:focus{background:rgba(0,0,0,0);border-block-end:1px solid var(--primary-contrast)}.adev-code-editor-wrapper{height:calc(100% - 49px)}.adev-code-editor-wrapper-hidden{display:none}.adev-inline-errors-box{position:absolute;bottom:.5rem;left:.5rem;right:.5rem;padding:.25rem;background-color:color-mix(in srgb, var(--bright-blue), var(--page-background) 90%);border:1px solid color-mix(in srgb, var(--bright-blue), var(--page-background) 70%);border-radius:.25rem}.adev-inline-errors-box button{position:absolute;top:0;right:0;padding:.25rem}.adev-inline-errors-box button docs-icon{font-size:1.25rem;color:var(--quaternary-contrast);transition:color .3s ease}.adev-inline-errors-box button:hover docs-icon{color:var(--primary-contrast)}.adev-inline-errors-box ul{padding:0;margin:0;margin-inline:1.25rem;color:var(--tertiary-contrast);max-height:200px;overflow:auto}.adev-editor-download-button{padding:0;width:2.875rem;border-radius:0 .19rem 0 0;background:var(--octonary-contrast);border-inline-start:1px solid var(--senary-contrast)}.adev-editor-download-button docs-icon{color:var(--gray-400);transition:color .3s ease;font-size:1.3rem}.adev-editor-download-button:hover docs-icon{color:var(--primary-contrast)}/*# sourceMappingURL=code-editor.component.css.map */\n"] }]
    }], null, { codeEditorWrapperRef: [{
            type: ViewChild,
            args: ['codeEditorWrapper']
        }], matTabGroup: [{
            type: ViewChild,
            args: [MatTabGroup]
        }], setFileInputRef: [{
            type: ViewChild,
            args: ['createFileInput']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CodeEditor, { className: "CodeEditor", filePath: "docs/editor/code-editor/code-editor.component.ts", lineNumber: 43 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1lZGl0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvY29kZS1lZGl0b3IvY29kZS1lZGl0b3IuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvY29kZS1lZGl0b3IvY29kZS1lZGl0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUVWLFNBQVMsRUFDVCxNQUFNLEVBQ04sTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyxXQUFXLEVBQUUsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFDLFlBQVksRUFBRSxHQUFHLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBRXpGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQzFFLE9BQU8sRUFBeUIsZ0JBQWdCLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHlDQUF5QyxDQUFDOzs7Ozs7O0lDaEI1RCxrQ0FJQztJQURDLG9PQUFTLGVBQUEsb0NBQXlCLENBQUEsSUFBQztJQUVuQyxpQ0FBVztJQUFBLHNCQUFNO0lB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QUFTO21CQUFDLGlCQUFpQjs7a0ZBTGpCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdGb3IsIE5nSWZ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFbGVtZW50UmVmLFxuICBPbkRlc3Ryb3ksXG4gIFZpZXdDaGlsZCxcbiAgaW5qZWN0LFxuICBzaWduYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7TWF0VGFiR3JvdXAsIE1hdFRhYnNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYnMnO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWUsIG1hcH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7VGVybWluYWxUeXBlfSBmcm9tICcuLi9zZXJ2aWNlcy90ZXJtaW5hbC1oYW5kbGVyLnNlcnZpY2UuanMnO1xuaW1wb3J0IHtFbWJlZGRlZFR1dG9yaWFsTWFuYWdlcn0gZnJvbSAnLi4vc2VydmljZXMvZW1iZWRkZWQtdHV0b3JpYWwtbWFuYWdlci5zZXJ2aWNlLmpzJztcblxuaW1wb3J0IHtDb2RlTWlycm9yRWRpdG9yfSBmcm9tICcuL3NlcnZpY2VzL2NvZGUtbWlycm9yLWVkaXRvci5zZXJ2aWNlLmpzJztcbmltcG9ydCB7RGlhZ25vc3RpY1dpdGhMb2NhdGlvbiwgRGlhZ25vc3RpY3NTdGF0ZX0gZnJvbSAnLi9zZXJ2aWNlcy9kaWFnbm9zdGljcy1zdGF0ZS5zZXJ2aWNlLmpzJztcbmltcG9ydCB7RG93bmxvYWRNYW5hZ2VyfSBmcm9tICcuLi9zZXJ2aWNlcy9kb3dubG9hZC1tYW5hZ2VyLnNlcnZpY2UuanMnO1xuaW1wb3J0IHtJY29uQ29tcG9uZW50fSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ljb24vaWNvbi5jb21wb25lbnQuanMnO1xuXG5leHBvcnQgY29uc3QgUkVRVUlSRURfRklMRVMgPSBuZXcgU2V0KFsnc3JjL21haW4udHMnLCAnc3JjL2luZGV4Lmh0bWwnXSk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3MtdHV0b3JpYWwtY29kZS1lZGl0b3InLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICB0ZW1wbGF0ZVVybDogJy4vY29kZS1lZGl0b3IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb2RlLWVkaXRvci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaW1wb3J0czogW05nSWYsIE5nRm9yLCBNYXRUYWJzTW9kdWxlLCBJY29uQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29kZUVkaXRvciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2NvZGVFZGl0b3JXcmFwcGVyJykgcHJpdmF0ZSBjb2RlRWRpdG9yV3JhcHBlclJlZiE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKE1hdFRhYkdyb3VwKSBwcml2YXRlIG1hdFRhYkdyb3VwITogTWF0VGFiR3JvdXA7XG5cbiAgcHJpdmF0ZSBjcmVhdGVGaWxlSW5wdXRSZWY/OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdjcmVhdGVGaWxlSW5wdXQnKSBwcm90ZWN0ZWQgc2V0IHNldEZpbGVJbnB1dFJlZihcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+LFxuICApIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB0aGlzLmNyZWF0ZUZpbGVJbnB1dFJlZiA9IGVsZW1lbnQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29kZU1pcnJvckVkaXRvciA9IGluamVjdChDb2RlTWlycm9yRWRpdG9yKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkaWFnbm9zdGljc1N0YXRlID0gaW5qZWN0KERpYWdub3N0aWNzU3RhdGUpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRvd25sb2FkTWFuYWdlciA9IGluamVjdChEb3dubG9hZE1hbmFnZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyID0gaW5qZWN0KEVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGVycm9ycyQgPSB0aGlzLmRpYWdub3N0aWNzU3RhdGUuZGlhZ25vc3RpY3MkLnBpcGUoXG4gICAgLy8gRGlzcGxheSBlcnJvcnMgb25lIHNlY29uZCBhZnRlciBjb2RlIHVwZGF0ZVxuICAgIGRlYm91bmNlVGltZSgxMDAwKSxcbiAgICBtYXAoKGRpYWdub3N0aWNzSXRlbSkgPT5cbiAgICAgIGRpYWdub3N0aWNzSXRlbVxuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnNldmVyaXR5ID09PSAnZXJyb3InKVxuICAgICAgICAuc29ydCgoYSwgYikgPT5cbiAgICAgICAgICBhLmxpbmVOdW1iZXIgIT0gYi5saW5lTnVtYmVyXG4gICAgICAgICAgICA/IGEubGluZU51bWJlciAtIGIubGluZU51bWJlclxuICAgICAgICAgICAgOiBhLmNoYXJhY3RlclBvc2l0aW9uIC0gYi5jaGFyYWN0ZXJQb3NpdGlvbixcbiAgICAgICAgKSxcbiAgICApLFxuICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICApO1xuXG4gIHJlYWRvbmx5IFRlcm1pbmFsVHlwZSA9IFRlcm1pbmFsVHlwZTtcblxuICByZWFkb25seSBkaXNwbGF5RXJyb3JzQm94ID0gc2lnbmFsPGJvb2xlYW4+KGZhbHNlKTtcbiAgcmVhZG9ubHkgZXJyb3JzID0gc2lnbmFsPERpYWdub3N0aWNXaXRoTG9jYXRpb25bXT4oW10pO1xuICByZWFkb25seSBmaWxlcyA9IHRoaXMuY29kZU1pcnJvckVkaXRvci5vcGVuRmlsZXM7XG4gIHJlYWRvbmx5IGlzQ3JlYXRpbmdGaWxlID0gc2lnbmFsPGJvb2xlYW4+KGZhbHNlKTtcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5jb2RlTWlycm9yRWRpdG9yLmluaXQodGhpcy5jb2RlRWRpdG9yV3JhcHBlclJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmxpc3RlblRvRGlhZ25vc3RpY3NDaGFuZ2UoKTtcblxuICAgIHRoaXMubGlzdGVuVG9UYWJDaGFuZ2UoKTtcbiAgICB0aGlzLnNldFNlbGVjdGVkVGFiT25UdXRvcmlhbENoYW5nZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jb2RlTWlycm9yRWRpdG9yLmRpc2FibGUoKTtcbiAgfVxuXG4gIGFzeW5jIGRvd25sb2FkQ3VycmVudENvZGVFZGl0b3JTdGF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5lbWJlZGRlZFR1dG9yaWFsTWFuYWdlci50dXRvcmlhbElkKCk7XG4gICAgYXdhaXQgdGhpcy5kb3dubG9hZE1hbmFnZXIuZG93bmxvYWRDdXJyZW50U3RhdGVPZlRoZVNvbHV0aW9uKG5hbWUpO1xuICB9XG5cbiAgY2xvc2VFcnJvcnNCb3goKTogdm9pZCB7XG4gICAgdGhpcy5kaXNwbGF5RXJyb3JzQm94LnNldChmYWxzZSk7XG4gIH1cblxuICBjYW5EZWxldGVGaWxlKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gIVJFUVVJUkVEX0ZJTEVTLmhhcyhmaWxlbmFtZSk7XG4gIH1cblxuICBhc3luYyBkZWxldGVGaWxlKGZpbGVuYW1lOiBzdHJpbmcpIHtcbiAgICBhd2FpdCB0aGlzLmNvZGVNaXJyb3JFZGl0b3IuZGVsZXRlRmlsZShmaWxlbmFtZSk7XG4gICAgdGhpcy5tYXRUYWJHcm91cC5zZWxlY3RlZEluZGV4ID0gMDtcbiAgfVxuXG4gIG9uQWRkQnV0dG9uQ2xpY2soKSB7XG4gICAgdGhpcy5pc0NyZWF0aW5nRmlsZS5zZXQodHJ1ZSk7XG4gICAgdGhpcy5tYXRUYWJHcm91cC5zZWxlY3RlZEluZGV4ID0gdGhpcy5maWxlcygpLmxlbmd0aDtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZUZpbGUoZXZlbnQ6IFN1Ym1pdEV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmNyZWF0ZUZpbGVJbnB1dFJlZikgcmV0dXJuO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IG5ld0ZpbGVJbnB1dFZhbHVlID0gdGhpcy5jcmVhdGVGaWxlSW5wdXRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcblxuICAgIGlmIChuZXdGaWxlSW5wdXRWYWx1ZSkge1xuICAgICAgaWYgKG5ld0ZpbGVJbnB1dFZhbHVlLmluY2x1ZGVzKCcuLicpKSB7XG4gICAgICAgIGFsZXJ0KCdGaWxlIG5hbWUgY2FuIG5vdCBjb250YWluIFwiLi5cIicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHNyYyBpcyBoaWRkZW4gZnJvbSB1c2VycywgaGVyZSB3ZSBtYW51YWxseSBhZGQgaXQgdG8gdGhlIG5ldyBmaWxlbmFtZVxuICAgICAgY29uc3QgbmV3RmlsZSA9ICdzcmMvJyArIG5ld0ZpbGVJbnB1dFZhbHVlO1xuXG4gICAgICBpZiAodGhpcy5maWxlcygpLmZpbmQoKHtmaWxlbmFtZX0pID0+IGZpbGVuYW1lLmluY2x1ZGVzKG5ld0ZpbGUpKSkge1xuICAgICAgICBhbGVydCgnRmlsZSBhbHJlYWR5IGV4aXN0cycpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuY29kZU1pcnJvckVkaXRvci5jcmVhdGVGaWxlKG5ld0ZpbGUpO1xuICAgIH1cblxuICAgIHRoaXMuaXNDcmVhdGluZ0ZpbGUuc2V0KGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9EaWFnbm9zdGljc0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVycm9ycyQuc3Vic2NyaWJlKChkaWFnbm9zdGljcykgPT4ge1xuICAgICAgdGhpcy5lcnJvcnMuc2V0KGRpYWdub3N0aWNzKTtcbiAgICAgIHRoaXMuZGlzcGxheUVycm9yc0JveC5zZXQoZGlhZ25vc3RpY3MubGVuZ3RoID4gMCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldFNlbGVjdGVkVGFiT25UdXRvcmlhbENoYW5nZSgpIHtcbiAgICB0aGlzLmVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyLnR1dG9yaWFsQ2hhbmdlZCRcbiAgICAgIC5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8vIHNlbGVjdGVkIGZpbGUgb24gcHJvamVjdCBjaGFuZ2UgaXMgYWx3YXlzIHRoZSBmaXJzdFxuICAgICAgICB0aGlzLm1hdFRhYkdyb3VwLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvVGFiQ2hhbmdlKCkge1xuICAgIHRoaXMubWF0VGFiR3JvdXAuc2VsZWN0ZWRJbmRleENoYW5nZVxuICAgICAgLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZikpXG4gICAgICAuc3Vic2NyaWJlKChpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RlZEZpbGUgPSB0aGlzLmZpbGVzKClbaW5kZXhdO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZEZpbGUpIHtcbiAgICAgICAgICB0aGlzLmNvZGVNaXJyb3JFZGl0b3IuY2hhbmdlQ3VycmVudEZpbGUoc2VsZWN0ZWRGaWxlLmZpbGVuYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiIsIjwhLS0gQ29kZSBFZGl0b3IgVGFicyAtLT5cbjxkaXYgY2xhc3M9XCJhZGV2LWNvZGUtZWRpdG9yLXRhYnNcIj5cbiAgPGRpdiBjbGFzcz1cImFkZXYtdGFicy1hbmQtcGx1c1wiPlxuICAgIDxtYXQtdGFiLWdyb3VwIGFuaW1hdGlvbkR1cmF0aW9uPVwiMG1zXCIgbWF0LXN0cmV0Y2gtdGFicz1cImZhbHNlXCI+XG4gICAgICA8IS0tXG4gICAgICAgIEhpbnQ6IHdlIHdvdWxkIGxpa2UgdG8ga2VlcCBvbmx5IG9uZSBpbnN0YW5jZSBvZiAjY29kZUVkaXRvcldyYXBwZXIsXG4gICAgICAgIHRoYXQncyB3aHkgd2UncmUgbm90IHBsYWNpbmcgdGhpcyBlbGVtZW50IGFzIGNvbnRlbnQgb2YgbWF0LXRhYiwganVzdCB0b1xuICAgICAgICBub3QgY2FsbCBhbm90aGVyIHRpbWUgaW5pdCBtZXRob2QgZnJvbSBDb2RlTWlycm9yRWRpdG9yIHNlcnZpY2UuXG4gICAgICAtLT5cbiAgICAgIEBmb3IgKGZpbGUgb2YgZmlsZXMoKTsgdHJhY2sgZmlsZSkge1xuICAgICAgPG1hdC10YWIgI3RhYj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIG1hdC10YWItbGFiZWw+XG4gICAgICAgICAge3sgZmlsZS5maWxlbmFtZS5yZXBsYWNlKCdzcmMvJywgJycpIH19XG4gICAgICAgICAgQGlmICh0YWIuaXNBY3RpdmUgJiYgY2FuRGVsZXRlRmlsZShmaWxlLmZpbGVuYW1lKSkge1xuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYWRldi1kZWxldGUtZmlsZVwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiRGVsZXRlIGZpbGVcIlxuICAgICAgICAgICAgKGNsaWNrKT1cImRlbGV0ZUZpbGUoZmlsZS5maWxlbmFtZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkb2NzLWljb24+ZGVsZXRlPC9kb2NzLWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgfVxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9tYXQtdGFiPlxuICAgICAgfSBAaWYgKGlzQ3JlYXRpbmdGaWxlKCkpIHtcbiAgICAgIDxtYXQtdGFiPlxuICAgICAgICA8bmctdGVtcGxhdGUgbWF0LXRhYi1sYWJlbD5cbiAgICAgICAgICA8Zm9ybSAoc3VibWl0KT1cImNyZWF0ZUZpbGUoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJuZXctZmlsZVwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiYWRldi1uZXctZmlsZS1pbnB1dFwiXG4gICAgICAgICAgICAgICNjcmVhdGVGaWxlSW5wdXRcbiAgICAgICAgICAgICAgKGtleWRvd24pPVwiJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9tYXQtdGFiPlxuICAgICAgfVxuICAgIDwvbWF0LXRhYi1ncm91cD5cblxuICAgIDxidXR0b24gY2xhc3M9XCJhZGV2LWFkZC1maWxlXCIgKGNsaWNrKT1cIm9uQWRkQnV0dG9uQ2xpY2soKVwiIGFyaWEtbGFiZWw9XCJBZGQgYSBuZXcgZmlsZVwiPlxuICAgICAgPGRvY3MtaWNvbj5hZGQ8L2RvY3MtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbiAgPGJ1dHRvblxuICAgIGNsYXNzPVwiYWRldi1lZGl0b3ItZG93bmxvYWQtYnV0dG9uXCJcbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAoY2xpY2spPVwiZG93bmxvYWRDdXJyZW50Q29kZUVkaXRvclN0YXRlKClcIlxuICAgIGFyaWEtbGFiZWw9XCJEb3dubG9hZCBjdXJyZW50IGNvZGUgaW4gZWRpdG9yXCJcbiAgPlxuICAgIDxkb2NzLWljb24+ZG93bmxvYWQ8L2RvY3MtaWNvbj5cbiAgPC9idXR0b24+XG48L2Rpdj5cbjwhLS0gQ29kZSBFZGl0b3IgLS0+XG48ZGl2ICNjb2RlRWRpdG9yV3JhcHBlciBjbGFzcz1cImFkZXYtY29kZS1lZGl0b3Itd3JhcHBlclwiPjwvZGl2PlxuXG5AaWYgKGRpc3BsYXlFcnJvcnNCb3goKSkge1xuPGRpdiBjbGFzcz1cImFkZXYtaW5saW5lLWVycm9ycy1ib3hcIj5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsb3NlRXJyb3JzQm94KClcIj5cbiAgICA8ZG9jcy1pY29uIGNsYXNzPVwiZG9jcy1pY29uX2hpZ2gtY29udHJhc3RcIj5jbG9zZTwvZG9jcy1pY29uPlxuICA8L2J1dHRvbj5cbiAgPHVsPlxuICAgIEBmb3IgKGVycm9yIG9mIGVycm9ycygpOyB0cmFjayBlcnJvcikge1xuICAgIDxsaT4obGluZToge3sgZXJyb3IubGluZU51bWJlciB9fTp7eyBlcnJvci5jaGFyYWN0ZXJQb3NpdGlvbiB9fSkge3sgZXJyb3IubWVzc2FnZSB9fTwvbGk+XG4gICAgfVxuICA8L3VsPlxuPC9kaXY+XG59XG4iXX0=