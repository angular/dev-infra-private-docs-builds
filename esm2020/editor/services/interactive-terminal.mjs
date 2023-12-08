/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Terminal } from 'xterm';
import { WINDOW } from '../../providers/index';
import { CommandValidator } from './command-validator.service';
export const NOT_VALID_COMMAND_MSG = 'Angular Documentation - Not allowed command!';
export const ALLOWED_KEYS = [
    // Allow Backspace to delete what was typed
    'Backspace',
    // Allow ArrowUp to interact with CLI
    'ArrowUp',
    // Allow ArrowDown to interact with CLI
    'ArrowDown',
];
export class InteractiveTerminal extends Terminal {
    constructor() {
        super({ convertEol: true, disableStdin: false });
        this.window = inject(WINDOW);
        this.commandValidator = inject(CommandValidator);
        this.breakProcess = new Subject();
        // Using this stream, the webcontainer shell can break current process.
        this.breakProcess$ = this.breakProcess.asObservable();
        // bypass command validation if sudo=true is present in the query string
        if (this.window.location.search.includes('sudo=true')) {
            return;
        }
        this.handleCommandExecution();
    }
    breakCurrentProcess() {
        this.breakProcess.next();
    }
    // Method validate if provided command by user is on the list of the allowed commands.
    // If so, then command is executed, otherwise error message is displayed in the terminal.
    handleCommandExecution() {
        const commandLinePrefix = '❯';
        const xtermRed = '\x1b[1;31m';
        this.attachCustomKeyEventHandler((event) => {
            if (ALLOWED_KEYS.includes(event.key)) {
                return true;
            }
            // While user is typing, then do not validate command.
            if (['keydown', 'keyup'].includes(event.type)) {
                return false;
            }
            // When user pressed enter, then verify if command is on the list of the allowed ones.
            if (event.key === 'Enter') {
                // Xterm does not have API to receive current text/command.
                // In that case we can read it using DOM methods.
                // As command to execute we can treat the last line in terminal which starts with '❯'.
                // Hack: excluding `.xterm-fg-6` is required to run i.e `ng e2e`, `ng add @angular/material`.
                // Some steps with selecting options also starts with '❯'.
                let terminalContent = Array.from(this.element.querySelectorAll('.xterm-rows>div'))
                    .map((lines) => Array.from(lines.querySelectorAll('span:not(.xterm-fg-6)'))
                    .map((part) => part.textContent)
                    .join('')
                    .trim())
                    .filter((line) => !!line && line.startsWith(commandLinePrefix));
                let command = terminalContent.length > 0
                    ? terminalContent[terminalContent.length - 1].replace(commandLinePrefix, '').trim()
                    : '';
                // If command exist and is invalid, then write line with error message and block execution.
                if (command && !this.commandValidator.validate(command)) {
                    this.writeln(`\n${xtermRed}${NOT_VALID_COMMAND_MSG}`);
                    this.breakCurrentProcess();
                    return false;
                }
            }
            return true;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUtdGVybWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9kb2NzL2VkaXRvci9zZXJ2aWNlcy9pbnRlcmFjdGl2ZS10ZXJtaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFFN0QsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsOENBQThDLENBQUM7QUFDcEYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFnQztJQUN2RCwyQ0FBMkM7SUFDM0MsV0FBVztJQUNYLHFDQUFxQztJQUNyQyxTQUFTO0lBQ1QsdUNBQXVDO0lBQ3ZDLFdBQVc7Q0FDWixDQUFDO0FBRUYsTUFBTSxPQUFPLG1CQUFvQixTQUFRLFFBQVE7SUFTL0M7UUFDRSxLQUFLLENBQUMsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBVGhDLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIscUJBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFNUMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBRXBELHVFQUF1RTtRQUN2RSxrQkFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFLL0Msd0VBQXdFO1FBQ3hFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1lBQ3RELE9BQU87UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxzRkFBc0Y7SUFDdEYseUZBQXlGO0lBQ2pGLHNCQUFzQjtRQUM1QixNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUM5QixNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUM7UUFFOUIsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDekMsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNyQyxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxzREFBc0Q7WUFDdEQsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzlDLE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztZQUVELHNGQUFzRjtZQUN0RixJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQzFCLDJEQUEyRDtnQkFDM0QsaURBQWlEO2dCQUNqRCxzRkFBc0Y7Z0JBQ3RGLDZGQUE2RjtnQkFDN0YsMERBQTBEO2dCQUMxRCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFRLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztxQkFDaEYsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDYixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3FCQUN4RCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7cUJBQy9CLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQ1IsSUFBSSxFQUFFLENBQ1Y7cUJBQ0EsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUVsRSxJQUFJLE9BQU8sR0FDVCxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ3hCLENBQUMsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFO29CQUNuRixDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUVULDJGQUEyRjtnQkFDM0YsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ3hELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLEdBQUcscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFDM0IsT0FBTyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge2luamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtUZXJtaW5hbH0gZnJvbSAneHRlcm0nO1xuXG5pbXBvcnQge1dJTkRPV30gZnJvbSAnLi4vLi4vcHJvdmlkZXJzL2luZGV4JztcblxuaW1wb3J0IHtDb21tYW5kVmFsaWRhdG9yfSBmcm9tICcuL2NvbW1hbmQtdmFsaWRhdG9yLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgTk9UX1ZBTElEX0NPTU1BTkRfTVNHID0gJ0FuZ3VsYXIgRG9jdW1lbnRhdGlvbiAtIE5vdCBhbGxvd2VkIGNvbW1hbmQhJztcbmV4cG9ydCBjb25zdCBBTExPV0VEX0tFWVM6IEFycmF5PEtleWJvYXJkRXZlbnRbJ2tleSddPiA9IFtcbiAgLy8gQWxsb3cgQmFja3NwYWNlIHRvIGRlbGV0ZSB3aGF0IHdhcyB0eXBlZFxuICAnQmFja3NwYWNlJyxcbiAgLy8gQWxsb3cgQXJyb3dVcCB0byBpbnRlcmFjdCB3aXRoIENMSVxuICAnQXJyb3dVcCcsXG4gIC8vIEFsbG93IEFycm93RG93biB0byBpbnRlcmFjdCB3aXRoIENMSVxuICAnQXJyb3dEb3duJyxcbl07XG5cbmV4cG9ydCBjbGFzcyBJbnRlcmFjdGl2ZVRlcm1pbmFsIGV4dGVuZHMgVGVybWluYWwge1xuICBwcml2YXRlIHJlYWRvbmx5IHdpbmRvdyA9IGluamVjdChXSU5ET1cpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbW1hbmRWYWxpZGF0b3IgPSBpbmplY3QoQ29tbWFuZFZhbGlkYXRvcik7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBicmVha1Byb2Nlc3MgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8vIFVzaW5nIHRoaXMgc3RyZWFtLCB0aGUgd2ViY29udGFpbmVyIHNoZWxsIGNhbiBicmVhayBjdXJyZW50IHByb2Nlc3MuXG4gIGJyZWFrUHJvY2VzcyQgPSB0aGlzLmJyZWFrUHJvY2Vzcy5hc09ic2VydmFibGUoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7Y29udmVydEVvbDogdHJ1ZSwgZGlzYWJsZVN0ZGluOiBmYWxzZX0pO1xuXG4gICAgLy8gYnlwYXNzIGNvbW1hbmQgdmFsaWRhdGlvbiBpZiBzdWRvPXRydWUgaXMgcHJlc2VudCBpbiB0aGUgcXVlcnkgc3RyaW5nXG4gICAgaWYgKHRoaXMud2luZG93LmxvY2F0aW9uLnNlYXJjaC5pbmNsdWRlcygnc3Vkbz10cnVlJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVDb21tYW5kRXhlY3V0aW9uKCk7XG4gIH1cblxuICBicmVha0N1cnJlbnRQcm9jZXNzKCk6IHZvaWQge1xuICAgIHRoaXMuYnJlYWtQcm9jZXNzLm5leHQoKTtcbiAgfVxuXG4gIC8vIE1ldGhvZCB2YWxpZGF0ZSBpZiBwcm92aWRlZCBjb21tYW5kIGJ5IHVzZXIgaXMgb24gdGhlIGxpc3Qgb2YgdGhlIGFsbG93ZWQgY29tbWFuZHMuXG4gIC8vIElmIHNvLCB0aGVuIGNvbW1hbmQgaXMgZXhlY3V0ZWQsIG90aGVyd2lzZSBlcnJvciBtZXNzYWdlIGlzIGRpc3BsYXllZCBpbiB0aGUgdGVybWluYWwuXG4gIHByaXZhdGUgaGFuZGxlQ29tbWFuZEV4ZWN1dGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBjb21tYW5kTGluZVByZWZpeCA9ICfina8nO1xuICAgIGNvbnN0IHh0ZXJtUmVkID0gJ1xceDFiWzE7MzFtJztcblxuICAgIHRoaXMuYXR0YWNoQ3VzdG9tS2V5RXZlbnRIYW5kbGVyKChldmVudCkgPT4ge1xuICAgICAgaWYgKEFMTE9XRURfS0VZUy5pbmNsdWRlcyhldmVudC5rZXkpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGlsZSB1c2VyIGlzIHR5cGluZywgdGhlbiBkbyBub3QgdmFsaWRhdGUgY29tbWFuZC5cbiAgICAgIGlmIChbJ2tleWRvd24nLCAna2V5dXAnXS5pbmNsdWRlcyhldmVudC50eXBlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gdXNlciBwcmVzc2VkIGVudGVyLCB0aGVuIHZlcmlmeSBpZiBjb21tYW5kIGlzIG9uIHRoZSBsaXN0IG9mIHRoZSBhbGxvd2VkIG9uZXMuXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIC8vIFh0ZXJtIGRvZXMgbm90IGhhdmUgQVBJIHRvIHJlY2VpdmUgY3VycmVudCB0ZXh0L2NvbW1hbmQuXG4gICAgICAgIC8vIEluIHRoYXQgY2FzZSB3ZSBjYW4gcmVhZCBpdCB1c2luZyBET00gbWV0aG9kcy5cbiAgICAgICAgLy8gQXMgY29tbWFuZCB0byBleGVjdXRlIHdlIGNhbiB0cmVhdCB0aGUgbGFzdCBsaW5lIGluIHRlcm1pbmFsIHdoaWNoIHN0YXJ0cyB3aXRoICfina8nLlxuICAgICAgICAvLyBIYWNrOiBleGNsdWRpbmcgYC54dGVybS1mZy02YCBpcyByZXF1aXJlZCB0byBydW4gaS5lIGBuZyBlMmVgLCBgbmcgYWRkIEBhbmd1bGFyL21hdGVyaWFsYC5cbiAgICAgICAgLy8gU29tZSBzdGVwcyB3aXRoIHNlbGVjdGluZyBvcHRpb25zIGFsc28gc3RhcnRzIHdpdGggJ+KdrycuXG4gICAgICAgIGxldCB0ZXJtaW5hbENvbnRlbnQgPSBBcnJheS5mcm9tKHRoaXMuZWxlbWVudCEucXVlcnlTZWxlY3RvckFsbCgnLnh0ZXJtLXJvd3M+ZGl2JykpXG4gICAgICAgICAgLm1hcCgobGluZXMpID0+XG4gICAgICAgICAgICBBcnJheS5mcm9tKGxpbmVzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW46bm90KC54dGVybS1mZy02KScpKVxuICAgICAgICAgICAgICAubWFwKChwYXJ0KSA9PiBwYXJ0LnRleHRDb250ZW50KVxuICAgICAgICAgICAgICAuam9pbignJylcbiAgICAgICAgICAgICAgLnRyaW0oKSxcbiAgICAgICAgICApXG4gICAgICAgICAgLmZpbHRlcigobGluZSkgPT4gISFsaW5lICYmIGxpbmUuc3RhcnRzV2l0aChjb21tYW5kTGluZVByZWZpeCkpO1xuXG4gICAgICAgIGxldCBjb21tYW5kID1cbiAgICAgICAgICB0ZXJtaW5hbENvbnRlbnQubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyB0ZXJtaW5hbENvbnRlbnRbdGVybWluYWxDb250ZW50Lmxlbmd0aCAtIDFdLnJlcGxhY2UoY29tbWFuZExpbmVQcmVmaXgsICcnKS50cmltKClcbiAgICAgICAgICAgIDogJyc7XG5cbiAgICAgICAgLy8gSWYgY29tbWFuZCBleGlzdCBhbmQgaXMgaW52YWxpZCwgdGhlbiB3cml0ZSBsaW5lIHdpdGggZXJyb3IgbWVzc2FnZSBhbmQgYmxvY2sgZXhlY3V0aW9uLlxuICAgICAgICBpZiAoY29tbWFuZCAmJiAhdGhpcy5jb21tYW5kVmFsaWRhdG9yLnZhbGlkYXRlKGNvbW1hbmQpKSB7XG4gICAgICAgICAgdGhpcy53cml0ZWxuKGBcXG4ke3h0ZXJtUmVkfSR7Tk9UX1ZBTElEX0NPTU1BTkRfTVNHfWApO1xuICAgICAgICAgIHRoaXMuYnJlYWtDdXJyZW50UHJvY2VzcygpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxufVxuIl19