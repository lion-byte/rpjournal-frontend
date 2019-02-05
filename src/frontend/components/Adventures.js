import React from 'react'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import DetailsMenu from './styles/DetailsMenu'
import Adventure from './Adventure'

const StyledAdventuresPage = styled.div`
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
    grid-gap: 2em;
  }
`

export const ADVENTURES_QUERY = gql`
  query ADVENTURES_QUERY {
    adventures(orderBy: title_ASC) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

const Adventures = () => (
  <StyledAdventuresPage>
    <header>
      <h1>Adventures</h1>
      <DetailsMenu>
        <div className='options'>
          <Link href='/new-adventure'>
            <a>+ New Adventure</a>
          </Link>
        </div>
      </DetailsMenu>
    </header>

    <Query query={ADVENTURES_QUERY}>
      {({ loading, error, data }) => {
        /** @type {ReadonlyArray<AdventureModel>} */
        const adventures = data.adventures

        if (loading || error) {
          return null
        } else if (adventures.length === 0) {
          return <p>No adventures have been written yet.</p>
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
  </StyledAdventuresPage>
)

export default Adventures
