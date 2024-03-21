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
export const REMOVED_LINE_CLASS_NAME = '.hljs-ln-line.remove';
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
            const formattedText = Array.from(codeElement.querySelectorAll('.hljs-ln-line:not(.remove)'))
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
CopySourceCodeButton.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.1", ngImport: i0, type: CopySourceCodeButton, deps: [], target: i0.ɵɵFactoryTarget.Component });
CopySourceCodeButton.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.0-next.1", type: CopySourceCodeButton, isStandalone: true, selector: "button[docs-copy-source-code]", host: { attributes: { "type": "button", "aria-label": "Copy example source to clipboard", "title": "Copy example source" }, listeners: { "click": "copySourceCode()" }, properties: { "class.docs-copy-source-code-button-success": "showCopySuccess()", "class.docs-copy-source-code-button-failed": "showCopyFailure()" } }, ngImport: i0, template: "<i>\n  <svg\n    aria-hidden=\"true\"\n    width=\"24\"\n    height=\"24\"\n    viewBox=\"0 0 24 24\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    class=\"docs-copy\"\n  >\n    <path\n      d=\"M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5ZM9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16Z\"\n      fill=\"#A39FA9\"\n    />\n  </svg>\n</i>\n\n<docs-icon class=\"docs-check\">check</docs-icon>\n", dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: IconComponent, selector: "docs-icon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.1", ngImport: i0, type: CopySourceCodeButton, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1zb3VyY2UtY29kZS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL2NvcHktc291cmNlLWNvZGUtYnV0dG9uL2NvcHktc291cmNlLWNvZGUtYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi9jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLE1BQU0sRUFDTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7O0FBRXJELE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLHNCQUFzQixDQUFDO0FBQzlELE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFHLElBQUksQ0FBQztBQWlCakQsTUFBTSxPQUFPLG9CQUFvQjtJQWZqQztRQWdCbUIsbUJBQWMsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMzQyxjQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLGVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFOUIsb0JBQWUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsb0JBQWUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0EyQ3BEO0lBekNDLGNBQWM7UUFDWixJQUFJLENBQUM7WUFDSCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUMzRSxNQUFNLENBQ1EsQ0FBQztZQUNqQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFBQyxNQUFNLENBQUM7WUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQztJQUVPLGFBQWEsQ0FBQyxXQUF3QjtRQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoQyxNQUFNLFlBQVksR0FBYSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUVyRixJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4Qix1REFBdUQ7WUFDdkQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsNEJBQTRCLENBQUMsQ0FBQztpQkFDekYsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBRSxJQUF1QixDQUFDLFNBQVMsQ0FBQztpQkFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWQsT0FBTyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksR0FBVyxXQUFXLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztZQUNqRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlDLENBQUM7SUFDSCxDQUFDO0lBRU8sVUFBVSxDQUFDLFlBQXFDO1FBQ3RELFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkIsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsaUVBQWlFO1lBQ2pFLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsQ0FBQyxFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDbkMsQ0FBQzs7d0hBaERVLG9CQUFvQjs0R0FBcEIsb0JBQW9CLHdaQ3ZDakMsMnNCQWtCQSwyQ0RTWSxZQUFZLCtCQUFFLGFBQWE7a0dBWTFCLG9CQUFvQjtrQkFmaEMsU0FBUzsrQkFDRSwrQkFBK0IsY0FDN0IsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxRQUVoQzt3QkFDSixNQUFNLEVBQUUsUUFBUTt3QkFDaEIsWUFBWSxFQUFFLGtDQUFrQzt3QkFDaEQsT0FBTyxFQUFFLHFCQUFxQjt3QkFDOUIsU0FBUyxFQUFFLGtCQUFrQjt3QkFDN0IsOENBQThDLEVBQUUsbUJBQW1CO3dCQUNuRSw2Q0FBNkMsRUFBRSxtQkFBbUI7cUJBQ25FLG1CQUNnQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgV3JpdGFibGVTaWduYWwsXG4gIGluamVjdCxcbiAgc2lnbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDbGlwYm9hcmR9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jbGlwYm9hcmQnO1xuaW1wb3J0IHtJY29uQ29tcG9uZW50fSBmcm9tICcuLi9pY29uL2ljb24uY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IFJFTU9WRURfTElORV9DTEFTU19OQU1FID0gJy5obGpzLWxuLWxpbmUucmVtb3ZlJztcbmV4cG9ydCBjb25zdCBDT05GSVJNQVRJT05fRElTUExBWV9USU1FX01TID0gMjAwMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW2RvY3MtY29weS1zb3VyY2UtY29kZV0nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJY29uQ29tcG9uZW50XSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvcHktc291cmNlLWNvZGUtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsXG4gICAgJ2FyaWEtbGFiZWwnOiAnQ29weSBleGFtcGxlIHNvdXJjZSB0byBjbGlwYm9hcmQnLFxuICAgICd0aXRsZSc6ICdDb3B5IGV4YW1wbGUgc291cmNlJyxcbiAgICAnKGNsaWNrKSc6ICdjb3B5U291cmNlQ29kZSgpJyxcbiAgICAnW2NsYXNzLmRvY3MtY29weS1zb3VyY2UtY29kZS1idXR0b24tc3VjY2Vzc10nOiAnc2hvd0NvcHlTdWNjZXNzKCknLFxuICAgICdbY2xhc3MuZG9jcy1jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi1mYWlsZWRdJzogJ3Nob3dDb3B5RmFpbHVyZSgpJyxcbiAgfSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvcHlTb3VyY2VDb2RlQnV0dG9uIHtcbiAgcHJpdmF0ZSByZWFkb25seSBjaGFuZ2VEZXRlY3RvciA9IGluamVjdChDaGFuZ2VEZXRlY3RvclJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2xpcGJvYXJkID0gaW5qZWN0KENsaXBib2FyZCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZWxlbWVudFJlZiA9IGluamVjdChFbGVtZW50UmVmKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2hvd0NvcHlTdWNjZXNzID0gc2lnbmFsKGZhbHNlKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNob3dDb3B5RmFpbHVyZSA9IHNpZ25hbChmYWxzZSk7XG5cbiAgY29weVNvdXJjZUNvZGUoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvZGVFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnY29kZScsXG4gICAgICApIGFzIEhUTUxFbGVtZW50O1xuICAgICAgY29uc3Qgc291cmNlQ29kZSA9IHRoaXMuZ2V0U291cmNlQ29kZShjb2RlRWxlbWVudCk7XG4gICAgICB0aGlzLmNsaXBib2FyZC5jb3B5KHNvdXJjZUNvZGUpO1xuICAgICAgdGhpcy5zaG93UmVzdWx0KHRoaXMuc2hvd0NvcHlTdWNjZXNzKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHRoaXMuc2hvd1Jlc3VsdCh0aGlzLnNob3dDb3B5RmFpbHVyZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRTb3VyY2VDb2RlKGNvZGVFbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgdGhpcy5zaG93Q29weVN1Y2Nlc3Muc2V0KGZhbHNlKTtcbiAgICB0aGlzLnNob3dDb3B5RmFpbHVyZS5zZXQoZmFsc2UpO1xuXG4gICAgY29uc3QgcmVtb3ZlZExpbmVzOiBOb2RlTGlzdCA9IGNvZGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoUkVNT1ZFRF9MSU5FX0NMQVNTX05BTUUpO1xuXG4gICAgaWYgKHJlbW92ZWRMaW5lcy5sZW5ndGgpIHtcbiAgICAgIC8vIEdldCBvbmx5IHRob3NlIGxpbmVzIHdoaWNoIGFyZSBub3QgbWFya2VkIGFzIHJlbW92ZWRcbiAgICAgIGNvbnN0IGZvcm1hdHRlZFRleHQgPSBBcnJheS5mcm9tKGNvZGVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5obGpzLWxuLWxpbmU6bm90KC5yZW1vdmUpJykpXG4gICAgICAgIC5tYXAoKGxpbmUpID0+IChsaW5lIGFzIEhUTUxEaXZFbGVtZW50KS5pbm5lclRleHQpXG4gICAgICAgIC5qb2luKCdcXG4nKTtcblxuICAgICAgcmV0dXJuIGZvcm1hdHRlZFRleHQudHJpbSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0ZXh0OiBzdHJpbmcgPSBjb2RlRWxlbWVudC5pbm5lclRleHQgfHwgJyc7XG4gICAgICByZXR1cm4gdGV4dC5yZXBsYWNlQWxsKGBcXG5cXG5cXG5gLCBgYCkudHJpbSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd1Jlc3VsdChtZXNzYWdlU3RhdGU6IFdyaXRhYmxlU2lnbmFsPGJvb2xlYW4+KSB7XG4gICAgbWVzc2FnZVN0YXRlLnNldCh0cnVlKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbWVzc2FnZVN0YXRlLnNldChmYWxzZSk7XG4gICAgICAvLyBJdCdzIHJlcXVpcmVkIGZvciBjb2RlIHNuaXBwZXRzIGVtYmVkZGVkIGluIHRoZSBFeGFtcGxlVmlld2VyLlxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9LCBDT05GSVJNQVRJT05fRElTUExBWV9USU1FX01TKTtcbiAgfVxufVxuIiwiPGk+XG4gIDxzdmdcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIHdpZHRoPVwiMjRcIlxuICAgIGhlaWdodD1cIjI0XCJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICBmaWxsPVwibm9uZVwiXG4gICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgY2xhc3M9XCJkb2NzLWNvcHlcIlxuICA+XG4gICAgPHBhdGhcbiAgICAgIGQ9XCJNNSAyMkM0LjQ1IDIyIDMuOTc5MTcgMjEuODA0MiAzLjU4NzUgMjEuNDEyNUMzLjE5NTgzIDIxLjAyMDggMyAyMC41NSAzIDIwVjZINVYyMEgxNlYyMkg1Wk05IDE4QzguNDUgMTggNy45NzkxNyAxNy44MDQyIDcuNTg3NSAxNy40MTI1QzcuMTk1ODMgMTcuMDIwOCA3IDE2LjU1IDcgMTZWNEM3IDMuNDUgNy4xOTU4MyAyLjk3OTE3IDcuNTg3NSAyLjU4NzVDNy45NzkxNyAyLjE5NTgzIDguNDUgMiA5IDJIMThDMTguNTUgMiAxOS4wMjA4IDIuMTk1ODMgMTkuNDEyNSAyLjU4NzVDMTkuODA0MiAyLjk3OTE3IDIwIDMuNDUgMjAgNFYxNkMyMCAxNi41NSAxOS44MDQyIDE3LjAyMDggMTkuNDEyNSAxNy40MTI1QzE5LjAyMDggMTcuODA0MiAxOC41NSAxOCAxOCAxOEg5Wk05IDE2SDE4VjRIOVYxNlpcIlxuICAgICAgZmlsbD1cIiNBMzlGQTlcIlxuICAgIC8+XG4gIDwvc3ZnPlxuPC9pPlxuXG48ZG9jcy1pY29uIGNsYXNzPVwiZG9jcy1jaGVja1wiPmNoZWNrPC9kb2NzLWljb24+XG4iXX0=