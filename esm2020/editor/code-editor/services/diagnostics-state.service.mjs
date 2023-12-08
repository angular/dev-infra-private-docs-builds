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
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
let DiagnosticsState = class DiagnosticsState {
    constructor() {
        this._diagnostics$ = new BehaviorSubject([]);
        // TODO: use signals when zoneless will be turned off
        this.diagnostics$ = this._diagnostics$.asObservable().pipe(distinctUntilChanged());
    }
    setDiagnostics(diagnostics) {
        this._diagnostics$.next(diagnostics);
    }
};
DiagnosticsState = __decorate([
    Injectable({
        providedIn: 'root',
    })
], DiagnosticsState);
export { DiagnosticsState };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhZ25vc3RpY3Mtc3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL2NvZGUtZWRpdG9yL3NlcnZpY2VzL2RpYWdub3N0aWNzLXN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUMsZUFBZSxFQUFFLG9CQUFvQixFQUFDLE1BQU0sTUFBTSxDQUFDO0FBVXBELElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWdCO0lBQXRCO1FBQ1ksa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBMkIsRUFBRSxDQUFDLENBQUM7UUFFbkYscURBQXFEO1FBQ3JELGlCQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0lBS2hGLENBQUM7SUFIQyxjQUFjLENBQUMsV0FBcUM7UUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGLENBQUE7QUFUWSxnQkFBZ0I7SUFINUIsVUFBVSxDQUFDO1FBQ1YsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQztHQUNXLGdCQUFnQixDQVM1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlhZ25vc3RpY30gZnJvbSAnQGNvZGVtaXJyb3IvbGludCc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgZGlzdGluY3RVbnRpbENoYW5nZWR9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpYWdub3N0aWNXaXRoTG9jYXRpb24gZXh0ZW5kcyBEaWFnbm9zdGljIHtcbiAgbGluZU51bWJlcjogbnVtYmVyO1xuICBjaGFyYWN0ZXJQb3NpdGlvbjogbnVtYmVyO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRGlhZ25vc3RpY3NTdGF0ZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2RpYWdub3N0aWNzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGlhZ25vc3RpY1dpdGhMb2NhdGlvbltdPihbXSk7XG5cbiAgLy8gVE9ETzogdXNlIHNpZ25hbHMgd2hlbiB6b25lbGVzcyB3aWxsIGJlIHR1cm5lZCBvZmZcbiAgZGlhZ25vc3RpY3MkID0gdGhpcy5fZGlhZ25vc3RpY3MkLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgc2V0RGlhZ25vc3RpY3MoZGlhZ25vc3RpY3M6IERpYWdub3N0aWNXaXRoTG9jYXRpb25bXSk6IHZvaWQge1xuICAgIHRoaXMuX2RpYWdub3N0aWNzJC5uZXh0KGRpYWdub3N0aWNzKTtcbiAgfVxufVxuIl19