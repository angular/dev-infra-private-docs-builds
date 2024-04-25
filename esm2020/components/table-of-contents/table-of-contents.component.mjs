/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { NgFor, NgIf } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableOfContentsLevel } from '../../interfaces/index';
import { TableOfContentsLoader } from '../../services/table-of-contents-loader.service';
import { TableOfContentsScrollSpy } from '../../services/table-of-contents-scroll-spy.service';
import { IconComponent } from '../icon/icon.component';
import * as i0 from "@angular/core";
export class TableOfContents {
    constructor() {
        this.scrollSpy = inject(TableOfContentsScrollSpy);
        this.tableOfContentsLoader = inject(TableOfContentsLoader);
        this.activeItemId = this.scrollSpy.activeItemId;
        this.shouldDisplayScrollToTop = computed(() => !this.scrollSpy.scrollbarThumbOnTop());
        this.TableOfContentsLevel = TableOfContentsLevel;
    }
    tableOfContentItems() {
        return this.tableOfContentsLoader.tableOfContentItems;
    }
    ngAfterViewInit() {
        this.tableOfContentsLoader.buildTableOfContent(this.contentSourceElement);
        this.scrollSpy.startListeningToScroll(this.contentSourceElement);
    }
    scrollToTop() {
        this.scrollSpy.scrollToTop();
    }
}
TableOfContents.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: TableOfContents, deps: [], target: i0.ɵɵFactoryTarget.Component });
TableOfContents.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.0-next.6", type: TableOfContents, isStandalone: true, selector: "docs-table-of-contents", inputs: { contentSourceElement: "contentSourceElement" }, providers: [TableOfContentsLoader, TableOfContentsScrollSpy], ngImport: i0, template: "<aside>\n  <nav>\n    <header>\n      <h2 class=\"docs-title\">On this page</h2>\n    </header>\n    <ul class=\"docs-faceted-list\">\n      <!-- TODO: Hide li elements with class docs-toc-item-h3 for laptop, table and phone screen resolutions  -->\n      @for (item of tableOfContentItems(); track item.id) {\n      <li\n        class=\"docs-faceted-list-item\"\n        [class.docs-toc-item-h2]=\"item.level === TableOfContentsLevel.H2\"\n        [class.docs-toc-item-h3]=\"item.level === TableOfContentsLevel.H3\"\n      >\n        <a\n          routerLink=\".\"\n          [fragment]=\"item.id\"\n          [class.docs-faceted-list-item-active]=\"item.id === activeItemId()\"\n        >\n          {{ item.title }}\n        </a>\n      </li>\n      }\n    </ul>\n  </nav>\n  @if (shouldDisplayScrollToTop()) {\n  <button type=\"button\" (click)=\"scrollToTop()\">\n    <docs-icon role=\"presentation\">arrow_upward_alt</docs-icon>\n    Back to the top\n  </button>\n  }\n</aside>\n", styles: [":host{display:flex;flex-direction:column;position:fixed;right:16px;top:0;height:fit-content;width:14rem;padding-inline:1rem;max-height:100vh;overflow-y:scroll}:host aside{margin-bottom:2rem}:host :has(ul li:only-child){display:none}@media only screen and (max-width: 1430px){:host{position:relative;right:0;max-height:min-content;width:100%}}:host .docs-title{font-size:1.25rem;margin-block-start:var(--layout-padding)}:host::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}:host::-webkit-scrollbar{width:6px;height:6px}:host::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}:host::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}:host .docs-faceted-list-item{font-size:.875rem}:host .docs-faceted-list-item a{display:block;padding:.5rem .5rem .5rem 1rem;font-weight:500}:host .docs-faceted-list-item.docs-toc-item-h3 a{padding-inline-start:2rem}button{background:rgba(0,0,0,0);border:none;font-size:.875rem;font-family:var(--inter-font);display:flex;align-items:center;margin:.5rem 0;color:var(--tertiary-contrast);transition:color .3s ease;cursor:pointer}button docs-icon{margin-inline-end:.35rem;opacity:.6;transition:opacity .3s ease}button:hover docs-icon{opacity:1}@media only screen and (max-width: 1430px){button{display:none}}/*# sourceMappingURL=table-of-contents.component.css.map */\n"], dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: IconComponent, selector: "docs-icon" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: TableOfContents, decorators: [{
            type: Component,
            args: [{ selector: 'docs-table-of-contents', standalone: true, providers: [TableOfContentsLoader, TableOfContentsScrollSpy], imports: [NgIf, NgFor, RouterLink, IconComponent], template: "<aside>\n  <nav>\n    <header>\n      <h2 class=\"docs-title\">On this page</h2>\n    </header>\n    <ul class=\"docs-faceted-list\">\n      <!-- TODO: Hide li elements with class docs-toc-item-h3 for laptop, table and phone screen resolutions  -->\n      @for (item of tableOfContentItems(); track item.id) {\n      <li\n        class=\"docs-faceted-list-item\"\n        [class.docs-toc-item-h2]=\"item.level === TableOfContentsLevel.H2\"\n        [class.docs-toc-item-h3]=\"item.level === TableOfContentsLevel.H3\"\n      >\n        <a\n          routerLink=\".\"\n          [fragment]=\"item.id\"\n          [class.docs-faceted-list-item-active]=\"item.id === activeItemId()\"\n        >\n          {{ item.title }}\n        </a>\n      </li>\n      }\n    </ul>\n  </nav>\n  @if (shouldDisplayScrollToTop()) {\n  <button type=\"button\" (click)=\"scrollToTop()\">\n    <docs-icon role=\"presentation\">arrow_upward_alt</docs-icon>\n    Back to the top\n  </button>\n  }\n</aside>\n", styles: [":host{display:flex;flex-direction:column;position:fixed;right:16px;top:0;height:fit-content;width:14rem;padding-inline:1rem;max-height:100vh;overflow-y:scroll}:host aside{margin-bottom:2rem}:host :has(ul li:only-child){display:none}@media only screen and (max-width: 1430px){:host{position:relative;right:0;max-height:min-content;width:100%}}:host .docs-title{font-size:1.25rem;margin-block-start:var(--layout-padding)}:host::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}:host::-webkit-scrollbar{width:6px;height:6px}:host::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}:host::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}:host .docs-faceted-list-item{font-size:.875rem}:host .docs-faceted-list-item a{display:block;padding:.5rem .5rem .5rem 1rem;font-weight:500}:host .docs-faceted-list-item.docs-toc-item-h3 a{padding-inline-start:2rem}button{background:rgba(0,0,0,0);border:none;font-size:.875rem;font-family:var(--inter-font);display:flex;align-items:center;margin:.5rem 0;color:var(--tertiary-contrast);transition:color .3s ease;cursor:pointer}button docs-icon{margin-inline-end:.35rem;opacity:.6;transition:opacity .3s ease}button:hover docs-icon{opacity:1}@media only screen and (max-width: 1430px){button{display:none}}/*# sourceMappingURL=table-of-contents.component.css.map */\n"] }]
        }], propDecorators: { contentSourceElement: [{
                type: Input,
                args: [{ required: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL3RhYmxlLW9mLWNvbnRlbnRzL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy90YWJsZS1vZi1jb250ZW50cy90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQzdGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7QUFVckQsTUFBTSxPQUFPLGVBQWU7SUFSNUI7UUFZbUIsY0FBUyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzdDLDBCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRXZFLGlCQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7UUFDM0MsNkJBQXdCLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFDakYseUJBQW9CLEdBQUcsb0JBQW9CLENBQUM7S0FjN0M7SUFaQyxtQkFBbUI7UUFDakIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUM7SUFDeEQsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7bUhBdEJVLGVBQWU7dUdBQWYsZUFBZSwrSEFMZixDQUFDLHFCQUFxQixFQUFFLHdCQUF3QixDQUFDLDBCQ25COUQsMjlCQStCQSw0N0NEVHlCLFVBQVUsb09BQUUsYUFBYTtrR0FFckMsZUFBZTtrQkFSM0IsU0FBUzsrQkFDRSx3QkFBd0IsY0FDdEIsSUFBSSxhQUNMLENBQUMscUJBQXFCLEVBQUUsd0JBQXdCLENBQUMsV0FHbkQsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7OEJBSXhCLG9CQUFvQjtzQkFBNUMsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7TmdGb3IsIE5nSWZ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIGNvbXB1dGVkLCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtUYWJsZU9mQ29udGVudHNMZXZlbH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbmRleCc7XG5pbXBvcnQge1RhYmxlT2ZDb250ZW50c0xvYWRlcn0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGFibGUtb2YtY29udGVudHMtbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHtUYWJsZU9mQ29udGVudHNTY3JvbGxTcHl9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RhYmxlLW9mLWNvbnRlbnRzLXNjcm9sbC1zcHkuc2VydmljZSc7XG5pbXBvcnQge0ljb25Db21wb25lbnR9IGZyb20gJy4uL2ljb24vaWNvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLXRhYmxlLW9mLWNvbnRlbnRzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgcHJvdmlkZXJzOiBbVGFibGVPZkNvbnRlbnRzTG9hZGVyLCBUYWJsZU9mQ29udGVudHNTY3JvbGxTcHldLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtb2YtY29udGVudHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQuc2NzcyddLFxuICBpbXBvcnRzOiBbTmdJZiwgTmdGb3IsIFJvdXRlckxpbmssIEljb25Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZU9mQ29udGVudHMge1xuICAvLyBFbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIGNvbnRlbnQgZnJvbSB3aGljaCB0aGUgVGFibGUgb2YgQ29udGVudHMgaXMgYnVpbHRcbiAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIGNvbnRlbnRTb3VyY2VFbGVtZW50ITogSFRNTEVsZW1lbnQ7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzY3JvbGxTcHkgPSBpbmplY3QoVGFibGVPZkNvbnRlbnRzU2Nyb2xsU3B5KTtcbiAgcHJpdmF0ZSByZWFkb25seSB0YWJsZU9mQ29udGVudHNMb2FkZXIgPSBpbmplY3QoVGFibGVPZkNvbnRlbnRzTG9hZGVyKTtcblxuICBhY3RpdmVJdGVtSWQgPSB0aGlzLnNjcm9sbFNweS5hY3RpdmVJdGVtSWQ7XG4gIHNob3VsZERpc3BsYXlTY3JvbGxUb1RvcCA9IGNvbXB1dGVkKCgpID0+ICF0aGlzLnNjcm9sbFNweS5zY3JvbGxiYXJUaHVtYk9uVG9wKCkpO1xuICBUYWJsZU9mQ29udGVudHNMZXZlbCA9IFRhYmxlT2ZDb250ZW50c0xldmVsO1xuXG4gIHRhYmxlT2ZDb250ZW50SXRlbXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVPZkNvbnRlbnRzTG9hZGVyLnRhYmxlT2ZDb250ZW50SXRlbXM7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy50YWJsZU9mQ29udGVudHNMb2FkZXIuYnVpbGRUYWJsZU9mQ29udGVudCh0aGlzLmNvbnRlbnRTb3VyY2VFbGVtZW50KTtcbiAgICB0aGlzLnNjcm9sbFNweS5zdGFydExpc3RlbmluZ1RvU2Nyb2xsKHRoaXMuY29udGVudFNvdXJjZUVsZW1lbnQpO1xuICB9XG5cbiAgc2Nyb2xsVG9Ub3AoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxTcHkuc2Nyb2xsVG9Ub3AoKTtcbiAgfVxufVxuIiwiPGFzaWRlPlxuICA8bmF2PlxuICAgIDxoZWFkZXI+XG4gICAgICA8aDIgY2xhc3M9XCJkb2NzLXRpdGxlXCI+T24gdGhpcyBwYWdlPC9oMj5cbiAgICA8L2hlYWRlcj5cbiAgICA8dWwgY2xhc3M9XCJkb2NzLWZhY2V0ZWQtbGlzdFwiPlxuICAgICAgPCEtLSBUT0RPOiBIaWRlIGxpIGVsZW1lbnRzIHdpdGggY2xhc3MgZG9jcy10b2MtaXRlbS1oMyBmb3IgbGFwdG9wLCB0YWJsZSBhbmQgcGhvbmUgc2NyZWVuIHJlc29sdXRpb25zICAtLT5cbiAgICAgIEBmb3IgKGl0ZW0gb2YgdGFibGVPZkNvbnRlbnRJdGVtcygpOyB0cmFjayBpdGVtLmlkKSB7XG4gICAgICA8bGlcbiAgICAgICAgY2xhc3M9XCJkb2NzLWZhY2V0ZWQtbGlzdC1pdGVtXCJcbiAgICAgICAgW2NsYXNzLmRvY3MtdG9jLWl0ZW0taDJdPVwiaXRlbS5sZXZlbCA9PT0gVGFibGVPZkNvbnRlbnRzTGV2ZWwuSDJcIlxuICAgICAgICBbY2xhc3MuZG9jcy10b2MtaXRlbS1oM109XCJpdGVtLmxldmVsID09PSBUYWJsZU9mQ29udGVudHNMZXZlbC5IM1wiXG4gICAgICA+XG4gICAgICAgIDxhXG4gICAgICAgICAgcm91dGVyTGluaz1cIi5cIlxuICAgICAgICAgIFtmcmFnbWVudF09XCJpdGVtLmlkXCJcbiAgICAgICAgICBbY2xhc3MuZG9jcy1mYWNldGVkLWxpc3QtaXRlbS1hY3RpdmVdPVwiaXRlbS5pZCA9PT0gYWN0aXZlSXRlbUlkKClcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgaXRlbS50aXRsZSB9fVxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgICAgfVxuICAgIDwvdWw+XG4gIDwvbmF2PlxuICBAaWYgKHNob3VsZERpc3BsYXlTY3JvbGxUb1RvcCgpKSB7XG4gIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJzY3JvbGxUb1RvcCgpXCI+XG4gICAgPGRvY3MtaWNvbiByb2xlPVwicHJlc2VudGF0aW9uXCI+YXJyb3dfdXB3YXJkX2FsdDwvZG9jcy1pY29uPlxuICAgIEJhY2sgdG8gdGhlIHRvcFxuICA8L2J1dHRvbj5cbiAgfVxuPC9hc2lkZT5cbiJdfQ==