import React from 'react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import DetailsMenu from './styles/DetailsMenu'
import ErrorMessage from './ErrorMessage'
import Title from './Title'
import User from './User'

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
const SingleSession = props => (
  <Query query={SINGLE_SESSION_QUERY} variables={{ id: props.id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <p>Loading...</p>
      } else if (error) {
        return <ErrorMessage error={error} />
      } else if (!data.session) {
        return <p>No session found for ID {props.id}</p>
      }

      /** @type {SessionModel} */
      const session = data.session

      return (
        <StyledSingleSession>
          <Title title={`${session.title} | ${session.adventure.title}`} />

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
                      query: { id: session.adventure.id }
                    }}
                  >
                    <a>{session.adventure.title}</a>
                  </Link>
                </span>
              </div>
              <User>
                {({ data: { me } }) => {
                  if (!me || session.adventure.owner.id !== me.id) {
                    return null
                  }

                  return (
                    <div className='options'>
                      <Link
                        href={{
                          pathname: '/update-session',
                          query: { id: session.id }
                        }}
                      >
                        <a>Update Session</a>
                      </Link>
                    </div>
                  )
                }}
              </User>
            </DetailsMenu>
          </header>

          <section
            className='detail-notes'
            dangerouslySetInnerHTML={{ __html: session.description }}
          />
        </StyledSingleSession>
      )
    }}
  </Query>
)

SingleSession.defaultProps = { id: '' }

export default SingleSession
