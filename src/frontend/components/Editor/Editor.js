import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from 'draftail'

const EditorStyles = styled.section`
  .Draftail-Toolbar {
    background-color: ${props => props.theme.darkGray};
    color: ${props => props.theme.white};
  }
`

const blockTypes = [
  { type: BLOCK_TYPE.UNSTYLED },
  { type: BLOCK_TYPE.HEADER_ONE },
  { type: BLOCK_TYPE.HEADER_TWO },
  { type: BLOCK_TYPE.HEADER_THREE },
  { type: BLOCK_TYPE.ORDERED_LIST_ITEM },
  { type: BLOCK_TYPE.UNORDERED_LIST_ITEM }
]

const inlineStyles = [
  { type: INLINE_STYLE.BOLD },
  { type: INLINE_STYLE.UNDERLINE },
  { type: INLINE_STYLE.ITALIC },
  { type: INLINE_STYLE.STRIKETHROUGH }
]

/**
 * @typedef {object} EditorProps
 * @property {(contentState: any) => void} [onSave]
 */

/**
 * @augments {PureComponent<EditorProps>}
 */
export class Editor extends PureComponent {
  state = { showEditor: false }

  componentDidMount () {
    this.setState({ showEditor: true })
  }

  render () {
    const {
      state: { showEditor },
      props: { onSave }
    } = this

    if (!showEditor) {
      return null
    }

    return (
      <EditorStyles>
        <DraftailEditor
          blockTypes={blockTypes}
          inlineStyles={inlineStyles}
          onSave={onSave}
          stateSaveInterval={500}
        />
      </EditorStyles>
    )
  }
}

export default Editor
