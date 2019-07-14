import React from 'react'
import Router from 'next/router'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY } from './hooks/useUser'

export const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`

export function Logout () {
  const [logoutMutation] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const leave = async () => {
    await logoutMutation()
    await Router.push('/')
  }

  return <button onClick={leave}>Logout</button>
}

export default Logout
