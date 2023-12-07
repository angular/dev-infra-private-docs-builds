/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, signal } from '@angular/core';
import { isFirefox, isIos } from '../../utils/index.js';
import { LoadingStep } from './node-runtime-sandbox.service.js';
import { OUT_OF_MEMORY_MSG } from './node-runtime-sandbox.service.js';
export const MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = 3;
export const WEBCONTAINERS_COUNTER_KEY = 'numberOfWebcontainers';
export var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["UNKNOWN"] = 0] = "UNKNOWN";
    ErrorType[ErrorType["COOKIES"] = 1] = "COOKIES";
    ErrorType[ErrorType["OUT_OF_MEMORY"] = 2] = "OUT_OF_MEMORY";
    ErrorType[ErrorType["UNSUPPORTED_BROWSER_ENVIRONMENT"] = 3] = "UNSUPPORTED_BROWSER_ENVIRONMENT";
})(ErrorType || (ErrorType = {}));
let NodeRuntimeState = class NodeRuntimeState {
    constructor() {
        this._loadingStep = signal(LoadingStep.NOT_STARTED);
        this.loadingStep = this._loadingStep.asReadonly();
        this._isResetting = signal(false);
        this.isResetting = this._isResetting.asReadonly();
        this._error = signal(undefined);
        this.error = this._error.asReadonly();
        this.checkUnsupportedEnvironment();
    }
    setLoadingStep(step) {
        this._loadingStep.set(step);
    }
    setIsResetting(isResetting) {
        this._isResetting.set(isResetting);
    }
    setError({ message, type }) {
        type ?? (type = this.getErrorType(message));
        this._error.set({ message, type });
        this.setLoadingStep(LoadingStep.ERROR);
    }
    getErrorType(message) {
        if (message?.includes(OUT_OF_MEMORY_MSG)) {
            return ErrorType.OUT_OF_MEMORY;
        }
        if (message?.toLowerCase().includes('service worker')) {
            return ErrorType.COOKIES;
        }
        return ErrorType.UNKNOWN;
    }
    /**
     * This method defines whether the current environment is compatible
     * with the NodeRuntimeSandbox. The embedded editor requires significant
     * CPU and memory resources and can not be ran in all browsers/devices. More
     * specifically, mobile devices are affected by this, so for the best user
     * experience (to avoid crashes), we disable the NodeRuntimeSandbox and
     * recommend using desktop.
     */
    checkUnsupportedEnvironment() {
        if (isIos || isFirefox) {
            this.setError({
                message: 'Unsupported environment',
                type: ErrorType.UNSUPPORTED_BROWSER_ENVIRONMENT,
            });
        }
    }
};
NodeRuntimeState = __decorate([
    Injectable({ providedIn: 'root' }),
    __metadata("design:paramtypes", [])
], NodeRuntimeState);
export { NodeRuntimeState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1ydW50aW1lLXN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9zZXJ2aWNlcy9ub2RlLXJ1bnRpbWUtc3RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRSxNQUFNLENBQUMsTUFBTSx1Q0FBdUMsR0FBRyxDQUFDLENBQUM7QUFDekQsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsdUJBQXVCLENBQUM7QUFPakUsTUFBTSxDQUFOLElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNuQiwrQ0FBTyxDQUFBO0lBQ1AsK0NBQU8sQ0FBQTtJQUNQLDJEQUFhLENBQUE7SUFDYiwrRkFBK0IsQ0FBQTtBQUNqQyxDQUFDLEVBTFcsU0FBUyxLQUFULFNBQVMsUUFLcEI7QUFHTSxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQVUzQjtRQVRpQixpQkFBWSxHQUFHLE1BQU0sQ0FBUyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEUsZ0JBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRTVCLGlCQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUU3QyxXQUFNLEdBQUcsTUFBTSxDQUErQixTQUFTLENBQUMsQ0FBQztRQUN6RCxVQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUd4QyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsY0FBYyxDQUFDLElBQWlCO1FBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxjQUFjLENBQUMsV0FBb0I7UUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFFBQVEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQW1CO1FBQ3hDLElBQUksS0FBSixJQUFJLEdBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTyxZQUFZLENBQUMsT0FBb0M7UUFDdkQsSUFBSSxPQUFPLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztZQUN6QyxPQUFPLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDakMsQ0FBQztRQUVELElBQUksT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7WUFDdEQsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQzNCLENBQUM7UUFFRCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSywyQkFBMkI7UUFDakMsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDWixPQUFPLEVBQUUseUJBQXlCO2dCQUNsQyxJQUFJLEVBQUUsU0FBUyxDQUFDLCtCQUErQjthQUNoRCxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF4RFksZ0JBQWdCO0lBRDVCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQzs7R0FDcEIsZ0JBQWdCLENBd0Q1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBzaWduYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc0ZpcmVmb3gsIGlzSW9zfSBmcm9tICcuLi8uLi91dGlscy9pbmRleC5qcyc7XG5cbmltcG9ydCB7TG9hZGluZ1N0ZXB9IGZyb20gJy4vbm9kZS1ydW50aW1lLXNhbmRib3guc2VydmljZS5qcyc7XG5pbXBvcnQge09VVF9PRl9NRU1PUllfTVNHfSBmcm9tICcuL25vZGUtcnVudGltZS1zYW5kYm94LnNlcnZpY2UuanMnO1xuXG5leHBvcnQgY29uc3QgTUFYX1JFQ09NTUVOREVEX1dFQkNPTlRBSU5FUlNfSU5TVEFOQ0VTID0gMztcbmV4cG9ydCBjb25zdCBXRUJDT05UQUlORVJTX0NPVU5URVJfS0VZID0gJ251bWJlck9mV2ViY29udGFpbmVycyc7XG5cbmV4cG9ydCB0eXBlIE5vZGVSdW50aW1lRXJyb3IgPSB7XG4gIG1lc3NhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgdHlwZTogRXJyb3JUeXBlIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGVudW0gRXJyb3JUeXBlIHtcbiAgVU5LTk9XTixcbiAgQ09PS0lFUyxcbiAgT1VUX09GX01FTU9SWSxcbiAgVU5TVVBQT1JURURfQlJPV1NFUl9FTlZJUk9OTUVOVCxcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgTm9kZVJ1bnRpbWVTdGF0ZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2xvYWRpbmdTdGVwID0gc2lnbmFsPG51bWJlcj4oTG9hZGluZ1N0ZXAuTk9UX1NUQVJURUQpO1xuICBsb2FkaW5nU3RlcCA9IHRoaXMuX2xvYWRpbmdTdGVwLmFzUmVhZG9ubHkoKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9pc1Jlc2V0dGluZyA9IHNpZ25hbChmYWxzZSk7XG4gIHJlYWRvbmx5IGlzUmVzZXR0aW5nID0gdGhpcy5faXNSZXNldHRpbmcuYXNSZWFkb25seSgpO1xuXG4gIHJlYWRvbmx5IF9lcnJvciA9IHNpZ25hbDxOb2RlUnVudGltZUVycm9yIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuICByZWFkb25seSBlcnJvciA9IHRoaXMuX2Vycm9yLmFzUmVhZG9ubHkoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNoZWNrVW5zdXBwb3J0ZWRFbnZpcm9ubWVudCgpO1xuICB9XG5cbiAgc2V0TG9hZGluZ1N0ZXAoc3RlcDogTG9hZGluZ1N0ZXApOiB2b2lkIHtcbiAgICB0aGlzLl9sb2FkaW5nU3RlcC5zZXQoc3RlcCk7XG4gIH1cblxuICBzZXRJc1Jlc2V0dGluZyhpc1Jlc2V0dGluZzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuX2lzUmVzZXR0aW5nLnNldChpc1Jlc2V0dGluZyk7XG4gIH1cblxuICBzZXRFcnJvcih7bWVzc2FnZSwgdHlwZX06IE5vZGVSdW50aW1lRXJyb3IpIHtcbiAgICB0eXBlID8/PSB0aGlzLmdldEVycm9yVHlwZShtZXNzYWdlKTtcbiAgICB0aGlzLl9lcnJvci5zZXQoe21lc3NhZ2UsIHR5cGV9KTtcbiAgICB0aGlzLnNldExvYWRpbmdTdGVwKExvYWRpbmdTdGVwLkVSUk9SKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RXJyb3JUeXBlKG1lc3NhZ2U6IE5vZGVSdW50aW1lRXJyb3JbJ21lc3NhZ2UnXSkge1xuICAgIGlmIChtZXNzYWdlPy5pbmNsdWRlcyhPVVRfT0ZfTUVNT1JZX01TRykpIHtcbiAgICAgIHJldHVybiBFcnJvclR5cGUuT1VUX09GX01FTU9SWTtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZT8udG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnc2VydmljZSB3b3JrZXInKSkge1xuICAgICAgcmV0dXJuIEVycm9yVHlwZS5DT09LSUVTO1xuICAgIH1cblxuICAgIHJldHVybiBFcnJvclR5cGUuVU5LTk9XTjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBkZWZpbmVzIHdoZXRoZXIgdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQgaXMgY29tcGF0aWJsZVxuICAgKiB3aXRoIHRoZSBOb2RlUnVudGltZVNhbmRib3guIFRoZSBlbWJlZGRlZCBlZGl0b3IgcmVxdWlyZXMgc2lnbmlmaWNhbnRcbiAgICogQ1BVIGFuZCBtZW1vcnkgcmVzb3VyY2VzIGFuZCBjYW4gbm90IGJlIHJhbiBpbiBhbGwgYnJvd3NlcnMvZGV2aWNlcy4gTW9yZVxuICAgKiBzcGVjaWZpY2FsbHksIG1vYmlsZSBkZXZpY2VzIGFyZSBhZmZlY3RlZCBieSB0aGlzLCBzbyBmb3IgdGhlIGJlc3QgdXNlclxuICAgKiBleHBlcmllbmNlICh0byBhdm9pZCBjcmFzaGVzKSwgd2UgZGlzYWJsZSB0aGUgTm9kZVJ1bnRpbWVTYW5kYm94IGFuZFxuICAgKiByZWNvbW1lbmQgdXNpbmcgZGVza3RvcC5cbiAgICovXG4gIHByaXZhdGUgY2hlY2tVbnN1cHBvcnRlZEVudmlyb25tZW50KCk6IHZvaWQge1xuICAgIGlmIChpc0lvcyB8fCBpc0ZpcmVmb3gpIHtcbiAgICAgIHRoaXMuc2V0RXJyb3Ioe1xuICAgICAgICBtZXNzYWdlOiAnVW5zdXBwb3J0ZWQgZW52aXJvbm1lbnQnLFxuICAgICAgICB0eXBlOiBFcnJvclR5cGUuVU5TVVBQT1JURURfQlJPV1NFUl9FTlZJUk9OTUVOVCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19