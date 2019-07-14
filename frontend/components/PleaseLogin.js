import React from 'react'

import { useUser } from './hooks/useUser'
import ErrorMessage from './ErrorMessage'
import Login from './Login'

/**
 * @param {object} props
 * @param {any} props.children
 */
export function PleaseLogin (props) {
  const { loading, error, data } = useUser()

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!data.me) {
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
