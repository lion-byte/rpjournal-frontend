import React, { PureComponent } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import { SESSIONS_QUERY } from './Sessions'
import { SINGLE_SESSION_QUERY } from './SingleSession'
import Title from './Title'

export const UPDATE_SESSION_MUTATION = gql`
  mutation UPDATE_SESSION_MUTATION(
    $id: ID!
    $title: String
    $description: String
  ) {
    updateSession(id: $id, title: $title, description: $description) {
      id
    }
  }
`

/**
 * @typedef {object} UpdateSessionProps
 * @property {string} id
 */

/** @augments {PureComponent<UpdateSessionProps>} */
export class UpdateSession extends PureComponent {
  static defaultProps = {
    id: ''
  }

  state = {}

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  descriptionChange = description => this.setState({ description })

  updateSession = async (event, updateSessionMutation) => {
    event.preventDefault()

    const { data } = await updateSessionMutation()

    if (data.updateSession) {
      Router.push({
        pathname: '/session',
        query: { id: data.updateSession.id }
      })
    }
  }

  render () {
    const {
      props: { id },
      state
    } = this

    return (
      <Query query={SINGLE_SESSION_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>
          } else if (error) {
            return <ErrorMessage error={error} />
          } else if (!data.session) {
            return <p>No session found for ID {id}</p>
          }

          /** @type {SessionModel} */
          const session = data.session

          return (
            <div>
              <Title title='Update Session' />
              <header>
                <h1>Updating - {session.title}</h1>
              </header>

              <Mutation
                mutation={UPDATE_SESSION_MUTATION}
                variables={{ id, ...state }}
                refetchQueries={[
                  { query: SINGLE_SESSION_QUERY, variables: { id } },
                  {
                    query: SESSIONS_QUERY,
                    variables: { adventureId: session.adventure.id }
                  }
                ]}
              >
                {(updateSession, { loading, error }) => (
                  <Form
                    onSubmit={event => this.updateSession(event, updateSession)}
                  >
                    <ErrorMessage error={error} />
                    <fieldset aria-busy={loading} disabled={loading}>
                      <label htmlFor='title'>
                        Title
                        <input
                          id='title'
                          type='text'
                          name='title'
                          defaultValue={session.title}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <div className='description'>
                        Description
                        <Editor
                          initialText={session.description}
                          onSave={this.descriptionChange}
                        />
                      </div>

                      <FormButton>Update Session</FormButton>
                    </fieldset>
                  </Form>
                )}
              </Mutation>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default UpdateSession
