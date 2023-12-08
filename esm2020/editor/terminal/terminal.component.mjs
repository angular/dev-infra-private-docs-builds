/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, ViewChild, ViewEncapsulation, inject, } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { TerminalHandler, TerminalType } from '../services/terminal-handler.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '../../providers/index';
import { NgIf } from '@angular/common';
import { fromEvent } from 'rxjs';
import * as i0 from "@angular/core";
export class Terminal {
    constructor() {
        this.destroyRef = inject(DestroyRef);
        this.terminalHandler = inject(TerminalHandler);
        this.window = inject(WINDOW);
    }
    ngAfterViewInit() {
        this.terminalHandler.registerTerminal(this.type, this.terminalElementRef.nativeElement);
        fromEvent(this.window, 'resize')
            .pipe(debounceTime(50), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.handleResize();
        });
    }
    handleResize() {
        this.terminalHandler.resizeToFitParent(this.type);
    }
}
Terminal.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: Terminal, deps: [], target: i0.ɵɵFactoryTarget.Component });
Terminal.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.1.0-next.1", type: Terminal, isStandalone: true, selector: "docs-tutorial-terminal", inputs: { type: "type" }, viewQueries: [{ propertyName: "terminalElementRef", first: true, predicate: ["terminalOutput"], descendants: true }], ngImport: i0, template: "<div #terminalOutput class=\"adev-terminal-output\"></div>\n", styles: ["@import'xterm/css/xterm.css';.docs-tutorial-terminal{display:block;height:calc(100% - 49px);overflow:hidden}.docs-tutorial-terminal-only{height:100%}.adev-terminal-output{height:100%}/*# sourceMappingURL=terminal.component.css.map */\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.1.0-next.1", ngImport: i0, type: Terminal, decorators: [{
            type: Component,
            args: [{ selector: 'docs-tutorial-terminal', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf], encapsulation: ViewEncapsulation.None, template: "<div #terminalOutput class=\"adev-terminal-output\"></div>\n", styles: ["@import'xterm/css/xterm.css';.docs-tutorial-terminal{display:block;height:calc(100% - 49px);overflow:hidden}.docs-tutorial-terminal-only{height:100%}.adev-terminal-output{height:100%}/*# sourceMappingURL=terminal.component.css.map */\n"] }]
        }], propDecorators: { type: [{
                type: Input,
                args: [{ required: true }]
            }], terminalElementRef: [{
                type: ViewChild,
                args: ['terminalOutput']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxlQUFlLEVBQUUsWUFBWSxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDbkYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNyQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQWEvQixNQUFNLE9BQU8sUUFBUTtJQVhyQjtRQWVtQixlQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hDLG9CQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFDLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7S0FlMUM7SUFiQyxlQUFlO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV4RixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7YUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDM0QsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7OzRHQXBCVSxRQUFRO2dHQUFSLFFBQVEsa09DdENyQiw4REFDQTtrR0RxQ2EsUUFBUTtrQkFYcEIsU0FBUzsrQkFDRSx3QkFBd0IsY0FDdEIsSUFBSSxtQkFHQyx1QkFBdUIsQ0FBQyxNQUFNLFdBQ3RDLENBQUMsSUFBSSxDQUFDLGlCQUdBLGlCQUFpQixDQUFDLElBQUk7OEJBR1osSUFBSTtzQkFBNUIsS0FBSzt1QkFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7Z0JBQ2Msa0JBQWtCO3NCQUF0RCxTQUFTO3VCQUFDLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRGVzdHJveVJlZixcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7ZGVib3VuY2VUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1Rlcm1pbmFsSGFuZGxlciwgVGVybWluYWxUeXBlfSBmcm9tICcuLi9zZXJ2aWNlcy90ZXJtaW5hbC1oYW5kbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHt0YWtlVW50aWxEZXN0cm95ZWR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUvcnhqcy1pbnRlcm9wJztcbmltcG9ydCB7V0lORE9XfSBmcm9tICcuLi8uLi9wcm92aWRlcnMvaW5kZXgnO1xuaW1wb3J0IHtOZ0lmfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtmcm9tRXZlbnR9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkb2NzLXR1dG9yaWFsLXRlcm1pbmFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGVVcmw6ICcuL3Rlcm1pbmFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGVybWluYWwuY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGltcG9ydHM6IFtOZ0lmXSxcbiAgLy8gVmlld0VuY2Fwc3VsYXRpb24gaXMgZGlzYWJsZWQgdG8gYWxsb3cgWHRlcm0uanMncyBzdHlsZXMgdG8gYmUgYXBwbGllZFxuICAvLyB0byB0aGUgdGVybWluYWwgZWxlbWVudC5cbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgVGVybWluYWwgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KHtyZXF1aXJlZDogdHJ1ZX0pIHR5cGUhOiBUZXJtaW5hbFR5cGU7XG4gIEBWaWV3Q2hpbGQoJ3Rlcm1pbmFsT3V0cHV0JykgcHJpdmF0ZSB0ZXJtaW5hbEVsZW1lbnRSZWYhOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG4gIHByaXZhdGUgcmVhZG9ubHkgdGVybWluYWxIYW5kbGVyID0gaW5qZWN0KFRlcm1pbmFsSGFuZGxlcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgd2luZG93ID0gaW5qZWN0KFdJTkRPVyk7XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMudGVybWluYWxIYW5kbGVyLnJlZ2lzdGVyVGVybWluYWwodGhpcy50eXBlLCB0aGlzLnRlcm1pbmFsRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcblxuICAgIGZyb21FdmVudCh0aGlzLndpbmRvdywgJ3Jlc2l6ZScpXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoNTApLCB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZVJlc2l6ZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsSGFuZGxlci5yZXNpemVUb0ZpdFBhcmVudCh0aGlzLnR5cGUpO1xuICB9XG59XG4iLCI8ZGl2ICN0ZXJtaW5hbE91dHB1dCBjbGFzcz1cImFkZXYtdGVybWluYWwtb3V0cHV0XCI+PC9kaXY+XG4iXX0=