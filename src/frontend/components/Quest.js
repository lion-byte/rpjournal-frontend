import React from 'react'
import styled from 'styled-components'

const StyledQuest = styled.article`
  .quest-status {
    font-size: 0.8em;
  }
`

/**
 * @param {object} props
 * @param {QuestModel} props.quest
 */
const Quest = props => {
  const { quest } = props

  return (
    <StyledQuest>
      <h1>{quest.title}</h1>

      <p className='quest-status'>
        [{quest.completed ? 'Completed' : 'In Progress'}]
      </p>

      <p>{quest.description}</p>
    </StyledQuest>
  )
}

export default Quest
