import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import { SINGLE_ADVENTURE_QUERY } from './SingleAdventure'
import Title from './Title'

export const CREATE_QUEST_MUTATION = gql`
  mutation CREATE_QUEST_MUTATION(
    $adventureId: ID!
    $title: String!
    $description: String!
    $completed: Boolean
  ) {
    createQuest(
      adventureId: $adventureId
      title: $title
      description: $description
      completed: $completed
    ) {
      id
    }
  }
`

/**
 * @typedef {object} CreateQuestProps
 * @property {string} adventureId
 */

/** @augments {PureComponent<CreateQuestProps>} */
export class CreateQuest extends PureComponent {
  static defaultProps = {
    adventureId: ''
  }

  state = {
    title: '',
    description: '',
    completed: false
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   */
  handleChange = event => {
    // @ts-ignore
    const { type, name, checked, value } = event.target

    this.setState({ [name]: type === 'checkbox' ? checked : value })
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @param {any} createQuestMutation
   */
  createQuest = async (event, createQuestMutation) => {
    event.preventDefault()

    const { data } = await createQuestMutation()

    Router.push({
      pathname: '/quest',
      query: { id: data.createQuest.id }
    })
  }

  render () {
    const {
      props: { adventureId },
      state: { title, description, completed }
    } = this

    return (
      <Mutation
        mutation={CREATE_QUEST_MUTATION}
        variables={{ adventureId, title, description, completed }}
        refetchQueries={[
          { query: SINGLE_ADVENTURE_QUERY, variables: { id: adventureId } }
        ]}
      >
        {(createQuest, { loading }) => (
          <Form
            onSubmit={event => this.createQuest(event, createQuest)}
            aria-busy={loading}
          >
            <Title title='New Quest' />

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

              <label htmlFor='completed'>
                Completed
                <input
                  id='completed'
                  type='checkbox'
                  name='completed'
                  checked={completed}
                  onChange={this.handleChange}
                />
              </label>

              <button type='submit'>Create Quest</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateQuest
