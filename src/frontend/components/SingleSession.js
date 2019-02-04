import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const StyledSingleSession = styled.div``

export const SINGLE_SESSION_QUERY = gql`
  query SINGLE_SESSION_QUERY($id: ID!) {
    session(where: { id: $id }) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.id
 */
const SingleSession = props => (
  <Query query={SINGLE_SESSION_QUERY} variables={{ id: props.id }}>
    {({ loading, data: { session } }) => {
      if (loading) {
        return <p>Loading...</p>
      } else if (!session) {
        return <p>No session found for ID {props.id}</p>
      }

      return (
        <StyledSingleSession>
          <h1>{session.title}</h1>

          <p>{session.description}</p>
        </StyledSingleSession>
      )
    }}
  </Query>
)

SingleSession.defaultProps = { id: '' }

export default SingleSession
