/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { tags } from '@lezer/highlight';
export const SYNTAX_STYLES = [
    /** A comment. */
    { tag: tags.comment, color: 'var(--code-comment)' },
    /** A language keyword. */
    { tag: tags.keyword, color: 'var(--code-keyword)' },
    /** A string literal */
    { tag: tags.string, color: 'var(--code-string)' },
    /** A number literal. */
    { tag: tags.number, color: 'var(--code-number)' },
    /** A tag name, subtag of typeName. */
    { tag: tags.tagName, color: 'var(--code-tags)' },
    /** The name of a class. */
    { tag: tags.className, color: 'var(--code-component)' },
    /** A line comment. */
    { tag: tags.lineComment, color: 'var(--code-line-comment)' },
    /** A block comment. */
    { tag: tags.blockComment, color: 'var(--code-block-comment)' },
    /** A documentation comment. */
    { tag: tags.docComment, color: 'var(--code-doc-comment)' },
    /** Any kind of identifier. */
    { tag: tags.name, color: 'var(--code-name)' },
    /** The name of a variable. */
    { tag: tags.variableName, color: 'var(--code-variable-name)' },
    /** A type name */
    { tag: tags.typeName, color: 'var(--code-type-name)' },
    /** A property or field name. */
    { tag: tags.propertyName, color: 'var(--code-property-name)' },
    /** An attribute name, subtag of propertyName. */
    { tag: tags.attributeName, color: 'var(--code-attribute-name)' },
    /** A label name. */
    { tag: tags.labelName, color: 'var(--code-label-name)' },
    /** A namespace name. */
    { tag: tags.namespace, color: 'var(--code-namespace)' },
    /** The name of a macro. */
    { tag: tags.macroName, color: 'var(--code-macro-name)' },
    /** A literal value. */
    { tag: tags.literal, color: 'var(--code-literal)' },
    /** A documentation string. */
    { tag: tags.docString, color: 'var(--code-doc-string)' },
    /** A character literal (subtag of string). */
    { tag: tags.character, color: 'var(--code-character)' },
    /** An attribute value (subtag of string). */
    { tag: tags.attributeValue, color: 'var(--code-attribute-value)' },
    /** An integer number literal. */
    { tag: tags.integer, color: 'var(--code-integer)' },
    /** A floating-point number literal. */
    { tag: tags.float, color: 'var(--code-float)' },
    /** A boolean literal. */
    { tag: tags.bool, color: 'var(--code-bool)' },
    /** Regular expression literal. */
    { tag: tags.regexp, color: 'var(--code-regexp)' },
    /** An escape literal, for example a backslash escape in a string. */
    { tag: tags.escape, color: 'var(--code-escape)' },
    /** A color literal . */
    { tag: tags.color, color: 'var(--code-color)' },
    /** A URL literal. */
    { tag: tags.url, color: 'var(--code-url)' },
    /** The keyword for the self or this object. */
    { tag: tags.self, color: 'var(--code-self)' },
    /** The keyword for null. */
    { tag: tags.null, color: 'var(--code-null)' },
    /** A keyword denoting some atomic value. */
    { tag: tags.atom, color: 'var(--code-atom)' },
    /** A keyword that represents a unit. */
    { tag: tags.unit, color: 'var(--code-unit)' },
    /** A modifier keyword. */
    { tag: tags.modifier, color: 'var(--code-modifier)' },
    /** A keyword that acts as an operator. */
    { tag: tags.operatorKeyword, color: 'var(--code-operator-keyword)' },
    /** A control-flow related keyword. */
    { tag: tags.controlKeyword, color: 'var(--code-control-keyword)' },
    /** A keyword that defines something. */
    { tag: tags.definitionKeyword, color: 'var(--code-definition-keyword)' },
    /** A keyword related to defining or interfacing with modules. */
    { tag: tags.moduleKeyword, color: 'var(--code-module-keyword)' },
    /** An operator. */
    { tag: tags.operator, color: 'var(--code-operator)' },
    /** An operator that dereferences something. */
    { tag: tags.derefOperator, color: 'var(--code-deref-operator)' },
    /** Arithmetic-related operator. */
    { tag: tags.arithmeticOperator, color: 'var(--code-arithmetic-operator)' },
    /** Logical operator. */
    { tag: tags.logicOperator, color: 'var(--code-logic-operator)' },
    /** Bit operator. */
    { tag: tags.bitwiseOperator, color: 'var(--code-bitwise-operator)' },
    /** Comparison operator. */
    { tag: tags.compareOperator, color: 'var(--code-compare-operator)' },
    /** Operator that updates its operand. */
    { tag: tags.updateOperator, color: 'var(--code-update-operator)' },
    /** Operator that defines something. */
    { tag: tags.definitionOperator, color: 'var(--code-definition-operator)' },
    /** Type-related operator. */
    { tag: tags.typeOperator, color: 'var(--code-type-operator)' },
    /** Control-flow operator. */
    { tag: tags.controlOperator, color: 'var(--code-control-operator)' },
    /** Program or markup punctuation. */
    { tag: tags.punctuation, color: 'var(--code-punctuation)' },
    /** Punctuation that separates things. */
    { tag: tags.separator, color: 'var(--code-separator)' },
    /** Bracket-style punctuation. */
    { tag: tags.bracket, color: 'var(--code-bracket)' },
    /** Angle brackets (usually `<` and `>` tokens). */
    { tag: tags.angleBracket, color: 'var(--code-angle-bracket)' },
    /** Square brackets (usually `[` and `]` tokens). */
    { tag: tags.squareBracket, color: 'var(--code-square-bracket)' },
    /** Parentheses (usually `(` and `)` tokens). Subtag of bracket. */
    { tag: tags.paren, color: 'var(--code-paren)' },
    /** Braces (usually `{` and `}` tokens). Subtag of bracket. */
    { tag: tags.brace, color: 'var(--code-brace)' },
    /** Content, for example plain text in XML or markup documents. */
    { tag: tags.content, color: 'var(--code-content)' },
    /** Content that represents a heading. */
    { tag: tags.heading, color: 'var(--code-heading)' },
    /** A level 1 heading. */
    { tag: tags.heading1, color: 'var(--code-heading1)' },
    /** A level 2 heading. */
    { tag: tags.heading2, color: 'var(--code-heading2)' },
    /** A level 3 heading. */
    { tag: tags.heading3, color: 'var(--code-heading3)' },
    /** A level 4 heading. */
    { tag: tags.heading4, color: 'var(--code-heading4)' },
    /** A level 5 heading. */
    { tag: tags.heading5, color: 'var(--code-heading5)' },
    /** A level 6 heading. */
    { tag: tags.heading6, color: 'var(--code-heading6)' },
    /** A prose separator (such as a horizontal rule). */
    { tag: tags.contentSeparator, color: 'var(--code-content-separator)' },
    /** Content that represents a list. */
    { tag: tags.list, color: 'var(--code-list)' },
    /** Content that represents a quote. */
    { tag: tags.quote, color: 'var(--code-quote)' },
    /** Content that is emphasized. */
    { tag: tags.emphasis, color: 'var(--code-emphasis)' },
    /** Content that is styled strong. */
    { tag: tags.strong, color: 'var(--code-strong)' },
    /** Content that is part of a link. */
    { tag: tags.link, color: 'var(--code-link)' },
    /** Content that is styled as code or monospace. */
    { tag: tags.monospace, color: 'var(--code-monospace)' },
    /** Content that has a strike-through style. */
    { tag: tags.strikethrough, color: 'var(--code-strikethrough)' },
    /** Inserted text in a change-tracking format. */
    { tag: tags.inserted, color: 'var(--code-inserted)' },
    /** Deleted text. */
    { tag: tags.deleted, color: 'var(--code-deleted)' },
    /** Changed text. */
    { tag: tags.changed, color: 'var(--code-changed)' },
    /** An invalid or unsyntactic element. */
    { tag: tags.invalid, color: 'var(--code-invalid)' },
    /** Metadata or meta-instruction. */
    { tag: tags.meta, color: 'var(--code-meta)' },
    /** Metadata that applies to the entire document. */
    { tag: tags.documentMeta, color: 'var(--code-document-meta)' },
    /** Metadata that annotates or adds attributes to a given syntactic element. */
    { tag: tags.annotation, color: 'var(--code-annotation)' },
    /** Processing instruction or preprocessor directive. Subtag of meta. */
    { tag: tags.processingInstruction, color: 'var(--code-processing-instruction)' },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ludGF4LXN0eWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2RvY3MvZWRpdG9yL2NvZGUtZWRpdG9yL2NvbnN0YW50cy9zeW50YXgtc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUV0QyxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWU7SUFDdkMsaUJBQWlCO0lBQ2pCLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFDO0lBRWpELDBCQUEwQjtJQUMxQixFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztJQUVqRCx1QkFBdUI7SUFDdkIsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUM7SUFFL0Msd0JBQXdCO0lBQ3hCLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFDO0lBRS9DLHNDQUFzQztJQUN0QyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBQztJQUU5QywyQkFBMkI7SUFDM0IsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUM7SUFFckQsc0JBQXNCO0lBQ3RCLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLDBCQUEwQixFQUFDO0lBRTFELHVCQUF1QjtJQUN2QixFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBQztJQUU1RCwrQkFBK0I7SUFDL0IsRUFBQyxHQUFHLEVBQUUsSUFBSSxD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LEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFDO0lBRTNDLG1EQUFtRDtJQUNuRCxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBQztJQUVyRCwrQ0FBK0M7SUFDL0MsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUM7SUFFN0QsaURBQWlEO0lBQ2pELEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFDO0lBRW5ELG9CQUFvQjtJQUNwQixFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxxQkFBcUIsRUFBQztJQUVqRCxvQkFBb0I7SUFDcEIsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUM7SUFFakQseUNBQXlDO0lBQ3pDLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLHFCQUFxQixFQUFDO0lBRWpELG9DQUFvQztJQUNwQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBQztJQUUzQyxvREFBb0Q7SUFDcEQsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUM7SUFFNUQsK0VBQStFO0lBQy9FLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFDO0lBRXZELHdFQUF3RTtJQUN4RSxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQUUsS0FBSyxFQUFFLG9DQUFvQyxFQUFDO0NBQy9FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5kZXYvbGljZW5zZVxuICovXG5cbmltcG9ydCB0eXBlIHtUYWdTdHlsZX0gZnJvbSAnQGNvZGVtaXJyb3IvbGFuZ3VhZ2UnO1xuaW1wb3J0IHt0YWdzfSBmcm9tICdAbGV6ZXIvaGlnaGxpZ2h0JztcblxuZXhwb3J0IGNvbnN0IFNZTlRBWF9TVFlMRVM6IFRhZ1N0eWxlW10gPSBbXG4gIC8qKiBBIGNvbW1lbnQuICovXG4gIHt0YWc6IHRhZ3MuY29tbWVudCwgY29sb3I6ICd2YXIoLS1jb2RlLWNvbW1lbnQpJ30sXG5cbiAgLyoqIEEgbGFuZ3VhZ2Uga2V5d29yZC4gKi9cbiAge3RhZzogdGFncy5rZXl3b3JkLCBjb2xvcjogJ3ZhcigtLWNvZGUta2V5d29yZCknfSxcblxuICAvKiogQSBzdHJpbmcgbGl0ZXJhbCAqL1xuICB7dGFnOiB0YWdzLnN0cmluZywgY29sb3I6ICd2YXIoLS1jb2RlLXN0cmluZyknfSxcblxuICAvKiogQSBudW1iZXIgbGl0ZXJhbC4gKi9cbiAge3RhZzogdGFncy5udW1iZXIsIGNvbG9yOiAndmFyKC0tY29kZS1udW1iZXIpJ30sXG5cbiAgLyoqIEEgdGFnIG5hbWUsIHN1YnRhZyBvZiB0eXBlTmFtZS4gKi9cbiAge3RhZzogdGFncy50YWdOYW1lLCBjb2xvcjogJ3ZhcigtLWNvZGUtdGFncyknfSxcblxuICAvKiogVGhlIG5hbWUgb2YgYSBjbGFzcy4gKi9cbiAge3RhZzogdGFncy5jbGFzc05hbWUsIGNvbG9yOiAndmFyKC0tY29kZS1jb21wb25lbnQpJ30sXG5cbiAgLyoqIEEgbGluZSBjb21tZW50LiAqL1xuICB7dGFnOiB0YWdzLmxpbmVDb21tZW50LCBjb2xvcjogJ3ZhcigtLWNvZGUtbGluZS1jb21tZW50KSd9LFxuXG4gIC8qKiBBIGJsb2NrIGNvbW1lbnQuICovXG4gIHt0YWc6IHRhZ3MuYmxvY2tDb21tZW50LCBjb2xvcjogJ3ZhcigtLWNvZGUtYmxvY2stY29tbWVudCknfSxcblxuICAvKiogQSBkb2N1bWVudGF0aW9uIGNvbW1lbnQuICovXG4gIHt0YWc6IHRhZ3MuZG9jQ29tbWVudCwgY29sb3I6ICd2YXIoLS1jb2RlLWRvYy1jb21tZW50KSd9LFxuXG4gIC8qKiBBbnkga2luZCBvZiBpZGVudGlmaWVyLiAqL1xuICB7dGFnOiB0YWdzLm5hbWUsIGNvbG9yOiAndmFyKC0tY29kZS1uYW1lKSd9LFxuXG4gIC8qKiBUaGUgbmFtZSBvZiBhIHZhcmlhYmxlLiAqL1xuICB7dGFnOiB0YWdzLnZhcmlhYmxlTmFtZSwgY29sb3I6ICd2YXIoLS1jb2RlLXZhcmlhYmxlLW5hbWUpJ30sXG5cbiAgLyoqIEEgdHlwZSBuYW1lICovXG4gIHt0YWc6IHRhZ3MudHlwZU5hbWUsIGNvbG9yOiAndmFyKC0tY29kZS10eXBlLW5hbWUpJ30sXG5cbiAgLyoqIEEgcHJvcGVydHkgb3IgZmllbGQgbmFtZS4gKi9cbiAge3RhZzogdGFncy5wcm9wZXJ0eU5hbWUsIGNvbG9yOiAndmFyKC0tY29kZS1wcm9wZXJ0eS1uYW1lKSd9LFxuXG4gIC8qKiBBbiBhdHRyaWJ1dGUgbmFtZSwgc3VidGFnIG9mIHByb3BlcnR5TmFtZS4gKi9cbiAge3RhZzogdGFncy5hdHRyaWJ1dGVOYW1lLCBjb2xvcjogJ3ZhcigtLWNvZGUtYXR0cmlidXRlLW5hbWUpJ30sXG5cbiAgLyoqIEEgbGFiZWwgbmFtZS4gKi9cbiAge3RhZzogdGFncy5sYWJlbE5hbWUsIGNvbG9yOiAndmFyKC0tY29kZS1sYWJlbC1uYW1lKSd9LFxuXG4gIC8qKiBBIG5hbWVzcGFjZSBuYW1lLiAqL1xuICB7dGFnOiB0YWdzLm5hbWVzcGFjZSwgY29sb3I6ICd2YXIoLS1jb2RlLW5hbWVzcGFjZSknfSxcblxuICAvKiogVGhlIG5hbWUgb2YgYSBtYWNyby4gKi9cbiAge3RhZzogdGFncy5tYWNyb05hbWUsIGNvbG9yOiAndmFyKC0tY29kZS1tYWNyby1uYW1lKSd9LFxuXG4gIC8qKiBBIGxpdGVyYWwgdmFsdWUuICovXG4gIHt0YWc6IHRhZ3MubGl0ZXJhbCwgY29sb3I6ICd2YXIoLS1jb2RlLWxpdGVyYWwpJ30sXG5cbiAgLyoqIEEgZG9jdW1lbnRhdGlvbiBzdHJpbmcuICovXG4gIHt0YWc6IHRhZ3MuZG9jU3RyaW5nLCBjb2xvcjogJ3ZhcigtLWNvZGUtZG9jLXN0cmluZyknfSxcblxuICAvKiogQSBjaGFyYWN0ZXIgbGl0ZXJhbCAoc3VidGFnIG9mIHN0cmluZykuICovXG4gIHt0YWc6IHRhZ3MuY2hhcmFjdGVyLCBjb2xvcjogJ3ZhcigtLWNvZGUtY2hhcmFjdGVyKSd9LFxuXG4gIC8qKiBBbiBhdHRyaWJ1dGUgdmFsdWUgKHN1YnRhZyBvZiBzdHJpbmcpLiAqL1xuICB7dGFnOiB0YWdzLmF0dHJpYnV0ZVZhbHVlLCBjb2xvcjogJ3ZhcigtLWNvZGUtYXR0cmlidXRlLXZhbHVlKSd9LFxuXG4gIC8qKiBBbiBpbnRlZ2VyIG51bWJlciBsaXRlcmFsLiAqL1xuICB7dGFnOiB0YWdzLmludGVnZXIsIGNvbG9yOiAndmFyKC0tY29kZS1pbnRlZ2VyKSd9LFxuXG4gIC8qKiBBIGZsb2F0aW5nLXBvaW50IG51bWJlciBsaXRlcmFsLiAqL1xuICB7dGFnOiB0YWdzLmZsb2F0LCBjb2xvcjogJ3ZhcigtLWNvZGUtZmxvYXQpJ30sXG5cbiAgLyoqIEEgYm9vbGVhbiBsaXRlcmFsLiAqL1xuICB7dGFnOiB0YWdzLmJvb2wsIGNvbG9yOiAndmFyKC0tY29kZS1ib29sKSd9LFxuXG4gIC8qKiBSZWd1bGFyIGV4cHJlc3Npb24gbGl0ZXJhbC4gKi9cbiAge3RhZzogdGFncy5yZWdleHAsIGNvbG9yOiAndmFyKC0tY29kZS1yZWdleHApJ30sXG5cbiAgLyoqIEFuIGVzY2FwZSBsaXRlcmFsLCBmb3IgZXhhbXBsZSBhIGJhY2tzbGFzaCBlc2NhcGUgaW4gYSBzdHJpbmcuICovXG4gIHt0YWc6IHRhZ3MuZXNjYXBlLCBjb2xvcjogJ3ZhcigtLWNvZGUtZXNjYXBlKSd9LFxuXG4gIC8qKiBBIGNvbG9yIGxpdGVyYWwgLiAqL1xuICB7dGFnOiB0YWdzLmNvbG9yLCBjb2xvcjogJ3ZhcigtLWNvZGUtY29sb3IpJ30sXG5cbiAgLyoqIEEgVVJMIGxpdGVyYWwuICovXG4gIHt0YWc6IHRhZ3MudXJsLCBjb2xvcjogJ3ZhcigtLWNvZGUtdXJsKSd9LFxuXG4gIC8qKiBUaGUga2V5d29yZCBmb3IgdGhlIHNlbGYgb3IgdGhpcyBvYmplY3QuICovXG4gIHt0YWc6IHRhZ3Muc2VsZiwgY29sb3I6ICd2YXIoLS1jb2RlLXNlbGYpJ30sXG5cbiAgLyoqIFRoZSBrZXl3b3JkIGZvciBudWxsLiAqL1xuICB7dGFnOiB0YWdzLm51bGwsIGNvbG9yOiAndmFyKC0tY29kZS1udWxsKSd9LFxuXG4gIC8qKiBBIGtleXdvcmQgZGVub3Rpbmcgc29tZSBhdG9taWMgdmFsdWUuICovXG4gIHt0YWc6IHRhZ3MuYXRvbSwgY29sb3I6ICd2YXIoLS1jb2RlLWF0b20pJ30sXG5cbiAgLyoqIEEga2V5d29yZCB0aGF0IHJlcHJlc2VudHMgYSB1bml0LiAqL1xuICB7dGFnOiB0YWdzLnVuaXQsIGNvbG9yOiAndmFyKC0tY29kZS11bml0KSd9LFxuXG4gIC8qKiBBIG1vZGlmaWVyIGtleXdvcmQuICovXG4gIHt0YWc6IHRhZ3MubW9kaWZpZXIsIGNvbG9yOiAndmFyKC0tY29kZS1tb2RpZmllciknfSxcblxuICAvKiogQSBrZXl3b3JkIHRoYXQgYWN0cyBhcyBhbiBvcGVyYXRvci4gKi9cbiAge3RhZzogdGFncy5vcGVyYXRvcktleXdvcmQsIGNvbG9yOiAndmFyKC0tY29kZS1vcGVyYXRvci1rZXl3b3JkKSd9LFxuXG4gIC8qKiBBIGNvbnRyb2wtZmxvdyByZWxhdGVkIGtleXdvcmQuICovXG4gIHt0YWc6IHRhZ3MuY29udHJvbEtleXdvcmQsIGNvbG9yOiAndmFyKC0tY29kZS1jb250cm9sLWtleXdvcmQpJ30sXG5cbiAgLyoqIEEga2V5d29yZCB0aGF0IGRlZmluZXMgc29tZXRoaW5nLiAqL1xuICB7dGFnOiB0YWdzLmRlZmluaXRpb25LZXl3b3JkLCBjb2xvcjogJ3ZhcigtLWNvZGUtZGVmaW5pdGlvbi1rZXl3b3JkKSd9LFxuXG4gIC8qKiBBIGtleXdvcmQgcmVsYXRlZCB0byBkZWZpbmluZyBvciBpbnRlcmZhY2luZyB3aXRoIG1vZHVsZXMuICovXG4gIHt0YWc6IHRhZ3MubW9kdWxlS2V5d29yZCwgY29sb3I6ICd2YXIoLS1jb2RlLW1vZHVsZS1rZXl3b3JkKSd9LFxuXG4gIC8qKiBBbiBvcGVyYXRvci4gKi9cbiAge3RhZzogdGFncy5vcGVyYXRvciwgY29sb3I6ICd2YXIoLS1jb2RlLW9wZXJhdG9yKSd9LFxuXG4gIC8qKiBBbiBvcGVyYXRvciB0aGF0IGRlcmVmZXJlbmNlcyBzb21ldGhpbmcuICovXG4gIHt0YWc6IHRhZ3MuZGVyZWZPcGVyYXRvciwgY29sb3I6ICd2YXIoLS1jb2RlLWRlcmVmLW9wZXJhdG9yKSd9LFxuXG4gIC8qKiBBcml0aG1ldGljLXJlbGF0ZWQgb3BlcmF0b3IuICovXG4gIHt0YWc6IHRhZ3MuYXJpdGhtZXRpY09wZXJhdG9yLCBjb2xvcjogJ3ZhcigtLWNvZGUtYXJpdGhtZXRpYy1vcGVyYXRvciknfSxcblxuICAvKiogTG9naWNhbCBvcGVyYXRvci4gKi9cbiAge3RhZzogdGFncy5sb2dpY09wZXJhdG9yLCBjb2xvcjogJ3ZhcigtLWNvZGUtbG9naWMtb3BlcmF0b3IpJ30sXG5cbiAgLyoqIEJpdCBvcGVyYXRvci4gKi9cbiAge3RhZzogdGFncy5iaXR3aXNlT3BlcmF0b3IsIGNvbG9yOiAndmFyKC0tY29kZS1iaXR3aXNlLW9wZXJhdG9yKSd9LFxuXG4gIC8qKiBDb21wYXJpc29uIG9wZXJhdG9yLiAqL1xuICB7dGFnOiB0YWdzLmNvbXBhcmVPcGVyYXRvciwgY29sb3I6ICd2YXIoLS1jb2RlLWNvbXBhcmUtb3BlcmF0b3IpJ30sXG5cbiAgLyoqIE9wZXJhdG9yIHRoYXQgdXBkYXRlcyBpdHMgb3BlcmFuZC4gKi9cbiAge3RhZzogdGFncy51cGRhdGVPcGVyYXRvciwgY29sb3I6ICd2YXIoLS1jb2RlLXVwZGF0ZS1vcGVyYXRvciknfSxcblxuICAvKiogT3BlcmF0b3IgdGhhdCBkZWZpbmVzIHNvbWV0aGluZy4gKi9cbiAge3RhZzogdGFncy5kZWZpbml0aW9uT3BlcmF0b3IsIGNvbG9yOiAndmFyKC0tY29kZS1kZWZpbml0aW9uLW9wZXJhdG9yKSd9LFxuXG4gIC8qKiBUeXBlLXJlbGF0ZWQgb3BlcmF0b3IuICovXG4gIHt0YWc6IHRhZ3MudHlwZU9wZXJhdG9yLCBjb2xvcjogJ3ZhcigtLWNvZGUtdHlwZS1vcGVyYXRvciknfSxcblxuICAvKiogQ29udHJvbC1mbG93IG9wZXJhdG9yLiAqL1xuICB7dGFnOiB0YWdzLmNvbnRyb2xPcGVyYXRvciwgY29sb3I6ICd2YXIoLS1jb2RlLWNvbnRyb2wtb3BlcmF0b3IpJ30sXG5cbiAgLyoqIFByb2dyYW0gb3IgbWFya3VwIHB1bmN0dWF0aW9uLiAqL1xuICB7dGFnOiB0YWdzLnB1bmN0dWF0aW9uLCBjb2xvcjogJ3ZhcigtLWNvZGUtcHVuY3R1YXRpb24pJ30sXG5cbiAgLyoqIFB1bmN0dWF0aW9uIHRoYXQgc2VwYXJhdGVzIHRoaW5ncy4gKi9cbiAge3RhZzogdGFncy5zZXBhcmF0b3IsIGNvbG9yOiAndmFyKC0tY29kZS1zZXBhcmF0b3IpJ30sXG5cbiAgLyoqIEJyYWNrZXQtc3R5bGUgcHVuY3R1YXRpb24uICovXG4gIHt0YWc6IHRhZ3MuYnJhY2tldCwgY29sb3I6ICd2YXIoLS1jb2RlLWJyYWNrZXQpJ30sXG5cbiAgLyoqIEFuZ2xlIGJyYWNrZXRzICh1c3VhbGx5IGA8YCBhbmQgYD5gIHRva2VucykuICovXG4gIHt0YWc6IHRhZ3MuYW5nbGVCcmFja2V0LCBjb2xvcjogJ3ZhcigtLWNvZGUtYW5nbGUtYnJhY2tldCknfSxcblxuICAvKiogU3F1YXJlIGJyYWNrZXRzICh1c3VhbGx5IGBbYCBhbmQgYF1gIHRva2VucykuICovXG4gIHt0YWc6IHRhZ3Muc3F1YXJlQnJhY2tldCwgY29sb3I6ICd2YXIoLS1jb2RlLXNxdWFyZS1icmFja2V0KSd9LFxuXG4gIC8qKiBQYXJlbnRoZXNlcyAodXN1YWxseSBgKGAgYW5kIGApYCB0b2tlbnMpLiBTdWJ0YWcgb2YgYnJhY2tldC4gKi9cbiAge3RhZzogdGFncy5wYXJlbiwgY29sb3I6ICd2YXIoLS1jb2RlLXBhcmVuKSd9LFxuXG4gIC8qKiBCcmFjZXMgKHVzdWFsbHkgYHtgIGFuZCBgfWAgdG9rZW5zKS4gU3VidGFnIG9mIGJyYWNrZXQuICovXG4gIHt0YWc6IHRhZ3MuYnJhY2UsIGNvbG9yOiAndmFyKC0tY29kZS1icmFjZSknfSxcblxuICAvKiogQ29udGVudCwgZm9yIGV4YW1wbGUgcGxhaW4gdGV4dCBpbiBYTUwgb3IgbWFya3VwIGRvY3VtZW50cy4gKi9cbiAge3RhZzogdGFncy5jb250ZW50LCBjb2xvcjogJ3ZhcigtLWNvZGUtY29udGVudCknfSxcblxuICAvKiogQ29udGVudCB0aGF0IHJlcHJlc2VudHMgYSBoZWFkaW5nLiAqL1xuICB7dGFnOiB0YWdzLmhlYWRpbmcsIGNvbG9yOiAndmFyKC0tY29kZS1oZWFkaW5nKSd9LFxuXG4gIC8qKiBBIGxldmVsIDEgaGVhZGluZy4gKi9cbiAge3RhZzogdGFncy5oZWFkaW5nMSwgY29sb3I6ICd2YXIoLS1jb2RlLWhlYWRpbmcxKSd9LFxuXG4gIC8qKiBBIGxldmVsIDIgaGVhZGluZy4gKi9cbiAge3RhZzogdGFncy5oZWFkaW5nMiwgY29sb3I6ICd2YXIoLS1jb2RlLWhlYWRpbmcyKSd9LFxuXG4gIC8qKiBBIGxldmVsIDMgaGVhZGluZy4gKi9cbiAge3RhZzogdGFncy5oZWFkaW5nMywgY29sb3I6ICd2YXIoLS1jb2RlLWhlYWRpbmczKSd9LFxuXG4gIC8qKiBBIGxldmVsIDQgaGVhZGluZy4gKi9cbiAge3RhZzogdGFncy5oZWFkaW5nNCwgY29sb3I6ICd2YXIoLS1jb2RlLWhlYWRpbmc0KSd9LFxuXG4gIC8qKiBBIGxldmVsIDUgaGVhZGluZy4gKi9cbiAge3RhZzogdGFncy5oZWFkaW5nNSwgY29sb3I6ICd2YXIoLS1jb2RlLWhlYWRpbmc1KSd9LFxuXG4gIC8qKiBBIGxldmVsIDYgaGVhZGluZy4gKi9cbiAge3RhZzogdGFncy5oZWFkaW5nNiwgY29sb3I6ICd2YXIoLS1jb2RlLWhlYWRpbmc2KSd9LFxuXG4gIC8qKiBBIHByb3NlIHNlcGFyYXRvciAoc3VjaCBhcyBhIGhvcml6b250YWwgcnVsZSkuICovXG4gIHt0YWc6IHRhZ3MuY29udGVudFNlcGFyYXRvciwgY29sb3I6ICd2YXIoLS1jb2RlLWNvbnRlbnQtc2VwYXJhdG9yKSd9LFxuXG4gIC8qKiBDb250ZW50IHRoYXQgcmVwcmVzZW50cyBhIGxpc3QuICovXG4gIHt0YWc6IHRhZ3MubGlzdCwgY29sb3I6ICd2YXIoLS1jb2RlLWxpc3QpJ30sXG5cbiAgLyoqIENvbnRlbnQgdGhhdCByZXByZXNlbnRzIGEgcXVvdGUuICovXG4gIHt0YWc6IHRhZ3MucXVvdGUsIGNvbG9yOiAndmFyKC0tY29kZS1xdW90ZSknfSxcblxuICAvKiogQ29udGVudCB0aGF0IGlzIGVtcGhhc2l6ZWQuICovXG4gIHt0YWc6IHRhZ3MuZW1waGFzaXMsIGNvbG9yOiAndmFyKC0tY29kZS1lbXBoYXNpcyknfSxcblxuICAvKiogQ29udGVudCB0aGF0IGlzIHN0eWxlZCBzdHJvbmcuICovXG4gIHt0YWc6IHRhZ3Muc3Ryb25nLCBjb2xvcjogJ3ZhcigtLWNvZGUtc3Ryb25nKSd9LFxuXG4gIC8qKiBDb250ZW50IHRoYXQgaXMgcGFydCBvZiBhIGxpbmsuICovXG4gIHt0YWc6IHRhZ3MubGluaywgY29sb3I6ICd2YXIoLS1jb2RlLWxpbmspJ30sXG5cbiAgLyoqIENvbnRlbnQgdGhhdCBpcyBzdHlsZWQgYXMgY29kZSBvciBtb25vc3BhY2UuICovXG4gIHt0YWc6IHRhZ3MubW9ub3NwYWNlLCBjb2xvcjogJ3ZhcigtLWNvZGUtbW9ub3NwYWNlKSd9LFxuXG4gIC8qKiBDb250ZW50IHRoYXQgaGFzIGEgc3RyaWtlLXRocm91Z2ggc3R5bGUuICovXG4gIHt0YWc6IHRhZ3Muc3RyaWtldGhyb3VnaCwgY29sb3I6ICd2YXIoLS1jb2RlLXN0cmlrZXRocm91Z2gpJ30sXG5cbiAgLyoqIEluc2VydGVkIHRleHQgaW4gYSBjaGFuZ2UtdHJhY2tpbmcgZm9ybWF0LiAqL1xuICB7dGFnOiB0YWdzLmluc2VydGVkLCBjb2xvcjogJ3ZhcigtLWNvZGUtaW5zZXJ0ZWQpJ30sXG5cbiAgLyoqIERlbGV0ZWQgdGV4dC4gKi9cbiAge3RhZzogdGFncy5kZWxldGVkLCBjb2xvcjogJ3ZhcigtLWNvZGUtZGVsZXRlZCknfSxcblxuICAvKiogQ2hhbmdlZCB0ZXh0LiAqL1xuICB7dGFnOiB0YWdzLmNoYW5nZWQsIGNvbG9yOiAndmFyKC0tY29kZS1jaGFuZ2VkKSd9LFxuXG4gIC8qKiBBbiBpbnZhbGlkIG9yIHVuc3ludGFjdGljIGVsZW1lbnQuICovXG4gIHt0YWc6IHRhZ3MuaW52YWxpZCwgY29sb3I6ICd2YXIoLS1jb2RlLWludmFsaWQpJ30sXG5cbiAgLyoqIE1ldGFkYXRhIG9yIG1ldGEtaW5zdHJ1Y3Rpb24uICovXG4gIHt0YWc6IHRhZ3MubWV0YSwgY29sb3I6ICd2YXIoLS1jb2RlLW1ldGEpJ30sXG5cbiAgLyoqIE1ldGFkYXRhIHRoYXQgYXBwbGllcyB0byB0aGUgZW50aXJlIGRvY3VtZW50LiAqL1xuICB7dGFnOiB0YWdzLmRvY3VtZW50TWV0YSwgY29sb3I6ICd2YXIoLS1jb2RlLWRvY3VtZW50LW1ldGEpJ30sXG5cbiAgLyoqIE1ldGFkYXRhIHRoYXQgYW5ub3RhdGVzIG9yIGFkZHMgYXR0cmlidXRlcyB0byBhIGdpdmVuIHN5bnRhY3RpYyBlbGVtZW50LiAqL1xuICB7dGFnOiB0YWdzLmFubm90YXRpb24sIGNvbG9yOiAndmFyKC0tY29kZS1hbm5vdGF0aW9uKSd9LFxuXG4gIC8qKiBQcm9jZXNzaW5nIGluc3RydWN0aW9uIG9yIHByZXByb2Nlc3NvciBkaXJlY3RpdmUuIFN1YnRhZyBvZiBtZXRhLiAqL1xuICB7dGFnOiB0YWdzLnByb2Nlc3NpbmdJbnN0cnVjdGlvbiwgY29sb3I6ICd2YXIoLS1jb2RlLXByb2Nlc3NpbmctaW5zdHJ1Y3Rpb24pJ30sXG5dO1xuIl19