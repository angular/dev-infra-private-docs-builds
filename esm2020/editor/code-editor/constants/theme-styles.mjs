/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export const CODE_EDITOR_THEME_STYLES = {
    '&': {
        position: 'relative',
        width: '100%',
        height: '100%',
        'background-color': 'var(--code-editor-background)',
        color: 'var(--code-editor-text-base-color)',
    },
    '.cm-gutters': {
        border: 'none',
    },
    '.cm-gutter': {
        'background-color': 'var(--code-editor-background)',
        color: 'var(--code-editor-code-base-color)',
    },
    '.cm-line.cm-activeLine': {
        'background-color': 'var(--code-editor-active-line-background)',
    },
    '.cm-activeLineGutter': {
        'background-color': 'var(--code-editor-active-line-background)',
    },
    '&.cm-focused .cm-selectionBackground': {
        'background-color': 'var(--code-editor-focused-selection-background) !important',
    },
    '.cm-selectionBackground': {
        'background-color': 'var(--code-editor-selection-background) !important',
    },
    '.cm-cursor': {
        'border-color': 'var(--code-editor-cursor-color)',
    },
    '.cm-tooltip': {
        color: 'var(--code-editor-tooltip-color)',
        border: 'var(--code-editor-tooltip-border)',
        'border-radius': 'var(--code-editor-tooltip-border-radius)',
        background: 'var(--code-editor-tooltip-background)',
        'overflow-y': 'scroll',
        'max-height': '70%',
        'max-width': '100%',
        'margin-right': '10px',
    },
    '.cm-tooltip.cm-tooltip-autocomplete > ul': {
        background: 'var(--code-editor-autocomplete-background)',
    },
    '.cm-tooltip .keyword': {
        color: 'var(--code-module-keyword)',
    },
    '.cm-tooltip .aliasName': {
        color: 'var(--code-variable-name)',
    },
    '.cm-tooltip .localName': {
        color: 'var(--code-variable-name)',
    },
    '.cm-tooltip-autocomplete ul li[aria-selected]': {
        background: 'var(--code-editor-autocomplete-item-background)',
        color: 'var(--code-editor-autocomplete-item-color)',
    },
    '.cm-tooltip-lint': {
        background: 'var(--code-editor-lint-tooltip-background)',
        color: 'var(--code-editor-lint-tooltip-color)',
    },
    '.cm-panels': {
        background: 'var(--code-editor-panels-background)',
        color: 'var(--code-editor-panels-color)',
    },
    '.cm-foldPlaceholder': {
        background: 'var(--code-editor-fold-placeholder-background)',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtc3R5bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvY29kZS1lZGl0b3IvY29uc3RhbnRzL3RoZW1lLXN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRztJQUN0QyxHQUFHLEVBQUU7UUFDSCxRQUFRLEVBQUUsVUFBVTtRQUNwQixLQUFLLEVBQUUsTUFBTTtRQUNiLE1BQU0sRUFBRSxNQUFNO1FBQ2Qsa0JBQWtCLEVBQUUsK0JBQStCO1FBQ25ELEtBQUssRUFBRSxvQ0FBb0M7S0FDNUM7SUFDRCxhQUFhLEVBQUU7UUFDYixNQUFNLEVBQUUsTUFBTTtLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1osa0JBQWtCLEVBQUUsK0JBQStCO1FBQ25ELEtBQUssRUFBRSxvQ0FBb0M7S0FDNUM7SUFDRCx3QkFBd0IsRUFBRTtRQUN4QixrQkFBa0IsRUFBRSwyQ0FBMkM7S0FDaEU7SUFDRCxzQkFBc0IsRUFBRTtRQUN0QixrQkFBa0IsRUFBRSwyQ0FBMkM7S0FDaEU7SUFDRCxzQ0FBc0MsRUFBRTtRQUN0QyxrQkFBa0IsRUFBRSw0REFBNEQ7S0FDakY7SUFDRCx5QkFBeUIsRUFBRTtRQUN6QixrQkFBa0IsRUFBRSxvREFBb0Q7S0FDekU7SUFDRCxZQUFZLEVBQUU7UUFDWixjQUFjLEVBQUUsaUNBQWlDO0tBQ2xEO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsS0FBSyxFQUFFLGtDQUFrQztRQUN6QyxNQUFNLEVBQUUsbUNBQW1DO1FBQzNDLGVBQWUsRUFBRSwwQ0FBMEM7UUFDM0QsVUFBVSxFQUFFLHVDQUF1QztRQUNuRCxZQUFZLEVBQUUsUUFBUTtRQUN0QixZQUFZLEVBQUUsS0FBSztRQUNuQixXQUFXLEVBQUUsTUFBTTtRQUNuQixjQUFjLEVBQUUsTUFBTTtLQUN2QjtJQUNELDBDQUEwQyxFQUFFO1FBQzFDLFVBQVUsRUFBRSw0Q0FBNEM7S0FDekQ7SUFDRCxzQkFBc0IsRUFBRTtRQUN0QixLQUFLLEVBQUUsNEJBQTRCO0tBQ3BDO0lBQ0Qsd0JBQXdCLEVBQUU7UUFDeEIsS0FBSyxFQUFFLDJCQUEyQjtLQUNuQztJQUNELHdCQUF3QixFQUFFO1FBQ3hCLEtBQUssRUFBRSwyQkFBMkI7S0FDbkM7SUFDRCwrQ0FBK0MsRUFBRTtRQUMvQyxVQUFVLEVBQUUsaURBQWlEO1FBQzdELEtBQUssRUFBRSw0Q0FBNEM7S0FDcEQ7SUFDRCxrQkFBa0IsRUFBRTtRQUNsQixVQUFVLEVBQUUsNENBQTRDO1FBQ3hELEtBQUssRUFBRSx1Q0FBdUM7S0FDL0M7SUFDRCxZQUFZLEVBQUU7UUFDWixVQUFVLEVBQUUsc0NBQXNDO1FBQ2xELEtBQUssRUFBRSxpQ0FBaUM7S0FDekM7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixVQUFVLEVBQUUsZ0RBQWdEO0tBQzdEO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuZXhwb3J0IGNvbnN0IENPREVfRURJVE9SX1RIRU1FX1NUWUxFUyA9IHtcbiAgJyYnOiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAnYmFja2dyb3VuZC1jb2xvcic6ICd2YXIoLS1jb2RlLWVkaXRvci1iYWNrZ3JvdW5kKScsXG4gICAgY29sb3I6ICd2YXIoLS1jb2RlLWVkaXRvci10ZXh0LWJhc2UtY29sb3IpJyxcbiAgfSxcbiAgJy5jbS1ndXR0ZXJzJzoge1xuICAgIGJvcmRlcjogJ25vbmUnLFxuICB9LFxuICAnLmNtLWd1dHRlcic6IHtcbiAgICAnYmFja2dyb3VuZC1jb2xvcic6ICd2YXIoLS1jb2RlLWVkaXRvci1iYWNrZ3JvdW5kKScsXG4gICAgY29sb3I6ICd2YXIoLS1jb2RlLWVkaXRvci1jb2RlLWJhc2UtY29sb3IpJyxcbiAgfSxcbiAgJy5jbS1saW5lLmNtLWFjdGl2ZUxpbmUnOiB7XG4gICAgJ2JhY2tncm91bmQtY29sb3InOiAndmFyKC0tY29kZS1lZGl0b3ItYWN0aXZlLWxpbmUtYmFja2dyb3VuZCknLFxuICB9LFxuICAnLmNtLWFjdGl2ZUxpbmVHdXR0ZXInOiB7XG4gICAgJ2JhY2tncm91bmQtY29sb3InOiAndmFyKC0tY29kZS1lZGl0b3ItYWN0aXZlLWxpbmUtYmFja2dyb3VuZCknLFxuICB9LFxuICAnJi5jbS1mb2N1c2VkIC5jbS1zZWxlY3Rpb25CYWNrZ3JvdW5kJzoge1xuICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3ZhcigtLWNvZGUtZWRpdG9yLWZvY3VzZWQtc2VsZWN0aW9uLWJhY2tncm91bmQpICFpbXBvcnRhbnQnLFxuICB9LFxuICAnLmNtLXNlbGVjdGlvbkJhY2tncm91bmQnOiB7XG4gICAgJ2JhY2tncm91bmQtY29sb3InOiAndmFyKC0tY29kZS1lZGl0b3Itc2VsZWN0aW9uLWJhY2tncm91bmQpICFpbXBvcnRhbnQnLFxuICB9LFxuICAnLmNtLWN1cnNvcic6IHtcbiAgICAnYm9yZGVyLWNvbG9yJzogJ3ZhcigtLWNvZGUtZWRpdG9yLWN1cnNvci1jb2xvciknLFxuICB9LFxuICAnLmNtLXRvb2x0aXAnOiB7XG4gICAgY29sb3I6ICd2YXIoLS1jb2RlLWVkaXRvci10b29sdGlwLWNvbG9yKScsXG4gICAgYm9yZGVyOiAndmFyKC0tY29kZS1lZGl0b3ItdG9vbHRpcC1ib3JkZXIpJyxcbiAgICAnYm9yZGVyLXJhZGl1cyc6ICd2YXIoLS1jb2RlLWVkaXRvci10b29sdGlwLWJvcmRlci1yYWRpdXMpJyxcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tY29kZS1lZGl0b3ItdG9vbHRpcC1iYWNrZ3JvdW5kKScsXG4gICAgJ292ZXJmbG93LXknOiAnc2Nyb2xsJyxcbiAgICAnbWF4LWhlaWdodCc6ICc3MCUnLFxuICAgICdtYXgtd2lkdGgnOiAnMTAwJScsXG4gICAgJ21hcmdpbi1yaWdodCc6ICcxMHB4JyxcbiAgfSxcbiAgJy5jbS10b29sdGlwLmNtLXRvb2x0aXAtYXV0b2NvbXBsZXRlID4gdWwnOiB7XG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvZGUtZWRpdG9yLWF1dG9jb21wbGV0ZS1iYWNrZ3JvdW5kKScsXG4gIH0sXG4gICcuY20tdG9vbHRpcCAua2V5d29yZCc6IHtcbiAgICBjb2xvcjogJ3ZhcigtLWNvZGUtbW9kdWxlLWtleXdvcmQpJyxcbiAgfSxcbiAgJy5jbS10b29sdGlwIC5hbGlhc05hbWUnOiB7XG4gICAgY29sb3I6ICd2YXIoLS1jb2RlLXZhcmlhYmxlLW5hbWUpJyxcbiAgfSxcbiAgJy5jbS10b29sdGlwIC5sb2NhbE5hbWUnOiB7XG4gICAgY29sb3I6ICd2YXIoLS1jb2RlLXZhcmlhYmxlLW5hbWUpJyxcbiAgfSxcbiAgJy5jbS10b29sdGlwLWF1dG9jb21wbGV0ZSB1bCBsaVthcmlhLXNlbGVjdGVkXSc6IHtcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tY29kZS1lZGl0b3ItYXV0b2NvbXBsZXRlLWl0ZW0tYmFja2dyb3VuZCknLFxuICAgIGNvbG9yOiAndmFyKC0tY29kZS1lZGl0b3ItYXV0b2NvbXBsZXRlLWl0ZW0tY29sb3IpJyxcbiAgfSxcbiAgJy5jbS10b29sdGlwLWxpbnQnOiB7XG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvZGUtZWRpdG9yLWxpbnQtdG9vbHRpcC1iYWNrZ3JvdW5kKScsXG4gICAgY29sb3I6ICd2YXIoLS1jb2RlLWVkaXRvci1saW50LXRvb2x0aXAtY29sb3IpJyxcbiAgfSxcbiAgJy5jbS1wYW5lbHMnOiB7XG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvZGUtZWRpdG9yLXBhbmVscy1iYWNrZ3JvdW5kKScsXG4gICAgY29sb3I6ICd2YXIoLS1jb2RlLWVkaXRvci1wYW5lbHMtY29sb3IpJyxcbiAgfSxcbiAgJy5jbS1mb2xkUGxhY2Vob2xkZXInOiB7XG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvZGUtZWRpdG9yLWZvbGQtcGxhY2Vob2xkZXItYmFja2dyb3VuZCknLFxuICB9LFxufTtcbiJdfQ==