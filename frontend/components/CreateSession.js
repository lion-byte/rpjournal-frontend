import React, { PureComponent } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import Session from './Session'
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

  handleDescription = description => this.setState({ description })

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
      <Query query={SINGLE_ADVENTURE_QUERY} variables={{ id: adventureId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>
          } else if (error) {
            return <ErrorMessage error={error} />
          } else if (!data.adventure) {
            return <p>No adventure found for ID {adventureId}.</p>
          }

          /** @type {AdventureModel} */
          const adventure = data.adventure

          return (
            <div>
              <Title title='New Session' />
              <header>
                <h1>
                  Create New Session for <u>{adventure.title}</u>
                </h1>
              </header>

              <Mutation
                mutation={CREATE_SESSION_MUTATION}
                variables={{ adventureId, title, description }}
                refetchQueries={[
                  {
                    query: SINGLE_ADVENTURE_QUERY,
                    variables: { id: adventureId }
                  }
                ]}
              >
                {(createSession, { loading, error }) => (
                  <Form
                    onSubmit={event => this.createSession(event, createSession)}
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

                      <FormButton>Create Session</FormButton>
                    </fieldset>
                  </Form>
                )}
              </Mutation>

              <footer>
                <h2>Other Sessions</h2>
                {adventure.sessions.length === 0 ? (
                  <p>No other sessions. Looks like this is your first one!</p>
                ) : (
                  <div className='other-sessions'>
                    {adventure.sessions.map(otherSession => (
                      <Session key={otherSession.id} session={otherSession} />
                    ))}
                  </div>
                )}
              </footer>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default CreateSession
