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
import { IconComponent } from '../icon/icon.component.js';
import * as i0 from "@angular/core";
const _c0 = ["docs-copy-source-code", ""];
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
CopySourceCodeButton.ɵfac = function CopySourceCodeButton_Factory(t) { return new (t || CopySourceCodeButton)(); };
CopySourceCodeButton.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CopySourceCodeButton, selectors: [["button", "docs-copy-source-code", ""]], hostAttrs: ["type", "button", "aria-label", "Copy example source to clipboard", "title", "Copy example source"], hostVars: 4, hostBindings: function CopySourceCodeButton_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function CopySourceCodeButton_click_HostBindingHandler() { return ctx.copySourceCode(); });
    } if (rf & 2) {
        i0.ɵɵclassProp("docs-copy-source-code-button-success", ctx.showCopySuccess())("docs-copy-source-code-button-failed", ctx.showCopyFailure());
    } }, standalone: true, features: [i0.ɵɵStandaloneFeature], attrs: _c0, decls: 5, vars: 0, consts: [["aria-hidden", "true", "width", "24", "height", "24", "viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "adev-copy"], ["d", "M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5ZM9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16Z", "fill", "#A39FA9"], [1, "adev-check"]], template: function CopySourceCodeButton_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "i");
        i0.ɵɵnamespaceSVG();
        i0.ɵɵelementStart(1, "svg", 0);
        i0.ɵɵelement(2, "path", 1);
        i0.ɵɵelementEnd()();
        i0.ɵɵnamespaceHTML();
        i0.ɵɵelementStart(3, "docs-icon", 2);
        i0.ɵɵtext(4, "check");
        i0.ɵɵelementEnd();
    } }, dependencies: [CommonModule, IconComponent], encapsulation: 2, changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CopySourceCodeButton, [{
        type: Component,
        args: [{ selector: 'button[docs-copy-source-code]', standalone: true, imports: [CommonModule, IconComponent], host: {
                    'type': 'button',
                    'aria-label': 'Copy example source to clipboard',
                    'title': 'Copy example source',
                    '(click)': 'copySourceCode()',
                    '[class.docs-copy-source-code-button-success]': 'showCopySuccess()',
                    '[class.docs-copy-source-code-button-failed]': 'showCopyFailure()',
                }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<i>\n  <svg\n    aria-hidden=\"true\"\n    width=\"24\"\n    height=\"24\"\n    viewBox=\"0 0 24 24\"\n    fill=\"none\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    class=\"adev-copy\"\n  >\n    <path\n      d=\"M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5ZM9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16Z\"\n      fill=\"#A39FA9\"\n    />\n  </svg>\n</i>\n\n<docs-icon class=\"adev-check\">check</docs-icon>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CopySourceCodeButton, { className: "CopySourceCodeButton", filePath: "docs/components/copy-source-code-button/copy-source-code-button.component.ts", lineNumber: 40 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29weS1zb3VyY2UtY29kZS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9jb21wb25lbnRzL2NvcHktc291cmNlLWNvZGUtYnV0dG9uL2NvcHktc291cmNlLWNvZGUtYnV0dG9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvY29tcG9uZW50cy9jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi9jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLE1BQU0sRUFDTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7OztBQUV4RCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxzQkFBc0IsQ0FBQztBQUM5RCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBRyxJQUFJLENBQUM7QUFpQmpELE1BQU0sT0FBTyxvQkFBb0I7SUFmakM7UUFnQm1CLG1CQUFjLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0MsY0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixlQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTlCLG9CQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBMkNwRDtJQXpDQyxjQUFjO1FBQ1osSUFBSSxDQUFDO1lBQ0gsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FDM0UsTUFBTSxDQUNRLENBQUM7WUFDakIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQUMsTUFBTSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNILENBQUM7SUFFTyxhQUFhLENBQUMsV0FBd0I7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFaEMsTUFBTSxZQUFZLEdBQWEsV0FBVyxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFckYsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEIsdURBQXVEO1lBQ3ZELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLDRCQUE0QixDQUFDLENBQUM7aUJBQ3pGLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUUsSUFBdUIsQ0FBQyxTQUFTLENBQUM7aUJBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVkLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlCLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLEdBQVcsV0FBVyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7WUFDakQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QyxDQUFDO0lBQ0gsQ0FBQztJQUVPLFVBQVUsQ0FBQyxZQUFxQztRQUN0RCxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLGlFQUFpRTtZQUNqRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3JDLENBQUMsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQ25DLENBQUM7O3dGQWhEVSxvQkFBb0I7dUVBQXBCLG9CQUFvQjtpR0FBcEIsb0JBQWdCOzs7O1FDdkM3Qix5QkFBRztRQUNELG1CQVFDO1FBUkQsOEJBUUM7UUFDQywwQkFHRTtRQUNKLGlCQUFNLEVBQUE7UUFHUixvQkFBOEI7UUFBOUIsb0NBQThCO1FBQUEscUJBQUs7UUFBQSxpQkFBWTt3QkRVbkMsWUFBWSxFQUFFLGFBQWE7aUZBWTFCLG9CQUFvQjtjQWZoQyxTQUFTOzJCQUNFLCtCQUErQixjQUM3QixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLFFBRWhDO29CQUNKLE1BQU0sRUFBRSxRQUFRO29CQUNoQixZQUFZLEVBQUUsa0NBQWtDO29CQUNoRCxPQUFPLEVBQUUscUJBQXFCO29CQUM5QixTQUFTLEVBQUUsa0JBQWtCO29CQUM3Qiw4Q0FBOEMsRUFBRSxtQkFBbUI7b0JBQ25FLDZDQUE2QyxFQUFFLG1CQUFtQjtpQkFDbkUsbUJBQ2dCLHVCQUF1QixDQUFDLE1BQU07O2tGQUVwQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBXcml0YWJsZVNpZ25hbCxcbiAgaW5qZWN0LFxuICBzaWduYWwsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NsaXBib2FyZH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NsaXBib2FyZCc7XG5pbXBvcnQge0ljb25Db21wb25lbnR9IGZyb20gJy4uL2ljb24vaWNvbi5jb21wb25lbnQuanMnO1xuXG5leHBvcnQgY29uc3QgUkVNT1ZFRF9MSU5FX0NMQVNTX05BTUUgPSAnLmhsanMtbG4tbGluZS5yZW1vdmUnO1xuZXhwb3J0IGNvbnN0IENPTkZJUk1BVElPTl9ESVNQTEFZX1RJTUVfTVMgPSAyMDAwO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdidXR0b25bZG9jcy1jb3B5LXNvdXJjZS1jb2RlXScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEljb25Db21wb25lbnRdLFxuICB0ZW1wbGF0ZVVybDogJy4vY29weS1zb3VyY2UtY29kZS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgJ3R5cGUnOiAnYnV0dG9uJyxcbiAgICAnYXJpYS1sYWJlbCc6ICdDb3B5IGV4YW1wbGUgc291cmNlIHRvIGNsaXBib2FyZCcsXG4gICAgJ3RpdGxlJzogJ0NvcHkgZXhhbXBsZSBzb3VyY2UnLFxuICAgICcoY2xpY2spJzogJ2NvcHlTb3VyY2VDb2RlKCknLFxuICAgICdbY2xhc3MuZG9jcy1jb3B5LXNvdXJjZS1jb2RlLWJ1dHRvbi1zdWNjZXNzXSc6ICdzaG93Q29weVN1Y2Nlc3MoKScsXG4gICAgJ1tjbGFzcy5kb2NzLWNvcHktc291cmNlLWNvZGUtYnV0dG9uLWZhaWxlZF0nOiAnc2hvd0NvcHlGYWlsdXJlKCknLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ29weVNvdXJjZUNvZGVCdXR0b24ge1xuICBwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yID0gaW5qZWN0KENoYW5nZURldGVjdG9yUmVmKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjbGlwYm9hcmQgPSBpbmplY3QoQ2xpcGJvYXJkKTtcbiAgcHJpdmF0ZSByZWFkb25seSBlbGVtZW50UmVmID0gaW5qZWN0KEVsZW1lbnRSZWYpO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzaG93Q29weVN1Y2Nlc3MgPSBzaWduYWwoZmFsc2UpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2hvd0NvcHlGYWlsdXJlID0gc2lnbmFsKGZhbHNlKTtcblxuICBjb3B5U291cmNlQ29kZSgpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY29kZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICdjb2RlJyxcbiAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBjb25zdCBzb3VyY2VDb2RlID0gdGhpcy5nZXRTb3VyY2VDb2RlKGNvZGVFbGVtZW50KTtcbiAgICAgIHRoaXMuY2xpcGJvYXJkLmNvcHkoc291cmNlQ29kZSk7XG4gICAgICB0aGlzLnNob3dSZXN1bHQodGhpcy5zaG93Q29weVN1Y2Nlc3MpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5zaG93UmVzdWx0KHRoaXMuc2hvd0NvcHlGYWlsdXJlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFNvdXJjZUNvZGUoY29kZUVsZW1lbnQ6IEhUTUxFbGVtZW50KTogc3RyaW5nIHtcbiAgICB0aGlzLnNob3dDb3B5U3VjY2Vzcy5zZXQoZmFsc2UpO1xuICAgIHRoaXMuc2hvd0NvcHlGYWlsdXJlLnNldChmYWxzZSk7XG5cbiAgICBjb25zdCByZW1vdmVkTGluZXM6IE5vZGVMaXN0ID0gY29kZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChSRU1PVkVEX0xJTkVfQ0xBU1NfTkFNRSk7XG5cbiAgICBpZiAocmVtb3ZlZExpbmVzLmxlbmd0aCkge1xuICAgICAgLy8gR2V0IG9ubHkgdGhvc2UgbGluZXMgd2hpY2ggYXJlIG5vdCBtYXJrZWQgYXMgcmVtb3ZlZFxuICAgICAgY29uc3QgZm9ybWF0dGVkVGV4dCA9IEFycmF5LmZyb20oY29kZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhsanMtbG4tbGluZTpub3QoLnJlbW92ZSknKSlcbiAgICAgICAgLm1hcCgobGluZSkgPT4gKGxpbmUgYXMgSFRNTERpdkVsZW1lbnQpLmlubmVyVGV4dClcbiAgICAgICAgLmpvaW4oJ1xcbicpO1xuXG4gICAgICByZXR1cm4gZm9ybWF0dGVkVGV4dC50cmltKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRleHQ6IHN0cmluZyA9IGNvZGVFbGVtZW50LmlubmVyVGV4dCB8fCAnJztcbiAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2VBbGwoYFxcblxcblxcbmAsIGBgKS50cmltKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaG93UmVzdWx0KG1lc3NhZ2VTdGF0ZTogV3JpdGFibGVTaWduYWw8Ym9vbGVhbj4pIHtcbiAgICBtZXNzYWdlU3RhdGUuc2V0KHRydWUpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBtZXNzYWdlU3RhdGUuc2V0KGZhbHNlKTtcbiAgICAgIC8vIEl0J3MgcmVxdWlyZWQgZm9yIGNvZGUgc25pcHBldHMgZW1iZWRkZWQgaW4gdGhlIEV4YW1wbGVWaWV3ZXIuXG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIENPTkZJUk1BVElPTl9ESVNQTEFZX1RJTUVfTVMpO1xuICB9XG59XG4iLCI8aT5cbiAgPHN2Z1xuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgd2lkdGg9XCIyNFwiXG4gICAgaGVpZ2h0PVwiMjRcIlxuICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgIGZpbGw9XCJub25lXCJcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICBjbGFzcz1cImFkZXYtY29weVwiXG4gID5cbiAgICA8cGF0aFxuICAgICAgZD1cIk01IDIyQzQuNDUgMjIgMy45NzkxNyAyMS44MDQyIDMuNTg3NSAyMS40MTI1QzMuMTk1ODMgMjEuMDIwOCAzIDIwLjU1IDMgMjBWNkg1VjIwSDE2VjIySDVaTTkgMThDOC40NSAxOCA3Ljk3OTE3IDE3LjgwNDIgNy41ODc1IDE3LjQxMjVDNy4xOTU4MyAxNy4wMjA4IDcgMTYuNTUgNyAxNlY0QzcgMy40NSA3LjE5NTgzIDIuOTc5MTcgNy41ODc1IDIuNTg3NUM3Ljk3OTE3IDIuMTk1ODMgOC40NSAyIDkgMkgxOEMxOC41NSAyIDE5LjAyMDggMi4xOTU4MyAxOS40MTI1IDIuNTg3NUMxOS44MDQyIDIuOTc5MTcgMjAgMy40NSAyMCA0VjE2QzIwIDE2LjU1IDE5LjgwNDIgMTcuMDIwOCAxOS40MTI1IDE3LjQxMjVDMTkuMDIwOCAxNy44MDQyIDE4LjU1IDE4IDE4IDE4SDlaTTkgMTZIMThWNEg5VjE2WlwiXG4gICAgICBmaWxsPVwiI0EzOUZBOVwiXG4gICAgLz5cbiAgPC9zdmc+XG48L2k+XG5cbjxkb2NzLWljb24gY2xhc3M9XCJhZGV2LWNoZWNrXCI+Y2hlY2s8L2RvY3MtaWNvbj5cbiJdfQ==