/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, } from '@angular/core';
import { NavigationState } from '../../services';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { IsActiveNavigationItem } from '../../pipes/is-active-navigation-item.pipe';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function NavigationList_ng_template_0_For_2_Conditional_1_Conditional_0_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "docs-icon");
    i0.ɵɵtext(1, "chevron_right");
    i0.ɵɵelementEnd();
} }
function NavigationList_ng_template_0_For_2_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 4)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, NavigationList_ng_template_0_For_2_Conditional_1_Conditional_0_Conditional_3_Template, 2, 0, "docs-icon");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("href", item_r5.path, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵclassProp("adev-external-link", item_r5.isExternal);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(item_r5.label);
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(3, item_r5.children && item_r5.level > 1 && !item_r5.isExpanded ? 3 : -1);
} }
function NavigationList_ng_template_0_For_2_Conditional_1_Conditional_1_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "docs-icon");
    i0.ɵɵtext(1, "chevron_right");
    i0.ɵɵelementEnd();
} }
const _c0 = () => ({ queryParams: "ignored", fragment: "ignored", matrixParams: "exact", paths: "exact", exact: false });
function NavigationList_ng_template_0_For_2_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵlistener("click", function NavigationList_ng_template_0_For_2_Conditional_1_Conditional_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r19); const ctx_r18 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r18.emitClickOnLink()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, NavigationList_ng_template_0_For_2_Conditional_1_Conditional_1_Conditional_3_Template, 2, 0, "docs-icon");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("routerLink", "/" + item_r5.path)("routerLinkActiveOptions", i0.ɵɵpureFunction0(4, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.label);
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(3, item_r5.children && !item_r5.isExpanded ? 3 : -1);
} }
function NavigationList_ng_template_0_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, NavigationList_ng_template_0_For_2_Conditional_1_Conditional_0_Template, 4, 5, "a", 4)(1, NavigationList_ng_template_0_For_2_Conditional_1_Conditional_1_Template, 4, 5);
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(0, item_r5.isExternal ? 0 : 1);
} }
function NavigationList_ng_template_0_For_2_Conditional_2_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.label);
} }
function NavigationList_ng_template_0_For_2_Conditional_2_Conditional_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "docs-icon");
    i0.ɵɵtext(1, "arrow_back");
    i0.ɵɵelementEnd();
} }
function NavigationList_ng_template_0_For_2_Conditional_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function NavigationList_ng_template_0_For_2_Conditional_2_Conditional_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r28); const item_r5 = i0.ɵɵnextContext(2).$implicit; const ctx_r26 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r26.toggle(item_r5)); });
    i0.ɵɵpipe(1, "isActiveNavigationItem");
    i0.ɵɵtemplate(2, NavigationList_ng_template_0_For_2_Conditional_2_Conditional_1_Conditional_2_Template, 2, 0, "docs-icon");
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r23 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("adev-faceted-list-item-active", i0.ɵɵpipeBind2(1, 13, item_r5, ctx_r23.activeItem()))("adev-expanded-button", item_r5.children && item_r5.level == ctx_r23.collapsableLevel)("adev-not-expanded-button", item_r5.children && item_r5.level === ctx_r23.expandableLevel)("adev-nav-item-has-icon", item_r5.children && item_r5.level === ctx_r23.expandableLevel && !item_r5.isExpanded);
    i0.ɵɵattributeInterpolate2("aria-label", "", item_r5.isExpanded ? "Collapse" : "Expand", " ", item_r5.label, "");
    i0.ɵɵattribute("aria-expanded", item_r5.isExpanded);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(2, item_r5.children && item_r5.level === ctx_r23.collapsableLevel ? 2 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r5.label);
} }
function NavigationList_ng_template_0_For_2_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, NavigationList_ng_template_0_For_2_Conditional_2_Conditional_0_Template, 3, 1, "div", 6)(1, NavigationList_ng_template_0_For_2_Conditional_2_Conditional_1_Template, 5, 16, "button", 7);
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵconditional(0, item_r5.level !== ctx_r11.collapsableLevel && item_r5.level !== ctx_r11.expandableLevel ? 0 : -1);
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, item_r5.children && item_r5.level === ctx_r11.expandableLevel || item_r5.level === ctx_r11.collapsableLevel ? 1 : -1);
} }
function NavigationList_ng_template_0_For_2_Conditional_3_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c1 = a0 => ({ $implicit: a0 });
function NavigationList_ng_template_0_For_2_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, NavigationList_ng_template_0_For_2_Conditional_3_ng_container_0_Template, 1, 0, "ng-container", 1);
} if (rf & 2) {
    const item_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵnextContext(2);
    const _r1 = i0.ɵɵreference(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1, item_r5.children));
} }
function NavigationList_ng_template_0_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 3);
    i0.ɵɵtemplate(1, NavigationList_ng_template_0_For_2_Conditional_1_Template, 2, 1)(2, NavigationList_ng_template_0_For_2_Conditional_2_Template, 2, 2)(3, NavigationList_ng_template_0_For_2_Conditional_3_Template, 1, 4, "ng-container");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("docs-navigation-link-hidden", ctx_r4.displayItemsToLevel && item_r5.level > ctx_r4.displayItemsToLevel);
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, item_r5.path ? 1 : 2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(3, (item_r5.children == null ? null : item_r5.children.length) > 0 ? 3 : -1);
} }
function NavigationList_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 2);
    i0.ɵɵrepeaterCreate(1, NavigationList_ng_template_0_For_2_Template, 4, 4, "li", 10, i0.ɵɵrepeaterTrackByIndex);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const navigationItems_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("docs-navigation-list-dropdown", ctx_r0.isDropdownView);
    i0.ɵɵadvance(1);
    i0.ɵɵrepeater(navigationItems_r3);
} }
function NavigationList_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
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
NavigationList.ɵfac = function NavigationList_Factory(t) { return new (t || NavigationList)(); };
NavigationList.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NavigationList, selectors: [["docs-navigation-list"]], inputs: { navigationItems: "navigationItems", displayItemsToLevel: "displayItemsToLevel", collapsableLevel: "collapsableLevel", expandableLevel: "expandableLevel", isDropdownView: "isDropdownView" }, outputs: { linkClicked: "linkClicked" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 3, vars: 4, consts: [["navigationList", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "docs-navigation-list", "adev-faceted-list"], [1, "adev-faceted-list-item"], ["target", "_blank", 3, "href"], ["routerLinkActive", "adev-faceted-list-item-active", 3, "routerLink", "routerLinkActiveOptions", "click"], ["class", "adev-secondary-nav-header"], ["type", "button", "class", "adev-secondary-nav-button", 3, "adev-faceted-list-item-active", "adev-expanded-button", "adev-not-expanded-button", "adev-nav-item-has-icon"], [1, "adev-secondary-nav-header"], ["type", "button", 1, "adev-secondary-nav-button", 3, "click"], ["class", "adev-faceted-list-item", 3, "docs-navigation-link-hidden"]], template: function NavigationList_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NavigationList_ng_template_0_Template, 3, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(2, NavigationList_ng_container_2_Template, 1, 0, "ng-container", 1);
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(1);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c1, ctx.navigationItems));
    } }, dependencies: [CommonModule, i1.NgTemplateOutlet, RouterLink, RouterLinkActive, IconComponent, IsActiveNavigationItem], styles: ["[_nghost-%COMP%]{display:flex;min-width:var(--secondary-nav-width);list-style:none;overflow-y:auto;overflow-x:hidden;height:100vh;padding:0;margin:0;padding-block:1.5rem;font-size:.875rem;box-sizing:border-box}[_nghost-%COMP%]::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}[_nghost-%COMP%]::-webkit-scrollbar{width:6px;height:6px}[_nghost-%COMP%]::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}@media(max-width: 900px){[_nghost-%COMP%]::-webkit-scrollbar-thumb{background-color:var(--quinary-contrast)}}[_nghost-%COMP%]::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}.adev-nav-secondary   [_nghost-%COMP%]{padding-block:2rem}[_nghost-%COMP%] > .adev-faceted-list[_ngcontent-%COMP%]{border:0}[_nghost-%COMP%]   .docs-navigation-link-hidden[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   .adev-nav-item-has-icon[_ngcontent-%COMP%]::after{content:\"chevron_right\";font-size:1.25rem;font-family:var(--icons)}.adev-secondary-nav-header[_ngcontent-%COMP%]{padding-block:1.25rem;font-weight:500}.adev-secondary-nav-button[_ngcontent-%COMP%]{width:15rem;display:flex;justify-content:space-between;align-items:center;border:none;padding-block:1.25rem;padding-inline-start:0;color:var(--primary-contrast);font-size:.875rem;font-family:var(--inter-font);line-height:160%;letter-spacing:-0.00875rem;transition:color .3s ease,background .3s ease;text-align:left}.adev-secondary-nav-button.adev-secondary-nav-button-active[_ngcontent-%COMP%]{background-image:var(--pink-to-purple-vertical-gradient)}.adev-secondary-nav-button.adev-secondary-nav-button-active[_ngcontent-%COMP%]::before{opacity:1;transform:scaleY(1);background:var(--pink-to-purple-vertical-gradient)}.adev-secondary-nav-button.adev-secondary-nav-button-active[_ngcontent-%COMP%]:hover::before{opacity:1;transform:scaleY(1.1)}.adev-expanded-button[_ngcontent-%COMP%]{justify-content:start;gap:.5rem}a[_ngcontent-%COMP%], .adev-not-expanded-button[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;font-weight:500;line-height:1.4rem;letter-spacing:-0.00875rem;padding:.5rem;padding-inline-start:1rem;text-align:left}.docs-navigation-list[_ngcontent-%COMP%]{width:100%}.docs-navigation-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-of-type   ul[_ngcontent-%COMP%]:last-of-type   li[_ngcontent-%COMP%]:last-of-type{padding-block-end:1rem}.docs-navigation-list[_ngcontent-%COMP%]:first-child{margin-inline-start:1rem}.adev-external-link[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;width:100%;gap:.5rem}.adev-external-link[_ngcontent-%COMP%]::after{content:\"open_in_new\";font-family:var(--icons);font-size:1.1rem;color:var(--quinary-contrast);transition:color .3s ease;margin-inline-end:.4rem}/*# sourceMappingURL=navigation-list.component.css.map */"], changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavigationList, [{
        type: Component,
        args: [{ selector: 'docs-navigation-list', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent, IsActiveNavigationItem], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #navigationList let-navigationItems>\n  <ul\n    class=\"docs-navigation-list adev-faceted-list\"\n    [class.docs-navigation-list-dropdown]=\"isDropdownView\"\n  >\n    @for (item of navigationItems; track $index) {\n    <li\n      class=\"adev-faceted-list-item\"\n      [class.docs-navigation-link-hidden]=\"displayItemsToLevel && item.level > displayItemsToLevel\"\n    >\n      @if (item.path) { @if (item.isExternal) {\n      <a [href]=\"item.path\" target=\"_blank\">\n        <span [class.adev-external-link]=\"item.isExternal\">{{ item.label }}</span>\n        @if (item.children && item.level! > 1 && !item.isExpanded) {\n        <docs-icon>chevron_right</docs-icon>\n        }\n      </a>\n      } @else {\n      <a\n        [routerLink]=\"'/' + item.path\"\n        [routerLinkActiveOptions]=\"{\n          queryParams: 'ignored',\n          fragment: 'ignored',\n          matrixParams: 'exact',\n          paths: 'exact',\n          exact: false\n        }\"\n        routerLinkActive=\"adev-faceted-list-item-active\"\n        (click)=\"emitClickOnLink()\"\n      >\n        <span>{{ item.label }}</span>\n        @if (item.children && !item.isExpanded) {\n        <docs-icon>chevron_right</docs-icon>\n        }\n      </a>\n      } } @else {\n      <!-- Nav Section Header -->\n      @if (item.level !== collapsableLevel && item.level !== expandableLevel) {\n      <div class=\"adev-secondary-nav-header\">\n        <span>{{ item.label }}</span>\n      </div>\n      }\n\n      <!-- Nav Button Expand/Collapse -->\n      @if ((item.children && item.level === expandableLevel) || item.level === collapsableLevel) {\n      <button\n        type=\"button\"\n        (click)=\"toggle(item)\"\n        attr.aria-label=\"{{ item.isExpanded ? 'Collapse' : 'Expand' }} {{ item.label }}\"\n        [attr.aria-expanded]=\"item.isExpanded\"\n        class=\"adev-secondary-nav-button\"\n        [class.adev-faceted-list-item-active]=\"item | isActiveNavigationItem: activeItem()\"\n        [class.adev-expanded-button]=\"item.children && item.level == collapsableLevel\"\n        [class.adev-not-expanded-button]=\"item.children && item.level === expandableLevel\"\n        [class.adev-nav-item-has-icon]=\"\n          item.children && item.level === expandableLevel && !item.isExpanded\n        \"\n      >\n        @if (item.children && item.level === collapsableLevel) {\n        <docs-icon>arrow_back</docs-icon>\n        }\n        <span>{{ item.label }}</span>\n      </button>\n      } } @if (item.children?.length > 0) {\n      <ng-container\n        *ngTemplateOutlet=\"navigationList; context: {$implicit: item.children}\"\n      ></ng-container>\n      }\n    </li>\n    }\n  </ul>\n</ng-template>\n\n<ng-container\n  *ngTemplateOutlet=\"navigationList; context: {$implicit: navigationItems}\"\n></ng-container>\n", styles: [":host{display:flex;min-width:var(--secondary-nav-width);list-style:none;overflow-y:auto;overflow-x:hidden;height:100vh;padding:0;margin:0;padding-block:1.5rem;font-size:.875rem;box-sizing:border-box}:host::-webkit-scrollbar-track{background:rgba(0,0,0,0);cursor:pointer}:host::-webkit-scrollbar{width:6px;height:6px}:host::-webkit-scrollbar-thumb{background-color:var(--septenary-contrast);border-radius:10px;transition:background-color .3s ease}@media(max-width: 900px){:host::-webkit-scrollbar-thumb{background-color:var(--quinary-contrast)}}:host::-webkit-scrollbar-thumb:hover{background-color:var(--quinary-contrast)}.adev-nav-secondary :host{padding-block:2rem}:host>.adev-faceted-list{border:0}:host .docs-navigation-link-hidden{display:none}:host .adev-nav-item-has-icon::after{content:\"chevron_right\";font-size:1.25rem;font-family:var(--icons)}.adev-secondary-nav-header{padding-block:1.25rem;font-weight:500}.adev-secondary-nav-button{width:15rem;display:flex;justify-content:space-between;align-items:center;border:none;padding-block:1.25rem;padding-inline-start:0;color:var(--primary-contrast);font-size:.875rem;font-family:var(--inter-font);line-height:160%;letter-spacing:-0.00875rem;transition:color .3s ease,background .3s ease;text-align:left}.adev-secondary-nav-button.adev-secondary-nav-button-active{background-image:var(--pink-to-purple-vertical-gradient)}.adev-secondary-nav-button.adev-secondary-nav-button-active::before{opacity:1;transform:scaleY(1);background:var(--pink-to-purple-vertical-gradient)}.adev-secondary-nav-button.adev-secondary-nav-button-active:hover::before{opacity:1;transform:scaleY(1.1)}.adev-expanded-button{justify-content:start;gap:.5rem}a,.adev-not-expanded-button{display:flex;justify-content:space-between;align-items:center;font-weight:500;line-height:1.4rem;letter-spacing:-0.00875rem;padding:.5rem;padding-inline-start:1rem;text-align:left}.docs-navigation-list{width:100%}.docs-navigation-list li:last-of-type ul:last-of-type li:last-of-type{padding-block-end:1rem}.docs-navigation-list:first-child{margin-inline-start:1rem}.adev-external-link{display:flex;align-items:center;justify-content:space-between;width:100%;gap:.5rem}.adev-external-link::after{content:\"open_in_new\";font-family:var(--icons);font-size:1.1rem;color:var(--quinary-contrast);transition:color .3s ease;margin-inline-end:.4rem}/*# sourceMappingURL=navigation-list.component.css.map */\n"] }]
    }], null, { navigationItems: [{
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
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NavigationList, { className: "NavigationList", filePath: "docs/components/navigation-list/navigation-list.component.ts", lineNumber: 32 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9uYXZpZ2F0aW9uLWxpc3QvbmF2aWdhdGlvbi1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9uYXZpZ2F0aW9uLWxpc3QvbmF2aWdhdGlvbi1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNENBQTRDLENBQUM7Ozs7SUNQMUUsaUNBQVc7SUFBQSw2QkFBYTtJQUFBLGlCQUFZOzs7SUFIdEMsNEJBQXNDLFdBQUE7SUFDZSxZQUFnQjtJQUFBLGlCQUFPO0lBQzFFLDBIQUVDO0lBQ0gsaUJBQUk7OztJQUxELHFEQUFrQjtJQUNiLGVBQTRDO0lBQTVDLHdEQUE0QztJQUFDLGVBQWdCO0lBQWhCLG1DQUFnQjtJQUNuRSxlQUVDO0lBRkQsMEZBRUM7OztJQWlCRCxpQ0FBVztJQUFBLDZCQUFhO0lBQUEsaUJBQVk7Ozs7O0lBZHRDLDRCQVdDO0lBREMsbU1BQVMsZUFBQSx5QkFBaUIsQ0FBQSxJQUFDO0lBRTNCLDRCQUFNO0lBQUEsWUFBZ0I7SUFB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QUFLO1lBQ0csY0FBYztrQkFBdEIsS0FBSztZQUVJLFdBQVc7a0JBQXBCLE1BQU07O2tGQVBJLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TmF2aWdhdGlvbkl0ZW19IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uU3RhdGV9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7Um91dGVyTGluaywgUm91dGVyTGlua0FjdGl2ZX0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJY29uQ29tcG9uZW50fSBmcm9tICcuLi9pY29uL2ljb24uY29tcG9uZW50JztcbmltcG9ydCB7SXNBY3RpdmVOYXZpZ2F0aW9uSXRlbX0gZnJvbSAnLi4vLi4vcGlwZXMvaXMtYWN0aXZlLW5hdmlnYXRpb24taXRlbS5waXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jcy1uYXZpZ2F0aW9uLWxpc3QnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJMaW5rLCBSb3V0ZXJMaW5rQWN0aXZlLCBJY29uQ29tcG9uZW50LCBJc0FjdGl2ZU5hdmlnYXRpb25JdGVtXSxcbiAgdGVtcGxhdGVVcmw6ICcuL25hdmlnYXRpb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25hdmlnYXRpb24tbGlzdC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbkxpc3Qge1xuICBASW5wdXQoe3JlcXVpcmVkOiB0cnVlfSkgbmF2aWdhdGlvbkl0ZW1zOiBOYXZpZ2F0aW9uSXRlbVtdID0gW107XG4gIEBJbnB1dCgpIGRpc3BsYXlJdGVtc1RvTGV2ZWw6IG51bWJlciA9IDI7XG4gIEBJbnB1dCgpIGNvbGxhcHNhYmxlTGV2ZWw6IG51bWJlciB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgZXhwYW5kYWJsZUxldmVsOiBudW1iZXIgPSAyO1xuICBASW5wdXQoKSBpc0Ryb3Bkb3duVmlldyA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBsaW5rQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IG5hdmlnYXRpb25TdGF0ZSA9IGluamVjdChOYXZpZ2F0aW9uU3RhdGUpO1xuXG4gIGV4cGFuZGVkSXRlbXMgPSB0aGlzLm5hdmlnYXRpb25TdGF0ZS5leHBhbmRlZEl0ZW1zO1xuICBhY3RpdmVJdGVtID0gdGhpcy5uYXZpZ2F0aW9uU3RhdGUuYWN0aXZlTmF2aWdhdGlvbkl0ZW07XG5cbiAgdG9nZ2xlKGl0ZW06IE5hdmlnYXRpb25JdGVtKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgaXRlbS5sZXZlbCA9PT0gMSAmJlxuICAgICAgaXRlbS5sZXZlbCAhPT0gdGhpcy5leHBhbmRhYmxlTGV2ZWwgJiZcbiAgICAgIGl0ZW0ubGV2ZWwgIT09IHRoaXMuY29sbGFwc2FibGVMZXZlbFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5hdmlnYXRpb25TdGF0ZS50b2dnbGVJdGVtKGl0ZW0pO1xuICB9XG5cbiAgZW1pdENsaWNrT25MaW5rKCk6IHZvaWQge1xuICAgIHRoaXMubGlua0NsaWNrZWQuZW1pdCgpO1xuICB9XG59XG4iLCI8bmctdGVtcGxhdGUgI25hdmlnYXRpb25MaXN0IGxldC1uYXZpZ2F0aW9uSXRlbXM+XG4gIDx1bFxuICAgIGNsYXNzPVwiZG9jcy1uYXZpZ2F0aW9uLWxpc3QgYWRldi1mYWNldGVkLWxpc3RcIlxuICAgIFtjbGFzcy5kb2NzLW5hdmlnYXRpb24tbGlzdC1kcm9wZG93bl09XCJpc0Ryb3Bkb3duVmlld1wiXG4gID5cbiAgICBAZm9yIChpdGVtIG9mIG5hdmlnYXRpb25JdGVtczsgdHJhY2sgJGluZGV4KSB7XG4gICAgPGxpXG4gICAgICBjbGFzcz1cImFkZXYtZmFjZXRlZC1saXN0LWl0ZW1cIlxuICAgICAgW2NsYXNzLmRvY3MtbmF2aWdhdGlvbi1saW5rLWhpZGRlbl09XCJkaXNwbGF5SXRlbXNUb0xldmVsICYmIGl0ZW0ubGV2ZWwgPiBkaXNwbGF5SXRlbXNUb0xldmVsXCJcbiAgICA+XG4gICAgICBAaWYgKGl0ZW0ucGF0aCkgeyBAaWYgKGl0ZW0uaXNFeHRlcm5hbCkge1xuICAgICAgPGEgW2hyZWZdPVwiaXRlbS5wYXRoXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgIDxzcGFuIFtjbGFzcy5hZGV2LWV4dGVybmFsLWxpbmtdPVwiaXRlbS5pc0V4dGVybmFsXCI+e3sgaXRlbS5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgQGlmIChpdGVtLmNoaWxkcmVuICYmIGl0ZW0ubGV2ZWwhID4gMSAmJiAhaXRlbS5pc0V4cGFuZGVkKSB7XG4gICAgICAgIDxkb2NzLWljb24+Y2hldnJvbl9yaWdodDwvZG9jcy1pY29uPlxuICAgICAgICB9XG4gICAgICA8L2E+XG4gICAgICB9IEBlbHNlIHtcbiAgICAgIDxhXG4gICAgICAgIFtyb3V0ZXJMaW5rXT1cIicvJyArIGl0ZW0ucGF0aFwiXG4gICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJ7XG4gICAgICAgICAgcXVlcnlQYXJhbXM6ICdpZ25vcmVkJyxcbiAgICAgICAgICBmcmFnbWVudDogJ2lnbm9yZWQnLFxuICAgICAgICAgIG1hdHJpeFBhcmFtczogJ2V4YWN0JyxcbiAgICAgICAgICBwYXRoczogJ2V4YWN0JyxcbiAgICAgICAgICBleGFjdDogZmFsc2VcbiAgICAgICAgfVwiXG4gICAgICAgIHJvdXRlckxpbmtBY3RpdmU9XCJhZGV2LWZhY2V0ZWQtbGlzdC1pdGVtLWFjdGl2ZVwiXG4gICAgICAgIChjbGljayk9XCJlbWl0Q2xpY2tPbkxpbmsoKVwiXG4gICAgICA+XG4gICAgICAgIDxzcGFuPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XG4gICAgICAgIEBpZiAoaXRlbS5jaGlsZHJlbiAmJiAhaXRlbS5pc0V4cGFuZGVkKSB7XG4gICAgICAgIDxkb2NzLWljb24+Y2hldnJvbl9yaWdodDwvZG9jcy1pY29uPlxuICAgICAgICB9XG4gICAgICA8L2E+XG4gICAgICB9IH0gQGVsc2Uge1xuICAgICAgPCEtLSBOYXYgU2VjdGlvbiBIZWFkZXIgLS0+XG4gICAgICBAaWYgKGl0ZW0ubGV2ZWwgIT09IGNvbGxhcHNhYmxlTGV2ZWwgJiYgaXRlbS5sZXZlbCAhPT0gZXhwYW5kYWJsZUxldmVsKSB7XG4gICAgICA8ZGl2IGNsYXNzPVwiYWRldi1zZWNvbmRhcnktbmF2LWhlYWRlclwiPlxuICAgICAgICA8c3Bhbj57eyBpdGVtLmxhYmVsIH19PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB9XG5cbiAgICAgIDwhLS0gTmF2IEJ1dHRvbiBFeHBhbmQvQ29sbGFwc2UgLS0+XG4gICAgICBAaWYgKChpdGVtLmNoaWxkcmVuICYmIGl0ZW0ubGV2ZWwgPT09IGV4cGFuZGFibGVMZXZlbCkgfHwgaXRlbS5sZXZlbCA9PT0gY29sbGFwc2FibGVMZXZlbCkge1xuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgKGNsaWNrKT1cInRvZ2dsZShpdGVtKVwiXG4gICAgICAgIGF0dHIuYXJpYS1sYWJlbD1cInt7IGl0ZW0uaXNFeHBhbmRlZCA/ICdDb2xsYXBzZScgOiAnRXhwYW5kJyB9fSB7eyBpdGVtLmxhYmVsIH19XCJcbiAgICAgICAgW2F0dHIuYXJpYS1leHBhbmRlZF09XCJpdGVtLmlzRXhwYW5kZWRcIlxuICAgICAgICBjbGFzcz1cImFkZXYtc2Vjb25kYXJ5LW5hdi1idXR0b25cIlxuICAgICAgICBbY2xhc3MuYWRldi1mYWNldGVkLWxpc3QtaXRlbS1hY3RpdmVdPVwiaXRlbSB8IGlzQWN0aXZlTmF2aWdhdGlvbkl0ZW06IGFjdGl2ZUl0ZW0oKVwiXG4gICAgICAgIFtjbGFzcy5hZGV2LWV4cGFuZGVkLWJ1dHRvbl09XCJpdGVtLmNoaWxkcmVuICYmIGl0ZW0ubGV2ZWwgPT0gY29sbGFwc2FibGVMZXZlbFwiXG4gICAgICAgIFtjbGFzcy5hZGV2LW5vdC1leHBhbmRlZC1idXR0b25dPVwiaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmxldmVsID09PSBleHBhbmRhYmxlTGV2ZWxcIlxuICAgICAgICBbY2xhc3MuYWRldi1uYXYtaXRlbS1oYXMtaWNvbl09XCJcbiAgICAgICAgICBpdGVtLmNoaWxkcmVuICYmIGl0ZW0ubGV2ZWwgPT09IGV4cGFuZGFibGVMZXZlbCAmJiAhaXRlbS5pc0V4cGFuZGVkXG4gICAgICAgIFwiXG4gICAgICA+XG4gICAgICAgIEBpZiAoaXRlbS5jaGlsZHJlbiAmJiBpdGVtLmxldmVsID09PSBjb2xsYXBzYWJsZUxldmVsKSB7XG4gICAgICAgIDxkb2NzLWljb24+YXJyb3dfYmFjazwvZG9jcy1pY29uPlxuICAgICAgICB9XG4gICAgICAgIDxzcGFuPnt7IGl0ZW0ubGFiZWwgfX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIH0gfSBAaWYgKGl0ZW0uY2hpbGRyZW4/Lmxlbmd0aCA+IDApIHtcbiAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuYXZpZ2F0aW9uTGlzdDsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbS5jaGlsZHJlbn1cIlxuICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgfVxuICAgIDwvbGk+XG4gICAgfVxuICA8L3VsPlxuPC9uZy10ZW1wbGF0ZT5cblxuPG5nLWNvbnRhaW5lclxuICAqbmdUZW1wbGF0ZU91dGxldD1cIm5hdmlnYXRpb25MaXN0OyBjb250ZXh0OiB7JGltcGxpY2l0OiBuYXZpZ2F0aW9uSXRlbXN9XCJcbj48L25nLWNvbnRhaW5lcj5cbiJdfQ==