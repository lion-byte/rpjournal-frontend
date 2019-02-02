import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

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
      <h1>
        <Link href={{ pathname: '/adventure', query: { id: adventure.id } }}>
          <a>{adventure.title}</a>
        </Link>
      </h1>

      <p>{adventure.description}</p>
    </StyledAdventure>
  )
}

export default Adventure
