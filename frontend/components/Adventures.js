import React, { useContext } from 'react'
import Link from 'next/link'
import TimeAgo from 'react-timeago'
import styled from 'styled-components'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

import DetailsMenu from './styles/DetailsMenu'
import ErrorMessage from './ErrorMessage'
import { UserContext } from './UserProvider'

export const ADVENTURES_QUERY = gql`
  query ADVENTURES_QUERY {
    me {
      id
      adventures(orderBy: title_ASC) {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`

const StyledAdventures = styled.div`
  .adventure-list {
    overflow-x: auto;
    width: 100%;
    thead {
      background-color: ${props => props.theme.darkGray};
      color: ${props => props.theme.white};
    }
    td + td {
      text-align: right;
    }
  }
`

export function Adventures () {
  const user = useContext(UserContext)
  const { loading, error, data } = useQuery(ADVENTURES_QUERY)

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!user) {
    return <p>Login to see your adventures.</p>
  }

  /** @type {ReadonlyArray<AdventureModel>} */
  const adventures = data.me.adventures

  return (
    <StyledAdventures>
      <h1>Adventures</h1>

      <DetailsMenu>
        <div className='options'>
          <Link href='/new-adventure'>
            <a>+ New Adventure</a>
          </Link>
        </div>
      </DetailsMenu>

      <table className='pure-table pure-table-horizontal adventure-list'>
        <thead>
          <tr>
            <td>Title</td>
            <td>Updated</td>
          </tr>
        </thead>
        <tbody>
          {adventures.length === 0 ? (
            <tr>
              <td colSpan={2}>No adventures have been written yet.</td>
            </tr>
          ) : null}
          {adventures.map(adventure => (
            <tr key={adventure.id}>
              <td>
                <Link
                  href={{
                    pathname: '/adventure',
                    query: { id: adventure.id }
                  }}
                >
                  <a>{adventure.title}</a>
                </Link>
              </td>
              <td>
                <TimeAgo date={adventure.updatedAt} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledAdventures>
  )
}

export default Adventures
