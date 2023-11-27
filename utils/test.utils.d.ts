/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
export declare class FakeEventTarget implements EventTarget {
    listeners: Map<string, EventListenerOrEventListenerObject[]>;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    dispatchEvent(event: Event): boolean;
}
export declare class MockLocalStorage implements Pick<Storage, 'getItem' | 'setItem'> {
    private items;
    getItem(key: string): string | null;
    setItem(key: string, value: string | null): void;
}
