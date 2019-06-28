import React from 'react'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { fillerBackgroundImage } from '../lib/filler'
import Banner from './styles/Banner'
import DetailsMenu from './styles/DetailsMenu'
import ErrorMessage from './ErrorMessage'
import Quests from './Quests'
import Sessions from './Sessions'
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
      if (loading) {
        return <p>Loading...</p>
      } else if (error) {
        return <ErrorMessage error={error} />
      } else if (!data.adventure) {
        return <p>No adventure found for ID {props.id}</p>
      }

      /** @type {AdventureModel} */
      const adventure = data.adventure

      return (
        <StyledAdventure>
          <Banner
            className='large'
            style={{
              backgroundImage: `url(${fillerBackgroundImage({
                width: 1600,
                height: 350
              })})`
            }}
          />

          <Title title={adventure.title} />

          <header>
            <h1>{adventure.title}</h1>
            <DetailsMenu>
              <div className='details'>
                <span>
                  Created <TimeAgo date={adventure.createdAt} />
                </span>
                <span>
                  Updated <TimeAgo date={adventure.updatedAt} />
                </span>
              </div>
              <User>
                {({ data, error }) => {
                  if (error || !data.me || adventure.owner.id !== data.me.id) {
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
            className='detail-notes'
            dangerouslySetInnerHTML={{ __html: adventure.description }}
          />

          <div className='additional-details'>
            <section className='sessions'>
              <h2>Sessions</h2>
              <Sessions adventureId={props.id} />
            </section>

            <section className='quests'>
              <h2>Quests</h2>
              <Quests adventureId={props.id} />
            </section>
          </div>
        </StyledAdventure>
      )
    }}
  </Query>
)

export default SingleAdventure
