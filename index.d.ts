/// <reference types="node" />

import { ActivatedRouteSnapshot } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import type { FileSystemTree } from '@webcontainer/api';
import { Highlightable } from '@angular/cdk/a11y';
import * as i0 from '@angular/core';
import { InjectionToken } from '@angular/core';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ProviderToken } from '@angular/core';
import { QueryList } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { SearchResponse } from '@algolia/client-search/dist/client-search';
import { Signal } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Type } from '@angular/core';
import { WritableSignal } from '@angular/core';

declare interface AlgoliaConfig {
    apiKey: string;
    appId: string;
    indexName: string;
}

export declare const ASSETS_EXAMPLES_PATH = "assets/content/examples";

export declare const checkFilesInDirectory: (dir: string, fs: FileSystemAPI, filterFoldersPredicate?: (path?: string) => boolean, files?: FileAndContent[]) => Promise<FileAndContent[]>;

export declare class ClickOutside {
    ignoredElementsIds: string[];
    clickOutside: EventEmitter<void>;
    private readonly document;
    private readonly elementRef;
    onClick($event: PointerEvent): void;
    private wasClickedOnIgnoredElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickOutside, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickOutside, "[docsClickOutside]", never, { "ignoredElementsIds": { "alias": "docsClickOutsideIgnore"; "required": false; }; }, { "clickOutside": "docsClickOutside"; }, never, never, true, never>;
}

/** Represents a tutorial config that supports only the interactive terminal for the Angular CLI */
export declare type CliTutorialConfig = Omit<LocalTutorialConfig, 'type'> & {
    type: TutorialType.CLI;
};

/**
 * Map of the examples, values are functions which returns the promise of the component type, which will be displayed as preview in the ExampleViewer component
 */
export declare interface CodeExamplesMap {
    [id: string]: () => Promise<Type<unknown>>;
}

export declare function contentResolver(contentPath: string): ResolveFn<DocContent | undefined>;

export declare class CookiePopup {
    private readonly localStorage;
    /** Whether the user has accepted the cookie disclaimer. */
    hasAccepted: WritableSignal<boolean>;
    constructor();
    /** Accepts the cookie disclaimer. */
    protected accept(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CookiePopup, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CookiePopup, "docs-cookie-popup", never, {}, {}, never, never, true, never>;
}

declare interface DirEnt<T> {
    name: T;
    isFile(): boolean;
    isDirectory(): boolean;
}

/** Represents a documentation page data. */
export declare interface DocContent {
    /** The unique identifier for this document. */
    id: string;
    /** The HTML to display in the doc viewer. */
    contents: string;
    /** The unique title for this document page. */
    title?: string;
}

export declare const DOCS_CODE_MUTLIFILE_SELECTOR = ".docs-code-multifile";

export declare const DOCS_CODE_SELECTOR = ".docs-code";

export declare const DOCS_CONTENT_LOADER: InjectionToken<DocsContentLoader>;

export declare const DOCS_VIEWER_SELECTOR = "docs-viewer";

/** The service responsible for fetching static content for docs pages */
export declare interface DocsContentLoader {
    getContent(path: string): Promise<DocContent | undefined>;
}

export declare class DocViewer implements OnChanges {
    docContent?: string;
    hasToc: boolean;
    contentLoaded: EventEmitter<void>;
    private readonly destroyRef;
    private readonly document;
    private readonly elementRef;
    private readonly location;
    private readonly navigationState;
    private readonly platformId;
    private readonly router;
    private readonly viewContainer;
    private readonly environmentInjector;
    private readonly injector;
    private readonly appRef;
    private animateContent;
    private readonly pendingRenderTasks;
    private countOfExamples;
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    renderContentsAndRunClientSetup(content?: string): Promise<void>;
    /**
     * Load ExampleViewer component when:
     * - exists docs-code-multifile element with multiple files OR
     * - exists docs-code element with single file AND
     *   - 'preview' attribute was provided OR
     *   - 'visibleLines' attribute was provided
     */
    private loadExamples;
    private renderTableOfContents;
    private renderExampleViewerComponents;
    private getCodeSnippetsFromMultifileWrapper;
    private getStandaloneCodeSnippet;
    private loadCopySourceCodeButtons;
    private loadBreadcrumb;
    private loadIcons;
    /**
     * Helper method to render a component dynamically in a context of this class.
     */
    private renderComponent;
    private setupAnchorListeners;
    private rewriteRelativeAnchors;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocViewer, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DocViewer, "docs-viewer", never, { "docContent": { "alias": "docContent"; "required": false; }; "hasToc": { "alias": "hasToc"; "required": false; }; }, { "contentLoaded": "contentLoaded"; }, never, never, true, never>;
}

export declare type EditorOnlyTutorialConfig = Omit<EditorTutorialConfig, 'type'> & {
    type: TutorialType.EDITOR_ONLY;
};

/** Represents a tutorial config with all the embedded editor components enabled */
export declare interface EditorTutorialConfig extends TutorialConfigBase {
    type: TutorialType.EDITOR;
}

export declare const ENVIRONMENT: InjectionToken<Environment>;

export declare interface Environment {
    production: boolean;
    algolia: AlgoliaConfig;
    googleAnalyticsId: string;
}

export declare const EXAMPLE_VIEWER_CONTENT_LOADER: InjectionToken<ExampleViewerContentLoader>;

export declare interface ExampleMetadata {
    /** Numeric id of example, used to generate unique link to the example */
    id: number;
    /** Title of the example. */
    title?: string;
    /** Path to the preview component */
    path?: string;
    /** List of files which are part of the example. */
    files: Snippet[];
    /** True when ExampleViewer should have preview */
    preview: boolean;
}

/** The service responsible for fetching the type of Component to display in the preview */
export declare interface ExampleViewerContentLoader {
    /** Returns type of Component to display in the preview */
    loadPreview(id: string): Promise<Type<unknown>>;
}

/**
 * The directive will set target of anchor elements to '_blank' for the external links.
 * We can opt-out this behavior by adding `noBlankForExternalLink` attribute to anchor element.
 */
export declare class ExternalLink implements OnInit {
    private readonly anchor;
    private readonly platformId;
    private readonly window;
    target?: '_blank' | '_self' | '_parent' | '_top' | '';
    ngOnInit(): void;
    private setAnchorTarget;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExternalLink, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ExternalLink, "a[href]:not([noBlankForExternalLink])", never, {}, {}, never, never, true, never>;
}

export declare type FileAndContent = {
    path: string;
    content: string | Buffer;
};

export declare type FileAndContentRecord = Record<FileAndContent['path'], FileAndContent['content']>;

declare interface FileSystemAPI {
    readdir(path: string, options: {
        encoding?: BufferEncoding | null;
        withFileTypes: true;
    }): Promise<DirEnt<string>[]>;
    readFile(path: string, encoding?: string): Promise<string>;
}

export declare const findNavigationItem: (items: NavigationItem[], predicate: (item: NavigationItem) => boolean) => NavigationItem | null;

export declare const flatNavigationData: (tree: NavigationItem[]) => NavigationItem[];

export declare function generateZip(files: FileAndContent[]): Promise<Blob>;

export declare function getActivatedRouteSnapshotFromRouter(router: Router): ActivatedRouteSnapshot;

export declare const getBaseUrlAfterRedirects: (url: string, router: Router) => string;

export declare const getNavigationItemsTree: (tree: NavigationItem[], mapFn: (item: NavigationItem) => void) => NavigationItem[];

export declare const GITHUB_CONTENT_URL = "https://github.com/angular/angular/blob/main/adev/src/content/examples/";

export declare function handleHrefClickEventWithRouter(e: Event, router: Router): void;

export declare interface Hierarchy {
    lvl0: string | null;
    lvl1: string | null;
    lvl2: string | null;
    lvl3: string | null;
    lvl4: string | null;
    lvl5: string | null;
    lvl6: string | null;
}

export declare class IconComponent {
    private readonly cdRef;
    get fontSize(): number | null;
    protected readonly MATERIAL_SYMBOLS_OUTLINED = "material-symbols-outlined";
    private static isFontLoaded;
    /** Share the same promise across different instances of the component */
    private static whenFontLoad?;
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "docs-icon", never, {}, {}, never, ["*"], true, never>;
}

/**
 * Convience method for lazy loading an injection token.
 */
export declare function injectAsync<T>(injector: Injector, providerLoader: () => Promise<ProviderToken<T>>): Promise<T>;

export declare const IS_SEARCH_DIALOG_OPEN: InjectionToken<WritableSignal<boolean>>;

export declare const isApple: boolean;

export declare const isExternalLink: (link: string, windowOrigin: string) => boolean;

export declare const isFirefox: boolean;

export declare const isIos: boolean;

export declare const isIpad: boolean;

export declare const isMobile: boolean;

export declare const LOCAL_STORAGE: InjectionToken<Storage | null>;

/** Represents a tutorial config that won't use the embedded editor */
export declare interface LocalTutorialConfig extends TutorialConfigBase {
    type: TutorialType.LOCAL;
    openFiles?: undefined;
    src?: undefined;
    answerSrc?: undefined;
}

export declare const mapNavigationItemsToRoutes: (navigationItems: NavigationItem[], additionalRouteProperties: Partial<Route>) => Route[];

export declare const markExternalLinks: (item: NavigationItem, origin: string) => void;

export declare const MAX_VALUE_PER_FACET = 5;

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
    provide: InjectionToken<readonly (() => void)[]>;
    multi: boolean;
    useValue: () => void;
}[];

export declare interface NavigationItem {
    label?: string;
    path?: string;
    children?: NavigationItem[];
    isExternal?: boolean;
    isExpanded?: boolean;
    level?: number;
    parent?: NavigationItem;
    contentPath?: string;
}

export declare class NavigationList {
    navigationItems: NavigationItem[];
    displayItemsToLevel: number;
    collapsableLevel: number | undefined;
    expandableLevel: number;
    isDropdownView: boolean;
    linkClicked: EventEmitter<void>;
    private readonly navigationState;
    expandedItems: Signal<NavigationItem[]>;
    activeItem: Signal<NavigationItem | null>;
    toggle(item: NavigationItem): void;
    emitClickOnLink(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationList, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationList, "docs-navigation-list", never, { "navigationItems": { "alias": "navigationItems"; "required": true; }; "displayItemsToLevel": { "alias": "displayItemsToLevel"; "required": false; }; "collapsableLevel": { "alias": "collapsableLevel"; "required": false; }; "expandableLevel": { "alias": "expandableLevel"; "required": false; }; "isDropdownView": { "alias": "isDropdownView"; "required": false; }; }, { "linkClicked": "linkClicked"; }, never, never, true, never>;
}

export declare class NavigationState {
    private readonly router;
    private readonly _activeNavigationItem;
    private readonly _expandedItems;
    private readonly _isMobileNavVisible;
    primaryActiveRouteItem: WritableSignal<string | null>;
    activeNavigationItem: Signal<NavigationItem | null>;
    expandedItems: Signal<NavigationItem[]>;
    isMobileNavVisible: Signal<boolean>;
    toggleItem(item: NavigationItem): Promise<void>;
    cleanExpandedState(): void;
    expandItemHierarchy(item: NavigationItem, shouldExpand: (item: NavigationItem) => boolean, skipExpandPredicateFn?: (item: NavigationItem) => boolean): void;
    setActiveNavigationItem(item: NavigationItem | null): void;
    setMobileNavigationListVisibility(isVisible: boolean): void;
    private expand;
    private collapse;
    private navigateToFirstPageOfTheCategory;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationState, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NavigationState>;
}

export declare const normalizePath: (path: string) => string;

export declare interface PackageJson {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
}

export declare type PlaygroundFiles = {
    sourceCode?: FileSystemTree;
    metadata?: TutorialMetadata;
    sourceCodeZip?: undefined;
    route?: PlaygroundRouteData;
};

export declare type PlaygroundRouteData = {
    templates: PlaygroundTemplate[];
    defaultTemplate?: PlaygroundTemplate;
    starterTemplate?: PlaygroundTemplate;
};

export declare type PlaygroundTemplate = Required<Pick<NavigationItem, 'path' | 'label'>>;

export declare const PREVIEWS_COMPONENTS: InjectionToken<CodeExamplesMap>;

export declare const removeTrailingSlash: (url: string) => string;

export declare const RESIZE_EVENT_DELAY = 500;

export declare class Search {
    private readonly _searchQuery;
    private readonly _searchResults;
    private readonly router;
    private readonly config;
    private readonly client;
    private readonly index;
    searchQuery: Signal<string>;
    searchResults: Signal<SearchResult[] | undefined>;
    searchResults$: Observable<SearchResponse<unknown> | undefined>;
    constructor();
    updateSearchQuery(query: string): void;
    private listenToSearchResults;
    private getUniqueSearchResultItems;
    private resetSearchQueryOnNavigationEnd;
    static ɵfac: i0.ɵɵFactoryDeclaration<Search, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Search>;
}

export declare const SEARCH_DELAY = 200;

export declare class SearchDialog implements OnInit, AfterViewInit, OnDestroy {
    onClose: EventEmitter<void>;
    dialog?: ElementRef<HTMLDialogElement>;
    items?: QueryList<SearchItem>;
    private readonly destroyRef;
    private readonly ngZone;
    private readonly search;
    private readonly relativeLink;
    private readonly router;
    private readonly window;
    private keyManager?;
    searchQuery: Signal<string>;
    searchResults: Signal<SearchResult[] | undefined>;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    closeSearchDialog(): void;
    updateSearchQuery(query: string): void;
    private updateActiveItemWhenResultsChanged;
    private navigateToTheActiveItem;
    private scrollToActiveItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchDialog, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchDialog, "docs-search-dialog", never, {}, { "onClose": "onClose"; }, never, never, true, never>;
}

declare class SearchItem implements Highlightable {
    item?: SearchResult;
    disabled: boolean;
    private readonly elementRef;
    private _isActive;
    protected get isActive(): boolean;
    setActiveStyles(): void;
    setInactiveStyles(): void;
    getLabel(): string;
    scrollIntoView(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchItem, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SearchItem, "[docsSearchItem]", never, { "item": { "alias": "item"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}

export declare interface SearchResult {
    url?: string;
    hierarchy?: Hierarchy;
    objectID: string;
}

export declare class Select implements ControlValueAccessor {
    id: string;
    name: string;
    options: SelectOption[];
    disabled: boolean;
    private onChange;
    private onTouched;
    protected readonly selectedOption: WritableSignal<SelectOptionValue | null>;
    writeValue(value: SelectOptionValue): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    setOption($event: SelectOptionValue): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Select, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<Select, "docs-select", never, { "id": { "alias": "selectId"; "required": true; }; "name": { "alias": "name"; "required": true; }; "options": { "alias": "options"; "required": true; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}

export declare interface SelectOption {
    label: string;
    value: SelectOptionValue;
}

declare type SelectOptionValue = string | number | boolean;

export declare function setCookieConsent(state: 'denied' | 'granted'): void;

export declare const shouldReduceMotion: () => boolean;

export declare class SlideToggle implements ControlValueAccessor {
    buttonId: string;
    label: string;
    disabled: boolean;
    private onChange;
    private onTouched;
    protected readonly checked: WritableSignal<boolean>;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SlideToggle, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SlideToggle, "docs-slide-toggle", never, { "buttonId": { "alias": "buttonId"; "required": true; }; "label": { "alias": "label"; "required": true; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}

export declare interface Snippet {
    /** Title of the code snippet */
    title?: string;
    /** Name of the file. */
    name: string;
    /** Content of code snippet */
    content: string;
    /** Text in following format `start-end`. Start and end are numbers, based on them provided range of lines will be displayed in collapsed mode  */
    visibleLinesRange?: string;
}

export declare const STORAGE_KEY = "docs-accepts-cookies";

export declare class TableOfContents {
    contentSourceElement: HTMLElement;
    private readonly scrollSpy;
    private readonly tableOfContentsLoader;
    activeItemId: WritableSignal<string | null>;
    shouldDisplayScrollToTop: Signal<boolean>;
    TableOfContentsLevel: typeof TableOfContentsLevel;
    tableOfContentItems(): TableOfContentsItem[];
    ngAfterViewInit(): void;
    scrollToTop(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableOfContents, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableOfContents, "docs-table-of-contents", never, { "contentSourceElement": { "alias": "contentSourceElement"; "required": true; }; }, {}, never, never, true, never>;
}

/** Represents a table of content item. */
export declare interface TableOfContentsItem {
    /** The url fragment of specific section */
    id: string;
    /** The level of the item. */
    level: TableOfContentsLevel;
    /** The unique title for this document page. */
    title: string;
    /** The top offset px of the heading */
    top: number;
}

export declare enum TableOfContentsLevel {
    H2 = "h2",
    H3 = "h3"
}

export declare class TableOfContentsLoader {
    readonly toleranceThreshold = 40;
    tableOfContentItems: TableOfContentsItem[];
    private readonly document;
    private readonly platformId;
    buildTableOfContent(docElement: Element): void;
    updateHeadingsTopValue(element: HTMLElement): void;
    private getHeadingTitle;
    private getHeadings;
    private calculateTop;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableOfContentsLoader, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TableOfContentsLoader>;
}

export declare class TableOfContentsScrollSpy {
    private readonly destroyRef;
    private readonly tableOfContentsLoader;
    private readonly document;
    private readonly window;
    private readonly ngZone;
    private readonly viewportScroller;
    private readonly injector;
    private contentSourceElement;
    private lastContentWidth;
    activeItemId: WritableSignal<string | null>;
    scrollbarThumbOnTop: WritableSignal<boolean>;
    startListeningToScroll(contentSourceElement: HTMLElement | null): void;
    scrollToTop(): void;
    scrollToSection(id: string): void;
    private offsetToSection;
    private setResizeEventHandlers;
    private updateHeadingsTopAfterResize;
    private setScrollEventHandlers;
    private setActiveItemId;
    private getScrollOffset;
    private getContentWidth;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableOfContentsScrollSpy, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TableOfContentsScrollSpy>;
}

export declare class TextField implements ControlValueAccessor {
    private input?;
    name: string | null;
    placeholder: string | null;
    disabled: boolean;
    hideIcon: boolean;
    autofocus: boolean;
    private onChange;
    private onTouched;
    protected readonly value: WritableSignal<string | null>;
    constructor();
    writeValue(value: string): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
    setValue(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TextField, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TextField, "docs-text-field", never, { "name": { "alias": "name"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "hideIcon": { "alias": "hideIcon"; "required": false; }; "autofocus": { "alias": "autofocus"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Name of an attribute that is set on an element that should be
 * excluded from the `TableOfContentsLoader` lookup. This is needed
 * to exempt SSR'ed content of the `TableOfContents` component from
 * being inspected and accidentally pulling more content into ToC.
 */
export declare const TOC_SKIP_CONTENT_MARKER = "toc-skip-content";

export declare type TutorialConfig = EditorTutorialConfig | LocalTutorialConfig | CliTutorialConfig | EditorOnlyTutorialConfig;

export declare interface TutorialConfigBase {
    type: TutorialType;
    /** The tutorial title */
    title: string;
    /** The name of the tutorial folder that will be started after the current one ends. */
    nextTutorial?: string;
    /** The path to the tutorial src folder when it's external to the tutorial */
    src?: string;
    /** The path to the tutorial answer folder when it's external to the tutorial */
    answerSrc?: string;
    /** An array of files to be open in the editor */
    openFiles?: string[];
}

/**
 * Represents the contents of the tutorial files to be generated by the build script
 */
export declare type TutorialFiles = {
    sourceCode?: FileSystemTree;
    metadata?: TutorialMetadata;
    sourceCodeZip?: Buffer;
    route?: Omit<TutorialNavigationItemWithStep, 'path'>;
};

/** Represents the contents of the tutorial config file */
export declare type TutorialMetadata = {
    type: TutorialConfig['type'];
    /** a record of all tutorials filenames and its contents */
    tutorialFiles: FileAndContentRecord;
    /** a record of filenames and contents for the tutorial answer */
    answerFiles?: FileAndContentRecord;
    /** files that are part of the project but are not visible in the code editor */
    hiddenFiles: string[];
    /**
     * All files in the project, used to find the difference between new and old projects
     * when changing projects
     */
    allFiles: string[];
    openFiles: NonNullable<TutorialConfig['openFiles']>;
    /** whether a package.json exists */
    dependencies?: Record<string, string>;
};

export declare type TutorialNavigationData = {
    type: TutorialConfig['type'];
    title: TutorialConfig['title'];
    nextStep?: string;
    previousStep?: string;
    nextTutorial?: string;
    sourceCodeZipPath?: string;
};

export declare type TutorialNavigationItem = {
    path: NonNullable<NavigationItem['path']>;
    label: NonNullable<NavigationItem['label']>;
    children?: TutorialNavigationItem[];
    parent?: TutorialNavigationItem;
    contentPath?: string;
    tutorialData: TutorialNavigationData;
};

/** the step is used only in this function to sort the nav items */
export declare type TutorialNavigationItemWithStep = TutorialNavigationItem & {
    tutorialData: TutorialNavigationData & {
        step: TutorialStep['step'];
    };
};

export declare type TutorialStep = {
    step: number;
    name: string;
    path: string;
    url: string;
    nextStep?: TutorialStep['url'];
    previousStep?: TutorialStep['url'];
    nextTutorial?: string;
};

export declare const enum TutorialType {
    CLI = "cli",
    LOCAL = "local",
    EDITOR = "editor",
    EDITOR_ONLY = "editor-only"
}

export declare const WEBGL_LOADED_DELAY = 250;

export declare const WINDOW: InjectionToken<Window>;

export declare function windowProvider(document: Document): (Window & typeof globalThis) | null;

export { }
