import React from 'react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import Quest from './Quest'
import Session from './Session'
import Title from './Title'

const StyledAdventure = styled.div`
  & > header {
    .dates {
      font-size: 0.8em;
    }

    .menu {
      a {
        background-color: ${props => props.theme.primaryColor};
        border-radius: 1em;
        color: ${props => props.theme.white};
        display: inline-block;
        font-size: 0.8em;
        font-weight: bold;
        margin: 0 0.5em 0.5em 0;
        padding: 0.5em 0.75em;
        text-decoration: none;

        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
    }
  }

  .additional-details {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(18em, 1fr));

    .sessions,
    .quests {
    }
  }
`

export const SINGLE_ADVENTURE_QUERY = gql`
  query SINGLE_ADVENTURE_QUERY($id: ID!) {
    adventure(where: { id: $id }) {
      id
      title
      description
      createdAt
      updatedAt
      sessions(orderBy: title_ASC) {
        id
        title
        description
        createdAt
        updatedAt
      }
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

          <header>
            <h1>{adventure.title}</h1>

            <p className='dates'>
              <span>
                Created <TimeAgo date={adventure.createdAt} />
              </span>

              <span>
                Updated <TimeAgo date={adventure.updatedAt} />
              </span>
            </p>

            <div className='menu'>
              <a href='#'>+ New Session</a>

              <a href='#'>+ New Quest</a>

              <Link
                href={{
                  pathname: '/update-adventure',
                  query: { id: adventure.id }
                }}
              >
                <a>Update Adventure</a>
              </Link>
            </div>
          </header>

          <p>{adventure.description}</p>

          <div className='additional-details'>
            <section className='sessions'>
              <h3>Sessions</h3>

              {adventure.sessions.length === 0 ? (
                <p>No sessions yet.</p>
              ) : (
                adventure.sessions.map(session => (
                  <Session key={session.id} session={session} />
                ))
              )}
            </section>

            <section className='quests'>
              <h3>Quests</h3>

              {adventure.quests.length === 0 ? (
                <p>No quests yet.</p>
              ) : (
                adventure.quests.map(quest => (
                  <Quest key={quest.id} quest={quest} />
                ))
              )}
            </section>
          </div>
        </StyledAdventure>
      )
    }}
  </Query>
)

SingleAdventure.defaultProps = {
  id: ''
}

export default SingleAdventure
