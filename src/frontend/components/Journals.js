import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Journal from './Journal'

const StyledList = styled.section`
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 2em;
  }
`

export const JOURNALS_QUERY = gql`
  query JOURNALS_QUERY {
    journals {
      id
      title
      description
      quests {
        id
        completed
      }
      sessions {
        id
      }
    }
  }
`

const Journals = props => (
  <StyledList>
    <h2>Journals</h2>

    <Query query={JOURNALS_QUERY}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return null
        }

        return (
          <div className='list'>
            {data.journals.map(journal => (
              <Journal key={journal.id} journal={journal} />
            ))}

            {data.journals.map(journal => (
              <Journal key={journal.id} journal={journal} />
            ))}

            {data.journals.map(journal => (
              <Journal key={journal.id} journal={journal} />
            ))}
          </div>
        )
      }}
    </Query>
  </StyledList>
)

export default Journals
