/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Signal } from '@angular/core';
import { EditorFile } from '../interfaces/editor-file.js';
import { ActionMessage } from '../workers/interfaces/message.js';
import { DiagnosticsRequest } from '../workers/interfaces/diagnostics-request.js';
import { Subject } from 'rxjs';
import { DiagnosticsState } from '../services/diagnostics-state.service.js';
export declare const getDiagnosticsExtension: (eventManager: Subject<ActionMessage>, currentFile: Signal<EditorFile>, sendRequestToTsVfs: (request: ActionMessage<DiagnosticsRequest>) => void, diagnosticsState: DiagnosticsState) => import("@codemirror/state/dist/index.js").Extension;
