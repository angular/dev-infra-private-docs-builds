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
import { TableOfContentsLevel } from '../../interfaces/index.js';
import { TableOfContentsLoader } from '../../services/table-of-contents-loader.service.js';
import { TableOfContentsScrollSpy } from '../../services/table-of-contents-scroll-spy.service.js';
import { IconComponent } from '../icon/icon.component.js';
import * as i0 from "@angular/core";
const _forTrack0 = ($index, $item) => $item.id;
function TableOfContents_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 3)(1, "a", 4);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("docs-toc-item-h2", item_r2.level === ctx_r0.TableOfContentsLevel.H2)("docs-toc-item-h3", item_r2.level === ctx_r0.TableOfContentsLevel.H3);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("adev-faceted-list-item-active", item_r2.id === ctx_r0.activeItemId());
    i0.ɵɵproperty("fragment", item_r2.id);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", item_r2.title, " ");
} }
function TableOfContents_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function TableOfContents_Conditional_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.scrollToTop()); });
    i0.ɵɵelementStart(1, "docs-icon", 6);
    i0.ɵɵtext(2, "arrow_upward_alt");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " Back to the top ");
    i0.ɵɵelementEnd();
} }
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
TableOfContents.ɵfac = function TableOfContents_Factory(t) { return new (t || TableOfContents)(); };
TableOfContents.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TableOfContents, selectors: [["docs-table-of-contents"]], inputs: { contentSourceElement: "contentSourceElement" }, standalone: true, features: [i0.ɵɵProvidersFeature([TableOfContentsLoader, TableOfContentsScrollSpy]), i0.ɵɵStandaloneFeature], decls: 9, vars: 1, consts: [[1, "docs-title"], [1, "adev-faceted-list"], ["type", "button"], [1, "adev-faceted-list-item"], ["routerLink", ".", 3, "fragment"], ["type", "button", 3, "click"], ["role", "presentation"], ["class", "adev-faceted-list-item", 3, "docs-toc-item-h2", "docs-toc-item-h3"]], template: function TableOfContents_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "aside")(1, "nav")(2, "header")(3, "h2", 0);
        i0.ɵɵtext(4, "On this page");
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(5, "ul", 1);
        i0.ɵɵrepeaterCreate(6, TableOfContents_For_7_Template, 3, 8, "li", 7, _forTrack0);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(8, TableOfContents_Conditional_8_Template, 4, 0, "button", 2);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(6);
        i0.ɵɵrepeater(ctx.tableOfContentItems());
        i0.ɵɵadvance(2);
        i0.ɵɵconditional(8, ctx.shouldDisplayScrollToTop() ? 8 : -1);
    } }, dependencies: [RouterLink, IconComponent], styles: ["[_nghost-%COMP%]{display:flex;flex-direction:column;position:fixed;right:16px;top:0;height:fit-content;width:14rem;padding-inline:1rem;max-height:100vh;overflow-y:scroll}[_nghost-%COMP%]   aside[_ngcontent-%COMP%]{margin-bottom:2rem}@media only screen and (max-width: 1430px){[_nghost-%COMP%]{position:relative;right:0;max-height:min-content;width:100%}}[_nghost-%COMP%]   .docs-title[_ngcontent-%COMP%]{font-size:1.25rem;margin-block-start:var(--layout-padding)}[_nghost-%COMP%]::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}[_nghost-%COMP%]::-webkit-scrollbar{width:6px;height:6px}[_nghost-%COMP%]::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}[_nghost-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}[_nghost-%COMP%]   .adev-faceted-list-item[_ngcontent-%COMP%]{font-size:.875rem}[_nghost-%COMP%]   .adev-faceted-list-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;padding:.5rem .5rem .5rem 1rem;font-weight:500}[_nghost-%COMP%]   .adev-faceted-list-item.docs-toc-item-h3[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{padding-inline-start:2rem}button[_ngcontent-%COMP%]{background:rgba(0,0,0,0);border:none;font-size:.875rem;font-family:var(--inter-font);display:flex;align-items:center;margin:.5rem 0;color:var(--tertiary-contrast);transition:color .3s ease;cursor:pointer}button[_ngcontent-%COMP%]   docs-icon[_ngcontent-%COMP%]{margin-inline-end:.35rem;opacity:.6;transition:opacity .3s ease}button[_ngcontent-%COMP%]:hover   docs-icon[_ngcontent-%COMP%]{opacity:1}@media only screen and (max-width: 1430px){button[_ngcontent-%COMP%]{display:none}}/*# sourceMappingURL=table-of-contents.component.css.map */"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TableOfContents, [{
        type: Component,
        args: [{ selector: 'docs-table-of-contents', standalone: true, providers: [TableOfContentsLoader, TableOfContentsScrollSpy], imports: [NgIf, NgFor, RouterLink, IconComponent], template: "<aside>\n  <nav>\n    <header>\n      <h2 class=\"docs-title\">On this page</h2>\n    </header>\n    <ul class=\"adev-faceted-list\">\n      <!-- TODO: Hide li elements with class docs-toc-item-h3 for laptop, table and phone screen resolutions  -->\n      @for (item of tableOfContentItems(); track item.id) {\n      <li\n        class=\"adev-faceted-list-item\"\n        [class.docs-toc-item-h2]=\"item.level === TableOfContentsLevel.H2\"\n        [class.docs-toc-item-h3]=\"item.level === TableOfContentsLevel.H3\"\n      >\n        <a\n          routerLink=\".\"\n          [fragment]=\"item.id\"\n          [class.adev-faceted-list-item-active]=\"item.id === activeItemId()\"\n        >\n          {{ item.title }}\n        </a>\n      </li>\n      }\n    </ul>\n  </nav>\n  @if (shouldDisplayScrollToTop()) {\n  <button type=\"button\" (click)=\"scrollToTop()\">\n    <docs-icon role=\"presentation\">arrow_upward_alt</docs-icon>\n    Back to the top\n  </button>\n  }\n</aside>\n", styles: [":host{display:flex;flex-direction:column;position:fixed;right:16px;top:0;height:fit-content;width:14rem;padding-inline:1rem;max-height:100vh;overflow-y:scroll}:host aside{margin-bottom:2rem}@media only screen and (max-width: 1430px){:host{position:relative;right:0;max-height:min-content;width:100%}}:host .docs-title{font-size:1.25rem;margin-block-start:var(--layout-padding)}:host::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}:host::-webkit-scrollbar{width:6px;height:6px}:host::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}:host::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}:host .adev-faceted-list-item{font-size:.875rem}:host .adev-faceted-list-item a{display:block;padding:.5rem .5rem .5rem 1rem;font-weight:500}:host .adev-faceted-list-item.docs-toc-item-h3 a{padding-inline-start:2rem}button{background:rgba(0,0,0,0);border:none;font-size:.875rem;font-family:var(--inter-font);display:flex;align-items:center;margin:.5rem 0;color:var(--tertiary-contrast);transition:color .3s ease;cursor:pointer}button docs-icon{margin-inline-end:.35rem;opacity:.6;transition:opacity .3s ease}button:hover docs-icon{opacity:1}@media only screen and (max-width: 1430px){button{display:none}}/*# sourceMappingURL=table-of-contents.component.css.map */\n"] }]
    }], null, { contentSourceElement: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TableOfContents, { className: "TableOfContents", filePath: "docs/components/table-of-contents/table-of-contents.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL3RhYmxlLW9mLWNvbnRlbnRzL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy90YWJsZS1vZi1jb250ZW50cy90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQzs7OztJQ05sRCw2QkFJQyxXQUFBO0lBTUcsWUFDRjtJQUFBLGlCQUFJLEVBQUE7Ozs7SUFUSixvRkFBaUUsc0VBQUE7SUFNL0QsZUFBa0U7SUFBbEUscUZBQWtFO0lBRGxFLHFDQUFvQjtJQUdwQixlQUNGO0lBREUsOENBQ0Y7Ozs7SUFNTixpQ0FBOEM7SUFBeEIsb0tBQVMsZUFBQSxvQkFBYSxDQUFBLElBQUM7SUFDM0Msb0NBQStCO0lBQUEsZ0NBQWdCO0lBQUEsaUJBQVk7SUFDM0QsaUNBQ0Y7SUFBQSxpQkFBUzs7QURKWCxNQUFNLE9BQU8sZUFBZTtJQVI1QjtRQVltQixjQUFTLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDN0MsMEJBQXFCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFdkUsaUJBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztRQUMzQyw2QkFBd0IsR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUNqRix5QkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztLQWM3QztJQVpDLG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQztJQUN4RCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs4RUF0QlUsZUFBZTtrRUFBZixlQUFlLHdKQUxmLENBQUMscUJBQXFCLEVBQUUsd0JBQXdCLENBQUM7UUNuQjlELDZCQUFPLFVBQUEsYUFBQSxZQUFBO1FBR3NCLDRCQUFZO1FBQUEsaUJBQUssRUFBQTtRQUUxQyw2QkFBOEI7UUFFNUIsaUZBY0M7UUFDSCxpQkFBSyxFQUFBO1FBRVAsMkVBS0M7UUFDSCxpQkFBUTs7UUF2QkYsZUFjQztRQWRELHdDQWNDO1FBR0wsZUFLQztRQUxELDREQUtDO3dCRFBzQixVQUFVLEVBQUUsYUFBYTtpRkFFckMsZUFBZTtjQVIzQixTQUFTOzJCQUNFLHdCQUF3QixjQUN0QixJQUFJLGFBQ0wsQ0FBQyxxQkFBcUIsRUFBRSx3QkFBd0IsQ0FBQyxXQUduRCxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQztnQkFJeEIsb0JBQW9CO2tCQUE1QyxLQUFLO21CQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQzs7a0ZBRlosZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ0ZvciwgTmdJZn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgY29tcHV0ZWQsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlckxpbmt9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1RhYmxlT2ZDb250ZW50c0xldmVsfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2luZGV4LmpzJztcbmltcG9ydCB7VGFibGVPZkNvbnRlbnRzTG9hZGVyfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90YWJsZS1vZi1jb250ZW50cy1sb2FkZXIuc2VydmljZS5qcyc7XG5pbXBvcnQge1RhYmxlT2ZDb250ZW50c1Njcm9sbFNweX0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGFibGUtb2YtY29udGVudHMtc2Nyb2xsLXNweS5zZXJ2aWNlLmpzJztcbmltcG9ydCB7SWNvbkNvbXBvbmVudH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudC5qcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3MtdGFibGUtb2YtY29udGVudHMnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBwcm92aWRlcnM6IFtUYWJsZU9mQ29udGVudHNMb2FkZXIsIFRhYmxlT2ZDb250ZW50c1Njcm9sbFNweV0sXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudC5zY3NzJ10sXG4gIGltcG9ydHM6IFtOZ0lmLCBOZ0ZvciwgUm91dGVyTGluaywgSWNvbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlT2ZDb250ZW50cyB7XG4gIC8vIEVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgY29udGVudCBmcm9tIHdoaWNoIHRoZSBUYWJsZSBvZiBDb250ZW50cyBpcyBidWlsdFxuICBASW5wdXQoe3JlcXVpcmVkOiB0cnVlfSkgY29udGVudFNvdXJjZUVsZW1lbnQhOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHNjcm9sbFNweSA9IGluamVjdChUYWJsZU9mQ29udGVudHNTY3JvbGxTcHkpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRhYmxlT2ZDb250ZW50c0xvYWRlciA9IGluamVjdChUYWJsZU9mQ29udGVudHNMb2FkZXIpO1xuXG4gIGFjdGl2ZUl0ZW1JZCA9IHRoaXMuc2Nyb2xsU3B5LmFjdGl2ZUl0ZW1JZDtcbiAgc2hvdWxkRGlzcGxheVNjcm9sbFRvVG9wID0gY29tcHV0ZWQoKCkgPT4gIXRoaXMuc2Nyb2xsU3B5LnNjcm9sbGJhclRodW1iT25Ub3AoKSk7XG4gIFRhYmxlT2ZDb250ZW50c0xldmVsID0gVGFibGVPZkNvbnRlbnRzTGV2ZWw7XG5cbiAgdGFibGVPZkNvbnRlbnRJdGVtcygpIHtcbiAgICByZXR1cm4gdGhpcy50YWJsZU9mQ29udGVudHNMb2FkZXIudGFibGVPZkNvbnRlbnRJdGVtcztcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnRhYmxlT2ZDb250ZW50c0xvYWRlci5idWlsZFRhYmxlT2ZDb250ZW50KHRoaXMuY29udGVudFNvdXJjZUVsZW1lbnQpO1xuICAgIHRoaXMuc2Nyb2xsU3B5LnN0YXJ0TGlzdGVuaW5nVG9TY3JvbGwodGhpcy5jb250ZW50U291cmNlRWxlbWVudCk7XG4gIH1cblxuICBzY3JvbGxUb1RvcCgpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbFNweS5zY3JvbGxUb1RvcCgpO1xuICB9XG59XG4iLCI8YXNpZGU+XG4gIDxuYXY+XG4gICAgPGhlYWRlcj5cbiAgICAgIDxoMiBjbGFzcz1cImRvY3MtdGl0bGVcIj5PbiB0aGlzIHBhZ2U8L2gyPlxuICAgIDwvaGVhZGVyPlxuICAgIDx1bCBjbGFzcz1cImFkZXYtZmFjZXRlZC1saXN0XCI+XG4gICAgICA8IS0tIFRPRE86IEhpZGUgbGkgZWxlbWVudHMgd2l0aCBjbGFzcyBkb2NzLXRvYy1pdGVtLWgzIGZvciBsYXB0b3AsIHRhYmxlIGFuZCBwaG9uZSBzY3JlZW4gcmVzb2x1dGlvbnMgIC0tPlxuICAgICAgQGZvciAoaXRlbSBvZiB0YWJsZU9mQ29udGVudEl0ZW1zKCk7IHRyYWNrIGl0ZW0uaWQpIHtcbiAgICAgIDxsaVxuICAgICAgICBjbGFzcz1cImFkZXYtZmFjZXRlZC1saXN0LWl0ZW1cIlxuICAgICAgICBbY2xhc3MuZG9jcy10b2MtaXRlbS1oMl09XCJpdGVtLmxldmVsID09PSBUYWJsZU9mQ29udGVudHNMZXZlbC5IMlwiXG4gICAgICAgIFtjbGFzcy5kb2NzLXRvYy1pdGVtLWgzXT1cIml0ZW0ubGV2ZWwgPT09IFRhYmxlT2ZDb250ZW50c0xldmVsLkgzXCJcbiAgICAgID5cbiAgICAgICAgPGFcbiAgICAgICAgICByb3V0ZXJMaW5rPVwiLlwiXG4gICAgICAgICAgW2ZyYWdtZW50XT1cIml0ZW0uaWRcIlxuICAgICAgICAgIFtjbGFzcy5hZGV2LWZhY2V0ZWQtbGlzdC1pdGVtLWFjdGl2ZV09XCJpdGVtLmlkID09PSBhY3RpdmVJdGVtSWQoKVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBpdGVtLnRpdGxlIH19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgICB9XG4gICAgPC91bD5cbiAgPC9uYXY+XG4gIEBpZiAoc2hvdWxkRGlzcGxheVNjcm9sbFRvVG9wKCkpIHtcbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInNjcm9sbFRvVG9wKClcIj5cbiAgICA8ZG9jcy1pY29uIHJvbGU9XCJwcmVzZW50YXRpb25cIj5hcnJvd191cHdhcmRfYWx0PC9kb2NzLWljb24+XG4gICAgQmFjayB0byB0aGUgdG9wXG4gIDwvYnV0dG9uPlxuICB9XG48L2FzaWRlPlxuIl19