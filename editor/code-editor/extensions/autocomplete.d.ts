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
import { AutocompleteRequest } from '../workers/interfaces/autocomplete-request.js';
import { ActionMessage } from '../workers/interfaces/message.js';
export declare const getAutocompleteExtension: (emitter: Subject<ActionMessage>, currentFile: Signal<EditorFile>, sendRequestToTsVfs: (request: ActionMessage<AutocompleteRequest>) => void) => import("@codemirror/state").Extension;
