/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { linter } from '@codemirror/lint';
import { filter, take } from 'rxjs';
// Factory method for diagnostics extension.
export const getDiagnosticsExtension = (eventManager, currentFile, sendRequestToTsVfs, diagnosticsState) => {
    return linter(async (view) => {
        sendRequestToTsVfs({
            action: "diagnostics-request" /* TsVfsWorkerActions.DIAGNOSTICS_REQUEST */,
            data: {
                file: currentFile().filename,
            },
        });
        const diagnostics = await new Promise((resolve) => {
            eventManager
                .pipe(filter((event) => event.action === "diagnostics-response" /* TsVfsWorkerActions.DIAGNOSTICS_RESPONSE */), take(1))
                .subscribe((response) => {
                resolve(response.data);
            });
        });
        const result = !!diagnostics ? diagnostics : [];
        diagnosticsState.setDiagnostics(result);
        return result;
    }, {
        delay: 400,
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ25vc3RpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9jb2RlLWVkaXRvci9leHRlbnNpb25zL2RpYWdub3N0aWNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBYSxNQUFNLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQU1wRCxPQUFPLEVBQVUsTUFBTSxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUczQyw0Q0FBNEM7QUFDNUMsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsQ0FDckMsWUFBb0MsRUFDcEMsV0FBK0IsRUFDL0Isa0JBQXdFLEVBQ3hFLGdCQUFrQyxFQUNsQyxFQUFFO0lBQ0YsT0FBTyxNQUFNLENBQ1gsS0FBSyxFQUFFLElBQUksRUFBeUIsRUFBRTtRQUNwQyxrQkFBa0IsQ0FBQztZQUNqQixNQUFNLG9FQUF3QztZQUM5QyxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLFFBQVE7YUFDN0I7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDaEQsWUFBWTtpQkFDVCxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSx5RUFBNEMsQ0FBQyxFQUMzRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1I7aUJBQ0EsU0FBUyxDQUFDLENBQUMsUUFBcUMsRUFBRSxFQUFFO2dCQUNuRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBRSxXQUF3QyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFFOUUsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUMsRUFDRDtRQUNFLEtBQUssRUFBRSxHQUFHO0tBQ1gsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RpYWdub3N0aWMsIGxpbnRlcn0gZnJvbSAnQGNvZGVtaXJyb3IvbGludCc7XG5pbXBvcnQge1RzVmZzV29ya2VyQWN0aW9uc30gZnJvbSAnLi4vd29ya2Vycy9lbnVtcy9hY3Rpb25zLmpzJztcbmltcG9ydCB7U2lnbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RWRpdG9yRmlsZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lZGl0b3ItZmlsZS5qcyc7XG5pbXBvcnQge0FjdGlvbk1lc3NhZ2V9IGZyb20gJy4uL3dvcmtlcnMvaW50ZXJmYWNlcy9tZXNzYWdlLmpzJztcbmltcG9ydCB7RGlhZ25vc3RpY3NSZXF1ZXN0fSBmcm9tICcuLi93b3JrZXJzL2ludGVyZmFjZXMvZGlhZ25vc3RpY3MtcmVxdWVzdC5qcyc7XG5pbXBvcnQge1N1YmplY3QsIGZpbHRlciwgdGFrZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RpYWdub3N0aWNXaXRoTG9jYXRpb24sIERpYWdub3N0aWNzU3RhdGV9IGZyb20gJy4uL3NlcnZpY2VzL2RpYWdub3N0aWNzLXN0YXRlLnNlcnZpY2UuanMnO1xuXG4vLyBGYWN0b3J5IG1ldGhvZCBmb3IgZGlhZ25vc3RpY3MgZXh0ZW5zaW9uLlxuZXhwb3J0IGNvbnN0IGdldERpYWdub3N0aWNzRXh0ZW5zaW9uID0gKFxuICBldmVudE1hbmFnZXI6IFN1YmplY3Q8QWN0aW9uTWVzc2FnZT4sXG4gIGN1cnJlbnRGaWxlOiBTaWduYWw8RWRpdG9yRmlsZT4sXG4gIHNlbmRSZXF1ZXN0VG9Uc1ZmczogKHJlcXVlc3Q6IEFjdGlvbk1lc3NhZ2U8RGlhZ25vc3RpY3NSZXF1ZXN0PikgPT4gdm9pZCxcbiAgZGlhZ25vc3RpY3NTdGF0ZTogRGlhZ25vc3RpY3NTdGF0ZSxcbikgPT4ge1xuICByZXR1cm4gbGludGVyKFxuICAgIGFzeW5jICh2aWV3KTogUHJvbWlzZTxEaWFnbm9zdGljW10+ID0+IHtcbiAgICAgIHNlbmRSZXF1ZXN0VG9Uc1Zmcyh7XG4gICAgICAgIGFjdGlvbjogVHNWZnNXb3JrZXJBY3Rpb25zLkRJQUdOT1NUSUNTX1JFUVVFU1QsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBmaWxlOiBjdXJyZW50RmlsZSgpLmZpbGVuYW1lLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRpYWdub3N0aWNzID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgZXZlbnRNYW5hZ2VyXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKGV2ZW50KSA9PiBldmVudC5hY3Rpb24gPT09IFRzVmZzV29ya2VyQWN0aW9ucy5ESUFHTk9TVElDU19SRVNQT05TRSksXG4gICAgICAgICAgICB0YWtlKDEpLFxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKChyZXNwb25zZTogQWN0aW9uTWVzc2FnZTxEaWFnbm9zdGljW10+KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9ICEhZGlhZ25vc3RpY3MgPyAoZGlhZ25vc3RpY3MgYXMgRGlhZ25vc3RpY1dpdGhMb2NhdGlvbltdKSA6IFtdO1xuXG4gICAgICBkaWFnbm9zdGljc1N0YXRlLnNldERpYWdub3N0aWNzKHJlc3VsdCk7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICB7XG4gICAgICBkZWxheTogNDAwLFxuICAgIH0sXG4gICk7XG59O1xuIl19