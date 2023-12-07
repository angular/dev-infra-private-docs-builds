/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Input, ViewChild, ViewEncapsulation, inject, } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { TerminalHandler, TerminalType } from '../services/terminal-handler.service.js';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WINDOW } from '../../providers/index.js';
import { NgIf } from '@angular/common';
import { fromEvent } from 'rxjs';
import * as i0 from "@angular/core";
const _c0 = ["terminalOutput"];
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
Terminal.ɵfac = function Terminal_Factory(t) { return new (t || Terminal)(); };
Terminal.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Terminal, selectors: [["docs-tutorial-terminal"]], viewQuery: function Terminal_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.terminalElementRef = _t.first);
    } }, inputs: { type: "type" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 0, consts: [[1, "adev-terminal-output"], ["terminalOutput", ""]], template: function Terminal_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "div", 0, 1);
    } }, styles: ["@import'xterm/css/xterm.css';.docs-tutorial-terminal{display:block;height:calc(100% - 49px);overflow:hidden}.docs-tutorial-terminal-only{height:100%}.adev-terminal-output{height:100%}/*# sourceMappingURL=terminal.component.css.map */\n"], encapsulation: 2, changeDetection: 0 });
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Terminal, [{
        type: Component,
        args: [{ selector: 'docs-tutorial-terminal', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [NgIf], encapsulation: ViewEncapsulation.None, template: "<div #terminalOutput class=\"adev-terminal-output\"></div>\n", styles: ["@import'xterm/css/xterm.css';.docs-tutorial-terminal{display:block;height:calc(100% - 49px);overflow:hidden}.docs-tutorial-terminal-only{height:100%}.adev-terminal-output{height:100%}/*# sourceMappingURL=terminal.component.css.map */\n"] }]
    }], null, { type: [{
            type: Input,
            args: [{ required: true }]
        }], terminalElementRef: [{
            type: ViewChild,
            args: ['terminalOutput']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Terminal, { className: "Terminal", filePath: "docs/editor/terminal/terminal.component.ts", lineNumber: 39 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3IvdGVybWluYWwvdGVybWluYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULGlCQUFpQixFQUNqQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxlQUFlLEVBQUUsWUFBWSxFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDdEYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDOUQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNyQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFhL0IsTUFBTSxPQUFPLFFBQVE7SUFYckI7UUFlbUIsZUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxvQkFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxQyxXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBZTFDO0lBYkMsZUFBZTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFeEYsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO2FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzNELFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDOztnRUFwQlUsUUFBUTsyREFBUixRQUFROzs7Ozs7UUN0Q3JCLDRCQUF3RDs7aUZEc0MzQyxRQUFRO2NBWHBCLFNBQVM7MkJBQ0Usd0JBQXdCLGNBQ3RCLElBQUksbUJBR0MsdUJBQXVCLENBQUMsTUFBTSxXQUN0QyxDQUFDLElBQUksQ0FBQyxpQkFHQSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUdaLElBQUk7a0JBQTVCLEtBQUs7bUJBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDO1lBQ2Msa0JBQWtCO2tCQUF0RCxTQUFTO21CQUFDLGdCQUFnQjs7a0ZBRmhCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIERlc3Ryb3lSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBpbmplY3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge2RlYm91bmNlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtUZXJtaW5hbEhhbmRsZXIsIFRlcm1pbmFsVHlwZX0gZnJvbSAnLi4vc2VydmljZXMvdGVybWluYWwtaGFuZGxlci5zZXJ2aWNlLmpzJztcbmltcG9ydCB7dGFrZVVudGlsRGVzdHJveWVkfSBmcm9tICdAYW5ndWxhci9jb3JlL3J4anMtaW50ZXJvcCc7XG5pbXBvcnQge1dJTkRPV30gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2luZGV4LmpzJztcbmltcG9ydCB7TmdJZn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7ZnJvbUV2ZW50fSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZG9jcy10dXRvcmlhbC10ZXJtaW5hbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlVXJsOiAnLi90ZXJtaW5hbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Rlcm1pbmFsLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBpbXBvcnRzOiBbTmdJZl0sXG4gIC8vIFZpZXdFbmNhcHN1bGF0aW9uIGlzIGRpc2FibGVkIHRvIGFsbG93IFh0ZXJtLmpzJ3Mgc3R5bGVzIHRvIGJlIGFwcGxpZWRcbiAgLy8gdG8gdGhlIHRlcm1pbmFsIGVsZW1lbnQuXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFRlcm1pbmFsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCh7cmVxdWlyZWQ6IHRydWV9KSB0eXBlITogVGVybWluYWxUeXBlO1xuICBAVmlld0NoaWxkKCd0ZXJtaW5hbE91dHB1dCcpIHByaXZhdGUgdGVybWluYWxFbGVtZW50UmVmITogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95UmVmID0gaW5qZWN0KERlc3Ryb3lSZWYpO1xuICBwcml2YXRlIHJlYWRvbmx5IHRlcm1pbmFsSGFuZGxlciA9IGluamVjdChUZXJtaW5hbEhhbmRsZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbmRvdyA9IGluamVjdChXSU5ET1cpO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnRlcm1pbmFsSGFuZGxlci5yZWdpc3RlclRlcm1pbmFsKHRoaXMudHlwZSwgdGhpcy50ZXJtaW5hbEVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICBmcm9tRXZlbnQodGhpcy53aW5kb3csICdyZXNpemUnKVxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDUwKSwgdGFrZVVudGlsRGVzdHJveWVkKHRoaXMuZGVzdHJveVJlZikpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXNpemUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVSZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy50ZXJtaW5hbEhhbmRsZXIucmVzaXplVG9GaXRQYXJlbnQodGhpcy50eXBlKTtcbiAgfVxufVxuIiwiPGRpdiAjdGVybWluYWxPdXRwdXQgY2xhc3M9XCJhZGV2LXRlcm1pbmFsLW91dHB1dFwiPjwvZGl2PlxuIl19