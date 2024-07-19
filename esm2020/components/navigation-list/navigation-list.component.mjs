/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, } from '@angular/core';
import { NavigationState } from '../../services/index';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IsActiveNavigationItem } from '../../pipes/is-active-navigation-item.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class NavigationList {
    constructor() {
        this.navigationItems = [];
        this.displayItemsToLevel = 2;
        this.collapsableLevel = undefined;
        this.expandableLevel = 2;
        this.isDropdownView = false;
        this.linkClicked = new EventEmitter();
        this.navigationState = inject(NavigationState);
        this.expandedItems = this.navigationState.expandedItems;
        this.activeItem = this.navigationState.activeNavigationItem;
    }
    toggle(item) {
        if (item.level === 1 &&
            item.level !== this.expandableLevel &&
            item.level !== this.collapsableLevel) {
            return;
        }
        this.navigationState.toggleItem(item);
    }
    emitClickOnLink() {
        this.linkClicked.emit();
    }
}
NavigationList.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: NavigationList, deps: [], target: i0.ɵɵFactoryTarget.Component });
NavigationList.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0-next.1", type: NavigationList, isStandalone: true, selector: "docs-navigation-list", inputs: { navigationItems: "navigationItems", displayItemsToLevel: "displayItemsToLevel", collapsableLevel: "collapsableLevel", expandableLevel: "expandableLevel", isDropdownView: "isDropdownView" }, outputs: { linkClicked: "linkClicked" }, ngImport: i0, template: "<ng-template #navigationList let-navigationItems>\n  <ul\n    class=\"docs-navigation-list docs-faceted-list\"\n    [class.docs-navigation-list-dropdown]=\"isDropdownView\"\n  >\n    @for (item of navigationItems; track $index) {\n    <li\n      class=\"docs-faceted-list-item\"\n      [class.docs-navigation-link-hidden]=\"displayItemsToLevel && item.level > displayItemsToLevel\"\n    >\n      @if (item.path) { @if (item.isExternal) {\n      <a [href]=\"item.path\" target=\"_blank\">\n        <span [class.docs-external-link]=\"item.isExternal\">{{ item.label }}</span>\n        @if (item.children && item.level! > 1 && !item.isExpanded) {\n        <docs-icon>chevron_right</docs-icon>\n        }\n      </a>\n      } @else {\n      <a\n        [routerLink]=\"'/' + item.path\"\n        [routerLinkActiveOptions]=\"{\n          queryParams: 'ignored',\n          fragment: 'ignored',\n          matrixParams: 'exact',\n          paths: 'exact',\n          exact: false\n        }\"\n        routerLinkActive=\"docs-faceted-list-item-active\"\n        (click)=\"emitClickOnLink()\"\n      >\n        <span>{{ item.label }}</span>\n        @if (item.children && !item.isExpanded) {\n        <docs-icon>chevron_right</docs-icon>\n        }\n      </a>\n      } } @else {\n      <!-- Nav Section Header -->\n      @if (item.level !== collapsableLevel && item.level !== expandableLevel) {\n      <div class=\"docs-secondary-nav-header\">\n        <span>{{ item.label }}</span>\n      </div>\n      }\n\n      <!-- Nav Button Expand/Collapse -->\n      @if ((item.children && item.level === expandableLevel) || item.level === collapsableLevel) {\n      <button\n        type=\"button\"\n        (click)=\"toggle(item)\"\n        attr.aria-label=\"{{ item.isExpanded ? 'Collapse' : 'Expand' }} {{ item.label }}\"\n        [attr.aria-expanded]=\"item.isExpanded\"\n        class=\"docs-secondary-nav-button\"\n        [class.docs-faceted-list-item-active]=\"item | isActiveNavigationItem: activeItem()\"\n        [class.docs-expanded-button]=\"item.children && item.level == collapsableLevel\"\n        [class.docs-not-expanded-button]=\"item.children && item.level === expandableLevel\"\n        [class.docs-nav-item-has-icon]=\"\n          item.children && item.level === expandableLevel && !item.isExpanded\n        \"\n      >\n        @if (item.children && item.level === collapsableLevel) {\n        <docs-icon>arrow_back</docs-icon>\n        }\n        <span>{{ item.label }}</span>\n      </button>\n      } } @if (item.children?.length > 0) {\n      <ng-container\n        *ngTemplateOutlet=\"navigationList; context: {$implicit: item.children}\"\n      ></ng-container>\n      }\n    </li>\n    }\n  </ul>\n</ng-template>\n\n<ng-container\n  *ngTemplateOutlet=\"navigationList; context: {$implicit: navigationItems}\"\n></ng-container>\n", styles: [":host{display:flex;min-width:var(--secondary-nav-width);list-style:none;overflow-y:auto;overflow-x:hidden;height:100vh;padding:0;margin:0;padding-block:1.5rem;font-size:.875rem;box-sizing:border-box}:host::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}:host::-webkit-scrollbar{width:6px;height:6px}:host::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}@media(max-width: 900px){:host::-webkit-scrollbar-thumb{background-color:var(--quinary-contrast)}}:host::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}.docs-nav-secondary :host{padding-block:2rem}:host>.docs-faceted-list{border:0}:host .docs-navigation-link-hidden{display:none}:host .docs-nav-item-has-icon::after{content:\"chevron_right\";font-size:1.25rem;font-family:var(--icons)}.docs-secondary-nav-header{padding-block:1.25rem;font-weight:500}.docs-secondary-nav-button{width:15rem;display:flex;justify-content:space-between;align-items:center;border:none;padding-block:1.25rem;padding-inline-start:0;color:var(--primary-contrast);font-size:.875rem;font-family:var(--inter-font);line-height:160%;letter-spacing:-0.00875rem;transition:color .3s ease,background .3s ease;text-align:left}.docs-secondary-nav-button.docs-secondary-nav-button-active{background-image:var(--pink-to-purple-vertical-gradient)}.docs-secondary-nav-button.docs-secondary-nav-button-active::before{opacity:1;transform:scaleY(1);background:var(--pink-to-purple-vertical-gradient)}.docs-secondary-nav-button.docs-secondary-nav-button-active:hover::before{opacity:1;transform:scaleY(1.1)}.docs-expanded-button{justify-content:start;gap:.5rem}a,.docs-not-expanded-button{display:flex;justify-content:space-between;align-items:center;font-weight:500;line-height:1.4rem;letter-spacing:-0.00875rem;padding:.5rem;padding-inline-start:1rem;text-align:left}.docs-navigation-list{width:100%}.docs-navigation-list li:last-of-type ul:last-of-type li:last-of-type{padding-block-end:1rem}.docs-navigation-list:first-child{margin-inline-start:1rem}.docs-external-link{display:flex;align-items:center;justify-content:space-between;width:100%;gap:.5rem}.docs-external-link::after{content:\"open_in_new\";font-family:var(--icons);font-size:1.1rem;color:var(--quinary-contrast);transition:color .3s ease;margin-inline-end:.4rem}/*# sourceMappingURL=navigation-list.component.css.map */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: IconComponent, selector: "docs-icon" }, { kind: "pipe", type: IsActiveNavigationItem, name: "isActiveNavigationItem" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: NavigationList, decorators: [{
            type: Component,
            args: [{ selector: 'docs-navigation-list', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent, IsActiveNavigationItem], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #navigationList let-navigationItems>\n  <ul\n    class=\"docs-navigation-list docs-faceted-list\"\n    [class.docs-navigation-list-dropdown]=\"isDropdownView\"\n  >\n    @for (item of navigationItems; track $index) {\n    <li\n      class=\"docs-faceted-list-item\"\n      [class.docs-navigation-link-hidden]=\"displayItemsToLevel && item.level > displayItemsToLevel\"\n    >\n      @if (item.path) { @if (item.isExternal) {\n      <a [href]=\"item.path\" target=\"_blank\">\n        <span [class.docs-external-link]=\"item.isExternal\">{{ item.label }}</span>\n        @if (item.children && item.level! > 1 && !item.isExpanded) {\n        <docs-icon>chevron_right</docs-icon>\n        }\n      </a>\n      } @else {\n      <a\n        [routerLink]=\"'/' + item.path\"\n        [routerLinkActiveOptions]=\"{\n          queryParams: 'ignored',\n          fragment: 'ignored',\n          matrixParams: 'exact',\n          paths: 'exact',\n          exact: false\n        }\"\n        routerLinkActive=\"docs-faceted-list-item-active\"\n        (click)=\"emitClickOnLink()\"\n      >\n        <span>{{ item.label }}</span>\n        @if (item.children && !item.isExpanded) {\n        <docs-icon>chevron_right</docs-icon>\n        }\n      </a>\n      } } @else {\n      <!-- Nav Section Header -->\n      @if (item.level !== collapsableLevel && item.level !== expandableLevel) {\n      <div class=\"docs-secondary-nav-header\">\n        <span>{{ item.label }}</span>\n      </div>\n      }\n\n      <!-- Nav Button Expand/Collapse -->\n      @if ((item.children && item.level === expandableLevel) || item.level === collapsableLevel) {\n      <button\n        type=\"button\"\n        (click)=\"toggle(item)\"\n        attr.aria-label=\"{{ item.isExpanded ? 'Collapse' : 'Expand' }} {{ item.label }}\"\n        [attr.aria-expanded]=\"item.isExpanded\"\n        class=\"docs-secondary-nav-button\"\n        [class.docs-faceted-list-item-active]=\"item | isActiveNavigationItem: activeItem()\"\n        [class.docs-expanded-button]=\"item.children && item.level == collapsableLevel\"\n        [class.docs-not-expanded-button]=\"item.children && item.level === expandableLevel\"\n        [class.docs-nav-item-has-icon]=\"\n          item.children && item.level === expandableLevel && !item.isExpanded\n        \"\n      >\n        @if (item.children && item.level === collapsableLevel) {\n        <docs-icon>arrow_back</docs-icon>\n        }\n        <span>{{ item.label }}</span>\n      </button>\n      } } @if (item.children?.length > 0) {\n      <ng-container\n        *ngTemplateOutlet=\"navigationList; context: {$implicit: item.children}\"\n      ></ng-container>\n      }\n    </li>\n    }\n  </ul>\n</ng-template>\n\n<ng-container\n  *ngTemplateOutlet=\"navigationList; context: {$implicit: navigationItems}\"\n></ng-container>\n", styles: [":host{display:flex;min-width:var(--secondary-nav-width);list-style:none;overflow-y:auto;overflow-x:hidden;height:100vh;padding:0;margin:0;padding-block:1.5rem;font-size:.875rem;box-sizing:border-box}:host::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}:host::-webkit-scrollbar{width:6px;height:6px}:host::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}@media(max-width: 900px){:host::-webkit-scrollbar-thumb{background-color:var(--quinary-contrast)}}:host::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}.docs-nav-secondary :host{padding-block:2rem}:host>.docs-faceted-list{border:0}:host .docs-navigation-link-hidden{display:none}:host .docs-nav-item-has-icon::after{content:\"chevron_right\";font-size:1.25rem;font-family:var(--icons)}.docs-secondary-nav-header{padding-block:1.25rem;font-weight:500}.docs-secondary-nav-button{width:15rem;display:flex;justify-content:space-between;align-items:center;border:none;padding-block:1.25rem;padding-inline-start:0;color:var(--primary-contrast);font-size:.875rem;font-family:var(--inter-font);line-height:160%;letter-spacing:-0.00875rem;transition:color .3s ease,background .3s ease;text-align:left}.docs-secondary-nav-button.docs-secondary-nav-button-active{background-image:var(--pink-to-purple-vertical-gradient)}.docs-secondary-nav-button.docs-secondary-nav-button-active::before{opacity:1;transform:scaleY(1);background:var(--pink-to-purple-vertical-gradient)}.docs-secondary-nav-button.docs-secondary-nav-button-active:hover::before{opacity:1;transform:scaleY(1.1)}.docs-expanded-button{justify-content:start;gap:.5rem}a,.docs-not-expanded-button{display:flex;justify-content:space-between;align-items:center;font-weight:500;line-height:1.4rem;letter-spacing:-0.00875rem;padding:.5rem;padding-inline-start:1rem;text-align:left}.docs-navigation-list{width:100%}.docs-navigation-list li:last-of-type ul:last-of-type li:last-of-type{padding-block-end:1rem}.docs-navigation-list:first-child{margin-inline-start:1rem}.docs-external-link{display:flex;align-items:center;justify-content:space-between;width:100%;gap:.5rem}.docs-external-link::after{content:\"open_in_new\";font-family:var(--icons);font-size:1.1rem;color:var(--quinary-contrast);transition:color .3s ease;margin-inline-end:.4rem}/*# sourceMappingURL=navigation-list.component.css.map */\n"] }]
        }], propDecorators: { navigationItems: [{
                type: Input,
                args: [{ required: true }]
            }], displayItemsToLevel: [{
                type: Input
            }], collapsableLevel: [{
                type: Input
            }], expandableLevel: [{
                type: Input
            }], isDropdownView: [{
                type: Input
            }], linkClicked: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9uYXZpZ2F0aW9uLWxpc3QvbmF2aWdhdGlvbi1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9uYXZpZ2F0aW9uLWxpc3QvbmF2aWdhdGlvbi1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNENBQTRDLENBQUM7OztBQVVsRixNQUFNLE9BQU8sY0FBYztJQVIzQjtRQVMyQixvQkFBZSxHQUFxQixFQUFFLENBQUM7UUFDdkQsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBQ2hDLHFCQUFnQixHQUF1QixTQUFTLENBQUM7UUFDakQsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFdEIsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRWhDLG9CQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTNELGtCQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDbkQsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsb0JBQW9CLENBQUM7S0FnQnhEO0lBZEMsTUFBTSxDQUFDLElBQW9CO1FBQ3pCLElBQ0UsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGVBQWU7WUFDbkMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQ3BDLENBQUM7WUFDRCxPQUFPO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDOztrSEEzQlUsY0FBYztzR0FBZCxjQUFjLGlVQy9CM0IsNnhGQTRFQSx5NkVEbERZLFlBQVksc01BQUUsVUFBVSxvT0FBRSxnQkFBZ0IsOE1BQUUsYUFBYSxpREFBRSxzQkFBc0I7a0dBS2hGLGNBQWM7a0JBUjFCLFNBQVM7K0JBQ0Usc0JBQXNCLGNBQ3BCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixDQUFDLG1CQUczRSx1QkFBdUIsQ0FBQyxNQUFNOzhCQUd0QixlQUFlO3NCQUF2QyxLQUFLO3VCQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQztnQkFDZCxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25JdGVtfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2luZGV4JztcbmltcG9ydCB7TmF2aWdhdGlvblN0YXRlfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9pbmRleCc7XG5pbXBvcnQge1JvdXRlckxpbmssIFJvdXRlckxpbmtBY3RpdmV9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SWNvbkNvbXBvbmVudH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5pbXBvcnQge0lzQWN0aXZlTmF2aWdhdGlvbkl0ZW19IGZyb20gJy4uLy4uL3BpcGVzL2lzLWFjdGl2ZS1uYXZpZ2F0aW9uLWl0ZW0ucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3MtbmF2aWdhdGlvbi1saXN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTGluaywgUm91dGVyTGlua0FjdGl2ZSwgSWNvbkNvbXBvbmVudCwgSXNBY3RpdmVOYXZpZ2F0aW9uSXRlbV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uYXZpZ2F0aW9uLWxpc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25MaXN0IHtcbiAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIG5hdmlnYXRpb25JdGVtczogTmF2aWdhdGlvbkl0ZW1bXSA9IFtdO1xuICBASW5wdXQoKSBkaXNwbGF5SXRlbXNUb0xldmVsOiBudW1iZXIgPSAyO1xuICBASW5wdXQoKSBjb2xsYXBzYWJsZUxldmVsOiBudW1iZXIgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGV4cGFuZGFibGVMZXZlbDogbnVtYmVyID0gMjtcbiAgQElucHV0KCkgaXNEcm9wZG93blZpZXcgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgbGlua0NsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBuYXZpZ2F0aW9uU3RhdGUgPSBpbmplY3QoTmF2aWdhdGlvblN0YXRlKTtcblxuICBleHBhbmRlZEl0ZW1zID0gdGhpcy5uYXZpZ2F0aW9uU3RhdGUuZXhwYW5kZWRJdGVtcztcbiAgYWN0aXZlSXRlbSA9IHRoaXMubmF2aWdhdGlvblN0YXRlLmFjdGl2ZU5hdmlnYXRpb25JdGVtO1xuXG4gIHRvZ2dsZShpdGVtOiBOYXZpZ2F0aW9uSXRlbSk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGl0ZW0ubGV2ZWwgPT09IDEgJiZcbiAgICAgIGl0ZW0ubGV2ZWwgIT09IHRoaXMuZXhwYW5kYWJsZUxldmVsICYmXG4gICAgICBpdGVtLmxldmVsICE9PSB0aGlzLmNvbGxhcHNhYmxlTGV2ZWxcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5uYXZpZ2F0aW9uU3RhdGUudG9nZ2xlSXRlbShpdGVtKTtcbiAgfVxuXG4gIGVtaXRDbGlja09uTGluaygpOiB2b2lkIHtcbiAgICB0aGlzLmxpbmtDbGlja2VkLmVtaXQoKTtcbiAgfVxufVxuIiwiPG5nLXRlbXBsYXRlICNuYXZpZ2F0aW9uTGlzdCBsZXQtbmF2aWdhdGlvbkl0ZW1zPlxuICA8dWxcbiAgICBjbGFzcz1cImRvY3MtbmF2aWdhdGlvbi1saXN0IGRvY3MtZmFjZXRlZC1saXN0XCJcbiAgICBbY2xhc3MuZG9jcy1uYXZpZ2F0aW9uLWxpc3QtZHJvcGRvd25dPVwiaXNEcm9wZG93blZpZXdcIlxuICA+XG4gICAgQGZvciAoaXRlbSBvZiBuYXZpZ2F0aW9uSXRlbXM7IHRyYWNrICRpbmRleCkge1xuICAgIDxsaVxuICAgICAgY2xhc3M9XCJkb2NzLWZhY2V0ZWQtbGlzdC1pdGVtXCJcbiAgICAgIFtjbGFzcy5kb2NzLW5hdmlnYXRpb24tbGluay1oaWRkZW5dPVwiZGlzcGxheUl0ZW1zVG9MZXZlbCAmJiBpdGVtLmxldmVsID4gZGlzcGxheUl0ZW1zVG9MZXZlbFwiXG4gICAgPlxuICAgICAgQGlmIChpdGVtLnBhdGgpIHsgQGlmIChpdGVtLmlzRXh0ZXJuYWwpIHtcbiAgICAgIDxhIFtocmVmXT1cIml0ZW0ucGF0aFwiIHRhcmdldD1cIl9ibGFua1wiPlxuICAgICAgICA8c3BhbiBbY2xhc3MuZG9jcy1leHRlcm5hbC1saW5rXT1cIml0ZW0uaXNFeHRlcm5hbFwiPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgIEBpZiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmxldmVsISA+IDEgJiYgIWl0ZW0uaXNFeHBhbmRlZCkge1xuICAgICAgICA8ZG9jcy1pY29uPmNoZXZyb25fcmlnaHQ8L2RvY3MtaWNvbj5cbiAgICAgICAgfVxuICAgICAgPC9hPlxuICAgICAgfSBAZWxzZSB7XG4gICAgICA8YVxuICAgICAgICBbcm91dGVyTGlua109XCInLycgKyBpdGVtLnBhdGhcIlxuICAgICAgICBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwie1xuICAgICAgICAgIHF1ZXJ5UGFyYW1zOiAnaWdub3JlZCcsXG4gICAgICAgICAgZnJhZ21lbnQ6ICdpZ25vcmVkJyxcbiAgICAgICAgICBtYXRyaXhQYXJhbXM6ICdleGFjdCcsXG4gICAgICAgICAgcGF0aHM6ICdleGFjdCcsXG4gICAgICAgICAgZXhhY3Q6IGZhbHNlXG4gICAgICAgIH1cIlxuICAgICAgICByb3V0ZXJMaW5rQWN0aXZlPVwiZG9jcy1mYWNldGVkLWxpc3QtaXRlbS1hY3RpdmVcIlxuICAgICAgICAoY2xpY2spPVwiZW1pdENsaWNrT25MaW5rKClcIlxuICAgICAgPlxuICAgICAgICA8c3Bhbj57eyBpdGVtLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICBAaWYgKGl0ZW0uY2hpbGRyZW4gJiYgIWl0ZW0uaXNFeHBhbmRlZCkge1xuICAgICAgICA8ZG9jcy1pY29uPmNoZXZyb25fcmlnaHQ8L2RvY3MtaWNvbj5cbiAgICAgICAgfVxuICAgICAgPC9hPlxuICAgICAgfSB9IEBlbHNlIHtcbiAgICAgIDwhLS0gTmF2IFNlY3Rpb24gSGVhZGVyIC0tPlxuICAgICAgQGlmIChpdGVtLmxldmVsICE9PSBjb2xsYXBzYWJsZUxldmVsICYmIGl0ZW0ubGV2ZWwgIT09IGV4cGFuZGFibGVMZXZlbCkge1xuICAgICAgPGRpdiBjbGFzcz1cImRvY3Mtc2Vjb25kYXJ5LW5hdi1oZWFkZXJcIj5cbiAgICAgICAgPHNwYW4+e3sgaXRlbS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgfVxuXG4gICAgICA8IS0tIE5hdiBCdXR0b24gRXhwYW5kL0NvbGxhcHNlIC0tPlxuICAgICAgQGlmICgoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmxldmVsID09PSBleHBhbmRhYmxlTGV2ZWwpIHx8IGl0ZW0ubGV2ZWwgPT09IGNvbGxhcHNhYmxlTGV2ZWwpIHtcbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJ0b2dnbGUoaXRlbSlcIlxuICAgICAgICBhdHRyLmFyaWEtbGFiZWw9XCJ7eyBpdGVtLmlzRXhwYW5kZWQgPyAnQ29sbGFwc2UnIDogJ0V4cGFuZCcgfX0ge3sgaXRlbS5sYWJlbCB9fVwiXG4gICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiaXRlbS5pc0V4cGFuZGVkXCJcbiAgICAgICAgY2xhc3M9XCJkb2NzLXNlY29uZGFyeS1uYXYtYnV0dG9uXCJcbiAgICAgICAgW2NsYXNzLmRvY3MtZmFjZXRlZC1saXN0LWl0ZW0tYWN0aXZlXT1cIml0ZW0gfCBpc0FjdGl2ZU5hdmlnYXRpb25JdGVtOiBhY3RpdmVJdGVtKClcIlxuICAgICAgICBbY2xhc3MuZG9jcy1leHBhbmRlZC1idXR0b25dPVwiaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmxldmVsID09IGNvbGxhcHNhYmxlTGV2ZWxcIlxuICAgICAgICBbY2xhc3MuZG9jcy1ub3QtZXhwYW5kZWQtYnV0dG9uXT1cIml0ZW0uY2hpbGRyZW4gJiYgaXRlbS5sZXZlbCA9PT0gZXhwYW5kYWJsZUxldmVsXCJcbiAgICAgICAgW2NsYXNzLmRvY3MtbmF2LWl0ZW0taGFzLWljb25dPVwiXG4gICAgICAgICAgaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmxldmVsID09PSBleHBhbmRhYmxlTGV2ZWwgJiYgIWl0ZW0uaXNFeHBhbmRlZFxuICAgICAgICBcIlxuICAgICAgPlxuICAgICAgICBAaWYgKGl0ZW0uY2hpbGRyZW4gJiYgaXRlbS5sZXZlbCA9PT0gY29sbGFwc2FibGVMZXZlbCkge1xuICAgICAgICA8ZG9jcy1pY29uPmFycm93X2JhY2s8L2RvY3MtaWNvbj5cbiAgICAgICAgfVxuICAgICAgICA8c3Bhbj57eyBpdGVtLmxhYmVsIH19PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICB9IH0gQGlmIChpdGVtLmNoaWxkcmVuPy5sZW5ndGggPiAwKSB7XG4gICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwibmF2aWdhdGlvbkxpc3Q7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW0uY2hpbGRyZW59XCJcbiAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgIH1cbiAgICA8L2xpPlxuICAgIH1cbiAgPC91bD5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy1jb250YWluZXJcbiAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuYXZpZ2F0aW9uTGlzdDsgY29udGV4dDogeyRpbXBsaWNpdDogbmF2aWdhdGlvbkl0ZW1zfVwiXG4+PC9uZy1jb250YWluZXI+XG4iXX0=