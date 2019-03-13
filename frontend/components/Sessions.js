import React from 'react'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

import { fillerBackgroundImage } from '../lib/filler'
import ErrorMessage from './ErrorMessage'

const SESSIONS_QUERY = gql`
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

    img {
      object-fit: contain;
      width: 100%;
      max-width: 5em;
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.adventureId
 */
const Sessions = props => (
  <Query query={SESSIONS_QUERY} variables={{ adventureId: props.adventureId }}>
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
      } else if (adventure.sessions.length === 0) {
        return <p>No sessions yet.</p>
      }

      return (
        <SessionList>
          {adventure.sessions.map(session => (
            <article key={session.id} className='session'>
              <img
                src={fillerBackgroundImage({ height: 128, width: 128 })}
                alt={session.title}
              />

              <div className='content'>
                <header>
                  <h1>
                    <Link
                      href={{ pathname: '/session', query: { id: session.id } }}
                    >
                      <a>{session.title}</a>
                    </Link>
                  </h1>
                  <TimeAgo date={session.updatedAt} />
                </header>

                <section
                  dangerouslySetInnerHTML={{ __html: session.description }}
                />
              </div>
            </article>
          ))}
        </SessionList>
      )
    }}
  </Query>
)

export default Sessions
