import React, { PureComponent } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import { SINGLE_ADVENTURE_QUERY } from './SingleAdventure'
import { SINGLE_QUEST_QUERY } from './SingleQuest'
import Title from './Title'

export const UPDATE_QUEST_MUTATION = gql`
  mutation UPDATE_QUEST_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $completed: Boolean
  ) {
    updateQuest(
      id: $id
      title: $title
      description: $description
      completed: $completed
    ) {
      id
    }
  }
`

/**
 * @typedef {object} UpdateQuestProps
 * @property {string} id
 */

/** @augments {PureComponent<UpdateQuestProps>} */
export class UpdateQuest extends PureComponent {
  static defaultProps = {
    id: ''
  }

  state = {}

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  updateQuest = async (event, updateQuestMutation) => {
    event.preventDefault()

    const { data } = await updateQuestMutation()

    if (data.updateQuest) {
      Router.push({
        pathname: '/quest',
        query: { id: data.updateQuest.id }
      })
    }
  }

  render () {
    const {
      props: { id },
      state
    } = this

    return (
      <Query query={SINGLE_QUEST_QUERY} variables={{ id }}>
        {({ loading, data }) => {
          /** @type {QuestModel} */
          const quest = data.quest

          if (loading) {
            return <p>Loading...</p>
          } else if (!quest) {
            return <p>No quest found for ID {id}</p>
          }

          return (
            <div>
              <Title title='Update Quest' />
              <header>
                <h1>Updating - {quest.title}</h1>
              </header>

              <Mutation
                mutation={UPDATE_QUEST_MUTATION}
                variables={{ id, ...state }}
                refetchQueries={[
                  { query: SINGLE_QUEST_QUERY, variables: { id } },
                  {
                    query: SINGLE_ADVENTURE_QUERY,
                    variables: { id: quest.adventure.id }
                  }
                ]}
              >
                {(updateQuest, { loading, error }) => (
                  <Form
                    onSubmit={event => this.updateQuest(event, updateQuest)}
                  >
                    <fieldset aria-busy={loading} disabled={loading}>
                      <label htmlFor='title'>
                        Title
                        <input
                          id='title'
                          type='text'
                          name='title'
                          defaultValue={quest.title}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <label htmlFor='description'>
                        Description
                        <textarea
                          id='description'
                          name='description'
                          defaultValue={quest.description}
                          onChange={this.handleChange}
                          required
                        />
                      </label>

                      <button type='submit'>Update Quest</button>
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

export default UpdateQuest
