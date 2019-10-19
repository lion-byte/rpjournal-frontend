import React, { useState, useEffect } from 'react'
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from 'draftail'
import styled from 'styled-components'

const EditorStyles = styled.section`
  .Draftail-Editor {
    margin-bottom: 0.5em;
  }
  .Draftail-Toolbar {
    background-color: ${props => props.theme.darkGray};
    color: ${props => props.theme.white};
  }
  .DraftEditor-root {
    font-size: 1em;
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
 * @param {object} props
 * @param {string} [props.initialText] Initial data to fill the Editor
 * @param {(jsonString: string) => void} [props.onSave]
 */
export function Editor (props) {
  const [showEditor, setShowEditor] = useState(false)

  useEffect(() => {
    setShowEditor(true)
  }, [showEditor])

  const onSave = rawContent => {
    if (!props.onSave) {
      return
    }

    props.onSave(JSON.stringify(rawContent))
  }

  if (!showEditor) {
    return null
  }

  const content = JSON.parse(props.initialText)

  return (
    <EditorStyles>
      <DraftailEditor
        rawContentState={content}
        blockTypes={blockTypes}
        enableHorizontalRule
        inlineStyles={inlineStyles}
        onSave={onSave}
        stateSaveInterval={500}
      />
    </EditorStyles>
  )
}

Editor.defaultProps = {
  initialText: null
}

export default Editor
