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
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
/**
 * Name of an attribute that is set on an element that should be
 * excluded from the `TableOfContentsLoader` lookup. This is needed
 * to exempt SSR'ed content of the `TableOfContents` component from
 * being inspected and accidentally pulling more content into ToC.
 */
export const TOC_SKIP_CONTENT_MARKER = 'toc-skip-content';
let TableOfContentsLoader = class TableOfContentsLoader {
    constructor() {
        // There are some cases when default browser anchor scrolls a little above the
        // heading In that cases wrong item was selected. The value found by trial and
        // error.
        this.toleranceThreshold = 40;
        this.tableOfContentItems = [];
        this.document = inject(DOCUMENT);
        this.platformId = inject(PLATFORM_ID);
    }
    buildTableOfContent(docElement) {
        const headings = this.getHeadings(docElement);
        const tocList = headings.map((heading) => ({
            id: heading.id,
            level: heading.tagName.toLowerCase(),
            title: this.getHeadingTitle(heading),
            top: this.calculateTop(heading),
        }));
        this.tableOfContentItems = tocList;
    }
    // Update top value of heading, it should be executed after window resize
    updateHeadingsTopValue(element) {
        const headings = this.getHeadings(element);
        const updatedTopValues = new Map();
        for (const heading of headings) {
            const parentTop = heading.parentElement?.offsetTop ?? 0;
            const top = Math.floor(parentTop + heading.offsetTop - this.toleranceThreshold);
            updatedTopValues.set(heading.id, top);
        }
        this.tableOfContentItems.forEach((item) => {
            item.top = updatedTopValues.get(item.id) ?? 0;
        });
    }
    getHeadingTitle(heading) {
        const div = this.document.createElement('div');
        div.innerHTML = heading.innerHTML;
        return (div.textContent || '').trim();
    }
    // Get all headings (h2 and h3) with ids, which are not children of the
    // docs-example-viewer component.
    getHeadings(element) {
        return Array.from(element.querySelectorAll(`h2[id]:not(docs-example-viewer h2):not([${TOC_SKIP_CONTENT_MARKER}]),` +
            `h3[id]:not(docs-example-viewer h3):not([${TOC_SKIP_CONTENT_MARKER}])`));
    }
    calculateTop(heading) {
        if (!isPlatformBrowser(this.platformId))
            return 0;
        return (Math.floor(heading.offsetTop > 0 ? heading.offsetTop : heading.getClientRects()[0]?.top) -
            this.toleranceThreshold);
    }
};
TableOfContentsLoader = __decorate([
    Injectable()
], TableOfContentsLoader);
export { TableOfContentsLoader };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9kb2NzL3NlcnZpY2VzL3RhYmxlLW9mLWNvbnRlbnRzLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJOUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxrQkFBa0IsQ0FBQztBQUduRCxJQUFNLHFCQUFxQixHQUEzQixNQUFNLHFCQUFxQjtJQUEzQjtRQUNMLDhFQUE4RTtRQUM5RSw4RUFBOEU7UUFDOUUsU0FBUztRQUNBLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUVqQyx3QkFBbUIsR0FBMEIsRUFBRSxDQUFDO1FBRS9CLGFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsZUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQXVEcEQsQ0FBQztJQXJEQyxtQkFBbUIsQ0FBQyxVQUFtQjtRQUNyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sT0FBTyxHQUEwQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNkLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBMEI7WUFDNUQsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1lBQ3BDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztTQUNoQyxDQUFDLENBQUMsQ0FBQztRQUVKLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUVELHlFQUF5RTtJQUN6RSxzQkFBc0IsQ0FBQyxPQUFvQjtRQUN6QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFFbkQsS0FBSyxNQUFNLE9BQU8sSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUMvQixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsSUFBSSxDQUFDLENBQUM7WUFDeEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNoRixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sZUFBZSxDQUFDLE9BQTJCO1FBQ2pELE1BQU0sR0FBRyxHQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFFbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxpQ0FBaUM7SUFDekIsV0FBVyxDQUFDLE9BQWdCO1FBQ2xDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FDZixPQUFPLENBQUMsZ0JBQWdCLENBQ3RCLDJDQUEyQyx1QkFBdUIsS0FBSztZQUNyRSwyQ0FBMkMsdUJBQXVCLElBQUksQ0FDekUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVPLFlBQVksQ0FBQyxPQUEyQjtRQUM5QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELE9BQU8sQ0FDTCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ3hGLElBQUksQ0FBQyxrQkFBa0IsQ0FDeEIsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBaEVZLHFCQUFxQjtJQURqQyxVQUFVLEVBQUU7R0FDQSxxQkFBcUIsQ0FnRWpDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7aW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7VGFibGVPZkNvbnRlbnRzSXRlbSwgVGFibGVPZkNvbnRlbnRzTGV2ZWx9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG4vKipcbiAqIE5hbWUgb2YgYW4gYXR0cmlidXRlIHRoYXQgaXMgc2V0IG9uIGFuIGVsZW1lbnQgdGhhdCBzaG91bGQgYmVcbiAqIGV4Y2x1ZGVkIGZyb20gdGhlIGBUYWJsZU9mQ29udGVudHNMb2FkZXJgIGxvb2t1cC4gVGhpcyBpcyBuZWVkZWRcbiAqIHRvIGV4ZW1wdCBTU1InZWQgY29udGVudCBvZiB0aGUgYFRhYmxlT2ZDb250ZW50c2AgY29tcG9uZW50IGZyb21cbiAqIGJlaW5nIGluc3BlY3RlZCBhbmQgYWNjaWRlbnRhbGx5IHB1bGxpbmcgbW9yZSBjb250ZW50IGludG8gVG9DLlxuICovXG5leHBvcnQgY29uc3QgVE9DX1NLSVBfQ09OVEVOVF9NQVJLRVIgPSAndG9jLXNraXAtY29udGVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJsZU9mQ29udGVudHNMb2FkZXIge1xuICAvLyBUaGVyZSBhcmUgc29tZSBjYXNlcyB3aGVuIGRlZmF1bHQgYnJvd3NlciBhbmNob3Igc2Nyb2xscyBhIGxpdHRsZSBhYm92ZSB0aGVcbiAgLy8gaGVhZGluZyBJbiB0aGF0IGNhc2VzIHdyb25nIGl0ZW0gd2FzIHNlbGVjdGVkLiBUaGUgdmFsdWUgZm91bmQgYnkgdHJpYWwgYW5kXG4gIC8vIGVycm9yLlxuICByZWFkb25seSB0b2xlcmFuY2VUaHJlc2hvbGQgPSA0MDtcblxuICB0YWJsZU9mQ29udGVudEl0ZW1zOiBUYWJsZU9mQ29udGVudHNJdGVtW10gPSBbXTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRvY3VtZW50ID0gaW5qZWN0KERPQ1VNRU5UKTtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlkID0gaW5qZWN0KFBMQVRGT1JNX0lEKTtcblxuICBidWlsZFRhYmxlT2ZDb250ZW50KGRvY0VsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuZ2V0SGVhZGluZ3MoZG9jRWxlbWVudCk7XG4gICAgY29uc3QgdG9jTGlzdDogVGFibGVPZkNvbnRlbnRzSXRlbVtdID0gaGVhZGluZ3MubWFwKChoZWFkaW5nKSA9PiAoe1xuICAgICAgaWQ6IGhlYWRpbmcuaWQsXG4gICAgICBsZXZlbDogaGVhZGluZy50YWdOYW1lLnRvTG93ZXJDYXNlKCkgYXMgVGFibGVPZkNvbnRlbnRzTGV2ZWwsXG4gICAgICB0aXRsZTogdGhpcy5nZXRIZWFkaW5nVGl0bGUoaGVhZGluZyksXG4gICAgICB0b3A6IHRoaXMuY2FsY3VsYXRlVG9wKGhlYWRpbmcpLFxuICAgIH0pKTtcblxuICAgIHRoaXMudGFibGVPZkNvbnRlbnRJdGVtcyA9IHRvY0xpc3Q7XG4gIH1cblxuICAvLyBVcGRhdGUgdG9wIHZhbHVlIG9mIGhlYWRpbmcsIGl0IHNob3VsZCBiZSBleGVjdXRlZCBhZnRlciB3aW5kb3cgcmVzaXplXG4gIHVwZGF0ZUhlYWRpbmdzVG9wVmFsdWUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBoZWFkaW5ncyA9IHRoaXMuZ2V0SGVhZGluZ3MoZWxlbWVudCk7XG4gICAgY29uc3QgdXBkYXRlZFRvcFZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbiAgICBmb3IgKGNvbnN0IGhlYWRpbmcgb2YgaGVhZGluZ3MpIHtcbiAgICAgIGNvbnN0IHBhcmVudFRvcCA9IGhlYWRpbmcucGFyZW50RWxlbWVudD8ub2Zmc2V0VG9wID8/IDA7XG4gICAgICBjb25zdCB0b3AgPSBNYXRoLmZsb29yKHBhcmVudFRvcCArIGhlYWRpbmcub2Zmc2V0VG9wIC0gdGhpcy50b2xlcmFuY2VUaHJlc2hvbGQpO1xuICAgICAgdXBkYXRlZFRvcFZhbHVlcy5zZXQoaGVhZGluZy5pZCwgdG9wKTtcbiAgICB9XG5cbiAgICB0aGlzLnRhYmxlT2ZDb250ZW50SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS50b3AgPSB1cGRhdGVkVG9wVmFsdWVzLmdldChpdGVtLmlkKSA/PyAwO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRIZWFkaW5nVGl0bGUoaGVhZGluZzogSFRNTEhlYWRpbmdFbGVtZW50KTogc3RyaW5nIHtcbiAgICBjb25zdCBkaXY6IEhUTUxEaXZFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gaGVhZGluZy5pbm5lckhUTUw7XG5cbiAgICByZXR1cm4gKGRpdi50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICB9XG5cbiAgLy8gR2V0IGFsbCBoZWFkaW5ncyAoaDIgYW5kIGgzKSB3aXRoIGlkcywgd2hpY2ggYXJlIG5vdCBjaGlsZHJlbiBvZiB0aGVcbiAgLy8gZG9jcy1leGFtcGxlLXZpZXdlciBjb21wb25lbnQuXG4gIHByaXZhdGUgZ2V0SGVhZGluZ3MoZWxlbWVudDogRWxlbWVudCk6IEhUTUxIZWFkaW5nRWxlbWVudFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MSGVhZGluZ0VsZW1lbnQ+KFxuICAgICAgICBgaDJbaWRdOm5vdChkb2NzLWV4YW1wbGUtdmlld2VyIGgyKTpub3QoWyR7VE9DX1NLSVBfQ09OVEVOVF9NQVJLRVJ9XSksYCArXG4gICAgICAgICAgYGgzW2lkXTpub3QoZG9jcy1leGFtcGxlLXZpZXdlciBoMyk6bm90KFske1RPQ19TS0lQX0NPTlRFTlRfTUFSS0VSfV0pYCxcbiAgICAgICksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FsY3VsYXRlVG9wKGhlYWRpbmc6IEhUTUxIZWFkaW5nRWxlbWVudCk6IG51bWJlciB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSByZXR1cm4gMDtcbiAgICByZXR1cm4gKFxuICAgICAgTWF0aC5mbG9vcihoZWFkaW5nLm9mZnNldFRvcCA+IDAgPyBoZWFkaW5nLm9mZnNldFRvcCA6IGhlYWRpbmcuZ2V0Q2xpZW50UmVjdHMoKVswXT8udG9wKSAtXG4gICAgICB0aGlzLnRvbGVyYW5jZVRocmVzaG9sZFxuICAgICk7XG4gIH1cbn1cbiJdfQ==