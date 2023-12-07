/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export interface EditorUiStateConfig {
    displayOnlyInteractiveTerminal: boolean;
}
export declare const DEFAULT_EDITOR_UI_STATE: EditorUiStateConfig;
export declare class EditorUiState {
    private readonly embeddedTutorialManager;
    private readonly destroyRef;
    private readonly stateChanged;
    stateChanged$: import("rxjs").Observable<void>;
    uiState: import("@angular/core").WritableSignal<EditorUiStateConfig>;
    constructor();
    patchState(patch: Partial<EditorUiStateConfig>): void;
    private handleTutorialChange;
}
