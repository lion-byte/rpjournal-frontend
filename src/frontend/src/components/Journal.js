import React from 'react'
import dummy from 'dummyjs'
import styled from 'styled-components'

const StyledJournal = styled.article`
  img {
    object-fit: contain;
    max-height: 100%;
    max-width: 100%;
  }
`

/**
 * @typedef {object} Journal
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} entryCount
 */

/**
 * @param {object} props
 * @param {Journal} props.journal
 */
const Journal = props => {
  const { journal } = props

  return (
    <StyledJournal>
      <h1>{journal.title}</h1>

      <img src={dummy.image(640, 480)} alt={journal.title} />

      <p>{journal.description}</p>

      <footer>
        <p>Entry Count: {journal.entryCount}</p>
      </footer>
    </StyledJournal>
  )
}

export default Journal
