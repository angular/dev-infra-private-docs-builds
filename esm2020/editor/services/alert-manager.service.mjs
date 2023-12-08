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
        if (isMobile) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3Ivc2VydmljZXMvYWxlcnQtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxvR0FBb0c7QUFDcEcsSUFBSSxhQUFhLEdBQVEsRUFBRSxDQUFDO0FBRTVCLE1BQU0sQ0FBQyxNQUFNLHVDQUF1QyxHQUFHLENBQUMsQ0FBQztBQUN6RCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyx1QkFBdUIsQ0FBQztBQUVqRSxNQUFNLENBQU4sSUFBWSxXQUdYO0FBSEQsV0FBWSxXQUFXO0lBQ3JCLCtEQUFhLENBQUE7SUFDYixpREFBTSxDQUFBO0FBQ1IsQ0FBQyxFQUhXLFdBQVcsS0FBWCxXQUFXLFFBR3RCO0FBR00sSUFBTSxZQUFZLEdBQWxCLE1BQU0sWUFBWTtJQUFsQjtRQUNZLGlCQUFZLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JDLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsYUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQWdGekMsQ0FBQztJQTlFQyxJQUFJO1FBQ0YsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7UUFFeEMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLENBQUM7UUFFM0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxnQ0FBZ0M7UUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQzNDLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxDQUFDLHFDQUFxQyxFQUFFLENBQUM7WUFFN0UsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0dBQW9HO0lBQzVGLHdCQUF3QjtRQUM5QixNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVqRixJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxvRkFBb0Y7SUFDNUUsbUNBQW1DO1FBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRTtZQUNoRCxNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVqRixJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzFGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHFDQUFxQztRQUMzQyxNQUFNLHlCQUF5QixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFeEYsSUFBSSxDQUFDLHlCQUF5QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsRUFBRSxDQUFDO1lBQzFFLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUVELE9BQU8sTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLHdCQUF3QixDQUFDLHVCQUErQjtRQUM5RCxJQUFJLHVCQUF1QixHQUFHLHVDQUF1QyxFQUFFLENBQUM7WUFDdEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FBQyxNQUFtQjtRQUN0QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDakIsUUFBUSxNQUFNLEVBQUUsQ0FBQztZQUNmLEtBQUssV0FBVyxDQUFDLGFBQWE7Z0JBQzVCLE9BQU8sR0FBRyxnQ0FBZ0MsdUNBQXVDO3NGQUNILENBQUM7Z0JBQy9FLE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxNQUFNO2dCQUNyQixPQUFPLEdBQUcsb0dBQW9HLENBQUM7Z0JBQy9HLE1BQU07UUFDVixDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUU7WUFDN0MsVUFBVSxFQUFFLGtCQUFrQjtZQUM5QixJQUFJLEVBQUU7Z0JBQ0osT0FBTztnQkFDUCxVQUFVLEVBQUUsY0FBYzthQUMzQixFQUFFLDhCQUE4QjtTQUNsQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQW5GWSxZQUFZO0lBRHhCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztHQUNwQixZQUFZLENBbUZ4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBpbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtpc01vYmlsZX0gZnJvbSAnLi4vLi4vdXRpbHMvaW5kZXgnO1xuaW1wb3J0IHtMT0NBTF9TVE9SQUdFLCBXSU5ET1d9IGZyb20gJy4uLy4uL3Byb3ZpZGVycy9pbmRleCc7XG5pbXBvcnQge01hdFNuYWNrQmFyfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuLy9pbXBvcnQge0Vycm9yU25hY2tCYXIsIEVycm9yU25hY2tCYXJEYXRhfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL2Vycm9ycy1oYW5kbGluZy9lcnJvci1zbmFjay1iYXInO1xubGV0IEVycm9yU25hY2tCYXI6IGFueSA9IHt9O1xuXG5leHBvcnQgY29uc3QgTUFYX1JFQ09NTUVOREVEX1dFQkNPTlRBSU5FUlNfSU5TVEFOQ0VTID0gMztcbmV4cG9ydCBjb25zdCBXRUJDT05UQUlORVJTX0NPVU5URVJfS0VZID0gJ251bWJlck9mV2ViY29udGFpbmVycyc7XG5cbmV4cG9ydCBlbnVtIEFsZXJ0UmVhc29uIHtcbiAgT1VUX09GX01FTU9SWSxcbiAgTU9CSUxFLFxufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBbGVydE1hbmFnZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IGxvY2FsU3RvcmFnZSA9IGluamVjdChMT0NBTF9TVE9SQUdFKTtcbiAgcHJpdmF0ZSByZWFkb25seSB3aW5kb3cgPSBpbmplY3QoV0lORE9XKTtcbiAgcHJpdmF0ZSBzbmFja0JhciA9IGluamVjdChNYXRTbmFja0Jhcik7XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RlblRvTG9jYWxTdG9yYWdlVmFsdWVzQ2hhbmdlKCk7XG5cbiAgICB0aGlzLmluY3JlYXNlSW5zdGFuY2VzQ291bnRlcigpO1xuXG4gICAgdGhpcy5kZWNyZWFzZUluc3RhbmNlc0NvdW50ZXJPblBhZ2VDbG9zZSgpO1xuXG4gICAgdGhpcy5jaGVja0RldmljZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Ub0xvY2FsU3RvcmFnZVZhbHVlc0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgY291bnRPZlJ1bm5pbmdJbnN0YW5jZXMgPSB0aGlzLmdldFN0b3JlZENvdW50T2ZXZWJjb250YWluZXJJbnN0YW5jZXMoKTtcblxuICAgICAgdGhpcy52YWxpZGF0ZVJ1bm5pbmdJbnN0YW5jZXMoY291bnRPZlJ1bm5pbmdJbnN0YW5jZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSW5jcmVhc2UgY291bnQgb2YgdGhlIHJ1bm5pbmcgaW5zdGFuY2VzIG9mIHRoZSB3ZWJjb250YWluZXJzIHdoZW4gdXNlciB3aWxsIGJvb3QgdGhlIHdlYmNvbnRhaW5lclxuICBwcml2YXRlIGluY3JlYXNlSW5zdGFuY2VzQ291bnRlcigpOiB2b2lkIHtcbiAgICBjb25zdCBjb3VudE9mUnVubmluZ0luc3RhbmNlcyA9IHRoaXMuZ2V0U3RvcmVkQ291bnRPZldlYmNvbnRhaW5lckluc3RhbmNlcygpICsgMTtcblxuICAgIHRoaXMubG9jYWxTdG9yYWdlPy5zZXRJdGVtKFdFQkNPTlRBSU5FUlNfQ09VTlRFUl9LRVksIGNvdW50T2ZSdW5uaW5nSW5zdGFuY2VzLnRvU3RyaW5nKCkpO1xuICAgIHRoaXMudmFsaWRhdGVSdW5uaW5nSW5zdGFuY2VzKGNvdW50T2ZSdW5uaW5nSW5zdGFuY2VzKTtcbiAgfVxuXG4gIC8vIERlY3JlYXNlIGNvdW50IG9mIHJ1bm5pbmcgaW5zdGFuY2VzIG9mIHRoZSB3ZWJjb250YWluZXJzIHdoZW4gdXNlciBjbG9zZSB0aGUgYXBwLlxuICBwcml2YXRlIGRlY3JlYXNlSW5zdGFuY2VzQ291bnRlck9uUGFnZUNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvdW50T2ZSdW5uaW5nSW5zdGFuY2VzID0gdGhpcy5nZXRTdG9yZWRDb3VudE9mV2ViY29udGFpbmVySW5zdGFuY2VzKCkgLSAxO1xuXG4gICAgICB0aGlzLmxvY2FsU3RvcmFnZT8uc2V0SXRlbShXRUJDT05UQUlORVJTX0NPVU5URVJfS0VZLCBjb3VudE9mUnVubmluZ0luc3RhbmNlcy50b1N0cmluZygpKTtcbiAgICAgIHRoaXMudmFsaWRhdGVSdW5uaW5nSW5zdGFuY2VzKGNvdW50T2ZSdW5uaW5nSW5zdGFuY2VzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3RvcmVkQ291bnRPZldlYmNvbnRhaW5lckluc3RhbmNlcygpOiBudW1iZXIge1xuICAgIGNvbnN0IGNvdW50U3RvcmVkSW5Mb2NhbFN0b3JhZ2UgPSB0aGlzLmxvY2FsU3RvcmFnZT8uZ2V0SXRlbShXRUJDT05UQUlORVJTX0NPVU5URVJfS0VZKTtcblxuICAgIGlmICghY291bnRTdG9yZWRJbkxvY2FsU3RvcmFnZSB8fCBOdW1iZXIuaXNOYU4oY291bnRTdG9yZWRJbkxvY2FsU3RvcmFnZSkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIHJldHVybiBOdW1iZXIoY291bnRTdG9yZWRJbkxvY2FsU3RvcmFnZSk7XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlUnVubmluZ0luc3RhbmNlcyhjb3VudE9mUnVubmluZ0luc3RhbmNlczogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGNvdW50T2ZSdW5uaW5nSW5zdGFuY2VzID4gTUFYX1JFQ09NTUVOREVEX1dFQkNPTlRBSU5FUlNfSU5TVEFOQ0VTKSB7XG4gICAgICB0aGlzLm9wZW5TbmFja0JhcihBbGVydFJlYXNvbi5PVVRfT0ZfTUVNT1JZKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoZWNrRGV2aWNlKCkge1xuICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgdGhpcy5vcGVuU25hY2tCYXIoQWxlcnRSZWFzb24uTU9CSUxFKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9wZW5TbmFja0JhcihyZWFzb246IEFsZXJ0UmVhc29uKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSAnJztcbiAgICBzd2l0Y2ggKHJlYXNvbikge1xuICAgICAgY2FzZSBBbGVydFJlYXNvbi5PVVRfT0ZfTUVNT1JZOlxuICAgICAgICBtZXNzYWdlID0gYFlvdSBjdXJyZW50bHkgaGF2ZSBtb3JlIHRoYW4gJHtNQVhfUkVDT01NRU5ERURfV0VCQ09OVEFJTkVSU19JTlNUQU5DRVN9IHRhYnMgb3BlbiBydW5uaW5nXG4gICAgICB0aGUgQW5ndWxhciBUdXRvcmlhbHMgb3IgUGxheWdyb3VuZCwgdGhpcyBtYXkgcmVzdWx0IGluIGFuIE91dCBvZiBtZW1vcnkgZXJyb3IuYDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEFsZXJ0UmVhc29uLk1PQklMRTpcbiAgICAgICAgbWVzc2FnZSA9IGBZb3UgYXJlIHJ1bm5pbmcgdGhlIGVtYmVkZGVkIGVkaXRvciBpbiBhIG1vYmlsZSBkZXZpY2UsIHRoaXMgbWF5IHJlc3VsdCBpbiBhbiBPdXQgb2YgbWVtb3J5IGVycm9yLmA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuc25hY2tCYXIub3BlbkZyb21Db21wb25lbnQoRXJyb3JTbmFja0Jhciwge1xuICAgICAgcGFuZWxDbGFzczogJ2FkZXYtaW52ZXJ0LW1vZGUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBhY3Rpb25UZXh0OiAnSSB1bmRlcnN0YW5kJyxcbiAgICAgIH0sIC8vc2F0aXNmaWVzIEVycm9yU25hY2tCYXJEYXRhLFxuICAgIH0pO1xuICB9XG59XG4iXX0=