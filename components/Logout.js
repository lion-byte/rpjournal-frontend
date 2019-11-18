import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'

import { ADVENTURES_QUERY } from './Adventures'
import { CURRENT_USER_QUERY } from './UserProvider'

export const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    logout
  }
`

export function Logout () {
  const router = useRouter()
  const [logout] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }, { query: ADVENTURES_QUERY }]
  })

  const leave = async () => {
    await logout()
    await router.push('/')
  }

  return <button onClick={leave}>Logout</button>
}

export default Logout
