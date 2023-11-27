/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export const isMobile = typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('mobi');
export const isApple = typeof window !== 'undefined' &&
    (/iPad|iPhone/.test(window.navigator.userAgent) || window.navigator.userAgent.includes('Mac'));
export const isIpad = typeof window !== 'undefined' &&
    isApple &&
    !!window.navigator.maxTouchPoints &&
    window.navigator.maxTouchPoints > 1;
export const isIos = (isMobile && isApple) || isIpad;
export const isFirefox = typeof window !== 'undefined' && window.navigator.userAgent.includes('Firefox/');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy91dGlscy9kZXZpY2UudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUNuQixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRTdGLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FDbEIsT0FBTyxNQUFNLEtBQUssV0FBVztJQUM3QixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUVqRyxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQ2pCLE9BQU8sTUFBTSxLQUFLLFdBQVc7SUFDN0IsT0FBTztJQUNQLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWM7SUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUM7QUFFckQsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUNwQixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgY29uc3QgaXNNb2JpbGUgPVxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdtb2JpJyk7XG5cbmV4cG9ydCBjb25zdCBpc0FwcGxlID1cbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgKC9pUGFkfGlQaG9uZS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoJ01hYycpKTtcblxuZXhwb3J0IGNvbnN0IGlzSXBhZCA9XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIGlzQXBwbGUgJiZcbiAgISF3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzICYmXG4gIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxO1xuXG5leHBvcnQgY29uc3QgaXNJb3MgPSAoaXNNb2JpbGUgJiYgaXNBcHBsZSkgfHwgaXNJcGFkO1xuXG5leHBvcnQgY29uc3QgaXNGaXJlZm94ID1cbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gvJyk7XG4iXX0=