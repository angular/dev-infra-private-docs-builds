/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export declare const SCROLL_EVENT_DELAY = 20;
export declare const SCROLL_FINISH_DELAY: number;
export declare class TableOfContentsScrollSpy {
    private readonly destroyRef;
    private readonly tableOfContentsLoader;
    private readonly document;
    private readonly window;
    private readonly ngZone;
    private readonly viewportScroller;
    private readonly injector;
    private contentSourceElement;
    private lastContentWidth;
    activeItemId: import("@angular/core").WritableSignal<string | null>;
    scrollbarThumbOnTop: import("@angular/core").WritableSignal<boolean>;
    startListeningToScroll(contentSourceElement: HTMLElement | null): void;
    scrollToTop(): void;
    scrollToSection(id: string): void;
    offsetToSection(id: string): void;
    private setResizeEventHandlers;
    private updateHeadingsTopAfterResize;
    private setScrollEventHandlers;
    private setActiveItemId;
    private getScrollOffset;
    private getContentWidth;
}
