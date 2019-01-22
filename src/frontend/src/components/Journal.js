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

const fillerImage = dummy.image(640, 480)

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

      <img src={fillerImage} alt={journal.title} />

      <p>{journal.description}</p>

      <footer>
        <p>Entry Count: {journal.sessions.length}</p>
      </footer>
    </StyledJournal>
  )
}

export default Journal
