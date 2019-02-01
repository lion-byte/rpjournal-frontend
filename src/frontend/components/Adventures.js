import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Adventure from './Adventure'
import Title from './Title'

const StyledList = styled.div`
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
    grid-gap: 2em;
  }
`

export const ADVENTURES_QUERY = gql`
  query ADVENTURES_QUERY {
    adventures {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

const Adventures = props => (
  <StyledList>
    <Title title='Adventures' />

    <h1>Adventures</h1>

    <Query query={ADVENTURES_QUERY}>
      {({ loading, error, data: { adventures } }) => {
        if (loading || error || !Array.isArray(adventures)) {
          return null
        } else if (adventures.length === 0) {
          return (
            <p>
              Oh. No adventures have been written yet. Care to start your own?
            </p>
          )
        }

        return (
          <div className='list'>
            {adventures.map(adventure => (
              <Adventure key={adventure.id} adventure={adventure} />
            ))}
          </div>
        )
      }}
    </Query>
  </StyledList>
)

export default Adventures
