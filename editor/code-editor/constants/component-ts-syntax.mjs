/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { parser as jsParser } from '@lezer/javascript';
import { parseMixed } from '@lezer/common';
import { LRLanguage } from '@codemirror/language';
import { angularLanguage } from '@codemirror/lang-angular';
import { sassLanguage } from '@codemirror/lang-sass';
export function angularComponent() {
    return LRLanguage.define({
        parser: jsParser.configure({
            dialect: 'ts',
            wrap: parseMixed((node, input) => getAngularComponentMixedParser(node, input)),
        }),
    });
}
/**
 * Use the Angular template parser for inline templates in Angular components
 */
function getAngularComponentMixedParser(node, input) {
    const nodeIsString = ['TemplateString', 'String'].includes(node.name);
    if (!nodeIsString)
        return null;
    if (isComponentTemplate(node, input))
        return { parser: angularLanguage.parser };
    if (isComponentStyles(node, input))
        return { parser: sassLanguage.parser };
    return null;
}
function isComponentTemplate(node, input) {
    if (!node.node.parent)
        return false;
    const expectedParents = [
        'Property', // `template:` in `@Component({ template: "..." })`
        'ObjectExpression', // `{` in `@Component({ template: "..." })`
        'ArgList', // the decorator arguments in `@Component({ template: "..." })`
        'CallExpression', // `()` in `@Component({ template: "..." })`
        'Decorator', // `@Component` in `@Component({ template: "..." })`
    ];
    const { node: parentNode } = node.node.parent;
    if (nodeHasExpectedParents(parentNode, expectedParents)) {
        const templateCandidateProperty = input
            .read(parentNode.node.from, parentNode.node.to)
            .toString()
            .trim();
        // is a Component's decorator `template`
        if (templateCandidateProperty.startsWith('template:'))
            return true;
    }
    return false;
}
function isComponentStyles(node, input) {
    if (!node.node.parent || !node.node.parent?.node.parent)
        return false;
    const expectedParents = [
        'ArrayExpression', // `[` in `@Component({ styles: [``] })`
        'Property', // `styles:` in `@Component({ styles: [``] })`
        'ObjectExpression', // `{` in `@Component({ styles: [``] })`
        'ArgList', // the decorator arguments in `@Component({ styles: [``] })`
        'CallExpression', // `()` in `@Component({ styles: [``] })`
        'Decorator', // `@Component` in `@Component({ styles: [``] })`
    ];
    const { node: parentNode } = node.node.parent;
    if (nodeHasExpectedParents(parentNode, expectedParents)) {
        const propertyNode = node.node.parent.node.parent;
        const stylesCandidateProperty = input
            .read(propertyNode.from, propertyNode.to)
            .toString()
            .trim();
        // is a Component's decorator `styles`
        if (stylesCandidateProperty.startsWith('styles:')) {
            return true;
        }
    }
    return false;
}
/**
 * Utility function to verify if the given SyntaxNode has the expected parents
 */
function nodeHasExpectedParents(node, orderedParentsNames) {
    const parentNameToVerify = orderedParentsNames[0];
    if (parentNameToVerify !== node.name)
        return false;
    // parent was found, remove from the array
    orderedParentsNames.shift();
    // all expected parents were found, node has expected parents
    if (orderedParentsNames.length === 0)
        return true;
    if (!node.parent)
        return false;
    return nodeHasExpectedParents(node.parent.node, orderedParentsNames);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXRzLXN5bnRheC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL2NvZGUtZWRpdG9yL2NvbnN0YW50cy9jb21wb25lbnQtdHMtc3ludGF4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxNQUFNLElBQUksUUFBUSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFDLFVBQVUsRUFBZ0QsTUFBTSxlQUFlLENBQUM7QUFFeEYsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFbkQsTUFBTSxVQUFVLGdCQUFnQjtJQUM5QixPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDdkIsTUFBTSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDekIsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsOEJBQThCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9FLENBQUM7S0FDSCxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxTQUFTLDhCQUE4QixDQUFDLElBQW1CLEVBQUUsS0FBWTtJQUN2RSxNQUFNLFlBQVksR0FBRyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdEUsSUFBSSxDQUFDLFlBQVk7UUFBRSxPQUFPLElBQUksQ0FBQztJQUUvQixJQUFJLG1CQUFtQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7UUFBRSxPQUFPLEVBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxNQUFNLEVBQUMsQ0FBQztJQUM5RSxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7UUFBRSxPQUFPLEVBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUMsQ0FBQztJQUV6RSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLElBQW1CLEVBQUUsS0FBWTtJQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFcEMsTUFBTSxlQUFlLEdBQUc7UUFDdEIsVUFBVSxFQUFFLG1EQUFtRDtRQUMvRCxrQkFBa0IsRUFBRSwyQ0FBMkM7UUFDL0QsU0FBUyxFQUFFLCtEQUErRDtRQUMxRSxnQkFBZ0IsRUFBRSw0Q0FBNEM7UUFDOUQsV0FBVyxFQUFFLG9EQUFvRDtLQUNsRSxDQUFDO0lBRUYsTUFBTSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUU1QyxJQUFJLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsRUFBRSxDQUFDO1FBQ3hELE1BQU0seUJBQXlCLEdBQUcsS0FBSzthQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDOUMsUUFBUSxFQUFFO2FBQ1YsSUFBSSxFQUFFLENBQUM7UUFFVix3Q0FBd0M7UUFDeEMsSUFBSSx5QkFBeUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7SUFDckUsQ0FBQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsSUFBbUIsRUFBRSxLQUFZO0lBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFdEUsTUFBTSxlQUFlLEdBQUc7UUFDdEIsaUJBQWlCLEVBQUUsd0NBQXdDO1FBQzNELFVBQVUsRUFBRSw4Q0FBOEM7UUFDMUQsa0JBQWtCLEVBQUUsd0NBQXdDO1FBQzVELFNBQVMsRUFBRSw0REFBNEQ7UUFDdkUsZ0JBQWdCLEVBQUUseUNBQXlDO1FBQzNELFdBQVcsRUFBRSxpREFBaUQ7S0FDL0QsQ0FBQztJQUVGLE1BQU0sRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFNUMsSUFBSSxzQkFBc0IsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUN4RCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWxELE1BQU0sdUJBQXVCLEdBQUcsS0FBSzthQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO2FBQ3hDLFFBQVEsRUFBRTthQUNWLElBQUksRUFBRSxDQUFDO1FBRVYsc0NBQXNDO1FBQ3RDLElBQUksdUJBQXVCLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7WUFDbEQsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FDN0IsSUFBZ0IsRUFDaEIsbUJBQThDO0lBRTlDLE1BQU0sa0JBQWtCLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEQsSUFBSSxrQkFBa0IsS0FBSyxJQUFJLENBQUMsSUFBSTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRW5ELDBDQUEwQztJQUMxQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUU1Qiw2REFBNkQ7SUFDN0QsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRWxELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRS9CLE9BQU8sc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN2RSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuZGV2L2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge3BhcnNlciBhcyBqc1BhcnNlcn0gZnJvbSAnQGxlemVyL2phdmFzY3JpcHQnO1xuaW1wb3J0IHtwYXJzZU1peGVkLCBTeW50YXhOb2RlLCBTeW50YXhOb2RlUmVmLCBJbnB1dCwgTmVzdGVkUGFyc2V9IGZyb20gJ0BsZXplci9jb21tb24nO1xuXG5pbXBvcnQge0xSTGFuZ3VhZ2V9IGZyb20gJ0Bjb2RlbWlycm9yL2xhbmd1YWdlJztcbmltcG9ydCB7YW5ndWxhckxhbmd1YWdlfSBmcm9tICdAY29kZW1pcnJvci9sYW5nLWFuZ3VsYXInO1xuaW1wb3J0IHtzYXNzTGFuZ3VhZ2V9IGZyb20gJ0Bjb2RlbWlycm9yL2xhbmctc2Fzcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmd1bGFyQ29tcG9uZW50KCkge1xuICByZXR1cm4gTFJMYW5ndWFnZS5kZWZpbmUoe1xuICAgIHBhcnNlcjoganNQYXJzZXIuY29uZmlndXJlKHtcbiAgICAgIGRpYWxlY3Q6ICd0cycsXG4gICAgICB3cmFwOiBwYXJzZU1peGVkKChub2RlLCBpbnB1dCkgPT4gZ2V0QW5ndWxhckNvbXBvbmVudE1peGVkUGFyc2VyKG5vZGUsIGlucHV0KSksXG4gICAgfSksXG4gIH0pO1xufVxuXG4vKipcbiAqIFVzZSB0aGUgQW5ndWxhciB0ZW1wbGF0ZSBwYXJzZXIgZm9yIGlubGluZSB0ZW1wbGF0ZXMgaW4gQW5ndWxhciBjb21wb25lbnRzXG4gKi9cbmZ1bmN0aW9uIGdldEFuZ3VsYXJDb21wb25lbnRNaXhlZFBhcnNlcihub2RlOiBTeW50YXhOb2RlUmVmLCBpbnB1dDogSW5wdXQpOiBOZXN0ZWRQYXJzZSB8IG51bGwge1xuICBjb25zdCBub2RlSXNTdHJpbmcgPSBbJ1RlbXBsYXRlU3RyaW5nJywgJ1N0cmluZyddLmluY2x1ZGVzKG5vZGUubmFtZSk7XG5cbiAgaWYgKCFub2RlSXNTdHJpbmcpIHJldHVybiBudWxsO1xuXG4gIGlmIChpc0NvbXBvbmVudFRlbXBsYXRlKG5vZGUsIGlucHV0KSkgcmV0dXJuIHtwYXJzZXI6IGFuZ3VsYXJMYW5ndWFnZS5wYXJzZXJ9O1xuICBpZiAoaXNDb21wb25lbnRTdHlsZXMobm9kZSwgaW5wdXQpKSByZXR1cm4ge3BhcnNlcjogc2Fzc0xhbmd1YWdlLnBhcnNlcn07XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzQ29tcG9uZW50VGVtcGxhdGUobm9kZTogU3ludGF4Tm9kZVJlZiwgaW5wdXQ6IElucHV0KTogYm9vbGVhbiB7XG4gIGlmICghbm9kZS5ub2RlLnBhcmVudCkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGV4cGVjdGVkUGFyZW50cyA9IFtcbiAgICAnUHJvcGVydHknLCAvLyBgdGVtcGxhdGU6YCBpbiBgQENvbXBvbmVudCh7IHRlbXBsYXRlOiBcIi4uLlwiIH0pYFxuICAgICdPYmplY3RFeHByZXNzaW9uJywgLy8gYHtgIGluIGBAQ29tcG9uZW50KHsgdGVtcGxhdGU6IFwiLi4uXCIgfSlgXG4gICAgJ0FyZ0xpc3QnLCAvLyB0aGUgZGVjb3JhdG9yIGFyZ3VtZW50cyBpbiBgQENvbXBvbmVudCh7IHRlbXBsYXRlOiBcIi4uLlwiIH0pYFxuICAgICdDYWxsRXhwcmVzc2lvbicsIC8vIGAoKWAgaW4gYEBDb21wb25lbnQoeyB0ZW1wbGF0ZTogXCIuLi5cIiB9KWBcbiAgICAnRGVjb3JhdG9yJywgLy8gYEBDb21wb25lbnRgIGluIGBAQ29tcG9uZW50KHsgdGVtcGxhdGU6IFwiLi4uXCIgfSlgXG4gIF07XG5cbiAgY29uc3Qge25vZGU6IHBhcmVudE5vZGV9ID0gbm9kZS5ub2RlLnBhcmVudDtcblxuICBpZiAobm9kZUhhc0V4cGVjdGVkUGFyZW50cyhwYXJlbnROb2RlLCBleHBlY3RlZFBhcmVudHMpKSB7XG4gICAgY29uc3QgdGVtcGxhdGVDYW5kaWRhdGVQcm9wZXJ0eSA9IGlucHV0XG4gICAgICAucmVhZChwYXJlbnROb2RlLm5vZGUuZnJvbSwgcGFyZW50Tm9kZS5ub2RlLnRvKVxuICAgICAgLnRvU3RyaW5nKClcbiAgICAgIC50cmltKCk7XG5cbiAgICAvLyBpcyBhIENvbXBvbmVudCdzIGRlY29yYXRvciBgdGVtcGxhdGVgXG4gICAgaWYgKHRlbXBsYXRlQ2FuZGlkYXRlUHJvcGVydHkuc3RhcnRzV2l0aCgndGVtcGxhdGU6JykpIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0NvbXBvbmVudFN0eWxlcyhub2RlOiBTeW50YXhOb2RlUmVmLCBpbnB1dDogSW5wdXQpOiBib29sZWFuIHtcbiAgaWYgKCFub2RlLm5vZGUucGFyZW50IHx8ICFub2RlLm5vZGUucGFyZW50Py5ub2RlLnBhcmVudCkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGV4cGVjdGVkUGFyZW50cyA9IFtcbiAgICAnQXJyYXlFeHByZXNzaW9uJywgLy8gYFtgIGluIGBAQ29tcG9uZW50KHsgc3R5bGVzOiBbYGBdIH0pYFxuICAgICdQcm9wZXJ0eScsIC8vIGBzdHlsZXM6YCBpbiBgQENvbXBvbmVudCh7IHN0eWxlczogW2BgXSB9KWBcbiAgICAnT2JqZWN0RXhwcmVzc2lvbicsIC8vIGB7YCBpbiBgQENvbXBvbmVudCh7IHN0eWxlczogW2BgXSB9KWBcbiAgICAnQXJnTGlzdCcsIC8vIHRoZSBkZWNvcmF0b3IgYXJndW1lbnRzIGluIGBAQ29tcG9uZW50KHsgc3R5bGVzOiBbYGBdIH0pYFxuICAgICdDYWxsRXhwcmVzc2lvbicsIC8vIGAoKWAgaW4gYEBDb21wb25lbnQoeyBzdHlsZXM6IFtgYF0gfSlgXG4gICAgJ0RlY29yYXRvcicsIC8vIGBAQ29tcG9uZW50YCBpbiBgQENvbXBvbmVudCh7IHN0eWxlczogW2BgXSB9KWBcbiAgXTtcblxuICBjb25zdCB7bm9kZTogcGFyZW50Tm9kZX0gPSBub2RlLm5vZGUucGFyZW50O1xuXG4gIGlmIChub2RlSGFzRXhwZWN0ZWRQYXJlbnRzKHBhcmVudE5vZGUsIGV4cGVjdGVkUGFyZW50cykpIHtcbiAgICBjb25zdCBwcm9wZXJ0eU5vZGUgPSBub2RlLm5vZGUucGFyZW50Lm5vZGUucGFyZW50O1xuXG4gICAgY29uc3Qgc3R5bGVzQ2FuZGlkYXRlUHJvcGVydHkgPSBpbnB1dFxuICAgICAgLnJlYWQocHJvcGVydHlOb2RlLmZyb20sIHByb3BlcnR5Tm9kZS50bylcbiAgICAgIC50b1N0cmluZygpXG4gICAgICAudHJpbSgpO1xuXG4gICAgLy8gaXMgYSBDb21wb25lbnQncyBkZWNvcmF0b3IgYHN0eWxlc2BcbiAgICBpZiAoc3R5bGVzQ2FuZGlkYXRlUHJvcGVydHkuc3RhcnRzV2l0aCgnc3R5bGVzOicpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiB0byB2ZXJpZnkgaWYgdGhlIGdpdmVuIFN5bnRheE5vZGUgaGFzIHRoZSBleHBlY3RlZCBwYXJlbnRzXG4gKi9cbmZ1bmN0aW9uIG5vZGVIYXNFeHBlY3RlZFBhcmVudHMoXG4gIG5vZGU6IFN5bnRheE5vZGUsXG4gIG9yZGVyZWRQYXJlbnRzTmFtZXM6IEFycmF5PFN5bnRheE5vZGVbJ25hbWUnXT4sXG4pOiBib29sZWFuIHtcbiAgY29uc3QgcGFyZW50TmFtZVRvVmVyaWZ5ID0gb3JkZXJlZFBhcmVudHNOYW1lc1swXTtcblxuICBpZiAocGFyZW50TmFtZVRvVmVyaWZ5ICE9PSBub2RlLm5hbWUpIHJldHVybiBmYWxzZTtcblxuICAvLyBwYXJlbnQgd2FzIGZvdW5kLCByZW1vdmUgZnJvbSB0aGUgYXJyYXlcbiAgb3JkZXJlZFBhcmVudHNOYW1lcy5zaGlmdCgpO1xuXG4gIC8vIGFsbCBleHBlY3RlZCBwYXJlbnRzIHdlcmUgZm91bmQsIG5vZGUgaGFzIGV4cGVjdGVkIHBhcmVudHNcbiAgaWYgKG9yZGVyZWRQYXJlbnRzTmFtZXMubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoIW5vZGUucGFyZW50KSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIG5vZGVIYXNFeHBlY3RlZFBhcmVudHMobm9kZS5wYXJlbnQubm9kZSwgb3JkZXJlZFBhcmVudHNOYW1lcyk7XG59XG4iXX0=