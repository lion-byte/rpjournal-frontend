import React from 'react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import DetailsMenu from './styles/DetailsMenu'
import ErrorMessage from './ErrorMessage'
import Quest from './Quest'
import Title from './Title'
import User from './User'

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
      adventure {
        id
        title
        owner {
          id
          name
        }
        quests(where: { id_not: $id }) {
          id
          title
          description
          completed
        }
      }
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.id
 */
const SingleQuest = props => (
  <Query query={SINGLE_QUEST_QUERY} variables={{ id: props.id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>
      } else if (error) {
        return <ErrorMessage error={error} />
      } else if (!data.quest) {
        return <p>No quest found for ID {props.id}</p>
      }

      /** @type {QuestModel} */
      const quest = data.quest

      return (
        <StyledSingleQuest>
          <Title title={`${quest.title} | ${quest.adventure.title}`} />

          <header>
            <h1>{quest.title}</h1>
            <DetailsMenu>
              <div className='details'>
                <span>
                  Created <TimeAgo date={quest.createdAt} />
                </span>
                <span>
                  Updated <TimeAgo date={quest.updatedAt} />
                </span>
                <span>
                  Adventure -{' '}
                  <Link
                    href={{
                      pathname: '/adventure',
                      query: { id: quest.adventure.id }
                    }}
                  >
                    <a>{quest.adventure.title}</a>
                  </Link>
                </span>
              </div>

              <User>
                {({ data, error }) => {
                  if (
                    error ||
                    !data.me ||
                    quest.adventure.owner.id !== data.me.id
                  ) {
                    return null
                  }

                  return (
                    <div className='options'>
                      <Link
                        href={{
                          pathname: '/update-quest',
                          query: { id: quest.id }
                        }}
                      >
                        <a>Update Quest</a>
                      </Link>
                    </div>
                  )
                }}
              </User>
            </DetailsMenu>
          </header>

          <p>{quest.completed ? '' : 'Not '}Completed</p>

          <section dangerouslySetInnerHTML={{ __html: quest.description }} />

          <footer>
            <h2>Other Quests</h2>
            {quest.adventure.quests.length === 0 ? (
              <p>No other quests.</p>
            ) : (
              <div className='other-quests'>
                {quest.adventure.quests.map(otherQuest => (
                  <Quest key={quest.id} quest={otherQuest} />
                ))}
              </div>
            )}
          </footer>
        </StyledSingleQuest>
      )
    }}
  </Query>
)

SingleQuest.defaultProps = { id: '' }

export default SingleQuest
