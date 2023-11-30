/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Injector, ProviderToken, Type } from '@angular/core';
/**
 * Convience method for lazy loading an injection token.
 */
export declare function injectAsync<T>(injector: Injector, providerLoader: () => Promise<ProviderToken<T>>): Promise<T>;
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
export declare function mockAsyncProvider<T>(type: Type<T>, mock: Type<unknown>): {
    provide: import("@angular/core").InjectionToken<readonly (() => void)[]>;
    multi: boolean;
    useValue: () => void;
}[];
