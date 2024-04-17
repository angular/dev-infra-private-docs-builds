/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, DestroyRef, ElementRef, EventEmitter, NgZone, Output, QueryList, ViewChild, ViewChildren, inject, } from '@angular/core';
import { WINDOW } from '../../providers/index';
import { ClickOutside } from '../../directives/index';
import { Search } from '../../services/index';
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
        if (!this.dialog?.nativeElement.open) {
            this.dialog?.nativeElement.showModal?.();
        }
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
SearchDialog.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.5", ngImport: i0, type: SearchDialog, deps: [], target: i0.ɵɵFactoryTarget.Component });
SearchDialog.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.0.0-next.5", type: SearchDialog, isStandalone: true, selector: "docs-search-dialog", outputs: { onClose: "onClose" }, viewQueries: [{ propertyName: "dialog", first: true, predicate: ["searchDialog"], descendants: true }, { propertyName: "items", predicate: SearchItem, descendants: true }], ngImport: i0, template: "<dialog #searchDialog>\n  <div class=\"docs-search-container\" (docsClickOutside)=\"closeSearchDialog()\">\n    <docs-text-field\n      [autofocus]=\"true\"\n      [hideIcon]=\"true\"\n      [ngModel]=\"searchQuery()\"\n      (ngModelChange)=\"updateSearchQuery($event)\"\n      class=\"docs-search-input\"\n      placeholder=\"Search docs\"\n    ></docs-text-field>\n\n    @if (searchResults() && searchResults()!.length > 0) {\n    <ul class=\"docs-search-results docs-mini-scroll-track\">\n      @for (result of searchResults(); track result.objectID) {\n      <li docsSearchItem [item]=\"result\">\n        @if (result.url) {\n          <a [routerLink]=\"'/' + result.url | relativeLink: 'pathname'\" [fragment]=\"result.url | relativeLink: 'hash'\">\n            <div>\n              <div class=\"docs-result-icon-and-type\">\n                <!-- Icon -->\n                <span class=\"docs-search-result-icon\" aria-hidden=\"true\">\n                  @if (result.hierarchy?.lvl0 === 'Docs') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">\n                    description\n                  </i>\n                  } @else if (result.hierarchy?.lvl0 === 'Tutorials') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">code</i>\n                  } @else if (result.hierarchy?.lvl0 === 'Reference') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">\n                    description\n                  </i>\n                  }\n                </span>\n                <!-- Results type -->\n                <span class=\"docs-search-results__type\">{{ result.hierarchy?.lvl1 }}</span>\n              </div>\n\n              <!-- Hide level 2 if level 3 exists -->\n              <!-- Level 2 -->\n              @if (result.hierarchy?.lvl2 && !result.hierarchy?.lvl3) {\n              <span class=\"docs-search-results__type docs-search-results__lvl2\">\n                {{ result.hierarchy?.lvl2 }}\n              </span>\n              }\n              <!-- Level 3 -->\n              @if (result.hierarchy?.lvl3) {\n              <span class=\"docs-search-results__type docs-search-results__lvl3\">\n                {{ result.hierarchy?.lvl3 }}\n              </span>\n              }\n            </div>\n\n            <!-- Page title -->\n            <span class=\"docs-result-page-title\">{{ result.hierarchy?.lvl0 }}</span>\n          </a>\n        }\n      </li>\n      }\n    </ul>\n    } @else {\n    <div class=\"docs-search-results docs-mini-scroll-track\">\n      @if (searchResults() === undefined) {\n      <div class=\"docs-search-results__start-typing\">\n        <span>Start typing to see results</span>\n      </div>\n      } @else if (searchResults()?.length === 0) {\n      <div class=\"docs-search-results__no-results\">\n        <span>No results found</span>\n      </div>\n      }\n    </div>\n    }\n\n    <div class=\"docs-algolia\">\n      <span>Search by</span>\n      <a href=\"https://www.algolia.com/developers/\" target=\"_blank\" rel=\"noopener\">\n        <docs-algolia-icon />\n      </a>\n    </div>\n  </div>\n</dialog>\n", styles: ["dialog{background-color:rgba(0,0,0,0);border:none;padding-block-end:3rem}dialog::backdrop{backdrop-filter:blur(5px)}.docs-search-container{width:500px;max-width:90vw;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;box-sizing:border-box}.docs-search-container .docs-search-input{border-radius:.25rem .25rem 0 0;border:none;border-block-end:1px solid var(--senary-contrast);height:2.6875rem;padding-inline-start:1rem;position:relative}.docs-search-container .docs-search-input::after{content:\"Esc\";position:absolute;right:1rem;color:var(--gray-400);font-size:.875rem}.docs-search-container ul{max-height:260px;overflow-y:auto;list-style-type:none;padding-inline:0;padding-block-start:1rem;margin:0}.docs-search-container ul li{border-inline-start:2px solid var(--senary-contrast);margin-inline-start:1rem;padding-inline-end:1rem;padding-block:.25rem}.docs-search-container ul li a{color:var(--secondary-contrast);display:flex;justify-content:space-between;gap:.5rem}.docs-search-container ul li a .docs-search-result-icon i{display:flex;align-items:center;font-size:1.2rem}.docs-search-container ul li.active{background-color:var(--septenary-contrast)}.docs-search-container ul li:hover,.docs-search-container ul li.active{background-color:var(--octonary-contrast);border-inline-start:2px solid var(--primary-contrast)}.docs-search-container ul li:hover a span:not(.docs-result-page-title),.docs-search-container ul li:hover a .docs-search-results__type,.docs-search-container ul li.active a span:not(.docs-result-page-title),.docs-search-container ul li.active a .docs-search-results__type{color:var(--primary-contrast)}.docs-search-container ul li:hover a span:not(.docs-result-page-title) i,.docs-search-container ul li:hover a .docs-search-results__type i,.docs-search-container ul li.active a span:not(.docs-result-page-title) i,.docs-search-container ul li.active a .docs-search-results__type i{color:var(--primary-contrast)}.docs-search-container ul .docs-search-result-icon,.docs-search-container ul .docs-search-results__type,.docs-search-container ul .docs-result-page-title{color:var(--quaternary-contrast);display:inline-block;font-size:.875rem;transition:color .3s ease;padding:.75rem;padding-inline-end:0}.docs-search-container ul .docs-search-results__lvl2{display:inline-block;margin-inline-start:2rem;padding-block-start:0}.docs-search-container ul .docs-search-results__lvl3{margin-inline-start:2rem;padding-block-start:0}.docs-search-container .docs-result-page-title{font-size:.875rem;font-weight:400}.docs-search-results__start-typing,.docs-search-results__no-results{padding:.75rem;color:var(--gray-400)}.docs-result-icon-and-type{display:flex}.docs-result-icon-and-type .docs-search-results__type{padding-inline-start:0}.docs-algolia{display:flex;align-items:center;justify-content:end;color:var(--gray-400);padding:1rem;font-size:.75rem;font-weight:500;gap:.25rem;background-color:var(--page-background);border-radius:0 0 .25rem .25rem}.docs-algolia docs-algolia-icon{display:inline-flex;margin-block-start:.12rem;margin-inline-start:.15rem;width:4rem}/*# sourceMappingURL=search-dialog.component.css.map */\n"], dependencies: [{ kind: "directive", type: ClickOutside, selector: "[docsClickOutside]", inputs: ["docsClickOutsideIgnore"], outputs: ["docsClickOutside"] }, { kind: "component", type: TextField, selector: "docs-text-field", inputs: ["name", "placeholder", "disabled", "hideIcon", "autofocus"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: SearchItem, selector: "[docsSearchItem]", inputs: ["item", "disabled"] }, { kind: "component", type: AlgoliaIcon, selector: "docs-algolia-icon" }, { kind: "pipe", type: RelativeLink, name: "relativeLink" }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.5", ngImport: i0, type: SearchDialog, decorators: [{
            type: Component,
            args: [{ selector: 'docs-search-dialog', standalone: true, imports: [
                        ClickOutside,
                        TextField,
                        FormsModule,
                        SearchItem,
                        AlgoliaIcon,
                        RelativeLink,
                        RouterLink,
                    ], template: "<dialog #searchDialog>\n  <div class=\"docs-search-container\" (docsClickOutside)=\"closeSearchDialog()\">\n    <docs-text-field\n      [autofocus]=\"true\"\n      [hideIcon]=\"true\"\n      [ngModel]=\"searchQuery()\"\n      (ngModelChange)=\"updateSearchQuery($event)\"\n      class=\"docs-search-input\"\n      placeholder=\"Search docs\"\n    ></docs-text-field>\n\n    @if (searchResults() && searchResults()!.length > 0) {\n    <ul class=\"docs-search-results docs-mini-scroll-track\">\n      @for (result of searchResults(); track result.objectID) {\n      <li docsSearchItem [item]=\"result\">\n        @if (result.url) {\n          <a [routerLink]=\"'/' + result.url | relativeLink: 'pathname'\" [fragment]=\"result.url | relativeLink: 'hash'\">\n            <div>\n              <div class=\"docs-result-icon-and-type\">\n                <!-- Icon -->\n                <span class=\"docs-search-result-icon\" aria-hidden=\"true\">\n                  @if (result.hierarchy?.lvl0 === 'Docs') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">\n                    description\n                  </i>\n                  } @else if (result.hierarchy?.lvl0 === 'Tutorials') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">code</i>\n                  } @else if (result.hierarchy?.lvl0 === 'Reference') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">\n                    description\n                  </i>\n                  }\n                </span>\n                <!-- Results type -->\n                <span class=\"docs-search-results__type\">{{ result.hierarchy?.lvl1 }}</span>\n              </div>\n\n              <!-- Hide level 2 if level 3 exists -->\n              <!-- Level 2 -->\n              @if (result.hierarchy?.lvl2 && !result.hierarchy?.lvl3) {\n              <span class=\"docs-search-results__type docs-search-results__lvl2\">\n                {{ result.hierarchy?.lvl2 }}\n              </span>\n              }\n              <!-- Level 3 -->\n              @if (result.hierarchy?.lvl3) {\n              <span class=\"docs-search-results__type docs-search-results__lvl3\">\n                {{ result.hierarchy?.lvl3 }}\n              </span>\n              }\n            </div>\n\n            <!-- Page title -->\n            <span class=\"docs-result-page-title\">{{ result.hierarchy?.lvl0 }}</span>\n          </a>\n        }\n      </li>\n      }\n    </ul>\n    } @else {\n    <div class=\"docs-search-results docs-mini-scroll-track\">\n      @if (searchResults() === undefined) {\n      <div class=\"docs-search-results__start-typing\">\n        <span>Start typing to see results</span>\n      </div>\n      } @else if (searchResults()?.length === 0) {\n      <div class=\"docs-search-results__no-results\">\n        <span>No results found</span>\n      </div>\n      }\n    </div>\n    }\n\n    <div class=\"docs-algolia\">\n      <span>Search by</span>\n      <a href=\"https://www.algolia.com/developers/\" target=\"_blank\" rel=\"noopener\">\n        <docs-algolia-icon />\n      </a>\n    </div>\n  </div>\n</dialog>\n", styles: ["dialog{background-color:rgba(0,0,0,0);border:none;padding-block-end:3rem}dialog::backdrop{backdrop-filter:blur(5px)}.docs-search-container{width:500px;max-width:90vw;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;box-sizing:border-box}.docs-search-container .docs-search-input{border-radius:.25rem .25rem 0 0;border:none;border-block-end:1px solid var(--senary-contrast);height:2.6875rem;padding-inline-start:1rem;position:relative}.docs-search-container .docs-search-input::after{content:\"Esc\";position:absolute;right:1rem;color:var(--gray-400);font-size:.875rem}.docs-search-container ul{max-height:260px;overflow-y:auto;list-style-type:none;padding-inline:0;padding-block-start:1rem;margin:0}.docs-search-container ul li{border-inline-start:2px solid var(--senary-contrast);margin-inline-start:1rem;padding-inline-end:1rem;padding-block:.25rem}.docs-search-container ul li a{color:var(--secondary-contrast);display:flex;justify-content:space-between;gap:.5rem}.docs-search-container ul li a .docs-search-result-icon i{display:flex;align-items:center;font-size:1.2rem}.docs-search-container ul li.active{background-color:var(--septenary-contrast)}.docs-search-container ul li:hover,.docs-search-container ul li.active{background-color:var(--octonary-contrast);border-inline-start:2px solid var(--primary-contrast)}.docs-search-container ul li:hover a span:not(.docs-result-page-title),.docs-search-container ul li:hover a .docs-search-results__type,.docs-search-container ul li.active a span:not(.docs-result-page-title),.docs-search-container ul li.active a .docs-search-results__type{color:var(--primary-contrast)}.docs-search-container ul li:hover a span:not(.docs-result-page-title) i,.docs-search-container ul li:hover a .docs-search-results__type i,.docs-search-container ul li.active a span:not(.docs-result-page-title) i,.docs-search-container ul li.active a .docs-search-results__type i{color:var(--primary-contrast)}.docs-search-container ul .docs-search-result-icon,.docs-search-container ul .docs-search-results__type,.docs-search-container ul .docs-result-page-title{color:var(--quaternary-contrast);display:inline-block;font-size:.875rem;transition:color .3s ease;padding:.75rem;padding-inline-end:0}.docs-search-container ul .docs-search-results__lvl2{display:inline-block;margin-inline-start:2rem;padding-block-start:0}.docs-search-container ul .docs-search-results__lvl3{margin-inline-start:2rem;padding-block-start:0}.docs-search-container .docs-result-page-title{font-size:.875rem;font-weight:400}.docs-search-results__start-typing,.docs-search-results__no-results{padding:.75rem;color:var(--gray-400)}.docs-result-icon-and-type{display:flex}.docs-result-icon-and-type .docs-search-results__type{padding-inline-start:0}.docs-algolia{display:flex;align-items:center;justify-content:end;color:var(--gray-400);padding:1rem;font-size:.75rem;font-weight:500;gap:.25rem;background-color:var(--page-background);border-radius:0 0 .25rem .25rem}.docs-algolia docs-algolia-icon{display:inline-flex;margin-block-start:.12rem;margin-inline-start:.15rem;width:4rem}/*# sourceMappingURL=search-dialog.component.css.map */\n"] }]
        }], propDecorators: { onClose: [{
                type: Output
            }], dialog: [{
                type: ViewChild,
                args: ['searchDialog']
            }], items: [{
                type: ViewChildren,
                args: [SearchItem]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvc2VhcmNoLWRpYWxvZy9zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWFyY2gtZGlhbG9nL3NlYXJjaC1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBR04sTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUU1QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDN0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUM5RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUNu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T0FBTztzQkFBaEIsTUFBTTtnQkFDb0IsTUFBTTtzQkFBaEMsU0FBUzt1QkFBQyxjQUFjO2dCQUNDLEtBQUs7c0JBQTlCLFlBQVk7dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBEZXN0cm95UmVmLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtXSU5ET1d9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9pbmRleCc7XG5pbXBvcnQge0NsaWNrT3V0c2lkZX0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmRleCc7XG5pbXBvcnQge1NlYXJjaH0gZnJvbSAnLi4vLi4vc2VydmljZXMvaW5kZXgnO1xuXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnLi4vdGV4dC1maWVsZC90ZXh0LWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0FjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1NlYXJjaEl0ZW19IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvc2VhcmNoLWl0ZW0vc2VhcmNoLWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge1JvdXRlciwgUm91dGVyTGlua30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7ZmlsdGVyLCBmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtBbGdvbGlhSWNvbn0gZnJvbSAnLi4vYWxnb2xpYS1pY29uL2FsZ29saWEtaWNvbi5jb21wb25lbnQnO1xuaW1wb3J0IHtSZWxhdGl2ZUxpbmt9IGZyb20gJy4uLy4uL3BpcGVzL3JlbGF0aXZlLWxpbmsucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RvY3Mtc2VhcmNoLWRpYWxvZycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDbGlja091dHNpZGUsXG4gICAgVGV4dEZpZWxkLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFNlYXJjaEl0ZW0sXG4gICAgQWxnb2xpYUljb24sXG4gICAgUmVsYXRpdmVMaW5rLFxuICAgIFJvdXRlckxpbmssXG4gIF0sXG4gIHRlbXBsYXRlVXJsOiAnLi9zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWRpYWxvZy5jb21wb25lbnQuc2NzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAVmlld0NoaWxkKCdzZWFyY2hEaWFsb2cnKSBkaWFsb2c/OiBFbGVtZW50UmVmPEhUTUxEaWFsb2dFbGVtZW50PjtcbiAgQFZpZXdDaGlsZHJlbihTZWFyY2hJdGVtKSBpdGVtcz86IFF1ZXJ5TGlzdDxTZWFyY2hJdGVtPjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgbmdab25lID0gaW5qZWN0KE5nWm9uZSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc2VhcmNoID0gaW5qZWN0KFNlYXJjaCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVsYXRpdmVMaW5rID0gbmV3IFJlbGF0aXZlTGluaygpO1xuICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlciA9IGluamVjdChSb3V0ZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbmRvdyA9IGluamVjdChXSU5ET1cpO1xuXG4gIHByaXZhdGUga2V5TWFuYWdlcj86IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyPFNlYXJjaEl0ZW0+O1xuXG4gIHNlYXJjaFF1ZXJ5ID0gdGhpcy5zZWFyY2guc2VhcmNoUXVlcnk7XG4gIHNlYXJjaFJlc3VsdHMgPSB0aGlzLnNlYXJjaC5zZWFyY2hSZXN1bHRzO1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGZyb21FdmVudDxLZXlib2FyZEV2ZW50Pih0aGlzLndpbmRvdywgJ2tleWRvd24nKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoKF8pID0+ICEhdGhpcy5rZXlNYW5hZ2VyKSxcbiAgICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgIC8vIFdoZW4gdXNlciBwcmVzc2VzIEVudGVyIHdlIGNhbiBuYXZpZ2F0ZSB0byBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSBpbiB0aGUgc2VhcmNoIHJlc3VsdCBsaXN0LlxuICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUb1RoZUFjdGl2ZUl0ZW0oKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5rZXlNYW5hZ2VyPy5vbktleWRvd24oZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZGlhbG9nPy5uYXRpdmVFbGVtZW50Lm9wZW4pIHtcbiAgICAgIHRoaXMuZGlhbG9nPy5uYXRpdmVFbGVtZW50LnNob3dNb2RhbD8uKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLml0ZW1zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5rZXlNYW5hZ2VyID0gbmV3IEFjdGl2ZURlc2NlbmRhbnRLZXlNYW5hZ2VyKHRoaXMuaXRlbXMpLndpdGhXcmFwKCk7XG4gICAgdGhpcy5rZXlNYW5hZ2VyPy5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcblxuICAgIHRoaXMudXBkYXRlQWN0aXZlSXRlbVdoZW5SZXN1bHRzQ2hhbmdlZCgpO1xuICAgIHRoaXMuc2Nyb2xsVG9BY3RpdmVJdGVtKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmtleU1hbmFnZXI/LmRlc3Ryb3koKTtcbiAgfVxuXG4gIGNsb3NlU2VhcmNoRGlhbG9nKCkge1xuICAgIHRoaXMuZGlhbG9nPy5uYXRpdmVFbGVtZW50LmNsb3NlKCk7XG4gICAgdGhpcy5vbkNsb3NlLm5leHQoKTtcbiAgfVxuXG4gIHVwZGF0ZVNlYXJjaFF1ZXJ5KHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICB0aGlzLnNlYXJjaC51cGRhdGVTZWFyY2hRdWVyeShxdWVyeSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUFjdGl2ZUl0ZW1XaGVuUmVzdWx0c0NoYW5nZWQoKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtcz8uY2hhbmdlcy5waXBlKHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgLy8gQ2hhbmdlIGRldGVjdGlvbiBzaG91bGQgYmUgcnVuIGJlZm9yZSBleGVjdXRlIGBzZXRGaXJzdEl0ZW1BY3RpdmVgLlxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMua2V5TWFuYWdlcj8uc2V0Rmlyc3RJdGVtQWN0aXZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbmF2aWdhdGVUb1RoZUFjdGl2ZUl0ZW0oKTogdm9pZCB7XG4gICAgY29uc3QgYWN0aXZlSXRlbUxpbms6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMua2V5TWFuYWdlcj8uYWN0aXZlSXRlbT8uaXRlbT8udXJsO1xuXG4gICAgaWYgKCFhY3RpdmVJdGVtTGluaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGhpcy5yZWxhdGl2ZUxpbmsudHJhbnNmb3JtKGFjdGl2ZUl0ZW1MaW5rKSk7XG4gICAgdGhpcy5vbkNsb3NlLm5leHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9BY3RpdmVJdGVtKCk6IHZvaWQge1xuICAgIHRoaXMua2V5TWFuYWdlcj8uY2hhbmdlLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZikpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmtleU1hbmFnZXI/LmFjdGl2ZUl0ZW0/LnNjcm9sbEludG9WaWV3KCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIjxkaWFsb2cgI3NlYXJjaERpYWxvZz5cbiAgPGRpdiBjbGFzcz1cImRvY3Mtc2VhcmNoLWNvbnRhaW5lclwiIChkb2NzQ2xpY2tPdXRzaWRlKT1cImNsb3NlU2VhcmNoRGlhbG9nKClcIj5cbiAgICA8ZG9jcy10ZXh0LWZpZWxkXG4gICAgICBbYXV0b2ZvY3VzXT1cInRydWVcIlxuICAgICAgW2hpZGVJY29uXT1cInRydWVcIlxuICAgICAgW25nTW9kZWxdPVwic2VhcmNoUXVlcnkoKVwiXG4gICAgICAobmdNb2RlbENoYW5nZSk9XCJ1cGRhdGVTZWFyY2hRdWVyeSgkZXZlbnQpXCJcbiAgICAgIGNsYXNzPVwiZG9jcy1zZWFyY2gtaW5wdXRcIlxuICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZG9jc1wiXG4gICAgPjwvZG9jcy10ZXh0LWZpZWxkPlxuXG4gICAgQGlmIChzZWFyY2hSZXN1bHRzKCkgJiYgc2VhcmNoUmVzdWx0cygpIS5sZW5ndGggPiAwKSB7XG4gICAgPHVsIGNsYXNzPVwiZG9jcy1zZWFyY2gtcmVzdWx0cyBkb2NzLW1pbmktc2Nyb2xsLXRyYWNrXCI+XG4gICAgICBAZm9yIChyZXN1bHQgb2Ygc2VhcmNoUmVzdWx0cygpOyB0cmFjayByZXN1bHQub2JqZWN0SUQpIHtcbiAgICAgIDxsaSBkb2NzU2VhcmNoSXRlbSBbaXRlbV09XCJyZXN1bHRcIj5cbiAgICAgICAgQGlmIChyZXN1bHQudXJsKSB7XG4gICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiJy8nICsgcmVzdWx0LnVybCB8IHJlbGF0aXZlTGluazogJ3BhdGhuYW1lJ1wiIFtmcmFnbWVudF09XCJyZXN1bHQudXJsIHwgcmVsYXRpdmVMaW5rOiAnaGFzaCdcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkb2NzLXJlc3VsdC1pY29uLWFuZC10eXBlXCI+XG4gICAgICAgICAgICAgICAgPCEtLSBJY29uIC0tPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZG9jcy1zZWFyY2gtcmVzdWx0LWljb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgIEBpZiAocmVzdWx0LmhpZXJhcmNoeT8ubHZsMCA9PT0gJ0RvY3MnKSB7XG4gICAgICAgICAgICAgICAgICA8aSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIGRvY3MtaWNvbi1zbWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgPC9pPlxuICAgICAgICAgICAgICAgICAgfSBAZWxzZSBpZiAocmVzdWx0LmhpZXJhcmNoeT8ubHZsMCA9PT0gJ1R1dG9yaWFscycpIHtcbiAgICAgICAgICAgICAgICAgIDxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgZG9jcy1pY29uLXNtYWxsXCI+Y29kZTwvaT5cbiAgICAgICAgICAgICAgICAgIH0gQGVsc2UgaWYgKHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDAgPT09ICdSZWZlcmVuY2UnKSB7XG4gICAgICAgICAgICAgICAgICA8aSByb2xlPVwicHJlc2VudGF0aW9uXCIgY2xhc3M9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIGRvY3MtaWNvbi1zbWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgICAgPC9pPlxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8IS0tIFJlc3VsdHMgdHlwZSAtLT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvY3Mtc2VhcmNoLXJlc3VsdHNfX3R5cGVcIj57eyByZXN1bHQuaGllcmFyY2h5Py5sdmwxIH19PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8IS0tIEhpZGUgbGV2ZWwgMiBpZiBsZXZlbCAzIGV4aXN0cyAtLT5cbiAgICAgICAgICAgICAgPCEtLSBMZXZlbCAyIC0tPlxuICAgICAgICAgICAgICBAaWYgKHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDIgJiYgIXJlc3VsdC5oaWVyYXJjaHk/Lmx2bDMpIHtcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkb2NzLXNlYXJjaC1yZXN1bHRzX190eXBlIGRvY3Mtc2VhcmNoLXJlc3VsdHNfX2x2bDJcIj5cbiAgICAgICAgICAgICAgICB7eyByZXN1bHQuaGllcmFyY2h5Py5sdmwyIH19XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8IS0tIExldmVsIDMgLS0+XG4gICAgICAgICAgICAgIEBpZiAocmVzdWx0LmhpZXJhcmNoeT8ubHZsMykge1xuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvY3Mtc2VhcmNoLXJlc3VsdHNfX3R5cGUgZG9jcy1zZWFyY2gtcmVzdWx0c19fbHZsM1wiPlxuICAgICAgICAgICAgICAgIHt7IHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDMgfX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPCEtLSBQYWdlIHRpdGxlIC0tPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkb2NzLXJlc3VsdC1wYWdlLXRpdGxlXCI+e3sgcmVzdWx0LmhpZXJhcmNoeT8ubHZsMCB9fTwvc3Bhbj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgIH1cbiAgICAgIDwvbGk+XG4gICAgICB9XG4gICAgPC91bD5cbiAgICB9IEBlbHNlIHtcbiAgICA8ZGl2IGNsYXNzPVwiZG9jcy1zZWFyY2gtcmVzdWx0cyBkb2NzLW1pbmktc2Nyb2xsLXRyYWNrXCI+XG4gICAgICBAaWYgKHNlYXJjaFJlc3VsdHMoKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICA8ZGl2IGNsYXNzPVwiZG9jcy1zZWFyY2gtcmVzdWx0c19fc3RhcnQtdHlwaW5nXCI+XG4gICAgICAgIDxzcGFuPlN0YXJ0IHR5cGluZyB0byBzZWUgcmVzdWx0czwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgfSBAZWxzZSBpZiAoc2VhcmNoUmVzdWx0cygpPy5sZW5ndGggPT09IDApIHtcbiAgICAgIDxkaXYgY2xhc3M9XCJkb2NzLXNlYXJjaC1yZXN1bHRzX19uby1yZXN1bHRzXCI+XG4gICAgICAgIDxzcGFuPk5vIHJlc3VsdHMgZm91bmQ8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIH1cbiAgICA8L2Rpdj5cbiAgICB9XG5cbiAgICA8ZGl2IGNsYXNzPVwiZG9jcy1hbGdvbGlhXCI+XG4gICAgICA8c3Bhbj5TZWFyY2ggYnk8L3NwYW4+XG4gICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cuYWxnb2xpYS5jb20vZGV2ZWxvcGVycy9cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lclwiPlxuICAgICAgICA8ZG9jcy1hbGdvbGlhLWljb24gLz5cbiAgICAgIDwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2RpYWxvZz5cbiJdfQ==