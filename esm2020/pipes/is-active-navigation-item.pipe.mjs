/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class IsActiveNavigationItem {
    // Check whether provided item: `itemToCheck` should be marked as active, based on `activeItem`.
    // In addition to `activeItem`, we should mark all its parents, grandparents, etc. as active.
    transform(itemToCheck, activeItem) {
        let node = activeItem?.parent;
        while (node) {
            if (node === itemToCheck) {
                return true;
            }
            node = node.parent;
        }
        return false;
    }
}
IsActiveNavigationItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: IsActiveNavigationItem, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
IsActiveNavigationItem.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.0-next.1", ngImport: i0, type: IsActiveNavigationItem, isStandalone: true, name: "isActiveNavigationItem" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.1", ngImport: i0, type: IsActiveNavigationItem, decorators: [{
            type: Pipe,
            args: [{
                    name: 'isActiveNavigationItem',
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYWN0aXZlLW5hdmlnYXRpb24taXRlbS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9waXBlcy9pcy1hY3RpdmUtbmF2aWdhdGlvbi1pdGVtLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7O0FBT2xELE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsZ0dBQWdHO0lBQ2hHLDZGQUE2RjtJQUM3RixTQUFTLENBQUMsV0FBMkIsRUFBRSxVQUFpQztRQUN0RSxJQUFJLElBQUksR0FBRyxVQUFVLEVBQUUsTUFBTSxDQUFDO1FBRTlCLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLElBQUksS0FBSyxXQUFXLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7MEhBZlUsc0JBQXNCO3dIQUF0QixzQkFBc0I7a0dBQXRCLHNCQUFzQjtrQkFKbEMsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixVQUFVLEVBQUUsSUFBSTtpQkFDakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05hdmlnYXRpb25JdGVtfSBmcm9tICcuLi9pbnRlcmZhY2VzL2luZGV4JztcblxuQFBpcGUoe1xuICBuYW1lOiAnaXNBY3RpdmVOYXZpZ2F0aW9uSXRlbScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIElzQWN0aXZlTmF2aWdhdGlvbkl0ZW0gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgLy8gQ2hlY2sgd2hldGhlciBwcm92aWRlZCBpdGVtOiBgaXRlbVRvQ2hlY2tgIHNob3VsZCBiZSBtYXJrZWQgYXMgYWN0aXZlLCBiYXNlZCBvbiBgYWN0aXZlSXRlbWAuXG4gIC8vIEluIGFkZGl0aW9uIHRvIGBhY3RpdmVJdGVtYCwgd2Ugc2hvdWxkIG1hcmsgYWxsIGl0cyBwYXJlbnRzLCBncmFuZHBhcmVudHMsIGV0Yy4gYXMgYWN0aXZlLlxuICB0cmFuc2Zvcm0oaXRlbVRvQ2hlY2s6IE5hdmlnYXRpb25JdGVtLCBhY3RpdmVJdGVtOiBOYXZpZ2F0aW9uSXRlbSB8IG51bGwpOiBib29sZWFuIHtcbiAgICBsZXQgbm9kZSA9IGFjdGl2ZUl0ZW0/LnBhcmVudDtcblxuICAgIHdoaWxlIChub2RlKSB7XG4gICAgICBpZiAobm9kZSA9PT0gaXRlbVRvQ2hlY2spIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==