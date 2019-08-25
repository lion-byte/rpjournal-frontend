import React from 'react'
import Link from 'next/link'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

import ErrorMessage from './ErrorMessage'

export const SESSIONS_QUERY = gql`
  query SESSIONS_QUERY($adventureId: ID!) {
    adventure(where: { id: $adventureId }) {
      id
      sessions(orderBy: title_ASC) {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`

const SessionList = styled.div`
  .session {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    .content {
      flex: 1 1 auto;
      margin-right: 1em;

      header {
        align-items: flex-start;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;

        h1 {
          margin: 0;
        }
      }
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.adventureId
 */
export function Sessions (props) {
  const { loading, error, data } = useQuery(SESSIONS_QUERY, {
    variables: { adventureId: props.adventureId }
  })

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  }

  /** @type {AdventureModel} */
  const adventure = data.adventure

  if (!adventure) {
    return <p>No adventure found for ID: {props.adventureId}</p>
  } else if (adventure.sessions.length === 0) {
    return <p>No sessions yet.</p>
  }

  return (
    <SessionList>
      {adventure.sessions.map((session, index) => (
        <article key={session.id} className='session'>
          <div className='content'>
            <header>
              <h1>
                <Link
                  href={{
                    pathname: '/session',
                    query: { id: session.id }
                  }}
                >
                  <a>
                    {index + 1} - {session.title}
                  </a>
                </Link>
              </h1>
              <TimeAgo date={session.updatedAt} />
            </header>
          </div>
        </article>
      ))}
    </SessionList>
  )
}

export default Sessions
