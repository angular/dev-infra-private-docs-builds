/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Pipe } from '@angular/core';
import { normalizePath, removeTrailingSlash } from '../utils';
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
RelativeLink.ɵfac = function RelativeLink_Factory(t) { return new (t || RelativeLink)(); };
RelativeLink.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "relativeLink", type: RelativeLink, pure: true, standalone: true });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RelativeLink, [{
        type: Pipe,
        args: [{
                name: 'relativeLink',
                standalone: true,
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUtbGluay5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy9waXBlcy9yZWxhdGl2ZS1saW5rLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFDLGFBQWEsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLFVBQVUsQ0FBQzs7QUFNNUQsTUFBTSxPQUFPLFlBQVk7SUFDdkIsU0FBUyxDQUFDLFdBQW1CLEVBQUUsU0FBMkMsVUFBVTtRQUNsRixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUVoRCxJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUN0QixPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsSUFBSSxNQUFNLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDMUIsT0FBTyxHQUFHLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQy9ELENBQUM7UUFDRCxPQUFPLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUM7SUFDaEYsQ0FBQzs7d0VBWFUsWUFBWTtpRkFBWixZQUFZO2lGQUFaLFlBQVk7Y0FKeEIsSUFBSTtlQUFDO2dCQUNKLElBQUksRUFBRSxjQUFjO2dCQUNwQixVQUFVLEVBQUUsSUFBSTthQUNqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7bm9ybWFsaXplUGF0aCwgcmVtb3ZlVHJhaWxpbmdTbGFzaH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdyZWxhdGl2ZUxpbmsnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBSZWxhdGl2ZUxpbmsgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGFic29sdXRlVXJsOiBzdHJpbmcsIHJlc3VsdDogJ3JlbGF0aXZlJyB8ICdwYXRobmFtZScgfCAnaGFzaCcgPSAncmVsYXRpdmUnKTogc3RyaW5nIHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKG5vcm1hbGl6ZVBhdGgoYWJzb2x1dGVVcmwpKTtcblxuICAgIGlmIChyZXN1bHQgPT09ICdoYXNoJykge1xuICAgICAgcmV0dXJuIHVybC5oYXNoPy5zdWJzdHJpbmcoMSkgPz8gJyc7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgPT09ICdwYXRobmFtZScpIHtcbiAgICAgIHJldHVybiBgJHtyZW1vdmVUcmFpbGluZ1NsYXNoKG5vcm1hbGl6ZVBhdGgodXJsLnBhdGhuYW1lKSl9YDtcbiAgICB9XG4gICAgcmV0dXJuIGAke3JlbW92ZVRyYWlsaW5nU2xhc2gobm9ybWFsaXplUGF0aCh1cmwucGF0aG5hbWUpKX0ke3VybC5oYXNoID8/ICcnfWA7XG4gIH1cbn1cbiJdfQ==