/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { EditorState } from '@codemirror/state';
import { lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, keymap, EditorView, } from '@codemirror/view';
export { EditorView } from '@codemirror/view';
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap, HighlightStyle, } from '@codemirror/language';
import { history, defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap, startCompletion, } from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { SYNTAX_STYLES } from './syntax-styles';
import { CODE_EDITOR_THEME_STYLES } from './theme-styles';
export const CODE_EDITOR_EXTENSIONS = [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    foldGutter(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    crosshairCursor(),
    highlightActiveLine(),
    highlightSelectionMatches(),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    syntaxHighlighting(HighlightStyle.define(SYNTAX_STYLES)),
    EditorView.lineWrapping,
    EditorView.theme(CODE_EDITOR_THEME_STYLES, 
    // TODO: get from global theme, reconfigure on change: https://discuss.codemirror.net/t/dynamic-light-mode-dark-mode-how/4709
    { dark: true }),
    keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
        ...lintKeymap,
        indentWithTab,
        {
            key: 'Ctrl-.',
            run: startCompletion,
            mac: 'Mod-.',
        },
    ]),
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS1lZGl0b3ItZXh0ZW5zaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL2NvZGUtZWRpdG9yL2NvbnN0YW50cy9jb2RlLWVkaXRvci1leHRlbnNpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxXQUFXLEVBQVksTUFBTSxtQkFBbUIsQ0FBQztBQUV6RCxPQUFPLEVBQ0wsV0FBVyxFQUNYLHlCQUF5QixFQUN6QixxQkFBcUIsRUFDckIsYUFBYSxFQUNiLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixNQUFNLEVBQ04sVUFBVSxHQUNYLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzVDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsZUFBZSxFQUNmLFVBQVUsRUFDVixjQUFjLEdBQ2YsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDMUYsT0FBTyxFQUFDLHlCQUF5QixFQUFFLFlBQVksRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQzNFLE9BQU8sRUFDTCxhQUFhLEVBQ2IsY0FBYyxFQUNkLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM1QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQWdCO0lBQ2pELFdBQVcsRUFBRTtJQUNiLHlCQUF5QixFQUFFO0lBQzNCLHFCQUFxQixFQUFFO0lBQ3ZCLE9BQU8sRUFBRTtJQUNULFVBQVUsRUFBRTtJQUNaLGFBQWEsRUFBRTtJQUNmLFVBQVUsRUFBRTtJQUNaLFdBQVcsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzVDLGFBQWEsRUFBRTtJQUNmLGVBQWUsRUFBRTtJQUNqQixhQUFhLEVBQUU7SUFDZixjQUFjLEVBQUU7SUFDaEIsb0JBQW9CLEVBQUU7SUFDdEIsZUFBZSxFQUFFO0lBQ2pCLG1CQUFtQixFQUFFO0lBQ3JCLHlCQUF5QixFQUFFO0lBRTNCLGtCQUFrQixDQUFDLHFCQUFxQixFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzNELGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEQsVUFBVSxDQUFDLFlBQVk7SUFFdkIsVUFBVSxDQUFDLEtBQUssQ0FDZCx3QkFBd0I7SUFDeEIsNkhBQTZIO0lBQzdILEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUNiO0lBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNSLEdBQUcsbUJBQW1CO1FBQ3RCLEdBQUcsYUFBYTtRQUNoQixHQUFHLFlBQVk7UUFDZixHQUFHLGFBQWE7UUFDaEIsR0FBRyxVQUFVO1FBQ2IsR0FBRyxnQkFBZ0I7UUFDbkIsR0FBRyxVQUFVO1FBQ2IsYUFBYTtRQUNiO1lBQ0UsR0FBRyxFQUFFLFFBQVE7WUFDYixHQUFHLEVBQUUsZUFBZTtZQUNwQixHQUFHLEVBQUUsT0FBTztTQUNiO0tBQ0YsQ0FBQztDQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RWRpdG9yU3RhdGUsIEV4dGVuc2lvbn0gZnJvbSAnQGNvZGVtaXJyb3Ivc3RhdGUnO1xuXG5pbXBvcnQge1xuICBsaW5lTnVtYmVycyxcbiAgaGlnaGxpZ2h0QWN0aXZlTGluZUd1dHRlcixcbiAgaGlnaGxpZ2h0U3BlY2lhbENoYXJzLFxuICBkcmF3U2VsZWN0aW9uLFxuICBkcm9wQ3Vyc29yLFxuICByZWN0YW5ndWxhclNlbGVjdGlvbixcbiAgY3Jvc3NoYWlyQ3Vyc29yLFxuICBoaWdobGlnaHRBY3RpdmVMaW5lLFxuICBrZXltYXAsXG4gIEVkaXRvclZpZXcsXG59IGZyb20gJ0Bjb2RlbWlycm9yL3ZpZXcnO1xuZXhwb3J0IHtFZGl0b3JWaWV3fSBmcm9tICdAY29kZW1pcnJvci92aWV3JztcbmltcG9ydCB7XG4gIGZvbGRHdXR0ZXIsXG4gIGluZGVudE9uSW5wdXQsXG4gIHN5bnRheEhpZ2hsaWdodGluZyxcbiAgZGVmYXVsdEhpZ2hsaWdodFN0eWxlLFxuICBicmFja2V0TWF0Y2hpbmcsXG4gIGZvbGRLZXltYXAsXG4gIEhpZ2hsaWdodFN0eWxlLFxufSBmcm9tICdAY29kZW1pcnJvci9sYW5ndWFnZSc7XG5pbXBvcnQge2hpc3RvcnksIGRlZmF1bHRLZXltYXAsIGhpc3RvcnlLZXltYXAsIGluZGVudFdpdGhUYWJ9IGZyb20gJ0Bjb2RlbWlycm9yL2NvbW1hbmRzJztcbmltcG9ydCB7aGlnaGxpZ2h0U2VsZWN0aW9uTWF0Y2hlcywgc2VhcmNoS2V5bWFwfSBmcm9tICdAY29kZW1pcnJvci9zZWFyY2gnO1xuaW1wb3J0IHtcbiAgY2xvc2VCcmFja2V0cyxcbiAgYXV0b2NvbXBsZXRpb24sXG4gIGNsb3NlQnJhY2tldHNLZXltYXAsXG4gIGNvbXBsZXRpb25LZXltYXAsXG4gIHN0YXJ0Q29tcGxldGlvbixcbn0gZnJvbSAnQGNvZGVtaXJyb3IvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7bGludEtleW1hcH0gZnJvbSAnQGNvZGVtaXJyb3IvbGludCc7XG5pbXBvcnQge1NZTlRBWF9TVFlMRVN9IGZyb20gJy4vc3ludGF4LXN0eWxlcyc7XG5pbXBvcnQge0NPREVfRURJVE9SX1RIRU1FX1NUWUxFU30gZnJvbSAnLi90aGVtZS1zdHlsZXMnO1xuXG5leHBvcnQgY29uc3QgQ09ERV9FRElUT1JfRVhURU5TSU9OUzogRXh0ZW5zaW9uW10gPSBbXG4gIGxpbmVOdW1iZXJzKCksXG4gIGhpZ2hsaWdodEFjdGl2ZUxpbmVHdXR0ZXIoKSxcbiAgaGlnaGxpZ2h0U3BlY2lhbENoYXJzKCksXG4gIGhpc3RvcnkoKSxcbiAgZm9sZEd1dHRlcigpLFxuICBkcmF3U2VsZWN0aW9uKCksXG4gIGRyb3BDdXJzb3IoKSxcbiAgRWRpdG9yU3RhdGUuYWxsb3dNdWx0aXBsZVNlbGVjdGlvbnMub2YodHJ1ZSksXG4gIGluZGVudE9uSW5wdXQoKSxcbiAgYnJhY2tldE1hdGNoaW5nKCksXG4gIGNsb3NlQnJhY2tldHMoKSxcbiAgYXV0b2NvbXBsZXRpb24oKSxcbiAgcmVjdGFuZ3VsYXJTZWxlY3Rpb24oKSxcbiAgY3Jvc3NoYWlyQ3Vyc29yKCksXG4gIGhpZ2hsaWdodEFjdGl2ZUxpbmUoKSxcbiAgaGlnaGxpZ2h0U2VsZWN0aW9uTWF0Y2hlcygpLFxuXG4gIHN5bnRheEhpZ2hsaWdodGluZyhkZWZhdWx0SGlnaGxpZ2h0U3R5bGUsIHtmYWxsYmFjazogdHJ1ZX0pLFxuICBzeW50YXhIaWdobGlnaHRpbmcoSGlnaGxpZ2h0U3R5bGUuZGVmaW5lKFNZTlRBWF9TVFlMRVMpKSxcbiAgRWRpdG9yVmlldy5saW5lV3JhcHBpbmcsXG5cbiAgRWRpdG9yVmlldy50aGVtZShcbiAgICBDT0RFX0VESVRPUl9USEVNRV9TVFlMRVMsXG4gICAgLy8gVE9ETzogZ2V0IGZyb20gZ2xvYmFsIHRoZW1lLCByZWNvbmZpZ3VyZSBvbiBjaGFuZ2U6IGh0dHBzOi8vZGlzY3Vzcy5jb2RlbWlycm9yLm5ldC90L2R5bmFtaWMtbGlnaHQtbW9kZS1kYXJrLW1vZGUtaG93LzQ3MDlcbiAgICB7ZGFyazogdHJ1ZX0sXG4gICksXG5cbiAga2V5bWFwLm9mKFtcbiAgICAuLi5jbG9zZUJyYWNrZXRzS2V5bWFwLFxuICAgIC4uLmRlZmF1bHRLZXltYXAsXG4gICAgLi4uc2VhcmNoS2V5bWFwLFxuICAgIC4uLmhpc3RvcnlLZXltYXAsXG4gICAgLi4uZm9sZEtleW1hcCxcbiAgICAuLi5jb21wbGV0aW9uS2V5bWFwLFxuICAgIC4uLmxpbnRLZXltYXAsXG4gICAgaW5kZW50V2l0aFRhYixcbiAgICB7XG4gICAgICBrZXk6ICdDdHJsLS4nLFxuICAgICAgcnVuOiBzdGFydENvbXBsZXRpb24sXG4gICAgICBtYWM6ICdNb2QtLicsXG4gICAgfSxcbiAgXSksXG5dO1xuIl19