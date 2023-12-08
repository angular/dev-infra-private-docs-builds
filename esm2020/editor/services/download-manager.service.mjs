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
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { EnvironmentInjector, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { generateZip } from '../../utils/index';
// TODO(josephperrott): Determine how we can load the sandbox dynamically again.
import { NodeRuntimeSandbox } from './node-runtime-sandbox.service';
let DownloadManager = class DownloadManager {
    constructor() {
        this.document = inject(DOCUMENT);
        this.environmentInjector = inject(EnvironmentInjector);
        this.platformId = inject(PLATFORM_ID);
    }
    /**
     * Generate ZIP with the current state of the solution in the EmbeddedEditor
     */
    async downloadCurrentStateOfTheSolution(name) {
        const nodeRuntimeSandbox = inject(NodeRuntimeSandbox);
        const files = await nodeRuntimeSandbox.getSolutionFiles();
        const content = await generateZip(files);
        this.saveFile([content], name);
    }
    saveFile(blobParts, name) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const blob = new Blob(blobParts, {
            type: 'application/zip',
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = this.document.createElement('a');
        anchor.href = url;
        anchor.download = `${name}.zip`;
        anchor.click();
        anchor.remove();
    }
};
DownloadManager = __decorate([
    Injectable({
        providedIn: 'root',
    })
], DownloadManager);
export { DownloadManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3Ivc2VydmljZXMvZG93bmxvYWQtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTlDLGdGQUFnRjtBQUNoRixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUszRCxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBQXJCO1FBQ1ksYUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1Qix3QkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNsRCxlQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBK0JwRCxDQUFDO0lBN0JDOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLElBQVk7UUFDbEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUV0RCxNQUFNLEtBQUssR0FBRyxNQUFNLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxRQUFRLENBQUMsU0FBcUIsRUFBRSxJQUFZO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QyxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMvQixJQUFJLEVBQUUsaUJBQWlCO1NBQ3hCLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQztRQUVoQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNGLENBQUE7QUFsQ1ksZUFBZTtJQUgzQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csZUFBZSxDQWtDM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFbnZpcm9ubWVudEluamVjdG9yLCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Z2VuZXJhdGVaaXB9IGZyb20gJy4uLy4uL3V0aWxzL2luZGV4JztcblxuLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogRGV0ZXJtaW5lIGhvdyB3ZSBjYW4gbG9hZCB0aGUgc2FuZGJveCBkeW5hbWljYWxseSBhZ2Fpbi5cbmltcG9ydCB7Tm9kZVJ1bnRpbWVTYW5kYm94fSBmcm9tICcuL25vZGUtcnVudGltZS1zYW5kYm94LnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRG93bmxvYWRNYW5hZ2VyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBkb2N1bWVudCA9IGluamVjdChET0NVTUVOVCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgZW52aXJvbm1lbnRJbmplY3RvciA9IGluamVjdChFbnZpcm9ubWVudEluamVjdG9yKTtcbiAgcHJpdmF0ZSByZWFkb25seSBwbGF0Zm9ybUlkID0gaW5qZWN0KFBMQVRGT1JNX0lEKTtcblxuICAvKipcbiAgICogR2VuZXJhdGUgWklQIHdpdGggdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHNvbHV0aW9uIGluIHRoZSBFbWJlZGRlZEVkaXRvclxuICAgKi9cbiAgYXN5bmMgZG93bmxvYWRDdXJyZW50U3RhdGVPZlRoZVNvbHV0aW9uKG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IG5vZGVSdW50aW1lU2FuZGJveCA9IGluamVjdChOb2RlUnVudGltZVNhbmRib3gpO1xuXG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCBub2RlUnVudGltZVNhbmRib3guZ2V0U29sdXRpb25GaWxlcygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBnZW5lcmF0ZVppcChmaWxlcyk7XG5cbiAgICB0aGlzLnNhdmVGaWxlKFtjb250ZW50XSwgbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIHNhdmVGaWxlKGJsb2JQYXJ0czogQmxvYlBhcnRbXSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKGJsb2JQYXJ0cywge1xuICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL3ppcCcsXG4gICAgfSk7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICBjb25zdCBhbmNob3IgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhbmNob3IuaHJlZiA9IHVybDtcbiAgICBhbmNob3IuZG93bmxvYWQgPSBgJHtuYW1lfS56aXBgO1xuXG4gICAgYW5jaG9yLmNsaWNrKCk7XG4gICAgYW5jaG9yLnJlbW92ZSgpO1xuICB9XG59XG4iXX0=