import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Adventure from './Adventure'

const StyledList = styled.section`
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
    <h1>Journals</h1>

    <Query query={ADVENTURES_QUERY}>
      {({ loading, error, data }) => {
        if (loading || error) {
          return null
        }

        return (
          <div className='list'>
            {data.adventures.map(adventure => (
              <Adventure key={adventure.id} adventure={adventure} />
            ))}
          </div>
        )
      }}
    </Query>
  </StyledList>
)

export default Adventures
