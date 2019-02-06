import React, { PureComponent } from 'react'
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from 'draftail'
import styled from 'styled-components'

import { exportHTML } from '../../lib/rich-text'

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
 * @property {(richHTML: string) => void} [onSave]
 */

/** @augments {PureComponent<EditorProps>} */
export class Editor extends PureComponent {
  state = { showEditor: false }

  componentDidMount () {
    this.setState({ showEditor: true })
  }

  handleSave = rawContent => {
    if (!this.props.onSave) {
      return
    }

    const html = exportHTML(rawContent)

    this.props.onSave(html)
  }

  render () {
    const {
      state: { showEditor }
    } = this

    if (!showEditor) {
      return null
    }

    return (
      <EditorStyles>
        <DraftailEditor
          blockTypes={blockTypes}
          enableHorizontalRule
          inlineStyles={inlineStyles}
          onSave={this.handleSave}
          stateSaveInterval={500}
        />
      </EditorStyles>
    )
  }
}

export default Editor
