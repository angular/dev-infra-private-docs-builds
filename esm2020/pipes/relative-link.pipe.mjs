/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Pipe } from '@angular/core';
import { normalizePath, removeTrailingSlash } from '../utils/index';
import * as i0 from "@angular/core";
export class RelativeLink {
    transform(absoluteUrl, result = 'relative') {
        const url = new URL(normalizePath(absoluteUrl));
        if (result === 'hash') {
            return url.hash?.substring(1) ?? '';
        }
        if (result === 'pathname') {
            return `${removeTrailingSlash(normalizePath(url.pathname))}`;
        }
        return `${removeTrailingSlash(normalizePath(url.pathname))}${url.hash ?? ''}`;
    }
}
RelativeLink.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.2", ngImport: i0, type: RelativeLink, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
RelativeLink.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.0.0-next.2", ngImport: i0, type: RelativeLink, isStandalone: true, name: "relativeLink" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.2", ngImport: i0, type: RelativeLink, decorators: [{
            type: Pipe,
            args: [{
                    name: 'relativeLink',
                    standalone: true,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUtbGluay5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9waXBlcy9yZWxhdGl2ZS1saW5rLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQU1sRSxNQUFNLE9BQU8sWUFBWTtJQUN2QixTQUFTLENBQUMsV0FBbUIsRUFBRSxTQUEyQyxVQUFVO1FBQ2xGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBRWhELElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLENBQUM7UUFDRCxJQUFJLE1BQU0sS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUMxQixPQUFPLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0QsQ0FBQztRQUNELE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQztJQUNoRixDQUFDOztnSEFYVSxZQUFZOzhHQUFaLFlBQVk7a0dBQVosWUFBWTtrQkFKeEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsY0FBYztvQkFDcEIsVUFBVSxFQUFFLElBQUk7aUJBQ2pCIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtub3JtYWxpemVQYXRoLCByZW1vdmVUcmFpbGluZ1NsYXNofSBmcm9tICcuLi91dGlscy9pbmRleCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3JlbGF0aXZlTGluaycsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIFJlbGF0aXZlTGluayBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oYWJzb2x1dGVVcmw6IHN0cmluZywgcmVzdWx0OiAncmVsYXRpdmUnIHwgJ3BhdGhuYW1lJyB8ICdoYXNoJyA9ICdyZWxhdGl2ZScpOiBzdHJpbmcge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwobm9ybWFsaXplUGF0aChhYnNvbHV0ZVVybCkpO1xuXG4gICAgaWYgKHJlc3VsdCA9PT0gJ2hhc2gnKSB7XG4gICAgICByZXR1cm4gdXJsLmhhc2g/LnN1YnN0cmluZygxKSA/PyAnJztcbiAgICB9XG4gICAgaWYgKHJlc3VsdCA9PT0gJ3BhdGhuYW1lJykge1xuICAgICAgcmV0dXJuIGAke3JlbW92ZVRyYWlsaW5nU2xhc2gobm9ybWFsaXplUGF0aCh1cmwucGF0aG5hbWUpKX1gO1xuICAgIH1cbiAgICByZXR1cm4gYCR7cmVtb3ZlVHJhaWxpbmdTbGFzaChub3JtYWxpemVQYXRoKHVybC5wYXRobmFtZSkpfSR7dXJsLmhhc2ggPz8gJyd9YDtcbiAgfVxufVxuIl19