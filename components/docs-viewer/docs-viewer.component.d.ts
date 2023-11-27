import { OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare const ASSETS_EXAMPLES_PATH = "assets/content/examples";
export declare const DOCS_VIEWER_SELECTOR = "docs-viewer";
export declare const DOCS_CODE_SELECTOR = ".docs-code";
export declare const DOCS_CODE_MUTLIFILE_SELECTOR = ".docs-code-multifile";
export declare const GITHUB_CONTENT_URL = "https://github.com/angular/angular/blob/main/adev/src/content/examples/";
export declare class DocViewer implements OnChanges {
    docContent?: string;
    hasToc: boolean;
    contentLoaded: EventEmitter<void>;
    private readonly destroyRef;
    private readonly document;
    private readonly elementRef;
    private readonly location;
    private readonly navigationState;
    private readonly platformId;
    private readonly router;
    private readonly viewContainer;
    private readonly environmentInjector;
    private readonly injector;
    private readonly appRef;
    private animateContent;
    private readonly pendingRenderTasks;
    private countOfExamples;
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    renderContentsAndRunClientSetup(content?: string): Promise<void>;
    /**
     * Load ExampleViewer component when:
     * - exists docs-code-multifile element with multiple files OR
     * - exists docs-code element with single file AND
     *   - 'preview' attribute was provided OR
     *   - 'visibleLines' attribute was provided
     */
    private loadExamples;
    private renderTableOfContents;
    private renderExampleViewerComponents;
    private getCodeSnippetsFromMultifileWrapper;
    private getStandaloneCodeSnippet;
    private loadCopySourceCodeButtons;
    private loadBreadcrumb;
    private loadIcons;
    /**
     * Helper method to render a component dynamically in a context of this class.
     */
    private renderComponent;
    private setupAnchorListeners;
    private rewriteRelativeAnchors;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocViewer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DocViewer, "docs-viewer", never, { "docContent": { "alias": "docContent"; "required": false; }; "hasToc": { "alias": "hasToc"; "required": false; }; }, { "contentLoaded": "contentLoaded"; }, never, never, true, never>;
}
