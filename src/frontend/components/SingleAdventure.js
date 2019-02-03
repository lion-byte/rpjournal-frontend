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
  .dates {
    font-size: 0.8em;
  }

  .additional-details {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(30em, 1fr));
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
              Created <TimeAgo date={adventure.createdAt} />
              {' | '}
              Updated <TimeAgo date={adventure.updatedAt} />
            </p>

            <p>
              <Link
                href={{
                  pathname: '/update-adventure',
                  query: { id: adventure.id }
                }}
              >
                <a>Update Adventure</a>
              </Link>
            </p>
          </header>

          <section className='description'>
            <h2>Description</h2>

            <p>{adventure.description}</p>
          </section>

          <div className='additional-details'>
            <section className='sessions'>
              <h2>Sessions</h2>

              {adventure.sessions.length === 0 ? (
                <p>
                  Well! There's no sessions recorded yet. Record your notes!
                </p>
              ) : (
                adventure.sessions.map(session => (
                  <Session key={session.id} session={session} />
                ))
              )}
            </section>

            <section className='quests'>
              <h2>Quests</h2>

              {adventure.quests.length === 0 ? (
                <p>
                  No quests yet. Feel free to set one up. Or you can enjoy your
                  own whims. Either way, have fun!
                </p>
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
