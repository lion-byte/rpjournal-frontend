import React from 'react'
import styled from 'styled-components'

const StyledDescription = styled.section`
  line-height: 1.5;
`

/**
 * Displays rich text information
 * @param {object} props
 * @param {string} props.info
 */
export function Description (props) {
  return <StyledDescription dangerouslySetInnerHTML={{ __html: props.info }} />
}

export default Description
