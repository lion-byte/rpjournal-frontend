import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import useForm from 'react-hook-form'

import Form from './styles/Form'
import ErrorMessage from './ErrorMessage'
import Title from './Title'
import { CURRENT_USER_QUERY } from './UserProvider'

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

  const { handleSubmit, register } = useForm()

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  })

  const onSubmit = async values => {
    const mutationResult = await login({ variables: { ...values } })

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.login &&
      !noRedirect
    ) {
      await Router.push('/')
    }
  }

  return (
    <Form
      className='pure-form pure-form-stacked'
      method='post'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title title='Login' />
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
          Sign In
        </button>

        <div style={{ marginTop: '1em' }}>
          New here?{' '}
          <Link href='/register'>
            <a>Register an account</a>
          </Link>
        </div>
      </fieldset>
    </Form>
  )
}

Login.defaultProps = { noRedirect: false }

export default Login
