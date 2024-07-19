/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
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
        this.tableOfContentItems = this.tableOfContentsLoader.tableOfContentItems;
        this.activeItemId = this.scrollSpy.activeItemId;
        this.shouldDisplayScrollToTop = computed(() => !this.scrollSpy.scrollbarThumbOnTop());
        this.TableOfContentsLevel = TableOfContentsLevel;
    }
    ngAfterViewInit() {
        this.tableOfContentsLoader.buildTableOfContent(this.contentSourceElement);
        this.scrollSpy.startListeningToScroll(this.contentSourceElement);
    }
    scrollToTop() {
        this.scrollSpy.scrollToTop();
    }
}
TableOfContents.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: TableOfContents, deps: [], target: i0.ɵɵFactoryTarget.Component });
TableOfContents.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0-next.1", type: TableOfContents, isStandalone: true, selector: "docs-table-of-contents", inputs: { contentSourceElement: "contentSourceElement" }, ngImport: i0, template: "<aside>\n  <nav>\n    <header>\n      <h2 class=\"docs-title\">On this page</h2>\n    </header>\n    <ul class=\"docs-faceted-list\">\n      <!-- TODO: Hide li elements with class docs-toc-item-h3 for laptop, table and phone screen resolutions  -->\n      @for (item of tableOfContentItems(); track item.id) {\n      <li\n        class=\"docs-faceted-list-item\"\n        [class.docs-toc-item-h2]=\"item.level === TableOfContentsLevel.H2\"\n        [class.docs-toc-item-h3]=\"item.level === TableOfContentsLevel.H3\"\n      >\n        <a\n          routerLink=\".\"\n          [fragment]=\"item.id\"\n          [class.docs-faceted-list-item-active]=\"item.id === activeItemId()\"\n        >\n          {{ item.title }}\n        </a>\n      </li>\n      }\n    </ul>\n  </nav>\n  @if (shouldDisplayScrollToTop()) {\n  <button type=\"button\" (click)=\"scrollToTop()\">\n    <docs-icon role=\"presentation\">arrow_upward_alt</docs-icon>\n    Back to the top\n  </button>\n  }\n</aside>\n", styles: [":host{display:flex;flex-direction:column;position:fixed;right:16px;top:0;height:fit-content;width:14rem;padding-inline:1rem;max-height:100vh;overflow-y:scroll}:host aside{margin-bottom:2rem}:host :has(ul li:only-child){display:none}@media only screen and (max-width: 1430px){:host{position:relative;right:0;max-height:min-content;width:100%}}:host .docs-title{font-size:1.25rem;margin-block-start:var(--layout-padding)}:host::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}:host::-webkit-scrollbar{width:6px;height:6px}:host::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}:host::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}:host .docs-faceted-list-item{font-size:.875rem}:host .docs-faceted-list-item a{display:block;padding:.5rem .5rem .5rem 1rem;font-weight:500}:host .docs-faceted-list-item.docs-toc-item-h3 a{padding-inline-start:2rem}button{background:rgba(0,0,0,0);border:none;font-size:.875rem;font-family:var(--inter-font);display:flex;align-items:center;margin:.5rem 0;color:var(--tertiary-contrast);transition:color .3s ease;cursor:pointer}button docs-icon{margin-inline-end:.35rem;opacity:.6;transition:opacity .3s ease}button:hover docs-icon{opacity:1}@media only screen and (max-width: 1430px){button{display:none}}/*# sourceMappingURL=table-of-contents.component.css.map */\n"], dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: IconComponent, selector: "docs-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: TableOfContents, decorators: [{
            type: Component,
            args: [{ selector: 'docs-table-of-contents', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf, NgFor, RouterLink, IconComponent], template: "<aside>\n  <nav>\n    <header>\n      <h2 class=\"docs-title\">On this page</h2>\n    </header>\n    <ul class=\"docs-faceted-list\">\n      <!-- TODO: Hide li elements with class docs-toc-item-h3 for laptop, table and phone screen resolutions  -->\n      @for (item of tableOfContentItems(); track item.id) {\n      <li\n        class=\"docs-faceted-list-item\"\n        [class.docs-toc-item-h2]=\"item.level === TableOfContentsLevel.H2\"\n        [class.docs-toc-item-h3]=\"item.level === TableOfContentsLevel.H3\"\n      >\n        <a\n          routerLink=\".\"\n          [fragment]=\"item.id\"\n          [class.docs-faceted-list-item-active]=\"item.id === activeItemId()\"\n        >\n          {{ item.title }}\n        </a>\n      </li>\n      }\n    </ul>\n  </nav>\n  @if (shouldDisplayScrollToTop()) {\n  <button type=\"button\" (click)=\"scrollToTop()\">\n    <docs-icon role=\"presentation\">arrow_upward_alt</docs-icon>\n    Back to the top\n  </button>\n  }\n</aside>\n", styles: [":host{display:flex;flex-direction:column;position:fixed;right:16px;top:0;height:fit-content;width:14rem;padding-inline:1rem;max-height:100vh;overflow-y:scroll}:host aside{margin-bottom:2rem}:host :has(ul li:only-child){display:none}@media only screen and (max-width: 1430px){:host{position:relative;right:0;max-height:min-content;width:100%}}:host .docs-title{font-size:1.25rem;margin-block-start:var(--layout-padding)}:host::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}:host::-webkit-scrollbar{width:6px;height:6px}:host::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}:host::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}:host .docs-faceted-list-item{font-size:.875rem}:host .docs-faceted-list-item a{display:block;padding:.5rem .5rem .5rem 1rem;font-weight:500}:host .docs-faceted-list-item.docs-toc-item-h3 a{padding-inline-start:2rem}button{background:rgba(0,0,0,0);border:none;font-size:.875rem;font-family:var(--inter-font);display:flex;align-items:center;margin:.5rem 0;color:var(--tertiary-contrast);transition:color .3s ease;cursor:pointer}button docs-icon{margin-inline-end:.35rem;opacity:.6;transition:opacity .3s ease}button:hover docs-icon{opacity:1}@media only screen and (max-width: 1430px){button{display:none}}/*# sourceMappingURL=table-of-contents.component.css.map */\n"] }]
        }], propDecorators: { contentSourceElement: [{
                type: Input,
                args: [{ required: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb2YtY29udGVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL3RhYmxlLW9mLWNvbnRlbnRzL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy90YWJsZS1vZi1jb250ZW50cy90YWJsZS1vZi1jb250ZW50cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQzdGLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQzs7QUFVckQsTUFBTSxPQUFPLGVBQWU7SUFSNUI7UUFZbUIsY0FBUyxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzdDLDBCQUFxQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZFLHdCQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQztRQUVyRSxpQkFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQzNDLDZCQUF3QixHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLHlCQUFvQixHQUFHLG9CQUFvQixDQUFDO0tBVTdDO0lBUkMsZUFBZTtRQUNiLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMvQixDQUFDOzttSEFuQlUsZUFBZTt1R0FBZixlQUFlLDRJQ3hCNUIsMjlCQStCQSw0N0NEVHlCLFVBQVUsb09BQUUsYUFBYTtrR0FFckMsZUFBZTtrQkFSM0IsU0FBUzsrQkFDRSx3QkFBd0IsY0FDdEIsSUFBSSxtQkFDQyx1QkFBdUIsQ0FBQyxNQUFNLFdBR3RDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDOzhCQUl4QixvQkFBb0I7c0JBQTVDLEtBQUs7dUJBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nRm9yLCBOZ0lmfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCwgY29tcHV0ZWQsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlckxpbmt9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1RhYmxlT2ZDb250ZW50c0xldmVsfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2luZGV4JztcbmltcG9ydCB7VGFibGVPZkNvbnRlbnRzTG9hZGVyfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90YWJsZS1vZi1jb250ZW50cy1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQge1RhYmxlT2ZDb250ZW50c1Njcm9sbFNweX0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGFibGUtb2YtY29udGVudHMtc2Nyb2xsLXNweS5zZXJ2aWNlJztcbmltcG9ydCB7SWNvbkNvbXBvbmVudH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3MtdGFibGUtb2YtY29udGVudHMnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLW9mLWNvbnRlbnRzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtb2YtY29udGVudHMuY29tcG9uZW50LnNjc3MnXSxcbiAgaW1wb3J0czogW05nSWYsIE5nRm9yLCBSb3V0ZXJMaW5rLCBJY29uQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVPZkNvbnRlbnRzIHtcbiAgLy8gRWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBjb250ZW50IGZyb20gd2hpY2ggdGhlIFRhYmxlIG9mIENvbnRlbnRzIGlzIGJ1aWx0XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSBjb250ZW50U291cmNlRWxlbWVudCE6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc2Nyb2xsU3B5ID0gaW5qZWN0KFRhYmxlT2ZDb250ZW50c1Njcm9sbFNweSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgdGFibGVPZkNvbnRlbnRzTG9hZGVyID0gaW5qZWN0KFRhYmxlT2ZDb250ZW50c0xvYWRlcik7XG4gIHRhYmxlT2ZDb250ZW50SXRlbXMgPSB0aGlzLnRhYmxlT2ZDb250ZW50c0xvYWRlci50YWJsZU9mQ29udGVudEl0ZW1zO1xuXG4gIGFjdGl2ZUl0ZW1JZCA9IHRoaXMuc2Nyb2xsU3B5LmFjdGl2ZUl0ZW1JZDtcbiAgc2hvdWxkRGlzcGxheVNjcm9sbFRvVG9wID0gY29tcHV0ZWQoKCkgPT4gIXRoaXMuc2Nyb2xsU3B5LnNjcm9sbGJhclRodW1iT25Ub3AoKSk7XG4gIFRhYmxlT2ZDb250ZW50c0xldmVsID0gVGFibGVPZkNvbnRlbnRzTGV2ZWw7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudGFibGVPZkNvbnRlbnRzTG9hZGVyLmJ1aWxkVGFibGVPZkNvbnRlbnQodGhpcy5jb250ZW50U291cmNlRWxlbWVudCk7XG4gICAgdGhpcy5zY3JvbGxTcHkuc3RhcnRMaXN0ZW5pbmdUb1Njcm9sbCh0aGlzLmNvbnRlbnRTb3VyY2VFbGVtZW50KTtcbiAgfVxuXG4gIHNjcm9sbFRvVG9wKCk6IHZvaWQge1xuICAgIHRoaXMuc2Nyb2xsU3B5LnNjcm9sbFRvVG9wKCk7XG4gIH1cbn1cbiIsIjxhc2lkZT5cbiAgPG5hdj5cbiAgICA8aGVhZGVyPlxuICAgICAgPGgyIGNsYXNzPVwiZG9jcy10aXRsZVwiPk9uIHRoaXMgcGFnZTwvaDI+XG4gICAgPC9oZWFkZXI+XG4gICAgPHVsIGNsYXNzPVwiZG9jcy1mYWNldGVkLWxpc3RcIj5cbiAgICAgIDwhLS0gVE9ETzogSGlkZSBsaSBlbGVtZW50cyB3aXRoIGNsYXNzIGRvY3MtdG9jLWl0ZW0taDMgZm9yIGxhcHRvcCwgdGFibGUgYW5kIHBob25lIHNjcmVlbiByZXNvbHV0aW9ucyAgLS0+XG4gICAgICBAZm9yIChpdGVtIG9mIHRhYmxlT2ZDb250ZW50SXRlbXMoKTsgdHJhY2sgaXRlbS5pZCkge1xuICAgICAgPGxpXG4gICAgICAgIGNsYXNzPVwiZG9jcy1mYWNldGVkLWxpc3QtaXRlbVwiXG4gICAgICAgIFtjbGFzcy5kb2NzLXRvYy1pdGVtLWgyXT1cIml0ZW0ubGV2ZWwgPT09IFRhYmxlT2ZDb250ZW50c0xldmVsLkgyXCJcbiAgICAgICAgW2NsYXNzLmRvY3MtdG9jLWl0ZW0taDNdPVwiaXRlbS5sZXZlbCA9PT0gVGFibGVPZkNvbnRlbnRzTGV2ZWwuSDNcIlxuICAgICAgPlxuICAgICAgICA8YVxuICAgICAgICAgIHJvdXRlckxpbms9XCIuXCJcbiAgICAgICAgICBbZnJhZ21lbnRdPVwiaXRlbS5pZFwiXG4gICAgICAgICAgW2NsYXNzLmRvY3MtZmFjZXRlZC1saXN0LWl0ZW0tYWN0aXZlXT1cIml0ZW0uaWQgPT09IGFjdGl2ZUl0ZW1JZCgpXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IGl0ZW0udGl0bGUgfX1cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICAgIH1cbiAgICA8L3VsPlxuICA8L25hdj5cbiAgQGlmIChzaG91bGREaXNwbGF5U2Nyb2xsVG9Ub3AoKSkge1xuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwic2Nyb2xsVG9Ub3AoKVwiPlxuICAgIDxkb2NzLWljb24gcm9sZT1cInByZXNlbnRhdGlvblwiPmFycm93X3Vwd2FyZF9hbHQ8L2RvY3MtaWNvbj5cbiAgICBCYWNrIHRvIHRoZSB0b3BcbiAgPC9idXR0b24+XG4gIH1cbjwvYXNpZGU+XG4iXX0=