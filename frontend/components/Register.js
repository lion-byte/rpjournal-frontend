import React, { useState } from 'react'
import Router from 'next/router'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY } from './hooks/useUser'
import Form from './styles/Form'
import FormButton from './styles/FormButton'
import ErrorMessage from './ErrorMessage'
import Title from './Title'

export const REGISTER_MUTATION = gql`
  mutation REGISTER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    register(name: $name, email: $email, password: $password) {
      id
      email
      name
    }
  }
`

export function Register () {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    variables: { ...state },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const mutationResult = await register()

    if (mutationResult && mutationResult.data && mutationResult.data.register) {
      await Router.push('/')
    }
  }

  const { name, email, password } = state

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <Title title='Register' />
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='name'>
          Name
          <input
            id='name'
            name='name'
            placeholder='Name'
            type='text'
            required
            value={name}
            onChange={handleChange}
          />
        </label>

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

        <FormButton>Register</FormButton>
      </fieldset>
    </Form>
  )
}

export default Register
