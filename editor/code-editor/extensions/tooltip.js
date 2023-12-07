/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { hoverTooltip } from '@codemirror/view';
import { marked } from 'marked';
import { filter, take } from 'rxjs';
export const getTooltipExtension = (emitter, currentFile, sendRequestToTsVfs) => {
    return hoverTooltip(async (_, pos) => {
        sendRequestToTsVfs({
            action: "display-tooltip-request" /* TsVfsWorkerActions.DISPLAY_TOOLTIP_REQUEST */,
            data: {
                file: currentFile().filename,
                position: pos,
            },
        });
        const response = await new Promise((resolve) => {
            emitter
                .pipe(filter((event) => event.action === "display-tooltip-response" /* TsVfsWorkerActions.DISPLAY_TOOLTIP_RESPONSE */), take(1))
                .subscribe((message) => {
                resolve(message.data);
            });
        });
        if (!response?.displayParts)
            return null;
        const { displayParts, tags, documentation } = response;
        return {
            pos,
            create() {
                const tooltip = document.createElement('div');
                tooltip.appendChild(getHtmlFromDisplayParts(displayParts));
                // use documentation if available as it's more informative than tags
                if (documentation?.[0]?.text) {
                    tooltip.appendChild(getMarkedHtmlFromString(documentation[0]?.text));
                }
                else if (tags?.length) {
                    tooltip.appendChild(getTagsHtml(tags));
                }
                return {
                    dom: tooltip,
                    // Note: force the tooltip to scroll to the top on mount and on position change
                    // because depending on the position of the mouse and the siez of the tooltip content,
                    // the tooltip might render with its initial scroll position on the bottom
                    mount: (_) => forceTooltipScrollTop(),
                    positioned: (_) => forceTooltipScrollTop(),
                    resize: false,
                };
            },
        };
    }, {
        hideOnChange: true,
    });
};
function forceTooltipScrollTop() {
    const activeTooltip = document.querySelector('.cm-tooltip');
    // only scroll if the tooltip is scrollable
    if (activeTooltip && activeTooltip.scrollHeight > activeTooltip.clientHeight) {
        activeTooltip.scroll(0, -activeTooltip.scrollHeight);
    }
}
function getMarkedHtmlFromString(content) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = marked(content);
    return wrapper;
}
function getHtmlFromDisplayParts(displayParts) {
    const wrapper = document.createElement('div');
    let displayPartWrapper = document.createElement('div');
    for (const part of displayParts) {
        const span = document.createElement('span');
        span.classList.add(part.kind);
        span.textContent = part.text;
        // create new div to separate lines when a line break is found
        if (part.kind === 'lineBreak') {
            wrapper.appendChild(displayPartWrapper);
            displayPartWrapper = document.createElement('div');
        }
        else {
            displayPartWrapper.appendChild(span);
        }
    }
    wrapper.appendChild(displayPartWrapper);
    return wrapper;
}
function getTagsHtml(tags) {
    const tagsWrapper = document.createElement('div');
    let contentString = '';
    for (let tag of tags) {
        contentString += `\n@${tag.name}\n`;
        if (tag.text) {
            for (const { text } of tag.text) {
                contentString += text;
            }
        }
    }
    tagsWrapper.innerHTML = marked(contentString);
    return tagsWrapper;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL2NvZGUtZWRpdG9yL2V4dGVuc2lvbnMvdG9vbHRpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQVUsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDdkQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM5QixPQUFPLEVBQVUsTUFBTSxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQVMzQyxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUNqQyxPQUF1RCxFQUN2RCxXQUErQixFQUMvQixrQkFBMkUsRUFDM0UsRUFBRTtJQUNGLE9BQU8sWUFBWSxDQUNqQixLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQVcsRUFBMkIsRUFBRTtRQUNoRCxrQkFBa0IsQ0FBQztZQUNqQixNQUFNLDRFQUE0QztZQUNsRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLFFBQVE7Z0JBQzVCLFFBQVEsRUFBRSxHQUFHO2FBQ2Q7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksT0FBTyxDQUF5QixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3JFLE9BQU87aUJBQ0osSUFBSSxDQUNILE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0saUZBQWdELENBQUMsRUFDL0UsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSO2lCQUNBLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUssQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVk7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QUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRXhDLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxJQUErQjtJQUNsRCxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxELElBQUksYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUV2QixLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3JCLGFBQWEsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUVwQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLEtBQUssTUFBTSxFQUFDLElBQUksRUFBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDOUIsYUFBYSxJQUFJLElBQUksQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQVcsQ0FBQztJQUV4RCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1NpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Rvb2x0aXAsIGhvdmVyVG9vbHRpcH0gZnJvbSAnQGNvZGVtaXJyb3Ivdmlldyc7XG5pbXBvcnQge21hcmtlZH0gZnJvbSAnbWFya2VkJztcbmltcG9ydCB7U3ViamVjdCwgZmlsdGVyLCB0YWtlfSBmcm9tICdyeGpzJztcbmltcG9ydCB0eXBlc2NyaXB0IGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge0VkaXRvckZpbGV9IGZyb20gJy4uL2ludGVyZmFjZXMvZWRpdG9yLWZpbGUuanMnO1xuaW1wb3J0IHtUc1Zmc1dvcmtlckFjdGlvbnN9IGZyb20gJy4uL3dvcmtlcnMvZW51bXMvYWN0aW9ucy5qcyc7XG5pbXBvcnQge0Rpc3BsYXlUb29sdGlwUmVxdWVzdH0gZnJvbSAnLi4vd29ya2Vycy9pbnRlcmZhY2VzL2Rpc3BsYXktdG9vbHRpcC1yZXF1ZXN0LmpzJztcbmltcG9ydCB7RGlzcGxheVRvb2x0aXBSZXNwb25zZX0gZnJvbSAnLi4vd29ya2Vycy9pbnRlcmZhY2VzL2Rpc3BsYXktdG9vbHRpcC1yZXNwb25zZS5qcyc7XG5pbXBvcnQge0FjdGlvbk1lc3NhZ2V9IGZyb20gJy4uL3dvcmtlcnMvaW50ZXJmYWNlcy9tZXNzYWdlLmpzJztcblxuZXhwb3J0IGNvbnN0IGdldFRvb2x0aXBFeHRlbnNpb24gPSAoXG4gIGVtaXR0ZXI6IFN1YmplY3Q8QWN0aW9uTWVzc2FnZTxEaXNwbGF5VG9vbHRpcFJlc3BvbnNlPj4sXG4gIGN1cnJlbnRGaWxlOiBTaWduYWw8RWRpdG9yRmlsZT4sXG4gIHNlbmRSZXF1ZXN0VG9Uc1ZmczogKHJlcXVlc3Q6IEFjdGlvbk1lc3NhZ2U8RGlzcGxheVRvb2x0aXBSZXF1ZXN0PikgPT4gdm9pZCxcbikgPT4ge1xuICByZXR1cm4gaG92ZXJUb29sdGlwKFxuICAgIGFzeW5jIChfLCBwb3M6IG51bWJlcik6IFByb21pc2U8VG9vbHRpcCB8IG51bGw+ID0+IHtcbiAgICAgIHNlbmRSZXF1ZXN0VG9Uc1Zmcyh7XG4gICAgICAgIGFjdGlvbjogVHNWZnNXb3JrZXJBY3Rpb25zLkRJU1BMQVlfVE9PTFRJUF9SRVFVRVNULFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZmlsZTogY3VycmVudEZpbGUoKS5maWxlbmFtZSxcbiAgICAgICAgICBwb3NpdGlvbjogcG9zLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbmV3IFByb21pc2U8RGlzcGxheVRvb2x0aXBSZXNwb25zZT4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgZW1pdHRlclxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQuYWN0aW9uID09PSBUc1Zmc1dvcmtlckFjdGlvbnMuRElTUExBWV9UT09MVElQX1JFU1BPTlNFKSxcbiAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUobWVzc2FnZS5kYXRhISk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZT8uZGlzcGxheVBhcnRzKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3Qge2Rpc3BsYXlQYXJ0cywgdGFncywgZG9jdW1lbnRhdGlvbn0gPSByZXNwb25zZTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcG9zLFxuICAgICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAgY29uc3QgdG9vbHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgdG9vbHRpcC5hcHBlbmRDaGlsZChnZXRIdG1sRnJvbURpc3BsYXlQYXJ0cyhkaXNwbGF5UGFydHMpKTtcblxuICAgICAgICAgIC8vIHVzZSBkb2N1bWVudGF0aW9uIGlmIGF2YWlsYWJsZSBhcyBpdCdzIG1vcmUgaW5mb3JtYXRpdmUgdGhhbiB0YWdzXG4gICAgICAgICAgaWYgKGRvY3VtZW50YXRpb24/LlswXT8udGV4dCkge1xuICAgICAgICAgICAgdG9vbHRpcC5hcHBlbmRDaGlsZChnZXRNYXJrZWRIdG1sRnJvbVN0cmluZyhkb2N1bWVudGF0aW9uWzBdPy50ZXh0KSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0YWdzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRvb2x0aXAuYXBwZW5kQ2hpbGQoZ2V0VGFnc0h0bWwodGFncykpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb206IHRvb2x0aXAsXG5cbiAgICAgICAgICAgIC8vIE5vdGU6IGZvcmNlIHRoZSB0b29sdGlwIHRvIHNjcm9sbCB0byB0aGUgdG9wIG9uIG1vdW50IGFuZCBvbiBwb3NpdGlvbiBjaGFuZ2VcbiAgICAgICAgICAgIC8vIGJlY2F1c2UgZGVwZW5kaW5nIG9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgbW91c2UgYW5kIHRoZSBzaWV6IG9mIHRoZSB0b29sdGlwIGNvbnRlbnQsXG4gICAgICAgICAgICAvLyB0aGUgdG9vbHRpcCBtaWdodCByZW5kZXIgd2l0aCBpdHMgaW5pdGlhbCBzY3JvbGwgcG9zaXRpb24gb24gdGhlIGJvdHRvbVxuICAgICAgICAgICAgbW91bnQ6IChfKSA9PiBmb3JjZVRvb2x0aXBTY3JvbGxUb3AoKSxcbiAgICAgICAgICAgIHBvc2l0aW9uZWQ6IChfKSA9PiBmb3JjZVRvb2x0aXBTY3JvbGxUb3AoKSxcbiAgICAgICAgICAgIHJlc2l6ZTogZmFsc2UsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgICB7XG4gICAgICBoaWRlT25DaGFuZ2U6IHRydWUsXG4gICAgfSxcbiAgKTtcbn07XG5cbmZ1bmN0aW9uIGZvcmNlVG9vbHRpcFNjcm9sbFRvcCgpIHtcbiAgY29uc3QgYWN0aXZlVG9vbHRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbS10b29sdGlwJyk7XG5cbiAgLy8gb25seSBzY3JvbGwgaWYgdGhlIHRvb2x0aXAgaXMgc2Nyb2xsYWJsZVxuICBpZiAoYWN0aXZlVG9vbHRpcCAmJiBhY3RpdmVUb29sdGlwLnNjcm9sbEhlaWdodCA+IGFjdGl2ZVRvb2x0aXAuY2xpZW50SGVpZ2h0KSB7XG4gICAgYWN0aXZlVG9vbHRpcC5zY3JvbGwoMCwgLWFjdGl2ZVRvb2x0aXAuc2Nyb2xsSGVpZ2h0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRNYXJrZWRIdG1sRnJvbVN0cmluZyhjb250ZW50OiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgd3JhcHBlci5pbm5lckhUTUwgPSBtYXJrZWQoY29udGVudCkgYXMgc3RyaW5nO1xuXG4gIHJldHVybiB3cmFwcGVyO1xufVxuXG5mdW5jdGlvbiBnZXRIdG1sRnJvbURpc3BsYXlQYXJ0cyhkaXNwbGF5UGFydHM6IHR5cGVzY3JpcHQuU3ltYm9sRGlzcGxheVBhcnRbXSk6IEhUTUxEaXZFbGVtZW50IHtcbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGxldCBkaXNwbGF5UGFydFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBmb3IgKGNvbnN0IHBhcnQgb2YgZGlzcGxheVBhcnRzKSB7XG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzcGFuLmNsYXNzTGlzdC5hZGQocGFydC5raW5kKTtcbiAgICBzcGFuLnRleHRDb250ZW50ID0gcGFydC50ZXh0O1xuXG4gICAgLy8gY3JlYXRlIG5ldyBkaXYgdG8gc2VwYXJhdGUgbGluZXMgd2hlbiBhIGxpbmUgYnJlYWsgaXMgZm91bmRcbiAgICBpZiAocGFydC5raW5kID09PSAnbGluZUJyZWFrJykge1xuICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChkaXNwbGF5UGFydFdyYXBwZXIpO1xuXG4gICAgICBkaXNwbGF5UGFydFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGxheVBhcnRXcmFwcGVyLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgIH1cbiAgfVxuXG4gIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZGlzcGxheVBhcnRXcmFwcGVyKTtcblxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gZ2V0VGFnc0h0bWwodGFnczogdHlwZXNjcmlwdC5KU0RvY1RhZ0luZm9bXSk6IEhUTUxEaXZFbGVtZW50IHtcbiAgY29uc3QgdGFnc1dyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBsZXQgY29udGVudFN0cmluZyA9ICcnO1xuXG4gIGZvciAobGV0IHRhZyBvZiB0YWdzKSB7XG4gICAgY29udGVudFN0cmluZyArPSBgXFxuQCR7dGFnLm5hbWV9XFxuYDtcblxuICAgIGlmICh0YWcudGV4dCkge1xuICAgICAgZm9yIChjb25zdCB7dGV4dH0gb2YgdGFnLnRleHQpIHtcbiAgICAgICAgY29udGVudFN0cmluZyArPSB0ZXh0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRhZ3NXcmFwcGVyLmlubmVySFRNTCA9IG1hcmtlZChjb250ZW50U3RyaW5nKSBhcyBzdHJpbmc7XG5cbiAgcmV0dXJuIHRhZ3NXcmFwcGVyO1xufVxuIl19