import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import { SINGLE_ADVENTURE_QUERY } from './SingleAdventure'
import Title from './Title'

export const CREATE_SESSION_MUTATION = gql`
  mutation CREATE_SESSION_MUTATION(
    $adventureId: ID!
    $title: String!
    $description: String!
  ) {
    createSession(
      adventureId: $adventureId
      title: $title
      description: $description
    ) {
      id
    }
  }
`

/**
 * @typedef {object} CreateSessionProps
 * @property {string} adventureId
 */

/** @augments {PureComponent<CreateSessionProps>} */
export class CreateSession extends PureComponent {
  static defaultProps = {
    adventureId: ''
  }

  state = {
    title: '',
    description: ''
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   */
  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @param {any} createSessionMutation
   */
  createSession = async (event, createSessionMutation) => {
    event.preventDefault()

    const { data } = await createSessionMutation()

    Router.push({
      pathname: '/session',
      query: { id: data.createSession.id }
    })
  }

  render () {
    const {
      props: { adventureId },
      state: { title, description }
    } = this

    return (
      <Mutation
        mutation={CREATE_SESSION_MUTATION}
        variables={{ adventureId, title, description }}
        refetchQueries={[
          { query: SINGLE_ADVENTURE_QUERY, variables: { id: adventureId } }
        ]}
      >
        {(createSession, { loading }) => (
          <Form
            onSubmit={event => this.createSession(event, createSession)}
            aria-busy={loading}
          >
            <Title title='New Session' />

            <fieldset disabled={loading}>
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

              <label htmlFor='description'>
                Description
                <textarea
                  id='description'
                  name='description'
                  value={description}
                  onChange={this.handleChange}
                  required
                />
              </label>

              <button type='submit'>Create Session</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateSession
