/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, DestroyRef, ElementRef, EventEmitter, NgZone, Output, QueryList, ViewChild, ViewChildren, inject, } from '@angular/core';
import { WINDOW } from '../../providers/index.js';
import { ClickOutside } from '../../directives/index.js';
import { Search } from '../../services/index.js';
import { TextField } from '../text-field/text-field.component.js';
import { FormsModule } from '@angular/forms';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SearchItem } from '../../directives/search-item/search-item.directive.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { filter, fromEvent } from 'rxjs';
import { AlgoliaIcon } from '../algolia-icon/algolia-icon.component.js';
import { RelativeLink } from '../../pipes/relative-link.pipe.js';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _c0 = ["searchDialog"];
const _forTrack1 = ($index, $item) => $item.objectID;
function SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "i", 15);
    i0.ɵɵtext(1, " description ");
    i0.ɵɵelementEnd();
} }
function SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "i", 15);
    i0.ɵɵtext(1, "code");
    i0.ɵɵelementEnd();
} }
function SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "i", 15);
    i0.ɵɵtext(1, " description ");
    i0.ɵɵelementEnd();
} }
function SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r4 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl2, " ");
} }
function SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r4 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl3, " ");
} }
function SearchDialog_Conditional_4_For_2_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 7);
    i0.ɵɵpipe(1, "relativeLink");
    i0.ɵɵpipe(2, "relativeLink");
    i0.ɵɵelementStart(3, "div")(4, "div", 8)(5, "span", 9);
    i0.ɵɵtemplate(6, SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_6_Template, 2, 0, "i", 10)(7, SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_7_Template, 2, 0)(8, SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_8_Template, 2, 0);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 11);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(11, SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_11_Template, 2, 1, "span", 12)(12, SearchDialog_Conditional_4_For_2_Conditional_1_Conditional_12_Template, 2, 1, "span", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 14);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpipeBind2(1, 7, "/" + result_r4.url, "pathname"))("fragment", i0.ɵɵpipeBind2(2, 10, result_r4.url, "hash"));
    i0.ɵɵadvance(6);
    i0.ɵɵconditional(6, (result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl0) === "Docs" ? 6 : (result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl0) === "Tutorials" ? 7 : (result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl0) === "Reference" ? 8 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl1);
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(11, (result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl2) && !(result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl3) ? 11 : -1);
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(12, (result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl3) ? 12 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(result_r4.hierarchy == null ? null : result_r4.hierarchy.lvl0);
} }
function SearchDialog_Conditional_4_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 6);
    i0.ɵɵtemplate(1, SearchDialog_Conditional_4_For_2_Conditional_1_Template, 15, 13, "a", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r4 = ctx.$implicit;
    i0.ɵɵproperty("item", result_r4);
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, result_r4.url ? 1 : -1);
} }
function SearchDialog_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 5);
    i0.ɵɵrepeaterCreate(1, SearchDialog_Conditional_4_For_2_Template, 2, 2, "li", 6, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵrepeater(ctx_r1.searchResults());
} }
function SearchDialog_Conditional_5_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "span");
    i0.ɵɵtext(2, "Start typing to see results");
    i0.ɵɵelementEnd()();
} }
function SearchDialog_Conditional_5_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "span");
    i0.ɵɵtext(2, "No results found");
    i0.ɵɵelementEnd()();
} }
function SearchDialog_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtemplate(1, SearchDialog_Conditional_5_Conditional_1_Template, 3, 0, "div", 18)(2, SearchDialog_Conditional_5_Conditional_2_Template, 3, 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    let tmp_1_0;
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, ctx_r2.searchResults() === undefined ? 1 : ((tmp_1_0 = ctx_r2.searchResults()) == null ? null : tmp_1_0.length) === 0 ? 2 : -1);
} }
export class SearchDialog {
    constructor() {
        this.onClose = new EventEmitter();
        this.destroyRef = inject(DestroyRef);
        this.ngZone = inject(NgZone);
        this.search = inject(Search);
        this.relativeLink = new RelativeLink();
        this.router = inject(Router);
        this.window = inject(WINDOW);
        this.searchQuery = this.search.searchQuery;
        this.searchResults = this.search.searchResults;
    }
    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.window, 'keydown')
                .pipe(filter((_) => !!this.keyManager), takeUntilDestroyed(this.destroyRef))
                .subscribe((event) => {
                // When user presses Enter we can navigate to currently selected item in the search result list.
                if (event.key === 'Enter') {
                    this.navigateToTheActiveItem();
                }
                else {
                    this.ngZone.run(() => {
                        this.keyManager?.onKeydown(event);
                    });
                }
            });
        });
    }
    ngAfterViewInit() {
        this.dialog?.nativeElement.showModal?.();
        if (!this.items) {
            return;
        }
        this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
        this.keyManager?.setFirstItemActive();
        this.updateActiveItemWhenResultsChanged();
        this.scrollToActiveItem();
    }
    ngOnDestroy() {
        this.keyManager?.destroy();
    }
    closeSearchDialog() {
        this.dialog?.nativeElement.close();
        this.onClose.next();
    }
    updateSearchQuery(query) {
        this.search.updateSearchQuery(query);
    }
    updateActiveItemWhenResultsChanged() {
        this.items?.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            // Change detection should be run before execute `setFirstItemActive`.
            Promise.resolve().then(() => {
                this.keyManager?.setFirstItemActive();
            });
        });
    }
    navigateToTheActiveItem() {
        const activeItemLink = this.keyManager?.activeItem?.item?.url;
        if (!activeItemLink) {
            return;
        }
        this.router.navigateByUrl(this.relativeLink.transform(activeItemLink));
        this.onClose.next();
    }
    scrollToActiveItem() {
        this.keyManager?.change.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.keyManager?.activeItem?.scrollIntoView();
        });
    }
}
SearchDialog.ɵfac = function SearchDialog_Factory(t) { return new (t || SearchDialog)(); };
SearchDialog.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchDialog, selectors: [["docs-search-dialog"]], viewQuery: function SearchDialog_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
        i0.ɵɵviewQuery(SearchItem, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialog = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.items = _t);
    } }, outputs: { onClose: "onClose" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 10, vars: 4, consts: [["searchDialog", ""], [1, "adev-search-container", 3, "docsClickOutside"], ["placeholder", "Search docs", 1, "adev-search-input", 3, "autofocus", "hideIcon", "ngModel", "ngModelChange"], ["class", "adev-search-results adev-mini-scroll-track"], [1, "adev-algolia"], [1, "adev-search-results", "adev-mini-scroll-track"], ["docsSearchItem", "", 3, "item"], [3, "routerLink", "fragment"], [1, "adev-result-icon-and-type"], ["aria-hidden", "true", 1, "adev-search-result-icon"], ["role", "presentation", "class", "material-symbols-outlined docs-icon-small"], [1, "adev-search-results__type"], ["class", "adev-search-results__type adev-search-results__lvl2"], ["class", "adev-search-results__type adev-search-results__lvl3"], [1, "adev-result-page-title"], ["role", "presentation", 1, "material-symbols-outlined", "docs-icon-small"], [1, "adev-search-results__type", "adev-search-results__lvl2"], [1, "adev-search-results__type", "adev-search-results__lvl3"], ["class", "adev-search-results__no-results"], [1, "adev-search-results__no-results"]], template: function SearchDialog_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "dialog", null, 0)(2, "div", 1);
        i0.ɵɵlistener("docsClickOutside", function SearchDialog_Template_div_docsClickOutside_2_listener() { return ctx.closeSearchDialog(); });
        i0.ɵɵelementStart(3, "docs-text-field", 2);
        i0.ɵɵlistener("ngModelChange", function SearchDialog_Template_docs_text_field_ngModelChange_3_listener($event) { return ctx.updateSearchQuery($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, SearchDialog_Conditional_4_Template, 3, 0, "ul", 3)(5, SearchDialog_Conditional_5_Template, 3, 1);
        i0.ɵɵelementStart(6, "div", 4)(7, "span");
        i0.ɵɵtext(8, "Search by");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(9, "docs-algolia-icon");
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("autofocus", true)("hideIcon", true)("ngModel", ctx.searchQuery());
        i0.ɵɵadvance(1);
        i0.ɵɵconditional(4, ctx.searchResults() && ctx.searchResults().length > 0 ? 4 : 5);
    } }, dependencies: [ClickOutside,
        TextField,
        FormsModule, i1.NgControlStatus, i1.NgModel, SearchItem,
        AlgoliaIcon,
        RelativeLink,
        RouterLink], styles: ["dialog[_ngcontent-%COMP%]{background-color:rgba(0,0,0,0);border:none;padding-block-end:3rem}dialog[_ngcontent-%COMP%]::backdrop{backdrop-filter:blur(5px)}.adev-search-container[_ngcontent-%COMP%]{width:500px;max-width:90vw;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;box-sizing:border-box}.adev-search-container[_ngcontent-%COMP%]   .adev-search-input[_ngcontent-%COMP%]{border-radius:.25rem .25rem 0 0;border:none;border-block-end:1px solid var(--senary-contrast);height:2.6875rem;padding-inline-start:1rem;position:relative}.adev-search-container[_ngcontent-%COMP%]   .adev-search-input[_ngcontent-%COMP%]::after{content:\"Esc\";position:absolute;right:1rem;color:var(--gray-400);font-size:.875rem}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{max-height:260px;overflow-y:auto;list-style-type:none;padding-inline:0;padding-block-start:1rem;margin:0}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-inline-start:2px solid var(--senary-contrast);margin-inline-start:1rem;padding-inline-end:1rem;padding-block:.25rem}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--secondary-contrast);display:flex;justify-content:space-between;gap:.5rem}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .adev-search-result-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{display:flex;align-items:center;font-size:1.2rem}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]{background-color:var(--septenary-contrast)}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover, .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]{background-color:var(--octonary-contrast);border-inline-start:2px solid var(--primary-contrast)}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not(.adev-result-page-title), .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]   .adev-search-results__type[_ngcontent-%COMP%], .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not(.adev-result-page-title), .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .adev-search-results__type[_ngcontent-%COMP%]{color:var(--primary-contrast)}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not(.adev-result-page-title)   i[_ngcontent-%COMP%], .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]   .adev-search-results__type[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:not(.adev-result-page-title)   i[_ngcontent-%COMP%], .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li.active[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .adev-search-results__type[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{color:var(--primary-contrast)}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .adev-search-result-icon[_ngcontent-%COMP%], .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .adev-search-results__type[_ngcontent-%COMP%], .adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .adev-result-page-title[_ngcontent-%COMP%]{color:var(--quaternary-contrast);display:inline-block;font-size:.875rem;transition:color .3s ease;padding:.75rem;padding-inline-end:0}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .adev-search-results__lvl2[_ngcontent-%COMP%]{display:inline-block;margin-inline-start:2rem;padding-block-start:0}.adev-search-container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   .adev-search-results__lvl3[_ngcontent-%COMP%]{margin-inline-start:2rem;padding-block-start:0}.adev-search-container[_ngcontent-%COMP%]   .adev-result-page-title[_ngcontent-%COMP%]{font-size:.875rem;font-weight:400}.adev-search-results__no-results[_ngcontent-%COMP%]{padding:.75rem;color:var(--gray-400)}.adev-result-icon-and-type[_ngcontent-%COMP%]{display:flex}.adev-result-icon-and-type[_ngcontent-%COMP%]   .adev-search-results__type[_ngcontent-%COMP%]{padding-inline-start:0}.adev-algolia[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:end;color:var(--gray-400);padding:1rem;font-size:.75rem;font-weight:500;gap:.25rem;background-color:var(--page-background);border-radius:0 0 .25rem .25rem}.adev-algolia[_ngcontent-%COMP%]   docs-algolia-icon[_ngcontent-%COMP%]{margin-block-start:.12rem;margin-inline-start:.15rem;width:4rem}/*# sourceMappingURL=search-dialog.component.css.map */"] });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchDialog, [{
        type: Component,
        args: [{ selector: 'docs-search-dialog', standalone: true, imports: [
                    ClickOutside,
                    TextField,
                    FormsModule,
                    SearchItem,
                    AlgoliaIcon,
                    RelativeLink,
                    RouterLink,
                ], template: "<dialog #searchDialog>\n  <div class=\"adev-search-container\" (docsClickOutside)=\"closeSearchDialog()\">\n    <docs-text-field\n      [autofocus]=\"true\"\n      [hideIcon]=\"true\"\n      [ngModel]=\"searchQuery()\"\n      (ngModelChange)=\"updateSearchQuery($event)\"\n      class=\"adev-search-input\"\n      placeholder=\"Search docs\"\n    ></docs-text-field>\n\n    @if (searchResults() && searchResults()!.length > 0) {\n    <ul class=\"adev-search-results adev-mini-scroll-track\">\n      @for (result of searchResults(); track result.objectID) {\n      <li docsSearchItem [item]=\"result\">\n        @if (result.url) {\n          <a [routerLink]=\"'/' + result.url | relativeLink: 'pathname'\" [fragment]=\"result.url | relativeLink: 'hash'\">\n            <div>\n              <div class=\"adev-result-icon-and-type\">\n                <!-- Icon -->\n                <span class=\"adev-search-result-icon\" aria-hidden=\"true\">\n                  @if (result.hierarchy?.lvl0 === 'Docs') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">\n                    description\n                  </i>\n                  } @else if (result.hierarchy?.lvl0 === 'Tutorials') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">code</i>\n                  } @else if (result.hierarchy?.lvl0 === 'Reference') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">\n                    description\n                  </i>\n                  }\n                </span>\n                <!-- Results type -->\n                <span class=\"adev-search-results__type\">{{ result.hierarchy?.lvl1 }}</span>\n              </div>\n\n              <!-- Hide level 2 if level 3 exists -->\n              <!-- Level 2 -->\n              @if (result.hierarchy?.lvl2 && !result.hierarchy?.lvl3) {\n              <span class=\"adev-search-results__type adev-search-results__lvl2\">\n                {{ result.hierarchy?.lvl2 }}\n              </span>\n              }\n              <!-- Level 3 -->\n              @if (result.hierarchy?.lvl3) {\n              <span class=\"adev-search-results__type adev-search-results__lvl3\">\n                {{ result.hierarchy?.lvl3 }}\n              </span>\n              }\n            </div>\n\n            <!-- Page title -->\n            <span class=\"adev-result-page-title\">{{ result.hierarchy?.lvl0 }}</span>\n          </a>\n        }\n      </li>\n      }\n    </ul>\n    } @else {\n    <div class=\"adev-search-results adev-mini-scroll-track\">\n      @if (searchResults() === undefined) {\n      <div class=\"adev-search-results__no-results\">\n        <span>Start typing to see results</span>\n      </div>\n      } @else if (searchResults()?.length === 0) {\n      <div class=\"adev-search-results__no-results\">\n        <span>No results found</span>\n      </div>\n      }\n    </div>\n    }\n\n    <div class=\"adev-algolia\">\n      <span>Search by</span>\n      <docs-algolia-icon />\n    </div>\n  </div>\n</dialog>\n", styles: ["dialog{background-color:rgba(0,0,0,0);border:none;padding-block-end:3rem}dialog::backdrop{backdrop-filter:blur(5px)}.adev-search-container{width:500px;max-width:90vw;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;box-sizing:border-box}.adev-search-container .adev-search-input{border-radius:.25rem .25rem 0 0;border:none;border-block-end:1px solid var(--senary-contrast);height:2.6875rem;padding-inline-start:1rem;position:relative}.adev-search-container .adev-search-input::after{content:\"Esc\";position:absolute;right:1rem;color:var(--gray-400);font-size:.875rem}.adev-search-container ul{max-height:260px;overflow-y:auto;list-style-type:none;padding-inline:0;padding-block-start:1rem;margin:0}.adev-search-container ul li{border-inline-start:2px solid var(--senary-contrast);margin-inline-start:1rem;padding-inline-end:1rem;padding-block:.25rem}.adev-search-container ul li a{color:var(--secondary-contrast);display:flex;justify-content:space-between;gap:.5rem}.adev-search-container ul li a .adev-search-result-icon i{display:flex;align-items:center;font-size:1.2rem}.adev-search-container ul li.active{background-color:var(--septenary-contrast)}.adev-search-container ul li:hover,.adev-search-container ul li.active{background-color:var(--octonary-contrast);border-inline-start:2px solid var(--primary-contrast)}.adev-search-container ul li:hover a span:not(.adev-result-page-title),.adev-search-container ul li:hover a .adev-search-results__type,.adev-search-container ul li.active a span:not(.adev-result-page-title),.adev-search-container ul li.active a .adev-search-results__type{color:var(--primary-contrast)}.adev-search-container ul li:hover a span:not(.adev-result-page-title) i,.adev-search-container ul li:hover a .adev-search-results__type i,.adev-search-container ul li.active a span:not(.adev-result-page-title) i,.adev-search-container ul li.active a .adev-search-results__type i{color:var(--primary-contrast)}.adev-search-container ul .adev-search-result-icon,.adev-search-container ul .adev-search-results__type,.adev-search-container ul .adev-result-page-title{color:var(--quaternary-contrast);display:inline-block;font-size:.875rem;transition:color .3s ease;padding:.75rem;padding-inline-end:0}.adev-search-container ul .adev-search-results__lvl2{display:inline-block;margin-inline-start:2rem;padding-block-start:0}.adev-search-container ul .adev-search-results__lvl3{margin-inline-start:2rem;padding-block-start:0}.adev-search-container .adev-result-page-title{font-size:.875rem;font-weight:400}.adev-search-results__no-results{padding:.75rem;color:var(--gray-400)}.adev-result-icon-and-type{display:flex}.adev-result-icon-and-type .adev-search-results__type{padding-inline-start:0}.adev-algolia{display:flex;align-items:center;justify-content:end;color:var(--gray-400);padding:1rem;font-size:.75rem;font-weight:500;gap:.25rem;background-color:var(--page-background);border-radius:0 0 .25rem .25rem}.adev-algolia docs-algolia-icon{margin-block-start:.12rem;margin-inline-start:.15rem;width:4rem}/*# sourceMappingURL=search-dialog.component.css.map */\n"] }]
    }], null, { onClose: [{
            type: Output
        }], dialog: [{
            type: ViewChild,
            args: ['searchDialog']
        }], items: [{
            type: ViewChildren,
            args: [SearchItem]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SearchDialog, { className: "SearchDialog", filePath: "docs/components/search-dialog/search-dialog.component.ts", lineNumber: 54 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvc2VhcmNoLWRpYWxvZy9zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWFyY2gtZGlhbG9nL3NlYXJjaC1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBR04sTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUUvQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDaEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx1REFBdUQsQ0FBQztBQUNqRixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0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MkJBQ0Usb0JBQW9CLGNBQ2xCLElBQUksV0FDUDtvQkFDUCxZQUFZO29CQUNaLFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxVQUFVO29CQUNWLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWixVQUFVO2lCQUNYO2dCQUtTLE9BQU87a0JBQWhCLE1BQU07WUFDb0IsTUFBTTtrQkFBaEMsU0FBUzttQkFBQyxjQUFjO1lBQ0MsS0FBSztrQkFBOUIsWUFBWTttQkFBQyxVQUFVOztrRkFIYixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIERlc3Ryb3lSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1dJTkRPV30gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2luZGV4LmpzJztcbmltcG9ydCB7Q2xpY2tPdXRzaWRlfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2luZGV4LmpzJztcbmltcG9ydCB7U2VhcmNofSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9pbmRleC5qcyc7XG5cbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICcuLi90ZXh0LWZpZWxkL3RleHQtZmllbGQuY29tcG9uZW50LmpzJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXJ9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7U2VhcmNoSXRlbX0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9zZWFyY2gtaXRlbS9zZWFyY2gtaXRlbS5kaXJlY3RpdmUuanMnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7Um91dGVyLCBSb3V0ZXJMaW5rfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtmaWx0ZXIsIGZyb21FdmVudH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0FsZ29saWFJY29ufSBmcm9tICcuLi9hbGdvbGlhLWljb24vYWxnb2xpYS1pY29uLmNvbXBvbmVudC5qcyc7XG5pbXBvcnQge1JlbGF0aXZlTGlua30gZnJvbSAnLi4vLi4vcGlwZXMvcmVsYXRpdmUtbGluay5waXBlLmpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jcy1zZWFyY2gtZGlhbG9nJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENsaWNrT3V0c2lkZSxcbiAgICBUZXh0RmllbGQsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgU2VhcmNoSXRlbSxcbiAgICBBbGdvbGlhSWNvbixcbiAgICBSZWxhdGl2ZUxpbmssXG4gICAgUm91dGVyTGluayxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaERpYWxvZyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIG9uQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaERpYWxvZycpIGRpYWxvZz86IEVsZW1lbnRSZWY8SFRNTERpYWxvZ0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkcmVuKFNlYXJjaEl0ZW0pIGl0ZW1zPzogUXVlcnlMaXN0PFNlYXJjaEl0ZW0+O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzZWFyY2ggPSBpbmplY3QoU2VhcmNoKTtcbiAgcHJpdmF0ZSByZWFkb25seSByZWxhdGl2ZUxpbmsgPSBuZXcgUmVsYXRpdmVMaW5rKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luZG93ID0gaW5qZWN0KFdJTkRPVyk7XG5cbiAgcHJpdmF0ZSBrZXlNYW5hZ2VyPzogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8U2VhcmNoSXRlbT47XG5cbiAgc2VhcmNoUXVlcnkgPSB0aGlzLnNlYXJjaC5zZWFyY2hRdWVyeTtcbiAgc2VhcmNoUmVzdWx0cyA9IHRoaXMuc2VhcmNoLnNlYXJjaFJlc3VsdHM7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMud2luZG93LCAna2V5ZG93bicpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoXykgPT4gISF0aGlzLmtleU1hbmFnZXIpLFxuICAgICAgICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgLy8gV2hlbiB1c2VyIHByZXNzZXMgRW50ZXIgd2UgY2FuIG5hdmlnYXRlIHRvIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtIGluIHRoZSBzZWFyY2ggcmVzdWx0IGxpc3QuXG4gICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvVGhlQWN0aXZlSXRlbSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXI/Lm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuZGlhbG9nPy5uYXRpdmVFbGVtZW50LnNob3dNb2RhbD8uKCk7XG5cbiAgICBpZiAoIXRoaXMuaXRlbXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIodGhpcy5pdGVtcykud2l0aFdyYXAoKTtcbiAgICB0aGlzLmtleU1hbmFnZXI/LnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuXG4gICAgdGhpcy51cGRhdGVBY3RpdmVJdGVtV2hlblJlc3VsdHNDaGFuZ2VkKCk7XG4gICAgdGhpcy5zY3JvbGxUb0FjdGl2ZUl0ZW0oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMua2V5TWFuYWdlcj8uZGVzdHJveSgpO1xuICB9XG5cbiAgY2xvc2VTZWFyY2hEaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2c/Lm5hdGl2ZUVsZW1lbnQuY2xvc2UoKTtcbiAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICB9XG5cbiAgdXBkYXRlU2VhcmNoUXVlcnkocXVlcnk6IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoLnVwZGF0ZVNlYXJjaFF1ZXJ5KHF1ZXJ5KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQWN0aXZlSXRlbVdoZW5SZXN1bHRzQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1zPy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZikpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBDaGFuZ2UgZGV0ZWN0aW9uIHNob3VsZCBiZSBydW4gYmVmb3JlIGV4ZWN1dGUgYHNldEZpcnN0SXRlbUFjdGl2ZWAuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyPy5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBuYXZpZ2F0ZVRvVGhlQWN0aXZlSXRlbSgpOiB2b2lkIHtcbiAgICBjb25zdCBhY3RpdmVJdGVtTGluazogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5rZXlNYW5hZ2VyPy5hY3RpdmVJdGVtPy5pdGVtPy51cmw7XG5cbiAgICBpZiAoIWFjdGl2ZUl0ZW1MaW5rKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnJlbGF0aXZlTGluay50cmFuc2Zvcm0oYWN0aXZlSXRlbUxpbmspKTtcbiAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUb0FjdGl2ZUl0ZW0oKTogdm9pZCB7XG4gICAgdGhpcy5rZXlNYW5hZ2VyPy5jaGFuZ2UucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMua2V5TWFuYWdlcj8uYWN0aXZlSXRlbT8uc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGRpYWxvZyAjc2VhcmNoRGlhbG9nPlxuICA8ZGl2IGNsYXNzPVwiYWRldi1zZWFyY2gtY29udGFpbmVyXCIgKGRvY3NDbGlja091dHNpZGUpPVwiY2xvc2VTZWFyY2hEaWFsb2coKVwiPlxuICAgIDxkb2NzLXRleHQtZmllbGRcbiAgICAgIFthdXRvZm9jdXNdPVwidHJ1ZVwiXG4gICAgICBbaGlkZUljb25dPVwidHJ1ZVwiXG4gICAgICBbbmdNb2RlbF09XCJzZWFyY2hRdWVyeSgpXCJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZVNlYXJjaFF1ZXJ5KCRldmVudClcIlxuICAgICAgY2xhc3M9XCJhZGV2LXNlYXJjaC1pbnB1dFwiXG4gICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBkb2NzXCJcbiAgICA+PC9kb2NzLXRleHQtZmllbGQ+XG5cbiAgICBAaWYgKHNlYXJjaFJlc3VsdHMoKSAmJiBzZWFyY2hSZXN1bHRzKCkhLmxlbmd0aCA+IDApIHtcbiAgICA8dWwgY2xhc3M9XCJhZGV2LXNlYXJjaC1yZXN1bHRzIGFkZXYtbWluaS1zY3JvbGwtdHJhY2tcIj5cbiAgICAgIEBmb3IgKHJlc3VsdCBvZiBzZWFyY2hSZXN1bHRzKCk7IHRyYWNrIHJlc3VsdC5vYmplY3RJRCkge1xuICAgICAgPGxpIGRvY3NTZWFyY2hJdGVtIFtpdGVtXT1cInJlc3VsdFwiPlxuICAgICAgICBAaWYgKHJlc3VsdC51cmwpIHtcbiAgICAgICAgICA8YSBbcm91dGVyTGlua109XCInLycgKyByZXN1bHQudXJsIHwgcmVsYXRpdmVMaW5rOiAncGF0aG5hbWUnXCIgW2ZyYWdtZW50XT1cInJlc3VsdC51cmwgfCByZWxhdGl2ZUxpbms6ICdoYXNoJ1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFkZXYtcmVzdWx0LWljb24tYW5kLXR5cGVcIj5cbiAgICAgICAgICAgICAgICA8IS0tIEljb24gLS0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGV2LXNlYXJjaC1yZXN1bHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgQGlmIChyZXN1bHQuaGllcmFyY2h5Py5sdmwwID09PSAnRG9jcycpIHtcbiAgICAgICAgICAgICAgICAgIDxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgZG9jcy1pY29uLXNtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICA8L2k+XG4gICAgICAgICAgICAgICAgICB9IEBlbHNlIGlmIChyZXN1bHQuaGllcmFyY2h5Py5sdmwwID09PSAnVHV0b3JpYWxzJykge1xuICAgICAgICAgICAgICAgICAgPGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCBkb2NzLWljb24tc21hbGxcIj5jb2RlPC9pPlxuICAgICAgICAgICAgICAgICAgfSBAZWxzZSBpZiAocmVzdWx0LmhpZXJhcmNoeT8ubHZsMCA9PT0gJ1JlZmVyZW5jZScpIHtcbiAgICAgICAgICAgICAgICAgIDxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgZG9jcy1pY29uLXNtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICA8L2k+XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwhLS0gUmVzdWx0cyB0eXBlIC0tPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWRldi1zZWFyY2gtcmVzdWx0c19fdHlwZVwiPnt7IHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDEgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDwhLS0gSGlkZSBsZXZlbCAyIGlmIGxldmVsIDMgZXhpc3RzIC0tPlxuICAgICAgICAgICAgICA8IS0tIExldmVsIDIgLS0+XG4gICAgICAgICAgICAgIEBpZiAocmVzdWx0LmhpZXJhcmNoeT8ubHZsMiAmJiAhcmVzdWx0LmhpZXJhcmNoeT8ubHZsMykge1xuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZXYtc2VhcmNoLXJlc3VsdHNfX3R5cGUgYWRldi1zZWFyY2gtcmVzdWx0c19fbHZsMlwiPlxuICAgICAgICAgICAgICAgIHt7IHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDIgfX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwhLS0gTGV2ZWwgMyAtLT5cbiAgICAgICAgICAgICAgQGlmIChyZXN1bHQuaGllcmFyY2h5Py5sdmwzKSB7XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWRldi1zZWFyY2gtcmVzdWx0c19fdHlwZSBhZGV2LXNlYXJjaC1yZXN1bHRzX19sdmwzXCI+XG4gICAgICAgICAgICAgICAge3sgcmVzdWx0LmhpZXJhcmNoeT8ubHZsMyB9fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8IS0tIFBhZ2UgdGl0bGUgLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZXYtcmVzdWx0LXBhZ2UtdGl0bGVcIj57eyByZXN1bHQuaGllcmFyY2h5Py5sdmwwIH19PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgfVxuICAgICAgPC9saT5cbiAgICAgIH1cbiAgICA8L3VsPlxuICAgIH0gQGVsc2Uge1xuICAgIDxkaXYgY2xhc3M9XCJhZGV2LXNlYXJjaC1yZXN1bHRzIGFkZXYtbWluaS1zY3JvbGwtdHJhY2tcIj5cbiAgICAgIEBpZiAoc2VhcmNoUmVzdWx0cygpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIDxkaXYgY2xhc3M9XCJhZGV2LXNlYXJjaC1yZXN1bHRzX19uby1yZXN1bHRzXCI+XG4gICAgICAgIDxzcGFuPlN0YXJ0IHR5cGluZyB0byBzZWUgcmVzdWx0czwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgfSBAZWxzZSBpZiAoc2VhcmNoUmVzdWx0cygpPy5sZW5ndGggPT09IDApIHtcbiAgICAgIDxkaXYgY2xhc3M9XCJhZGV2LXNlYXJjaC1yZXN1bHRzX19uby1yZXN1bHRzXCI+XG4gICAgICAgIDxzcGFuPk5vIHJlc3VsdHMgZm91bmQ8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgICB9XG5cbiAgICA8ZGl2IGNsYXNzPVwiYWRldi1hbGdvbGlhXCI+XG4gICAgICA8c3Bhbj5TZWFyY2ggYnk8L3NwYW4+XG4gICAgICA8ZG9jcy1hbGdvbGlhLWljb24gLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2RpYWxvZz5cbiJdfQ==