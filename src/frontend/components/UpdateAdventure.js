import React, { PureComponent } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import { ADVENTURES_QUERY } from './Adventures'
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
        {({ loading, data }) => {
          /** @type {AdventureModel} */
          const adventure = data.adventure

          if (loading) {
            return <p>Loading...</p>
          } else if (!adventure) {
            return <p>No adventure found for ID {id}</p>
          }

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
                  { query: ADVENTURES_QUERY }
                ]}
              >
                {(updateAdventure, { loading, error }) => (
                  <Form
                    onSubmit={event =>
                      this.updateAdventure(event, updateAdventure)
                    }
                  >
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

                      <label htmlFor='description'>
                        Description
                        <textarea
                          id='description'
                          name='description'
                          defaultValue={adventure.description}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <button type='submit'>Update Adventure</button>
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
