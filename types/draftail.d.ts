import * as CSS from 'csstype'
import * as Draft from 'draft-js'
import * as React from 'react'

export = Draftail
export as namespace Draftail

declare namespace Draftail {
  interface DraftailEditorProps {
    // Initial content of the editor. Use this to edit pre-existing content.
    rawContentState?: Draft.RawDraftContentState
    // Called when changes occured. Use this to persist editor content.
    onSave?: (contentState: Draft.RawDraftContentState) => void
    // Displayed when the editor is empty. Hidden if the user changes styling.
    placeholder?: string
    // Enable the use of horizontal rules in the editor. [Default: false]
    enableHorizontalRule?: boolean
    // Enable the use of line breaks in the editor. [Default: false]
    enableLineBreak?: boolean
    // Show undo control in the toolbar. [Default: false]
    showUndoControl?: boolean
    // Show redo control in the toolbar. [Default: false]
    showRedoControl?: boolean
    // Disable copy/paste of rich text in the editor. [Default: true]
    stripPastedStyles?: boolean
    // Set whether spellcheck is turned on for your editor. [Default: false]
    // See https://draftjs.org/docs/api-reference-editor.html#spellcheck.
    spellCheck?: boolean
    // Optionally set the overriding text alignment for this editor.
    // See https://draftjs.org/docs/api-reference-editor.html#textalignment.
    textAlignment?: any
    // Optionally set the overriding text directionality for this editor.
    // See https://draftjs.org/docs/api-reference-editor.html#textdirectionality.
    textDirectionality?: any
    // Set if auto capitalization is turned on and how it behaves.
    // See https://draftjs.org/docs/api-reference-editor.html#autocapitalize-string.
    autoCapitalize?: any
    // Set if auto complete is turned on and how it behaves.
    // See https://draftjs.org/docs/api-reference-editor.html#autocomplete-string.
    autoComplete?: any
    // Set if auto correct is turned on and how it behaves.
    // See https://draftjs.org/docs/api-reference-editor.html#autocorrect-string.
    autoCorrect?: any
    // See https://draftjs.org/docs/api-reference-editor.html#aria-props.
    ariaDescribedBy?: any
    // List of the available block types.
    blockTypes?: Array<any>
    // List of the available inline styles.
    inlineStyles?: Array<any>
    // List of the available entity types.
    entityTypes?: Array<any>
    // List of active decorators.
    decorators?: Array<any>
    // Additional React components to render in the toolbar.
    controls?: Array<any>
    // Max level of nesting for list items. 0 = no nesting. Maximum = 10. [Default: 1]
    maxListNesting?: number
    // Frequency at which to call the save callback (ms). [Default: 250]
    stateSaveInterval?: number
  }

  export class DraftailEditor extends React.Component<DraftailEditorProps> {}

  interface InlineStyle {
    // Unique type shared between inline style instances.
    type: string
    // Describes the inline style in the editor UI, concisely.
    label?: string
    // Describes the inline style in the editor UI.
    description?: string
    // Represents the inline style in the editor UI.
    icon: any
    // CSS properties (in JS format) to apply for styling within the editor area.
    style: CSS.Properties<string | number>
  }

  interface BlockType {
    // Unique type shared between block instances.
    type: string
    // Describes the block in the editor UI, concisely.
    label?: string
    // Describes the block in the editor UI.
    description?: string
    // Represents the block in the editor UI.
    icon?: any
    // DOM element used to display the block within the editor area.
    element?: string
  }

  interface EntityType {
    // Unique type shared between entity instances.
    type: string
    // Describes the entity in the editor UI, concisely.
    label?: string
    // Describes the entity in the editor UI.
    description?: string
    // Represents the entity in the editor UI.
    icon: any
    // React component providing the UI to manage entities of this type.
    source: React.Component
    // React component to display inline entities.
    decorator?: React.Component
    // React component to display block-level entities.
    block?: React.Component
    // Array of attributes the entity uses, to preserve when filtering entities on paste.
    // If undefined, all entity data is preserved.
    attributes?: Array<string>
    // Attribute - regex mapping, to whitelist entities based on their data on paste.
    // For example, { url: '^https:' } will only preserve links that point to HTTPS URLs.
    whitelist: { [key: string]: string }
  }

  interface Decorator {
    // Determines which pieces of content are to be decorated.
    strategy?: () => void
    // React component to display the decoration.
    component?: React.Component
  }

  interface Control {
    // Retrieve the full Draft.js EditorState.
    getEditorState?: () => void
    // Change any part of the EditorState.
    onChange?: () => void
  }

  // See https://github.com/facebook/draft-js/blob/master/src/model/immutable/DefaultDraftInlineStyle.js
  export const INLINE_STYLE: {
    BOLD: 'BOLD'
    ITALIC: 'ITALIC'
    CODE: 'CODE'
    UNDERLINE: 'UNDERLINE'
    STRIKETHROUGH: 'STRIKETHROUGH'
    MARK: 'MARK'
    QUOTATION: 'QUOTATION'
    SMALL: 'SMALL'
    SAMPLE: 'SAMPLE'
    INSERT: 'INSERT'
    DELETE: 'DELETE'
    KEYBOARD: 'KEYBOARD'
    SUPERSCRIPT: 'SUPERSCRIPT'
    SUBSCRIPT: 'SUBSCRIPT'
  }

  // See https://github.com/facebook/draft-js/blob/master/src/model/immutable/DefaultDraftBlockRenderMap.js
  export const BLOCK_TYPE: {
    // This is used to represent a normal text block (paragraph).
    UNSTYLED: 'unstyled'
    HEADER_ONE: 'header-one'
    HEADER_TWO: 'header-two'
    HEADER_THREE: 'header-three'
    HEADER_FOUR: 'header-four'
    HEADER_FIVE: 'header-five'
    HEADER_SIX: 'header-six'
    UNORDERED_LIST_ITEM: 'unordered-list-item'
    ORDERED_LIST_ITEM: 'ordered-list-item'
    BLOCKQUOTE: 'blockquote'
    CODE: 'code-block'
    // This represents a "custom" block, not for rich text, with arbitrary content.
    ATOMIC: 'atomic'
  }

  export const ENTITY_TYPE: {
    LINK: 'LINK'
    IMAGE: 'IMAGE'
    HORIZONTAL_RULE: 'HORIZONTAL_RULE'
  }

  export const Icon: any
  export const ToolbarButton: any
  export const DraftUtils: any
}
