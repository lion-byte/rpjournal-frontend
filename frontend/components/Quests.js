import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import ErrorMessage from './ErrorMessage'

export const QUESTS_QUERY = gql`
  query QUESTS_QUERY($adventureId: ID!) {
    adventure(where: { id: $adventureId }) {
      id
      quests(orderBy: title_ASC) {
        id
        title
        description
        completed
        createdAt
        updatedAt
      }
    }
  }
`

const QuestList = styled.div`
  background-color: ${props => props.theme.white};
  border: 0.25em solid ${props => props.theme.offWhite};
  border-top-width: 0.125em;
  border-bottom-width: 0.125em;

  .quest {
    border: 0 solid ${props => props.theme.offWhite};
    border-top-width: 0.125em;
    border-bottom-width: 0.125em;
    color: ${props => props.theme.black};
    padding: 1em;

    button {
      background-color: transparent;
      border: 0;
      color: inherit;
      text-align: left;
      width: 100%;
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.adventureId
 */
const Quests = props => (
  <Query query={QUESTS_QUERY} variables={{ adventureId: props.adventureId }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>
      } else if (error) {
        return <ErrorMessage error={error} />
      }

      /** @type {AdventureModel} */
      const adventure = data.adventure

      if (!adventure) {
        return <p>No adventure found for ID: {props.adventureId}</p>
      } else if (adventure.quests.length === 0) {
        return <p>No quests yet.</p>
      }

      return (
        <QuestList>
          {adventure.quests.map(quest => (
            <article key={quest.id} className='quest'>
              <button>
                <h1>{quest.title}</h1>
              </button>
            </article>
          ))}
        </QuestList>
      )
    }}
  </Query>
)

export default Quests
