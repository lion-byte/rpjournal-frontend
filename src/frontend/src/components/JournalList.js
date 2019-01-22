import React from 'react'
import styled from 'styled-components'

import journals from '../data/journals.json'
import Journal from './Journal'

const StyledList = styled.section`
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 2em;
  }
`

const JournalList = props => (
  <StyledList>
    <h2>Journals</h2>

    <div className='list'>
      {journals.map(journal => (
        <Journal key={journal.id} journal={journal} />
      ))}
    </div>
  </StyledList>
)

export default JournalList
