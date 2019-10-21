import React from 'react'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      name
      email
      permissions
    }
  }
`

/** @type {React.Context<UserModel>} */
export const UserContext = React.createContext(null)

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function UserProvider (props) {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY)

  return (
    <UserContext.Provider value={loading || error ? null : data.me}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
