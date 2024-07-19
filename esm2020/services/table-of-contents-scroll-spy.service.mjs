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
            this.updateHeadingsTopAfterResize();
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
        const tableOfContentItems = this.tableOfContentsLoader.tableOfContentItems();
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
                this.activeItemId.set(currentLink.id);
                return;
            }
        }
        if (scrollOffset < tableOfContentItems[0].top && this.activeItemId() !== null) {
            this.activeItemId.set(null);
        }
        const scrollOffsetZero = scrollOffset === 0;
        if (scrollOffsetZero !== this.scrollbarThumbOnTop()) {
            // we want to trigger change detection only when the value changes
            this.scrollbarThumbOnTop.set(scrollOffsetZero);
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
TableOfContentsScrollSpy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: TableOfContentsScrollSpy, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TableOfContentsScrollSpy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: TableOfContentsScrollSpy, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: TableOfContentsScrollSpy, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMtc2Nyb2xsLXNweS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9zZXJ2aWNlcy90YWJsZS1vZi1jb250ZW50cy1zY3JvbGwtc3B5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFDTCxVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLFVBQVUsRUFDVixlQUFlLEVBQ2YsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7O0FBRXpFLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUNyQyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7QUFHMUQsdUVBQXVFO0FBQ3ZFLG1FQUFtRTtBQUNuRSxNQUFNLE9BQU8sd0JBQXdCO0lBSHJDO1FBSW1CLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsMEJBQXFCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDdEQsYUFB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QUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDbkUsQ0FBQzs7NEhBdElVLHdCQUF3QjtnSUFBeEIsd0JBQXdCLGNBSFosTUFBTTtrR0FHbEIsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgVmlld3BvcnRTY3JvbGxlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIERlc3Ryb3lSZWYsXG4gIEVudmlyb25tZW50SW5qZWN0b3IsXG4gIEluamVjdGFibGUsXG4gIGFmdGVyTmV4dFJlbmRlcixcbiAgaW5qZWN0LFxuICBzaWduYWwsXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JFU0laRV9FVkVOVF9ERUxBWX0gZnJvbSAnLi4vY29uc3RhbnRzL2luZGV4JztcbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge2F1ZGl0VGltZSwgZGVib3VuY2VUaW1lLCBmcm9tRXZlbnQsIHN0YXJ0V2l0aH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1dJTkRPV30gZnJvbSAnLi4vcHJvdmlkZXJzL2luZGV4JztcbmltcG9ydCB7c2hvdWxkUmVkdWNlTW90aW9ufSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5pbXBvcnQge1RhYmxlT2ZDb250ZW50c0xvYWRlcn0gZnJvbSAnLi90YWJsZS1vZi1jb250ZW50cy1sb2FkZXIuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBTQ1JPTExfRVZFTlRfREVMQVkgPSAyMDtcbmV4cG9ydCBjb25zdCBTQ1JPTExfRklOSVNIX0RFTEFZID0gU0NST0xMX0VWRU5UX0RFTEFZICogMjtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG4vLyBUaGUgc2VydmljZSBpcyByZXNwb25zaWJsZSBmb3IgbGlzdGVuaW5nIGZvciBzY3JvbGxpbmcgYW5kIHJlc2l6aW5nLFxuLy8gdGhhbmtzIHRvIHdoaWNoIGl0IHNldHMgdGhlIGFjdGl2ZSBpdGVtIGluIHRoZSBUYWJsZSBvZiBjb250ZW50c1xuZXhwb3J0IGNsYXNzIFRhYmxlT2ZDb250ZW50c1Njcm9sbFNweSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSB0YWJsZU9mQ29udGVudHNMb2FkZXIgPSBpbmplY3QoVGFibGVPZkNvbnRlbnRzTG9hZGVyKTtcbiAgcHJpdmF0ZSByZWFkb25seSBkb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luZG93ID0gaW5qZWN0KFdJTkRPVyk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbmdab25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgdmlld3BvcnRTY3JvbGxlciA9IGluamVjdChWaWV3cG9ydFNjcm9sbGVyKTtcbiAgcHJpdmF0ZSByZWFkb25seSBpbmplY3RvciA9IGluamVjdChFbnZpcm9ubWVudEluamVjdG9yKTtcbiAgcHJpdmF0ZSBjb250ZW50U291cmNlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBsYXN0Q29udGVudFdpZHRoID0gMDtcblxuICBhY3RpdmVJdGVtSWQgPSBzaWduYWw8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIHNjcm9sbGJhclRodW1iT25Ub3AgPSBzaWduYWw8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgc3RhcnRMaXN0ZW5pbmdUb1Njcm9sbChjb250ZW50U291cmNlRWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50U291cmNlRWxlbWVudCA9IGNvbnRlbnRTb3VyY2VFbGVtZW50O1xuICAgIHRoaXMubGFzdENvbnRlbnRXaWR0aCA9IHRoaXMuZ2V0Q29udGVudFdpZHRoKCk7XG5cbiAgICB0aGlzLnNldFNjcm9sbEV2ZW50SGFuZGxlcnMoKTtcbiAgICB0aGlzLnNldFJlc2l6ZUV2ZW50SGFuZGxlcnMoKTtcbiAgfVxuXG4gIHNjcm9sbFRvVG9wKCk6IHZvaWQge1xuICAgIHRoaXMudmlld3BvcnRTY3JvbGxlci5zY3JvbGxUb1Bvc2l0aW9uKFswLCAwXSk7XG4gIH1cblxuICBzY3JvbGxUb1NlY3Rpb24oaWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChzaG91bGRSZWR1Y2VNb3Rpb24oKSkge1xuICAgICAgdGhpcy5vZmZzZXRUb1NlY3Rpb24oaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICBzZWN0aW9uPy5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ3N0YXJ0J30pO1xuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzZXQgdGhlIGFjdGl2ZSBpdGVtIGhlcmUsIGl0IHdvdWxkIG1lc3MgdXAgdGhlIGFuaW1hdGlvblxuICAgICAgLy8gVGhlIHNjcm9sbCBldmVudCBoYW5kbGVyIHdpbGwgaGFuZGxlIGl0IGZvciB1c1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb2Zmc2V0VG9TZWN0aW9uKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzZWN0aW9uID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgc2VjdGlvbj8uc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiAnc3RhcnQnfSk7XG4gICAgLy8gSGVyZSB3ZSBuZWVkIHRvIHNldCB0aGUgYWN0aXZlIGl0ZW0gbWFudWFsbHkgYmVjYXVzZSBzY3JvbGwgZXZlbnRzIG1pZ2h0IG5vdCBiZSBmaXJlZFxuICAgIHRoaXMuYWN0aXZlSXRlbUlkLnNldChpZCk7XG4gIH1cblxuICAvLyBBZnRlciB3aW5kb3cgcmVzaXplLCB3ZSBzaG91bGQgdXBkYXRlIHRvcCB2YWx1ZSBvZiBlYWNoIHRhYmxlIGNvbnRlbnQgaXRlbVxuICBwcml2YXRlIHNldFJlc2l6ZUV2ZW50SGFuZGxlcnMoKSB7XG4gICAgZnJvbUV2ZW50KHRoaXMud2luZG93LCAncmVzaXplJylcbiAgICAgIC5waXBlKGRlYm91bmNlVGltZShSRVNJWkVfRVZFTlRfREVMQVkpLCB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSwgc3RhcnRXaXRoKCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy51cGRhdGVIZWFkaW5nc1RvcEFmdGVyUmVzaXplKCk7XG4gICAgICB9KTtcblxuICAgIC8vIFdlIG5lZWQgdG8gb2JzZXJ2ZSB0aGUgaGVpZ2h0IG9mIHRoZSBkb2NzLXZpZXdlciBiZWNhdXNlIGl0IG1heSBjaGFuZ2UgYWZ0ZXIgdGhlXG4gICAgLy8gYXNzZXRzIChmb250cywgaW1hZ2VzKSBhcmUgbG9hZGVkLiBUaGV5IGNhbiAoYW5kIHdpbGwpIGNoYW5nZSB0aGUgeS1wb3NpdGlvbiBvZiB0aGUgaGVhZGluZ3MuXG4gICAgY29uc3QgZG9jc1ZpZXdlciA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZG9jcy12aWV3ZXInKTtcbiAgICBpZiAoZG9jc1ZpZXdlcikge1xuICAgICAgYWZ0ZXJOZXh0UmVuZGVyKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdGhpcy51cGRhdGVIZWFkaW5nc1RvcEFmdGVyUmVzaXplKCkpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUoZG9jc1ZpZXdlcik7XG4gICAgICAgICAgdGhpcy5kZXN0cm95UmVmLm9uRGVzdHJveSgoKSA9PiByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCkpO1xuICAgICAgICB9LFxuICAgICAgICB7aW5qZWN0b3I6IHRoaXMuaW5qZWN0b3J9LFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUhlYWRpbmdzVG9wQWZ0ZXJSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5sYXN0Q29udGVudFdpZHRoID0gdGhpcy5nZXRDb250ZW50V2lkdGgoKTtcblxuICAgIGNvbnN0IGNvbnRlbnRFbGVtZW50ID0gdGhpcy5jb250ZW50U291cmNlRWxlbWVudDtcbiAgICBpZiAoY29udGVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXMudGFibGVPZkNvbnRlbnRzTG9hZGVyLnVwZGF0ZUhlYWRpbmdzVG9wVmFsdWUoY29udGVudEVsZW1lbnQpO1xuICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtSWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFNjcm9sbEV2ZW50SGFuZGxlcnMoKTogdm9pZCB7XG4gICAgY29uc3Qgc2Nyb2xsJCA9IGZyb21FdmVudCh0aGlzLmRvY3VtZW50LCAnc2Nyb2xsJykucGlwZShcbiAgICAgIGF1ZGl0VGltZShTQ1JPTExfRVZFTlRfREVMQVkpLFxuICAgICAgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZiksXG4gICAgKTtcblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHNjcm9sbCQuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0QWN0aXZlSXRlbUlkKCkpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBY3RpdmVJdGVtSWQoKTogdm9pZCB7XG4gICAgY29uc3QgdGFibGVPZkNvbnRlbnRJdGVtcyA9IHRoaXMudGFibGVPZkNvbnRlbnRzTG9hZGVyLnRhYmxlT2ZDb250ZW50SXRlbXMoKTtcblxuICAgIGlmICh0YWJsZU9mQ29udGVudEl0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgLy8gUmVzaXplIGNvdWxkIGVtaXQgc2Nyb2xsIGV2ZW50LCBpbiB0aGF0IGNhc2Ugd2UgY291bGQgc3RvcCBzZXR0aW5nIGFjdGl2ZSBpdGVtIHVudGlsIHJlc2l6ZSB3aWxsIGJlIGZpbmlzaGVkXG4gICAgaWYgKHRoaXMubGFzdENvbnRlbnRXaWR0aCAhPT0gdGhpcy5nZXRDb250ZW50V2lkdGgoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbE9mZnNldCA9IHRoaXMuZ2V0U2Nyb2xsT2Zmc2V0KCk7XG4gICAgaWYgKHNjcm9sbE9mZnNldCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgZm9yIChjb25zdCBbaSwgY3VycmVudExpbmtdIG9mIHRhYmxlT2ZDb250ZW50SXRlbXMuZW50cmllcygpKSB7XG4gICAgICBjb25zdCBuZXh0TGluayA9IHRhYmxlT2ZDb250ZW50SXRlbXNbaSArIDFdO1xuXG4gICAgICAvLyBBIGxpbmsgaXMgY29uc2lkZXJlZCBhY3RpdmUgaWYgdGhlIHBhZ2UgaXMgc2Nyb2xsZWQgcGFzdCB0aGVcbiAgICAgIC8vIGFuY2hvciB3aXRob3V0IGFsc28gYmVpbmcgc2Nyb2xsZWQgcGFzc2VkIHRoZSBuZXh0IGxpbmsuXG4gICAgICBjb25zdCBpc0FjdGl2ZSA9XG4gICAgICAgIHNjcm9sbE9mZnNldCA+PSBjdXJyZW50TGluay50b3AgJiYgKCFuZXh0TGluayB8fCBuZXh0TGluay50b3AgPj0gc2Nyb2xsT2Zmc2V0KTtcblxuICAgICAgLy8gV2hlbiBhY3RpdmUgaXRlbSB3YXMgY2hhbmdlZCB0aGVuIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvblxuICAgICAgaWYgKGlzQWN0aXZlICYmIHRoaXMuYWN0aXZlSXRlbUlkKCkgIT09IGN1cnJlbnRMaW5rLmlkKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbUlkLnNldChjdXJyZW50TGluay5pZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsT2Zmc2V0IDwgdGFibGVPZkNvbnRlbnRJdGVtc1swXS50b3AgJiYgdGhpcy5hY3RpdmVJdGVtSWQoKSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5hY3RpdmVJdGVtSWQuc2V0KG51bGwpO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbE9mZnNldFplcm8gPSBzY3JvbGxPZmZzZXQgPT09IDA7XG4gICAgaWYgKHNjcm9sbE9mZnNldFplcm8gIT09IHRoaXMuc2Nyb2xsYmFyVGh1bWJPblRvcCgpKSB7XG4gICAgICAvLyB3ZSB3YW50IHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBvbmx5IHdoZW4gdGhlIHZhbHVlIGNoYW5nZXNcbiAgICAgIHRoaXMuc2Nyb2xsYmFyVGh1bWJPblRvcC5zZXQoc2Nyb2xsT2Zmc2V0WmVybyk7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0cyB0aGUgc2Nyb2xsIG9mZnNldCBvZiB0aGUgc2Nyb2xsIGNvbnRhaW5lclxuICBwcml2YXRlIGdldFNjcm9sbE9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5zY3JvbGxZO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb250ZW50V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIHx8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICB9XG59XG4iXX0=