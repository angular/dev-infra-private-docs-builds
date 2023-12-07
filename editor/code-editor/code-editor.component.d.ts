import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { TerminalType } from '../services/terminal-handler.service.js';
import { DiagnosticWithLocation } from './services/diagnostics-state.service.js';
import * as i0 from "@angular/core";
export declare const REQUIRED_FILES: Set<string>;
export declare class CodeEditor implements AfterViewInit, OnDestroy {
    private codeEditorWrapperRef;
    private matTabGroup;
    private createFileInputRef?;
    protected set setFileInputRef(element: ElementRef<HTMLInputElement>);
    private readonly destroyRef;
    private readonly codeMirrorEditor;
    private readonly diagnosticsState;
    private readonly downloadManager;
    private readonly embeddedTutorialManager;
    private readonly errors$;
    readonly TerminalType: typeof TerminalType;
    readonly displayErrorsBox: import("@angular/core").WritableSignal<boolean>;
    readonly errors: import("@angular/core").WritableSignal<DiagnosticWithLocation[]>;
    readonly files: import("@angular/core").WritableSignal<import("./interfaces/editor-file.js").EditorFile[]>;
    readonly isCreatingFile: import("@angular/core").WritableSignal<boolean>;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    downloadCurrentCodeEditorState(): Promise<void>;
    closeErrorsBox(): void;
    canDeleteFile(filename: string): boolean;
    deleteFile(filename: string): Promise<void>;
    onAddButtonClick(): void;
    createFile(event: SubmitEvent): Promise<void>;
    private listenToDiagnosticsChange;
    private setSelectedTabOnTutorialChange;
    private listenToTabChange;
    static ɵfac: i0.ɵɵFactoryDeclaration<CodeEditor, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CodeEditor, "docs-tutorial-code-editor", never, {}, {}, never, never, true, never>;
}