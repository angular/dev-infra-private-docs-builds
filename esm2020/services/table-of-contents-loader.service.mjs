/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Name of an attribute that is set on an element that should be
 * excluded from the `TableOfContentsLoader` lookup. This is needed
 * to exempt SSR'ed content of the `TableOfContents` component from
 * being inspected and accidentally pulling more content into ToC.
 */
export const TOC_SKIP_CONTENT_MARKER = 'toc-skip-content';
export class TableOfContentsLoader {
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
}
TableOfContentsLoader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0-next.1", ngImport: i0, type: TableOfContentsLoader, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TableOfContentsLoader.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.0-next.1", ngImport: i0, type: TableOfContentsLoader });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0-next.1", ngImport: i0, type: TableOfContentsLoader, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9kb2NzL3NlcnZpY2VzL3RhYmxlLW9mLWNvbnRlbnRzLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBSTlEOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsa0JBQWtCLENBQUM7QUFHMUQsTUFBTSxPQUFPLHFCQUFxQjtJQURsQztRQUVFLDhFQUE4RTtRQUM5RSw4RUFBOEU7UUFDOUUsU0FBUztRQUNBLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUVqQyx3QkFBbUIsR0FBMEIsRUFBRSxDQUFDO1FBRS9CLGFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsZUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQXVEbkQ7SUFyREMsbUJBQW1CLENBQUMsVUFBbUI7UUFDckMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM5QyxNQUFNLE9BQU8sR0FBMEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNoRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDZCxLQUFLLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQTBCO1lBQzVELEtBQUssRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQztZQUNwQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7U0FDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSixJQUFJLENBQUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx5RUFBeUU7SUFDekUsc0JBQXNCLENBQUMsT0FBb0I7UUFDekMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBRW5ELEtBQUssTUFBTSxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7WUFDL0IsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsRUFBRSxTQUFTLElBQUksQ0FBQyxDQUFDO1lBQ3hELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDaEYsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGVBQWUsQ0FBQyxPQUEyQjtRQUNqRCxNQUFNLEdBQUcsR0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBRWxDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsaUNBQWlDO0lBQ3pCLFdBQVcsQ0FBQyxPQUFnQjtRQUNsQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQ2YsT0FBTyxDQUFDLGdCQUFnQixDQUN0QiwyQ0FBMkMsdUJBQXVCLEtBQUs7WUFDckUsMkNBQTJDLHVCQUF1QixJQUFJLENBQ3pFLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxZQUFZLENBQUMsT0FBMkI7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztZQUN4RixJQUFJLENBQUMsa0JBQWtCLENBQ3hCLENBQUM7SUFDSixDQUFDOzt5SEEvRFUscUJBQXFCOzZIQUFyQixxQkFBcUI7a0dBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge2luamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1RhYmxlT2ZDb250ZW50c0l0ZW0sIFRhYmxlT2ZDb250ZW50c0xldmVsfSBmcm9tICcuLi9pbnRlcmZhY2VzL2luZGV4JztcblxuLyoqXG4gKiBOYW1lIG9mIGFuIGF0dHJpYnV0ZSB0aGF0IGlzIHNldCBvbiBhbiBlbGVtZW50IHRoYXQgc2hvdWxkIGJlXG4gKiBleGNsdWRlZCBmcm9tIHRoZSBgVGFibGVPZkNvbnRlbnRzTG9hZGVyYCBsb29rdXAuIFRoaXMgaXMgbmVlZGVkXG4gKiB0byBleGVtcHQgU1NSJ2VkIGNvbnRlbnQgb2YgdGhlIGBUYWJsZU9mQ29udGVudHNgIGNvbXBvbmVudCBmcm9tXG4gKiBiZWluZyBpbnNwZWN0ZWQgYW5kIGFjY2lkZW50YWxseSBwdWxsaW5nIG1vcmUgY29udGVudCBpbnRvIFRvQy5cbiAqL1xuZXhwb3J0IGNvbnN0IFRPQ19TS0lQX0NPTlRFTlRfTUFSS0VSID0gJ3RvYy1za2lwLWNvbnRlbnQnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGFibGVPZkNvbnRlbnRzTG9hZGVyIHtcbiAgLy8gVGhlcmUgYXJlIHNvbWUgY2FzZXMgd2hlbiBkZWZhdWx0IGJyb3dzZXIgYW5jaG9yIHNjcm9sbHMgYSBsaXR0bGUgYWJvdmUgdGhlXG4gIC8vIGhlYWRpbmcgSW4gdGhhdCBjYXNlcyB3cm9uZyBpdGVtIHdhcyBzZWxlY3RlZC4gVGhlIHZhbHVlIGZvdW5kIGJ5IHRyaWFsIGFuZFxuICAvLyBlcnJvci5cbiAgcmVhZG9ubHkgdG9sZXJhbmNlVGhyZXNob2xkID0gNDA7XG5cbiAgdGFibGVPZkNvbnRlbnRJdGVtczogVGFibGVPZkNvbnRlbnRzSXRlbVtdID0gW107XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZCA9IGluamVjdChQTEFURk9STV9JRCk7XG5cbiAgYnVpbGRUYWJsZU9mQ29udGVudChkb2NFbGVtZW50OiBFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLmdldEhlYWRpbmdzKGRvY0VsZW1lbnQpO1xuICAgIGNvbnN0IHRvY0xpc3Q6IFRhYmxlT2ZDb250ZW50c0l0ZW1bXSA9IGhlYWRpbmdzLm1hcCgoaGVhZGluZykgPT4gKHtcbiAgICAgIGlkOiBoZWFkaW5nLmlkLFxuICAgICAgbGV2ZWw6IGhlYWRpbmcudGFnTmFtZS50b0xvd2VyQ2FzZSgpIGFzIFRhYmxlT2ZDb250ZW50c0xldmVsLFxuICAgICAgdGl0bGU6IHRoaXMuZ2V0SGVhZGluZ1RpdGxlKGhlYWRpbmcpLFxuICAgICAgdG9wOiB0aGlzLmNhbGN1bGF0ZVRvcChoZWFkaW5nKSxcbiAgICB9KSk7XG5cbiAgICB0aGlzLnRhYmxlT2ZDb250ZW50SXRlbXMgPSB0b2NMaXN0O1xuICB9XG5cbiAgLy8gVXBkYXRlIHRvcCB2YWx1ZSBvZiBoZWFkaW5nLCBpdCBzaG91bGQgYmUgZXhlY3V0ZWQgYWZ0ZXIgd2luZG93IHJlc2l6ZVxuICB1cGRhdGVIZWFkaW5nc1RvcFZhbHVlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgaGVhZGluZ3MgPSB0aGlzLmdldEhlYWRpbmdzKGVsZW1lbnQpO1xuICAgIGNvbnN0IHVwZGF0ZWRUb3BWYWx1ZXMgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG4gICAgZm9yIChjb25zdCBoZWFkaW5nIG9mIGhlYWRpbmdzKSB7XG4gICAgICBjb25zdCBwYXJlbnRUb3AgPSBoZWFkaW5nLnBhcmVudEVsZW1lbnQ/Lm9mZnNldFRvcCA/PyAwO1xuICAgICAgY29uc3QgdG9wID0gTWF0aC5mbG9vcihwYXJlbnRUb3AgKyBoZWFkaW5nLm9mZnNldFRvcCAtIHRoaXMudG9sZXJhbmNlVGhyZXNob2xkKTtcbiAgICAgIHVwZGF0ZWRUb3BWYWx1ZXMuc2V0KGhlYWRpbmcuaWQsIHRvcCk7XG4gICAgfVxuXG4gICAgdGhpcy50YWJsZU9mQ29udGVudEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0udG9wID0gdXBkYXRlZFRvcFZhbHVlcy5nZXQoaXRlbS5pZCkgPz8gMDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SGVhZGluZ1RpdGxlKGhlYWRpbmc6IEhUTUxIZWFkaW5nRWxlbWVudCk6IHN0cmluZyB7XG4gICAgY29uc3QgZGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9IGhlYWRpbmcuaW5uZXJIVE1MO1xuXG4gICAgcmV0dXJuIChkaXYudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgfVxuXG4gIC8vIEdldCBhbGwgaGVhZGluZ3MgKGgyIGFuZCBoMykgd2l0aCBpZHMsIHdoaWNoIGFyZSBub3QgY2hpbGRyZW4gb2YgdGhlXG4gIC8vIGRvY3MtZXhhbXBsZS12aWV3ZXIgY29tcG9uZW50LlxuICBwcml2YXRlIGdldEhlYWRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQpOiBIVE1MSGVhZGluZ0VsZW1lbnRbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oXG4gICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEhlYWRpbmdFbGVtZW50PihcbiAgICAgICAgYGgyW2lkXTpub3QoZG9jcy1leGFtcGxlLXZpZXdlciBoMik6bm90KFske1RPQ19TS0lQX0NPTlRFTlRfTUFSS0VSfV0pLGAgK1xuICAgICAgICAgIGBoM1tpZF06bm90KGRvY3MtZXhhbXBsZS12aWV3ZXIgaDMpOm5vdChbJHtUT0NfU0tJUF9DT05URU5UX01BUktFUn1dKWAsXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZVRvcChoZWFkaW5nOiBIVE1MSGVhZGluZ0VsZW1lbnQpOiBudW1iZXIge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIChcbiAgICAgIE1hdGguZmxvb3IoaGVhZGluZy5vZmZzZXRUb3AgPiAwID8gaGVhZGluZy5vZmZzZXRUb3AgOiBoZWFkaW5nLmdldENsaWVudFJlY3RzKClbMF0/LnRvcCkgLVxuICAgICAgdGhpcy50b2xlcmFuY2VUaHJlc2hvbGRcbiAgICApO1xuICB9XG59XG4iXX0=