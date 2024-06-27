/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import * as i0 from "@angular/core";
export class ClickOutside {
    constructor() {
        this.ignoredElementsIds = [];
        this.clickOutside = new EventEmitter();
        this.document = inject(DOCUMENT);
        this.elementRef = inject((ElementRef));
    }
    onClick($event) {
        if (!this.elementRef.nativeElement.contains($event.target) &&
            !this.wasClickedOnIgnoredElement($event)) {
            this.clickOutside.emit();
        }
    }
    wasClickedOnIgnoredElement($event) {
        if (this.ignoredElementsIds.length === 0) {
            return false;
        }
        return this.ignoredElementsIds.some((elementId) => {
            const element = this.document.getElementById(elementId);
            const target = $event.target;
            const contains = element?.contains(target);
            return contains;
        });
    }
}
ClickOutside.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.0-next.4", ngImport: i0, type: ClickOutside, deps: [], target: i0.ɵɵFactoryTarget.Directive });
ClickOutside.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.0-next.4", type: ClickOutside, isStandalone: true, selector: "[docsClickOutside]", inputs: { ignoredElementsIds: ["docsClickOutsideIgnore", "ignoredElementsIds"] }, outputs: { clickOutside: "docsClickOutside" }, host: { listeners: { "document:click": "onClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.0-next.4", ngImport: i0, type: ClickOutside, decorators: [{
            type: Directive,
            args: [{
                    selector: '[docsClickOutside]',
                    standalone: true,
                    host: {
                        '(document:click)': 'onClick($event)',
                    },
                }]
        }], propDecorators: { ignoredElementsIds: [{
                type: Input,
                args: ['docsClickOutsideIgnore']
            }], clickOutside: [{
                type: Output,
                args: ['docsClickOutside']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZS9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQVN6RixNQUFNLE9BQU8sWUFBWTtJQVB6QjtRQVEwQyx1QkFBa0IsR0FBYSxFQUFFLENBQUM7UUFDdkMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRTFELGFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsZUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFBLFVBQXVCLENBQUEsQ0FBQyxDQUFDO0tBdUIvRDtJQXJCQyxPQUFPLENBQUMsTUFBb0I7UUFDMUIsSUFDRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ3RELENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxFQUN4QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVPLDBCQUEwQixDQUFDLE1BQW9CO1FBQ3JELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN6QyxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN4RCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBYyxDQUFDO1lBQ3JDLE1BQU0sUUFBUSxHQUFHLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnSEEzQlUsWUFBWTtvR0FBWixZQUFZO2tHQUFaLFlBQVk7a0JBUHhCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLElBQUksRUFBRTt3QkFDSixrQkFBa0IsRUFBRSxpQkFBaUI7cUJBQ3RDO2lCQUNGOzhCQUV5QyxrQkFBa0I7c0JBQXpELEtBQUs7dUJBQUMsd0JBQXdCO2dCQUNJLFlBQVk7c0JBQTlDLE1BQU07dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RvY3NDbGlja091dHNpZGVdJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaG9zdDoge1xuICAgICcoZG9jdW1lbnQ6Y2xpY2spJzogJ29uQ2xpY2soJGV2ZW50KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrT3V0c2lkZSB7XG4gIEBJbnB1dCgnZG9jc0NsaWNrT3V0c2lkZUlnbm9yZScpIHB1YmxpYyBpZ25vcmVkRWxlbWVudHNJZHM6IHN0cmluZ1tdID0gW107XG4gIEBPdXRwdXQoJ2RvY3NDbGlja091dHNpZGUnKSBwdWJsaWMgY2xpY2tPdXRzaWRlID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgZG9jdW1lbnQgPSBpbmplY3QoRE9DVU1FTlQpO1xuICBwcml2YXRlIHJlYWRvbmx5IGVsZW1lbnRSZWYgPSBpbmplY3QoRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pO1xuXG4gIG9uQ2xpY2soJGV2ZW50OiBQb2ludGVyRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoJGV2ZW50LnRhcmdldCkgJiZcbiAgICAgICF0aGlzLndhc0NsaWNrZWRPbklnbm9yZWRFbGVtZW50KCRldmVudClcbiAgICApIHtcbiAgICAgIHRoaXMuY2xpY2tPdXRzaWRlLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHdhc0NsaWNrZWRPbklnbm9yZWRFbGVtZW50KCRldmVudDogUG9pbnRlckV2ZW50KTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuaWdub3JlZEVsZW1lbnRzSWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmlnbm9yZWRFbGVtZW50c0lkcy5zb21lKChlbGVtZW50SWQpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XG4gICAgICBjb25zdCB0YXJnZXQgPSAkZXZlbnQudGFyZ2V0IGFzIE5vZGU7XG4gICAgICBjb25zdCBjb250YWlucyA9IGVsZW1lbnQ/LmNvbnRhaW5zKHRhcmdldCk7XG4gICAgICByZXR1cm4gY29udGFpbnM7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==