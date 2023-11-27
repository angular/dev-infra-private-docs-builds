/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Type } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ExampleMetadata, Snippet } from '../../interfaces';
import * as i0 from "@angular/core";
export declare enum CodeExampleViewMode {
    SNIPPET = "snippet",
    MULTI_FILE = "multi"
}
export declare const CODE_LINE_NUMBER_CLASS_NAME = "hljs-ln-number";
export declare const CODE_LINE_CLASS_NAME = "hljs-ln-line";
export declare const GAP_CODE_LINE_CLASS_NAME = "gap";
export declare const HIDDEN_CLASS_NAME = "hidden";
export declare class ExampleViewer {
    set metadata(value: ExampleMetadata);
    githubUrl: string | null;
    stackblitzUrl: string | null;
    matTabGroup?: MatTabGroup;
    private readonly changeDetector;
    private readonly clipboard;
    private readonly destroyRef;
    private readonly document;
    private readonly elementRef;
    private readonly exampleViewerContentLoader;
    private readonly shouldDisplayFullName;
    CodeExampleViewMode: typeof CodeExampleViewMode;
    exampleComponent?: Type<unknown>;
    expanded: import("@angular/core").WritableSignal<boolean>;
    exampleMetadata: import("@angular/core").WritableSignal<ExampleMetadata | null>;
    snippetCode: import("@angular/core").WritableSignal<Snippet | undefined>;
    tabs: import("@angular/core").Signal<{
        name: string;
        code: string;
    }[] | undefined>;
    view: import("@angular/core").Signal<CodeExampleViewMode>;
    expandable: import("@angular/core").Signal<boolean | undefined>;
    renderExample(): Promise<void>;
    toggleExampleVisibility(): void;
    copyLink(): void;
    private listenToMatTabIndexChange;
    private getFileExtension;
    private setCodeLinesVisibility;
    private handleExpandedStateForCodeBlock;
    private handleCollapsedStateForCodeBlock;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExampleViewer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExampleViewer, "docs-example-viewer", never, { "metadata": { "alias": "metadata"; "required": true; }; "githubUrl": { "alias": "githubUrl"; "required": false; }; "stackblitzUrl": { "alias": "stackblitzUrl"; "required": false; }; }, {}, never, never, true, never>;
}
