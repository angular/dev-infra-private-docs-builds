/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { DestroyRef, EnvironmentInjector, Injectable, afterNextRender, inject, signal, NgZone, } from '@angular/core';
import { RESIZE_EVENT_DELAY } from '../constants/index.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, debounceTime, fromEvent, startWith } from 'rxjs';
import { WINDOW } from '../providers/index.js';
import { shouldReduceMotion } from '../utils/index.js';
import { TableOfContentsLoader } from './table-of-contents-loader.service.js';
export const SCROLL_EVENT_DELAY = 20;
export const SCROLL_FINISH_DELAY = SCROLL_EVENT_DELAY * 2;
let TableOfContentsScrollSpy = class TableOfContentsScrollSpy {
    constructor() {
        this.destroyRef = inject(DestroyRef);
        this.tableOfContentsLoader = inject(TableOfContentsLoader);
        this.document = inject(DOCUMENT);
        this.window = inject(WINDOW);
        this.ngZone = inject(NgZone);
        this.viewportScroller = inject(ViewportScroller);
        this.injector = inject(EnvironmentInjector);
        this.contentSourceElement = null;
        this.lastContentWidth = 0;
        this.activeItemId = signal(null);
        this.scrollbarThumbOnTop = signal(true);
    }
    startListeningToScroll(contentSourceElement) {
        this.contentSourceElement = contentSourceElement;
        this.lastContentWidth = this.getContentWidth();
        this.setScrollEventHandlers();
        this.setResizeEventHandlers();
    }
    scrollToTop() {
        this.viewportScroller.scrollToPosition([0, 0]);
    }
    scrollToSection(id) {
        if (shouldReduceMotion()) {
            this.offsetToSection(id);
        }
        else {
            const section = this.document.getElementById(id);
            section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // We don't want to set the active item here, it would mess up the animation
            // The scroll event handler will handle it for us
        }
    }
    offsetToSection(id) {
        const section = this.document.getElementById(id);
        section?.scrollIntoView({ block: 'start' });
        // Here we need to set the active item manually because scroll events might not be fired
        this.activeItemId.set(id);
    }
    // After window resize, we should update top value of each table content item
    setResizeEventHandlers() {
        fromEvent(this.window, 'resize')
            .pipe(debounceTime(RESIZE_EVENT_DELAY), takeUntilDestroyed(this.destroyRef), startWith())
            .subscribe(() => {
            this.ngZone.run(() => this.updateHeadingsTopAfterResize());
        });
        // We need to observe the height of the docs-viewer because it may change after the
        // assets (fonts, images) are loaded. They can (and will) change the y-position of the headings.
        const docsViewer = this.document.querySelector('docs-viewer');
        if (docsViewer) {
            afterNextRender(() => {
                const resizeObserver = new ResizeObserver(() => this.updateHeadingsTopAfterResize());
                resizeObserver.observe(docsViewer);
                this.destroyRef.onDestroy(() => resizeObserver.disconnect());
            }, { injector: this.injector });
        }
    }
    updateHeadingsTopAfterResize() {
        this.lastContentWidth = this.getContentWidth();
        const contentElement = this.contentSourceElement;
        if (contentElement) {
            this.tableOfContentsLoader.updateHeadingsTopValue(contentElement);
            this.setActiveItemId();
        }
    }
    setScrollEventHandlers() {
        const scroll$ = fromEvent(this.document, 'scroll').pipe(auditTime(SCROLL_EVENT_DELAY), takeUntilDestroyed(this.destroyRef));
        this.ngZone.runOutsideAngular(() => {
            scroll$.subscribe(() => this.setActiveItemId());
        });
    }
    setActiveItemId() {
        const tableOfContentItems = this.tableOfContentsLoader.tableOfContentItems;
        if (tableOfContentItems.length === 0)
            return;
        // Resize could emit scroll event, in that case we could stop setting active item until resize will be finished
        if (this.lastContentWidth !== this.getContentWidth()) {
            return;
        }
        const scrollOffset = this.getScrollOffset();
        if (scrollOffset === null)
            return;
        for (const [i, currentLink] of tableOfContentItems.entries()) {
            const nextLink = tableOfContentItems[i + 1];
            // A link is considered active if the page is scrolled past the
            // anchor without also being scrolled passed the next link.
            const isActive = scrollOffset >= currentLink.top && (!nextLink || nextLink.top >= scrollOffset);
            // When active item was changed then trigger change detection
            if (isActive && this.activeItemId() !== currentLink.id) {
                this.ngZone.run(() => this.activeItemId.set(currentLink.id));
                return;
            }
        }
        if (scrollOffset < tableOfContentItems[0].top && this.activeItemId() !== null) {
            this.ngZone.run(() => this.activeItemId.set(null));
        }
        const scrollOffsetZero = scrollOffset === 0;
        if (scrollOffsetZero !== this.scrollbarThumbOnTop()) {
            // we want to trigger change detection only when the value changes
            this.ngZone.run(() => this.scrollbarThumbOnTop.set(scrollOffsetZero));
        }
    }
    // Gets the scroll offset of the scroll container
    getScrollOffset() {
        return this.window.scrollY;
    }
    getContentWidth() {
        return this.document.body.clientWidth || Number.MAX_SAFE_INTEGER;
    }
};
TableOfContentsScrollSpy = __decorate([
    Injectable()
    // The service is responsible for listening for scrolling and resizing,
    // thanks to which it sets the active item in the Table of contents
], TableOfContentsScrollSpy);
export { TableOfContentsScrollSpy };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMtc2Nyb2xsLXNweS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9zZXJ2aWNlcy90YWJsZS1vZi1jb250ZW50cy1zY3JvbGwtc3B5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFDTCxVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLFVBQVUsRUFDVixlQUFlLEVBQ2YsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFFNUUsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0FBQ3JDLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLGtCQUFrQixHQUFHLENBQUMsQ0FBQztBQUtuRCxJQUFNLHdCQUF3QixHQUE5QixNQUFNLHdCQUF3QjtJQUE5QjtRQUNZLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsMEJBQXFCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEQsYUFBUSxHQUFHLE1B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QUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDeEUsQ0FBQztJQUNILENBQUM7SUFFRCxpREFBaUQ7SUFDekMsZUFBZTtRQUNyQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFTyxlQUFlO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUNuRSxDQUFDO0NBQ0YsQ0FBQTtBQXZJWSx3QkFBd0I7SUFIcEMsVUFBVSxFQUFFO0lBQ2IsdUVBQXVFO0lBQ3ZFLG1FQUFtRTtHQUN0RCx3QkFBd0IsQ0F1SXBDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBWaWV3cG9ydFNjcm9sbGVyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgRGVzdHJveVJlZixcbiAgRW52aXJvbm1lbnRJbmplY3RvcixcbiAgSW5qZWN0YWJsZSxcbiAgYWZ0ZXJOZXh0UmVuZGVyLFxuICBpbmplY3QsXG4gIHNpZ25hbCxcbiAgTmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UkVTSVpFX0VWRU5UX0RFTEFZfSBmcm9tICcuLi9jb25zdGFudHMvaW5kZXguanMnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7YXVkaXRUaW1lLCBkZWJvdW5jZVRpbWUsIGZyb21FdmVudCwgc3RhcnRXaXRofSBmcm9tICdyeGpzJztcbmltcG9ydCB7V0lORE9XfSBmcm9tICcuLi9wcm92aWRlcnMvaW5kZXguanMnO1xuaW1wb3J0IHtzaG91bGRSZWR1Y2VNb3Rpb259IGZyb20gJy4uL3V0aWxzL2luZGV4LmpzJztcbmltcG9ydCB7VGFibGVPZkNvbnRlbnRzTG9hZGVyfSBmcm9tICcuL3RhYmxlLW9mLWNvbnRlbnRzLWxvYWRlci5zZXJ2aWNlLmpzJztcblxuZXhwb3J0IGNvbnN0IFNDUk9MTF9FVkVOVF9ERUxBWSA9IDIwO1xuZXhwb3J0IGNvbnN0IFNDUk9MTF9GSU5JU0hfREVMQVkgPSBTQ1JPTExfRVZFTlRfREVMQVkgKiAyO1xuXG5ASW5qZWN0YWJsZSgpXG4vLyBUaGUgc2VydmljZSBpcyByZXNwb25zaWJsZSBmb3IgbGlzdGVuaW5nIGZvciBzY3JvbGxpbmcgYW5kIHJlc2l6aW5nLFxuLy8gdGhhbmtzIHRvIHdoaWNoIGl0IHNldHMgdGhlIGFjdGl2ZSBpdGVtIGluIHRoZSBUYWJsZSBvZiBjb250ZW50c1xuZXhwb3J0IGNsYXNzIFRhYmxlT2ZDb250ZW50c1Njcm9sbFNweSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSB0YWJsZU9mQ29udGVudHNMb2FkZXIgPSBpbmplY3QoVGFibGVPZkNvbnRlbnRzTG9hZGVyKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luZG93ID0gaW5qZWN0KFdJTkRPVyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbmdab25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgdmlld3BvcnRTY3JvbGxlciA9IGluamVjdChWaWV3cG9ydFNjcm9sbGVyKTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbmplY3RvciA9IGluamVjdChFbnZpcm9ubWVudEluamVjdG9yKTtcbiAgcHJpdmF0ZSBjb250ZW50U291cmNlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBsYXN0Q29udGVudFdpZHRoID0gMDtcblxuICBhY3RpdmVJdGVtSWQgPSBzaWduYWw8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHNjcm9sbGJhclRodW1iT25Ub3AgPSBzaWduYWw8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgc3RhcnRMaXN0ZW5pbmdUb1Njcm9sbChjb250ZW50U291cmNlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50U291cmNlRWxlbWVudCA9IGNvbnRlbnRTb3VyY2VFbGVtZW50O1xuICAgIHRoaXMubGFzdENvbnRlbnRXaWR0aCA9IHRoaXMuZ2V0Q29udGVudFdpZHRoKCk7XG5cbiAgICB0aGlzLnNldFNjcm9sbEV2ZW50SGFuZGxlcnMoKTtcbiAgICB0aGlzLnNldFJlc2l6ZUV2ZW50SGFuZGxlcnMoKTtcbiAgfVxuXG4gIHNjcm9sbFRvVG9wKCk6IHZvaWQge1xuICAgIHRoaXMudmlld3BvcnRTY3JvbGxlci5zY3JvbGxUb1Bvc2l0aW9uKFswLCAwXSk7XG4gIH1cblxuICBzY3JvbGxUb1NlY3Rpb24oaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChzaG91bGRSZWR1Y2VNb3Rpb24oKSkge1xuICAgICAgdGhpcy5vZmZzZXRUb1NlY3Rpb24oaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBzZWN0aW9uPy5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ3N0YXJ0J30pO1xuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzZXQgdGhlIGFjdGl2ZSBpdGVtIGhlcmUsIGl0IHdvdWxkIG1lc3MgdXAgdGhlIGFuaW1hdGlvblxuICAgICAgLy8gVGhlIHNjcm9sbCBldmVudCBoYW5kbGVyIHdpbGwgaGFuZGxlIGl0IGZvciB1c1xuICAgIH1cbiAgfVxuXG4gIG9mZnNldFRvU2VjdGlvbihpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc2VjdGlvbiA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIHNlY3Rpb24/LnNjcm9sbEludG9WaWV3KHtibG9jazogJ3N0YXJ0J30pO1xuICAgIC8vIEhlcmUgd2UgbmVlZCB0byBzZXQgdGhlIGFjdGl2ZSBpdGVtIG1hbnVhbGx5IGJlY2F1c2Ugc2Nyb2xsIGV2ZW50cyBtaWdodCBub3QgYmUgZmlyZWRcbiAgICB0aGlzLmFjdGl2ZUl0ZW1JZC5zZXQoaWQpO1xuICB9XG5cbiAgLy8gQWZ0ZXIgd2luZG93IHJlc2l6ZSwgd2Ugc2hvdWxkIHVwZGF0ZSB0b3AgdmFsdWUgb2YgZWFjaCB0YWJsZSBjb250ZW50IGl0ZW1cbiAgcHJpdmF0ZSBzZXRSZXNpemVFdmVudEhhbmRsZXJzKCkge1xuICAgIGZyb21FdmVudCh0aGlzLndpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoUkVTSVpFX0VWRU5UX0RFTEFZKSwgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZiksIHN0YXJ0V2l0aCgpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnVwZGF0ZUhlYWRpbmdzVG9wQWZ0ZXJSZXNpemUoKSk7XG4gICAgICB9KTtcblxuICAgIC8vIFdlIG5lZWQgdG8gb2JzZXJ2ZSB0aGUgaGVpZ2h0IG9mIHRoZSBkb2NzLXZpZXdlciBiZWNhdXNlIGl0IG1heSBjaGFuZ2UgYWZ0ZXIgdGhlXG4gICAgLy8gYXNzZXRzIChmb250cywgaW1hZ2VzKSBhcmUgbG9hZGVkLiBUaGV5IGNhbiAoYW5kIHdpbGwpIGNoYW5nZSB0aGUgeS1wb3NpdGlvbiBvZiB0aGUgaGVhZGluZ3MuXG4gICAgY29uc3QgZG9jc1ZpZXdlciA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZG9jcy12aWV3ZXInKTtcbiAgICBpZiAoZG9jc1ZpZXdlcikge1xuICAgICAgYWZ0ZXJOZXh0UmVuZGVyKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy51cGRhdGVIZWFkaW5nc1RvcEFmdGVyUmVzaXplKCkpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUoZG9jc1ZpZXdlcik7XG4gICAgICAgICAgdGhpcy5kZXN0cm95UmVmLm9uRGVzdHJveSgoKSA9PiByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCkpO1xuICAgICAgICB9LFxuICAgICAgICB7aW5qZWN0b3I6IHRoaXMuaW5qZWN0b3J9LFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUhlYWRpbmdzVG9wQWZ0ZXJSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5sYXN0Q29udGVudFdpZHRoID0gdGhpcy5nZXRDb250ZW50V2lkdGgoKTtcblxuICAgIGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gdGhpcy5jb250ZW50U291cmNlRWxlbWVudDtcbiAgICBpZiAoY29udGVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXMudGFibGVPZkNvbnRlbnRzTG9hZGVyLnVwZGF0ZUhlYWRpbmdzVG9wVmFsdWUoY29udGVudEVsZW1lbnQpO1xuICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtSWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFNjcm9sbEV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XG4gICAgY29uc3Qgc2Nyb2xsJCA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCAnc2Nyb2xsJykucGlwZShcbiAgICAgIGF1ZGl0VGltZShTQ1JPTExfRVZFTlRfREVMQVkpLFxuICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZiksXG4gICAgKTtcblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHNjcm9sbCQuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0QWN0aXZlSXRlbUlkKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3RpdmVJdGVtSWQoKTogdm9pZCB7XG4gICAgY29uc3QgdGFibGVPZkNvbnRlbnRJdGVtcyA9IHRoaXMudGFibGVPZkNvbnRlbnRzTG9hZGVyLnRhYmxlT2ZDb250ZW50SXRlbXM7XG5cbiAgICBpZiAodGFibGVPZkNvbnRlbnRJdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIC8vIFJlc2l6ZSBjb3VsZCBlbWl0IHNjcm9sbCBldmVudCwgaW4gdGhhdCBjYXNlIHdlIGNvdWxkIHN0b3Agc2V0dGluZyBhY3RpdmUgaXRlbSB1bnRpbCByZXNpemUgd2lsbCBiZSBmaW5pc2hlZFxuICAgIGlmICh0aGlzLmxhc3RDb250ZW50V2lkdGggIT09IHRoaXMuZ2V0Q29udGVudFdpZHRoKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGxPZmZzZXQgPSB0aGlzLmdldFNjcm9sbE9mZnNldCgpO1xuICAgIGlmIChzY3JvbGxPZmZzZXQgPT09IG51bGwpIHJldHVybjtcblxuICAgIGZvciAoY29uc3QgW2ksIGN1cnJlbnRMaW5rXSBvZiB0YWJsZU9mQ29udGVudEl0ZW1zLmVudHJpZXMoKSkge1xuICAgICAgY29uc3QgbmV4dExpbmsgPSB0YWJsZU9mQ29udGVudEl0ZW1zW2kgKyAxXTtcblxuICAgICAgLy8gQSBsaW5rIGlzIGNvbnNpZGVyZWQgYWN0aXZlIGlmIHRoZSBwYWdlIGlzIHNjcm9sbGVkIHBhc3QgdGhlXG4gICAgICAvLyBhbmNob3Igd2l0aG91dCBhbHNvIGJlaW5nIHNjcm9sbGVkIHBhc3NlZCB0aGUgbmV4dCBsaW5rLlxuICAgICAgY29uc3QgaXNBY3RpdmUgPVxuICAgICAgICBzY3JvbGxPZmZzZXQgPj0gY3VycmVudExpbmsudG9wICYmICghbmV4dExpbmsgfHwgbmV4dExpbmsudG9wID49IHNjcm9sbE9mZnNldCk7XG5cbiAgICAgIC8vIFdoZW4gYWN0aXZlIGl0ZW0gd2FzIGNoYW5nZWQgdGhlbiB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb25cbiAgICAgIGlmIChpc0FjdGl2ZSAmJiB0aGlzLmFjdGl2ZUl0ZW1JZCgpICE9PSBjdXJyZW50TGluay5pZCkge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5hY3RpdmVJdGVtSWQuc2V0KGN1cnJlbnRMaW5rLmlkKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsT2Zmc2V0IDwgdGFibGVPZkNvbnRlbnRJdGVtc1swXS50b3AgJiYgdGhpcy5hY3RpdmVJdGVtSWQoKSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuYWN0aXZlSXRlbUlkLnNldChudWxsKSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2Nyb2xsT2Zmc2V0WmVybyA9IHNjcm9sbE9mZnNldCA9PT0gMDtcbiAgICBpZiAoc2Nyb2xsT2Zmc2V0WmVybyAhPT0gdGhpcy5zY3JvbGxiYXJUaHVtYk9uVG9wKCkpIHtcbiAgICAgIC8vIHdlIHdhbnQgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIG9ubHkgd2hlbiB0aGUgdmFsdWUgY2hhbmdlc1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuc2Nyb2xsYmFyVGh1bWJPblRvcC5zZXQoc2Nyb2xsT2Zmc2V0WmVybykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldHMgdGhlIHNjcm9sbCBvZmZzZXQgb2YgdGhlIHNjcm9sbCBjb250YWluZXJcbiAgcHJpdmF0ZSBnZXRTY3JvbGxPZmZzZXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3cuc2Nyb2xsWTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29udGVudFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCB8fCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgfVxufVxuIl19