import React from 'react'
import styled from 'styled-components'

const StyledAdventure = styled.article`
  img {
    object-fit: contain;
    max-width: 100%;
  }
`

/**
 * @param {object} props
 * @param {AdventureModel} props.adventure
 * @returns {React.ReactElement}
 */
const Adventure = props => {
  const { adventure } = props

  return (
    <StyledAdventure>
      <h1>{adventure.title}</h1>

      <p>{adventure.description}</p>
    </StyledAdventure>
  )
}

export default Adventure
