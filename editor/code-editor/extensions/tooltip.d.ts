/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Signal } from '@angular/core';
import { Subject } from 'rxjs';
import { EditorFile } from '../interfaces/editor-file.js';
import { DisplayTooltipRequest } from '../workers/interfaces/display-tooltip-request.js';
import { DisplayTooltipResponse } from '../workers/interfaces/display-tooltip-response.js';
import { ActionMessage } from '../workers/interfaces/message.js';
export declare const getTooltipExtension: (emitter: Subject<ActionMessage<DisplayTooltipResponse>>, currentFile: Signal<EditorFile>, sendRequestToTsVfs: (request: ActionMessage<DisplayTooltipRequest>) => void) => import("@codemirror/state/dist/index.js").Extension;
