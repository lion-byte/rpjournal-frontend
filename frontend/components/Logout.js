import React, { PureComponent } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY } from './User'

export const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`

class Logout extends PureComponent {
  leave = async logoutMutation => {
    await logoutMutation()
    Router.push('/')
  }

  render () {
    return (
      <Mutation
        mutation={LOGOUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {logout => <button onClick={() => this.leave(logout)}>Logout</button>}
      </Mutation>
    )
  }
}

export default Logout
