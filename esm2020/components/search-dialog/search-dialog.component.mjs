/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, NgZone, Output, QueryList, ViewChild, ViewChildren, inject, } from '@angular/core';
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
SearchDialog.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0-next.0", ngImport: i0, type: SearchDialog, deps: [], target: i0.ɵɵFactoryTarget.Component });
SearchDialog.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.0-next.0", type: SearchDialog, isStandalone: true, selector: "docs-search-dialog", outputs: { onClose: "onClose" }, viewQueries: [{ propertyName: "dialog", first: true, predicate: ["searchDialog"], descendants: true }, { propertyName: "items", predicate: SearchItem, descendants: true }], ngImport: i0, template: "<dialog #searchDialog>\n  <div class=\"docs-search-container\" (docsClickOutside)=\"closeSearchDialog()\">\n    <docs-text-field\n      [autofocus]=\"true\"\n      [hideIcon]=\"true\"\n      [ngModel]=\"searchQuery()\"\n      (ngModelChange)=\"updateSearchQuery($event)\"\n      class=\"docs-search-input\"\n      placeholder=\"Search docs\"\n    ></docs-text-field>\n\n    @if (searchResults() && searchResults()!.length > 0) {\n    <ul class=\"docs-search-results docs-mini-scroll-track\">\n      @for (result of searchResults(); track result.objectID) {\n      <li docsSearchItem [item]=\"result\">\n        @if (result.url) {\n          <a [routerLink]=\"'/' + result.url | relativeLink: 'pathname'\" [fragment]=\"result.url | relativeLink: 'hash'\">\n            <div>\n              <div class=\"docs-result-icon-and-type\">\n                <!-- Icon -->\n                <span class=\"docs-search-result-icon\" aria-hidden=\"true\">\n                  @if (result.hierarchy?.lvl0 === 'Docs') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">\n                    description\n                  </i>\n                  } @else if (result.hierarchy?.lvl0 === 'Tutorials') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">code</i>\n                  } @else if (result.hierarchy?.lvl0 === 'Reference') {\n                  <i role=\"presentation\" class=\"material-symbols-outlined docs-icon-small\">\n                    description\n                  </i>\n                  }\n                </span>\n                <!-- Results type -->\n                <span class=\"docs-search-results__type\">{{ result.hierarchy?.lvl1 }}</span>\n              </div>\n\n              <!-- Hide level 2 if level 3 exists -->\n              <!-- Level 2 -->\n              @if (result.hierarchy?.lvl2 && !result.hierarchy?.lvl3) {\n              <span class=\"docs-search-results__type docs-search-results__lvl2\">\n                {{ result.hierarchy?.lvl2 }}\n              </span>\n              }\n              <!-- Level 3 -->\n              @if (result.hierarchy?.lvl3) {\n              <span class=\"docs-search-results__type docs-search-results__lvl3\">\n                {{ result.hierarchy?.lvl3 }}\n              </span>\n              }\n            </div>\n\n            <!-- Page title -->\n            <span class=\"docs-result-page-title\">{{ result.hierarchy?.lvl0 }}</span>\n          </a>\n        }\n      </li>\n      }\n    </ul>\n    } @else {\n    <div class=\"docs-search-results docs-mini-scroll-track\">\n      @if (searchResults() === undefined) {\n      <div class=\"docs-search-results__start-typing\">\n        <span>Start typing to see results</span>\n      </div>\n      } @else if (searchResults()?.length === 0) {\n      <div class=\"docs-search-results__no-results\">\n        <span>No results found</span>\n      </div>\n      }\n    </div>\n    }\n\n    <div class=\"docs-algolia\">\n      <span>Search by</span>\n      <a href=\"https://www.algolia.com/developers/\" target=\"_blank\" rel=\"noopener\">\n        <docs-algolia-icon />\n      </a>\n    </div>\n  </div>\n</dialog>\n", styles: ["dialog{background-color:rgba(0,0,0,0);border:none;padding-block-end:3rem}dialog::backdrop{backdrop-filter:blur(5px)}.docs-search-container{width:500px;max-width:90vw;background-color:var(--page-background);border:1px solid var(--senary-contrast);border-radius:.25rem;box-sizing:border-box}.docs-search-container .docs-search-input{border-radius:.25rem .25rem 0 0;border:none;border-block-end:1px solid var(--senary-contrast);height:2.6875rem;padding-inline-start:1rem;position:relative}.docs-search-container .docs-search-input::after{content:\"Esc\";position:absolute;right:1rem;color:var(--gray-400);font-size:.875rem}.docs-search-container ul{max-height:260px;overflow-y:auto;list-style-type:none;padding-inline:0;padding-block-start:1rem;margin:0}.docs-search-container ul li{border-inline-start:2px solid var(--senary-contrast);margin-inline-start:1rem;padding-inline-end:1rem;padding-block:.25rem}.docs-search-container ul li a{color:var(--secondary-contrast);display:flex;justify-content:space-between;gap:.5rem}.docs-search-container ul li a .docs-search-result-icon i{display:flex;align-items:center;font-size:1.2rem}.docs-search-container ul li.active{background-color:var(--septenary-contrast)}.docs-search-container ul li:hover,.docs-search-container ul li.active{background-color:var(--octonary-contrast);border-inline-start:2px solid var(--primary-contrast)}.docs-search-container ul li:hover a span:not(.docs-result-page-title),.docs-search-container ul li:hover a .docs-search-results__type,.docs-search-container ul li.active a span:not(.docs-result-page-title),.docs-search-container ul li.active a .docs-search-results__type{color:var(--primary-contrast)}.docs-search-container ul li:hover a span:not(.docs-result-page-title) i,.docs-search-container ul li:hover a .docs-search-results__type i,.docs-search-container ul li.active a span:not(.docs-result-page-title) i,.docs-search-container ul li.active a .docs-search-results__type i{color:var(--primary-contrast)}.docs-search-container ul .docs-search-result-icon,.docs-search-container ul .docs-search-results__type,.docs-search-container ul .docs-result-page-title{color:var(--quaternary-contrast);display:inline-block;font-size:.875rem;transition:color .3s ease;padding:.75rem;padding-inline-end:0}.docs-search-container ul .docs-search-results__lvl2{display:inline-block;margin-inline-start:2rem;padding-block-start:0}.docs-search-container ul .docs-search-results__lvl3{margin-inline-start:2rem;padding-block-start:0}.docs-search-container .docs-result-page-title{font-size:.875rem;font-weight:400}.docs-search-results__start-typing,.docs-search-results__no-results{padding:.75rem;color:var(--gray-400)}.docs-result-icon-and-type{display:flex}.docs-result-icon-and-type .docs-search-results__type{padding-inline-start:0}.docs-algolia{display:flex;align-items:center;justify-content:end;color:var(--gray-400);padding:1rem;font-size:.75rem;font-weight:500;gap:.25rem;background-color:var(--page-background);border-radius:0 0 .25rem .25rem}.docs-algolia docs-algolia-icon{display:inline-flex;margin-block-start:.12rem;margin-inline-start:.15rem;width:4rem}/*# sourceMappingURL=search-dialog.component.css.map */\n"], dependencies: [{ kind: "directive", type: ClickOutside, selector: "[docsClickOutside]", inputs: ["docsClickOutsideIgnore"], outputs: ["docsClickOutside"] }, { kind: "component", type: TextField, selector: "docs-text-field", inputs: ["name", "placeholder", "disabled", "hideIcon", "autofocus"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: SearchItem, selector: "[docsSearchItem]", inputs: ["item", "disabled"] }, { kind: "component", type: AlgoliaIcon, selector: "docs-algolia-icon" }, { kind: "pipe", type: RelativeLink, name: "relativeLink" }, { kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0-next.0", ngImport: i0, type: SearchDialog, decorators: [{
            type: Component,
            args: [{ selector: 'docs-search-dialog', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvc2VhcmNoLWRpYWxvZy9zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9zZWFyY2gtZGlhbG9nL3NlYXJjaC1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUdOLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFNUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQzdELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDOUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sd0NB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V0FBVzt3QkFDWCxZQUFZO3dCQUNaLFVBQVU7cUJBQ1g7OEJBS1MsT0FBTztzQkFBaEIsTUFBTTtnQkFDb0IsTUFBTTtzQkFBaEMsU0FBUzt1QkFBQyxjQUFjO2dCQUNDLEtBQUs7c0JBQTlCLFlBQVk7dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRGVzdHJveVJlZixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7V0lORE9XfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvaW5kZXgnO1xuaW1wb3J0IHtDbGlja091dHNpZGV9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5kZXgnO1xuaW1wb3J0IHtTZWFyY2h9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2luZGV4JztcblxuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJy4uL3RleHQtZmllbGQvdGV4dC1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtBY3RpdmVEZXNjZW5kYW50S2V5TWFuYWdlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtTZWFyY2hJdGVtfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3NlYXJjaC1pdGVtL3NlYXJjaC1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlckxpbmt9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge2ZpbHRlciwgZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcbmltcG9ydCB7QWxnb2xpYUljb259IGZyb20gJy4uL2FsZ29saWEtaWNvbi9hbGdvbGlhLWljb24uY29tcG9uZW50JztcbmltcG9ydCB7UmVsYXRpdmVMaW5rfSBmcm9tICcuLi8uLi9waXBlcy9yZWxhdGl2ZS1saW5rLnBpcGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLXNlYXJjaC1kaWFsb2cnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaW1wb3J0czogW1xuICAgIENsaWNrT3V0c2lkZSxcbiAgICBUZXh0RmllbGQsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgU2VhcmNoSXRlbSxcbiAgICBBbGdvbGlhSWNvbixcbiAgICBSZWxhdGl2ZUxpbmssXG4gICAgUm91dGVyTGluayxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaERpYWxvZyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIG9uQ2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBWaWV3Q2hpbGQoJ3NlYXJjaERpYWxvZycpIGRpYWxvZz86IEVsZW1lbnRSZWY8SFRNTERpYWxvZ0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkcmVuKFNlYXJjaEl0ZW0pIGl0ZW1zPzogUXVlcnlMaXN0PFNlYXJjaEl0ZW0+O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZGVzdHJveVJlZiA9IGluamVjdChEZXN0cm95UmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBuZ1pvbmUgPSBpbmplY3QoTmdab25lKTtcbiAgcHJpdmF0ZSByZWFkb25seSBzZWFyY2ggPSBpbmplY3QoU2VhcmNoKTtcbiAgcHJpdmF0ZSByZWFkb25seSByZWxhdGl2ZUxpbmsgPSBuZXcgUmVsYXRpdmVMaW5rKCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luZG93ID0gaW5qZWN0KFdJTkRPVyk7XG5cbiAgcHJpdmF0ZSBrZXlNYW5hZ2VyPzogQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXI8U2VhcmNoSXRlbT47XG5cbiAgc2VhcmNoUXVlcnkgPSB0aGlzLnNlYXJjaC5zZWFyY2hRdWVyeTtcbiAgc2VhcmNoUmVzdWx0cyA9IHRoaXMuc2VhcmNoLnNlYXJjaFJlc3VsdHM7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgZnJvbUV2ZW50PEtleWJvYXJkRXZlbnQ+KHRoaXMud2luZG93LCAna2V5ZG93bicpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoXykgPT4gISF0aGlzLmtleU1hbmFnZXIpLFxuICAgICAgICAgIHRha2VVbnRpbERlc3Ryb3llZCh0aGlzLmRlc3Ryb3lSZWYpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgLy8gV2hlbiB1c2VyIHByZXNzZXMgRW50ZXIgd2UgY2FuIG5hdmlnYXRlIHRvIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtIGluIHRoZSBzZWFyY2ggcmVzdWx0IGxpc3QuXG4gICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvVGhlQWN0aXZlSXRlbSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmtleU1hbmFnZXI/Lm9uS2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICghdGhpcy5kaWFsb2c/Lm5hdGl2ZUVsZW1lbnQub3Blbikge1xuICAgICAgdGhpcy5kaWFsb2c/Lm5hdGl2ZUVsZW1lbnQuc2hvd01vZGFsPy4oKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXRlbXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmtleU1hbmFnZXIgPSBuZXcgQWN0aXZlRGVzY2VuZGFudEtleU1hbmFnZXIodGhpcy5pdGVtcykud2l0aFdyYXAoKTtcbiAgICB0aGlzLmtleU1hbmFnZXI/LnNldEZpcnN0SXRlbUFjdGl2ZSgpO1xuXG4gICAgdGhpcy51cGRhdGVBY3RpdmVJdGVtV2hlblJlc3VsdHNDaGFuZ2VkKCk7XG4gICAgdGhpcy5zY3JvbGxUb0FjdGl2ZUl0ZW0oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMua2V5TWFuYWdlcj8uZGVzdHJveSgpO1xuICB9XG5cbiAgY2xvc2VTZWFyY2hEaWFsb2coKSB7XG4gICAgdGhpcy5kaWFsb2c/Lm5hdGl2ZUVsZW1lbnQuY2xvc2UoKTtcbiAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICB9XG5cbiAgdXBkYXRlU2VhcmNoUXVlcnkocXVlcnk6IHN0cmluZykge1xuICAgIHRoaXMuc2VhcmNoLnVwZGF0ZVNlYXJjaFF1ZXJ5KHF1ZXJ5KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQWN0aXZlSXRlbVdoZW5SZXN1bHRzQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1zPy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZikpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAvLyBDaGFuZ2UgZGV0ZWN0aW9uIHNob3VsZCBiZSBydW4gYmVmb3JlIGV4ZWN1dGUgYHNldEZpcnN0SXRlbUFjdGl2ZWAuXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5rZXlNYW5hZ2VyPy5zZXRGaXJzdEl0ZW1BY3RpdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBuYXZpZ2F0ZVRvVGhlQWN0aXZlSXRlbSgpOiB2b2lkIHtcbiAgICBjb25zdCBhY3RpdmVJdGVtTGluazogc3RyaW5nIHwgdW5kZWZpbmVkID0gdGhpcy5rZXlNYW5hZ2VyPy5hY3RpdmVJdGVtPy5pdGVtPy51cmw7XG5cbiAgICBpZiAoIWFjdGl2ZUl0ZW1MaW5rKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnJlbGF0aXZlTGluay50cmFuc2Zvcm0oYWN0aXZlSXRlbUxpbmspKTtcbiAgICB0aGlzLm9uQ2xvc2UubmV4dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUb0FjdGl2ZUl0ZW0oKTogdm9pZCB7XG4gICAgdGhpcy5rZXlNYW5hZ2VyPy5jaGFuZ2UucGlwZSh0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMua2V5TWFuYWdlcj8uYWN0aXZlSXRlbT8uc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiPGRpYWxvZyAjc2VhcmNoRGlhbG9nPlxuICA8ZGl2IGNsYXNzPVwiZG9jcy1zZWFyY2gtY29udGFpbmVyXCIgKGRvY3NDbGlja091dHNpZGUpPVwiY2xvc2VTZWFyY2hEaWFsb2coKVwiPlxuICAgIDxkb2NzLXRleHQtZmllbGRcbiAgICAgIFthdXRvZm9jdXNdPVwidHJ1ZVwiXG4gICAgICBbaGlkZUljb25dPVwidHJ1ZVwiXG4gICAgICBbbmdNb2RlbF09XCJzZWFyY2hRdWVyeSgpXCJcbiAgICAgIChuZ01vZGVsQ2hhbmdlKT1cInVwZGF0ZVNlYXJjaFF1ZXJ5KCRldmVudClcIlxuICAgICAgY2xhc3M9XCJkb2NzLXNlYXJjaC1pbnB1dFwiXG4gICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBkb2NzXCJcbiAgICA+PC9kb2NzLXRleHQtZmllbGQ+XG5cbiAgICBAaWYgKHNlYXJjaFJlc3VsdHMoKSAmJiBzZWFyY2hSZXN1bHRzKCkhLmxlbmd0aCA+IDApIHtcbiAgICA8dWwgY2xhc3M9XCJkb2NzLXNlYXJjaC1yZXN1bHRzIGRvY3MtbWluaS1zY3JvbGwtdHJhY2tcIj5cbiAgICAgIEBmb3IgKHJlc3VsdCBvZiBzZWFyY2hSZXN1bHRzKCk7IHRyYWNrIHJlc3VsdC5vYmplY3RJRCkge1xuICAgICAgPGxpIGRvY3NTZWFyY2hJdGVtIFtpdGVtXT1cInJlc3VsdFwiPlxuICAgICAgICBAaWYgKHJlc3VsdC51cmwpIHtcbiAgICAgICAgICA8YSBbcm91dGVyTGlua109XCInLycgKyByZXN1bHQudXJsIHwgcmVsYXRpdmVMaW5rOiAncGF0aG5hbWUnXCIgW2ZyYWdtZW50XT1cInJlc3VsdC51cmwgfCByZWxhdGl2ZUxpbms6ICdoYXNoJ1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRvY3MtcmVzdWx0LWljb24tYW5kLXR5cGVcIj5cbiAgICAgICAgICAgICAgICA8IS0tIEljb24gLS0+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkb2NzLXNlYXJjaC1yZXN1bHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgQGlmIChyZXN1bHQuaGllcmFyY2h5Py5sdmwwID09PSAnRG9jcycpIHtcbiAgICAgICAgICAgICAgICAgIDxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgZG9jcy1pY29uLXNtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICA8L2k+XG4gICAgICAgICAgICAgICAgICB9IEBlbHNlIGlmIChyZXN1bHQuaGllcmFyY2h5Py5sdmwwID09PSAnVHV0b3JpYWxzJykge1xuICAgICAgICAgICAgICAgICAgPGkgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCBkb2NzLWljb24tc21hbGxcIj5jb2RlPC9pPlxuICAgICAgICAgICAgICAgICAgfSBAZWxzZSBpZiAocmVzdWx0LmhpZXJhcmNoeT8ubHZsMCA9PT0gJ1JlZmVyZW5jZScpIHtcbiAgICAgICAgICAgICAgICAgIDxpIHJvbGU9XCJwcmVzZW50YXRpb25cIiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgZG9jcy1pY29uLXNtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAgICA8L2k+XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwhLS0gUmVzdWx0cyB0eXBlIC0tPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZG9jcy1zZWFyY2gtcmVzdWx0c19fdHlwZVwiPnt7IHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDEgfX08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDwhLS0gSGlkZSBsZXZlbCAyIGlmIGxldmVsIDMgZXhpc3RzIC0tPlxuICAgICAgICAgICAgICA8IS0tIExldmVsIDIgLS0+XG4gICAgICAgICAgICAgIEBpZiAocmVzdWx0LmhpZXJhcmNoeT8ubHZsMiAmJiAhcmVzdWx0LmhpZXJhcmNoeT8ubHZsMykge1xuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvY3Mtc2VhcmNoLXJlc3VsdHNfX3R5cGUgZG9jcy1zZWFyY2gtcmVzdWx0c19fbHZsMlwiPlxuICAgICAgICAgICAgICAgIHt7IHJlc3VsdC5oaWVyYXJjaHk/Lmx2bDIgfX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDwhLS0gTGV2ZWwgMyAtLT5cbiAgICAgICAgICAgICAgQGlmIChyZXN1bHQuaGllcmFyY2h5Py5sdmwzKSB7XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZG9jcy1zZWFyY2gtcmVzdWx0c19fdHlwZSBkb2NzLXNlYXJjaC1yZXN1bHRzX19sdmwzXCI+XG4gICAgICAgICAgICAgICAge3sgcmVzdWx0LmhpZXJhcmNoeT8ubHZsMyB9fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8IS0tIFBhZ2UgdGl0bGUgLS0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvY3MtcmVzdWx0LXBhZ2UtdGl0bGVcIj57eyByZXN1bHQuaGllcmFyY2h5Py5sdmwwIH19PC9zcGFuPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgfVxuICAgICAgPC9saT5cbiAgICAgIH1cbiAgICA8L3VsPlxuICAgIH0gQGVsc2Uge1xuICAgIDxkaXYgY2xhc3M9XCJkb2NzLXNlYXJjaC1yZXN1bHRzIGRvY3MtbWluaS1zY3JvbGwtdHJhY2tcIj5cbiAgICAgIEBpZiAoc2VhcmNoUmVzdWx0cygpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIDxkaXYgY2xhc3M9XCJkb2NzLXNlYXJjaC1yZXN1bHRzX19zdGFydC10eXBpbmdcIj5cbiAgICAgICAgPHNwYW4+U3RhcnQgdHlwaW5nIHRvIHNlZSByZXN1bHRzPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB9IEBlbHNlIGlmIChzZWFyY2hSZXN1bHRzKCk/Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgPGRpdiBjbGFzcz1cImRvY3Mtc2VhcmNoLXJlc3VsdHNfX25vLXJlc3VsdHNcIj5cbiAgICAgICAgPHNwYW4+Tm8gcmVzdWx0cyBmb3VuZDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgIDwvZGl2PlxuICAgIH1cblxuICAgIDxkaXYgY2xhc3M9XCJkb2NzLWFsZ29saWFcIj5cbiAgICAgIDxzcGFuPlNlYXJjaCBieTwvc3Bhbj5cbiAgICAgIDxhIGhyZWY9XCJodHRwczovL3d3dy5hbGdvbGlhLmNvbS9kZXZlbG9wZXJzL1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+XG4gICAgICAgIDxkb2NzLWFsZ29saWEtaWNvbiAvPlxuICAgICAgPC9hPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGlhbG9nPlxuIl19