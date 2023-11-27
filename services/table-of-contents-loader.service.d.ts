/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { TableOfContentsItem } from '../interfaces';
/**
 * Name of an attribute that is set on an element that should be
 * excluded from the `TableOfContentsLoader` lookup. This is needed
 * to exempt SSR'ed content of the `TableOfContents` component from
 * being inspected and accidentally pulling more content into ToC.
 */
export declare const TOC_SKIP_CONTENT_MARKER = "toc-skip-content";
export declare class TableOfContentsLoader {
    readonly toleranceThreshold = 40;
    tableOfContentItems: TableOfContentsItem[];
    private readonly document;
    private readonly platformId;
    buildTableOfContent(docElement: Element): void;
    updateHeadingsTopValue(element: HTMLElement): void;
    private getHeadingTitle;
    private getHeadings;
    private calculateTop;
}
