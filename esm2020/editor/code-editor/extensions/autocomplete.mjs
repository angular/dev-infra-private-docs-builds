/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { autocompletion, closeCompletion, completeFromList, insertCompletionText, } from '@codemirror/autocomplete';
import { filter, take } from 'rxjs';
// Factory method for autocomplete extension.
export const getAutocompleteExtension = (emitter, currentFile, sendRequestToTsVfs) => {
    return autocompletion({
        activateOnTyping: true,
        override: [
            async (context) => {
                try {
                    const contextPositions = context.state.wordAt(context.pos);
                    sendRequestToTsVfs({
                        action: "autocomplete-request" /* TsVfsWorkerActions.AUTOCOMPLETE_REQUEST */,
                        data: {
                            file: currentFile().filename,
                            position: context.pos,
                            from: contextPositions?.from,
                            to: contextPositions?.to,
                            content: context.state.doc.toString(),
                        },
                    });
                    const completions = await new Promise((resolve) => {
                        emitter
                            .pipe(filter((event) => event.action === "autocomplete-response" /* TsVfsWorkerActions.AUTOCOMPLETE_RESPONSE */), take(1))
                            .subscribe((message) => {
                            resolve(message.data);
                        });
                    });
                    if (!completions) {
                        return null;
                    }
                    const completionSource = completeFromList(completions.map((completionItem) => {
                        const suggestions = {
                            type: completionItem.kind,
                            label: completionItem.name,
                            boost: 1 / Number(completionItem.sortText),
                            detail: completionItem?.codeActions?.[0]?.description,
                            apply: (view, completion, from, to) => applyWithCodeAction(view, { ...completion, ...completionItem }, from, to),
                        };
                        return suggestions;
                    }));
                    return completionSource(context);
                }
                catch (e) {
                    return null;
                }
            },
        ],
    });
};
const applyWithCodeAction = (view, completion, from, to) => {
    const transactionSpecs = [
        insertCompletionText(view.state, completion.label, from, to),
    ];
    if (completion.codeActions?.length) {
        const { span, newText } = completion.codeActions[0].changes[0].textChanges[0];
        transactionSpecs.push(insertCompletionText(view.state, newText, span.start, span.start + span.length));
    }
    view.dispatch(...transactionSpecs, 
    // avoid moving cursor to the autocompleted text
    { selection: view.state.selection });
    // Manually close the autocomplete picker after applying the completion
    closeCompletion(view);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvY29kZS1lZGl0b3IvZXh0ZW5zaW9ucy9hdXRvY29tcGxldGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUlMLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG9CQUFvQixHQUNyQixNQUFNLDBCQUEwQixDQUFDO0FBRWxDLE9BQU8sRUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBUzNDLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxDQUN0QyxPQUErQixFQUMvQixXQUErQixFQUMvQixrQkFBeUUsRUFDekUsRUFBRTtJQUNGLE9BQU8sY0FBYyxDQUFDO1FBQ3BCLGdCQUFnQixFQUFFLElBQUk7UUFDdEIsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLE9BQTBCLEVBQW9DLEVBQUU7Z0JBQ3JFLElBQUksQ0FBQztvQkFDSCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFM0Qsa0JBQWtCLENBQUM7d0JBQ2pCLE1BQU0sc0VBQXlDO3dCQUMvQyxJQUFJLEVBQUU7NEJBQ0osSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLFFBQVE7NEJBQzVCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRzs0QkFDckIsSUFBSSxFQUFFLGdCQUFnQixFQUFFLElBQUk7NEJBQzVCLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFOzRCQUN4QixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO3lCQUN0QztxQkFDRixDQUFDLENBQUM7b0JBRUgsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBbUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDbEYsT0FBTzs2QkFDSixJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSwyRUFBNkMsQ0FBQyxFQUM1RSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7NkJBQ0EsU0FBUyxDQUFDLENBQUMsT0FBNEMsRUFBRSxFQUFFOzRCQUMxRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ2pCLE9BQU8sSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBRUQsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FDdkMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO3dCQUNqQyxNQUFNLFdBQVcsR0FBZTs0QkFDOUIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJOzRCQUN6QixLQUFLLEVBQUUsY0FBYyxDQUFDLElBQUk7NEJBQzFCLEtBQUssRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7NEJBQzFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVzs0QkFDckQsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FDcEMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEVBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxjQUFjLEVBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO3lCQUMxRSxDQUFDO3dCQUVGLE9BQU8sV0FBVyxDQUFDO29CQUNyQixDQUFDLENBQUMsQ0FDSCxDQUFDO29CQUVGLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDWCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO1lBQ0gsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxtQkFBbUIsR0FBRyxDQUMxQixJQUFnQixFQUNoQixVQUF5QyxFQUN6QyxJQUFZLEVBQ1osRUFBVSxFQUNWLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFzQjtRQUMxQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztLQUM3RCxDQUFDO0lBRUYsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ25DLE1BQU0sRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVFLGdCQUFnQixDQUFDLElBQUksQ0FDbkIsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDaEYsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLENBQUMsUUFBUSxDQUNYLEdBQUcsZ0JBQWdCO0lBQ25CLGdEQUFnRDtJQUNoRCxFQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQyxDQUNsQyxDQUFDO0lBRUYsdUVBQXVFO0lBQ3ZFLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7U2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbXBsZXRpb24sXG4gIENvbXBsZXRpb25Db250ZXh0LFxuICBDb21wbGV0aW9uUmVzdWx0LFxuICBhdXRvY29tcGxldGlvbixcbiAgY2xvc2VDb21wbGV0aW9uLFxuICBjb21wbGV0ZUZyb21MaXN0LFxuICBpbnNlcnRDb21wbGV0aW9uVGV4dCxcbn0gZnJvbSAnQGNvZGVtaXJyb3IvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7RWRpdG9yVmlld30gZnJvbSAnQGNvZGVtaXJyb3Ivdmlldyc7XG5pbXBvcnQge1N1YmplY3QsIGZpbHRlciwgdGFrZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7RWRpdG9yRmlsZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lZGl0b3ItZmlsZSc7XG5pbXBvcnQge1RzVmZzV29ya2VyQWN0aW9uc30gZnJvbSAnLi4vd29ya2Vycy9lbnVtcy9hY3Rpb25zJztcbmltcG9ydCB7QXV0b2NvbXBsZXRlUmVxdWVzdH0gZnJvbSAnLi4vd29ya2Vycy9pbnRlcmZhY2VzL2F1dG9jb21wbGV0ZS1yZXF1ZXN0JztcbmltcG9ydCB7QXV0b2NvbXBsZXRlSXRlbSwgQXV0b2NvbXBsZXRlUmVzcG9uc2V9IGZyb20gJy4uL3dvcmtlcnMvaW50ZXJmYWNlcy9hdXRvY29tcGxldGUtcmVzcG9uc2UnO1xuaW1wb3J0IHtBY3Rpb25NZXNzYWdlfSBmcm9tICcuLi93b3JrZXJzL2ludGVyZmFjZXMvbWVzc2FnZSc7XG5pbXBvcnQge1RyYW5zYWN0aW9uU3BlY30gZnJvbSAnQGNvZGVtaXJyb3Ivc3RhdGUnO1xuXG4vLyBGYWN0b3J5IG1ldGhvZCBmb3IgYXV0b2NvbXBsZXRlIGV4dGVuc2lvbi5cbmV4cG9ydCBjb25zdCBnZXRBdXRvY29tcGxldGVFeHRlbnNpb24gPSAoXG4gIGVtaXR0ZXI6IFN1YmplY3Q8QWN0aW9uTWVzc2FnZT4sXG4gIGN1cnJlbnRGaWxlOiBTaWduYWw8RWRpdG9yRmlsZT4sXG4gIHNlbmRSZXF1ZXN0VG9Uc1ZmczogKHJlcXVlc3Q6IEFjdGlvbk1lc3NhZ2U8QXV0b2NvbXBsZXRlUmVxdWVzdD4pID0+IHZvaWQsXG4pID0+IHtcbiAgcmV0dXJuIGF1dG9jb21wbGV0aW9uKHtcbiAgICBhY3RpdmF0ZU9uVHlwaW5nOiB0cnVlLFxuICAgIG92ZXJyaWRlOiBbXG4gICAgICBhc3luYyAoY29udGV4dDogQ29tcGxldGlvbkNvbnRleHQpOiBQcm9taXNlPENvbXBsZXRpb25SZXN1bHQgfCBudWxsPiA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY29udGV4dFBvc2l0aW9ucyA9IGNvbnRleHQuc3RhdGUud29yZEF0KGNvbnRleHQucG9zKTtcblxuICAgICAgICAgIHNlbmRSZXF1ZXN0VG9Uc1Zmcyh7XG4gICAgICAgICAgICBhY3Rpb246IFRzVmZzV29ya2VyQWN0aW9ucy5BVVRPQ09NUExFVEVfUkVRVUVTVCxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgZmlsZTogY3VycmVudEZpbGUoKS5maWxlbmFtZSxcbiAgICAgICAgICAgICAgcG9zaXRpb246IGNvbnRleHQucG9zLFxuICAgICAgICAgICAgICBmcm9tOiBjb250ZXh0UG9zaXRpb25zPy5mcm9tLFxuICAgICAgICAgICAgICB0bzogY29udGV4dFBvc2l0aW9ucz8udG8sXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRleHQuc3RhdGUuZG9jLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgY29tcGxldGlvbnMgPSBhd2FpdCBuZXcgUHJvbWlzZTxBdXRvY29tcGxldGVSZXNwb25zZSB8IHVuZGVmaW5lZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGVtaXR0ZXJcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKChldmVudCkgPT4gZXZlbnQuYWN0aW9uID09PSBUc1Zmc1dvcmtlckFjdGlvbnMuQVVUT0NPTVBMRVRFX1JFU1BPTlNFKSxcbiAgICAgICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoKG1lc3NhZ2U6IEFjdGlvbk1lc3NhZ2U8QXV0b2NvbXBsZXRlUmVzcG9uc2U+KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShtZXNzYWdlLmRhdGEpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghY29tcGxldGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNvbXBsZXRpb25Tb3VyY2UgPSBjb21wbGV0ZUZyb21MaXN0KFxuICAgICAgICAgICAgY29tcGxldGlvbnMubWFwKChjb21wbGV0aW9uSXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdWdnZXN0aW9uczogQ29tcGxldGlvbiA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBjb21wbGV0aW9uSXRlbS5raW5kLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBjb21wbGV0aW9uSXRlbS5uYW1lLFxuICAgICAgICAgICAgICAgIGJvb3N0OiAxIC8gTnVtYmVyKGNvbXBsZXRpb25JdGVtLnNvcnRUZXh0KSxcbiAgICAgICAgICAgICAgICBkZXRhaWw6IGNvbXBsZXRpb25JdGVtPy5jb2RlQWN0aW9ucz8uWzBdPy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBhcHBseTogKHZpZXcsIGNvbXBsZXRpb24sIGZyb20sIHRvKSA9PlxuICAgICAgICAgICAgICAgICAgYXBwbHlXaXRoQ29kZUFjdGlvbih2aWV3LCB7Li4uY29tcGxldGlvbiwgLi4uY29tcGxldGlvbkl0ZW19LCBmcm9tLCB0byksXG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHN1Z2dlc3Rpb25zO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybiBjb21wbGV0aW9uU291cmNlKGNvbnRleHQpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgXSxcbiAgfSk7XG59O1xuXG5jb25zdCBhcHBseVdpdGhDb2RlQWN0aW9uID0gKFxuICB2aWV3OiBFZGl0b3JWaWV3LFxuICBjb21wbGV0aW9uOiBDb21wbGV0aW9uICYgQXV0b2NvbXBsZXRlSXRlbSxcbiAgZnJvbTogbnVtYmVyLFxuICB0bzogbnVtYmVyLFxuKSA9PiB7XG4gIGNvbnN0IHRyYW5zYWN0aW9uU3BlY3M6IFRyYW5zYWN0aW9uU3BlY1tdID0gW1xuICAgIGluc2VydENvbXBsZXRpb25UZXh0KHZpZXcuc3RhdGUsIGNvbXBsZXRpb24ubGFiZWwsIGZyb20sIHRvKSxcbiAgXTtcblxuICBpZiAoY29tcGxldGlvbi5jb2RlQWN0aW9ucz8ubGVuZ3RoKSB7XG4gICAgY29uc3Qge3NwYW4sIG5ld1RleHR9ID0gY29tcGxldGlvbi5jb2RlQWN0aW9uc1swXS5jaGFuZ2VzWzBdLnRleHRDaGFuZ2VzWzBdO1xuXG4gICAgdHJhbnNhY3Rpb25TcGVjcy5wdXNoKFxuICAgICAgaW5zZXJ0Q29tcGxldGlvblRleHQodmlldy5zdGF0ZSwgbmV3VGV4dCwgc3Bhbi5zdGFydCwgc3Bhbi5zdGFydCArIHNwYW4ubGVuZ3RoKSxcbiAgICApO1xuICB9XG5cbiAgdmlldy5kaXNwYXRjaChcbiAgICAuLi50cmFuc2FjdGlvblNwZWNzLFxuICAgIC8vIGF2b2lkIG1vdmluZyBjdXJzb3IgdG8gdGhlIGF1dG9jb21wbGV0ZWQgdGV4dFxuICAgIHtzZWxlY3Rpb246IHZpZXcuc3RhdGUuc2VsZWN0aW9ufSxcbiAgKTtcblxuICAvLyBNYW51YWxseSBjbG9zZSB0aGUgYXV0b2NvbXBsZXRlIHBpY2tlciBhZnRlciBhcHBseWluZyB0aGUgY29tcGxldGlvblxuICBjbG9zZUNvbXBsZXRpb24odmlldyk7XG59O1xuIl19