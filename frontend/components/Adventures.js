import React from 'react'
import Link from 'next/link'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'

import { fillerBackgroundImage } from '../lib/filler'
import { useUser } from './hooks/useUser'
import Banner from './styles/Banner'
import DetailsMenu from './styles/DetailsMenu'
import ErrorMessage from './ErrorMessage'

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

export function Adventures () {
  const { loading, error, data } = useUser()

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!data.me) {
    return <p>Login to see your adventures.</p>
  }

  /** @type {UserModel} */
  const user = data.me

  return (
    <StyledAdventures>
      <header>
        <h1>Adventures</h1>

        <DetailsMenu>
          <div className='options'>
            <Link href='/new-adventure'>
              <a>+ New Adventure</a>
            </Link>
          </div>
        </DetailsMenu>
      </header>
      {user.adventures.length === 0 ? (
        <p>No adventures have been written yet.</p>
      ) : (
        <div className='adventure-list'>
          {user.adventures.map(adventure => (
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
      )}
      }
    </StyledAdventures>
  )
}

export default Adventures
