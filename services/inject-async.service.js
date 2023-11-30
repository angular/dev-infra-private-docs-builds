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
import { DestroyRef, ENVIRONMENT_INITIALIZER, EnvironmentInjector, Injectable, createEnvironmentInjector, inject, } from '@angular/core';
/**
 * Convience method for lazy loading an injection token.
 */
export async function injectAsync(injector, providerLoader) {
    const injectImpl = injector.get(InjectAsyncImpl);
    return injectImpl.get(injector, providerLoader);
}
let InjectAsyncImpl = class InjectAsyncImpl {
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
};
InjectAsyncImpl = __decorate([
    Injectable({ providedIn: 'root' })
], InjectAsyncImpl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LWFzeW5jLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9kb2NzL3NlcnZpY2VzL2luamVjdC1hc3luYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILE9BQU8sRUFDTCxVQUFVLEVBQ1YsdUJBQXVCLEVBQ3ZCLG1CQUFtQixFQUNuQixVQUFVLEVBS1YseUJBQXlCLEVBQ3pCLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2Qjs7R0FFRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsV0FBVyxDQUMvQixRQUFrQixFQUNsQixjQUErQztJQUUvQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUdELElBQU0sZUFBZSxHQUFyQixNQUFNLGVBQWU7SUFBckI7UUFDVSxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjtJQW1DMUQsQ0FBQztJQWxDQyxRQUFRLENBQUksSUFBYSxFQUFFLElBQW1CO1FBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFrQixFQUFFLGNBQStDO1FBQzNFLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBYyxFQUFFLENBQUM7UUFFcEMsaURBQWlEO1FBQ2pELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxPQUFPLElBQUksUUFBUSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7WUFDL0MsMENBQTBDO1lBQzFDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFNUMsNkRBQTZEO1lBQzdELE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRTlELDREQUE0RDtZQUM1RCxNQUFNLFdBQVcsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDLElBQWdCLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1lBRXZGLHNFQUFzRTtZQUN0RSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDeEIsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsMEVBQTBFO1lBQzFFLFFBQVEsR0FBRyxXQUFXLENBQUM7UUFDekIsQ0FBQztRQUVELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztJQUM3QixDQUFDO0NBQ0YsQ0FBQTtBQXBDSyxlQUFlO0lBRHBCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztHQUMzQixlQUFlLENBb0NwQjtBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBSSxJQUFhLEVBQUUsSUFBbUI7SUFDckUsT0FBTztRQUNMO1lBQ0UsT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxLQUFLLEVBQUUsSUFBSTtZQUNYLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDL0MsQ0FBQztTQUNGO0tBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIERlc3Ryb3lSZWYsXG4gIEVOVklST05NRU5UX0lOSVRJQUxJWkVSLFxuICBFbnZpcm9ubWVudEluamVjdG9yLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgUHJvdmlkZXIsXG4gIFByb3ZpZGVyVG9rZW4sXG4gIFR5cGUsXG4gIGNyZWF0ZUVudmlyb25tZW50SW5qZWN0b3IsXG4gIGluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQ29udmllbmNlIG1ldGhvZCBmb3IgbGF6eSBsb2FkaW5nIGFuIGluamVjdGlvbiB0b2tlbi5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluamVjdEFzeW5jPFQ+KFxuICBpbmplY3RvcjogSW5qZWN0b3IsXG4gIHByb3ZpZGVyTG9hZGVyOiAoKSA9PiBQcm9taXNlPFByb3ZpZGVyVG9rZW48VD4+LFxuKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IGluamVjdEltcGwgPSBpbmplY3Rvci5nZXQoSW5qZWN0QXN5bmNJbXBsKTtcbiAgcmV0dXJuIGluamVjdEltcGwuZ2V0KGluamVjdG9yLCBwcm92aWRlckxvYWRlcik7XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuY2xhc3MgSW5qZWN0QXN5bmNJbXBsPFQ+IHtcbiAgcHJpdmF0ZSBvdmVycmlkZXMgPSBuZXcgV2Vha01hcCgpOyAvLyBubyBuZWVkIHRvIGNsZWFudXBcbiAgb3ZlcnJpZGU8VD4odHlwZTogVHlwZTxUPiwgbW9jazogVHlwZTx1bmtub3duPikge1xuICAgIHRoaXMub3ZlcnJpZGVzLnNldCh0eXBlLCBtb2NrKTtcbiAgfVxuXG4gIGFzeW5jIGdldChpbmplY3RvcjogSW5qZWN0b3IsIHByb3ZpZGVyTG9hZGVyOiAoKSA9PiBQcm9taXNlPFByb3ZpZGVyVG9rZW48VD4+KTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3QgdHlwZSA9IGF3YWl0IHByb3ZpZGVyTG9hZGVyKCk7XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIG92ZXJyaWRlcywgTygxKSwgbG93IG92ZXJoZWFkXG4gICAgaWYgKHRoaXMub3ZlcnJpZGVzLmhhcyh0eXBlKSkge1xuICAgICAgY29uc3Qgb3ZlcnJpZGUgPSB0aGlzLm92ZXJyaWRlcy5nZXQodHlwZSk7XG4gICAgICByZXR1cm4gbmV3IG92ZXJyaWRlKCk7XG4gICAgfVxuXG4gICAgaWYgKCEoaW5qZWN0b3IgaW5zdGFuY2VvZiBFbnZpcm9ubWVudEluamVjdG9yKSkge1xuICAgICAgLy8gdGhpcyBpcyB0aGUgRGVzdHJveVJlZiBvZiB0aGUgY29tcG9uZW50XG4gICAgICBjb25zdCBkZXN0cm95UmVmID0gaW5qZWN0b3IuZ2V0KERlc3Ryb3lSZWYpO1xuXG4gICAgICAvLyBUaGlzIGlzIHRoZSBwYXJlbnQgaW5qZWN0b3Igb2YgdGhlIGluamVjdG9yIHdlJ3JlIGNyZWF0aW5nXG4gICAgICBjb25zdCBlbnZpcm9ubWVudEluamVjdG9yID0gaW5qZWN0b3IuZ2V0KEVudmlyb25tZW50SW5qZWN0b3IpO1xuXG4gICAgICAvLyBDcmVhdGluZyBhbiBlbnZpcm9ubWVudCBpbmplY3RvciB0byBkZXN0cm95IGl0IGFmdGVyd2FyZHNcbiAgICAgIGNvbnN0IG5ld0luamVjdG9yID0gY3JlYXRlRW52aXJvbm1lbnRJbmplY3RvcihbdHlwZSBhcyBQcm92aWRlcl0sIGVudmlyb25tZW50SW5qZWN0b3IpO1xuXG4gICAgICAvLyBEZXN0cm95IHRoZSBpbmplY3RvciB0byB0cmlnZ2VyIERlc3Ryb3lSZWYub25EZXN0cm95IG9uIG91ciBzZXJ2aWNlXG4gICAgICBkZXN0cm95UmVmLm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICAgIG5ld0luamVjdG9yLmRlc3Ryb3koKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBXZSB3YW50IHRvIGNyZWF0ZSB0aGUgbmV3IGluc3RhbmNlIG9mIG91ciBzZXJ2aWNlIHdpdGggb3VyIG5ldyBpbmplY3RvclxuICAgICAgaW5qZWN0b3IgPSBuZXdJbmplY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5qZWN0b3IuZ2V0KHR5cGUpITtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBtb2NrIHRoZSBsYXp5IGxvYWRlZCBtb2R1bGUgaW4gYGluamVjdEFzeW5jYFxuICpcbiAqIEB1c2FnZVxuICogVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKHtcbiAqICAgICBwcm92aWRlcnM6IFtcbiAqICAgICBtb2NrQXN5bmNQcm92aWRlcihTYW5kYm94U2VydmljZSwgZmFrZVNhbmRib3hTZXJ2aWNlKVxuICogICBdXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vY2tBc3luY1Byb3ZpZGVyPFQ+KHR5cGU6IFR5cGU8VD4sIG1vY2s6IFR5cGU8dW5rbm93bj4pIHtcbiAgcmV0dXJuIFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBFTlZJUk9OTUVOVF9JTklUSUFMSVpFUixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlVmFsdWU6ICgpID0+IHtcbiAgICAgICAgaW5qZWN0KEluamVjdEFzeW5jSW1wbCkub3ZlcnJpZGUodHlwZSwgbW9jayk7XG4gICAgICB9LFxuICAgIH0sXG4gIF07XG59XG4iXX0=