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
import { Injectable, inject } from '@angular/core';
import { isMobile } from '../../utils/index';
import { LOCAL_STORAGE, WINDOW } from '../../providers/index';
import { MatSnackBar } from '@angular/material/snack-bar';
//import {ErrorSnackBar, ErrorSnackBarData} from '../core/services/errors-handling/error-snack-bar';
let ErrorSnackBar = {};
export const MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES = 3;
export const WEBCONTAINERS_COUNTER_KEY = 'numberOfWebcontainers';
export var AlertReason;
(function (AlertReason) {
    AlertReason[AlertReason["OUT_OF_MEMORY"] = 0] = "OUT_OF_MEMORY";
    AlertReason[AlertReason["MOBILE"] = 1] = "MOBILE";
})(AlertReason || (AlertReason = {}));
let AlertManager = class AlertManager {
    constructor() {
        this.localStorage = inject(LOCAL_STORAGE);
        this.window = inject(WINDOW);
        this.snackBar = inject(MatSnackBar);
        // Note: used as a property to allow changing in tests
        this.isMobile = isMobile;
    }
    init() {
        this.listenToLocalStorageValuesChange();
        this.increaseInstancesCounter();
        this.decreaseInstancesCounterOnPageClose();
        this.checkDevice();
    }
    listenToLocalStorageValuesChange() {
        this.window.addEventListener('storage', () => {
            const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances();
            this.validateRunningInstances(countOfRunningInstances);
        });
    }
    // Increase count of the running instances of the webcontainers when user will boot the webcontainer
    increaseInstancesCounter() {
        const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances() + 1;
        this.localStorage?.setItem(WEBCONTAINERS_COUNTER_KEY, countOfRunningInstances.toString());
        this.validateRunningInstances(countOfRunningInstances);
    }
    // Decrease count of running instances of the webcontainers when user close the app.
    decreaseInstancesCounterOnPageClose() {
        this.window.addEventListener('beforeunload', () => {
            const countOfRunningInstances = this.getStoredCountOfWebcontainerInstances() - 1;
            this.localStorage?.setItem(WEBCONTAINERS_COUNTER_KEY, countOfRunningInstances.toString());
            this.validateRunningInstances(countOfRunningInstances);
        });
    }
    getStoredCountOfWebcontainerInstances() {
        const countStoredInLocalStorage = this.localStorage?.getItem(WEBCONTAINERS_COUNTER_KEY);
        if (!countStoredInLocalStorage || Number.isNaN(countStoredInLocalStorage)) {
            return 0;
        }
        return Number(countStoredInLocalStorage);
    }
    validateRunningInstances(countOfRunningInstances) {
        if (countOfRunningInstances > MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES) {
            this.openSnackBar(AlertReason.OUT_OF_MEMORY);
        }
    }
    checkDevice() {
        if (this.isMobile) {
            this.openSnackBar(AlertReason.MOBILE);
        }
    }
    openSnackBar(reason) {
        let message = '';
        switch (reason) {
            case AlertReason.OUT_OF_MEMORY:
                message = `You currently have more than ${MAX_RECOMMENDED_WEBCONTAINERS_INSTANCES} tabs open running
      the Angular Tutorials or Playground, this may result in an Out of memory error.`;
                break;
            case AlertReason.MOBILE:
                message = `You are running the embedded editor in a mobile device, this may result in an Out of memory error.`;
                break;
        }
        this.snackBar.openFromComponent(ErrorSnackBar, {
            panelClass: 'adev-invert-mode',
            data: {
                message,
                actionText: 'I understand',
            }, //satisfies ErrorSnackBarData,
        });
    }
};
AlertManager = __decorate([
    Injectable({ providedIn: 'root' })
], AlertManager);
export { AlertManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3Ivc2VydmljZXMvYWxlcnQtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxvR0FBb0c7QUFDcEcsSUFBSSxhQUFhLEdBQVEsRUFBRSxDQUFDO0FBRTVCLE1BQU0sQ0FBQyxNQUFNLHVDQUF1QyxHQUFHLENBQUMsQ0FBQztBQUN6RCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyx1QkFBdUIsQ0FBQztBQUVqRSxNQUFNLENBQU4sSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLCtEQUFhLENBQUE7SUFDYixpREFBTSxDQUFBO0FBQ1IsQ0FBQyxFQUhXLFdBQVcsS0FBWCxXQUFXLFFBR3RCO0FBR00sSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtJQUFsQjtRQUNZLGlCQUFZLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsYUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoRCxzREFBc0Q7UUFDckMsYUFBUSxHQUFHLFFBQVEsQ0FBQztJQWdGdkMsQ0FBQztJQTlFQyxJQUFJO1FBQ0YsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7UUFFeEMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENB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Q29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGUsIGluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2lzTW9iaWxlfSBmcm9tICcuLi8uLi91dGlscy9pbmRleCc7XG5pbXBvcnQge0xPQ0FMX1NUT1JBR0UsIFdJTkRPV30gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2luZGV4JztcbmltcG9ydCB7TWF0U25hY2tCYXJ9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG4vL2ltcG9ydCB7RXJyb3JTbmFja0JhciwgRXJyb3JTbmFja0JhckRhdGF9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvZXJyb3JzLWhhbmRsaW5nL2Vycm9yLXNuYWNrLWJhcic7XG5sZXQgRXJyb3JTbmFja0JhcjogYW55ID0ge307XG5cbmV4cG9ydCBjb25zdCBNQVhfUkVDT01NRU5ERURfV0VCQ09OVEFJTkVSU19JTlNUQU5DRVMgPSAzO1xuZXhwb3J0IGNvbnN0IFdFQkNPTlRBSU5FUlNfQ09VTlRFUl9LRVkgPSAnbnVtYmVyT2ZXZWJjb250YWluZXJzJztcblxuZXhwb3J0IGVudW0gQWxlcnRSZWFzb24ge1xuICBPVVRfT0ZfTUVNT1JZLFxuICBNT0JJTEUsXG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFsZXJ0TWFuYWdlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgbG9jYWxTdG9yYWdlID0gaW5qZWN0KExPQ0FMX1NUT1JBR0UpO1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbmRvdyA9IGluamVjdChXSU5ET1cpO1xuICBwcml2YXRlIHJlYWRvbmx5IHNuYWNrQmFyID0gaW5qZWN0KE1hdFNuYWNrQmFyKTtcblxuICAvLyBOb3RlOiB1c2VkIGFzIGEgcHJvcGVydHkgdG8gYWxsb3cgY2hhbmdpbmcgaW4gdGVzdHNcbiAgcHJpdmF0ZSByZWFkb25seSBpc01vYmlsZSA9IGlzTW9iaWxlO1xuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5Ub0xvY2FsU3RvcmFnZVZhbHVlc0NoYW5nZSgpO1xuXG4gICAgdGhpcy5pbmNyZWFzZUluc3RhbmNlc0NvdW50ZXIoKTtcblxuICAgIHRoaXMuZGVjcmVhc2VJbnN0YW5jZXNDb3VudGVyT25QYWdlQ2xvc2UoKTtcblxuICAgIHRoaXMuY2hlY2tEZXZpY2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9Mb2NhbFN0b3JhZ2VWYWx1ZXNDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvdW50T2ZSdW5uaW5nSW5zdGFuY2VzID0gdGhpcy5nZXRTdG9yZWRDb3VudE9mV2ViY29udGFpbmVySW5zdGFuY2VzKCk7XG5cbiAgICAgIHRoaXMudmFsaWRhdGVSdW5uaW5nSW5zdGFuY2VzKGNvdW50T2ZSdW5uaW5nSW5zdGFuY2VzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEluY3JlYXNlIGNvdW50IG9mIHRoZSBydW5uaW5nIGluc3RhbmNlcyBvZiB0aGUgd2ViY29udGFpbmVycyB3aGVuIHVzZXIgd2lsbCBib290IHRoZSB3ZWJjb250YWluZXJcbiAgcHJpdmF0ZSBpbmNyZWFzZUluc3RhbmNlc0NvdW50ZXIoKTogdm9pZCB7XG4gICAgY29uc3QgY291bnRPZlJ1bm5pbmdJbnN0YW5jZXMgPSB0aGlzLmdldFN0b3JlZENvdW50T2ZXZWJjb250YWluZXJJbnN0YW5jZXMoKSArIDE7XG5cbiAgICB0aGlzLmxvY2FsU3RvcmFnZT8uc2V0SXRlbShXRUJDT05UQUlORVJTX0NPVU5URVJfS0VZLCBjb3VudE9mUnVubmluZ0luc3RhbmNlcy50b1N0cmluZygpKTtcbiAgICB0aGlzLnZhbGlkYXRlUnVubmluZ0luc3RhbmNlcyhjb3VudE9mUnVubmluZ0luc3RhbmNlcyk7XG4gIH1cblxuICAvLyBEZWNyZWFzZSBjb3VudCBvZiBydW5uaW5nIGluc3RhbmNlcyBvZiB0aGUgd2ViY29udGFpbmVycyB3aGVuIHVzZXIgY2xvc2UgdGhlIGFwcC5cbiAgcHJpdmF0ZSBkZWNyZWFzZUluc3RhbmNlc0NvdW50ZXJPblBhZ2VDbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb3VudE9mUnVubmluZ0luc3RhbmNlcyA9IHRoaXMuZ2V0U3RvcmVkQ291bnRPZldlYmNvbnRhaW5lckluc3RhbmNlcygpIC0gMTtcblxuICAgICAgdGhpcy5sb2NhbFN0b3JhZ2U/LnNldEl0ZW0oV0VCQ09OVEFJTkVSU19DT1VOVEVSX0tFWSwgY291bnRPZlJ1bm5pbmdJbnN0YW5jZXMudG9TdHJpbmcoKSk7XG4gICAgICB0aGlzLnZhbGlkYXRlUnVubmluZ0luc3RhbmNlcyhjb3VudE9mUnVubmluZ0luc3RhbmNlcyk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFN0b3JlZENvdW50T2ZXZWJjb250YWluZXJJbnN0YW5jZXMoKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb3VudFN0b3JlZEluTG9jYWxTdG9yYWdlID0gdGhpcy5sb2NhbFN0b3JhZ2U/LmdldEl0ZW0oV0VCQ09OVEFJTkVSU19DT1VOVEVSX0tFWSk7XG5cbiAgICBpZiAoIWNvdW50U3RvcmVkSW5Mb2NhbFN0b3JhZ2UgfHwgTnVtYmVyLmlzTmFOKGNvdW50U3RvcmVkSW5Mb2NhbFN0b3JhZ2UpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gTnVtYmVyKGNvdW50U3RvcmVkSW5Mb2NhbFN0b3JhZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZVJ1bm5pbmdJbnN0YW5jZXMoY291bnRPZlJ1bm5pbmdJbnN0YW5jZXM6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChjb3VudE9mUnVubmluZ0luc3RhbmNlcyA+IE1BWF9SRUNPTU1FTkRFRF9XRUJDT05UQUlORVJTX0lOU1RBTkNFUykge1xuICAgICAgdGhpcy5vcGVuU25hY2tCYXIoQWxlcnRSZWFzb24uT1VUX09GX01FTU9SWSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0RldmljZSgpIHtcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xuICAgICAgdGhpcy5vcGVuU25hY2tCYXIoQWxlcnRSZWFzb24uTU9CSUxFKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9wZW5TbmFja0JhcihyZWFzb246IEFsZXJ0UmVhc29uKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgICBzd2l0Y2ggKHJlYXNvbikge1xuICAgICAgY2FzZSBBbGVydFJlYXNvbi5PVVRfT0ZfTUVNT1JZOlxuICAgICAgICBtZXNzYWdlID0gYFlvdSBjdXJyZW50bHkgaGF2ZSBtb3JlIHRoYW4gJHtNQVhfUkVDT01NRU5ERURfV0VCQ09OVEFJTkVSU19JTlNUQU5DRVN9IHRhYnMgb3BlbiBydW5uaW5nXG4gICAgICB0aGUgQW5ndWxhciBUdXRvcmlhbHMgb3IgUGxheWdyb3VuZCwgdGhpcyBtYXkgcmVzdWx0IGluIGFuIE91dCBvZiBtZW1vcnkgZXJyb3IuYDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFsZXJ0UmVhc29uLk1PQklMRTpcbiAgICAgICAgbWVzc2FnZSA9IGBZb3UgYXJlIHJ1bm5pbmcgdGhlIGVtYmVkZGVkIGVkaXRvciBpbiBhIG1vYmlsZSBkZXZpY2UsIHRoaXMgbWF5IHJlc3VsdCBpbiBhbiBPdXQgb2YgbWVtb3J5IGVycm9yLmA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuc25hY2tCYXIub3BlbkZyb21Db21wb25lbnQoRXJyb3JTbmFja0Jhciwge1xuICAgICAgcGFuZWxDbGFzczogJ2FkZXYtaW52ZXJ0LW1vZGUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBhY3Rpb25UZXh0OiAnSSB1bmRlcnN0YW5kJyxcbiAgICAgIH0sIC8vc2F0aXNmaWVzIEVycm9yU25hY2tCYXJEYXRhLFxuICAgIH0pO1xuICB9XG59XG4iXX0=