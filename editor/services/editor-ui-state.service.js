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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, Subject } from 'rxjs';
import { EmbeddedTutorialManager } from './embedded-tutorial-manager.service.js';
export const DEFAULT_EDITOR_UI_STATE = {
    displayOnlyInteractiveTerminal: false,
};
let EditorUiState = class EditorUiState {
    constructor() {
        this.embeddedTutorialManager = inject(EmbeddedTutorialManager);
        this.destroyRef = inject(DestroyRef);
        this.stateChanged = new Subject();
        this.stateChanged$ = this.stateChanged.asObservable();
        this.uiState = signal(DEFAULT_EDITOR_UI_STATE);
        this.handleTutorialChange();
    }
    patchState(patch) {
        this.uiState.update((state) => ({ ...state, ...patch }));
        this.stateChanged.next();
    }
    handleTutorialChange() {
        this.embeddedTutorialManager.tutorialChanged$
            .pipe(map(() => this.embeddedTutorialManager.type()), filter((tutorialType) => Boolean(tutorialType)), takeUntilDestroyed(this.destroyRef))
            .subscribe((tutorialType) => {
            if (tutorialType === "cli" /* TutorialType.CLI */) {
                this.patchState({ displayOnlyInteractiveTerminal: true });
            }
            else {
                this.patchState(DEFAULT_EDITOR_UI_STATE);
            }
        });
    }
};
EditorUiState = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], EditorUiState);
export { EditorUiState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLXVpLXN0YXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9zZXJ2aWNlcy9lZGl0b3ItdWktc3RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQzlELE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUkxQyxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUsvRSxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBd0I7SUFDMUQsOEJBQThCLEVBQUUsS0FBSztDQUN0QyxDQUFDO0FBR0ssSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQVN4QjtRQVJpQiw0QkFBdUIsR0FBRyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMxRCxlQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUVwRCxrQkFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsWUFBTyxHQUFHLE1BQU0sQ0FBc0IsdUJBQXVCLENBQUMsQ0FBQztRQUc3RCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQW1DO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sb0JBQW9CO1FBQzFCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0I7YUFDMUMsSUFBSSxDQUNILEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDOUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUE0QyxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQ3pGLGtCQUFrQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDcEM7YUFDQSxTQUFTLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUMxQixJQUFJLFlBQVksaUNBQXFCLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFDLDhCQUE4QixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDMUQsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0YsQ0FBQTtBQWpDWSxhQUFhO0lBRHpCLFVBQVUsRUFBRTs7R0FDQSxhQUFhLENBaUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEZXN0cm95UmVmLCBpbmplY3QsIEluamVjdGFibGUsIHNpZ25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3Rha2VVbnRpbERlc3Ryb3llZH0gZnJvbSAnQGFuZ3VsYXIvY29yZS9yeGpzLWludGVyb3AnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7VHV0b3JpYWxNZXRhZGF0YSwgVHV0b3JpYWxUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2luZGV4LmpzJztcblxuaW1wb3J0IHtFbWJlZGRlZFR1dG9yaWFsTWFuYWdlcn0gZnJvbSAnLi9lbWJlZGRlZC10dXRvcmlhbC1tYW5hZ2VyLnNlcnZpY2UuanMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEVkaXRvclVpU3RhdGVDb25maWcge1xuICBkaXNwbGF5T25seUludGVyYWN0aXZlVGVybWluYWw6IGJvb2xlYW47XG59XG5leHBvcnQgY29uc3QgREVGQVVMVF9FRElUT1JfVUlfU1RBVEU6IEVkaXRvclVpU3RhdGVDb25maWcgPSB7XG4gIGRpc3BsYXlPbmx5SW50ZXJhY3RpdmVUZXJtaW5hbDogZmFsc2UsXG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRWRpdG9yVWlTdGF0ZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgZW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIgPSBpbmplY3QoRW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIpO1xuICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3lSZWYgPSBpbmplY3QoRGVzdHJveVJlZik7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdGF0ZUNoYW5nZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHN0YXRlQ2hhbmdlZCQgPSB0aGlzLnN0YXRlQ2hhbmdlZC5hc09ic2VydmFibGUoKTtcbiAgdWlTdGF0ZSA9IHNpZ25hbDxFZGl0b3JVaVN0YXRlQ29uZmlnPihERUZBVUxUX0VESVRPUl9VSV9TVEFURSk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oYW5kbGVUdXRvcmlhbENoYW5nZSgpO1xuICB9XG5cbiAgcGF0Y2hTdGF0ZShwYXRjaDogUGFydGlhbDxFZGl0b3JVaVN0YXRlQ29uZmlnPik6IHZvaWQge1xuICAgIHRoaXMudWlTdGF0ZS51cGRhdGUoKHN0YXRlKSA9PiAoey4uLnN0YXRlLCAuLi5wYXRjaH0pKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlZC5uZXh0KCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVR1dG9yaWFsQ2hhbmdlKCkge1xuICAgIHRoaXMuZW1iZWRkZWRUdXRvcmlhbE1hbmFnZXIudHV0b3JpYWxDaGFuZ2VkJFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoKSA9PiB0aGlzLmVtYmVkZGVkVHV0b3JpYWxNYW5hZ2VyLnR5cGUoKSksXG4gICAgICAgIGZpbHRlcigodHV0b3JpYWxUeXBlKTogdHV0b3JpYWxUeXBlIGlzIFR1dG9yaWFsTWV0YWRhdGFbJ3R5cGUnXSA9PiBCb29sZWFuKHR1dG9yaWFsVHlwZSkpLFxuICAgICAgICB0YWtlVW50aWxEZXN0cm95ZWQodGhpcy5kZXN0cm95UmVmKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHR1dG9yaWFsVHlwZSkgPT4ge1xuICAgICAgICBpZiAodHV0b3JpYWxUeXBlID09PSBUdXRvcmlhbFR5cGUuQ0xJKSB7XG4gICAgICAgICAgdGhpcy5wYXRjaFN0YXRlKHtkaXNwbGF5T25seUludGVyYWN0aXZlVGVybWluYWw6IHRydWV9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhdGNoU3RhdGUoREVGQVVMVF9FRElUT1JfVUlfU1RBVEUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19