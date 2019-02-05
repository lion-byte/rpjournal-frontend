import React, { PureComponent } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import { SINGLE_ADVENTURE_QUERY } from './SingleAdventure'
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
        {({ loading, data }) => {
          /** @type {SessionModel} */
          const session = data.session

          if (loading) {
            return <p>Loading...</p>
          } else if (!session) {
            return <p>No session found for ID {id}</p>
          }

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
                    query: SINGLE_ADVENTURE_QUERY,
                    variables: { id: session.adventure.id }
                  }
                ]}
              >
                {(updateSession, { loading, error }) => (
                  <Form
                    onSubmit={event => this.updateSession(event, updateSession)}
                  >
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

                      <label htmlFor='description'>
                        Description
                        <textarea
                          id='description'
                          name='description'
                          defaultValue={session.description}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <button type='submit'>Update Session</button>
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
