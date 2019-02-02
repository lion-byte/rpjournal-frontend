import React from 'react'
import TimeAgo from 'react-timeago'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Title from './Title'

export const SINGLE_ADVENTURE_QUERY = gql`
  query SINGLE_ADVENTURE_QUERY($id: ID!) {
    adventure(where: { id: $id }) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

const StyledAdventure = styled.div`
  .dates {
    font-size: 0.8em;
  }
`

/**
 * @param {object} props
 * @param {string} props.id
 */
const SingleAdventure = props => (
  <Query query={SINGLE_ADVENTURE_QUERY} variables={{ id: props.id }}>
    {({ loading, error, data: { adventure } }) => {
      if (loading) {
        return <p>Loading...</p>
      } else if (error) {
        return <p>Error. {error.message}</p>
      } else if (!adventure) {
        return <p>Nothing found with this id: {props.id}</p>
      }

      return (
        <StyledAdventure>
          <Title title={adventure.title} />

          <header>
            <h1>{adventure.title}</h1>

            <p className='dates'>
              Created <TimeAgo date={adventure.createdAt} />
              {' | '}
              Updated <TimeAgo date={adventure.updatedAt} />
            </p>
          </header>

          <section>
            <p>{adventure.description}</p>
          </section>
        </StyledAdventure>
      )
    }}
  </Query>
)

SingleAdventure.defaultProps = {
  id: ''
}

export default SingleAdventure
