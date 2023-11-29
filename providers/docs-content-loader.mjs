/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { InjectionToken, inject } from '@angular/core';
export const DOCS_CONTENT_LOADER = new InjectionToken('DOCS_CONTENT_LOADER');
export function contentResolver(contentPath) {
    return () => inject(DOCS_CONTENT_LOADER).getContent(contentPath);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jcy1jb250ZW50LWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2RvY3MvcHJvdmlkZXJzL2RvY3MtY29udGVudC1sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJckQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxjQUFjLENBQW9CLHFCQUFxQixDQUFDLENBQUM7QUFFaEcsTUFBTSxVQUFVLGVBQWUsQ0FBQyxXQUFtQjtJQUNqRCxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGlvblRva2VuLCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZXNvbHZlRm59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge0RvY0NvbnRlbnQsIERvY3NDb250ZW50TG9hZGVyfSBmcm9tICcuLi9pbnRlcmZhY2VzL2luZGV4LmpzJztcblxuZXhwb3J0IGNvbnN0IERPQ1NfQ09OVEVOVF9MT0FERVIgPSBuZXcgSW5qZWN0aW9uVG9rZW48RG9jc0NvbnRlbnRMb2FkZXI+KCdET0NTX0NPTlRFTlRfTE9BREVSJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250ZW50UmVzb2x2ZXIoY29udGVudFBhdGg6IHN0cmluZyk6IFJlc29sdmVGbjxEb2NDb250ZW50IHwgdW5kZWZpbmVkPiB7XG4gIHJldHVybiAoKSA9PiBpbmplY3QoRE9DU19DT05URU5UX0xPQURFUikuZ2V0Q29udGVudChjb250ZW50UGF0aCk7XG59XG4iXX0=