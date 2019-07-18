import React from 'react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { useUser } from './hooks/useUser'
import DetailsMenu from './styles/DetailsMenu'
import ErrorMessage from './ErrorMessage'
import Title from './Title'

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
      }
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.id
 */
export function SingleQuest (props) {
  const { loading, error, data } = useQuery(SINGLE_QUEST_QUERY, {
    variables: { id: props.id }
  })
  const user = useUser()

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!data.quest) {
    return <p>No quest found for ID {props.id}</p>
  }

  /** @type {QuestModel} */
  const quest = data.quest
  const showControls =
    !user.loading &&
    !user.error &&
    user.data.me &&
    quest.adventure.owner.id === user.data.me.id

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

          {showControls ? (
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
          ) : null}
        </DetailsMenu>
      </header>

      <p>{quest.completed ? '' : 'Not '}Completed</p>

      <section
        className='detail-notes'
        dangerouslySetInnerHTML={{ __html: quest.description }}
      />
    </StyledSingleQuest>
  )
}

SingleQuest.defaultProps = { id: '' }

export default SingleQuest
