import React from 'react'

import Login from './Login'
import User from './User'

/**
 * @param {object} props
 * @param {any} props.children
 */
const PleaseLogin = props => (
  <User>
    {({ data, loading }) => {
      if (loading) {
        return <p>Loading...</p>
      } else if (!data.me) {
        return (
          <div>
            <p>Please Login</p>
            <Login noRedirect />
          </div>
        )
      }

      return props.children
    }}
  </User>
)

export default PleaseLogin
