/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { InteractiveTerminal } from './interactive-terminal';
export var TerminalType;
(function (TerminalType) {
    TerminalType[TerminalType["READONLY"] = 0] = "READONLY";
    TerminalType[TerminalType["INTERACTIVE"] = 1] = "INTERACTIVE";
})(TerminalType || (TerminalType = {}));
let TerminalHandler = class TerminalHandler {
    constructor() {
        this.terminals = {
            // Passing a theme with CSS custom properties colors does not work
            // Because colors are parsed
            // See https://github.com/xtermjs/xterm.js/blob/854e2736f66ca3e5d3ab5a7b65bf3fd6fba8b707/src/browser/services/ThemeService.ts#L125
            [TerminalType.READONLY]: {
                instance: new Terminal({ convertEol: true, disableStdin: true }),
                fitAddon: new FitAddon(),
            },
            [TerminalType.INTERACTIVE]: {
                instance: new InteractiveTerminal(),
                fitAddon: new FitAddon(),
            },
        };
    }
    get readonlyTerminalInstance() {
        return this.terminals[TerminalType.READONLY].instance;
    }
    get interactiveTerminalInstance() {
        return this.terminals[TerminalType.INTERACTIVE].instance;
    }
    registerTerminal(type, element) {
        const terminal = this.terminals[type];
        this.mapTerminalToElement(terminal.instance, terminal.fitAddon, element);
    }
    resizeToFitParent(type) {
        this.terminals[type]?.fitAddon.fit();
    }
    clearTerminals() {
        this.terminals[TerminalType.READONLY].instance.clear();
        this.terminals[TerminalType.INTERACTIVE].instance.clear();
    }
    mapTerminalToElement(terminal, fitAddon, element) {
        terminal.open(element);
        fitAddon.fit();
    }
};
TerminalHandler = __decorate([
    Injectable({ providedIn: 'root' })
], TerminalHandler);
export { TerminalHandler };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwtaGFuZGxlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3Ivc2VydmljZXMvdGVybWluYWwtaGFuZGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFFM0QsTUFBTSxDQUFOLElBQVksWUFHWDtBQUhELFdBQVksWUFBWTtJQUN0Qix1REFBUSxDQUFBO0lBQ1IsNkRBQVcsQ0FBQTtBQUNiLENBQUMsRUFIVyxZQUFZLEtBQVosWUFBWSxRQUd2QjtBQUdNLElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7SUFBckI7UUFDRyxjQUFTLEdBQUc7WUFDbEIsa0VBQWtFO1lBQ2xFLDRCQUE0QjtZQUM1QixrSUFBa0k7WUFDbEksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZCLFFBQVEsRUFBRSxJQUFJLFFBQVEsQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBQyxDQUFDO2dCQUM5RCxRQUFRLEVBQUUsSUFBSSxRQUFRLEVBQUU7YUFDekI7WUFDRCxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDMUIsUUFBUSxFQUFFLElBQUksbUJBQW1CLEVBQUU7Z0JBQ25DLFFBQVEsRUFBRSxJQUFJLFFBQVEsRUFBRTthQUN6QjtTQUNPLENBQUM7SUE0QmIsQ0FBQztJQTFCQyxJQUFJLHdCQUF3QjtRQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN4RCxDQUFDO0lBRUQsSUFBSSwyQkFBMkI7UUFDN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDM0QsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQWtCLEVBQUUsT0FBb0I7UUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxJQUFrQjtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVPLG9CQUFvQixDQUFDLFFBQWtCLEVBQUUsUUFBa0IsRUFBRSxPQUFvQjtRQUN2RixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0NBQ0YsQ0FBQTtBQXpDWSxlQUFlO0lBRDNCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztHQUNwQixlQUFlLENBeUMzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VGVybWluYWx9IGZyb20gJ3h0ZXJtJztcbmltcG9ydCB7Rml0QWRkb259IGZyb20gJ3h0ZXJtLWFkZG9uLWZpdCc7XG5pbXBvcnQge0ludGVyYWN0aXZlVGVybWluYWx9IGZyb20gJy4vaW50ZXJhY3RpdmUtdGVybWluYWwnO1xuXG5leHBvcnQgZW51bSBUZXJtaW5hbFR5cGUge1xuICBSRUFET05MWSxcbiAgSU5URVJBQ1RJVkUsXG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIFRlcm1pbmFsSGFuZGxlciB7XG4gIHByaXZhdGUgdGVybWluYWxzID0ge1xuICAgIC8vIFBhc3NpbmcgYSB0aGVtZSB3aXRoIENTUyBjdXN0b20gcHJvcGVydGllcyBjb2xvcnMgZG9lcyBub3Qgd29ya1xuICAgIC8vIEJlY2F1c2UgY29sb3JzIGFyZSBwYXJzZWRcbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3h0ZXJtanMveHRlcm0uanMvYmxvYi84NTRlMjczNmY2NmNhM2U1ZDNhYjVhN2I2NWJmM2ZkNmZiYThiNzA3L3NyYy9icm93c2VyL3NlcnZpY2VzL1RoZW1lU2VydmljZS50cyNMMTI1XG4gICAgW1Rlcm1pbmFsVHlwZS5SRUFET05MWV06IHtcbiAgICAgIGluc3RhbmNlOiBuZXcgVGVybWluYWwoe2NvbnZlcnRFb2w6IHRydWUsIGRpc2FibGVTdGRpbjogdHJ1ZX0pLFxuICAgICAgZml0QWRkb246IG5ldyBGaXRBZGRvbigpLFxuICAgIH0sXG4gICAgW1Rlcm1pbmFsVHlwZS5JTlRFUkFDVElWRV06IHtcbiAgICAgIGluc3RhbmNlOiBuZXcgSW50ZXJhY3RpdmVUZXJtaW5hbCgpLFxuICAgICAgZml0QWRkb246IG5ldyBGaXRBZGRvbigpLFxuICAgIH0sXG4gIH0gYXMgY29uc3Q7XG5cbiAgZ2V0IHJlYWRvbmx5VGVybWluYWxJbnN0YW5jZSgpOiBUZXJtaW5hbCB7XG4gICAgcmV0dXJuIHRoaXMudGVybWluYWxzW1Rlcm1pbmFsVHlwZS5SRUFET05MWV0uaW5zdGFuY2U7XG4gIH1cblxuICBnZXQgaW50ZXJhY3RpdmVUZXJtaW5hbEluc3RhbmNlKCk6IEludGVyYWN0aXZlVGVybWluYWwge1xuICAgIHJldHVybiB0aGlzLnRlcm1pbmFsc1tUZXJtaW5hbFR5cGUuSU5URVJBQ1RJVkVdLmluc3RhbmNlO1xuICB9XG5cbiAgcmVnaXN0ZXJUZXJtaW5hbCh0eXBlOiBUZXJtaW5hbFR5cGUsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgdGVybWluYWwgPSB0aGlzLnRlcm1pbmFsc1t0eXBlXTtcbiAgICB0aGlzLm1hcFRlcm1pbmFsVG9FbGVtZW50KHRlcm1pbmFsLmluc3RhbmNlLCB0ZXJtaW5hbC5maXRBZGRvbiwgZWxlbWVudCk7XG4gIH1cblxuICByZXNpemVUb0ZpdFBhcmVudCh0eXBlOiBUZXJtaW5hbFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnRlcm1pbmFsc1t0eXBlXT8uZml0QWRkb24uZml0KCk7XG4gIH1cblxuICBjbGVhclRlcm1pbmFscygpIHtcbiAgICB0aGlzLnRlcm1pbmFsc1tUZXJtaW5hbFR5cGUuUkVBRE9OTFldLmluc3RhbmNlLmNsZWFyKCk7XG4gICAgdGhpcy50ZXJtaW5hbHNbVGVybWluYWxUeXBlLklOVEVSQUNUSVZFXS5pbnN0YW5jZS5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXBUZXJtaW5hbFRvRWxlbWVudCh0ZXJtaW5hbDogVGVybWluYWwsIGZpdEFkZG9uOiBGaXRBZGRvbiwgZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICB0ZXJtaW5hbC5vcGVuKGVsZW1lbnQpO1xuICAgIGZpdEFkZG9uLmZpdCgpO1xuICB9XG59XG4iXX0=