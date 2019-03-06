import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import { CURRENT_USER_QUERY } from './User'

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

export class Login extends Component {
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

    if (data.login) {
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
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Login
