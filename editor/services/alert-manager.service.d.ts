/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export declare const MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = 3;
export declare const WEBCONTAINERS_COUNTER_KEY = "numberOfWebcontainers";
export declare enum AlertReason {
    OUT_OF_MEMORY = 0,
    MOBILE = 1
}
export declare class AlertManager {
    private readonly localStorage;
    private readonly window;
    private snackBar;
    init(): void;
    private listenToLocalStorageValuesChange;
    private increaseInstancesCounter;
    private decreaseInstancesCounterOnPageClose;
    private getStoredCountOfWebcontainerInstances;
    private validateRunningInstances;
    private checkDevice;
    private openSnackBar;
}
