import { ChangeDetectorRef } from '@angular/core';
import { DirEnt } from '@webcontainer/api';
import { ErrorListener } from '@webcontainer/api';
import { FileSystemAPI } from '@webcontainer/api';
import { FileSystemTree } from '@webcontainer/api';
import { FSWatchCallback } from '@webcontainer/api';
import { FSWatchOptions } from '@webcontainer/api';
import { IFSWatcher } from '@webcontainer/api';
import { PortListener } from '@webcontainer/api';
import { ServerReadyListener } from '@webcontainer/api';
import { Unsubscribe } from '@webcontainer/api';
import { WebContainer } from '@webcontainer/api';
import { WebContainerProcess } from '@webcontainer/api';

export declare class FakeChangeDetectorRef implements ChangeDetectorRef {
    markForCheck(): void;
    detach(): void;
    checkNoChanges(): void;
    reattach(): void;
    detectChanges(): void;
}

export declare class FakeEventTarget implements EventTarget {
    listeners: Map<string, EventListenerOrEventListenerObject[]>;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
    dispatchEvent(event: Event): boolean;
}

declare class FakeFileSystemAPI implements FileSystemAPI {
    readdir(path: string, options: 'buffer' | {
        encoding: 'buffer';
        withFileTypes?: false | undefined;
    }): Promise<Uint8Array[]>;
    readdir(path: string, options?: string | {
        encoding?: string | null | undefined;
        withFileTypes?: false | undefined;
    } | null | undefined): Promise<string[]>;
    readdir(path: string, options: {
        encoding: 'buffer';
        withFileTypes: true;
    }): Promise<DirEnt<Uint8Array>[]>;
    readdir(path: string, options: {
        encoding?: string | null | undefined;
        withFileTypes: true;
    }): Promise<DirEnt<string>[]>;
    readFile(path: string, encoding?: null | undefined): Promise<Uint8Array>;
    readFile(path: string, encoding: string): Promise<string>;
    writeFile(path: string, data: string | Uint8Array, options?: string | {
        encoding?: string | null | undefined;
    } | null | undefined): Promise<void>;
    mkdir(path: string, options?: {
        recursive?: false | undefined;
    } | undefined): Promise<void>;
    mkdir(path: string, options: {
        recursive: true;
    }): Promise<string>;
    rm(path: string, options?: {
        force?: boolean | undefined;
        recursive?: boolean | undefined;
    } | undefined): Promise<void>;
    rename(oldPath: string, newPath: string): Promise<void>;
    watch(filename: string, options?: FSWatchOptions | undefined, listener?: FSWatchCallback | undefined): IFSWatcher;
    watch(filename: string, listener?: FSWatchCallback | undefined): IFSWatcher;
}

export declare class FakeWebContainer extends WebContainer {
    fakeSpawn: FakeWebContainerProcess | undefined;
    constructor(fakeOptions?: {
        spawn: FakeWebContainerProcess;
    });
    spawn(command: unknown, args?: unknown, options?: unknown): Promise<FakeWebContainerProcess>;
    on(event: 'port', listener: PortListener): Unsubscribe;
    on(event: 'server-ready', listener: ServerReadyListener): Unsubscribe;
    on(event: 'error', listener: ErrorListener): Unsubscribe;
    mount(tree: FileSystemTree, options?: {
        mountPoint?: string | undefined;
    } | undefined): Promise<void>;
    get path(): string;
    get workdir(): string;
    teardown(): void;
    fs: FakeFileSystemAPI;
}

export declare class FakeWebContainerProcess implements WebContainerProcess {
    exit: Promise<number>;
    input: WritableStream<string>;
    output: ReadableStream<string>;
    kill(): void;
    resize(dimensions: {
        cols: number;
        rows: number;
    }): void;
}

export declare class MockLocalStorage implements Pick<Storage, 'getItem' | 'setItem'> {
    private items;
    getItem(key: string): string | null;
    setItem(key: string, value: string | null): void;
}

export { }
