import React from 'react'
import styled from 'styled-components'

import { fillerImage } from '../lib/filler'

const StyledJournal = styled.article`
  img {
    object-fit: contain;
    max-width: 100%;
  }
`

/**
 * @param {object} props
 * @param {JournalModel} props.journal
 * @returns {React.ReactElement}
 */
const Journal = props => {
  const { journal } = props

  const totalQuests = journal.quests.length
  const completedQuests = journal.quests.reduce(
    (prev, curr) => (curr.completed ? prev + 1 : prev),
    0
  )

  const img = fillerImage({ text: journal.title })

  return (
    <StyledJournal>
      <h1>{journal.title}</h1>

      <img src={img} alt={journal.title} />

      <p>{journal.description}</p>

      <footer>
        <p>
          Quests Completed: ({completedQuests}/{totalQuests})
        </p>
      </footer>
    </StyledJournal>
  )
}

export default Journal
