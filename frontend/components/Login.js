import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY } from './hooks/useUser'
import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import Title from './Title'

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

/**
 * @param {object} props
 * @param {boolean} [props.noRedirect]
 */
export function Login (props) {
  const { noRedirect } = props

  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: { ...state },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const mutationResult = await login()

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.login &&
      !noRedirect
    ) {
      await Router.push('/')
    }
  }

  const { email, password } = state

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <Title title='Login' />
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='email'>
          Email
          <input
            id='email'
            name='email'
            placeholder='Email'
            type='email'
            required
            value={email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor='password'>
          Password
          <input
            id='password'
            name='password'
            placeholder='Password'
            type='password'
            required
            value={password}
            onChange={handleChange}
          />
        </label>

        <input type='submit' value='Sign In' />

        <div style={{ marginTop: '1em' }}>
          New here?{' '}
          <Link href='/register' prefetch>
            <a>Register an account</a>
          </Link>
        </div>
      </fieldset>
    </Form>
  )
}

Login.defaultProps = { noRedirect: false }

export default Login
