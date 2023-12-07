/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="xterm/typings/xterm.js" />
import { Terminal } from 'xterm';
import { InteractiveTerminal } from './interactive-terminal.js';
export declare enum TerminalType {
    READONLY = 0,
    INTERACTIVE = 1
}
export declare class TerminalHandler {
    private terminals;
    get readonlyTerminalInstance(): Terminal;
    get interactiveTerminalInstance(): InteractiveTerminal;
    registerTerminal(type: TerminalType, element: HTMLElement): void;
    resizeToFitParent(type: TerminalType): void;
    clearTerminals(): void;
    private mapTerminalToElement;
}
