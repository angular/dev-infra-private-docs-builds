/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { AfterViewInit } from '@angular/core';
import { TerminalType } from '../services/terminal-handler.service.js';
import * as i0 from "@angular/core";
export declare class Terminal implements AfterViewInit {
    type: TerminalType;
    private terminalElementRef;
    private readonly destroyRef;
    private readonly terminalHandler;
    private readonly window;
    ngAfterViewInit(): void;
    private handleResize;
    static ɵfac: i0.ɵɵFactoryDeclaration<Terminal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Terminal, "docs-tutorial-terminal", never, { "type": { "alias": "type"; "required": true; }; }, {}, never, never, true, never>;
}
