/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationState } from '../../services';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
function Breadcrumb_For_1_Conditional_1_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 1);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const breadcrumb_r1 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("href", breadcrumb_r1.path, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(breadcrumb_r1.label);
} }
function Breadcrumb_For_1_Conditional_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 2);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const breadcrumb_r1 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("routerLink", "/" + breadcrumb_r1.path);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(breadcrumb_r1.label);
} }
function Breadcrumb_For_1_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, Breadcrumb_For_1_Conditional_1_Conditional_0_Template, 2, 2, "a", 1)(1, Breadcrumb_For_1_Conditional_1_Conditional_1_Template, 2, 2);
} if (rf & 2) {
    const breadcrumb_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵconditional(0, breadcrumb_r1.isExternal ? 0 : 1);
} }
function Breadcrumb_For_1_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const breadcrumb_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(breadcrumb_r1.label);
} }
function Breadcrumb_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0);
    i0.ɵɵtemplate(1, Breadcrumb_For_1_Conditional_1_Template, 2, 1)(2, Breadcrumb_For_1_Conditional_2_Template, 2, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const breadcrumb_r1 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵconditional(1, breadcrumb_r1.path ? 1 : 2);
} }
export class Breadcrumb {
    constructor() {
        this.navigationState = inject(NavigationState);
        this.breadcrumbItems = signal([]);
    }
    ngOnInit() {
        this.setBreadcrumbItemsBasedOnNavigationStructure();
    }
    setBreadcrumbItemsBasedOnNavigationStructure() {
        let breadcrumbs = [];
        const traverse = (node) => {
            if (!node) {
                return;
            }
            if (node.parent) {
                breadcrumbs = [node.parent, ...breadcrumbs];
                traverse(node.parent);
            }
        };
        traverse(this.navigationState.activeNavigationItem());
        this.breadcrumbItems.set(breadcrumbs);
    }
}
Breadcrumb.ɵfac = function Breadcrumb_Factory(t) { return new (t || Breadcrumb)(); };
Breadcrumb.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Breadcrumb, selectors: [["docs-breadcrumb"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 0, consts: [[1, "docs-breadcrumb"], [3, "href"], [3, "routerLink"], ["class", "docs-breadcrumb"]], template: function Breadcrumb_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵrepeaterCreate(0, Breadcrumb_For_1_Template, 3, 1, "div", 3, i0.ɵɵrepeaterTrackByIdentity);
    } if (rf & 2) {
        i0.ɵɵrepeater(ctx.breadcrumbItems());
    } }, dependencies: [RouterLink], styles: ["[_nghost-%COMP%]{display:flex;align-items:center;padding-block-end:1.5rem}.docs-breadcrumb[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--quaternary-contrast);font-size:.875rem;display:flex;align-items:center}.docs-breadcrumb[_ngcontent-%COMP%]:not(:last-child)   span[_ngcontent-%COMP%]::after{content:\"chevron_right\";font-family:var(--icons);margin-inline:.5rem;color:var(--quinary-contrast)}/*# sourceMappingURL=breadcrumb.component.css.map */"], changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Breadcrumb, [{
        type: Component,
        args: [{ selector: 'docs-breadcrumb', standalone: true, imports: [NgIf, NgFor, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (breadcrumb of breadcrumbItems(); track breadcrumb) {\n  <div class=\"docs-breadcrumb\">\n    @if (breadcrumb.path) {\n      @if (breadcrumb.isExternal) {\n        <a [href]=\"breadcrumb.path\">{{ breadcrumb.label }}</a>\n      } @else {\n        <a [routerLink]=\"'/' + breadcrumb.path\">{{ breadcrumb.label }}</a>\n      }\n    } @else {\n      <span>{{ breadcrumb.label }}</span>\n    }\n  </div>\n}\n", styles: [":host{display:flex;align-items:center;padding-block-end:1.5rem}.docs-breadcrumb span{color:var(--quaternary-contrast);font-size:.875rem;display:flex;align-items:center}.docs-breadcrumb:not(:last-child) span::after{content:\"chevron_right\";font-family:var(--icons);margin-inline:.5rem;color:var(--quinary-contrast)}/*# sourceMappingURL=breadcrumb.component.css.map */\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Breadcrumb, { className: "Breadcrumb", filePath: "docs/components/breadcrumb/breadcrumb.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7O0lDUm5DLDRCQUE0QjtJQUFBLFlBQXNCO0lBQUEsaUJBQUk7OztJQUFuRCwyREFBd0I7SUFBQyxlQUFzQjtJQUF0Qix5Q0FBc0I7OztJQUVsRCw0QkFBd0M7SUFBQSxZQUFzQjtJQUFBLGlCQUFJOzs7SUFBL0QscURBQW9DO0lBQUMsZUFBc0I7SUFBdEIseUNBQXNCOzs7SUFIaEUscUZBRUMsZ0VBQUE7OztJQUZELHFEQUVDOzs7SUFJRCw0QkFBTTtJQUFBLFlBQXNCO0lBQUEsaUJBQU87OztJQUE3QixlQUFzQjtJQUF0Qix5Q0FBc0I7OztJQVJoQyw4QkFBNkI7SUFDM0IsK0RBTUMsa0RBQUE7SUFHSCxpQkFBTTs7O0lBVEosZUFNQztJQU5ELCtDQU1DOztBRGNMLE1BQU0sT0FBTyxVQUFVO0lBUnZCO1FBU21CLG9CQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTNELG9CQUFlLEdBQUcsTUFBTSxDQUFtQixFQUFFLENBQUMsQ0FBQztLQXdCaEQ7SUF0QkMsUUFBUTtRQUNOLElBQUksQ0FBQyw0Q0FBNEMsRUFBRSxDQUFDO0lBQ3RELENBQUM7SUFFTyw0Q0FBNEM7UUFDbEQsSUFBSSxXQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUV2QyxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQTJCLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1YsT0FBTztZQUNULENBQUM7WUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDO2dCQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDSCxDQUFDLENBQUM7UUFFRixRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7b0VBMUJVLFVBQVU7NkRBQVYsVUFBVTtRQ3RCdkIsK0ZBWUM7O1FBWkQsb0NBWUM7d0JES3dCLFVBQVU7aUZBS3RCLFVBQVU7Y0FSdEIsU0FBUzsyQkFDRSxpQkFBaUIsY0FDZixJQUFJLFdBQ1AsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxtQkFHakIsdUJBQXVCLENBQUMsTUFBTTs7a0ZBRXBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0LCBpbmplY3QsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25TdGF0ZX0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uSXRlbX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge05nRm9yLCBOZ0lmfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLWJyZWFkY3J1bWInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdJZiwgTmdGb3IsIFJvdXRlckxpbmtdLFxuICB0ZW1wbGF0ZVVybDogJy4vYnJlYWRjcnVtYi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JyZWFkY3J1bWIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWIgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHJlYWRvbmx5IG5hdmlnYXRpb25TdGF0ZSA9IGluamVjdChOYXZpZ2F0aW9uU3RhdGUpO1xuXG4gIGJyZWFkY3J1bWJJdGVtcyA9IHNpZ25hbDxOYXZpZ2F0aW9uSXRlbVtdPihbXSk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRCcmVhZGNydW1iSXRlbXNCYXNlZE9uTmF2aWdhdGlvblN0cnVjdHVyZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCcmVhZGNydW1iSXRlbXNCYXNlZE9uTmF2aWdhdGlvblN0cnVjdHVyZSgpOiB2b2lkIHtcbiAgICBsZXQgYnJlYWRjcnVtYnM6IE5hdmlnYXRpb25JdGVtW10gPSBbXTtcblxuICAgIGNvbnN0IHRyYXZlcnNlID0gKG5vZGU6IE5hdmlnYXRpb25JdGVtIHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICAgIGJyZWFkY3J1bWJzID0gW25vZGUucGFyZW50LCAuLi5icmVhZGNydW1ic107XG4gICAgICAgIHRyYXZlcnNlKG5vZGUucGFyZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdHJhdmVyc2UodGhpcy5uYXZpZ2F0aW9uU3RhdGUuYWN0aXZlTmF2aWdhdGlvbkl0ZW0oKSk7XG5cbiAgICB0aGlzLmJyZWFkY3J1bWJJdGVtcy5zZXQoYnJlYWRjcnVtYnMpO1xuICB9XG59XG4iLCJAZm9yIChicmVhZGNydW1iIG9mIGJyZWFkY3J1bWJJdGVtcygpOyB0cmFjayBicmVhZGNydW1iKSB7XG4gIDxkaXYgY2xhc3M9XCJkb2NzLWJyZWFkY3J1bWJcIj5cbiAgICBAaWYgKGJyZWFkY3J1bWIucGF0aCkge1xuICAgICAgQGlmIChicmVhZGNydW1iLmlzRXh0ZXJuYWwpIHtcbiAgICAgICAgPGEgW2hyZWZdPVwiYnJlYWRjcnVtYi5wYXRoXCI+e3sgYnJlYWRjcnVtYi5sYWJlbCB9fTwvYT5cbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICA8YSBbcm91dGVyTGlua109XCInLycgKyBicmVhZGNydW1iLnBhdGhcIj57eyBicmVhZGNydW1iLmxhYmVsIH19PC9hPlxuICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgPHNwYW4+e3sgYnJlYWRjcnVtYi5sYWJlbCB9fTwvc3Bhbj5cbiAgICB9XG4gIDwvZGl2PlxufVxuIl19