import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
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

export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = async (event, registerMutation) => {
    event.preventDefault()
    const { data } = await registerMutation()

    if (data.register) {
      Router.push('/')
    }
  }

  render () {
    const { name, email, password } = this.state

    return (
      <Mutation
        mutation={REGISTER_MUTATION}
        variables={{ name, email, password }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(register, { error, loading }) => (
          <Form
            method='post'
            onSubmit={event => this.handleSubmit(event, register)}
          >
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
                  onChange={this.handleChange}
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

              <FormButton>Register</FormButton>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Register
