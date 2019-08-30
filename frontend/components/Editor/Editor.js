import React, { PureComponent } from 'react'
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from 'draftail'
import styled from 'styled-components'

const EditorStyles = styled.section`
  .Draftail-Toolbar {
    background-color: ${props => props.theme.darkGray};
    color: ${props => props.theme.white};
  }
  .DraftEditor-root {
    font-size: 0.67em;
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
 * @property {string} [initialText] Initial data to fill the Editor
 * @property {(jsonString: string) => void} [onSave]
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

    this.props.onSave(JSON.stringify(rawContent))
  }

  render () {
    const {
      state: { showEditor },
      props: { initialText }
    } = this

    if (!showEditor) {
      return null
    }

    const content = JSON.parse(initialText)

    return (
      <EditorStyles>
        <DraftailEditor
          rawContentState={content}
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

Editor.defaultProps = {
  initialText: null
}

export default Editor
