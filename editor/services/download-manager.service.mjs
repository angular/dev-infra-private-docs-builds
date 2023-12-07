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
import { generateZip } from '../../utils/index.js';
import { injectAsync } from '../../services/index.js';
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
        const nodeRuntimeSandbox = await injectAsync(this.environmentInjector, () => import('./node-runtime-sandbox.service.js').then((c) => c.NodeRuntimeSandbox));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWQtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZG9jcy9lZGl0b3Ivc2VydmljZXMvZG93bmxvYWQtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUs3QyxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBQXJCO1FBQ1ksYUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1Qix3QkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNsRCxlQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBaUNwRCxDQUFDO0lBL0JDOztPQUVHO0lBQ0gsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLElBQVk7UUFDbEQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQzFFLE1BQU0sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQzlFLENBQUM7UUFFRixNQUFNLEtBQUssR0FBRyxNQUFNLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxRQUFRLENBQUMsU0FBcUIsRUFBRSxJQUFZO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN4QyxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMvQixJQUFJLEVBQUUsaUJBQWlCO1NBQ3hCLENBQUMsQ0FBQztRQUNILE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFJLE1BQU0sQ0FBQztRQUVoQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztDQUNGLENBQUE7QUFwQ1ksZUFBZTtJQUgzQixVQUFVLENBQUM7UUFDVixVQUFVLEVBQUUsTUFBTTtLQUNuQixDQUFDO0dBQ1csZUFBZSxDQW9DM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtFbnZpcm9ubWVudEluamVjdG9yLCBJbmplY3RhYmxlLCBQTEFURk9STV9JRCwgaW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Z2VuZXJhdGVaaXB9IGZyb20gJy4uLy4uL3V0aWxzL2luZGV4LmpzJztcbmltcG9ydCB7aW5qZWN0QXN5bmN9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2luZGV4LmpzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIERvd25sb2FkTWFuYWdlciB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZG9jdW1lbnQgPSBpbmplY3QoRE9DVU1FTlQpO1xuICBwcml2YXRlIHJlYWRvbmx5IGVudmlyb25tZW50SW5qZWN0b3IgPSBpbmplY3QoRW52aXJvbm1lbnRJbmplY3Rvcik7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGxhdGZvcm1JZCA9IGluamVjdChQTEFURk9STV9JRCk7XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIFpJUCB3aXRoIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBzb2x1dGlvbiBpbiB0aGUgRW1iZWRkZWRFZGl0b3JcbiAgICovXG4gIGFzeW5jIGRvd25sb2FkQ3VycmVudFN0YXRlT2ZUaGVTb2x1dGlvbihuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBub2RlUnVudGltZVNhbmRib3ggPSBhd2FpdCBpbmplY3RBc3luYyh0aGlzLmVudmlyb25tZW50SW5qZWN0b3IsICgpID0+XG4gICAgICBpbXBvcnQoJy4vbm9kZS1ydW50aW1lLXNhbmRib3guc2VydmljZS5qcycpLnRoZW4oKGMpID0+IGMuTm9kZVJ1bnRpbWVTYW5kYm94KSxcbiAgICApO1xuXG4gICAgY29uc3QgZmlsZXMgPSBhd2FpdCBub2RlUnVudGltZVNhbmRib3guZ2V0U29sdXRpb25GaWxlcygpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBnZW5lcmF0ZVppcChmaWxlcyk7XG5cbiAgICB0aGlzLnNhdmVGaWxlKFtjb250ZW50XSwgbmFtZSk7XG4gIH1cblxuICBwcml2YXRlIHNhdmVGaWxlKGJsb2JQYXJ0czogQmxvYlBhcnRbXSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKGJsb2JQYXJ0cywge1xuICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL3ppcCcsXG4gICAgfSk7XG4gICAgY29uc3QgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICBjb25zdCBhbmNob3IgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhbmNob3IuaHJlZiA9IHVybDtcbiAgICBhbmNob3IuZG93bmxvYWQgPSBgJHtuYW1lfS56aXBgO1xuXG4gICAgYW5jaG9yLmNsaWNrKCk7XG4gICAgYW5jaG9yLnJlbW92ZSgpO1xuICB9XG59XG4iXX0=