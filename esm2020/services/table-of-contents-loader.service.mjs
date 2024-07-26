/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, signal, Injectable, PLATFORM_ID } from '@angular/core';
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
        this.tableOfContentItems = signal([]);
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
        this.tableOfContentItems.set(tocList);
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
        this.tableOfContentItems.update((oldItems) => {
            let newItems = [...oldItems];
            for (const item of newItems) {
                item.top = updatedTopValues.get(item.id) ?? 0;
            }
            return newItems;
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
TableOfContentsLoader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: TableOfContentsLoader, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TableOfContentsLoader.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: TableOfContentsLoader, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: TableOfContentsLoader, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMtbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9kb2NzL3NlcnZpY2VzL3RhYmxlLW9mLWNvbnRlbnRzLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUl0RTs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLGtCQUFrQixDQUFDO0FBRzFELE1BQU0sT0FBTyxxQkFBcUI7SUFEbEM7UUFFRSw4RUFBOEU7UUFDOUUsOEVBQThFO1FBQzlFLFNBQVM7UUFDQSx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFFeEIsd0JBQW1CLEdBQUcsTUFBTSxDQUFDLEVBQTJCLENBQUMsQ0FBQztRQUVsRCxhQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLGVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7S0EyRG5EO0lBekRDLG1CQUFtQixDQUFDLFVBQW1CO1FBQ3JDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsTUFBTSxPQUFPLEdBQTBCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDaEUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ2QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUEwQjtZQUM1RCxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDcEMsR0FBRyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1NBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQseUVBQXlFO0lBQ3pFLHNCQUFzQixDQUFDLE9BQW9CO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUVuRCxLQUFLLE1BQU0sT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQy9CLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hGLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLEtBQUssTUFBTSxJQUFJLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEQsQ0FBQztZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGVBQWUsQ0FBQyxPQUEyQjtRQUNqRCxNQUFNLEdBQUcsR0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBRWxDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUsaUNBQWlDO0lBQ3pCLFdBQVcsQ0FBQyxPQUFnQjtRQUNsQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQ2YsT0FBTyxDQUFDLGdCQUFnQixDQUN0QiwyQ0FBMkMsdUJBQXVCLEtBQUs7WUFDckUsMkNBQTJDLHVCQUF1QixJQUFJLENBQ3pFLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTyxZQUFZLENBQUMsT0FBMkI7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRCxPQUFPLENBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztZQUN4RixJQUFJLENBQUMsa0JBQWtCLENBQ3hCLENBQUM7SUFDSixDQUFDOzt5SEFuRVUscUJBQXFCOzZIQUFyQixxQkFBcUIsY0FEVCxNQUFNO2tHQUNsQixxQkFBcUI7a0JBRGpDLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7aW5qZWN0LCBzaWduYWwsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtUYWJsZU9mQ29udGVudHNJdGVtLCBUYWJsZU9mQ29udGVudHNMZXZlbH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbmRleCc7XG5cbi8qKlxuICogTmFtZSBvZiBhbiBhdHRyaWJ1dGUgdGhhdCBpcyBzZXQgb24gYW4gZWxlbWVudCB0aGF0IHNob3VsZCBiZVxuICogZXhjbHVkZWQgZnJvbSB0aGUgYFRhYmxlT2ZDb250ZW50c0xvYWRlcmAgbG9va3VwLiBUaGlzIGlzIG5lZWRlZFxuICogdG8gZXhlbXB0IFNTUidlZCBjb250ZW50IG9mIHRoZSBgVGFibGVPZkNvbnRlbnRzYCBjb21wb25lbnQgZnJvbVxuICogYmVpbmcgaW5zcGVjdGVkIGFuZCBhY2NpZGVudGFsbHkgcHVsbGluZyBtb3JlIGNvbnRlbnQgaW50byBUb0MuXG4gKi9cbmV4cG9ydCBjb25zdCBUT0NfU0tJUF9DT05URU5UX01BUktFUiA9ICd0b2Mtc2tpcC1jb250ZW50JztcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgVGFibGVPZkNvbnRlbnRzTG9hZGVyIHtcbiAgLy8gVGhlcmUgYXJlIHNvbWUgY2FzZXMgd2hlbiBkZWZhdWx0IGJyb3dzZXIgYW5jaG9yIHNjcm9sbHMgYSBsaXR0bGUgYWJvdmUgdGhlXG4gIC8vIGhlYWRpbmcgSW4gdGhhdCBjYXNlcyB3cm9uZyBpdGVtIHdhcyBzZWxlY3RlZC4gVGhlIHZhbHVlIGZvdW5kIGJ5IHRyaWFsIGFuZFxuICAvLyBlcnJvci5cbiAgcmVhZG9ubHkgdG9sZXJhbmNlVGhyZXNob2xkID0gNDA7XG5cbiAgcmVhZG9ubHkgdGFibGVPZkNvbnRlbnRJdGVtcyA9IHNpZ25hbChbXSBhcyBUYWJsZU9mQ29udGVudHNJdGVtW10pO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZG9jdW1lbnQgPSBpbmplY3QoRE9DVU1FTlQpO1xuICBwcml2YXRlIHJlYWRvbmx5IHBsYXRmb3JtSWQgPSBpbmplY3QoUExBVEZPUk1fSUQpO1xuXG4gIGJ1aWxkVGFibGVPZkNvbnRlbnQoZG9jRWxlbWVudDogRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5nZXRIZWFkaW5ncyhkb2NFbGVtZW50KTtcbiAgICBjb25zdCB0b2NMaXN0OiBUYWJsZU9mQ29udGVudHNJdGVtW10gPSBoZWFkaW5ncy5tYXAoKGhlYWRpbmcpID0+ICh7XG4gICAgICBpZDogaGVhZGluZy5pZCxcbiAgICAgIGxldmVsOiBoZWFkaW5nLnRhZ05hbWUudG9Mb3dlckNhc2UoKSBhcyBUYWJsZU9mQ29udGVudHNMZXZlbCxcbiAgICAgIHRpdGxlOiB0aGlzLmdldEhlYWRpbmdUaXRsZShoZWFkaW5nKSxcbiAgICAgIHRvcDogdGhpcy5jYWxjdWxhdGVUb3AoaGVhZGluZyksXG4gICAgfSkpO1xuXG4gICAgdGhpcy50YWJsZU9mQ29udGVudEl0ZW1zLnNldCh0b2NMaXN0KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0b3AgdmFsdWUgb2YgaGVhZGluZywgaXQgc2hvdWxkIGJlIGV4ZWN1dGVkIGFmdGVyIHdpbmRvdyByZXNpemVcbiAgdXBkYXRlSGVhZGluZ3NUb3BWYWx1ZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGhlYWRpbmdzID0gdGhpcy5nZXRIZWFkaW5ncyhlbGVtZW50KTtcbiAgICBjb25zdCB1cGRhdGVkVG9wVmFsdWVzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuICAgIGZvciAoY29uc3QgaGVhZGluZyBvZiBoZWFkaW5ncykge1xuICAgICAgY29uc3QgcGFyZW50VG9wID0gaGVhZGluZy5wYXJlbnRFbGVtZW50Py5vZmZzZXRUb3AgPz8gMDtcbiAgICAgIGNvbnN0IHRvcCA9IE1hdGguZmxvb3IocGFyZW50VG9wICsgaGVhZGluZy5vZmZzZXRUb3AgLSB0aGlzLnRvbGVyYW5jZVRocmVzaG9sZCk7XG4gICAgICB1cGRhdGVkVG9wVmFsdWVzLnNldChoZWFkaW5nLmlkLCB0b3ApO1xuICAgIH1cblxuICAgIHRoaXMudGFibGVPZkNvbnRlbnRJdGVtcy51cGRhdGUoKG9sZEl0ZW1zKSA9PiB7XG4gICAgICBsZXQgbmV3SXRlbXMgPSBbLi4ub2xkSXRlbXNdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG5ld0l0ZW1zKSB7XG4gICAgICAgIGl0ZW0udG9wID0gdXBkYXRlZFRvcFZhbHVlcy5nZXQoaXRlbS5pZCkgPz8gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdJdGVtcztcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0SGVhZGluZ1RpdGxlKGhlYWRpbmc6IEhUTUxIZWFkaW5nRWxlbWVudCk6IHN0cmluZyB7XG4gICAgY29uc3QgZGl2OiBIVE1MRGl2RWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlubmVySFRNTCA9IGhlYWRpbmcuaW5uZXJIVE1MO1xuXG4gICAgcmV0dXJuIChkaXYudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgfVxuXG4gIC8vIEdldCBhbGwgaGVhZGluZ3MgKGgyIGFuZCBoMykgd2l0aCBpZHMsIHdoaWNoIGFyZSBub3QgY2hpbGRyZW4gb2YgdGhlXG4gIC8vIGRvY3MtZXhhbXBsZS12aWV3ZXIgY29tcG9uZW50LlxuICBwcml2YXRlIGdldEhlYWRpbmdzKGVsZW1lbnQ6IEVsZW1lbnQpOiBIVE1MSGVhZGluZ0VsZW1lbnRbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oXG4gICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEhlYWRpbmdFbGVtZW50PihcbiAgICAgICAgYGgyW2lkXTpub3QoZG9jcy1leGFtcGxlLXZpZXdlciBoMik6bm90KFske1RPQ19TS0lQX0NPTlRFTlRfTUFSS0VSfV0pLGAgK1xuICAgICAgICAgIGBoM1tpZF06bm90KGRvY3MtZXhhbXBsZS12aWV3ZXIgaDMpOm5vdChbJHtUT0NfU0tJUF9DT05URU5UX01BUktFUn1dKWAsXG4gICAgICApLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZVRvcChoZWFkaW5nOiBIVE1MSGVhZGluZ0VsZW1lbnQpOiBudW1iZXIge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIChcbiAgICAgIE1hdGguZmxvb3IoaGVhZGluZy5vZmZzZXRUb3AgPiAwID8gaGVhZGluZy5vZmZzZXRUb3AgOiBoZWFkaW5nLmdldENsaWVudFJlY3RzKClbMF0/LnRvcCkgLVxuICAgICAgdGhpcy50b2xlcmFuY2VUaHJlc2hvbGRcbiAgICApO1xuICB9XG59XG4iXX0=