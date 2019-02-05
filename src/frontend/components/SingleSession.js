import React from 'react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import DetailsMenu from './styles/DetailsMenu'
import Session from './Session'

const StyledSingleSession = styled.div``

export const SINGLE_SESSION_QUERY = gql`
  query SINGLE_SESSION_QUERY($id: ID!) {
    session(where: { id: $id }) {
      id
      title
      description
      createdAt
      updatedAt
      adventure {
        id
        title
        sessions(where: { id_not: $id }) {
          id
          title
          description
        }
      }
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

      /** @type {AdventureModel} */
      const adventure = session.adventure

      return (
        <StyledSingleSession>
          <header>
            <h1>{session.title}</h1>
            <DetailsMenu>
              <div className='details'>
                <span>
                  Created <TimeAgo date={session.createdAt} />
                </span>
                <span>
                  Updated <TimeAgo date={session.updatedAt} />
                </span>
                <span>
                  Adventure -{' '}
                  <Link
                    href={{
                      pathname: '/adventure',
                      query: { id: adventure.id }
                    }}
                  >
                    <a>{adventure.title}</a>
                  </Link>
                </span>
              </div>
              <div className='options'>
                <a href='#'>Update Session</a>
              </div>
            </DetailsMenu>
          </header>

          <section>
            <p>{session.description}</p>
          </section>

          <footer>
            <h2>Other Sessions</h2>
            {adventure.sessions.length === 0 ? (
              <p>No other sessions.</p>
            ) : (
              <div className='other-sessions'>
                {adventure.sessions.map(otherSession => (
                  <Session key={otherSession.id} session={otherSession} />
                ))}
              </div>
            )}
          </footer>
        </StyledSingleSession>
      )
    }}
  </Query>
)

SingleSession.defaultProps = { id: '' }

export default SingleSession
