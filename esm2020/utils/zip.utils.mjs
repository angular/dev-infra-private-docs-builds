/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
// TODO(josephperrott): Determine how we can load the fflate package dynamically again.
import { zip, strToU8 } from 'fflate';
export async function generateZip(files) {
    const filesObj = {};
    files.forEach(({ path, content }) => {
        filesObj[path] = typeof content === 'string' ? strToU8(content) : content;
    });
    return new Promise((resolve, reject) => {
        zip(filesObj, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwLnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZG9jcy91dGlscy96aXAudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBSUgsdUZBQXVGO0FBQ3ZGLE9BQU8sRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxLQUFLLFVBQVUsV0FBVyxDQUFDLEtBQXVCO0lBQ3ZELE1BQU0sUUFBUSxHQUErQixFQUFFLENBQUM7SUFDaEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFFLEVBQUU7UUFDaEMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDNUUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDUixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmRldi9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtGaWxlQW5kQ29udGVudH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5cbi8vIFRPRE8oam9zZXBocGVycm90dCk6IERldGVybWluZSBob3cgd2UgY2FuIGxvYWQgdGhlIGZmbGF0ZSBwYWNrYWdlIGR5bmFtaWNhbGx5IGFnYWluLlxuaW1wb3J0IHt6aXAsIHN0clRvVTh9IGZyb20gJ2ZmbGF0ZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVppcChmaWxlczogRmlsZUFuZENvbnRlbnRbXSk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICBjb25zdCBmaWxlc09iajogUmVjb3JkPHN0cmluZywgVWludDhBcnJheT4gPSB7fTtcbiAgZmlsZXMuZm9yRWFjaCgoe3BhdGgsIGNvbnRlbnR9KSA9PiB7XG4gICAgZmlsZXNPYmpbcGF0aF0gPSB0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycgPyBzdHJUb1U4KGNvbnRlbnQpIDogY29udGVudDtcbiAgfSk7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB6aXAoZmlsZXNPYmosIChlcnIsIGRhdGEpID0+IHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==