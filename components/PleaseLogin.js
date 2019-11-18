import React, { useContext } from 'react'

import Login from './Login'
import { UserContext } from './UserProvider'

/**
 * @param {object} props
 * @param {any} props.children
 */
export function PleaseLogin (props) {
  const user = useContext(UserContext)

  if (!user) {
    return (
      <div>
        <p>Please Login</p>
        <Login noRedirect />
      </div>
    )
  }

  return props.children
}

export default PleaseLogin
