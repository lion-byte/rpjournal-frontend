import React from 'react'
import Router from 'next/router'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import useForm from 'react-hook-form'

import { CURRENT_USER_QUERY } from './hooks/useUser'
import Form from './styles/Form'
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
  const { handleSubmit, register } = useForm()
  const [registerAccount, { loading, error }] = useMutation(REGISTER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const onSubmit = async values => {
    const mutationResult = await registerAccount({ variables: { ...values } })

    if (mutationResult && mutationResult.data && mutationResult.data.register) {
      await Router.push('/')
    }
  }

  return (
    <Form
      className='pure-form pure-form-stacked'
      method='post'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title title='Register' />
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          className='pure-input-1'
          type='text'
          name='name'
          placeholder='Name'
          ref={register({ required: true })}
        />

        <label htmlFor='email'>Email</label>
        <input
          id='email'
          className='pure-input-1'
          type='email'
          name='email'
          placeholder='Email'
          ref={register({ required: true })}
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          className='pure-input-1'
          type='password'
          name='password'
          placeholder='Password'
          ref={register({ required: true })}
        />

        <button className='pure-button pure-button-primary' type='submit'>
          Register
        </button>
      </fieldset>
    </Form>
  )
}

export default Register
