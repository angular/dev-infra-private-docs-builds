/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { DestroyRef, EnvironmentInjector, Injectable, afterNextRender, inject, signal, NgZone, } from '@angular/core';
import { RESIZE_EVENT_DELAY } from '../constants/index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, debounceTime, fromEvent, startWith } from 'rxjs';
import { WINDOW } from '../providers/index';
import { shouldReduceMotion } from '../utils/index';
import { TableOfContentsLoader } from './table-of-contents-loader.service';
import * as i0 from "@angular/core";
export const SCROLL_EVENT_DELAY = 20;
export const SCROLL_FINISH_DELAY = SCROLL_EVENT_DELAY * 2;
// The service is responsible for listening for scrolling and resizing,
// thanks to which it sets the active item in the Table of contents
export class TableOfContentsScrollSpy {
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
}
TableOfContentsScrollSpy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.0", ngImport: i0, type: TableOfContentsScrollSpy, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TableOfContentsScrollSpy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.0", ngImport: i0, type: TableOfContentsScrollSpy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.0", ngImport: i0, type: TableOfContentsScrollSpy, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMtc2Nyb2xsLXNweS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9zZXJ2aWNlcy90YWJsZS1vZi1jb250ZW50cy1zY3JvbGwtc3B5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFDTCxVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLFVBQVUsRUFDVixlQUFlLEVBQ2YsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7O0FBRXpFLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUNyQyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7QUFHMUQsdUVBQXVFO0FBQ3ZFLG1FQUFtRTtBQUNuRSxNQUFNLE9BQU8sd0JBQXdCO0lBSHJDO1FBSW1CLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsMEJBQXFCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEQsYUFB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RSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDSCxDQUFDO0lBRUQsaURBQWlEO0lBQ3pDLGVBQWU7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDO0lBRU8sZUFBZTtRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDbkUsQ0FBQzs7NEhBdElVLHdCQUF3QjtnSUFBeEIsd0JBQXdCO2tHQUF4Qix3QkFBd0I7a0JBSHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIFZpZXdwb3J0U2Nyb2xsZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBEZXN0cm95UmVmLFxuICBFbnZpcm9ubWVudEluamVjdG9yLFxuICBJbmplY3RhYmxlLFxuICBhZnRlck5leHRSZW5kZXIsXG4gIGluamVjdCxcbiAgc2lnbmFsLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSRVNJWkVfRVZFTlRfREVMQVl9IGZyb20gJy4uL2NvbnN0YW50cy9pbmRleCc7XG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHthdWRpdFRpbWUsIGRlYm91bmNlVGltZSwgZnJvbUV2ZW50LCBzdGFydFdpdGh9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtXSU5ET1d9IGZyb20gJy4uL3Byb3ZpZGVycy9pbmRleCc7XG5pbXBvcnQge3Nob3VsZFJlZHVjZU1vdGlvbn0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHtUYWJsZU9mQ29udGVudHNMb2FkZXJ9IGZyb20gJy4vdGFibGUtb2YtY29udGVudHMtbG9hZGVyLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgU0NST0xMX0VWRU5UX0RFTEFZID0gMjA7XG5leHBvcnQgY29uc3QgU0NST0xMX0ZJTklTSF9ERUxBWSA9IFNDUk9MTF9FVkVOVF9ERUxBWSAqIDI7XG5cbkBJbmplY3RhYmxlKClcbi8vIFRoZSBzZXJ2aWNlIGlzIHJlc3BvbnNpYmxlIGZvciBsaXN0ZW5pbmcgZm9yIHNjcm9sbGluZyBhbmQgcmVzaXppbmcsXG4vLyB0aGFua3MgdG8gd2hpY2ggaXQgc2V0cyB0aGUgYWN0aXZlIGl0ZW0gaW4gdGhlIFRhYmxlIG9mIGNvbnRlbnRzXG5leHBvcnQgY2xhc3MgVGFibGVPZkNvbnRlbnRzU2Nyb2xsU3B5IHtcbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYmxlT2ZDb250ZW50c0xvYWRlciA9IGluamVjdChUYWJsZU9mQ29udGVudHNMb2FkZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRvY3VtZW50ID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW5kb3cgPSBpbmplY3QoV0lORE9XKTtcbiAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgcHJpdmF0ZSByZWFkb25seSB2aWV3cG9ydFNjcm9sbGVyID0gaW5qZWN0KFZpZXdwb3J0U2Nyb2xsZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGluamVjdG9yID0gaW5qZWN0KEVudmlyb25tZW50SW5qZWN0b3IpO1xuICBwcml2YXRlIGNvbnRlbnRTb3VyY2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxhc3RDb250ZW50V2lkdGggPSAwO1xuXG4gIGFjdGl2ZUl0ZW1JZCA9IHNpZ25hbDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgc2Nyb2xsYmFyVGh1bWJPblRvcCA9IHNpZ25hbDxib29sZWFuPih0cnVlKTtcblxuICBzdGFydExpc3RlbmluZ1RvU2Nyb2xsKGNvbnRlbnRTb3VyY2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRTb3VyY2VFbGVtZW50ID0gY29udGVudFNvdXJjZUVsZW1lbnQ7XG4gICAgdGhpcy5sYXN0Q29udGVudFdpZHRoID0gdGhpcy5nZXRDb250ZW50V2lkdGgoKTtcblxuICAgIHRoaXMuc2V0U2Nyb2xsRXZlbnRIYW5kbGVycygpO1xuICAgIHRoaXMuc2V0UmVzaXplRXZlbnRIYW5kbGVycygpO1xuICB9XG5cbiAgc2Nyb2xsVG9Ub3AoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3cG9ydFNjcm9sbGVyLnNjcm9sbFRvUG9zaXRpb24oWzAsIDBdKTtcbiAgfVxuXG4gIHNjcm9sbFRvU2VjdGlvbihpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHNob3VsZFJlZHVjZU1vdGlvbigpKSB7XG4gICAgICB0aGlzLm9mZnNldFRvU2VjdGlvbihpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIHNlY3Rpb24/LnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnc3RhcnQnfSk7XG4gICAgICAvLyBXZSBkb24ndCB3YW50IHRvIHNldCB0aGUgYWN0aXZlIGl0ZW0gaGVyZSwgaXQgd291bGQgbWVzcyB1cCB0aGUgYW5pbWF0aW9uXG4gICAgICAvLyBUaGUgc2Nyb2xsIGV2ZW50IGhhbmRsZXIgd2lsbCBoYW5kbGUgaXQgZm9yIHVzXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvZmZzZXRUb1NlY3Rpb24oaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICBzZWN0aW9uPy5zY3JvbGxJbnRvVmlldyh7YmxvY2s6ICdzdGFydCd9KTtcbiAgICAvLyBIZXJlIHdlIG5lZWQgdG8gc2V0IHRoZSBhY3RpdmUgaXRlbSBtYW51YWxseSBiZWNhdXNlIHNjcm9sbCBldmVudHMgbWlnaHQgbm90IGJlIGZpcmVkXG4gICAgdGhpcy5hY3RpdmVJdGVtSWQuc2V0KGlkKTtcbiAgfVxuXG4gIC8vIEFmdGVyIHdpbmRvdyByZXNpemUsIHdlIHNob3VsZCB1cGRhdGUgdG9wIHZhbHVlIG9mIGVhY2ggdGFibGUgY29udGVudCBpdGVtXG4gIHByaXZhdGUgc2V0UmVzaXplRXZlbnRIYW5kbGVycygpIHtcbiAgICBmcm9tRXZlbnQodGhpcy53aW5kb3csICdyZXNpemUnKVxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKFJFU0laRV9FVkVOVF9ERUxBWSksIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLCBzdGFydFdpdGgoKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy51cGRhdGVIZWFkaW5nc1RvcEFmdGVyUmVzaXplKCkpO1xuICAgICAgfSk7XG5cbiAgICAvLyBXZSBuZWVkIHRvIG9ic2VydmUgdGhlIGhlaWdodCBvZiB0aGUgZG9jcy12aWV3ZXIgYmVjYXVzZSBpdCBtYXkgY2hhbmdlIGFmdGVyIHRoZVxuICAgIC8vIGFzc2V0cyAoZm9udHMsIGltYWdlcykgYXJlIGxvYWRlZC4gVGhleSBjYW4gKGFuZCB3aWxsKSBjaGFuZ2UgdGhlIHktcG9zaXRpb24gb2YgdGhlIGhlYWRpbmdzLlxuICAgIGNvbnN0IGRvY3NWaWV3ZXIgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RvY3Mtdmlld2VyJyk7XG4gICAgaWYgKGRvY3NWaWV3ZXIpIHtcbiAgICAgIGFmdGVyTmV4dFJlbmRlcihcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMudXBkYXRlSGVhZGluZ3NUb3BBZnRlclJlc2l6ZSgpKTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKGRvY3NWaWV3ZXIpO1xuICAgICAgICAgIHRoaXMuZGVzdHJveVJlZi5vbkRlc3Ryb3koKCkgPT4gcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpKTtcbiAgICAgICAgfSxcbiAgICAgICAge2luamVjdG9yOiB0aGlzLmluamVjdG9yfSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVIZWFkaW5nc1RvcEFmdGVyUmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMubGFzdENvbnRlbnRXaWR0aCA9IHRoaXMuZ2V0Q29udGVudFdpZHRoKCk7XG5cbiAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IHRoaXMuY29udGVudFNvdXJjZUVsZW1lbnQ7XG4gICAgaWYgKGNvbnRlbnRFbGVtZW50KSB7XG4gICAgICB0aGlzLnRhYmxlT2ZDb250ZW50c0xvYWRlci51cGRhdGVIZWFkaW5nc1RvcFZhbHVlKGNvbnRlbnRFbGVtZW50KTtcbiAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbUlkKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRTY3JvbGxFdmVudEhhbmRsZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbCQgPSBmcm9tRXZlbnQodGhpcy5kb2N1bWVudCwgJ3Njcm9sbCcpLnBpcGUoXG4gICAgICBhdWRpdFRpbWUoU0NST0xMX0VWRU5UX0RFTEFZKSxcbiAgICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICAgICk7XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBzY3JvbGwkLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldEFjdGl2ZUl0ZW1JZCgpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QWN0aXZlSXRlbUlkKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlT2ZDb250ZW50SXRlbXMgPSB0aGlzLnRhYmxlT2ZDb250ZW50c0xvYWRlci50YWJsZU9mQ29udGVudEl0ZW1zO1xuXG4gICAgaWYgKHRhYmxlT2ZDb250ZW50SXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAvLyBSZXNpemUgY291bGQgZW1pdCBzY3JvbGwgZXZlbnQsIGluIHRoYXQgY2FzZSB3ZSBjb3VsZCBzdG9wIHNldHRpbmcgYWN0aXZlIGl0ZW0gdW50aWwgcmVzaXplIHdpbGwgYmUgZmluaXNoZWRcbiAgICBpZiAodGhpcy5sYXN0Q29udGVudFdpZHRoICE9PSB0aGlzLmdldENvbnRlbnRXaWR0aCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2Nyb2xsT2Zmc2V0ID0gdGhpcy5nZXRTY3JvbGxPZmZzZXQoKTtcbiAgICBpZiAoc2Nyb2xsT2Zmc2V0ID09PSBudWxsKSByZXR1cm47XG5cbiAgICBmb3IgKGNvbnN0IFtpLCBjdXJyZW50TGlua10gb2YgdGFibGVPZkNvbnRlbnRJdGVtcy5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IG5leHRMaW5rID0gdGFibGVPZkNvbnRlbnRJdGVtc1tpICsgMV07XG5cbiAgICAgIC8vIEEgbGluayBpcyBjb25zaWRlcmVkIGFjdGl2ZSBpZiB0aGUgcGFnZSBpcyBzY3JvbGxlZCBwYXN0IHRoZVxuICAgICAgLy8gYW5jaG9yIHdpdGhvdXQgYWxzbyBiZWluZyBzY3JvbGxlZCBwYXNzZWQgdGhlIG5leHQgbGluay5cbiAgICAgIGNvbnN0IGlzQWN0aXZlID1cbiAgICAgICAgc2Nyb2xsT2Zmc2V0ID49IGN1cnJlbnRMaW5rLnRvcCAmJiAoIW5leHRMaW5rIHx8IG5leHRMaW5rLnRvcCA+PSBzY3JvbGxPZmZzZXQpO1xuXG4gICAgICAvLyBXaGVuIGFjdGl2ZSBpdGVtIHdhcyBjaGFuZ2VkIHRoZW4gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgICBpZiAoaXNBY3RpdmUgJiYgdGhpcy5hY3RpdmVJdGVtSWQoKSAhPT0gY3VycmVudExpbmsuaWQpIHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMuYWN0aXZlSXRlbUlkLnNldChjdXJyZW50TGluay5pZCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbE9mZnNldCA8IHRhYmxlT2ZDb250ZW50SXRlbXNbMF0udG9wICYmIHRoaXMuYWN0aXZlSXRlbUlkKCkgIT09IG51bGwpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmFjdGl2ZUl0ZW1JZC5zZXQobnVsbCkpO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbE9mZnNldFplcm8gPSBzY3JvbGxPZmZzZXQgPT09IDA7XG4gICAgaWYgKHNjcm9sbE9mZnNldFplcm8gIT09IHRoaXMuc2Nyb2xsYmFyVGh1bWJPblRvcCgpKSB7XG4gICAgICAvLyB3ZSB3YW50IHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBvbmx5IHdoZW4gdGhlIHZhbHVlIGNoYW5nZXNcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLnNjcm9sbGJhclRodW1iT25Ub3Auc2V0KHNjcm9sbE9mZnNldFplcm8pKTtcbiAgICB9XG4gIH1cblxuICAvLyBHZXRzIHRoZSBzY3JvbGwgb2Zmc2V0IG9mIHRoZSBzY3JvbGwgY29udGFpbmVyXG4gIHByaXZhdGUgZ2V0U2Nyb2xsT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93LnNjcm9sbFk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbnRlbnRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggfHwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gIH1cbn1cbiJdfQ==