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
export const ALLOWED_COMMAND_PREFIXES = [
    'ng serve',
    'ng s',
    'ng generate',
    'ng g',
    'ng version',
    'ng v',
    'ng update',
    'ng test',
    'ng t',
    'ng e2e',
    'ng e',
    'ng add',
    'ng config',
    'ng new',
];
let CommandValidator = class CommandValidator {
    // Method return true when the provided command is allowed to execute, otherwise return false.
    validate(command) {
        return ALLOWED_COMMAND_PREFIXES.some((prefix) => prefix === command || command.startsWith(`${prefix} `));
    }
};
CommandValidator = __decorate([
    Injectable({ providedIn: 'root' })
], CommandValidator);
export { CommandValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC12YWxpZGF0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL3NlcnZpY2VzL2NvbW1hbmQtdmFsaWRhdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV6QyxNQUFNLENBQUMsTUFBTSx3QkFBd0IsR0FBRztJQUN0QyxVQUFVO0lBQ1YsTUFBTTtJQUNOLGFBQWE7SUFDYixNQUFNO0lBQ04sWUFBWTtJQUNaLE1BQU07SUFDTixXQUFXO0lBQ1gsU0FBUztJQUNULE1BQU07SUFDTixRQUFRO0lBQ1IsTUFBTTtJQUNOLFFBQVE7SUFDUixXQUFXO0lBQ1gsUUFBUTtDQUNULENBQUM7QUFHSyxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFnQjtJQUMzQiw4RkFBOEY7SUFDOUYsUUFBUSxDQUFDLE9BQWU7UUFDdEIsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQ2xDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEtBQUssT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUNuRSxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFQWSxnQkFBZ0I7SUFENUIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO0dBQ3BCLGdCQUFnQixDQU81QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IEFMTE9XRURfQ09NTUFORF9QUkVGSVhFUyA9IFtcbiAgJ25nIHNlcnZlJyxcbiAgJ25nIHMnLFxuICAnbmcgZ2VuZXJhdGUnLFxuICAnbmcgZycsXG4gICduZyB2ZXJzaW9uJyxcbiAgJ25nIHYnLFxuICAnbmcgdXBkYXRlJyxcbiAgJ25nIHRlc3QnLFxuICAnbmcgdCcsXG4gICduZyBlMmUnLFxuICAnbmcgZScsXG4gICduZyBhZGQnLFxuICAnbmcgY29uZmlnJyxcbiAgJ25nIG5ldycsXG5dO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBDb21tYW5kVmFsaWRhdG9yIHtcbiAgLy8gTWV0aG9kIHJldHVybiB0cnVlIHdoZW4gdGhlIHByb3ZpZGVkIGNvbW1hbmQgaXMgYWxsb3dlZCB0byBleGVjdXRlLCBvdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICB2YWxpZGF0ZShjb21tYW5kOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQUxMT1dFRF9DT01NQU5EX1BSRUZJWEVTLnNvbWUoXG4gICAgICAocHJlZml4KSA9PiBwcmVmaXggPT09IGNvbW1hbmQgfHwgY29tbWFuZC5zdGFydHNXaXRoKGAke3ByZWZpeH0gYCksXG4gICAgKTtcbiAgfVxufVxuIl19