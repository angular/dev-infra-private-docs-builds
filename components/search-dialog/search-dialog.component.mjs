/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, DestroyRef, ElementRef, EventEmitter, NgZone, Output, QueryList, ViewChild, ViewChildren, inject, } from '@angular/core';
import { WINDOW } from '../../providers';
import { ClickOutside } from '../../directives';
import { Search } from '../../services';
import { TextField } from '../text-field/text-field.component';
import { FormsModule } from '@angular/forms';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SearchItem } from '../../directives/search-item/search-item.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { filter, fromEvent } from 'rxjs';
import { AlgoliaIcon } from '../algolia-icon/algolia-icon.component';
import { RelativeLink } from '../../pipes/relative-link.pipe';
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
        this.dialog?.nativeElement.showModal();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvc2VhcmNoLWRpYWxvZy9zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWFyY2gtZGlhbG9nL3NlYXJjaC1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBR04sTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDN0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUM5RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUNu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LG9CQUFvQixjQUNsQixJQUFJLFdBQ1A7b0JBQ1AsWUFBWTtvQkFDWixTQUFTO29CQUNULFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixXQUFXO29CQUNYLFlBQVk7b0JBQ1osVUFBVTtpQkFDWDtnQkFLUyxPQUFPO2tCQUFoQixNQUFNO1lBQ29CLE1BQU07a0JBQWhDLFNBQVM7bUJBQUMsY0FBYztZQUNDLEtBQUs7a0JBQTlCLFlBQVk7bUJBQUMsVUFBVTs7a0ZBSGIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtXSU5ET1d9IGZyb20gJy4uLy4uL3Byb3ZpZGVycyc7XG5pbXBvcnQge0NsaWNrT3V0c2lkZX0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQge1NlYXJjaH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnLi4vdGV4dC1maWVsZC90ZXh0LWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0FjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1NlYXJjaEl0ZW19IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvc2VhcmNoLWl0ZW0vc2VhcmNoLWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge1JvdXRlciwgUm91dGVyTGlua30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7ZmlsdGVyLCBmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBbGdvbGlhSWNvbn0gZnJvbSAnLi4vYWxnb2xpYS1pY29uL2FsZ29saWEtaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtSZWxhdGl2ZUxpbmt9IGZyb20gJy4uLy4uL3BpcGVzL3JlbGF0aXZlLWxpbmsucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3Mtc2VhcmNoLWRpYWxvZycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDbGlja091dHNpZGUsXG4gICAgVGV4dEZpZWxkLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFNlYXJjaEl0ZW0sXG4gICAgQWxnb2xpYUljb24sXG4gICAgUmVsYXRpdmVMaW5rLFxuICAgIFJvdXRlckxpbmssXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAVmlld0NoaWxkKCdzZWFyY2hEaWFsb2cnKSBkaWFsb2c/OiBFbGVtZW50UmVmPEhUTUxEaWFsb2dFbGVtZW50PjtcbiAgQFZpZXdDaGlsZHJlbihTZWFyY2hJdGVtKSBpdGVtcz86IFF1ZXJ5TGlzdDxTZWFyY2hJdGVtPjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgbmdab25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VhcmNoID0gaW5qZWN0KFNlYXJjaCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVsYXRpdmVMaW5rID0gbmV3IFJlbGF0aXZlTGluaygpO1xuICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlciA9IGluamVjdChSb3V0ZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbmRvdyA9IGluamVjdChXSU5ET1cpO1xuXG4gIHByaXZhdGUga2V5TWFuYWdlcj86IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPFNlYXJjaEl0ZW0+O1xuXG4gIHNlYXJjaFF1ZXJ5ID0gdGhpcy5zZWFyY2guc2VhcmNoUXVlcnk7XG4gIHNlYXJjaFJlc3VsdHMgPSB0aGlzLnNlYXJjaC5zZWFyY2hSZXN1bHRzO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLndpbmRvdywgJ2tleWRvd24nKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKF8pID0+ICEhdGhpcy5rZXlNYW5hZ2VyKSxcbiAgICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgIC8vIFdoZW4gdXNlciBwcmVzc2VzIEVudGVyIHdlIGNhbiBuYXZpZ2F0ZSB0byBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSBpbiB0aGUgc2VhcmNoIHJlc3VsdCBsaXN0LlxuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb1RoZUFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyPy5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmRpYWxvZz8ubmF0aXZlRWxlbWVudC5zaG93TW9kYWwoKTtcblxuICAgIGlmICghdGhpcy5pdGVtcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMua2V5TWFuYWdlciA9IG5ldyBBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcih0aGlzLml0ZW1zKS53aXRoV3JhcCgpO1xuICAgIHRoaXMua2V5TWFuYWdlcj8uc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG5cbiAgICB0aGlzLnVwZGF0ZUFjdGl2ZUl0ZW1XaGVuUmVzdWx0c0NoYW5nZWQoKTtcbiAgICB0aGlzLnNjcm9sbFRvQWN0aXZlSXRlbSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5rZXlNYW5hZ2VyPy5kZXN0cm95KCk7XG4gIH1cblxuICBjbG9zZVNlYXJjaERpYWxvZygpIHtcbiAgICB0aGlzLmRpYWxvZz8ubmF0aXZlRWxlbWVudC5jbG9zZSgpO1xuICAgIHRoaXMub25DbG9zZS5uZXh0KCk7XG4gIH1cblxuICB1cGRhdGVTZWFyY2hRdWVyeShxdWVyeTogc3RyaW5nKSB7XG4gICAgdGhpcy5zZWFyY2gudXBkYXRlU2VhcmNoUXVlcnkocXVlcnkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBY3RpdmVJdGVtV2hlblJlc3VsdHNDaGFuZ2VkKCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbXM/LmNoYW5nZXMucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIC8vIENoYW5nZSBkZXRlY3Rpb24gc2hvdWxkIGJlIHJ1biBiZWZvcmUgZXhlY3V0ZSBgc2V0Rmlyc3RJdGVtQWN0aXZlYC5cbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmtleU1hbmFnZXI/LnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG5hdmlnYXRlVG9UaGVBY3RpdmVJdGVtKCk6IHZvaWQge1xuICAgIGNvbnN0IGFjdGl2ZUl0ZW1MaW5rOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB0aGlzLmtleU1hbmFnZXI/LmFjdGl2ZUl0ZW0/Lml0ZW0/LnVybDtcblxuICAgIGlmICghYWN0aXZlSXRlbUxpbmspIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMucmVsYXRpdmVMaW5rLnRyYW5zZm9ybShhY3RpdmVJdGVtTGluaykpO1xuICAgIHRoaXMub25DbG9zZS5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvQWN0aXZlSXRlbSgpOiB2b2lkIHtcbiAgICB0aGlzLmtleU1hbmFnZXI/LmNoYW5nZS5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5rZXlNYW5hZ2VyPy5hY3RpdmVJdGVtPy5zY3JvbGxJbnRvVmlldygpO1xuICAgIH0pO1xuICB9XG59XG4iLCI8ZGlhbG9nICNzZWFyY2hEaWFsb2c+XG4gIDxkaXYgY2xhc3M9XCJhZGV2LXNlYXJjaC1jb250YWluZXJcIiAoZG9jc0NsaWNrT3V0c2lkZSk9XCJjbG9zZVNlYXJjaERpYWxvZygpXCI+XG4gICAgPGRvY3MtdGV4dC1maWVsZFxuICAgICAgW2F1dG9mb2N1c109XCJ0cnVlXCJcbiAgICAgIFtoaWRlSWNvbl09XCJ0cnVlXCJcbiAgICAgIFtuZ01vZGVsXT1cInNlYXJjaFF1ZXJ5KClcIlxuICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwidXBkYXRlU2VhcmNoUXVlcnkoJGV2ZW50KVwiXG4gICAgICBjbGFzcz1cImFkZXYtc2VhcmNoLWlucHV0XCJcbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGRvY3NcIlxuICAgID48L2RvY3MtdGV4dC1maWVsZD5cblxuICAgIEBpZiAoc2VhcmNoUmVzdWx0cygpICYmIHNlYXJjaFJlc3VsdHMoKSEubGVuZ3RoID4gMCkge1xuICAgIDx1bCBjbGFzcz1cImFkZXYtc2VhcmNoLXJlc3VsdHMgYWRldi1taW5pLXNjcm9sbC10cmFja1wiPlxuICAgICAgQGZvciAocmVzdWx0IG9mIHNlYXJjaFJlc3VsdHMoKTsgdHJhY2sgcmVzdWx0Lm9iamVjdElEKSB7XG4gICAgICA8bGkgZG9jc1NlYXJjaEl0ZW0gW2l0ZW1dPVwicmVzdWx0XCI+XG4gICAgICAgIEBpZiAocmVzdWx0LnVybCkge1xuICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIicvJyArIHJlc3VsdC51cmwgfCByZWxhdGl2ZUxpbms6ICdwYXRobmFtZSdcIiBbZnJhZ21lbnRdPVwicmVzdWx0LnVybCB8IHJlbGF0aXZlTGluazogJ2hhc2gnXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWRldi1yZXN1bHQtaWNvbi1hbmQtdHlwZVwiPlxuICAgICAgICAgICAgICAgIDwhLS0gSWNvbiAtLT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFkZXYtc2VhcmNoLXJlc3VsdC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICBAaWYgKHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDAgPT09ICdEb2NzJykge1xuICAgICAgICAgICAgICAgICAgPGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCBkb2NzLWljb24tc21hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgIDwvaT5cbiAgICAgICAgICAgICAgICAgIH0gQGVsc2UgaWYgKHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDAgPT09ICdUdXRvcmlhbHMnKSB7XG4gICAgICAgICAgICAgICAgICA8aSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIGRvY3MtaWNvbi1zbWFsbFwiPmNvZGU8L2k+XG4gICAgICAgICAgICAgICAgICB9IEBlbHNlIGlmIChyZXN1bHQuaGllcmFyY2h5Py5sdmwwID09PSAnUmVmZXJlbmNlJykge1xuICAgICAgICAgICAgICAgICAgPGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCBkb2NzLWljb24tc21hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICAgIDwvaT5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPCEtLSBSZXN1bHRzIHR5cGUgLS0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGV2LXNlYXJjaC1yZXN1bHRzX190eXBlXCI+e3sgcmVzdWx0LmhpZXJhcmNoeT8ubHZsMSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPCEtLSBIaWRlIGxldmVsIDIgaWYgbGV2ZWwgMyBleGlzdHMgLS0+XG4gICAgICAgICAgICAgIDwhLS0gTGV2ZWwgMiAtLT5cbiAgICAgICAgICAgICAgQGlmIChyZXN1bHQuaGllcmFyY2h5Py5sdmwyICYmICFyZXN1bHQuaGllcmFyY2h5Py5sdmwzKSB7XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWRldi1zZWFyY2gtcmVzdWx0c19fdHlwZSBhZGV2LXNlYXJjaC1yZXN1bHRzX19sdmwyXCI+XG4gICAgICAgICAgICAgICAge3sgcmVzdWx0LmhpZXJhcmNoeT8ubHZsMiB9fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgPCEtLSBMZXZlbCAzIC0tPlxuICAgICAgICAgICAgICBAaWYgKHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDMpIHtcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhZGV2LXNlYXJjaC1yZXN1bHRzX190eXBlIGFkZXYtc2VhcmNoLXJlc3VsdHNfX2x2bDNcIj5cbiAgICAgICAgICAgICAgICB7eyByZXN1bHQuaGllcmFyY2h5Py5sdmwzIH19XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwhLS0gUGFnZSB0aXRsZSAtLT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWRldi1yZXN1bHQtcGFnZS10aXRsZVwiPnt7IHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDAgfX08L3NwYW4+XG4gICAgICAgICAgPC9hPlxuICAgICAgICB9XG4gICAgICA8L2xpPlxuICAgICAgfVxuICAgIDwvdWw+XG4gICAgfSBAZWxzZSB7XG4gICAgPGRpdiBjbGFzcz1cImFkZXYtc2VhcmNoLXJlc3VsdHMgYWRldi1taW5pLXNjcm9sbC10cmFja1wiPlxuICAgICAgQGlmIChzZWFyY2hSZXN1bHRzKCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgPGRpdiBjbGFzcz1cImFkZXYtc2VhcmNoLXJlc3VsdHNfX25vLXJlc3VsdHNcIj5cbiAgICAgICAgPHNwYW4+U3RhcnQgdHlwaW5nIHRvIHNlZSByZXN1bHRzPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB9IEBlbHNlIGlmIChzZWFyY2hSZXN1bHRzKCk/Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgPGRpdiBjbGFzcz1cImFkZXYtc2VhcmNoLXJlc3VsdHNfX25vLXJlc3VsdHNcIj5cbiAgICAgICAgPHNwYW4+Tm8gcmVzdWx0cyBmb3VuZDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgIDwvZGl2PlxuICAgIH1cblxuICAgIDxkaXYgY2xhc3M9XCJhZGV2LWFsZ29saWFcIj5cbiAgICAgIDxzcGFuPlNlYXJjaCBieTwvc3Bhbj5cbiAgICAgIDxkb2NzLWFsZ29saWEtaWNvbiAvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGlhbG9nPlxuIl19