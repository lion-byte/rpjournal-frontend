import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { CURRENT_USER_QUERY } from './hooks/useUser'
import Form from './styles/Form'
import FormButton from './styles/FormButton'
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
 * @typedef {object} LoginProps
 * @property {boolean} [noRedirect]
 */

/** @augments Component<LoginProps> */
export class Login extends Component {
  static defaultProps = { noRedirect: false }

  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event, loginMutation) => {
    event.preventDefault()
    const { data } = await loginMutation()

    if (data.login && !this.props.noRedirect) {
      Router.push('/')
    }
  }

  render () {
    const { email, password } = this.state

    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={{ email, password }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(login, { error, loading }) => (
          <Form
            method='post'
            onSubmit={event => this.handleSubmit(event, login)}
          >
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                />
              </label>

              <FormButton>Sign In</FormButton>

              <div style={{ marginTop: '1em' }}>
                New here?{' '}
                <Link href='/register' prefetch>
                  <a>Register an account</a>
                </Link>
              </div>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Login
