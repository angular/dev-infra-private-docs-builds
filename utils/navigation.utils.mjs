/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { inject } from '@angular/core';
import { DOCS_CONTENT_LOADER } from '../providers/index.js';
export const flatNavigationData = (tree) => {
    const result = [];
    const traverse = (node, level) => {
        node.level = level;
        if (node.path) {
            result.push(node);
        }
        if (node.children) {
            for (const child of node.children) {
                child.parent = node;
                traverse(child, level + 1);
            }
        }
    };
    for (const node of tree) {
        traverse(node, 1);
    }
    return result;
};
export const getNavigationItemsTree = (tree, mapFn) => {
    const traverse = (node) => {
        mapFn(node);
        if (node.children) {
            for (const child of node.children) {
                traverse(child);
            }
        }
    };
    for (const node of tree) {
        traverse(node);
    }
    return tree;
};
export const findNavigationItem = (items, predicate) => {
    let result = null;
    const traverse = (node) => {
        if (predicate(node)) {
            result = node;
        }
        if (node.children && !result) {
            for (const child of node.children) {
                traverse(child);
            }
        }
    };
    for (const node of items) {
        traverse(node);
    }
    return result;
};
export const isExternalLink = (link, windowOrigin) => new URL(link).origin !== windowOrigin;
export const markExternalLinks = (item, origin) => {
    if (item.path) {
        try {
            item.isExternal = isExternalLink(item.path, origin);
        }
        catch (err) { }
    }
};
export const mapNavigationItemsToRoutes = (navigationItems, additionalRouteProperties) => navigationItems
    .filter((route) => Boolean(route.path))
    .map((navigationItem) => {
    const route = {
        path: navigationItem.path,
        ...additionalRouteProperties,
    };
    route.data = {
        ...navigationItem,
        ...route.data,
    };
    route.resolve = {
        'docContent': (snapshot) => {
            return snapshot.data['contentPath'] !== undefined
                ? inject(DOCS_CONTENT_LOADER).getContent(snapshot.data['contentPath'])
                : undefined;
        },
        ...route.resolve,
    };
    return route;
});
export const normalizePath = (path) => {
    if (path[0] === '/') {
        return path.substring(1);
    }
    return path;
};
export const getBaseUrlAfterRedirects = (url, router) => {
    const route = router.parseUrl(url);
    route.fragment = null;
    route.queryParams = {};
    return normalizePath(route.toString());
};
export function handleHrefClickEventWithRouter(e, router) {
    const pointerEvent = e;
    if (pointerEvent.ctrlKey ||
        pointerEvent.shiftKey ||
        pointerEvent.altKey ||
        pointerEvent.metaKey) {
        return;
    }
    const closestAnchor = e.target.closest('a');
    if (closestAnchor?.target && closestAnchor.target !== 'self') {
        return;
    }
    const relativeUrl = closestAnchor?.getAttribute?.('href');
    if (relativeUrl) {
        e.preventDefault();
        router.navigateByUrl(relativeUrl);
    }
}
export function getActivatedRouteSnapshotFromRouter(router) {
    let route = router.routerState.root.snapshot;
    while (route.firstChild) {
        route = route.firstChild;
    }
    return route;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi51dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2RvY3MvdXRpbHMvbmF2aWdhdGlvbi51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3JDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBc0IsRUFBRSxFQUFFO0lBQzNELE1BQU0sTUFBTSxHQUFxQixFQUFFLENBQUM7SUFFcEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFvQixFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsQ0FDcEMsSUFBc0IsRUFDdEIsS0FBcUMsRUFD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QUFXLEdBQUcsYUFBYSxFQUFFLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFELElBQUksV0FBVyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsbUNBQW1DLENBQUMsTUFBYztJQUNoRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFFN0MsT0FBTyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZSwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtOYXZpZ2F0aW9uSXRlbX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9pbmRleC5qcyc7XG5pbXBvcnQge0RPQ1NfQ09OVEVOVF9MT0FERVJ9IGZyb20gJy4uL3Byb3ZpZGVycy9pbmRleC5qcyc7XG5cbmV4cG9ydCBjb25zdCBmbGF0TmF2aWdhdGlvbkRhdGEgPSAodHJlZTogTmF2aWdhdGlvbkl0ZW1bXSkgPT4ge1xuICBjb25zdCByZXN1bHQ6IE5hdmlnYXRpb25JdGVtW10gPSBbXTtcblxuICBjb25zdCB0cmF2ZXJzZSA9IChub2RlOiBOYXZpZ2F0aW9uSXRlbSwgbGV2ZWw6IG51bWJlcikgPT4ge1xuICAgIG5vZGUubGV2ZWwgPSBsZXZlbDtcbiAgICBpZiAobm9kZS5wYXRoKSB7XG4gICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICB9XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgICBjaGlsZC5wYXJlbnQgPSBub2RlO1xuICAgICAgICB0cmF2ZXJzZShjaGlsZCwgbGV2ZWwgKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZm9yIChjb25zdCBub2RlIG9mIHRyZWUpIHtcbiAgICB0cmF2ZXJzZShub2RlLCAxKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TmF2aWdhdGlvbkl0ZW1zVHJlZSA9IChcbiAgdHJlZTogTmF2aWdhdGlvbkl0ZW1bXSxcbiAgbWFwRm46IChpdGVtOiBOYXZpZ2F0aW9uSXRlbSkgPT4gdm9pZCxcbikgPT4ge1xuICBjb25zdCB0cmF2ZXJzZSA9IChub2RlOiBOYXZpZ2F0aW9uSXRlbSkgPT4ge1xuICAgIG1hcEZuKG5vZGUpO1xuICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgdHJhdmVyc2UoY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBmb3IgKGNvbnN0IG5vZGUgb2YgdHJlZSkge1xuICAgIHRyYXZlcnNlKG5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIHRyZWU7XG59O1xuXG5leHBvcnQgY29uc3QgZmluZE5hdmlnYXRpb25JdGVtID0gKFxuICBpdGVtczogTmF2aWdhdGlvbkl0ZW1bXSxcbiAgcHJlZGljYXRlOiAoaXRlbTogTmF2aWdhdGlvbkl0ZW0pID0+IGJvb2xlYW4sXG4pOiBOYXZpZ2F0aW9uSXRlbSB8IG51bGwgPT4ge1xuICBsZXQgcmVzdWx0OiBOYXZpZ2F0aW9uSXRlbSB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0IHRyYXZlcnNlID0gKG5vZGU6IE5hdmlnYXRpb25JdGVtKSA9PiB7XG4gICAgaWYgKHByZWRpY2F0ZShub2RlKSkge1xuICAgICAgcmVzdWx0ID0gbm9kZTtcbiAgICB9XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgIXJlc3VsdCkge1xuICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgIHRyYXZlcnNlKGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZm9yIChjb25zdCBub2RlIG9mIGl0ZW1zKSB7XG4gICAgdHJhdmVyc2Uobm9kZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGNvbnN0IGlzRXh0ZXJuYWxMaW5rID0gKGxpbms6IHN0cmluZywgd2luZG93T3JpZ2luOiBzdHJpbmcpID0+XG4gIG5ldyBVUkwobGluaykub3JpZ2luICE9PSB3aW5kb3dPcmlnaW47XG5cbmV4cG9ydCBjb25zdCBtYXJrRXh0ZXJuYWxMaW5rcyA9IChpdGVtOiBOYXZpZ2F0aW9uSXRlbSwgb3JpZ2luOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKGl0ZW0ucGF0aCkge1xuICAgIHRyeSB7XG4gICAgICBpdGVtLmlzRXh0ZXJuYWwgPSBpc0V4dGVybmFsTGluayhpdGVtLnBhdGgsIG9yaWdpbik7XG4gICAgfSBjYXRjaCAoZXJyKSB7fVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbWFwTmF2aWdhdGlvbkl0ZW1zVG9Sb3V0ZXMgPSAoXG4gIG5hdmlnYXRpb25JdGVtczogTmF2aWdhdGlvbkl0ZW1bXSxcbiAgYWRkaXRpb25hbFJvdXRlUHJvcGVydGllczogUGFydGlhbDxSb3V0ZT4sXG4pOiBSb3V0ZVtdID0+XG4gIG5hdmlnYXRpb25JdGVtc1xuICAgIC5maWx0ZXIoKHJvdXRlKTogcm91dGUgaXMgTmF2aWdhdGlvbkl0ZW0gJiB7cGF0aDogc3RyaW5nfSA9PiBCb29sZWFuKHJvdXRlLnBhdGgpKVxuICAgIC5tYXAoKG5hdmlnYXRpb25JdGVtKSA9PiB7XG4gICAgICBjb25zdCByb3V0ZSA9IHtcbiAgICAgICAgcGF0aDogbmF2aWdhdGlvbkl0ZW0ucGF0aCxcbiAgICAgICAgLi4uYWRkaXRpb25hbFJvdXRlUHJvcGVydGllcyxcbiAgICAgIH07XG5cbiAgICAgIHJvdXRlLmRhdGEgPSB7XG4gICAgICAgIC4uLm5hdmlnYXRpb25JdGVtLFxuICAgICAgICAuLi5yb3V0ZS5kYXRhLFxuICAgICAgfTtcblxuICAgICAgcm91dGUucmVzb2x2ZSA9IHtcbiAgICAgICAgJ2RvY0NvbnRlbnQnOiAoc25hcHNob3Q6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpID0+IHtcbiAgICAgICAgICByZXR1cm4gc25hcHNob3QuZGF0YVsnY29udGVudFBhdGgnXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGluamVjdChET0NTX0NPTlRFTlRfTE9BREVSKS5nZXRDb250ZW50KHNuYXBzaG90LmRhdGFbJ2NvbnRlbnRQYXRoJ10pXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgICAgLi4ucm91dGUucmVzb2x2ZSxcbiAgICAgIH07XG4gICAgICByZXR1cm4gcm91dGU7XG4gICAgfSk7XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVQYXRoID0gKHBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmIChwYXRoWzBdID09PSAnLycpIHtcbiAgICByZXR1cm4gcGF0aC5zdWJzdHJpbmcoMSk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QmFzZVVybEFmdGVyUmVkaXJlY3RzID0gKHVybDogc3RyaW5nLCByb3V0ZXI6IFJvdXRlcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHJvdXRlID0gcm91dGVyLnBhcnNlVXJsKHVybCk7XG4gIHJvdXRlLmZyYWdtZW50ID0gbnVsbDtcbiAgcm91dGUucXVlcnlQYXJhbXMgPSB7fTtcbiAgcmV0dXJuIG5vcm1hbGl6ZVBhdGgocm91dGUudG9TdHJpbmcoKSk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlSHJlZkNsaWNrRXZlbnRXaXRoUm91dGVyKGU6IEV2ZW50LCByb3V0ZXI6IFJvdXRlcikge1xuICBjb25zdCBwb2ludGVyRXZlbnQgPSBlIGFzIFBvaW50ZXJFdmVudDtcbiAgaWYgKFxuICAgIHBvaW50ZXJFdmVudC5jdHJsS2V5IHx8XG4gICAgcG9pbnRlckV2ZW50LnNoaWZ0S2V5IHx8XG4gICAgcG9pbnRlckV2ZW50LmFsdEtleSB8fFxuICAgIHBvaW50ZXJFdmVudC5tZXRhS2V5XG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNsb3Nlc3RBbmNob3IgPSAoZS50YXJnZXQgYXMgRWxlbWVudCkuY2xvc2VzdCgnYScpO1xuICBpZiAoY2xvc2VzdEFuY2hvcj8udGFyZ2V0ICYmIGNsb3Nlc3RBbmNob3IudGFyZ2V0ICE9PSAnc2VsZicpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZWxhdGl2ZVVybCA9IGNsb3Nlc3RBbmNob3I/LmdldEF0dHJpYnV0ZT8uKCdocmVmJyk7XG4gIGlmIChyZWxhdGl2ZVVybCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByb3V0ZXIubmF2aWdhdGVCeVVybChyZWxhdGl2ZVVybCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGl2YXRlZFJvdXRlU25hcHNob3RGcm9tUm91dGVyKHJvdXRlcjogUm91dGVyKTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB7XG4gIGxldCByb3V0ZSA9IHJvdXRlci5yb3V0ZXJTdGF0ZS5yb290LnNuYXBzaG90O1xuXG4gIHdoaWxlIChyb3V0ZS5maXJzdENoaWxkKSB7XG4gICAgcm91dGUgPSByb3V0ZS5maXJzdENoaWxkO1xuICB9XG4gIHJldHVybiByb3V0ZTtcbn1cbiJdfQ==