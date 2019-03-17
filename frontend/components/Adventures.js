import React from 'react'
import Link from 'next/link'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

import { fillerBackgroundImage } from '../lib/filler'
import Banner from './styles/Banner'
import DetailsMenu from './styles/DetailsMenu'
import ErrorMessage from './ErrorMessage'
import User from './User'

const StyledAdventures = styled.div`
  .adventure-list {
    display: grid;
    grid-gap: 2em;
    grid-template-columns: 1fr;

    @media screen and (min-width: 60em) {
      grid-template-columns: 1fr 1fr;
    }

    .adventure {
      border: 0.125em solid ${props => props.theme.offWhite};
      word-wrap: break-word;

      .info {
        align-items: flex-start;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 1em 0.5em;

        h1 {
          margin: 0;
          max-width: 20em;
        }

        time {
          text-align: right;
        }
      }
    }
  }

  pre {
    white-space: pre-wrap;
  }
`

const Adventures = () => (
  <StyledAdventures>
    <header>
      <h1>Adventures</h1>
      <User>
        {({ data, error }) => {
          if (error || !data.me) {
            return null
          }

          return (
            <DetailsMenu>
              <div className='options'>
                <Link href='/new-adventure'>
                  <a>+ New Adventure</a>
                </Link>
              </div>
            </DetailsMenu>
          )
        }}
      </User>
    </header>

    <User>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>
        } else if (error) {
          return <ErrorMessage error={error} />
        }

        /** @type {UserModel} */
        const me = data.me

        if (!me) {
          return <p>Login to see your adventures.</p>
        } else if (me.adventures.length === 0) {
          return <p>No adventures have been written yet.</p>
        }

        return (
          <div className='adventure-list'>
            {me.adventures.map(adventure => (
              <article className='adventure' key={adventure.id}>
                <Banner
                  style={{
                    backgroundImage: `url(${fillerBackgroundImage()})`
                  }}
                />

                <div className='info'>
                  <h1>
                    <Link
                      href={{
                        pathname: '/adventure',
                        query: { id: adventure.id }
                      }}
                    >
                      <a>{adventure.title}</a>
                    </Link>
                  </h1>

                  <TimeAgo date={adventure.updatedAt} />
                </div>
              </article>
            ))}
          </div>
        )
      }}
    </User>
  </StyledAdventures>
)

export default Adventures
