/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { LoadingStep } from './node-runtime-sandbox.service.js';
export declare const MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = 3;
export declare const WEBCONTAINERS_COUNTER_KEY = "numberOfWebcontainers";
export type NodeRuntimeError = {
    message: string | undefined;
    type: ErrorType | undefined;
};
export declare enum ErrorType {
    UNKNOWN = 0,
    COOKIES = 1,
    OUT_OF_MEMORY = 2,
    UNSUPPORTED_BROWSER_ENVIRONMENT = 3
}
export declare class NodeRuntimeState {
    private readonly _loadingStep;
    loadingStep: import("@angular/core").Signal<number>;
    private readonly _isResetting;
    readonly isResetting: import("@angular/core").Signal<boolean>;
    readonly _error: import("@angular/core").WritableSignal<NodeRuntimeError | undefined>;
    readonly error: import("@angular/core").Signal<NodeRuntimeError | undefined>;
    constructor();
    setLoadingStep(step: LoadingStep): void;
    setIsResetting(isResetting: boolean): void;
    setError({ message, type }: NodeRuntimeError): void;
    private getErrorType;
    /**
     * This method defines whether the current environment is compatible
     * with the NodeRuntimeSandbox. The embedded editor requires significant
     * CPU and memory resources and can not be ran in all browsers/devices. More
     * specifically, mobile devices are affected by this, so for the best user
     * experience (to avoid crashes), we disable the NodeRuntimeSandbox and
     * recommend using desktop.
     */
    private checkUnsupportedEnvironment;
}
