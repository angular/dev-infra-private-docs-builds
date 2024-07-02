/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationState } from '../../services/index';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import * as i0 from "@angular/core";
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
Breadcrumb.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0-rc.0", ngImport: i0, type: Breadcrumb, deps: [], target: i0.ɵɵFactoryTarget.Component });
Breadcrumb.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.0-rc.0", type: Breadcrumb, isStandalone: true, selector: "docs-breadcrumb", ngImport: i0, template: "@for (breadcrumb of breadcrumbItems(); track breadcrumb) {\n  <div class=\"docs-breadcrumb\">\n    @if (breadcrumb.path) {\n      @if (breadcrumb.isExternal) {\n        <a [href]=\"breadcrumb.path\">{{ breadcrumb.label }}</a>\n      } @else {\n        <a [routerLink]=\"'/' + breadcrumb.path\">{{ breadcrumb.label }}</a>\n      }\n    } @else {\n      <span>{{ breadcrumb.label }}</span>\n    }\n  </div>\n}\n", styles: [":host{display:flex;align-items:center;padding-block-end:1.5rem}.docs-breadcrumb span{color:var(--quaternary-contrast);font-size:.875rem;display:flex;align-items:center}.docs-breadcrumb:not(:last-child) span::after{content:\"chevron_right\";font-family:var(--icons);margin-inline:.5rem;color:var(--quinary-contrast)}/*# sourceMappingURL=breadcrumb.component.css.map */\n"], dependencies: [{ kind: "directive", type: RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0-rc.0", ngImport: i0, type: Breadcrumb, decorators: [{
            type: Component,
            args: [{ selector: 'docs-breadcrumb', standalone: true, imports: [NgIf, NgFor, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: "@for (breadcrumb of breadcrumbItems(); track breadcrumb) {\n  <div class=\"docs-breadcrumb\">\n    @if (breadcrumb.path) {\n      @if (breadcrumb.isExternal) {\n        <a [href]=\"breadcrumb.path\">{{ breadcrumb.label }}</a>\n      } @else {\n        <a [routerLink]=\"'/' + breadcrumb.path\">{{ breadcrumb.label }}</a>\n      }\n    } @else {\n      <span>{{ breadcrumb.label }}</span>\n    }\n  </div>\n}\n", styles: [":host{display:flex;align-items:center;padding-block-end:1.5rem}.docs-breadcrumb span{color:var(--quaternary-contrast);font-size:.875rem;display:flex;align-items:center}.docs-breadcrumb:not(:last-child) span::after{content:\"chevron_right\";font-family:var(--icons);margin-inline:.5rem;color:var(--quinary-contrast)}/*# sourceMappingURL=breadcrumb.component.css.map */\n"] }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWRjcnVtYi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi9icmVhZGNydW1iLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9icmVhZGNydW1iL2JyZWFkY3J1bWIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRCxPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFVM0MsTUFBTSxPQUFPLFVBQVU7SUFSdkI7UUFTbUIsb0JBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFM0Qsb0JBQWUsR0FBRyxNQUFNLENBQW1CLEVBQUUsQ0FBQyxDQUFDO0tBd0JoRDtJQXRCQyxRQUFRO1FBQ04sSUFBSSxDQUFDLDRDQUE0QyxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVPLDRDQUE0QztRQUNsRCxJQUFJLFdBQVcsR0FBcUIsRUFBRSxDQUFDO1FBRXZDLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBMkIsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDVixPQUFPO1lBQ1QsQ0FBQztZQUVELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUM7Z0JBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsQ0FBQztRQUNILENBQUMsQ0FBQztRQUVGLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUV0RCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs0R0ExQlUsVUFBVTtnR0FBVixVQUFVLDJFQ3RCdkIsMlpBYUEsMmFESXlCLFVBQVU7Z0dBS3RCLFVBQVU7a0JBUnRCLFNBQVM7K0JBQ0UsaUJBQWlCLGNBQ2YsSUFBSSxXQUNQLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsbUJBR2pCLHVCQUF1QixDQUFDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0LCBpbmplY3QsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25TdGF0ZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvaW5kZXgnO1xuaW1wb3J0IHtOYXZpZ2F0aW9uSXRlbX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9pbmRleCc7XG5pbXBvcnQge05nRm9yLCBOZ0lmfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtSb3V0ZXJMaW5rfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLWJyZWFkY3J1bWInLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbTmdJZiwgTmdGb3IsIFJvdXRlckxpbmtdLFxuICB0ZW1wbGF0ZVVybDogJy4vYnJlYWRjcnVtYi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JyZWFkY3J1bWIuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEJyZWFkY3J1bWIgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHJlYWRvbmx5IG5hdmlnYXRpb25TdGF0ZSA9IGluamVjdChOYXZpZ2F0aW9uU3RhdGUpO1xuXG4gIGJyZWFkY3J1bWJJdGVtcyA9IHNpZ25hbDxOYXZpZ2F0aW9uSXRlbVtdPihbXSk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRCcmVhZGNydW1iSXRlbXNCYXNlZE9uTmF2aWdhdGlvblN0cnVjdHVyZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRCcmVhZGNydW1iSXRlbXNCYXNlZE9uTmF2aWdhdGlvblN0cnVjdHVyZSgpOiB2b2lkIHtcbiAgICBsZXQgYnJlYWRjcnVtYnM6IE5hdmlnYXRpb25JdGVtW10gPSBbXTtcblxuICAgIGNvbnN0IHRyYXZlcnNlID0gKG5vZGU6IE5hdmlnYXRpb25JdGVtIHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICAgIGJyZWFkY3J1bWJzID0gW25vZGUucGFyZW50LCAuLi5icmVhZGNydW1ic107XG4gICAgICAgIHRyYXZlcnNlKG5vZGUucGFyZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdHJhdmVyc2UodGhpcy5uYXZpZ2F0aW9uU3RhdGUuYWN0aXZlTmF2aWdhdGlvbkl0ZW0oKSk7XG5cbiAgICB0aGlzLmJyZWFkY3J1bWJJdGVtcy5zZXQoYnJlYWRjcnVtYnMpO1xuICB9XG59XG4iLCJAZm9yIChicmVhZGNydW1iIG9mIGJyZWFkY3J1bWJJdGVtcygpOyB0cmFjayBicmVhZGNydW1iKSB7XG4gIDxkaXYgY2xhc3M9XCJkb2NzLWJyZWFkY3J1bWJcIj5cbiAgICBAaWYgKGJyZWFkY3J1bWIucGF0aCkge1xuICAgICAgQGlmIChicmVhZGNydW1iLmlzRXh0ZXJuYWwpIHtcbiAgICAgICAgPGEgW2hyZWZdPVwiYnJlYWRjcnVtYi5wYXRoXCI+e3sgYnJlYWRjcnVtYi5sYWJlbCB9fTwvYT5cbiAgICAgIH0gQGVsc2Uge1xuICAgICAgICA8YSBbcm91dGVyTGlua109XCInLycgKyBicmVhZGNydW1iLnBhdGhcIj57eyBicmVhZGNydW1iLmxhYmVsIH19PC9hPlxuICAgICAgfVxuICAgIH0gQGVsc2Uge1xuICAgICAgPHNwYW4+e3sgYnJlYWRjcnVtYi5sYWJlbCB9fTwvc3Bhbj5cbiAgICB9XG4gIDwvZGl2PlxufVxuIl19