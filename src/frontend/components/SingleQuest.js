import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const StyledSingleQuest = styled.div``

export const SINGLE_QUEST_QUERY = gql`
  query SINGLE_QUEST_QUERY($id: ID!) {
    quest(where: { id: $id }) {
      id
      title
      description
      completed
      createdAt
      updatedAt
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.id
 */
const SingleQuest = props => (
  <Query query={SINGLE_QUEST_QUERY} variables={{ id: props.id }}>
    {({ loading, data: { quest } }) => {
      if (loading) {
        return <p>Loading...</p>
      } else if (!quest) {
        return <p>No quest found for ID {props.id}</p>
      }

      return (
        <StyledSingleQuest>
          <h1>{quest.title}</h1>

          <p>{quest.completed ? '' : 'Not '}Completed</p>

          <p>{quest.description}</p>
        </StyledSingleQuest>
      )
    }}
  </Query>
)

SingleQuest.defaultProps = { id: '' }

export default SingleQuest
