import { __awaiter } from 'tslib';

/**
 * @internal
 */
function formatFileSystemTree(tree) {
    const newTree = { d: {} };
    for (const name of Object.keys(tree)) {
        const entry = tree[name];
        if ('file' in entry) {
            const contents = entry.file.contents;
            const stringContents = typeof contents === 'string' ? contents : binaryString(contents);
            const binary = typeof contents === 'string' ? {} : { b: true };
            newTree.d[name] = { f: Object.assign({ c: stringContents }, binary) };
            continue;
        }
        const newEntry = formatFileSystemTree(entry.directory);
        newTree.d[name] = newEntry;
    }
    return newTree;
}
function binaryString(bytes) {
    let result = '';
    for (const byte of bytes) {
        result += String.fromCharCode(byte);
    }
    return result;
}

var __defProp = Object.defineProperty;
var __export = (target, all) => {
    for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
};
// dist/vendor/comlink.js
var comlink_exports = {};
__export(comlink_exports, {
    createEndpoint: () => createEndpoint,
    expose: () => expose,
    proxy: () => proxy,
    proxyMarker: () => proxyMarker,
    releaseProxy: () => releaseProxy,
    transfer: () => transfer,
    transferHandlers: () => transferHandlers,
    windowEndpoint: () => windowEndpoint,
    wrap: () => wrap
});
// ../../node_modules/comlink/dist/esm/comlink.mjs
var proxyMarker = Symbol("Comlink.proxy");
var createEndpoint = Symbol("Comlink.endpoint");
var releaseProxy = Symbol("Comlink.releaseProxy");
var throwMarker = Symbol("Comlink.thrown");
var isObject = (val) => typeof val === "object" && val !== null || typeof val === "function";
var proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return [port2, [port2]];
    },
    deserialize(port) {
        port.start();
        return wrap(port);
    }
};
var throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
        let serialized;
        if (value instanceof Error) {
            serialized = {
                isError: true,
                value: {
                    message: value.message,
                    name: value.name,
                    stack: value.stack
                }
            };
        }
        else {
            serialized = { isError: false, value };
        }
        return [serialized, []];
    },
    deserialize(serialized) {
        if (serialized.isError) {
            throw Object.assign(new Error(serialized.value.message), serialized.value);
        }
        throw serialized.value;
    }
};
var transferHandlers = /* @__PURE__ */ new Map([
    ["proxy", proxyTransferHandler],
    ["throw", throwTransferHandler]
]);
function expose(obj, ep = self) {
    ep.addEventListener("message", function callback(ev) {
        if (!ev || !ev.data) {
            return;
        }
        const { id, type, path } = Object.assign({ path: [] }, ev.data);
        const argumentList = (ev.data.argumentList || []).map(fromWireValue);
        let returnValue;
        try {
            const parent = path.slice(0, -1).reduce((obj2, prop) => obj2[prop], obj);
            const rawValue = path.reduce((obj2, prop) => obj2[prop], obj);
            switch (type) {
                case 0:
                    {
                        returnValue = rawValue;
                    }
                    break;
                case 1:
                    {
                        parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
                        returnValue = true;
                    }
                    break;
                case 2:
                    {
                        returnValue = rawValue.apply(parent, argumentList);
                    }
                    break;
                case 3:
                    {
                        const value = new rawValue(...argumentList);
                        returnValue = proxy(value);
                    }
                    break;
                case 4:
                    {
                        const { port1, port2 } = new MessageChannel();
                        expose(obj, port2);
                        returnValue = transfer(port1, [port1]);
                    }
                    break;
                case 5:
                    {
                        returnValue = void 0;
                    }
                    break;
            }
        }
        catch (value) {
            returnValue = { value, [throwMarker]: 0 };
        }
        Promise.resolve(returnValue).catch((value) => {
            return { value, [throwMarker]: 0 };
        }).then((returnValue2) => {
            const [wireValue, transferables] = toWireValue(returnValue2);
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
            if (type === 5) {
                ep.removeEventListener("message", callback);
                closeEndPoint(ep);
            }
        });
    });
    if (ep.start) {
        ep.start();
    }
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.close();
}
function wrap(ep, target) {
    return createProxy(ep, [], target);
}
function throwIfProxyReleased(isReleased) {
    if (isReleased) {
        throw new Error("Proxy has been released and is not useable");
    }
}
function createProxy(ep, path = [], target = function () {
}) {
    let isProxyReleased = false;
    const proxy2 = new Proxy(target, {
        get(_target, prop) {
            throwIfProxyReleased(isProxyReleased);
            if (prop === releaseProxy) {
                return () => {
                    return requestResponseMessage(ep, {
                        type: 5,
                        path: path.map((p) => p.toString())
                    }).then(() => {
                        closeEndPoint(ep);
                        isProxyReleased = true;
                    });
                };
            }
            if (prop === "then") {
                if (path.length === 0) {
                    return { then: () => proxy2 };
                }
                const r = requestResponseMessage(ep, {
                    type: 0,
                    path: path.map((p) => p.toString())
                }).then(fromWireValue);
                return r.then.bind(r);
            }
            return createProxy(ep, [...path, prop]);
        },
        set(_target, prop, rawValue) {
            throwIfProxyReleased(isProxyReleased);
            const [value, transferables] = toWireValue(rawValue);
            return requestResponseMessage(ep, {
                type: 1,
                path: [...path, prop].map((p) => p.toString()),
                value
            }, transferables).then(fromWireValue);
        },
        apply(_target, _thisArg, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const last = path[path.length - 1];
            if (last === createEndpoint) {
                return requestResponseMessage(ep, {
                    type: 4
                }).then(fromWireValue);
            }
            if (last === "bind") {
                return createProxy(ep, path.slice(0, -1));
            }
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: 2,
                path: path.map((p) => p.toString()),
                argumentList
            }, transferables).then(fromWireValue);
        },
        construct(_target, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: 3,
                path: path.map((p) => p.toString()),
                argumentList
            }, transferables).then(fromWireValue);
        }
    });
    return proxy2;
}
function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
    const processed = argumentList.map(toWireValue);
    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
var transferCache = /* @__PURE__ */ new WeakMap();
function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
}
function proxy(obj) {
    return Object.assign(obj, { [proxyMarker]: true });
}
function windowEndpoint(w, context = self, targetOrigin = "*") {
    return {
        postMessage: (msg, transferables) => w.postMessage(msg, targetOrigin, transferables),
        addEventListener: context.addEventListener.bind(context),
        removeEventListener: context.removeEventListener.bind(context)
    };
}
function toWireValue(value) {
    for (const [name, handler] of transferHandlers) {
        if (handler.canHandle(value)) {
            const [serializedValue, transferables] = handler.serialize(value);
            return [
                {
                    type: 3,
                    name,
                    value: serializedValue
                },
                transferables
            ];
        }
    }
    return [
        {
            type: 0,
            value
        },
        transferCache.get(value) || []
    ];
}
function fromWireValue(value) {
    switch (value.type) {
        case 3:
            return transferHandlers.get(value.name).deserialize(value.value);
        case 0:
            return value.value;
    }
}
function requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve) => {
        const id = generateUUID();
        ep.addEventListener("message", function l(ev) {
            if (!ev.data || !ev.data.id || ev.data.id !== id) {
                return;
            }
            ep.removeEventListener("message", l);
            resolve(ev.data);
        });
        if (ep.start) {
            ep.start();
        }
        ep.postMessage(Object.assign({ id }, msg), transfers);
    });
}
function generateUUID() {
    return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}

const DEFAULT_IFRAME_SOURCE = 'https://stackblitz.com/headless';
let bootPromise = null;
let cachedServerPromise = null;
let cachedBootOptions = {};
const decoder = new TextDecoder();
const encoder = new TextEncoder();
/**
 * The main export of this library. An instance of `WebContainer` represents a runtime
 * ready to be used.
 */
class WebContainer {
    /** @internal */
    constructor(
    /** @internal */
    _instance, fs, 
    /** @internal */
    _runtimeInfo) {
        this._tornDown = false;
        this._instance = _instance;
        this._runtimeInfo = _runtimeInfo;
        this.fs = new FileSystemAPIClient(fs);
    }
    spawn(command, optionsOrArgs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let args = [];
            if (Array.isArray(optionsOrArgs)) {
                args = optionsOrArgs;
            }
            else {
                options = optionsOrArgs;
            }
            let output = undefined;
            let stream = new ReadableStream();
            if ((options === null || options === void 0 ? void 0 : options.output) !== false) {
                const result = streamWithPush();
                output = result.push;
                stream = result.stream;
            }
            const wrapped = proxyListener(binaryListener(output));
            const process = yield this._instance.run({
                command,
                args,
                env: options === null || options === void 0 ? void 0 : options.env,
                terminal: options === null || options === void 0 ? void 0 : options.terminal,
            }, undefined, undefined, wrapped);
            return new WebContainerProcessImpl(process, stream);
        });
    }
    on(event, listener) {
        let tornDown = false;
        let unsubscribe = () => { };
        const wrapped = (...args) => {
            if (tornDown) {
                return;
            }
            listener(...args);
        };
        this._instance.on(event, comlink_exports.proxy(wrapped)).then((_unsubscribe) => {
            unsubscribe = _unsubscribe;
            if (tornDown) {
                unsubscribe();
            }
        });
        return () => {
            tornDown = true;
            unsubscribe();
        };
    }
    /**
     * Mounts a tree of files into the filesystem. This can be specified as a tree object ({@link FileSystemTree})
     * or as a binary snapshot generated by [`@webcontainer/snapshot`](https://www.npmjs.com/package/@webcontainer/snapshot).
     *
     * @param snapshotOrTree - A tree of files, or a binary snapshot. Note that binary payloads will be transferred.
     * @param options.mountPoint - Specifies a nested path where the tree should be mounted.
     */
    mount(snapshotOrTree, options) {
        const payload = snapshotOrTree instanceof Uint8Array
            ? snapshotOrTree
            : snapshotOrTree instanceof ArrayBuffer
                ? new Uint8Array(snapshotOrTree)
                : encoder.encode(JSON.stringify(formatFileSystemTree(snapshotOrTree)));
        return this._instance.loadFiles(comlink_exports.transfer(payload, [payload.buffer]), {
            mountPoints: options === null || options === void 0 ? void 0 : options.mountPoint,
        });
    }
    /**
     * The default value of the `PATH` environment variable for processes started through {@link spawn}.
     */
    get path() {
        return this._runtimeInfo.path;
    }
    /**
     * The full path to the working directory (see {@link FileSystemAPI}).
     */
    get workdir() {
        return this._runtimeInfo.cwd;
    }
    /**
     * Destroys the WebContainer instance, turning it unusable, and releases its resources. After this,
     * a new WebContainer instance can be obtained by calling {@link WebContainer.boot | `boot`}.
     *
     * All entities derived from this instance (e.g. processes, the file system, etc.) also become unusable
     * after calling this method.
     */
    teardown() {
        if (this._tornDown) {
            throw new Error('WebContainer already torn down');
        }
        this._tornDown = true;
        this.fs._teardown();
        this._instance.teardown();
        this._instance[comlink_exports.releaseProxy]();
        if (WebContainer._instance === this) {
            WebContainer._instance = null;
        }
    }
    /**
     * Boots a WebContainer. Only a single instance of WebContainer can be booted concurrently (see {@link WebContainer#teardown | `teardown`}).
     *
     * Booting WebContainer is an expensive operation.
     */
    static boot() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const { workdirName } = options;
            if (window.crossOriginIsolated && options.coep === 'none') {
                console.warn(`A Cross-Origin-Embedder-Policy header is required in cross origin isolated environments.\nSet the 'coep' option to 'require-corp'.`);
            }
            if ((workdirName === null || workdirName === void 0 ? void 0 : workdirName.includes('/')) || workdirName === '..' || workdirName === '.') {
                throw new Error('workdirName should be a valid folder name');
            }
            // try to "acquire the lock", i.e. wait for any ongoing boot request to finish
            while (bootPromise) {
                yield bootPromise;
            }
            if (WebContainer._instance) {
                throw new Error('Only a single WebContainer instance can be booted');
            }
            const instancePromise = unsynchronizedBoot(options);
            // the "lock" is a promise for the ongoing boot that never fails
            bootPromise = instancePromise.catch(() => { });
            try {
                const instance = yield instancePromise;
                WebContainer._instance = instance;
                return instance;
            }
            finally {
                // release the "lock"
                bootPromise = null;
            }
        });
    }
}
WebContainer._instance = null;
const DIR_ENTRY_TYPE_FILE = 1;
const DIR_ENTRY_TYPE_DIR = 2;
/**
 * @internal
 */
class DirEntImpl {
    constructor(name, _type) {
        this.name = name;
        this._type = _type;
    }
    isFile() {
        return this._type === DIR_ENTRY_TYPE_FILE;
    }
    isDirectory() {
        return this._type === DIR_ENTRY_TYPE_DIR;
    }
}
class FSWatcher {
    constructor(_apiClient, _path, _options, _listener) {
        this._closed = false;
        this._apiClient = _apiClient;
        this._path = _path;
        this._options = _options;
        this._listener = _listener;
        this._apiClient._watchers.add(this);
        this._wrappedListener = (event, filename) => {
            if (this._listener && !this._closed) {
                this._listener(event, filename);
            }
        };
        this._apiClient._fs
            .watch(this._path, this._options, proxyListener(this._wrappedListener))
            .then((_watcher) => {
            this._watcher = _watcher;
            if (this._closed) {
                this._teardown();
            }
        })
            .catch(console.error);
    }
    close() {
        if (!this._closed) {
            this._closed = true;
            this._apiClient._watchers.delete(this);
            this._teardown();
        }
    }
    /**
     * @internal
     */
    _teardown() {
        var _a;
        (_a = this._watcher) === null || _a === void 0 ? void 0 : _a.close().finally(() => {
            var _a;
            (_a = this._watcher) === null || _a === void 0 ? void 0 : _a[comlink_exports.releaseProxy]();
        });
    }
}
/**
 * @internal
 */
class WebContainerProcessImpl {
    constructor(process, output) {
        this.output = output;
        this._process = process;
        this.input = new WritableStream({
            write: (data) => {
                var _a;
                // this promise is not supposed to fail anyway
                (_a = this._getProcess()) === null || _a === void 0 ? void 0 : _a.write(data).catch(() => { });
            },
        });
        this.exit = this._onExit();
    }
    kill() {
        var _a;
        (_a = this._getProcess()) === null || _a === void 0 ? void 0 : _a.kill();
    }
    resize(dimensions) {
        var _a;
        (_a = this._getProcess()) === null || _a === void 0 ? void 0 : _a.resize(dimensions);
    }
    _onExit() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return yield this._process.onExit;
            }
            finally {
                (_a = this._process) === null || _a === void 0 ? void 0 : _a[comlink_exports.releaseProxy]();
                this._process = null;
            }
        });
    }
    _getProcess() {
        if (this._process == null) {
            console.warn('This process already exited');
        }
        return this._process;
    }
}
/**
 * @internal
 */
class FileSystemAPIClient {
    constructor(fs) {
        this._watchers = new Set([]);
        this._fs = fs;
    }
    rm(...args) {
        return this._fs.rm(...args);
    }
    readFile(path, encoding) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._fs.readFile(path, encoding);
        });
    }
    rename(oldPath, newPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._fs.rename(oldPath, newPath);
        });
    }
    writeFile(path, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data instanceof Uint8Array) {
                const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
                data = comlink_exports.transfer(new Uint8Array(buffer), [buffer]);
            }
            yield this._fs.writeFile(path, data, options);
        });
    }
    readdir(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._fs.readdir(path, options);
            if (isStringArray(result)) {
                return result;
            }
            if (isTypedArrayCollection(result)) {
                return result;
            }
            const entries = result.map((entry) => new DirEntImpl(entry.name, entry['Symbol(type)']));
            return entries;
        });
    }
    mkdir(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._fs.mkdir(path, options);
        });
    }
    watch(path, options, listener) {
        if (typeof options === 'function') {
            listener = options;
            options = null;
        }
        return new FSWatcher(this, path, options, listener);
    }
    /**
     * @internal
     */
    _teardown() {
        this._fs[comlink_exports.releaseProxy]();
        for (const watcherWrapper of this._watchers) {
            watcherWrapper.close();
        }
    }
}
function unsynchronizedBoot(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { serverPromise } = serverFactory(options);
        const server = yield serverPromise;
        const instance = yield server.build({
            host: window.location.host,
            version: "1.1.9",
            workdirName: options.workdirName,
        });
        const fs = yield instance.fs();
        const runtimeInfo = yield instance.runtimeInfo();
        return new WebContainer(instance, fs, runtimeInfo);
    });
}
function binaryListener(listener) {
    if (listener == null) {
        return undefined;
    }
    return (data) => {
        if (data instanceof Uint8Array) {
            listener(decoder.decode(data));
        }
        else if (data == null) {
            listener(null);
        }
    };
}
function proxyListener(listener) {
    if (listener == null) {
        return undefined;
    }
    return comlink_exports.proxy(listener);
}
function serverFactory(options) {
    if (cachedServerPromise != null) {
        if (options.coep !== cachedBootOptions.coep) {
            console.warn(`Attempting to boot WebContainer with 'coep: ${options.coep}'`);
            console.warn(`First boot had 'coep: ${cachedBootOptions.coep}', new settings will not take effect!`);
        }
        return { serverPromise: cachedServerPromise };
    }
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.setAttribute('allow', 'cross-origin-isolated');
    const url = getIframeUrl();
    url.searchParams.set('version', "1.1.9");
    if (options.coep) {
        url.searchParams.set('coep', options.coep);
    }
    iframe.src = url.toString();
    const { origin } = url;
    cachedBootOptions = Object.assign({}, options);
    cachedServerPromise = new Promise((resolve) => {
        const onMessage = (event) => {
            if (event.origin !== origin) {
                return;
            }
            const { data } = event;
            if (data.type === 'init') {
                resolve(comlink_exports.wrap(event.ports[0]));
                return;
            }
            if (data.type === 'warning') {
                console[data.level].call(console, data.message);
                return;
            }
        };
        window.addEventListener('message', onMessage);
    });
    document.body.insertBefore(iframe, null);
    return { serverPromise: cachedServerPromise };
}
function isStringArray(list) {
    return typeof list[0] === 'string';
}
function isTypedArrayCollection(list) {
    return list[0] instanceof Uint8Array;
}
function getIframeUrl() {
    var _a;
    return new URL((_a = window.WEBCONTAINER_API_IFRAME_URL) !== null && _a !== void 0 ? _a : DEFAULT_IFRAME_SOURCE);
}
function streamWithPush() {
    let controller = null;
    const stream = new ReadableStream({
        start(controller_) {
            controller = controller_;
        },
    });
    const push = (item) => {
        if (item != null) {
            controller === null || controller === void 0 ? void 0 : controller.enqueue(item);
        }
        else {
            controller === null || controller === void 0 ? void 0 : controller.close();
            controller = null;
        }
    };
    return { stream, push };
}

/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
class FakeEventTarget {
    constructor() {
        this.listeners = new Map();
    }
    addEventListener(type, listener) {
        const listeners = this.listeners.get(type) || [];
        listeners.push(listener);
        this.listeners.set(type, listeners);
    }
    removeEventListener(type, listener) {
        const listeners = this.listeners.get(type);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
    dispatchEvent(event) {
        const listeners = this.listeners.get(event.type);
        if (listeners) {
            for (const listener of listeners) {
                if (typeof listener === 'function') {
                    listener.call(this, event);
                }
                else {
                    listener.handleEvent(event);
                }
            }
        }
        return true;
    }
}
class MockLocalStorage {
    constructor() {
        this.items = new Map();
    }
    getItem(key) {
        var _a;
        return (_a = this.items.get(key)) !== null && _a !== void 0 ? _a : null;
    }
    setItem(key, value) {
        this.items.set(key, value);
    }
}
class FakeChangeDetectorRef {
    markForCheck() { }
    detach() { }
    checkNoChanges() { }
    reattach() { }
    detectChanges() { }
}
class FakeWebContainer extends WebContainer {
    constructor(fakeOptions) {
        super();
        this.fakeSpawn = undefined;
        this.fs = new FakeFileSystemAPI();
        if (fakeOptions === null || fakeOptions === void 0 ? void 0 : fakeOptions.spawn)
            this.fakeSpawn = fakeOptions.spawn;
    }
    spawn(command, args, options) {
        if (this.fakeSpawn)
            return Promise.resolve(this.fakeSpawn);
        const fakeProcess = new FakeWebContainerProcess();
        return Promise.resolve(fakeProcess);
    }
    on(event, listener) {
        return () => { };
    }
    mount(tree, options) {
        return Promise.resolve();
    }
    get path() {
        return '/fake-path';
    }
    get workdir() {
        return '/fake-workdir';
    }
    teardown() { }
}
class FakeFileSystemAPI {
    readdir(path, options) {
        return Promise.resolve(['/fake-dirname']);
    }
    readFile(path, encoding) {
        return Promise.resolve('fake file content');
    }
    writeFile(path, data, options) {
        return Promise.resolve();
    }
    mkdir(path, options) {
        return Promise.resolve();
    }
    rm(path, options) {
        return Promise.resolve();
    }
    rename(oldPath, newPath) {
        throw Error('Not implemented');
    }
    watch(filename, options, listener) {
        throw Error('Not implemented');
    }
}
class FakeWebContainerProcess {
    constructor() {
        this.exit = Promise.resolve(0);
        this.input = new WritableStream();
        this.output = new ReadableStream();
    }
    kill() { }
    resize(dimensions) { }
}

/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

export { FakeChangeDetectorRef, FakeEventTarget, FakeWebContainer, FakeWebContainerProcess, MockLocalStorage };
//# sourceMappingURL=testing.mjs.map
