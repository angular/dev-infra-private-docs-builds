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
import { TOC_SKIP_CONTENT_MARKER, NavigationState } from '../../services/index';
import { TableOfContents } from '../table-of-contents/table-of-contents.component';
import { IconComponent } from '../icon/icon.component';
import { handleHrefClickEventWithRouter } from '../../utils/index';
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
DocViewer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: DocViewer, deps: [], target: i0.ɵɵFactoryTarget.Component });
DocViewer.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0-next.1", type: DocViewer, isStandalone: true, selector: "docs-viewer", inputs: { docContent: "docContent", hasToc: "hasToc" }, outputs: { contentLoaded: "contentLoaded" }, host: { properties: { "class.docs-animate-content": "animateContent" } }, usesOnChanges: true, ngImport: i0, template: '', isInline: true, styles: [":host{--translate-y: clamp(5px, 0.25em, 7px)}.docs-viewer{display:flex;flex-direction:column;padding:var(--layout-padding);max-width:var(--page-width);width:100%;box-sizing:border-box}@media only screen and (max-width: 1430px){.docs-viewer{container:docs-content/inline-size}}@media only screen and (min-width: 1430px)and (max-width: 1550px){adev-docs .docs-viewer{width:calc(100% - 195px - var(--layout-padding));max-width:var(--page-width)}}.docs-viewer pre{margin-block:0;padding-block:.75rem}.docs-viewer h1 .docs-anchor,.docs-viewer h2 .docs-anchor,.docs-viewer h3 .docs-anchor,.docs-viewer h4 .docs-anchor,.docs-viewer h5 .docs-anchor,.docs-viewer h6 .docs-anchor{margin-block-start:2.5rem;display:inline-block;color:inherit}.docs-viewer h1 .docs-anchor::after,.docs-viewer h2 .docs-anchor::after,.docs-viewer h3 .docs-anchor::after,.docs-viewer h4 .docs-anchor::after,.docs-viewer h5 .docs-anchor::after,.docs-viewer h6 .docs-anchor::after{content:\"\uE157\";font-family:\"Material Symbols Outlined\";opacity:0;margin-left:8px;vertical-align:middle;color:var(--quaternary-contrast);font-size:clamp(18px,1.25em,30px);transition:opacity .3s ease}.docs-viewer h1 .docs-anchor:hover::after,.docs-viewer h2 .docs-anchor:hover::after,.docs-viewer h3 .docs-anchor:hover::after,.docs-viewer h4 .docs-anchor:hover::after,.docs-viewer h5 .docs-anchor:hover::after,.docs-viewer h6 .docs-anchor:hover::after{opacity:1}.docs-viewer h1{font-size:2.5rem;margin-block-end:0}.docs-viewer h2{font-size:2rem;margin-block-end:.5rem}.docs-viewer h3{font-size:1.5rem;margin-block-end:.5rem}.docs-viewer h4{font-size:1.25rem;margin-block-end:.5rem}.docs-viewer h5{font-size:1rem;margin-block-end:0}.docs-viewer h6{font-size:.875rem;margin-block-end:0}.docs-viewer>:last-child{margin-block-end:0}.docs-viewer a:not(.docs-github-links):not(.docs-card):not(.docs-pill):not(.docs-example-github-link)[href^=\"http:\"]::after,.docs-viewer a:not(.docs-github-links):not(.docs-card):not(.docs-pill):not(.docs-example-github-link)[href^=\"https:\"]::after{display:inline-block;content:\"\uE89E\";font-family:\"Material Symbols Outlined\";margin-left:.2rem;vertical-align:middle}.docs-viewer-scroll-margin-large h2,.docs-viewer-scroll-margin-large h3{scroll-margin:5em}.docs-header{margin-block-end:1rem}.docs-header>p:first-child{color:var(--quaternary-contrast);font-weight:500;margin:0}.docs-page-title{display:flex;justify-content:space-between}.docs-page-title h1{margin-block:0;font-size:2.25rem}.docs-page-title a{color:var(--primary-contrast);height:fit-content}.docs-page-title a docs-icon{color:var(--gray-400);transition:color .3s ease}.docs-page-title a:hover docs-icon{color:var(--primary-contrast)}/*# sourceMappingURL=docs-viewer.component.css.map */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: DocViewer, decorators: [{
            type: Component,
            args: [{ selector: DOCS_VIEWER_SELECTOR, standalone: true, imports: [CommonModule], template: '', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[class.docs-animate-content]': 'animateContent',
                    }, styles: [":host{--translate-y: clamp(5px, 0.25em, 7px)}.docs-viewer{display:flex;flex-direction:column;padding:var(--layout-padding);max-width:var(--page-width);width:100%;box-sizing:border-box}@media only screen and (max-width: 1430px){.docs-viewer{container:docs-content/inline-size}}@media only screen and (min-width: 1430px)and (max-width: 1550px){adev-docs .docs-viewer{width:calc(100% - 195px - var(--layout-padding));max-width:var(--page-width)}}.docs-viewer pre{margin-block:0;padding-block:.75rem}.docs-viewer h1 .docs-anchor,.docs-viewer h2 .docs-anchor,.docs-viewer h3 .docs-anchor,.docs-viewer h4 .docs-anchor,.docs-viewer h5 .docs-anchor,.docs-viewer h6 .docs-anchor{margin-block-start:2.5rem;display:inline-block;color:inherit}.docs-viewer h1 .docs-anchor::after,.docs-viewer h2 .docs-anchor::after,.docs-viewer h3 .docs-anchor::after,.docs-viewer h4 .docs-anchor::after,.docs-viewer h5 .docs-anchor::after,.docs-viewer h6 .docs-anchor::after{content:\"\uE157\";font-family:\"Material Symbols Outlined\";opacity:0;margin-left:8px;vertical-align:middle;color:var(--quaternary-contrast);font-size:clamp(18px,1.25em,30px);transition:opacity .3s ease}.docs-viewer h1 .docs-anchor:hover::after,.docs-viewer h2 .docs-anchor:hover::after,.docs-viewer h3 .docs-anchor:hover::after,.docs-viewer h4 .docs-anchor:hover::after,.docs-viewer h5 .docs-anchor:hover::after,.docs-viewer h6 .docs-anchor:hover::after{opacity:1}.docs-viewer h1{font-size:2.5rem;margin-block-end:0}.docs-viewer h2{font-size:2rem;margin-block-end:.5rem}.docs-viewer h3{font-size:1.5rem;margin-block-end:.5rem}.docs-viewer h4{font-size:1.25rem;margin-block-end:.5rem}.docs-viewer h5{font-size:1rem;margin-block-end:0}.docs-viewer h6{font-size:.875rem;margin-block-end:0}.docs-viewer>:last-child{margin-block-end:0}.docs-viewer a:not(.docs-github-links):not(.docs-card):not(.docs-pill):not(.docs-example-github-link)[href^=\"http:\"]::after,.docs-viewer a:not(.docs-github-links):not(.docs-card):not(.docs-pill):not(.docs-example-github-link)[href^=\"https:\"]::after{display:inline-block;content:\"\uE89E\";font-family:\"Material Symbols Outlined\";margin-left:.2rem;vertical-align:middle}.docs-viewer-scroll-margin-large h2,.docs-viewer-scroll-margin-large h3{scroll-margin:5em}.docs-header{margin-block-end:1rem}.docs-header>p:first-child{color:var(--quaternary-contrast);font-weight:500;margin:0}.docs-page-title{display:flex;justify-content:space-between}.docs-page-title h1{margin-block:0;font-size:2.25rem}.docs-page-title a{color:var(--primary-contrast);height:fit-content}.docs-page-title a docs-icon{color:var(--gray-400);transition:color .3s ease}.docs-page-title a:hover docs-icon{color:var(--primary-contrast)}/*# sourceMappingURL=docs-viewer.component.css.map */\n"] }]
        }], propDecorators: { docContent: [{
                type: Input
            }], hasToc: [{
                type: Input
            }], contentLoaded: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL2RvY3Mtdmlld2VyL2RvY3Mtdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRixPQUFPLEVBQ0wsY0FBYyxFQUNkLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsZUFBZSxFQUNmLFVBQVUsRUFDVixVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTixRQUFRLEVBQ1IsS0FBSyxFQUVMLFdBQVcsRUFHWCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLDBCQUEwQixJQUFJLGtCQUFrQixFQUNoRCxZQUFZLEVBQ1osTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxlQUFlLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM5RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDakYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRWpFLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUM5RCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSw4REFBOEQsQ0FBQztBQUNsRyxPQUFPLEVBQUMsYUFB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LENBQUMsK0JBQStCLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0YsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUUsTUFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxNQUE0QixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDdkUsQ0FBQztJQUNILENBQUM7OzZHQXBRVSxTQUFTO2lHQUFULFNBQVMsMlFBUlYsRUFBRSwrdkZBREYsWUFBWTtrR0FTWCxTQUFTO2tCQVpyQixTQUFTOytCQUNFLG9CQUFvQixjQUNsQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYixFQUFFLG1CQUVLLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUksUUFDL0I7d0JBQ0osOEJBQThCLEVBQUUsZ0JBQWdCO3FCQUNqRDs4QkFHUSxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDSSxhQUFhO3NCQUF0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyLCBMb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIGNyZWF0ZUNvbXBvbmVudCxcbiAgRGVzdHJveVJlZixcbiAgRWxlbWVudFJlZixcbiAgRW52aXJvbm1lbnRJbmplY3RvcixcbiAgaW5qZWN0LFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUExBVEZPUk1fSUQsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFR5cGUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICDJtUluaXRpYWxSZW5kZXJQZW5kaW5nVGFza3MgYXMgUGVuZGluZ1JlbmRlclRhc2tzLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtUT0NfU0tJUF9DT05URU5UX01BUktFUiwgTmF2aWdhdGlvblN0YXRlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9pbmRleCc7XG5pbXBvcnQge1RhYmxlT2ZDb250ZW50c30gZnJvbSAnLi4vdGFibGUtb2YtY29udGVudHMvdGFibGUtb2YtY29udGVudHMuY29tcG9uZW50JztcbmltcG9ydCB7SWNvbkNvbXBvbmVudH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQge2hhbmRsZUhyZWZDbGlja0V2ZW50V2l0aFJvdXRlcn0gZnJvbSAnLi4vLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHtTbmlwcGV0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2luZGV4JztcbmltcG9ydCB7Um91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0JyZWFkY3J1bWJ9IGZyb20gJy4uL2JyZWFkY3J1bWIvYnJlYWRjcnVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHtDb3B5U291cmNlQ29kZUJ1dHRvbn0gZnJvbSAnLi4vY29weS1zb3VyY2UtY29kZS1idXR0b24vY29weS1zb3VyY2UtY29kZS1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7RXhhbXBsZVZpZXdlcn0gZnJvbSAnLi4vZXhhbXBsZS12aWV3ZXIvZXhhbXBsZS12aWV3ZXIuY29tcG9uZW50JztcblxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJAdHlwZXMvZG9tLXZpZXctdHJhbnNpdGlvbnNcIiAvPlxuXG5jb25zdCBUT0NfSE9TVF9FTEVNRU5UX05BTUUgPSAnZG9jcy10YWJsZS1vZi1jb250ZW50cyc7XG5leHBvcnQgY29uc3QgQVNTRVRTX0VYQU1QTEVTX1BBVEggPSAnYXNzZXRzL2NvbnRlbnQvZXhhbXBsZXMnO1xuZXhwb3J0IGNvbnN0IERPQ1NfVklFV0VSX1NFTEVDVE9SID0gJ2RvY3Mtdmlld2VyJztcbmV4cG9ydCBjb25zdCBET0NTX0NPREVfU0VMRUNUT1IgPSAnLmRvY3MtY29kZSc7XG5leHBvcnQgY29uc3QgRE9DU19DT0RFX01VVExJRklMRV9TRUxFQ1RPUiA9ICcuZG9jcy1jb2RlLW11bHRpZmlsZSc7XG4vLyBUT0RPOiBVcGRhdGUgdGhlIGJyYW5jaC9zaGFcbmV4cG9ydCBjb25zdCBHSVRIVUJfQ09OVEVOVF9VUkwgPVxuICAnaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21haW4vYWRldi9zcmMvY29udGVudC9leGFtcGxlcy8nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IERPQ1NfVklFV0VSX1NFTEVDVE9SLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6ICcnLFxuICBzdHlsZVVybHM6IFsnZG9jcy12aWV3ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmRvY3MtYW5pbWF0ZS1jb250ZW50XSc6ICdhbmltYXRlQ29udGVudCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIERvY1ZpZXdlciBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRvY0NvbnRlbnQ/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhhc1RvYyA9IGZhbHNlO1xuICBAT3V0cHV0KCkgY29udGVudExvYWRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZG9jdW1lbnQgPSBpbmplY3QoRE9DVU1FTlQpO1xuICBwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRSZWYgPSBpbmplY3QoRWxlbWVudFJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9jYXRpb24gPSBpbmplY3QoTG9jYXRpb24pO1xuICBwcml2YXRlIHJlYWRvbmx5IG5hdmlnYXRpb25TdGF0ZSA9IGluamVjdChOYXZpZ2F0aW9uU3RhdGUpO1xuICBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtSWQgPSBpbmplY3QoUExBVEZPUk1fSUQpO1xuICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlciA9IGluamVjdChSb3V0ZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250YWluZXIgPSBpbmplY3QoVmlld0NvbnRhaW5lclJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgZW52aXJvbm1lbnRJbmplY3RvciA9IGluamVjdChFbnZpcm9ubWVudEluamVjdG9yKTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbmplY3RvciA9IGluamVjdChJbmplY3Rvcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgYXBwUmVmID0gaW5qZWN0KEFwcGxpY2F0aW9uUmVmKTtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLXZhcmlhYmxlXG4gIHByaXZhdGUgYW5pbWF0ZUNvbnRlbnQgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZWFkb25seSBwZW5kaW5nUmVuZGVyVGFza3MgPSBpbmplY3QoUGVuZGluZ1JlbmRlclRhc2tzKTtcblxuICBwcml2YXRlIGNvdW50T2ZFeGFtcGxlcyA9IDA7XG5cbiAgYXN5bmMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHRhc2tJZCA9IHRoaXMucGVuZGluZ1JlbmRlclRhc2tzLmFkZCgpO1xuICAgIGlmICgnZG9jQ29udGVudCcgaW4gY2hhbmdlcykge1xuICAgICAgYXdhaXQgdGhpcy5yZW5kZXJDb250ZW50c0FuZFJ1bkNsaWVudFNldHVwKHRoaXMuZG9jQ29udGVudCEpO1xuICAgIH1cbiAgICB0aGlzLnBlbmRpbmdSZW5kZXJUYXNrcy5yZW1vdmUodGFza0lkKTtcbiAgfVxuXG4gIGFzeW5jIHJlbmRlckNvbnRlbnRzQW5kUnVuQ2xpZW50U2V0dXAoY29udGVudD86IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG4gICAgY29uc3QgY29udGVudENvbnRhaW5lciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgIGlmIChpc0Jyb3dzZXIgJiYgISh0aGlzLmRvY3VtZW50IGFzIGFueSkuc3RhcnRWaWV3VHJhbnNpdGlvbikge1xuICAgICAgICAvLyBBcHBseSBhIHNwZWNpYWwgY2xhc3MgdG8gdGhlIGhvc3Qgbm9kZSB0byB0cmlnZ2VyIGFuaW1hdGlvbi5cbiAgICAgICAgLy8gTm90ZTogd2hlbiBhIHBhZ2UgaXMgaHlkcmF0ZWQsIHRoZSBgY29udGVudGAgd291bGQgYmUgZW1wdHksXG4gICAgICAgIC8vIHNvIHdlIGRvbid0IHRyaWdnZXIgYW4gYW5pbWF0aW9uIHRvIGF2b2lkIGEgY29udGVudCBmbGlja2VyaW5nXG4gICAgICAgIC8vIHZpc3VhbCBlZmZlY3QuIEluIGFkZGl0aW9uLCBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB2aWV3IHRyYW5zaXRpb25zIChzdGFydFZpZXdUcmFuc2l0aW9uIGlzIHByZXNlbnQpLCB0aGUgYW5pbWF0aW9uIGlzIGhhbmRsZWQgYnkgdGhlIG5hdGl2ZSBWaWV3IFRyYW5zaXRpb24gQVBJIHNvIGl0IGRvZXMgbm90IG5lZWQgdG8gYmUgZG9uZSBoZXJlLlxuICAgICAgICB0aGlzLmFuaW1hdGVDb250ZW50ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29udGVudENvbnRhaW5lci5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIH1cblxuICAgIGlmIChpc0Jyb3dzZXIpIHtcbiAgICAgIC8vIEZpcnN0IHdlIHNldHVwIGV2ZW50IGxpc3RlbmVycyBvbiB0aGUgSFRNTCB3ZSBqdXN0IGxvYWRlZC5cbiAgICAgIC8vIFdlIHdhbnQgdG8gZG8gdGhpcyBiZWZvcmUgdGhpbmdzIGxpa2UgdGhlIGV4YW1wbGUgdmlld2VycyBhcmUgbG9hZGVkLlxuICAgICAgdGhpcy5zZXR1cEFuY2hvckxpc3RlbmVycyhjb250ZW50Q29udGFpbmVyKTtcbiAgICAgIC8vIFJld3JpdGUgcmVsYXRpdmUgYW5jaG9ycyAoaHJlZnMgc3RhcnRpbmcgd2l0aCBgI2ApIGJlY2F1c2UgcmVsYXRpdmUgaHJlZnMgYXJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIFVSTCwgd2hpY2ggaXMgJy8nXG4gICAgICB0aGlzLnJld3JpdGVSZWxhdGl2ZUFuY2hvcnMoY29udGVudENvbnRhaW5lcik7XG4gICAgICAvLyBJbiBjYXNlIHdoZW4gY29udGVudCBjb250YWlucyBwbGFjZWhvbGRlcnMgZm9yIGV4ZWN1dGFibGUgZXhhbXBsZXMsIGNyZWF0ZSBFeGFtcGxlVmlld2VyIGNvbXBvbmVudHMuXG4gICAgICBhd2FpdCB0aGlzLmxvYWRFeGFtcGxlcygpO1xuICAgICAgLy8gSW4gY2FzZSB3aGVuIGNvbnRlbnQgY29udGFpbnMgc3RhdGljIGNvZGUgc25pcHBldHMsIHRoZW4gY3JlYXRlIGJ1dHRvbnNcbiAgICAgIC8vIHJlc3BvbnNpYmxlIGZvciBjb3B5IHNvdXJjZSBjb2RlLlxuICAgICAgdGhpcy5sb2FkQ29weVNvdXJjZUNvZGVCdXR0b25zKCk7XG4gICAgfVxuXG4gICAgLy8gRGlzcGxheSBCcmVhZGNydW1iIGNvbXBvbmVudCBpZiB0aGUgYDxkb2NzLWJyZWFkY3J1bWI+YCBlbGVtZW50IGV4aXN0c1xuICAgIHRoaXMubG9hZEJyZWFkY3J1bWIoY29udGVudENvbnRhaW5lcik7XG5cbiAgICAvLyBEaXNwbGF5IEljb24gY29tcG9uZW50IGlmIHRoZSBgPGRvY3MtaWNvbj5gIGVsZW1lbnQgZXhpc3RzXG4gICAgdGhpcy5sb2FkSWNvbnMoY29udGVudENvbnRhaW5lcik7XG5cbiAgICAvLyBSZW5kZXIgVG9DXG4gICAgdGhpcy5yZW5kZXJUYWJsZU9mQ29udGVudHMoY29udGVudENvbnRhaW5lcik7XG5cbiAgICB0aGlzLmNvbnRlbnRMb2FkZWQubmV4dCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgRXhhbXBsZVZpZXdlciBjb21wb25lbnQgd2hlbjpcbiAgICogLSBleGlzdHMgZG9jcy1jb2RlLW11bHRpZmlsZSBlbGVtZW50IHdpdGggbXVsdGlwbGUgZmlsZXMgT1JcbiAgICogLSBleGlzdHMgZG9jcy1jb2RlIGVsZW1lbnQgd2l0aCBzaW5nbGUgZmlsZSBBTkRcbiAgICogICAtICdwcmV2aWV3JyBhdHRyaWJ1dGUgd2FzIHByb3ZpZGVkIE9SXG4gICAqICAgLSAndmlzaWJsZUxpbmVzJyBhdHRyaWJ1dGUgd2FzIHByb3ZpZGVkXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGxvYWRFeGFtcGxlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBtdWx0aWZpbGVDb2RlRXhhbXBsZXMgPSA8SFRNTEVsZW1lbnRbXT4oXG4gICAgICBBcnJheS5mcm9tKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRE9DU19DT0RFX01VVExJRklMRV9TRUxFQ1RPUikpXG4gICAgKTtcblxuICAgIGZvciAobGV0IHBsYWNlaG9sZGVyIG9mIG11bHRpZmlsZUNvZGVFeGFtcGxlcykge1xuICAgICAgY29uc3QgcGF0aCA9IHBsYWNlaG9sZGVyLmdldEF0dHJpYnV0ZSgncGF0aCcpITtcbiAgICAgIGNvbnN0IHNuaXBwZXRzID0gdGhpcy5nZXRDb2RlU25pcHBldHNGcm9tTXVsdGlmaWxlV3JhcHBlcihwbGFjZWhvbGRlcik7XG4gICAgICBhd2FpdCB0aGlzLnJlbmRlckV4YW1wbGVWaWV3ZXJDb21wb25lbnRzKHBsYWNlaG9sZGVyLCBzbmlwcGV0cywgcGF0aCk7XG4gICAgfVxuXG4gICAgY29uc3QgZG9jc0NvZGVFbGVtZW50cyA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRE9DU19DT0RFX1NFTEVDVE9SKTtcblxuICAgIGZvciAoY29uc3QgcGxhY2Vob2xkZXIgb2YgZG9jc0NvZGVFbGVtZW50cykge1xuICAgICAgY29uc3Qgc25pcHBldCA9IHRoaXMuZ2V0U3RhbmRhbG9uZUNvZGVTbmlwcGV0KHBsYWNlaG9sZGVyKTtcbiAgICAgIGlmIChzbmlwcGV0KSB7XG4gICAgICAgIGF3YWl0IHRoaXMucmVuZGVyRXhhbXBsZVZpZXdlckNvbXBvbmVudHMocGxhY2Vob2xkZXIsIFtzbmlwcGV0XSwgc25pcHBldC5uYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbmRlclRhYmxlT2ZDb250ZW50cyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5oYXNUb2MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdEhlYWRpbmcgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEhlYWRpbmdFbGVtZW50PignaDIsaDNbaWRdJyk7XG4gICAgaWYgKCFmaXJzdEhlYWRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTaW5jZSB0aGUgY29udGVudCBvZiB0aGUgbWFpbiBhcmVhIGlzIGR5bmFtaWNhbGx5IGNyZWF0ZWQgYW5kIHRoZXJlIGlzXG4gICAgLy8gbm8gaG9zdCBlbGVtZW50IGZvciBhIFRvQyBjb21wb25lbnQsIHdlIGNyZWF0ZSBpdCBtYW51YWxseS5cbiAgICBsZXQgdG9jSG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihUT0NfSE9TVF9FTEVNRU5UX05BTUUpO1xuICAgIGlmICghdG9jSG9zdEVsZW1lbnQpIHtcbiAgICAgIHRvY0hvc3RFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFRPQ19IT1NUX0VMRU1FTlRfTkFNRSk7XG4gICAgICB0b2NIb3N0RWxlbWVudC5zZXRBdHRyaWJ1dGUoVE9DX1NLSVBfQ09OVEVOVF9NQVJLRVIsICd0cnVlJyk7XG4gICAgICBmaXJzdEhlYWRpbmc/LnBhcmVudE5vZGU/Lmluc2VydEJlZm9yZSh0b2NIb3N0RWxlbWVudCwgZmlyc3RIZWFkaW5nKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlckNvbXBvbmVudChUYWJsZU9mQ29udGVudHMsIHRvY0hvc3RFbGVtZW50LCB7Y29udGVudFNvdXJjZUVsZW1lbnQ6IGVsZW1lbnR9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVuZGVyRXhhbXBsZVZpZXdlckNvbXBvbmVudHMoXG4gICAgcGxhY2Vob2xkZXI6IEhUTUxFbGVtZW50LFxuICAgIHNuaXBwZXRzOiBTbmlwcGV0W10sXG4gICAgcGF0aDogc3RyaW5nLFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwcmV2aWV3ID0gQm9vbGVhbihwbGFjZWhvbGRlci5nZXRBdHRyaWJ1dGUoJ3ByZXZpZXcnKSk7XG4gICAgY29uc3QgdGl0bGUgPSBwbGFjZWhvbGRlci5nZXRBdHRyaWJ1dGUoJ2hlYWRlcicpID8/IHVuZGVmaW5lZDtcbiAgICBjb25zdCBmaXJzdENvZGVTbmlwcGV0VGl0bGUgPVxuICAgICAgc25pcHBldHMubGVuZ3RoID4gMCA/IHNuaXBwZXRzWzBdLnRpdGxlID8/IHNuaXBwZXRzWzBdLm5hbWUgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZXhhbXBsZVJlZiA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoRXhhbXBsZVZpZXdlcik7XG5cbiAgICB0aGlzLmNvdW50T2ZFeGFtcGxlcysrO1xuICAgIGV4YW1wbGVSZWYuaW5zdGFuY2UubWV0YWRhdGEgPSB7XG4gICAgICB0aXRsZTogdGl0bGUgPz8gZmlyc3RDb2RlU25pcHBldFRpdGxlLFxuICAgICAgcGF0aCxcbiAgICAgIGZpbGVzOiBzbmlwcGV0cyxcbiAgICAgIHByZXZpZXcsXG4gICAgICBpZDogdGhpcy5jb3VudE9mRXhhbXBsZXMsXG4gICAgfTtcblxuICAgIGV4YW1wbGVSZWYuaW5zdGFuY2UuZ2l0aHViVXJsID0gYCR7R0lUSFVCX0NPTlRFTlRfVVJMfS8ke3NuaXBwZXRzWzBdLm5hbWV9YDtcbiAgICBleGFtcGxlUmVmLmluc3RhbmNlLnN0YWNrYmxpdHpVcmwgPSBgJHtBU1NFVFNfRVhBTVBMRVNfUEFUSH0vJHtzbmlwcGV0c1swXS5uYW1lfS5odG1sYDtcblxuICAgIHBsYWNlaG9sZGVyLnBhcmVudEVsZW1lbnQhLnJlcGxhY2VDaGlsZChleGFtcGxlUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQsIHBsYWNlaG9sZGVyKTtcblxuICAgIGF3YWl0IGV4YW1wbGVSZWYuaW5zdGFuY2UucmVuZGVyRXhhbXBsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb2RlU25pcHBldHNGcm9tTXVsdGlmaWxlV3JhcHBlcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IFNuaXBwZXRbXSB7XG4gICAgY29uc3QgdGFicyA9IDxFbGVtZW50W10+QXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoRE9DU19DT0RFX1NFTEVDVE9SKSk7XG5cbiAgICByZXR1cm4gdGFicy5tYXAoKHRhYikgPT4gKHtcbiAgICAgIG5hbWU6IHRhYi5nZXRBdHRyaWJ1dGUoJ3BhdGgnKSA/PyB0YWIuZ2V0QXR0cmlidXRlKCdoZWFkZXInKSA/PyAnJyxcbiAgICAgIGNvbnRlbnQ6IHRhYi5pbm5lckhUTUwsXG4gICAgICB2aXNpYmxlTGluZXNSYW5nZTogdGFiLmdldEF0dHJpYnV0ZSgndmlzaWJsZUxpbmVzJykgPz8gdW5kZWZpbmVkLFxuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3RhbmRhbG9uZUNvZGVTbmlwcGV0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogU25pcHBldCB8IG51bGwge1xuICAgIGNvbnN0IHZpc2libGVMaW5lcyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd2aXNpYmxlTGluZXMnKSA/PyB1bmRlZmluZWQ7XG4gICAgY29uc3QgcHJldmlldyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdwcmV2aWV3Jyk7XG5cbiAgICBpZiAoIXZpc2libGVMaW5lcyAmJiAhcHJldmlldykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgY29udGVudCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcigncHJlJykhO1xuICAgIGNvbnN0IHBhdGggPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgncGF0aCcpITtcbiAgICBjb25zdCB0aXRsZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdoZWFkZXInKSA/PyB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGUsXG4gICAgICBuYW1lOiBwYXRoLFxuICAgICAgY29udGVudDogY29udGVudD8ub3V0ZXJIVE1MLFxuICAgICAgdmlzaWJsZUxpbmVzUmFuZ2U6IHZpc2libGVMaW5lcyxcbiAgICB9O1xuICB9XG5cbiAgLy8gSWYgdGhlIGNvbnRlbnQgY29udGFpbnMgc3RhdGljIGNvZGUgc25pcHBldHMsIHdlIHNob3VsZCBhZGQgYnV0dG9ucyB0byBjb3B5XG4gIC8vIHRoZSBjb2RlXG4gIHByaXZhdGUgbG9hZENvcHlTb3VyY2VDb2RlQnV0dG9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBzdGF0aWNDb2RlU25pcHBldHMgPSA8RWxlbWVudFtdPihcbiAgICAgIEFycmF5LmZyb20odGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRvY3MtY29kZTpub3QoW21lcm1haWRdKScpKVxuICAgICk7XG5cbiAgICBmb3IgKGxldCBjb2RlU25pcHBldCBvZiBzdGF0aWNDb2RlU25pcHBldHMpIHtcbiAgICAgIGNvbnN0IGNvcHlTb3VyY2VDb2RlQnV0dG9uID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChDb3B5U291cmNlQ29kZUJ1dHRvbik7XG4gICAgICBjb2RlU25pcHBldC5hcHBlbmRDaGlsZChjb3B5U291cmNlQ29kZUJ1dHRvbi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWRCcmVhZGNydW1iKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgYnJlYWRjcnVtYlBsYWNlaG9sZGVyID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdkb2NzLWJyZWFkY3J1bWInKSBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBhY3RpdmVOYXZpZ2F0aW9uSXRlbSA9IHRoaXMubmF2aWdhdGlvblN0YXRlLmFjdGl2ZU5hdmlnYXRpb25JdGVtKCk7XG5cbiAgICBpZiAoYnJlYWRjcnVtYlBsYWNlaG9sZGVyICYmICEhYWN0aXZlTmF2aWdhdGlvbkl0ZW0/LnBhcmVudCkge1xuICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoQnJlYWRjcnVtYiwgYnJlYWRjcnVtYlBsYWNlaG9sZGVyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWRJY29ucyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZG9jcy1pY29uJykuZm9yRWFjaCgoaWNvbnNQbGFjZWhvbGRlcikgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoSWNvbkNvbXBvbmVudCwgaWNvbnNQbGFjZWhvbGRlciBhcyBIVE1MRWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGVyIG1ldGhvZCB0byByZW5kZXIgYSBjb21wb25lbnQgZHluYW1pY2FsbHkgaW4gYSBjb250ZXh0IG9mIHRoaXMgY2xhc3MuXG4gICAqL1xuICBwcml2YXRlIHJlbmRlckNvbXBvbmVudDxUPihcbiAgICB0eXBlOiBUeXBlPFQ+LFxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBpbnB1dHM/OiB7W2tleTogc3RyaW5nXTogdW5rbm93bn0sXG4gICk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gY3JlYXRlQ29tcG9uZW50KHR5cGUsIHtcbiAgICAgIGhvc3RFbGVtZW50LFxuICAgICAgZWxlbWVudEluamVjdG9yOiB0aGlzLmluamVjdG9yLFxuICAgICAgZW52aXJvbm1lbnRJbmplY3RvcjogdGhpcy5lbnZpcm9ubWVudEluamVjdG9yLFxuICAgIH0pO1xuXG4gICAgaWYgKGlucHV0cykge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGlucHV0cykpIHtcbiAgICAgICAgY29tcG9uZW50UmVmLnNldElucHV0KG5hbWUsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUcmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gYWZ0ZXIgc2V0dGluZyBpbnB1dHMuXG4gICAgY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgIC8vIEF0dGFjaCBhIHZpZXcgdG8gdGhlIEFwcGxpY2F0aW9uUmVmIGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgLy8gcHVycG9zZXMgYW5kIGZvciBoeWRyYXRpb24gc2VyaWFsaXphdGlvbiB0byBwaWNrIGl0IHVwXG4gICAgLy8gZHVyaW5nIFNTRy5cbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEFuY2hvckxpc3RlbmVycyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChgYVtocmVmXWApLmZvckVhY2goKGFuY2hvcikgPT4ge1xuICAgICAgLy8gR2V0IHRoZSB0YXJnZXQgZWxlbWVudCdzIElEIGZyb20gdGhlIGhyZWYgYXR0cmlidXRlXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKChhbmNob3IgYXMgSFRNTEFuY2hvckVsZW1lbnQpLmhyZWYpO1xuICAgICAgY29uc3QgaXNFeHRlcm5hbExpbmsgPSB1cmwub3JpZ2luICE9PSB0aGlzLmRvY3VtZW50LmxvY2F0aW9uLm9yaWdpbjtcbiAgICAgIGlmIChpc0V4dGVybmFsTGluaykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmcm9tRXZlbnQoYW5jaG9yLCAnY2xpY2snKVxuICAgICAgICAucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSlcbiAgICAgICAgLnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgIGhhbmRsZUhyZWZDbGlja0V2ZW50V2l0aFJvdXRlcihlLCB0aGlzLnJvdXRlcik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXdyaXRlUmVsYXRpdmVBbmNob3JzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgZm9yIChjb25zdCBhbmNob3Igb2YgQXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGFbaHJlZl49XCIjXCJdOm5vdChhW2Rvd25sb2FkXSlgKSkpIHtcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoKGFuY2hvciBhcyBIVE1MQW5jaG9yRWxlbWVudCkuaHJlZik7XG4gICAgICAoYW5jaG9yIGFzIEhUTUxBbmNob3JFbGVtZW50KS5ocmVmID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkgKyB1cmwuaGFzaDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==