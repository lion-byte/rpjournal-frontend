import React from 'react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import DetailsMenu from './styles/DetailsMenu'
import Quest from './Quest'
import Session from './Session'
import Title from './Title'
import User from './User'

const StyledAdventure = styled.div`
  .additional-details {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: repeat(auto-fit, minmax(18em, 1fr));
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
      owner {
        id
        name
      }
      sessions(orderBy: title_ASC) {
        id
        title
        description
      }
      quests(orderBy: title_ASC) {
        id
        title
        description
        completed
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
    {({ loading, error, data }) => {
      /** @type {AdventureModel} */
      const adventure = data.adventure
      if (loading) {
        return <p>Loading...</p>
      } else if (error) {
        return <p>Error. {error.message}</p>
      } else if (!adventure) {
        return <p>No adventure found for ID {props.id}</p>
      }

      return (
        <StyledAdventure>
          <Title title={adventure.title} />

          <header>
            <h1>{adventure.title}</h1>
            <DetailsMenu>
              <div className='details'>
                <span>By {adventure.owner.name}</span>
                <span>
                  Created <TimeAgo date={adventure.createdAt} />
                </span>
                <span>
                  Updated <TimeAgo date={adventure.updatedAt} />
                </span>
              </div>
              <User>
                {({ data: { me } }) => {
                  if (!me || adventure.owner.id !== me.id) {
                    return null
                  }

                  return (
                    <div className='options'>
                      <Link
                        href={{
                          pathname: '/new-session',
                          query: { adventureId: adventure.id }
                        }}
                      >
                        <a>+ New Session</a>
                      </Link>
                      <Link
                        href={{
                          pathname: '/new-quest',
                          query: { adventureId: adventure.id }
                        }}
                      >
                        <a>+ New Quest</a>
                      </Link>
                      <Link
                        href={{
                          pathname: '/update-adventure',
                          query: { id: adventure.id }
                        }}
                      >
                        <a>Update Adventure</a>
                      </Link>
                    </div>
                  )
                }}
              </User>
            </DetailsMenu>
          </header>

          <section
            dangerouslySetInnerHTML={{ __html: adventure.description }}
          />

          <div className='additional-details'>
            <section className='sessions'>
              <h2>Sessions</h2>

              {adventure.sessions.length === 0 ? (
                <p>No sessions yet.</p>
              ) : (
                adventure.sessions.map(session => (
                  <Session key={session.id} session={session} />
                ))
              )}
            </section>

            <section className='quests'>
              <h2>Quests</h2>

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
