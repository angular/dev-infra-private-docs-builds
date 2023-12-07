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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvY29kZS1lZGl0b3IvZXh0ZW5zaW9ucy9hdXRvY29tcGxldGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBR0gsT0FBTyxFQUlMLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG9CQUFvQixHQUNyQixNQUFNLDBCQUEwQixDQUFDO0FBRWxDLE9BQU8sRUFBVSxNQUFNLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBWTNDLDZDQUE2QztBQUM3QyxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRyxDQUN0QyxPQUErQixFQUMvQixXQUErQixFQUMvQixrQkFBeUUsRUFDekUsRUFBRTtJQUNGLE9BQU8sY0FBYyxDQUFDO1FBQ3BCLGdCQUFnQixFQUFFLElBQUk7UUFDdEIsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLE9BQTBCLEVBQW9DLEVBQUU7Z0JBQ3JFLElBQUksQ0FBQztvQkFDSCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFFM0Qsa0JBQWtCLENBQUM7d0JBQ2pCLE1BQU0sc0VBQXlDO3dCQUMvQyxJQUFJLEVBQUU7NEJBQ0osSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLFFBQVE7NEJBQzVCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRzs0QkFDckIsSUFBSSxFQUFFLGdCQUFnQixFQUFFLElBQUk7NEJBQzVCLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFOzRCQUN4QixPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO3lCQUN0QztxQkFDRixDQUFDLENBQUM7b0JBRUgsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBbUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTt3QkFDbEYsT0FBTzs2QkFDSixJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSwyRUFBNkMsQ0FBQyxFQUM1RSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7NkJBQ0EsU0FBUyxDQUFDLENBQUMsT0FBNEMsRUFBRSxFQUFFOzRCQUMxRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ2pCLE9BQU8sSUFBSSxDQUFDO29CQUNkLENBQUM7b0JBRUQsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FDdkMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO3dCQUNqQyxNQUFNLFdBQVcsR0FBZTs0QkFDOUIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJOzRCQUN6QixLQUFLLEVBQUUsY0FBYyxDQUFDLElBQUk7NEJBQzFCLEtBQUssRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7NEJBQzFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVzs0QkFDckQsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FDcEMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEVBQUMsR0FBRyxVQUFVLEVBQUUsR0FBRyxjQUFjLEVBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO3lCQUMxRSxDQUFDO3dCQUVGLE9BQU8sV0FBVyxDQUFDO29CQUNyQixDQUFDLENBQUMsQ0FDSCxDQUFDO29CQUVGLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDWCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO1lBQ0gsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxtQkFBbUIsR0FBRyxDQUMxQixJQUFnQixFQUNoQixVQUF5QyxFQUN6QyxJQUFZLEVBQ1osRUFBVSxFQUNWLEVBQUU7SUFDRixNQUFNLGdCQUFnQixHQUFzQjtRQUMxQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztLQUM3RCxDQUFDO0lBRUYsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ25DLE1BQU0sRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVFLGdCQUFnQixDQUFDLElBQUksQ0FDbkIsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDaEYsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLENBQUMsUUFBUSxDQUNYLEdBQUcsZ0JBQWdCO0lBQ25CLGdEQUFnRDtJQUNoRCxFQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQyxDQUNsQyxDQUFDO0lBRUYsdUVBQXVFO0lBQ3ZFLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7U2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbXBsZXRpb24sXG4gIENvbXBsZXRpb25Db250ZXh0LFxuICBDb21wbGV0aW9uUmVzdWx0LFxuICBhdXRvY29tcGxldGlvbixcbiAgY2xvc2VDb21wbGV0aW9uLFxuICBjb21wbGV0ZUZyb21MaXN0LFxuICBpbnNlcnRDb21wbGV0aW9uVGV4dCxcbn0gZnJvbSAnQGNvZGVtaXJyb3IvYXV0b2NvbXBsZXRlJztcbmltcG9ydCB7RWRpdG9yVmlld30gZnJvbSAnQGNvZGVtaXJyb3Ivdmlldyc7XG5pbXBvcnQge1N1YmplY3QsIGZpbHRlciwgdGFrZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7RWRpdG9yRmlsZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lZGl0b3ItZmlsZS5qcyc7XG5pbXBvcnQge1RzVmZzV29ya2VyQWN0aW9uc30gZnJvbSAnLi4vd29ya2Vycy9lbnVtcy9hY3Rpb25zLmpzJztcbmltcG9ydCB7QXV0b2NvbXBsZXRlUmVxdWVzdH0gZnJvbSAnLi4vd29ya2Vycy9pbnRlcmZhY2VzL2F1dG9jb21wbGV0ZS1yZXF1ZXN0LmpzJztcbmltcG9ydCB7XG4gIEF1dG9jb21wbGV0ZUl0ZW0sXG4gIEF1dG9jb21wbGV0ZVJlc3BvbnNlLFxufSBmcm9tICcuLi93b3JrZXJzL2ludGVyZmFjZXMvYXV0b2NvbXBsZXRlLXJlc3BvbnNlLmpzJztcbmltcG9ydCB7QWN0aW9uTWVzc2FnZX0gZnJvbSAnLi4vd29ya2Vycy9pbnRlcmZhY2VzL21lc3NhZ2UuanMnO1xuaW1wb3J0IHtUcmFuc2FjdGlvblNwZWN9IGZyb20gJ0Bjb2RlbWlycm9yL3N0YXRlJztcblxuLy8gRmFjdG9yeSBtZXRob2QgZm9yIGF1dG9jb21wbGV0ZSBleHRlbnNpb24uXG5leHBvcnQgY29uc3QgZ2V0QXV0b2NvbXBsZXRlRXh0ZW5zaW9uID0gKFxuICBlbWl0dGVyOiBTdWJqZWN0PEFjdGlvbk1lc3NhZ2U+LFxuICBjdXJyZW50RmlsZTogU2lnbmFsPEVkaXRvckZpbGU+LFxuICBzZW5kUmVxdWVzdFRvVHNWZnM6IChyZXF1ZXN0OiBBY3Rpb25NZXNzYWdlPEF1dG9jb21wbGV0ZVJlcXVlc3Q+KSA9PiB2b2lkLFxuKSA9PiB7XG4gIHJldHVybiBhdXRvY29tcGxldGlvbih7XG4gICAgYWN0aXZhdGVPblR5cGluZzogdHJ1ZSxcbiAgICBvdmVycmlkZTogW1xuICAgICAgYXN5bmMgKGNvbnRleHQ6IENvbXBsZXRpb25Db250ZXh0KTogUHJvbWlzZTxDb21wbGV0aW9uUmVzdWx0IHwgbnVsbD4gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGNvbnRleHRQb3NpdGlvbnMgPSBjb250ZXh0LnN0YXRlLndvcmRBdChjb250ZXh0LnBvcyk7XG5cbiAgICAgICAgICBzZW5kUmVxdWVzdFRvVHNWZnMoe1xuICAgICAgICAgICAgYWN0aW9uOiBUc1Zmc1dvcmtlckFjdGlvbnMuQVVUT0NPTVBMRVRFX1JFUVVFU1QsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGZpbGU6IGN1cnJlbnRGaWxlKCkuZmlsZW5hbWUsXG4gICAgICAgICAgICAgIHBvc2l0aW9uOiBjb250ZXh0LnBvcyxcbiAgICAgICAgICAgICAgZnJvbTogY29udGV4dFBvc2l0aW9ucz8uZnJvbSxcbiAgICAgICAgICAgICAgdG86IGNvbnRleHRQb3NpdGlvbnM/LnRvLFxuICAgICAgICAgICAgICBjb250ZW50OiBjb250ZXh0LnN0YXRlLmRvYy50b1N0cmluZygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGNvbXBsZXRpb25zID0gYXdhaXQgbmV3IFByb21pc2U8QXV0b2NvbXBsZXRlUmVzcG9uc2UgfCB1bmRlZmluZWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBlbWl0dGVyXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcigoZXZlbnQpID0+IGV2ZW50LmFjdGlvbiA9PT0gVHNWZnNXb3JrZXJBY3Rpb25zLkFVVE9DT01QTEVURV9SRVNQT05TRSksXG4gICAgICAgICAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKChtZXNzYWdlOiBBY3Rpb25NZXNzYWdlPEF1dG9jb21wbGV0ZVJlc3BvbnNlPikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobWVzc2FnZS5kYXRhKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIWNvbXBsZXRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb21wbGV0aW9uU291cmNlID0gY29tcGxldGVGcm9tTGlzdChcbiAgICAgICAgICAgIGNvbXBsZXRpb25zLm1hcCgoY29tcGxldGlvbkl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3VnZ2VzdGlvbnM6IENvbXBsZXRpb24gPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogY29tcGxldGlvbkl0ZW0ua2luZCxcbiAgICAgICAgICAgICAgICBsYWJlbDogY29tcGxldGlvbkl0ZW0ubmFtZSxcbiAgICAgICAgICAgICAgICBib29zdDogMSAvIE51bWJlcihjb21wbGV0aW9uSXRlbS5zb3J0VGV4dCksXG4gICAgICAgICAgICAgICAgZGV0YWlsOiBjb21wbGV0aW9uSXRlbT8uY29kZUFjdGlvbnM/LlswXT8uZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgYXBwbHk6ICh2aWV3LCBjb21wbGV0aW9uLCBmcm9tLCB0bykgPT5cbiAgICAgICAgICAgICAgICAgIGFwcGx5V2l0aENvZGVBY3Rpb24odmlldywgey4uLmNvbXBsZXRpb24sIC4uLmNvbXBsZXRpb25JdGVtfSwgZnJvbSwgdG8pLFxuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHJldHVybiBzdWdnZXN0aW9ucztcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4gY29tcGxldGlvblNvdXJjZShjb250ZXh0KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIF0sXG4gIH0pO1xufTtcblxuY29uc3QgYXBwbHlXaXRoQ29kZUFjdGlvbiA9IChcbiAgdmlldzogRWRpdG9yVmlldyxcbiAgY29tcGxldGlvbjogQ29tcGxldGlvbiAmIEF1dG9jb21wbGV0ZUl0ZW0sXG4gIGZyb206IG51bWJlcixcbiAgdG86IG51bWJlcixcbikgPT4ge1xuICBjb25zdCB0cmFuc2FjdGlvblNwZWNzOiBUcmFuc2FjdGlvblNwZWNbXSA9IFtcbiAgICBpbnNlcnRDb21wbGV0aW9uVGV4dCh2aWV3LnN0YXRlLCBjb21wbGV0aW9uLmxhYmVsLCBmcm9tLCB0byksXG4gIF07XG5cbiAgaWYgKGNvbXBsZXRpb24uY29kZUFjdGlvbnM/Lmxlbmd0aCkge1xuICAgIGNvbnN0IHtzcGFuLCBuZXdUZXh0fSA9IGNvbXBsZXRpb24uY29kZUFjdGlvbnNbMF0uY2hhbmdlc1swXS50ZXh0Q2hhbmdlc1swXTtcblxuICAgIHRyYW5zYWN0aW9uU3BlY3MucHVzaChcbiAgICAgIGluc2VydENvbXBsZXRpb25UZXh0KHZpZXcuc3RhdGUsIG5ld1RleHQsIHNwYW4uc3RhcnQsIHNwYW4uc3RhcnQgKyBzcGFuLmxlbmd0aCksXG4gICAgKTtcbiAgfVxuXG4gIHZpZXcuZGlzcGF0Y2goXG4gICAgLi4udHJhbnNhY3Rpb25TcGVjcyxcbiAgICAvLyBhdm9pZCBtb3ZpbmcgY3Vyc29yIHRvIHRoZSBhdXRvY29tcGxldGVkIHRleHRcbiAgICB7c2VsZWN0aW9uOiB2aWV3LnN0YXRlLnNlbGVjdGlvbn0sXG4gICk7XG5cbiAgLy8gTWFudWFsbHkgY2xvc2UgdGhlIGF1dG9jb21wbGV0ZSBwaWNrZXIgYWZ0ZXIgYXBwbHlpbmcgdGhlIGNvbXBsZXRpb25cbiAgY2xvc2VDb21wbGV0aW9uKHZpZXcpO1xufTtcbiJdfQ==