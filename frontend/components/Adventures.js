import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import DetailsMenu from './styles/DetailsMenu'
import Adventure from './Adventure'
import ErrorMessage from './ErrorMessage'
import User from './User'

const StyledAdventures = styled.div`
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30em, 1fr));
    grid-gap: 2em;
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
          <div className='list'>
            {me.adventures.map(adventure => (
              <Adventure key={adventure.id} adventure={adventure} />
            ))}
          </div>
        )
      }}
    </User>
  </StyledAdventures>
)

export default Adventures
