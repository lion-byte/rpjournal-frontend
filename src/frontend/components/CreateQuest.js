import React, { PureComponent } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import Quest from './Quest'
import { SINGLE_ADVENTURE_QUERY } from './SingleAdventure'
import Title from './Title'

export const CREATE_QUEST_MUTATION = gql`
  mutation CREATE_QUEST_MUTATION(
    $adventureId: ID!
    $title: String!
    $description: String!
  ) {
    createQuest(
      adventureId: $adventureId
      title: $title
      description: $description
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
      state: { title, description }
    } = this

    return (
      <Query query={SINGLE_ADVENTURE_QUERY} variables={{ id: adventureId }}>
        {({ loading, data }) => {
          /** @type {AdventureModel} */
          const adventure = data.adventure

          if (loading) {
            return <p>Loading...</p>
          } else if (!adventure) {
            return <p>No adventure found for ID {adventureId}.</p>
          }

          return (
            <div>
              <Title title='New Quest' />
              <header>
                <h1>
                  Create New Quest for <u>{adventure.title}</u>
                </h1>
              </header>

              <Mutation
                mutation={CREATE_QUEST_MUTATION}
                variables={{ adventureId, title, description }}
                refetchQueries={[
                  {
                    query: SINGLE_ADVENTURE_QUERY,
                    variables: { id: adventureId }
                  }
                ]}
              >
                {(createQuest, { loading }) => (
                  <Form
                    onSubmit={event => this.createQuest(event, createQuest)}
                  >
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

                      <FormButton>Create Quest</FormButton>
                    </fieldset>
                  </Form>
                )}
              </Mutation>

              <footer>
                <h2>Other Quests</h2>
                {adventure.quests.length === 0 ? (
                  <p>No other quests. Looks like this is your first one!</p>
                ) : (
                  <div className='other-quests'>
                    {adventure.quests.map(otherQuest => (
                      <Quest key={otherQuest.id} quest={otherQuest} />
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

export default CreateQuest
