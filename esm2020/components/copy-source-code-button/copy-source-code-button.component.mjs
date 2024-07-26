/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, signal, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { IconComponent } from '../icon/icon.component';
import * as i0 from "@angular/core";
export const REMOVED_LINE_CLASS_NAME = '.line.remove';
export const CONFIRMATION_DISPLAY_TIME_MS = 2000;
export class CopySourceCodeButton {
    constructor() {
        this.changeDetector = inject(ChangeDetectorRef);
        this.clipboard = inject(Clipboard);
        this.elementRef = inject(ElementRef);
        this.showCopySuccess = signal(false);
        this.showCopyFailure = signal(false);
    }
    copySourceCode() {
        try {
            const codeElement = this.elementRef.nativeElement.parentElement.querySelector('code');
            const sourceCode = this.getSourceCode(codeElement);
            this.clipboard.copy(sourceCode);
            this.showResult(this.showCopySuccess);
        }
        catch {
            this.showResult(this.showCopyFailure);
        }
    }
    getSourceCode(codeElement) {
        this.showCopySuccess.set(false);
        this.showCopyFailure.set(false);
        const removedLines = codeElement.querySelectorAll(REMOVED_LINE_CLASS_NAME);
        if (removedLines.length) {
            // Get only those lines which are not marked as removed
            const formattedText = Array.from(codeElement.querySelectorAll('.line:not(.remove)'))
                .map((line) => line.innerText)
                .join('\n');
            return formattedText.trim();
        }
        else {
            const text = codeElement.innerText || '';
            return text.replaceAll(`\n\n\n`, ``).trim();
        }
    }
    showResult(messageState) {
        messageState.set(true);
        setTimeout(() => {
            messageState.set(false);
            // It's required for code snippets embedded in the ExampleViewer.
            this.changeDetector.markForCheck();
        }, CONFIRMATION_DISPLAY_TIME_MS);
    }
}
CopySourceCodeButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: CopySourceCodeButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
CopySourceCodeButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.0-next.2", type: CopySourceCodeButton, isStandalone: true, selector: "button[docs-copy-source-code]", host: { attributes: { "type": "button", "aria-label": "Copy example source to clipboard", "title": "Copy example source" }, listeners: { "click": "copySourceCode()" }, properties: { "class.docs-copy-source-code-button-success": "showCopySuccess()", "class.docs-copy-source-code-button-failed": "showCopyFailure()" } }, ngImport: i0, template: "<i>\n  <svg\n    aria-hidden=\"true\"\n    width=\"24\"\n    height=\"24\"\n    viewBox=\"0 0 24 24\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    class=\"docs-copy\"\n  >\n    <path\n      d=\"M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5ZM9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16Z\"\n      fill=\"#A39FA9\"\n    />\n  </svg>\n</i>\n\n<docs-icon class=\"docs-check\">check</docs-icon>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: IconComponent, selector: "docs-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: CopySourceCodeButton, decorators: [{
            type: Component,
            args: [{ selector: 'button[docs-copy-source-code]', standalone: true, imports: [CommonModule, IconComponent], host: {
                        'type': 'button',
                        'aria-label': 'Copy example source to clipboard',
                        'title': 'Copy example source',
                        '(click)': 'copySourceCode()',
                        '[class.docs-copy-source-code-button-success]': 'showCopySuccess()',
                        '[class.docs-copy-source-code-button-failed]': 'showCopyFailure()',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<i>\n  <svg\n    aria-hidden=\"true\"\n    width=\"24\"\n    height=\"24\"\n    viewBox=\"0 0 24 24\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    class=\"docs-copy\"\n  >\n    <path\n      d=\"M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5ZM9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16Z\"\n      fill=\"#A39FA9\"\n    />\n  </svg>\n</i>\n\n<docs-icon class=\"docs-check\">check</docs-icon>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1zb3VyY2UtY29kZS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL2NvcHktc291cmNlLWNvZGUtYnV0dG9uL2NvcHktc291cmNlLWNvZGUtYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi9jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLE1BQU0sRUFDTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBRXJELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLGNBQWMsQ0FBQztBQUN0RCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLENBQUM7QUFpQmpELE1BQU0sT0FBTyxvQkFBb0I7SUFmakM7UUFnQm1CLG1CQUFjLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0MsY0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixlQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTlCLG9CQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBMkNwRDtJQXpDQyxjQUFjO1FBQ1osSUFBSSxDQUFDO1lBQ0gsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDM0UsTUFBTSxDQUNRLENBQUM7WUFDakIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNILENBQUM7SUFFTyxhQUFhLENBQUMsV0FBd0I7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsTUFBTSxZQUFZLEdBQWEsV0FBVyxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFckYsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsdURBQXVEO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUM7aUJBQ2pGLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUUsSUFBdUIsQ0FBQyxTQUFTLENBQUM7aUJBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVkLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLEdBQVcsV0FBVyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDakQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQztJQUVPLFVBQVUsQ0FBQyxZQUFxQztRQUN0RCxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLGlFQUFpRTtZQUNqRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLENBQUMsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7O3dIQWhEVSxvQkFBb0I7NEdBQXBCLG9CQUFvQix3WkN2Q2pDLDJzQkFrQkEsMkNEU1ksWUFBWSwrQkFBRSxhQUFhO2tHQVkxQixvQkFBb0I7a0JBZmhDLFNBQVM7K0JBQ0UsK0JBQStCLGNBQzdCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsUUFFaEM7d0JBQ0osTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLFlBQVksRUFBRSxrQ0FBa0M7d0JBQ2hELE9BQU8sRUFBRSxxQkFBcUI7d0JBQzlCLFNBQVMsRUFBRSxrQkFBa0I7d0JBQzdCLDhDQUE4QyxFQUFFLG1CQUFtQjt3QkFDbkUsNkNBQTZDLEVBQUUsbUJBQW1CO3FCQUNuRSxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIFdyaXRhYmxlU2lnbmFsLFxuICBpbmplY3QsXG4gIHNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q2xpcGJvYXJkfSBmcm9tICdAYW5ndWxhci9jZGsvY2xpcGJvYXJkJztcbmltcG9ydCB7SWNvbkNvbXBvbmVudH0gZnJvbSAnLi4vaWNvbi9pY29uLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCBSRU1PVkVEX0xJTkVfQ0xBU1NfTkFNRSA9ICcubGluZS5yZW1vdmUnO1xuZXhwb3J0IGNvbnN0IENPTkZJUk1BVElPTl9ESVNQTEFZX1RJTUVfTVMgPSAyMDAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdidXR0b25bZG9jcy1jb3B5LXNvdXJjZS1jb2RlXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEljb25Db21wb25lbnRdLFxuICB0ZW1wbGF0ZVVybDogJy4vY29weS1zb3VyY2UtY29kZS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgJ3R5cGUnOiAnYnV0dG9uJyxcbiAgICAnYXJpYS1sYWJlbCc6ICdDb3B5IGV4YW1wbGUgc291cmNlIHRvIGNsaXBib2FyZCcsXG4gICAgJ3RpdGxlJzogJ0NvcHkgZXhhbXBsZSBzb3VyY2UnLFxuICAgICcoY2xpY2spJzogJ2NvcHlTb3VyY2VDb2RlKCknLFxuICAgICdbY2xhc3MuZG9jcy1jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi1zdWNjZXNzXSc6ICdzaG93Q29weVN1Y2Nlc3MoKScsXG4gICAgJ1tjbGFzcy5kb2NzLWNvcHktc291cmNlLWNvZGUtYnV0dG9uLWZhaWxlZF0nOiAnc2hvd0NvcHlGYWlsdXJlKCknLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29weVNvdXJjZUNvZGVCdXR0b24ge1xuICBwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjbGlwYm9hcmQgPSBpbmplY3QoQ2xpcGJvYXJkKTtcbiAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50UmVmID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzaG93Q29weVN1Y2Nlc3MgPSBzaWduYWwoZmFsc2UpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2hvd0NvcHlGYWlsdXJlID0gc2lnbmFsKGZhbHNlKTtcblxuICBjb3B5U291cmNlQ29kZSgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29kZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICdjb2RlJyxcbiAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBjb25zdCBzb3VyY2VDb2RlID0gdGhpcy5nZXRTb3VyY2VDb2RlKGNvZGVFbGVtZW50KTtcbiAgICAgIHRoaXMuY2xpcGJvYXJkLmNvcHkoc291cmNlQ29kZSk7XG4gICAgICB0aGlzLnNob3dSZXN1bHQodGhpcy5zaG93Q29weVN1Y2Nlc3MpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5zaG93UmVzdWx0KHRoaXMuc2hvd0NvcHlGYWlsdXJlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFNvdXJjZUNvZGUoY29kZUVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICB0aGlzLnNob3dDb3B5U3VjY2Vzcy5zZXQoZmFsc2UpO1xuICAgIHRoaXMuc2hvd0NvcHlGYWlsdXJlLnNldChmYWxzZSk7XG5cbiAgICBjb25zdCByZW1vdmVkTGluZXM6IE5vZGVMaXN0ID0gY29kZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChSRU1PVkVEX0xJTkVfQ0xBU1NfTkFNRSk7XG5cbiAgICBpZiAocmVtb3ZlZExpbmVzLmxlbmd0aCkge1xuICAgICAgLy8gR2V0IG9ubHkgdGhvc2UgbGluZXMgd2hpY2ggYXJlIG5vdCBtYXJrZWQgYXMgcmVtb3ZlZFxuICAgICAgY29uc3QgZm9ybWF0dGVkVGV4dCA9IEFycmF5LmZyb20oY29kZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxpbmU6bm90KC5yZW1vdmUpJykpXG4gICAgICAgIC5tYXAoKGxpbmUpID0+IChsaW5lIGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQpXG4gICAgICAgIC5qb2luKCdcXG4nKTtcblxuICAgICAgcmV0dXJuIGZvcm1hdHRlZFRleHQudHJpbSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSBjb2RlRWxlbWVudC5pbm5lclRleHQgfHwgJyc7XG4gICAgICByZXR1cm4gdGV4dC5yZXBsYWNlQWxsKGBcXG5cXG5cXG5gLCBgYCkudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd1Jlc3VsdChtZXNzYWdlU3RhdGU6IFdyaXRhYmxlU2lnbmFsPGJvb2xlYW4+KSB7XG4gICAgbWVzc2FnZVN0YXRlLnNldCh0cnVlKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbWVzc2FnZVN0YXRlLnNldChmYWxzZSk7XG4gICAgICAvLyBJdCdzIHJlcXVpcmVkIGZvciBjb2RlIHNuaXBwZXRzIGVtYmVkZGVkIGluIHRoZSBFeGFtcGxlVmlld2VyLlxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9LCBDT05GSVJNQVRJT05fRElTUExBWV9USU1FX01TKTtcbiAgfVxufVxuIiwiPGk+XG4gIDxzdmdcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIHdpZHRoPVwiMjRcIlxuICAgIGhlaWdodD1cIjI0XCJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICBmaWxsPVwibm9uZVwiXG4gICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgY2xhc3M9XCJkb2NzLWNvcHlcIlxuICA+XG4gICAgPHBhdGhcbiAgICAgIGQ9XCJNNSAyMkM0LjQ1IDIyIDMuOTc5MTcgMjEuODA0MiAzLjU4NzUgMjEuNDEyNUMzLjE5NTgzIDIxLjAyMDggMyAyMC41NSAzIDIwVjZINVYyMEgxNlYyMkg1Wk05IDE4QzguNDUgMTggNy45NzkxNyAxNy44MDQyIDcuNTg3NSAxNy40MTI1QzcuMTk1ODMgMTcuMDIwOCA3IDE2LjU1IDcgMTZWNEM3IDMuNDUgNy4xOTU4MyAyLjk3OTE3IDcuNTg3NSAyLjU4NzVDNy45NzkxNyAyLjE5NTgzIDguNDUgMiA5IDJIMThDMTguNTUgMiAxOS4wMjA4IDIuMTk1ODMgMTkuNDEyNSAyLjU4NzVDMTkuODA0MiAyLjk3OTE3IDIwIDMuNDUgMjAgNFYxNkMyMCAxNi41NSAxOS44MDQyIDE3LjAyMDggMTkuNDEyNSAxNy40MTI1QzE5LjAyMDggMTcuODA0MiAxOC41NSAxOCAxOCAxOEg5Wk05IDE2SDE4VjRIOVYxNlpcIlxuICAgICAgZmlsbD1cIiNBMzlGQTlcIlxuICAgIC8+XG4gIDwvc3ZnPlxuPC9pPlxuXG48ZG9jcy1pY29uIGNsYXNzPVwiZG9jcy1jaGVja1wiPmNoZWNrPC9kb2NzLWljb24+XG4iXX0=