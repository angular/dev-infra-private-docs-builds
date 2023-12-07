/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
/// <reference types="xterm/typings/xterm.js" />
import { Terminal } from 'xterm';
export declare const NOT_VALID_COMMAND_MSG = "Angular Documentation - Not allowed command!";
export declare const ALLOWED_KEYS: Array<KeyboardEvent['key']>;
export declare class InteractiveTerminal extends Terminal {
    private readonly window;
    private readonly commandValidator;
    private readonly breakProcess;
    breakProcess$: import("rxjs").Observable<void>;
    constructor();
    breakCurrentProcess(): void;
    private handleCommandExecution;
}
