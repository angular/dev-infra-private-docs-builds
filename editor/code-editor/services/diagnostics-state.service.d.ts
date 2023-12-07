/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Diagnostic } from '@codemirror/lint';
export interface DiagnosticWithLocation extends Diagnostic {
    lineNumber: number;
    characterPosition: number;
}
export declare class DiagnosticsState {
    private readonly _diagnostics$;
    diagnostics$: import("rxjs").Observable<DiagnosticWithLocation[]>;
    setDiagnostics(diagnostics: DiagnosticWithLocation[]): void;
}
