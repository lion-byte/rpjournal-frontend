import React from 'react'
import styled from 'styled-components'

const StyledJournal = styled.article`
  img {
    object-fit: contain;
    max-width: 100%;
  }
`

/**
 * @param {string} text
 * @returns {string}
 */
const fillerImage = text =>
  `https://via.placeholder.com/640x480.png/535353/eeeeee?text=${encodeURI(
    text
  )}`

/**
 * @param {object} props
 * @param {JournalModel} props.journal
 * @returns {React.ReactElement}
 */
const Journal = props => {
  const { journal } = props

  return (
    <StyledJournal>
      <h1>{journal.title}</h1>

      <img src={fillerImage(journal.title)} alt={journal.title} />

      <p>{journal.description}</p>

      <footer>
        <p>Entry Count: {journal.sessions.length}</p>
      </footer>
    </StyledJournal>
  )
}

export default Journal
