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
import { TOC_SKIP_CONTENT_MARKER, NavigationState } from '../../services';
import { TableOfContents } from '../table-of-contents/table-of-contents.component';
import { IconComponent } from '../icon/icon.component';
import { handleHrefClickEventWithRouter } from '../../utils';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { Breadcrumb } from '../breadcrumb/breadcrumb.component';
import { CopySourceCodeButton } from '../copy-source-code-button/copy-source-code-button.component';
import { ExampleViewer } from '../example-viewer/example-viewer.component';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL2RvY3Mtdmlld2VyL2RvY3Mtdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQ0wsY0FBYyxFQUNkLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsZUFBZSxFQUNmLFVBQVUsRUFDVixVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUVMLFdBQVcsRUFHWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLDBCQUEwQixJQUFJLGtCQUFrQixFQUNoRCxZQUFZLEVBQ1osTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDakYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUUzRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDOUQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sOERBQThELENBQUM7QUFDbEcsT0FBTyxFQUFDLGFBQWEs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QUFDLCtCQUErQixDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzNGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFFLE1BQTRCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsTUFBNEIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3ZFLENBQUM7SUFDSCxDQUFDOztrRUFwUVUsU0FBUzs0REFBVCxTQUFTOzttUkFUVixZQUFZO2lGQVNYLFNBQVM7Y0FackIsU0FBUzsyQkFDRSxvQkFBb0IsY0FDbEIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLFlBQ2IsRUFBRSxtQkFFSyx1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJLFFBQy9CO29CQUNKLDhCQUE4QixFQUFFLGdCQUFnQjtpQkFDakQ7Z0JBR1EsVUFBVTtrQkFBbEIsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNJLGFBQWE7a0JBQXRCLE1BQU07O2tGQUhJLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIsIExvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbXBvbmVudFJlZixcbiAgY3JlYXRlQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFbGVtZW50UmVmLFxuICBFbnZpcm9ubWVudEluamVjdG9yLFxuICBpbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBQTEFURk9STV9JRCxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIMm1SW5pdGlhbFJlbmRlclBlbmRpbmdUYXNrcyBhcyBQZW5kaW5nUmVuZGVyVGFza3MsXG4gIEV2ZW50RW1pdHRlcixcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge1RPQ19TS0lQX0NPTlRFTlRfTUFSS0VSLCBOYXZpZ2F0aW9uU3RhdGV9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7VGFibGVPZkNvbnRlbnRzfSBmcm9tICcuLi90YWJsZS1vZi1jb250ZW50cy90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQnO1xuaW1wb3J0IHtJY29uQ29tcG9uZW50fSBmcm9tICcuLi9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7aGFuZGxlSHJlZkNsaWNrRXZlbnRXaXRoUm91dGVyfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQge1NuaXBwZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge2Zyb21FdmVudH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QnJlYWRjcnVtYn0gZnJvbSAnLi4vYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudCc7XG5pbXBvcnQge0NvcHlTb3VyY2VDb2RlQnV0dG9ufSBmcm9tICcuLi9jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi9jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtFeGFtcGxlVmlld2VyfSBmcm9tICcuLi9leGFtcGxlLXZpZXdlci9leGFtcGxlLXZpZXdlci5jb21wb25lbnQnO1xuXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cIkB0eXBlcy9kb20tdmlldy10cmFuc2l0aW9uc1wiIC8+XG5cbmNvbnN0IFRPQ19IT1NUX0VMRU1FTlRfTkFNRSA9ICdkb2NzLXRhYmxlLW9mLWNvbnRlbnRzJztcbmV4cG9ydCBjb25zdCBBU1NFVFNfRVhBTVBMRVNfUEFUSCA9ICdhc3NldHMvY29udGVudC9leGFtcGxlcyc7XG5leHBvcnQgY29uc3QgRE9DU19WSUVXRVJfU0VMRUNUT1IgPSAnZG9jcy12aWV3ZXInO1xuZXhwb3J0IGNvbnN0IERPQ1NfQ09ERV9TRUxFQ1RPUiA9ICcuZG9jcy1jb2RlJztcbmV4cG9ydCBjb25zdCBET0NTX0NPREVfTVVUTElGSUxFX1NFTEVDVE9SID0gJy5kb2NzLWNvZGUtbXVsdGlmaWxlJztcbi8vIFRPRE86IFVwZGF0ZSB0aGUgYnJhbmNoL3NoYVxuZXhwb3J0IGNvbnN0IEdJVEhVQl9DT05URU5UX1VSTCA9XG4gICdodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2Jsb2IvbWFpbi9hZGV2L3NyYy9jb250ZW50L2V4YW1wbGVzLyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogRE9DU19WSUVXRVJfU0VMRUNUT1IsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogJycsXG4gIHN0eWxlVXJsczogWydkb2NzLXZpZXdlci5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuZG9jcy1hbmltYXRlLWNvbnRlbnRdJzogJ2FuaW1hdGVDb250ZW50JyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgRG9jVmlld2VyIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZG9jQ29udGVudD86IHN0cmluZztcbiAgQElucHV0KCkgaGFzVG9jID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBjb250ZW50TG9hZGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudFJlZiA9IGluamVjdChFbGVtZW50UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBsb2NhdGlvbiA9IGluamVjdChMb2NhdGlvbik7XG4gIHByaXZhdGUgcmVhZG9ubHkgbmF2aWdhdGlvblN0YXRlID0gaW5qZWN0KE5hdmlnYXRpb25TdGF0ZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZCA9IGluamVjdChQTEFURk9STV9JRCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgdmlld0NvbnRhaW5lciA9IGluamVjdChWaWV3Q29udGFpbmVyUmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBlbnZpcm9ubWVudEluamVjdG9yID0gaW5qZWN0KEVudmlyb25tZW50SW5qZWN0b3IpO1xuICBwcml2YXRlIHJlYWRvbmx5IGluamVjdG9yID0gaW5qZWN0KEluamVjdG9yKTtcbiAgcHJpdmF0ZSByZWFkb25seSBhcHBSZWYgPSBpbmplY3QoQXBwbGljYXRpb25SZWYpO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtdmFyaWFibGVcbiAgcHJpdmF0ZSBhbmltYXRlQ29udGVudCA9IGZhbHNlO1xuICBwcml2YXRlIHJlYWRvbmx5IHBlbmRpbmdSZW5kZXJUYXNrcyA9IGluamVjdChQZW5kaW5nUmVuZGVyVGFza3MpO1xuXG4gIHByaXZhdGUgY291bnRPZkV4YW1wbGVzID0gMDtcblxuICBhc3luYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdGFza0lkID0gdGhpcy5wZW5kaW5nUmVuZGVyVGFza3MuYWRkKCk7XG4gICAgaWYgKCdkb2NDb250ZW50JyBpbiBjaGFuZ2VzKSB7XG4gICAgICBhd2FpdCB0aGlzLnJlbmRlckNvbnRlbnRzQW5kUnVuQ2xpZW50U2V0dXAodGhpcy5kb2NDb250ZW50ISk7XG4gICAgfVxuICAgIHRoaXMucGVuZGluZ1JlbmRlclRhc2tzLnJlbW92ZSh0YXNrSWQpO1xuICB9XG5cbiAgYXN5bmMgcmVuZGVyQ29udGVudHNBbmRSdW5DbGllbnRTZXR1cChjb250ZW50Pzogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICBjb25zdCBjb250ZW50Q29udGFpbmVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoY29udGVudCkge1xuICAgICAgaWYgKGlzQnJvd3NlciAmJiAhKHRoaXMuZG9jdW1lbnQgYXMgYW55KS5zdGFydFZpZXdUcmFuc2l0aW9uKSB7XG4gICAgICAgIC8vIEFwcGx5IGEgc3BlY2lhbCBjbGFzcyB0byB0aGUgaG9zdCBub2RlIHRvIHRyaWdnZXIgYW5pbWF0aW9uLlxuICAgICAgICAvLyBOb3RlOiB3aGVuIGEgcGFnZSBpcyBoeWRyYXRlZCwgdGhlIGBjb250ZW50YCB3b3VsZCBiZSBlbXB0eSxcbiAgICAgICAgLy8gc28gd2UgZG9uJ3QgdHJpZ2dlciBhbiBhbmltYXRpb24gdG8gYXZvaWQgYSBjb250ZW50IGZsaWNrZXJpbmdcbiAgICAgICAgLy8gdmlzdWFsIGVmZmVjdC4gSW4gYWRkaXRpb24sIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHZpZXcgdHJhbnNpdGlvbnMgKHN0YXJ0Vmlld1RyYW5zaXRpb24gaXMgcHJlc2VudCksIHRoZSBhbmltYXRpb24gaXMgaGFuZGxlZCBieSB0aGUgbmF0aXZlIFZpZXcgVHJhbnNpdGlvbiBBUEkgc28gaXQgZG9lcyBub3QgbmVlZCB0byBiZSBkb25lIGhlcmUuXG4gICAgICAgIHRoaXMuYW5pbWF0ZUNvbnRlbnQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50Q29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgLy8gRmlyc3Qgd2Ugc2V0dXAgZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSBIVE1MIHdlIGp1c3QgbG9hZGVkLlxuICAgICAgLy8gV2Ugd2FudCB0byBkbyB0aGlzIGJlZm9yZSB0aGluZ3MgbGlrZSB0aGUgZXhhbXBsZSB2aWV3ZXJzIGFyZSBsb2FkZWQuXG4gICAgICB0aGlzLnNldHVwQW5jaG9yTGlzdGVuZXJzKGNvbnRlbnRDb250YWluZXIpO1xuICAgICAgLy8gUmV3cml0ZSByZWxhdGl2ZSBhbmNob3JzIChocmVmcyBzdGFydGluZyB3aXRoIGAjYCkgYmVjYXVzZSByZWxhdGl2ZSBocmVmcyBhcmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgVVJMLCB3aGljaCBpcyAnLydcbiAgICAgIHRoaXMucmV3cml0ZVJlbGF0aXZlQW5jaG9ycyhjb250ZW50Q29udGFpbmVyKTtcbiAgICAgIC8vIEluIGNhc2Ugd2hlbiBjb250ZW50IGNvbnRhaW5zIHBsYWNlaG9sZGVycyBmb3IgZXhlY3V0YWJsZSBleGFtcGxlcywgY3JlYXRlIEV4YW1wbGVWaWV3ZXIgY29tcG9uZW50cy5cbiAgICAgIGF3YWl0IHRoaXMubG9hZEV4YW1wbGVzKCk7XG4gICAgICAvLyBJbiBjYXNlIHdoZW4gY29udGVudCBjb250YWlucyBzdGF0aWMgY29kZSBzbmlwcGV0cywgdGhlbiBjcmVhdGUgYnV0dG9uc1xuICAgICAgLy8gcmVzcG9uc2libGUgZm9yIGNvcHkgc291cmNlIGNvZGUuXG4gICAgICB0aGlzLmxvYWRDb3B5U291cmNlQ29kZUJ1dHRvbnMoKTtcbiAgICB9XG5cbiAgICAvLyBEaXNwbGF5IEJyZWFkY3J1bWIgY29tcG9uZW50IGlmIHRoZSBgPGRvY3MtYnJlYWRjcnVtYj5gIGVsZW1lbnQgZXhpc3RzXG4gICAgdGhpcy5sb2FkQnJlYWRjcnVtYihjb250ZW50Q29udGFpbmVyKTtcblxuICAgIC8vIERpc3BsYXkgSWNvbiBjb21wb25lbnQgaWYgdGhlIGA8ZG9jcy1pY29uPmAgZWxlbWVudCBleGlzdHNcbiAgICB0aGlzLmxvYWRJY29ucyhjb250ZW50Q29udGFpbmVyKTtcblxuICAgIC8vIFJlbmRlciBUb0NcbiAgICB0aGlzLnJlbmRlclRhYmxlT2ZDb250ZW50cyhjb250ZW50Q29udGFpbmVyKTtcblxuICAgIHRoaXMuY29udGVudExvYWRlZC5uZXh0KCk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBFeGFtcGxlVmlld2VyIGNvbXBvbmVudCB3aGVuOlxuICAgKiAtIGV4aXN0cyBkb2NzLWNvZGUtbXVsdGlmaWxlIGVsZW1lbnQgd2l0aCBtdWx0aXBsZSBmaWxlcyBPUlxuICAgKiAtIGV4aXN0cyBkb2NzLWNvZGUgZWxlbWVudCB3aXRoIHNpbmdsZSBmaWxlIEFORFxuICAgKiAgIC0gJ3ByZXZpZXcnIGF0dHJpYnV0ZSB3YXMgcHJvdmlkZWQgT1JcbiAgICogICAtICd2aXNpYmxlTGluZXMnIGF0dHJpYnV0ZSB3YXMgcHJvdmlkZWRcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgbG9hZEV4YW1wbGVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG11bHRpZmlsZUNvZGVFeGFtcGxlcyA9IDxIVE1MRWxlbWVudFtdPihcbiAgICAgIEFycmF5LmZyb20odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChET0NTX0NPREVfTVVUTElGSUxFX1NFTEVDVE9SKSlcbiAgICApO1xuXG4gICAgZm9yIChsZXQgcGxhY2Vob2xkZXIgb2YgbXVsdGlmaWxlQ29kZUV4YW1wbGVzKSB7XG4gICAgICBjb25zdCBwYXRoID0gcGxhY2Vob2xkZXIuZ2V0QXR0cmlidXRlKCdwYXRoJykhO1xuICAgICAgY29uc3Qgc25pcHBldHMgPSB0aGlzLmdldENvZGVTbmlwcGV0c0Zyb21NdWx0aWZpbGVXcmFwcGVyKHBsYWNlaG9sZGVyKTtcbiAgICAgIGF3YWl0IHRoaXMucmVuZGVyRXhhbXBsZVZpZXdlckNvbXBvbmVudHMocGxhY2Vob2xkZXIsIHNuaXBwZXRzLCBwYXRoKTtcbiAgICB9XG5cbiAgICBjb25zdCBkb2NzQ29kZUVsZW1lbnRzID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChET0NTX0NPREVfU0VMRUNUT1IpO1xuXG4gICAgZm9yIChjb25zdCBwbGFjZWhvbGRlciBvZiBkb2NzQ29kZUVsZW1lbnRzKSB7XG4gICAgICBjb25zdCBzbmlwcGV0ID0gdGhpcy5nZXRTdGFuZGFsb25lQ29kZVNuaXBwZXQocGxhY2Vob2xkZXIpO1xuICAgICAgaWYgKHNuaXBwZXQpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXJFeGFtcGxlVmlld2VyQ29tcG9uZW50cyhwbGFjZWhvbGRlciwgW3NuaXBwZXRdLCBzbmlwcGV0Lm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyVGFibGVPZkNvbnRlbnRzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhc1RvYykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0SGVhZGluZyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSGVhZGluZ0VsZW1lbnQ+KCdoMixoM1tpZF0nKTtcbiAgICBpZiAoIWZpcnN0SGVhZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNpbmNlIHRoZSBjb250ZW50IG9mIHRoZSBtYWluIGFyZWEgaXMgZHluYW1pY2FsbHkgY3JlYXRlZCBhbmQgdGhlcmUgaXNcbiAgICAvLyBubyBob3N0IGVsZW1lbnQgZm9yIGEgVG9DIGNvbXBvbmVudCwgd2UgY3JlYXRlIGl0IG1hbnVhbGx5LlxuICAgIGxldCB0b2NIb3N0RWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFRPQ19IT1NUX0VMRU1FTlRfTkFNRSk7XG4gICAgaWYgKCF0b2NIb3N0RWxlbWVudCkge1xuICAgICAgdG9jSG9zdEVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoVE9DX0hPU1RfRUxFTUVOVF9OQU1FKTtcbiAgICAgIHRvY0hvc3RFbGVtZW50LnNldEF0dHJpYnV0ZShUT0NfU0tJUF9DT05URU5UX01BUktFUiwgJ3RydWUnKTtcbiAgICAgIGZpcnN0SGVhZGluZz8ucGFyZW50Tm9kZT8uaW5zZXJ0QmVmb3JlKHRvY0hvc3RFbGVtZW50LCBmaXJzdEhlYWRpbmcpO1xuICAgIH1cblxuICAgIHRoaXMucmVuZGVyQ29tcG9uZW50KFRhYmxlT2ZDb250ZW50cywgdG9jSG9zdEVsZW1lbnQsIHtjb250ZW50U291cmNlRWxlbWVudDogZWxlbWVudH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZW5kZXJFeGFtcGxlVmlld2VyQ29tcG9uZW50cyhcbiAgICBwbGFjZWhvbGRlcjogSFRNTEVsZW1lbnQsXG4gICAgc25pcHBldHM6IFNuaXBwZXRbXSxcbiAgICBwYXRoOiBzdHJpbmcsXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByZXZpZXcgPSBCb29sZWFuKHBsYWNlaG9sZGVyLmdldEF0dHJpYnV0ZSgncHJldmlldycpKTtcbiAgICBjb25zdCB0aXRsZSA9IHBsYWNlaG9sZGVyLmdldEF0dHJpYnV0ZSgnaGVhZGVyJykgPz8gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGZpcnN0Q29kZVNuaXBwZXRUaXRsZSA9XG4gICAgICBzbmlwcGV0cy5sZW5ndGggPiAwID8gc25pcHBldHNbMF0udGl0bGUgPz8gc25pcHBldHNbMF0ubmFtZSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBleGFtcGxlUmVmID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChFeGFtcGxlVmlld2VyKTtcblxuICAgIHRoaXMuY291bnRPZkV4YW1wbGVzKys7XG4gICAgZXhhbXBsZVJlZi5pbnN0YW5jZS5tZXRhZGF0YSA9IHtcbiAgICAgIHRpdGxlOiB0aXRsZSA/PyBmaXJzdENvZGVTbmlwcGV0VGl0bGUsXG4gICAgICBwYXRoLFxuICAgICAgZmlsZXM6IHNuaXBwZXRzLFxuICAgICAgcHJldmlldyxcbiAgICAgIGlkOiB0aGlzLmNvdW50T2ZFeGFtcGxlcyxcbiAgICB9O1xuXG4gICAgZXhhbXBsZVJlZi5pbnN0YW5jZS5naXRodWJVcmwgPSBgJHtHSVRIVUJfQ09OVEVOVF9VUkx9LyR7c25pcHBldHNbMF0ubmFtZX1gO1xuICAgIGV4YW1wbGVSZWYuaW5zdGFuY2Uuc3RhY2tibGl0elVybCA9IGAke0FTU0VUU19FWEFNUExFU19QQVRIfS8ke3NuaXBwZXRzWzBdLm5hbWV9Lmh0bWxgO1xuXG4gICAgcGxhY2Vob2xkZXIucGFyZW50RWxlbWVudCEucmVwbGFjZUNoaWxkKGV4YW1wbGVSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCwgcGxhY2Vob2xkZXIpO1xuXG4gICAgYXdhaXQgZXhhbXBsZVJlZi5pbnN0YW5jZS5yZW5kZXJFeGFtcGxlKCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvZGVTbmlwcGV0c0Zyb21NdWx0aWZpbGVXcmFwcGVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogU25pcHBldFtdIHtcbiAgICBjb25zdCB0YWJzID0gPEVsZW1lbnRbXT5BcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChET0NTX0NPREVfU0VMRUNUT1IpKTtcblxuICAgIHJldHVybiB0YWJzLm1hcCgodGFiKSA9PiAoe1xuICAgICAgbmFtZTogdGFiLmdldEF0dHJpYnV0ZSgncGF0aCcpID8/IHRhYi5nZXRBdHRyaWJ1dGUoJ2hlYWRlcicpID8/ICcnLFxuICAgICAgY29udGVudDogdGFiLmlubmVySFRNTCxcbiAgICAgIHZpc2libGVMaW5lc1JhbmdlOiB0YWIuZ2V0QXR0cmlidXRlKCd2aXNpYmxlTGluZXMnKSA/PyB1bmRlZmluZWQsXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRTdGFuZGFsb25lQ29kZVNuaXBwZXQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBTbmlwcGV0IHwgbnVsbCB7XG4gICAgY29uc3QgdmlzaWJsZUxpbmVzID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3Zpc2libGVMaW5lcycpID8/IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcmV2aWV3ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3ByZXZpZXcnKTtcblxuICAgIGlmICghdmlzaWJsZUxpbmVzICYmICFwcmV2aWV3KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBjb250ZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwcmUnKSE7XG4gICAgY29uc3QgcGF0aCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdwYXRoJykhO1xuICAgIGNvbnN0IHRpdGxlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hlYWRlcicpID8/IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB7XG4gICAgICB0aXRsZSxcbiAgICAgIG5hbWU6IHBhdGgsXG4gICAgICBjb250ZW50OiBjb250ZW50Py5vdXRlckhUTUwsXG4gICAgICB2aXNpYmxlTGluZXNSYW5nZTogdmlzaWJsZUxpbmVzLFxuICAgIH07XG4gIH1cblxuICAvLyBJZiB0aGUgY29udGVudCBjb250YWlucyBzdGF0aWMgY29kZSBzbmlwcGV0cywgd2Ugc2hvdWxkIGFkZCBidXR0b25zIHRvIGNvcHlcbiAgLy8gdGhlIGNvZGVcbiAgcHJpdmF0ZSBsb2FkQ29weVNvdXJjZUNvZGVCdXR0b25zKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXRpY0NvZGVTbmlwcGV0cyA9IDxFbGVtZW50W10+KFxuICAgICAgQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZG9jcy1jb2RlOm5vdChbbWVybWFpZF0pJykpXG4gICAgKTtcblxuICAgIGZvciAobGV0IGNvZGVTbmlwcGV0IG9mIHN0YXRpY0NvZGVTbmlwcGV0cykge1xuICAgICAgY29uc3QgY29weVNvdXJjZUNvZGVCdXR0b24gPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlQ29tcG9uZW50KENvcHlTb3VyY2VDb2RlQnV0dG9uKTtcbiAgICAgIGNvZGVTbmlwcGV0LmFwcGVuZENoaWxkKGNvcHlTb3VyY2VDb2RlQnV0dG9uLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEJyZWFkY3J1bWIoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBicmVhZGNydW1iUGxhY2Vob2xkZXIgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RvY3MtYnJlYWRjcnVtYicpIGFzIEhUTUxFbGVtZW50O1xuICAgIGNvbnN0IGFjdGl2ZU5hdmlnYXRpb25JdGVtID0gdGhpcy5uYXZpZ2F0aW9uU3RhdGUuYWN0aXZlTmF2aWdhdGlvbkl0ZW0oKTtcblxuICAgIGlmIChicmVhZGNydW1iUGxhY2Vob2xkZXIgJiYgISFhY3RpdmVOYXZpZ2F0aW9uSXRlbT8ucGFyZW50KSB7XG4gICAgICB0aGlzLnJlbmRlckNvbXBvbmVudChCcmVhZGNydW1iLCBicmVhZGNydW1iUGxhY2Vob2xkZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEljb25zKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkb2NzLWljb24nKS5mb3JFYWNoKChpY29uc1BsYWNlaG9sZGVyKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlckNvbXBvbmVudChJY29uQ29tcG9uZW50LCBpY29uc1BsYWNlaG9sZGVyIGFzIEhUTUxFbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgbWV0aG9kIHRvIHJlbmRlciBhIGNvbXBvbmVudCBkeW5hbWljYWxseSBpbiBhIGNvbnRleHQgb2YgdGhpcyBjbGFzcy5cbiAgICovXG4gIHByaXZhdGUgcmVuZGVyQ29tcG9uZW50PFQ+KFxuICAgIHR5cGU6IFR5cGU8VD4sXG4gICAgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIGlucHV0cz86IHtba2V5OiBzdHJpbmddOiB1bmtub3dufSxcbiAgKTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBjcmVhdGVDb21wb25lbnQodHlwZSwge1xuICAgICAgaG9zdEVsZW1lbnQsXG4gICAgICBlbGVtZW50SW5qZWN0b3I6IHRoaXMuaW5qZWN0b3IsXG4gICAgICBlbnZpcm9ubWVudEluamVjdG9yOiB0aGlzLmVudmlyb25tZW50SW5qZWN0b3IsXG4gICAgfSk7XG5cbiAgICBpZiAoaW5wdXRzKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoaW5wdXRzKSkge1xuICAgICAgICBjb21wb25lbnRSZWYuc2V0SW5wdXQobmFtZSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBhZnRlciBzZXR0aW5nIGlucHV0cy5cbiAgICBjb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgLy8gQXR0YWNoIGEgdmlldyB0byB0aGUgQXBwbGljYXRpb25SZWYgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAvLyBwdXJwb3NlcyBhbmQgZm9yIGh5ZHJhdGlvbiBzZXJpYWxpemF0aW9uIHRvIHBpY2sgaXQgdXBcbiAgICAvLyBkdXJpbmcgU1NHLlxuICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIHJldHVybiBjb21wb25lbnRSZWY7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQW5jaG9yTGlzdGVuZXJzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGBhW2hyZWZdYCkuZm9yRWFjaCgoYW5jaG9yKSA9PiB7XG4gICAgICAvLyBHZXQgdGhlIHRhcmdldCBlbGVtZW50J3MgSUQgZnJvbSB0aGUgaHJlZiBhdHRyaWJ1dGVcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoKGFuY2hvciBhcyBIVE1MQW5jaG9yRWxlbWVudCkuaHJlZik7XG4gICAgICBjb25zdCBpc0V4dGVybmFsTGluayA9IHVybC5vcmlnaW4gIT09IHRoaXMuZG9jdW1lbnQubG9jYXRpb24ub3JpZ2luO1xuICAgICAgaWYgKGlzRXh0ZXJuYWxMaW5rKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZyb21FdmVudChhbmNob3IsICdjbGljaycpXG4gICAgICAgIC5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpKVxuICAgICAgICAuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgaGFuZGxlSHJlZkNsaWNrRXZlbnRXaXRoUm91dGVyKGUsIHRoaXMucm91dGVyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJld3JpdGVSZWxhdGl2ZUFuY2hvcnMoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICBmb3IgKGNvbnN0IGFuY2hvciBvZiBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgYVtocmVmXj1cIiNcIl06bm90KGFbZG93bmxvYWRdKWApKSkge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCgoYW5jaG9yIGFzIEhUTUxBbmNob3JFbGVtZW50KS5ocmVmKTtcbiAgICAgIChhbmNob3IgYXMgSFRNTEFuY2hvckVsZW1lbnQpLmhyZWYgPSB0aGlzLmxvY2F0aW9uLnBhdGgoKSArIHVybC5oYXNoO1xuICAgIH1cbiAgfVxufVxuIl19