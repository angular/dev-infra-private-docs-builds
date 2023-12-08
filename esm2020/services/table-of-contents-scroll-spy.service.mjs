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
TableOfContentsScrollSpy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: TableOfContentsScrollSpy, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TableOfContentsScrollSpy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: TableOfContentsScrollSpy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: TableOfContentsScrollSpy, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMtc2Nyb2xsLXNweS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9zZXJ2aWNlcy90YWJsZS1vZi1jb250ZW50cy1zY3JvbGwtc3B5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFDTCxVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLFVBQVUsRUFDVixlQUFlLEVBQ2YsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7O0FBRXpFLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUNyQyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7QUFHMUQsdUVBQXVFO0FBQ3ZFLG1FQUFtRTtBQUNuRSxNQUFNLE9BQU8sd0JBQXdCO0lBSHJDO1FBSW1CLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsMEJBQXFCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEQsYUFB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RSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDSCxDQUFDO0lBRUQsaURBQWlEO0lBQ3pDLGVBQWU7UUFDckIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3QixDQUFDO0lBRU8sZUFBZTtRQUNyQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDbkUsQ0FBQzs7NEhBdElVLHdCQUF3QjtnSUFBeEIsd0JBQXdCO2tHQUF4Qix3QkFBd0I7a0JBSHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIFZpZXdwb3J0U2Nyb2xsZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBEZXN0cm95UmVmLFxuICBFbnZpcm9ubWVudEluamVjdG9yLFxuICBJbmplY3RhYmxlLFxuICBhZnRlck5leHRSZW5kZXIsXG4gIGluamVjdCxcbiAgc2lnbmFsLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSRVNJWkVfRVZFTlRfREVMQVl9IGZyb20gJy4uL2NvbnN0YW50cy9pbmRleCc7XG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHthdWRpdFRpbWUsIGRlYm91bmNlVGltZSwgZnJvbUV2ZW50LCBzdGFydFdpdGh9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtXSU5ET1d9IGZyb20gJy4uL3Byb3ZpZGVycy9pbmRleCc7XG5pbXBvcnQge3Nob3VsZFJlZHVjZU1vdGlvbn0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHtUYWJsZU9mQ29udGVudHNMb2FkZXJ9IGZyb20gJy4vdGFibGUtb2YtY29udGVudHMtbG9hZGVyLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgU0NST0xMX0VWRU5UX0RFTEFZID0gMjA7XG5leHBvcnQgY29uc3QgU0NST0xMX0ZJTklTSF9ERUxBWSA9IFNDUk9MTF9FVkVOVF9ERUxBWSAqIDI7XG5cbkBJbmplY3RhYmxlKClcbi8vIFRoZSBzZXJ2aWNlIGlzIHJlc3BvbnNpYmxlIGZvciBsaXN0ZW5pbmcgZm9yIHNjcm9sbGluZyBhbmQgcmVzaXppbmcsXG4vLyB0aGFua3MgdG8gd2hpY2ggaXQgc2V0cyB0aGUgYWN0aXZlIGl0ZW0gaW4gdGhlIFRhYmxlIG9mIGNvbnRlbnRzXG5leHBvcnQgY2xhc3MgVGFibGVPZkNvbnRlbnRzU2Nyb2xsU3B5IHtcbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYmxlT2ZDb250ZW50c0xvYWRlciA9IGluamVjdChUYWJsZU9mQ29udGVudHNMb2FkZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRvY3VtZW50ID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW5kb3cgPSBpbmplY3QoV0lORE9XKTtcbiAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgcHJpdmF0ZSByZWFkb25seSB2aWV3cG9ydFNjcm9sbGVyID0gaW5qZWN0KFZpZXdwb3J0U2Nyb2xsZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGluamVjdG9yID0gaW5qZWN0KEVudmlyb25tZW50SW5qZWN0b3IpO1xuICBwcml2YXRlIGNvbnRlbnRTb3VyY2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxhc3RDb250ZW50V2lkdGggPSAwO1xuXG4gIGFjdGl2ZUl0ZW1JZCA9IHNpZ25hbDxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgc2Nyb2xsYmFyVGh1bWJPblRvcCA9IHNpZ25hbDxib29sZWFuPih0cnVlKTtcblxuICBzdGFydExpc3RlbmluZ1RvU2Nyb2xsKGNvbnRlbnRTb3VyY2VFbGVtZW50OiBIVE1MRWxlbWVudCB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRTb3VyY2VFbGVtZW50ID0gY29udGVudFNvdXJjZUVsZW1lbnQ7XG4gICAgdGhpcy5sYXN0Q29udGVudFdpZHRoID0gdGhpcy5nZXRDb250ZW50V2lkdGgoKTtcblxuICAgIHRoaXMuc2V0U2Nyb2xsRXZlbnRIYW5kbGVycygpO1xuICAgIHRoaXMuc2V0UmVzaXplRXZlbnRIYW5kbGVycygpO1xuICB9XG5cbiAgc2Nyb2xsVG9Ub3AoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3cG9ydFNjcm9sbGVyLnNjcm9sbFRvUG9zaXRpb24oWzAsIDBdKTtcbiAgfVxuXG4gIHNjcm9sbFRvU2VjdGlvbihpZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHNob3VsZFJlZHVjZU1vdGlvbigpKSB7XG4gICAgICB0aGlzLm9mZnNldFRvU2VjdGlvbihpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlY3Rpb24gPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIHNlY3Rpb24/LnNjcm9sbEludG9WaWV3KHtiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnc3RhcnQnfSk7XG4gICAgICAvLyBXZSBkb24ndCB3YW50IHRvIHNldCB0aGUgYWN0aXZlIGl0ZW0gaGVyZSwgaXQgd291bGQgbWVzcyB1cCB0aGUgYW5pbWF0aW9uXG4gICAgICAvLyBUaGUgc2Nyb2xsIGV2ZW50IGhhbmRsZXIgd2lsbCBoYW5kbGUgaXQgZm9yIHVzXG4gICAgfVxuICB9XG5cbiAgb2Zmc2V0VG9TZWN0aW9uKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgc2VjdGlvbj8uc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiAnc3RhcnQnfSk7XG4gICAgLy8gSGVyZSB3ZSBuZWVkIHRvIHNldCB0aGUgYWN0aXZlIGl0ZW0gbWFudWFsbHkgYmVjYXVzZSBzY3JvbGwgZXZlbnRzIG1pZ2h0IG5vdCBiZSBmaXJlZFxuICAgIHRoaXMuYWN0aXZlSXRlbUlkLnNldChpZCk7XG4gIH1cblxuICAvLyBBZnRlciB3aW5kb3cgcmVzaXplLCB3ZSBzaG91bGQgdXBkYXRlIHRvcCB2YWx1ZSBvZiBlYWNoIHRhYmxlIGNvbnRlbnQgaXRlbVxuICBwcml2YXRlIHNldFJlc2l6ZUV2ZW50SGFuZGxlcnMoKSB7XG4gICAgZnJvbUV2ZW50KHRoaXMud2luZG93LCAncmVzaXplJylcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZShSRVNJWkVfRVZFTlRfREVMQVkpLCB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSwgc3RhcnRXaXRoKCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHRoaXMudXBkYXRlSGVhZGluZ3NUb3BBZnRlclJlc2l6ZSgpKTtcbiAgICAgIH0pO1xuXG4gICAgLy8gV2UgbmVlZCB0byBvYnNlcnZlIHRoZSBoZWlnaHQgb2YgdGhlIGRvY3Mtdmlld2VyIGJlY2F1c2UgaXQgbWF5IGNoYW5nZSBhZnRlciB0aGVcbiAgICAvLyBhc3NldHMgKGZvbnRzLCBpbWFnZXMpIGFyZSBsb2FkZWQuIFRoZXkgY2FuIChhbmQgd2lsbCkgY2hhbmdlIHRoZSB5LXBvc2l0aW9uIG9mIHRoZSBoZWFkaW5ncy5cbiAgICBjb25zdCBkb2NzVmlld2VyID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkb2NzLXZpZXdlcicpO1xuICAgIGlmIChkb2NzVmlld2VyKSB7XG4gICAgICBhZnRlck5leHRSZW5kZXIoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB0aGlzLnVwZGF0ZUhlYWRpbmdzVG9wQWZ0ZXJSZXNpemUoKSk7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShkb2NzVmlld2VyKTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3lSZWYub25EZXN0cm95KCgpID0+IHJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIHtpbmplY3RvcjogdGhpcy5pbmplY3Rvcn0sXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSGVhZGluZ3NUb3BBZnRlclJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmxhc3RDb250ZW50V2lkdGggPSB0aGlzLmdldENvbnRlbnRXaWR0aCgpO1xuXG4gICAgY29uc3QgY29udGVudEVsZW1lbnQgPSB0aGlzLmNvbnRlbnRTb3VyY2VFbGVtZW50O1xuICAgIGlmIChjb250ZW50RWxlbWVudCkge1xuICAgICAgdGhpcy50YWJsZU9mQ29udGVudHNMb2FkZXIudXBkYXRlSGVhZGluZ3NUb3BWYWx1ZShjb250ZW50RWxlbWVudCk7XG4gICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1JZCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0U2Nyb2xsRXZlbnRIYW5kbGVycygpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JvbGwkID0gZnJvbUV2ZW50KHRoaXMuZG9jdW1lbnQsICdzY3JvbGwnKS5waXBlKFxuICAgICAgYXVkaXRUaW1lKFNDUk9MTF9FVkVOVF9ERUxBWSksXG4gICAgICB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSxcbiAgICApO1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgc2Nyb2xsJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRBY3RpdmVJdGVtSWQoKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldEFjdGl2ZUl0ZW1JZCgpOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZU9mQ29udGVudEl0ZW1zID0gdGhpcy50YWJsZU9mQ29udGVudHNMb2FkZXIudGFibGVPZkNvbnRlbnRJdGVtcztcblxuICAgIGlmICh0YWJsZU9mQ29udGVudEl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgLy8gUmVzaXplIGNvdWxkIGVtaXQgc2Nyb2xsIGV2ZW50LCBpbiB0aGF0IGNhc2Ugd2UgY291bGQgc3RvcCBzZXR0aW5nIGFjdGl2ZSBpdGVtIHVudGlsIHJlc2l6ZSB3aWxsIGJlIGZpbmlzaGVkXG4gICAgaWYgKHRoaXMubGFzdENvbnRlbnRXaWR0aCAhPT0gdGhpcy5nZXRDb250ZW50V2lkdGgoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbE9mZnNldCA9IHRoaXMuZ2V0U2Nyb2xsT2Zmc2V0KCk7XG4gICAgaWYgKHNjcm9sbE9mZnNldCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgZm9yIChjb25zdCBbaSwgY3VycmVudExpbmtdIG9mIHRhYmxlT2ZDb250ZW50SXRlbXMuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBuZXh0TGluayA9IHRhYmxlT2ZDb250ZW50SXRlbXNbaSArIDFdO1xuXG4gICAgICAvLyBBIGxpbmsgaXMgY29uc2lkZXJlZCBhY3RpdmUgaWYgdGhlIHBhZ2UgaXMgc2Nyb2xsZWQgcGFzdCB0aGVcbiAgICAgIC8vIGFuY2hvciB3aXRob3V0IGFsc28gYmVpbmcgc2Nyb2xsZWQgcGFzc2VkIHRoZSBuZXh0IGxpbmsuXG4gICAgICBjb25zdCBpc0FjdGl2ZSA9XG4gICAgICAgIHNjcm9sbE9mZnNldCA+PSBjdXJyZW50TGluay50b3AgJiYgKCFuZXh0TGluayB8fCBuZXh0TGluay50b3AgPj0gc2Nyb2xsT2Zmc2V0KTtcblxuICAgICAgLy8gV2hlbiBhY3RpdmUgaXRlbSB3YXMgY2hhbmdlZCB0aGVuIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgICAgaWYgKGlzQWN0aXZlICYmIHRoaXMuYWN0aXZlSXRlbUlkKCkgIT09IGN1cnJlbnRMaW5rLmlkKSB7XG4gICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmFjdGl2ZUl0ZW1JZC5zZXQoY3VycmVudExpbmsuaWQpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzY3JvbGxPZmZzZXQgPCB0YWJsZU9mQ29udGVudEl0ZW1zWzBdLnRvcCAmJiB0aGlzLmFjdGl2ZUl0ZW1JZCgpICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5hY3RpdmVJdGVtSWQuc2V0KG51bGwpKTtcbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGxPZmZzZXRaZXJvID0gc2Nyb2xsT2Zmc2V0ID09PSAwO1xuICAgIGlmIChzY3JvbGxPZmZzZXRaZXJvICE9PSB0aGlzLnNjcm9sbGJhclRodW1iT25Ub3AoKSkge1xuICAgICAgLy8gd2Ugd2FudCB0byB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gb25seSB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzXG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4gdGhpcy5zY3JvbGxiYXJUaHVtYk9uVG9wLnNldChzY3JvbGxPZmZzZXRaZXJvKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0cyB0aGUgc2Nyb2xsIG9mZnNldCBvZiB0aGUgc2Nyb2xsIGNvbnRhaW5lclxuICBwcml2YXRlIGdldFNjcm9sbE9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5zY3JvbGxZO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb250ZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIHx8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICB9XG59XG4iXX0=