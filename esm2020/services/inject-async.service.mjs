/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { DestroyRef, ENVIRONMENT_INITIALIZER, EnvironmentInjector, Injectable, createEnvironmentInjector, inject, } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Convience method for lazy loading an injection token.
 */
export async function injectAsync(injector, providerLoader) {
    const injectImpl = injector.get(InjectAsyncImpl);
    return injectImpl.get(injector, providerLoader);
}
class InjectAsyncImpl {
    constructor() {
        this.overrides = new WeakMap(); // no need to cleanup
    }
    override(type, mock) {
        this.overrides.set(type, mock);
    }
    async get(injector, providerLoader) {
        const type = await providerLoader();
        // Check if we have overrides, O(1), low overhead
        if (this.overrides.has(type)) {
            const override = this.overrides.get(type);
            return new override();
        }
        if (!(injector instanceof EnvironmentInjector)) {
            // this is the DestroyRef of the component
            const destroyRef = injector.get(DestroyRef);
            // This is the parent injector of the injector we're creating
            const environmentInjector = injector.get(EnvironmentInjector);
            // Creating an environment injector to destroy it afterwards
            const newInjector = createEnvironmentInjector([type], environmentInjector);
            // Destroy the injector to trigger DestroyRef.onDestroy on our service
            destroyRef.onDestroy(() => {
                newInjector.destroy();
            });
            // We want to create the new instance of our service with our new injector
            injector = newInjector;
        }
        return injector.get(type);
    }
}
InjectAsyncImpl.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: InjectAsyncImpl, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
InjectAsyncImpl.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: InjectAsyncImpl, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0-next.2", ngImport: i0, type: InjectAsyncImpl, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
/**
 * Helper function to mock the lazy loaded module in `injectAsync`
 *
 * @usage
 * TestBed.configureTestingModule({
 *     providers: [
 *     mockAsyncProvider(SandboxService, fakeSandboxService)
 *   ]
 * });
 */
export function mockAsyncProvider(type, mock) {
    return [
        {
            provide: ENVIRONMENT_INITIALIZER,
            multi: true,
            useValue: () => {
                inject(InjectAsyncImpl).override(type, mock);
            },
        },
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LWFzeW5jLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9kb2NzL3NlcnZpY2VzL2luamVjdC1hc3luYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxVQUFVLEVBQ1YsdUJBQXVCLEVBQ3ZCLG1CQUFtQixFQUNuQixVQUFVLEVBS1YseUJBQXlCLEVBQ3pCLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQzs7QUFFdkI7O0dBRUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLFdBQVcsQ0FDL0IsUUFBa0IsRUFDbEIsY0FBK0M7SUFFL0MsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqRCxPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxNQUNNLGVBQWU7SUFEckI7UUFFVSxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjtLQW1DekQ7SUFsQ0MsUUFBUSxDQUFJLElBQWEsRUFBRSxJQUFtQjtRQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBa0IsRUFBRSxjQUErQztRQUMzRSxNQUFNLElBQUksR0FBRyxNQUFNLGNBQWMsRUFBRSxDQUFDO1FBRXBDLGlEQUFpRDtRQUNqRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDN0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLENBQUMsQ0FBQyxRQUFRLFlBQVksbUJBQW1CLENBQUMsRUFBRSxDQUFDO1lBQy9DLDBDQUEwQztZQUMxQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTVDLDZEQUE2RDtZQUM3RCxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUU5RCw0REFBNEQ7WUFDNUQsTUFBTSxXQUFXLEdBQUcseUJBQXlCLENBQUMsQ0FBQyxJQUFnQixDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUV2RixzRUFBc0U7WUFDdEUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3hCLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUVILDBFQUEwRTtZQUMxRSxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3pCLENBQUM7UUFFRCxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUM7SUFDN0IsQ0FBQzs7bUhBbkNHLGVBQWU7dUhBQWYsZUFBZSxjQURJLE1BQU07a0dBQ3pCLGVBQWU7a0JBRHBCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOztBQXVDaEM7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFJLElBQWEsRUFBRSxJQUFtQjtJQUNyRSxPQUFPO1FBQ0w7WUFDRSxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDYixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvQyxDQUFDO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGVzdHJveVJlZixcbiAgRU5WSVJPTk1FTlRfSU5JVElBTElaRVIsXG4gIEVudmlyb25tZW50SW5qZWN0b3IsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBQcm92aWRlcixcbiAgUHJvdmlkZXJUb2tlbixcbiAgVHlwZSxcbiAgY3JlYXRlRW52aXJvbm1lbnRJbmplY3RvcixcbiAgaW5qZWN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb252aWVuY2UgbWV0aG9kIGZvciBsYXp5IGxvYWRpbmcgYW4gaW5qZWN0aW9uIHRva2VuLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5qZWN0QXN5bmM8VD4oXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgcHJvdmlkZXJMb2FkZXI6ICgpID0+IFByb21pc2U8UHJvdmlkZXJUb2tlbjxUPj4sXG4pOiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgaW5qZWN0SW1wbCA9IGluamVjdG9yLmdldChJbmplY3RBc3luY0ltcGwpO1xuICByZXR1cm4gaW5qZWN0SW1wbC5nZXQoaW5qZWN0b3IsIHByb3ZpZGVyTG9hZGVyKTtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5jbGFzcyBJbmplY3RBc3luY0ltcGw8VD4ge1xuICBwcml2YXRlIG92ZXJyaWRlcyA9IG5ldyBXZWFrTWFwKCk7IC8vIG5vIG5lZWQgdG8gY2xlYW51cFxuICBvdmVycmlkZTxUPih0eXBlOiBUeXBlPFQ+LCBtb2NrOiBUeXBlPHVua25vd24+KSB7XG4gICAgdGhpcy5vdmVycmlkZXMuc2V0KHR5cGUsIG1vY2spO1xuICB9XG5cbiAgYXN5bmMgZ2V0KGluamVjdG9yOiBJbmplY3RvciwgcHJvdmlkZXJMb2FkZXI6ICgpID0+IFByb21pc2U8UHJvdmlkZXJUb2tlbjxUPj4pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB0eXBlID0gYXdhaXQgcHJvdmlkZXJMb2FkZXIoKTtcblxuICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgb3ZlcnJpZGVzLCBPKDEpLCBsb3cgb3ZlcmhlYWRcbiAgICBpZiAodGhpcy5vdmVycmlkZXMuaGFzKHR5cGUpKSB7XG4gICAgICBjb25zdCBvdmVycmlkZSA9IHRoaXMub3ZlcnJpZGVzLmdldCh0eXBlKTtcbiAgICAgIHJldHVybiBuZXcgb3ZlcnJpZGUoKTtcbiAgICB9XG5cbiAgICBpZiAoIShpbmplY3RvciBpbnN0YW5jZW9mIEVudmlyb25tZW50SW5qZWN0b3IpKSB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSBEZXN0cm95UmVmIG9mIHRoZSBjb21wb25lbnRcbiAgICAgIGNvbnN0IGRlc3Ryb3lSZWYgPSBpbmplY3Rvci5nZXQoRGVzdHJveVJlZik7XG5cbiAgICAgIC8vIFRoaXMgaXMgdGhlIHBhcmVudCBpbmplY3RvciBvZiB0aGUgaW5qZWN0b3Igd2UncmUgY3JlYXRpbmdcbiAgICAgIGNvbnN0IGVudmlyb25tZW50SW5qZWN0b3IgPSBpbmplY3Rvci5nZXQoRW52aXJvbm1lbnRJbmplY3Rvcik7XG5cbiAgICAgIC8vIENyZWF0aW5nIGFuIGVudmlyb25tZW50IGluamVjdG9yIHRvIGRlc3Ryb3kgaXQgYWZ0ZXJ3YXJkc1xuICAgICAgY29uc3QgbmV3SW5qZWN0b3IgPSBjcmVhdGVFbnZpcm9ubWVudEluamVjdG9yKFt0eXBlIGFzIFByb3ZpZGVyXSwgZW52aXJvbm1lbnRJbmplY3Rvcik7XG5cbiAgICAgIC8vIERlc3Ryb3kgdGhlIGluamVjdG9yIHRvIHRyaWdnZXIgRGVzdHJveVJlZi5vbkRlc3Ryb3kgb24gb3VyIHNlcnZpY2VcbiAgICAgIGRlc3Ryb3lSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgICAgbmV3SW5qZWN0b3IuZGVzdHJveSgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdlIHdhbnQgdG8gY3JlYXRlIHRoZSBuZXcgaW5zdGFuY2Ugb2Ygb3VyIHNlcnZpY2Ugd2l0aCBvdXIgbmV3IGluamVjdG9yXG4gICAgICBpbmplY3RvciA9IG5ld0luamVjdG9yO1xuICAgIH1cblxuICAgIHJldHVybiBpbmplY3Rvci5nZXQodHlwZSkhO1xuICB9XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIG1vY2sgdGhlIGxhenkgbG9hZGVkIG1vZHVsZSBpbiBgaW5qZWN0QXN5bmNgXG4gKlxuICogQHVzYWdlXG4gKiBUZXN0QmVkLmNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUoe1xuICogICAgIHByb3ZpZGVyczogW1xuICogICAgIG1vY2tBc3luY1Byb3ZpZGVyKFNhbmRib3hTZXJ2aWNlLCBmYWtlU2FuZGJveFNlcnZpY2UpXG4gKiAgIF1cbiAqIH0pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gbW9ja0FzeW5jUHJvdmlkZXI8VD4odHlwZTogVHlwZTxUPiwgbW9jazogVHlwZTx1bmtub3duPikge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEVOVklST05NRU5UX0lOSVRJQUxJWkVSLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgICB1c2VWYWx1ZTogKCkgPT4ge1xuICAgICAgICBpbmplY3QoSW5qZWN0QXN5bmNJbXBsKS5vdmVycmlkZSh0eXBlLCBtb2NrKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgXTtcbn1cbiJdfQ==