import React from 'react'
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
    }
  }
`

const StyledAdventure = styled.div``

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

          <h1>{adventure.title}</h1>
          <p>{adventure.description}</p>
        </StyledAdventure>
      )
    }}
  </Query>
)

SingleAdventure.defaultProps = {
  id: ''
}

export default SingleAdventure
