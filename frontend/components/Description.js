import React from 'react'
import styled from 'styled-components'

import { dataToHTML } from '../lib/rich-text'

const StyledDescription = styled.section`
  line-height: 1.5;
`

/**
 * Displays rich text information
 * @param {object} props
 * @param {string} props.data
 */
export function Description (props) {
  return (
    <StyledDescription
      dangerouslySetInnerHTML={{ __html: dataToHTML(props.data) }}
    />
  )
}

export default Description
