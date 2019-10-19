import React from 'react'

import useUser from './hooks/useUser'

/** @type {React.Context<UserModel>} */
export const UserContext = React.createContext(null)

export function UserProvider (props) {
  const { loading, error, data } = useUser()

  return (
    <UserContext.Provider value={loading || error ? null : data.me}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
