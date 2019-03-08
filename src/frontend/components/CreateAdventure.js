import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import Title from './Title'
import { CURRENT_USER_QUERY } from './User'

export const CREATE_ADVENTURE_MUTATION = gql`
  mutation CREATE_ADVENTURE_MUTATION($title: String!, $description: String!) {
    createAdventure(title: $title, description: $description) {
      id
    }
  }
`

export class CreateAdventure extends PureComponent {
  state = {
    title: '',
    description: ''
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleDescription = description => this.setState({ description })

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @param {any} createAdventureMutation
   */
  createAdventure = async (event, createAdventureMutation) => {
    event.preventDefault()

    const { data } = await createAdventureMutation()

    Router.push({
      pathname: '/adventure',
      query: { id: data.createAdventure.id }
    })
  }

  render () {
    const { title, description } = this.state

    return (
      <div>
        <Title title='New Adventure' />
        <h1>Create New Adventure</h1>

        <Mutation
          mutation={CREATE_ADVENTURE_MUTATION}
          variables={{ title, description }}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(createAdventure, { loading, error }) => (
            <Form
              onSubmit={event => this.createAdventure(event, createAdventure)}
            >
              <ErrorMessage error={error} />
              <fieldset aria-busy={loading} disabled={loading}>
                <label htmlFor='title'>
                  Title
                  <input
                    id='title'
                    type='text'
                    name='title'
                    value={title}
                    onChange={this.handleChange}
                    required
                  />
                </label>

                <div className='description'>
                  Description
                  <Editor onSave={this.handleDescription} />
                </div>

                <FormButton>Create Adventure</FormButton>
              </fieldset>
            </Form>
          )}
        </Mutation>
      </div>
    )
  }
}

export default CreateAdventure
