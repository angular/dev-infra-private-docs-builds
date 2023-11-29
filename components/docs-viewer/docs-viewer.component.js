/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { CommonModule, DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, Component, createComponent, DestroyRef, ElementRef, EnvironmentInjector, inject, Injector, Input, PLATFORM_ID, ViewContainerRef, ViewEncapsulation, ɵInitialRenderPendingTasks as PendingRenderTasks, EventEmitter, Output, } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TOC_SKIP_CONTENT_MARKER, NavigationState } from '../../services/index.js';
import { TableOfContents } from '../table-of-contents/table-of-contents.component.js';
import { IconComponent } from '../icon/icon.component.js';
import { handleHrefClickEventWithRouter } from '../../utils/index.js';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component.js';
import { CopySourceCodeButton } from '../copy-source-code-button/copy-source-code-button.component.js';
import { ExampleViewer } from '../example-viewer/example-viewer.component.js';
import * as i0 from "@angular/core";
/// <reference types="@types/dom-view-transitions" />
const TOC_HOST_ELEMENT_NAME = 'docs-table-of-contents';
export const ASSETS_EXAMPLES_PATH = 'assets/content/examples';
export const DOCS_VIEWER_SELECTOR = 'docs-viewer';
export const DOCS_CODE_SELECTOR = '.docs-code';
export const DOCS_CODE_MUTLIFILE_SELECTOR = '.docs-code-multifile';
// TODO: Update the branch/sha
export const GITHUB_CONTENT_URL = 'https://github.com/angular/angular/blob/main/adev/src/content/examples/';
export class DocViewer {
    constructor() {
        this.hasToc = false;
        this.contentLoaded = new EventEmitter();
        this.destroyRef = inject(DestroyRef);
        this.document = inject(DOCUMENT);
        this.elementRef = inject(ElementRef);
        this.location = inject(Location);
        this.navigationState = inject(NavigationState);
        this.platformId = inject(PLATFORM_ID);
        this.router = inject(Router);
        this.viewContainer = inject(ViewContainerRef);
        this.environmentInjector = inject(EnvironmentInjector);
        this.injector = inject(Injector);
        this.appRef = inject(ApplicationRef);
        // tslint:disable-next-line:no-unused-variable
        this.animateContent = false;
        this.pendingRenderTasks = inject(PendingRenderTasks);
        this.countOfExamples = 0;
    }
    async ngOnChanges(changes) {
        const taskId = this.pendingRenderTasks.add();
        if ('docContent' in changes) {
            await this.renderContentsAndRunClientSetup(this.docContent);
        }
        this.pendingRenderTasks.remove(taskId);
    }
    async renderContentsAndRunClientSetup(content) {
        const isBrowser = isPlatformBrowser(this.platformId);
        const contentContainer = this.elementRef.nativeElement;
        if (content) {
            if (isBrowser && !this.document.startViewTransition) {
                // Apply a special class to the host node to trigger animation.
                // Note: when a page is hydrated, the `content` would be empty,
                // so we don't trigger an animation to avoid a content flickering
                // visual effect. In addition, if the browser supports view transitions (startViewTransition is present), the animation is handled by the native View Transition API so it does not need to be done here.
                this.animateContent = true;
            }
            contentContainer.innerHTML = content;
        }
        if (isBrowser) {
            // First we setup event listeners on the HTML we just loaded.
            // We want to do this before things like the example viewers are loaded.
            this.setupAnchorListeners(contentContainer);
            // Rewrite relative anchors (hrefs starting with `#`) because relative hrefs are relative to the base URL, which is '/'
            this.rewriteRelativeAnchors(contentContainer);
            // In case when content contains placeholders for executable examples, create ExampleViewer components.
            await this.loadExamples();
            // In case when content contains static code snippets, then create buttons
            // responsible for copy source code.
            this.loadCopySourceCodeButtons();
        }
        // Display Breadcrumb component if the `<docs-breadcrumb>` element exists
        this.loadBreadcrumb(contentContainer);
        // Display Icon component if the `<docs-icon>` element exists
        this.loadIcons(contentContainer);
        // Render ToC
        this.renderTableOfContents(contentContainer);
        this.contentLoaded.next();
    }
    /**
     * Load ExampleViewer component when:
     * - exists docs-code-multifile element with multiple files OR
     * - exists docs-code element with single file AND
     *   - 'preview' attribute was provided OR
     *   - 'visibleLines' attribute was provided
     */
    async loadExamples() {
        const multifileCodeExamples = (Array.from(this.elementRef.nativeElement.querySelectorAll(DOCS_CODE_MUTLIFILE_SELECTOR)));
        for (let placeholder of multifileCodeExamples) {
            const path = placeholder.getAttribute('path');
            const snippets = this.getCodeSnippetsFromMultifileWrapper(placeholder);
            await this.renderExampleViewerComponents(placeholder, snippets, path);
        }
        const docsCodeElements = this.elementRef.nativeElement.querySelectorAll(DOCS_CODE_SELECTOR);
        for (const placeholder of docsCodeElements) {
            const snippet = this.getStandaloneCodeSnippet(placeholder);
            if (snippet) {
                await this.renderExampleViewerComponents(placeholder, [snippet], snippet.name);
            }
        }
    }
    renderTableOfContents(element) {
        if (!this.hasToc) {
            return;
        }
        const firstHeading = element.querySelector('h2,h3[id]');
        if (!firstHeading) {
            return;
        }
        // Since the content of the main area is dynamically created and there is
        // no host element for a ToC component, we create it manually.
        let tocHostElement = element.querySelector(TOC_HOST_ELEMENT_NAME);
        if (!tocHostElement) {
            tocHostElement = this.document.createElement(TOC_HOST_ELEMENT_NAME);
            tocHostElement.setAttribute(TOC_SKIP_CONTENT_MARKER, 'true');
            firstHeading?.parentNode?.insertBefore(tocHostElement, firstHeading);
        }
        this.renderComponent(TableOfContents, tocHostElement, { contentSourceElement: element });
    }
    async renderExampleViewerComponents(placeholder, snippets, path) {
        const preview = Boolean(placeholder.getAttribute('preview'));
        const title = placeholder.getAttribute('header') ?? undefined;
        const firstCodeSnippetTitle = snippets.length > 0 ? snippets[0].title ?? snippets[0].name : undefined;
        const exampleRef = this.viewContainer.createComponent(ExampleViewer);
        this.countOfExamples++;
        exampleRef.instance.metadata = {
            title: title ?? firstCodeSnippetTitle,
            path,
            files: snippets,
            preview,
            id: this.countOfExamples,
        };
        exampleRef.instance.githubUrl = `${GITHUB_CONTENT_URL}/${snippets[0].name}`;
        exampleRef.instance.stackblitzUrl = `${ASSETS_EXAMPLES_PATH}/${snippets[0].name}.html`;
        placeholder.parentElement.replaceChild(exampleRef.location.nativeElement, placeholder);
        await exampleRef.instance.renderExample();
    }
    getCodeSnippetsFromMultifileWrapper(element) {
        const tabs = Array.from(element.querySelectorAll(DOCS_CODE_SELECTOR));
        return tabs.map((tab) => ({
            name: tab.getAttribute('path') ?? tab.getAttribute('header') ?? '',
            content: tab.innerHTML,
            visibleLinesRange: tab.getAttribute('visibleLines') ?? undefined,
        }));
    }
    getStandaloneCodeSnippet(element) {
        const visibleLines = element.getAttribute('visibleLines') ?? undefined;
        const preview = element.getAttribute('preview');
        if (!visibleLines && !preview) {
            return null;
        }
        const content = element.querySelector('pre');
        const path = element.getAttribute('path');
        const title = element.getAttribute('header') ?? undefined;
        return {
            title,
            name: path,
            content: content?.outerHTML,
            visibleLinesRange: visibleLines,
        };
    }
    // If the content contains static code snippets, we should add buttons to copy
    // the code
    loadCopySourceCodeButtons() {
        const staticCodeSnippets = (Array.from(this.elementRef.nativeElement.querySelectorAll('.docs-code:not([mermaid])')));
        for (let codeSnippet of staticCodeSnippets) {
            const copySourceCodeButton = this.viewContainer.createComponent(CopySourceCodeButton);
            codeSnippet.appendChild(copySourceCodeButton.location.nativeElement);
        }
    }
    loadBreadcrumb(element) {
        const breadcrumbPlaceholder = element.querySelector('docs-breadcrumb');
        const activeNavigationItem = this.navigationState.activeNavigationItem();
        if (breadcrumbPlaceholder && !!activeNavigationItem?.parent) {
            this.renderComponent(Breadcrumb, breadcrumbPlaceholder);
        }
    }
    loadIcons(element) {
        element.querySelectorAll('docs-icon').forEach((iconsPlaceholder) => {
            this.renderComponent(IconComponent, iconsPlaceholder);
        });
    }
    /**
     * Helper method to render a component dynamically in a context of this class.
     */
    renderComponent(type, hostElement, inputs) {
        const componentRef = createComponent(type, {
            hostElement,
            elementInjector: this.injector,
            environmentInjector: this.environmentInjector,
        });
        if (inputs) {
            for (const [name, value] of Object.entries(inputs)) {
                componentRef.setInput(name, value);
            }
        }
        // Trigger change detection after setting inputs.
        componentRef.changeDetectorRef.detectChanges();
        // Attach a view to the ApplicationRef for change detection
        // purposes and for hydration serialization to pick it up
        // during SSG.
        this.appRef.attachView(componentRef.hostView);
        return componentRef;
    }
    setupAnchorListeners(element) {
        element.querySelectorAll(`a[href]`).forEach((anchor) => {
            // Get the target element's ID from the href attribute
            const url = new URL(anchor.href);
            const isExternalLink = url.origin !== this.document.location.origin;
            if (isExternalLink) {
                return;
            }
            fromEvent(anchor, 'click')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((e) => {
                handleHrefClickEventWithRouter(e, this.router);
            });
        });
    }
    rewriteRelativeAnchors(element) {
        for (const anchor of Array.from(element.querySelectorAll(`a[href^="#"]:not(a[download])`))) {
            const url = new URL(anchor.href);
            anchor.href = this.location.path() + url.hash;
        }
    }
}
DocViewer.ɵfac = function DocViewer_Factory(t) { return new (t || DocViewer)(); };
DocViewer.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DocViewer, selectors: [["docs-viewer"]], hostVars: 2, hostBindings: function DocViewer_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("docs-animate-content", ctx.animateContent);
    } }, inputs: { docContent: "docContent", hasToc: "hasToc" }, outputs: { contentLoaded: "contentLoaded" }, standalone: true, features: [i0.ɵɵNgOnChangesFeature, i0.ɵɵStandaloneFeature], decls: 0, vars: 0, template: function DocViewer_Template(rf, ctx) { }, dependencies: [CommonModule], styles: [":host{--translate-y: clamp(5px, 0.25em, 7px)}.docs-viewer{display:flex;flex-direction:column;padding:var(--layout-padding);max-width:var(--page-width);width:100%;box-sizing:border-box}@media only screen and (max-width: 1430px){.docs-viewer{container:docs-content/inline-size}}@media only screen and (min-width: 1430px)and (max-width: 1550px){adev-docs .docs-viewer{width:calc(100% - 195px - var(--layout-padding));max-width:var(--page-width)}}.docs-viewer pre{margin-block:0;padding-block:.75rem}.docs-viewer h1 .docs-anchor,.docs-viewer h2 .docs-anchor,.docs-viewer h3 .docs-anchor,.docs-viewer h4 .docs-anchor,.docs-viewer h5 .docs-anchor,.docs-viewer h6 .docs-anchor{margin-block-start:2.5rem;display:inline-block;color:inherit}.docs-viewer h1 .docs-anchor::after,.docs-viewer h2 .docs-anchor::after,.docs-viewer h3 .docs-anchor::after,.docs-viewer h4 .docs-anchor::after,.docs-viewer h5 .docs-anchor::after,.docs-viewer h6 .docs-anchor::after{content:\"\uE157\";font-family:\"Material Symbols Outlined\";opacity:0;margin-left:8px;vertical-align:middle;color:var(--quaternary-contrast);font-size:clamp(18px,1.25em,30px);transition:opacity .3s ease}.docs-viewer h1 .docs-anchor:hover::after,.docs-viewer h2 .docs-anchor:hover::after,.docs-viewer h3 .docs-anchor:hover::after,.docs-viewer h4 .docs-anchor:hover::after,.docs-viewer h5 .docs-anchor:hover::after,.docs-viewer h6 .docs-anchor:hover::after{opacity:1}.docs-viewer h1{font-size:2.5rem;margin-block-end:0}.docs-viewer h2{font-size:2rem;margin-block-end:.5rem}.docs-viewer h3{font-size:1.5rem;margin-block-end:.5rem}.docs-viewer h4{font-size:1.25rem;margin-block-end:.5rem}.docs-viewer h5{font-size:1rem;margin-block-end:0}.docs-viewer h6{font-size:.875rem;margin-block-end:0}.docs-viewer>:last-child{margin-block-end:0}.docs-viewer a:not(.docs-github-links):not(.docs-card):not(.docs-pill):not(.docs-example-github-link)[href^=\"http:\"]::after,.docs-viewer a:not(.docs-github-links):not(.docs-card):not(.docs-pill):not(.docs-example-github-link)[href^=\"https:\"]::after{display:inline-block;content:\"\uE89E\";font-family:\"Material Symbols Outlined\";margin-left:.2rem;vertical-align:middle}.docs-viewer-scroll-margin-large h2,.docs-viewer-scroll-margin-large h3{scroll-margin:5em}.docs-header{margin-block-end:1rem}.docs-header>p:first-child{color:var(--quaternary-contrast);font-weight:500;margin:0}.docs-page-title{display:flex;justify-content:space-between}.docs-page-title h1{margin-block:0;font-size:2.25rem}.docs-page-title a{color:var(--primary-contrast);height:fit-content}.docs-page-title a docs-icon{color:var(--gray-400);transition:color .3s ease}.docs-page-title a:hover docs-icon{color:var(--primary-contrast)}/*# sourceMappingURL=docs-viewer.component.css.map */\n"], encapsulation: 2, changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DocViewer, [{
        type: Component,
        args: [{ selector: DOCS_VIEWER_SELECTOR, standalone: true, imports: [CommonModule], template: '', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                    '[class.docs-animate-content]': 'animateContent',
                }, styles: [":host{--translate-y: clamp(5px, 0.25em, 7px)}.docs-viewer{display:flex;flex-direction:column;padding:var(--layout-padding);max-width:var(--page-width);width:100%;box-sizing:border-box}@media only screen and (max-width: 1430px){.docs-viewer{container:docs-content/inline-size}}@media only screen and (min-width: 1430px)and (max-width: 1550px){adev-docs .docs-viewer{width:calc(100% - 195px - var(--layout-padding));max-width:var(--page-width)}}.docs-viewer pre{margin-block:0;padding-block:.75rem}.docs-viewer h1 .docs-anchor,.docs-viewer h2 .docs-anchor,.docs-viewer h3 .docs-anchor,.docs-viewer h4 .docs-anchor,.docs-viewer h5 .docs-anchor,.docs-viewer h6 .docs-anchor{margin-block-start:2.5rem;display:inline-block;color:inherit}.docs-viewer h1 .docs-anchor::after,.docs-viewer h2 .docs-anchor::after,.docs-viewer h3 .docs-anchor::after,.docs-viewer h4 .docs-anchor::after,.docs-viewer h5 .docs-anchor::after,.docs-viewer h6 .docs-anchor::after{content:\"\uE157\";font-family:\"Material Symbols Outlined\";opacity:0;margin-left:8px;vertical-align:middle;color:var(--quaternary-contrast);font-size:clamp(18px,1.25em,30px);transition:opacity .3s ease}.docs-viewer h1 .docs-anchor:hover::after,.docs-viewer h2 .docs-anchor:hover::after,.docs-viewer h3 .docs-anchor:hover::after,.docs-viewer h4 .docs-anchor:hover::after,.docs-viewer h5 .docs-anchor:hover::after,.docs-viewer h6 .docs-anchor:hover::after{opacity:1}.docs-viewer h1{font-size:2.5rem;margin-block-end:0}.docs-viewer h2{font-size:2rem;margin-block-end:.5rem}.docs-viewer h3{font-size:1.5rem;margin-block-end:.5rem}.docs-viewer h4{font-size:1.25rem;margin-block-end:.5rem}.docs-viewer h5{font-size:1rem;margin-block-end:0}.docs-viewer h6{font-size:.875rem;margin-block-end:0}.docs-viewer>:last-child{margin-block-end:0}.docs-viewer a:not(.docs-github-links):not(.docs-card):not(.docs-pill):not(.docs-example-github-link)[href^=\"http:\"]::after,.docs-viewer a:not(.docs-github-links):not(.docs-card):not(.docs-pill):not(.docs-example-github-link)[href^=\"https:\"]::after{display:inline-block;content:\"\uE89E\";font-family:\"Material Symbols Outlined\";margin-left:.2rem;vertical-align:middle}.docs-viewer-scroll-margin-large h2,.docs-viewer-scroll-margin-large h3{scroll-margin:5em}.docs-header{margin-block-end:1rem}.docs-header>p:first-child{color:var(--quaternary-contrast);font-weight:500;margin:0}.docs-page-title{display:flex;justify-content:space-between}.docs-page-title h1{margin-block:0;font-size:2.25rem}.docs-page-title a{color:var(--primary-contrast);height:fit-content}.docs-page-title a docs-icon{color:var(--gray-400);transition:color .3s ease}.docs-page-title a:hover docs-icon{color:var(--primary-contrast)}/*# sourceMappingURL=docs-viewer.component.css.map */\n"] }]
    }], null, { docContent: [{
            type: Input
        }], hasToc: [{
            type: Input
        }], contentLoaded: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DocViewer, { className: "DocViewer", filePath: "docs/components/docs-viewer/docs-viewer.component.ts", lineNumber: 68 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL2RvY3Mtdmlld2VyL2RvY3Mtdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQ0wsY0FBYyxFQUNkLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsZUFBZSxFQUNmLFVBQVUsRUFDVixVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUVMLFdBQVcsRUFHWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLDBCQUEwQixJQUFJLGtCQUFrQixFQUNoRCxZQUFZLEVBQ1osTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxlQUFlLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scURBQXFELENBQUM7QUFDcEYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3hELE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXBFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxpRUFBaUUsQ0FBQztBQUNyRyxPQUFPLEVBQUMsYUFB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LENBQUMsK0JBQStCLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0YsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUUsTUFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxNQUE0QixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDdkUsQ0FBQztJQUNILENBQUM7O2tFQXBRVSxTQUFTOzREQUFULFNBQVM7O21SQVRWLFlBQVk7aUZBU1gsU0FBUztjQVpyQixTQUFTOzJCQUNFLG9CQUFvQixjQUNsQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYixFQUFFLG1CQUVLLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksUUFDL0I7b0JBQ0osOEJBQThCLEVBQUUsZ0JBQWdCO2lCQUNqRDtnQkFHUSxVQUFVO2tCQUFsQixLQUFLO1lBQ0csTUFBTTtrQkFBZCxLQUFLO1lBQ0ksYUFBYTtrQkFBdEIsTUFBTTs7a0ZBSEksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDb21tb25Nb2R1bGUsIERPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3NlciwgTG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29tcG9uZW50UmVmLFxuICBjcmVhdGVDb21wb25lbnQsXG4gIERlc3Ryb3lSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEVudmlyb25tZW50SW5qZWN0b3IsXG4gIGluamVjdCxcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIFBMQVRGT1JNX0lELFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgybVJbml0aWFsUmVuZGVyUGVuZGluZ1Rhc2tzIGFzIFBlbmRpbmdSZW5kZXJUYXNrcyxcbiAgRXZlbnRFbWl0dGVyLFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7VE9DX1NLSVBfQ09OVEVOVF9NQVJLRVIsIE5hdmlnYXRpb25TdGF0ZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvaW5kZXguanMnO1xuaW1wb3J0IHtUYWJsZU9mQ29udGVudHN9IGZyb20gJy4uL3RhYmxlLW9mLWNvbnRlbnRzL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudC5qcyc7XG5pbXBvcnQge0ljb25Db21wb25lbnR9IGZyb20gJy4uL2ljb24vaWNvbi5jb21wb25lbnQuanMnO1xuaW1wb3J0IHtoYW5kbGVIcmVmQ2xpY2tFdmVudFdpdGhSb3V0ZXJ9IGZyb20gJy4uLy4uL3V0aWxzL2luZGV4LmpzJztcbmltcG9ydCB7U25pcHBldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbmRleC5qcyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7ZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtCcmVhZGNydW1ifSBmcm9tICcuLi9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50LmpzJztcbmltcG9ydCB7Q29weVNvdXJjZUNvZGVCdXR0b259IGZyb20gJy4uL2NvcHktc291cmNlLWNvZGUtYnV0dG9uL2NvcHktc291cmNlLWNvZGUtYnV0dG9uLmNvbXBvbmVudC5qcyc7XG5pbXBvcnQge0V4YW1wbGVWaWV3ZXJ9IGZyb20gJy4uL2V4YW1wbGUtdmlld2VyL2V4YW1wbGUtdmlld2VyLmNvbXBvbmVudC5qcyc7XG5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiQHR5cGVzL2RvbS12aWV3LXRyYW5zaXRpb25zXCIgLz5cblxuY29uc3QgVE9DX0hPU1RfRUxFTUVOVF9OQU1FID0gJ2RvY3MtdGFibGUtb2YtY29udGVudHMnO1xuZXhwb3J0IGNvbnN0IEFTU0VUU19FWEFNUExFU19QQVRIID0gJ2Fzc2V0cy9jb250ZW50L2V4YW1wbGVzJztcbmV4cG9ydCBjb25zdCBET0NTX1ZJRVdFUl9TRUxFQ1RPUiA9ICdkb2NzLXZpZXdlcic7XG5leHBvcnQgY29uc3QgRE9DU19DT0RFX1NFTEVDVE9SID0gJy5kb2NzLWNvZGUnO1xuZXhwb3J0IGNvbnN0IERPQ1NfQ09ERV9NVVRMSUZJTEVfU0VMRUNUT1IgPSAnLmRvY3MtY29kZS1tdWx0aWZpbGUnO1xuLy8gVE9ETzogVXBkYXRlIHRoZSBicmFuY2gvc2hhXG5leHBvcnQgY29uc3QgR0lUSFVCX0NPTlRFTlRfVVJMID1cbiAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYWluL2FkZXYvc3JjL2NvbnRlbnQvZXhhbXBsZXMvJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBET0NTX1ZJRVdFUl9TRUxFQ1RPUixcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiAnJyxcbiAgc3R5bGVVcmxzOiBbJ2RvY3Mtdmlld2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5kb2NzLWFuaW1hdGUtY29udGVudF0nOiAnYW5pbWF0ZUNvbnRlbnQnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBEb2NWaWV3ZXIgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBkb2NDb250ZW50Pzogc3RyaW5nO1xuICBASW5wdXQoKSBoYXNUb2MgPSBmYWxzZTtcbiAgQE91dHB1dCgpIGNvbnRlbnRMb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRvY3VtZW50ID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50UmVmID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IGxvY2F0aW9uID0gaW5qZWN0KExvY2F0aW9uKTtcbiAgcHJpdmF0ZSByZWFkb25seSBuYXZpZ2F0aW9uU3RhdGUgPSBpbmplY3QoTmF2aWdhdGlvblN0YXRlKTtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlkID0gaW5qZWN0KFBMQVRGT1JNX0lEKTtcbiAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXIgPSBpbmplY3QoUm91dGVyKTtcbiAgcHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyID0gaW5qZWN0KFZpZXdDb250YWluZXJSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IGVudmlyb25tZW50SW5qZWN0b3IgPSBpbmplY3QoRW52aXJvbm1lbnRJbmplY3Rvcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgaW5qZWN0b3IgPSBpbmplY3QoSW5qZWN0b3IpO1xuICBwcml2YXRlIHJlYWRvbmx5IGFwcFJlZiA9IGluamVjdChBcHBsaWNhdGlvblJlZik7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC12YXJpYWJsZVxuICBwcml2YXRlIGFuaW1hdGVDb250ZW50ID0gZmFsc2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGVuZGluZ1JlbmRlclRhc2tzID0gaW5qZWN0KFBlbmRpbmdSZW5kZXJUYXNrcyk7XG5cbiAgcHJpdmF0ZSBjb3VudE9mRXhhbXBsZXMgPSAwO1xuXG4gIGFzeW5jIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB0YXNrSWQgPSB0aGlzLnBlbmRpbmdSZW5kZXJUYXNrcy5hZGQoKTtcbiAgICBpZiAoJ2RvY0NvbnRlbnQnIGluIGNoYW5nZXMpIHtcbiAgICAgIGF3YWl0IHRoaXMucmVuZGVyQ29udGVudHNBbmRSdW5DbGllbnRTZXR1cCh0aGlzLmRvY0NvbnRlbnQhKTtcbiAgICB9XG4gICAgdGhpcy5wZW5kaW5nUmVuZGVyVGFza3MucmVtb3ZlKHRhc2tJZCk7XG4gIH1cblxuICBhc3luYyByZW5kZXJDb250ZW50c0FuZFJ1bkNsaWVudFNldHVwKGNvbnRlbnQ/OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgIGNvbnN0IGNvbnRlbnRDb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIGlmIChjb250ZW50KSB7XG4gICAgICBpZiAoaXNCcm93c2VyICYmICEodGhpcy5kb2N1bWVudCBhcyBhbnkpLnN0YXJ0Vmlld1RyYW5zaXRpb24pIHtcbiAgICAgICAgLy8gQXBwbHkgYSBzcGVjaWFsIGNsYXNzIHRvIHRoZSBob3N0IG5vZGUgdG8gdHJpZ2dlciBhbmltYXRpb24uXG4gICAgICAgIC8vIE5vdGU6IHdoZW4gYSBwYWdlIGlzIGh5ZHJhdGVkLCB0aGUgYGNvbnRlbnRgIHdvdWxkIGJlIGVtcHR5LFxuICAgICAgICAvLyBzbyB3ZSBkb24ndCB0cmlnZ2VyIGFuIGFuaW1hdGlvbiB0byBhdm9pZCBhIGNvbnRlbnQgZmxpY2tlcmluZ1xuICAgICAgICAvLyB2aXN1YWwgZWZmZWN0LiBJbiBhZGRpdGlvbiwgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdmlldyB0cmFuc2l0aW9ucyAoc3RhcnRWaWV3VHJhbnNpdGlvbiBpcyBwcmVzZW50KSwgdGhlIGFuaW1hdGlvbiBpcyBoYW5kbGVkIGJ5IHRoZSBuYXRpdmUgVmlldyBUcmFuc2l0aW9uIEFQSSBzbyBpdCBkb2VzIG5vdCBuZWVkIHRvIGJlIGRvbmUgaGVyZS5cbiAgICAgICAgdGhpcy5hbmltYXRlQ29udGVudCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnRDb250YWluZXIuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB9XG5cbiAgICBpZiAoaXNCcm93c2VyKSB7XG4gICAgICAvLyBGaXJzdCB3ZSBzZXR1cCBldmVudCBsaXN0ZW5lcnMgb24gdGhlIEhUTUwgd2UganVzdCBsb2FkZWQuXG4gICAgICAvLyBXZSB3YW50IHRvIGRvIHRoaXMgYmVmb3JlIHRoaW5ncyBsaWtlIHRoZSBleGFtcGxlIHZpZXdlcnMgYXJlIGxvYWRlZC5cbiAgICAgIHRoaXMuc2V0dXBBbmNob3JMaXN0ZW5lcnMoY29udGVudENvbnRhaW5lcik7XG4gICAgICAvLyBSZXdyaXRlIHJlbGF0aXZlIGFuY2hvcnMgKGhyZWZzIHN0YXJ0aW5nIHdpdGggYCNgKSBiZWNhdXNlIHJlbGF0aXZlIGhyZWZzIGFyZSByZWxhdGl2ZSB0byB0aGUgYmFzZSBVUkwsIHdoaWNoIGlzICcvJ1xuICAgICAgdGhpcy5yZXdyaXRlUmVsYXRpdmVBbmNob3JzKGNvbnRlbnRDb250YWluZXIpO1xuICAgICAgLy8gSW4gY2FzZSB3aGVuIGNvbnRlbnQgY29udGFpbnMgcGxhY2Vob2xkZXJzIGZvciBleGVjdXRhYmxlIGV4YW1wbGVzLCBjcmVhdGUgRXhhbXBsZVZpZXdlciBjb21wb25lbnRzLlxuICAgICAgYXdhaXQgdGhpcy5sb2FkRXhhbXBsZXMoKTtcbiAgICAgIC8vIEluIGNhc2Ugd2hlbiBjb250ZW50IGNvbnRhaW5zIHN0YXRpYyBjb2RlIHNuaXBwZXRzLCB0aGVuIGNyZWF0ZSBidXR0b25zXG4gICAgICAvLyByZXNwb25zaWJsZSBmb3IgY29weSBzb3VyY2UgY29kZS5cbiAgICAgIHRoaXMubG9hZENvcHlTb3VyY2VDb2RlQnV0dG9ucygpO1xuICAgIH1cblxuICAgIC8vIERpc3BsYXkgQnJlYWRjcnVtYiBjb21wb25lbnQgaWYgdGhlIGA8ZG9jcy1icmVhZGNydW1iPmAgZWxlbWVudCBleGlzdHNcbiAgICB0aGlzLmxvYWRCcmVhZGNydW1iKGNvbnRlbnRDb250YWluZXIpO1xuXG4gICAgLy8gRGlzcGxheSBJY29uIGNvbXBvbmVudCBpZiB0aGUgYDxkb2NzLWljb24+YCBlbGVtZW50IGV4aXN0c1xuICAgIHRoaXMubG9hZEljb25zKGNvbnRlbnRDb250YWluZXIpO1xuXG4gICAgLy8gUmVuZGVyIFRvQ1xuICAgIHRoaXMucmVuZGVyVGFibGVPZkNvbnRlbnRzKGNvbnRlbnRDb250YWluZXIpO1xuXG4gICAgdGhpcy5jb250ZW50TG9hZGVkLm5leHQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIEV4YW1wbGVWaWV3ZXIgY29tcG9uZW50IHdoZW46XG4gICAqIC0gZXhpc3RzIGRvY3MtY29kZS1tdWx0aWZpbGUgZWxlbWVudCB3aXRoIG11bHRpcGxlIGZpbGVzIE9SXG4gICAqIC0gZXhpc3RzIGRvY3MtY29kZSBlbGVtZW50IHdpdGggc2luZ2xlIGZpbGUgQU5EXG4gICAqICAgLSAncHJldmlldycgYXR0cmlidXRlIHdhcyBwcm92aWRlZCBPUlxuICAgKiAgIC0gJ3Zpc2libGVMaW5lcycgYXR0cmlidXRlIHdhcyBwcm92aWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBsb2FkRXhhbXBsZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbXVsdGlmaWxlQ29kZUV4YW1wbGVzID0gPEhUTUxFbGVtZW50W10+KFxuICAgICAgQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKERPQ1NfQ09ERV9NVVRMSUZJTEVfU0VMRUNUT1IpKVxuICAgICk7XG5cbiAgICBmb3IgKGxldCBwbGFjZWhvbGRlciBvZiBtdWx0aWZpbGVDb2RlRXhhbXBsZXMpIHtcbiAgICAgIGNvbnN0IHBhdGggPSBwbGFjZWhvbGRlci5nZXRBdHRyaWJ1dGUoJ3BhdGgnKSE7XG4gICAgICBjb25zdCBzbmlwcGV0cyA9IHRoaXMuZ2V0Q29kZVNuaXBwZXRzRnJvbU11bHRpZmlsZVdyYXBwZXIocGxhY2Vob2xkZXIpO1xuICAgICAgYXdhaXQgdGhpcy5yZW5kZXJFeGFtcGxlVmlld2VyQ29tcG9uZW50cyhwbGFjZWhvbGRlciwgc25pcHBldHMsIHBhdGgpO1xuICAgIH1cblxuICAgIGNvbnN0IGRvY3NDb2RlRWxlbWVudHMgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKERPQ1NfQ09ERV9TRUxFQ1RPUik7XG5cbiAgICBmb3IgKGNvbnN0IHBsYWNlaG9sZGVyIG9mIGRvY3NDb2RlRWxlbWVudHMpIHtcbiAgICAgIGNvbnN0IHNuaXBwZXQgPSB0aGlzLmdldFN0YW5kYWxvbmVDb2RlU25pcHBldChwbGFjZWhvbGRlcik7XG4gICAgICBpZiAoc25pcHBldCkge1xuICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckV4YW1wbGVWaWV3ZXJDb21wb25lbnRzKHBsYWNlaG9sZGVyLCBbc25pcHBldF0sIHNuaXBwZXQubmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJUYWJsZU9mQ29udGVudHMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaGFzVG9jKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RIZWFkaW5nID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yPEhUTUxIZWFkaW5nRWxlbWVudD4oJ2gyLGgzW2lkXScpO1xuICAgIGlmICghZmlyc3RIZWFkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2luY2UgdGhlIGNvbnRlbnQgb2YgdGhlIG1haW4gYXJlYSBpcyBkeW5hbWljYWxseSBjcmVhdGVkIGFuZCB0aGVyZSBpc1xuICAgIC8vIG5vIGhvc3QgZWxlbWVudCBmb3IgYSBUb0MgY29tcG9uZW50LCB3ZSBjcmVhdGUgaXQgbWFudWFsbHkuXG4gICAgbGV0IHRvY0hvc3RFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoVE9DX0hPU1RfRUxFTUVOVF9OQU1FKTtcbiAgICBpZiAoIXRvY0hvc3RFbGVtZW50KSB7XG4gICAgICB0b2NIb3N0RWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChUT0NfSE9TVF9FTEVNRU5UX05BTUUpO1xuICAgICAgdG9jSG9zdEVsZW1lbnQuc2V0QXR0cmlidXRlKFRPQ19TS0lQX0NPTlRFTlRfTUFSS0VSLCAndHJ1ZScpO1xuICAgICAgZmlyc3RIZWFkaW5nPy5wYXJlbnROb2RlPy5pbnNlcnRCZWZvcmUodG9jSG9zdEVsZW1lbnQsIGZpcnN0SGVhZGluZyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJDb21wb25lbnQoVGFibGVPZkNvbnRlbnRzLCB0b2NIb3N0RWxlbWVudCwge2NvbnRlbnRTb3VyY2VFbGVtZW50OiBlbGVtZW50fSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlbmRlckV4YW1wbGVWaWV3ZXJDb21wb25lbnRzKFxuICAgIHBsYWNlaG9sZGVyOiBIVE1MRWxlbWVudCxcbiAgICBzbmlwcGV0czogU25pcHBldFtdLFxuICAgIHBhdGg6IHN0cmluZyxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcHJldmlldyA9IEJvb2xlYW4ocGxhY2Vob2xkZXIuZ2V0QXR0cmlidXRlKCdwcmV2aWV3JykpO1xuICAgIGNvbnN0IHRpdGxlID0gcGxhY2Vob2xkZXIuZ2V0QXR0cmlidXRlKCdoZWFkZXInKSA/PyB1bmRlZmluZWQ7XG4gICAgY29uc3QgZmlyc3RDb2RlU25pcHBldFRpdGxlID1cbiAgICAgIHNuaXBwZXRzLmxlbmd0aCA+IDAgPyBzbmlwcGV0c1swXS50aXRsZSA/PyBzbmlwcGV0c1swXS5uYW1lIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGV4YW1wbGVSZWYgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KEV4YW1wbGVWaWV3ZXIpO1xuXG4gICAgdGhpcy5jb3VudE9mRXhhbXBsZXMrKztcbiAgICBleGFtcGxlUmVmLmluc3RhbmNlLm1ldGFkYXRhID0ge1xuICAgICAgdGl0bGU6IHRpdGxlID8/IGZpcnN0Q29kZVNuaXBwZXRUaXRsZSxcbiAgICAgIHBhdGgsXG4gICAgICBmaWxlczogc25pcHBldHMsXG4gICAgICBwcmV2aWV3LFxuICAgICAgaWQ6IHRoaXMuY291bnRPZkV4YW1wbGVzLFxuICAgIH07XG5cbiAgICBleGFtcGxlUmVmLmluc3RhbmNlLmdpdGh1YlVybCA9IGAke0dJVEhVQl9DT05URU5UX1VSTH0vJHtzbmlwcGV0c1swXS5uYW1lfWA7XG4gICAgZXhhbXBsZVJlZi5pbnN0YW5jZS5zdGFja2JsaXR6VXJsID0gYCR7QVNTRVRTX0VYQU1QTEVTX1BBVEh9LyR7c25pcHBldHNbMF0ubmFtZX0uaHRtbGA7XG5cbiAgICBwbGFjZWhvbGRlci5wYXJlbnRFbGVtZW50IS5yZXBsYWNlQ2hpbGQoZXhhbXBsZVJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LCBwbGFjZWhvbGRlcik7XG5cbiAgICBhd2FpdCBleGFtcGxlUmVmLmluc3RhbmNlLnJlbmRlckV4YW1wbGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29kZVNuaXBwZXRzRnJvbU11bHRpZmlsZVdyYXBwZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBTbmlwcGV0W10ge1xuICAgIGNvbnN0IHRhYnMgPSA8RWxlbWVudFtdPkFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKERPQ1NfQ09ERV9TRUxFQ1RPUikpO1xuXG4gICAgcmV0dXJuIHRhYnMubWFwKCh0YWIpID0+ICh7XG4gICAgICBuYW1lOiB0YWIuZ2V0QXR0cmlidXRlKCdwYXRoJykgPz8gdGFiLmdldEF0dHJpYnV0ZSgnaGVhZGVyJykgPz8gJycsXG4gICAgICBjb250ZW50OiB0YWIuaW5uZXJIVE1MLFxuICAgICAgdmlzaWJsZUxpbmVzUmFuZ2U6IHRhYi5nZXRBdHRyaWJ1dGUoJ3Zpc2libGVMaW5lcycpID8/IHVuZGVmaW5lZCxcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIGdldFN0YW5kYWxvbmVDb2RlU25pcHBldChlbGVtZW50OiBIVE1MRWxlbWVudCk6IFNuaXBwZXQgfCBudWxsIHtcbiAgICBjb25zdCB2aXNpYmxlTGluZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgndmlzaWJsZUxpbmVzJykgPz8gdW5kZWZpbmVkO1xuICAgIGNvbnN0IHByZXZpZXcgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgncHJldmlldycpO1xuXG4gICAgaWYgKCF2aXNpYmxlTGluZXMgJiYgIXByZXZpZXcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnRlbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3ByZScpITtcbiAgICBjb25zdCBwYXRoID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3BhdGgnKSE7XG4gICAgY29uc3QgdGl0bGUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaGVhZGVyJykgPz8gdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlLFxuICAgICAgbmFtZTogcGF0aCxcbiAgICAgIGNvbnRlbnQ6IGNvbnRlbnQ/Lm91dGVySFRNTCxcbiAgICAgIHZpc2libGVMaW5lc1JhbmdlOiB2aXNpYmxlTGluZXMsXG4gICAgfTtcbiAgfVxuXG4gIC8vIElmIHRoZSBjb250ZW50IGNvbnRhaW5zIHN0YXRpYyBjb2RlIHNuaXBwZXRzLCB3ZSBzaG91bGQgYWRkIGJ1dHRvbnMgdG8gY29weVxuICAvLyB0aGUgY29kZVxuICBwcml2YXRlIGxvYWRDb3B5U291cmNlQ29kZUJ1dHRvbnMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhdGljQ29kZVNuaXBwZXRzID0gPEVsZW1lbnRbXT4oXG4gICAgICBBcnJheS5mcm9tKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kb2NzLWNvZGU6bm90KFttZXJtYWlkXSknKSlcbiAgICApO1xuXG4gICAgZm9yIChsZXQgY29kZVNuaXBwZXQgb2Ygc3RhdGljQ29kZVNuaXBwZXRzKSB7XG4gICAgICBjb25zdCBjb3B5U291cmNlQ29kZUJ1dHRvbiA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoQ29weVNvdXJjZUNvZGVCdXR0b24pO1xuICAgICAgY29kZVNuaXBwZXQuYXBwZW5kQ2hpbGQoY29weVNvdXJjZUNvZGVCdXR0b24ubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkQnJlYWRjcnVtYihlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGJyZWFkY3J1bWJQbGFjZWhvbGRlciA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignZG9jcy1icmVhZGNydW1iJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgYWN0aXZlTmF2aWdhdGlvbkl0ZW0gPSB0aGlzLm5hdmlnYXRpb25TdGF0ZS5hY3RpdmVOYXZpZ2F0aW9uSXRlbSgpO1xuXG4gICAgaWYgKGJyZWFkY3J1bWJQbGFjZWhvbGRlciAmJiAhIWFjdGl2ZU5hdmlnYXRpb25JdGVtPy5wYXJlbnQpIHtcbiAgICAgIHRoaXMucmVuZGVyQ29tcG9uZW50KEJyZWFkY3J1bWIsIGJyZWFkY3J1bWJQbGFjZWhvbGRlcik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkSWNvbnMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RvY3MtaWNvbicpLmZvckVhY2goKGljb25zUGxhY2Vob2xkZXIpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyQ29tcG9uZW50KEljb25Db21wb25lbnQsIGljb25zUGxhY2Vob2xkZXIgYXMgSFRNTEVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhlbHBlciBtZXRob2QgdG8gcmVuZGVyIGEgY29tcG9uZW50IGR5bmFtaWNhbGx5IGluIGEgY29udGV4dCBvZiB0aGlzIGNsYXNzLlxuICAgKi9cbiAgcHJpdmF0ZSByZW5kZXJDb21wb25lbnQ8VD4oXG4gICAgdHlwZTogVHlwZTxUPixcbiAgICBob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgaW5wdXRzPzoge1trZXk6IHN0cmluZ106IHVua25vd259LFxuICApOiBDb21wb25lbnRSZWY8VD4ge1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNyZWF0ZUNvbXBvbmVudCh0eXBlLCB7XG4gICAgICBob3N0RWxlbWVudCxcbiAgICAgIGVsZW1lbnRJbmplY3RvcjogdGhpcy5pbmplY3RvcixcbiAgICAgIGVudmlyb25tZW50SW5qZWN0b3I6IHRoaXMuZW52aXJvbm1lbnRJbmplY3RvcixcbiAgICB9KTtcblxuICAgIGlmIChpbnB1dHMpIHtcbiAgICAgIGZvciAoY29uc3QgW25hbWUsIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhpbnB1dHMpKSB7XG4gICAgICAgIGNvbXBvbmVudFJlZi5zZXRJbnB1dChuYW1lLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIGFmdGVyIHNldHRpbmcgaW5wdXRzLlxuICAgIGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAvLyBBdHRhY2ggYSB2aWV3IHRvIHRoZSBBcHBsaWNhdGlvblJlZiBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgIC8vIHB1cnBvc2VzIGFuZCBmb3IgaHlkcmF0aW9uIHNlcmlhbGl6YXRpb24gdG8gcGljayBpdCB1cFxuICAgIC8vIGR1cmluZyBTU0cuXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgcmV0dXJuIGNvbXBvbmVudFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBBbmNob3JMaXN0ZW5lcnMoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGFbaHJlZl1gKS5mb3JFYWNoKChhbmNob3IpID0+IHtcbiAgICAgIC8vIEdldCB0aGUgdGFyZ2V0IGVsZW1lbnQncyBJRCBmcm9tIHRoZSBocmVmIGF0dHJpYnV0ZVxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCgoYW5jaG9yIGFzIEhUTUxBbmNob3JFbGVtZW50KS5ocmVmKTtcbiAgICAgIGNvbnN0IGlzRXh0ZXJuYWxMaW5rID0gdXJsLm9yaWdpbiAhPT0gdGhpcy5kb2N1bWVudC5sb2NhdGlvbi5vcmlnaW47XG4gICAgICBpZiAoaXNFeHRlcm5hbExpbmspIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZnJvbUV2ZW50KGFuY2hvciwgJ2NsaWNrJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZikpXG4gICAgICAgIC5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICBoYW5kbGVIcmVmQ2xpY2tFdmVudFdpdGhSb3V0ZXIoZSwgdGhpcy5yb3V0ZXIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmV3cml0ZVJlbGF0aXZlQW5jaG9ycyhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGZvciAoY29uc3QgYW5jaG9yIG9mIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBhW2hyZWZePVwiI1wiXTpub3QoYVtkb3dubG9hZF0pYCkpKSB7XG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKChhbmNob3IgYXMgSFRNTEFuY2hvckVsZW1lbnQpLmhyZWYpO1xuICAgICAgKGFuY2hvciBhcyBIVE1MQW5jaG9yRWxlbWVudCkuaHJlZiA9IHRoaXMubG9jYXRpb24ucGF0aCgpICsgdXJsLmhhc2g7XG4gICAgfVxuICB9XG59XG4iXX0=