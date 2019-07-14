import React, { PureComponent } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import { CURRENT_USER_QUERY } from './hooks/useUser'
import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import { SINGLE_ADVENTURE_QUERY } from './SingleAdventure'
import Title from './Title'

export const UPDATE_ADVENTURE_MUTATION = gql`
  mutation UPDATE_ADVENTURE_MUTATION(
    $id: ID!
    $title: String
    $description: String
  ) {
    updateAdventure(id: $id, title: $title, description: $description) {
      id
    }
  }
`

/**
 * @typedef {object} UpdateAdventureProps
 * @property {string} id
 */

/**
 * @augments {PureComponent<UpdateAdventureProps>}
 */
export class UpdateAdventure extends PureComponent {
  static defaultProps = {
    id: ''
  }

  state = {}

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  descriptionChange = description => this.setState({ description })

  updateAdventure = async (event, updateAdventureMutation) => {
    event.preventDefault()

    const { data } = await updateAdventureMutation()

    if (data.updateAdventure) {
      Router.push({
        pathname: '/adventure',
        query: { id: data.updateAdventure.id }
      })
    }
  }

  render () {
    const {
      props: { id },
      state
    } = this

    return (
      <Query query={SINGLE_ADVENTURE_QUERY} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>
          } else if (error) {
            return <ErrorMessage error={error} />
          } else if (!data.adventure) {
            return <p>No adventure found for ID {id}</p>
          }

          /** @type {AdventureModel} */
          const adventure = data.adventure

          return (
            <div>
              <Title title='Update Adventure' />
              <header>
                <h1>Updating - {adventure.title}</h1>
              </header>

              <Mutation
                mutation={UPDATE_ADVENTURE_MUTATION}
                variables={{ id, ...state }}
                refetchQueries={[
                  { query: SINGLE_ADVENTURE_QUERY, variables: { id } },
                  { query: CURRENT_USER_QUERY }
                ]}
              >
                {(updateAdventure, { loading, error }) => (
                  <Form
                    onSubmit={event =>
                      this.updateAdventure(event, updateAdventure)
                    }
                  >
                    <ErrorMessage error={error} />
                    <fieldset aria-busy={loading} disabled={loading}>
                      <label htmlFor='title'>
                        Title
                        <input
                          id='title'
                          type='text'
                          name='title'
                          defaultValue={adventure.title}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <div className='description'>
                        Description
                        <Editor
                          initialText={adventure.description}
                          onSave={this.descriptionChange}
                        />
                      </div>

                      <FormButton>Update Adventure</FormButton>
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

export default UpdateAdventure
