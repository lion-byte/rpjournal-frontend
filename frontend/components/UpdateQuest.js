import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import { QUESTS_QUERY } from './Quests'
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
 * @param {object} props
 * @param {string} props.id
 */
export function UpdateQuest (props) {
  const { id } = props

  const [state, setState] = useState({})
  const { loading, error, data } = useQuery(SINGLE_QUEST_QUERY, {
    variables: { id }
  })
  const [updateQuest, updateResult] = useMutation(UPDATE_QUEST_MUTATION, {
    variables: { id, ...state }
  })

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!data.quest) {
    return <p>No quest found for ID {id}</p>
  }

  /** @type {QuestModel} */
  const quest = data.quest
  const adventureId = quest.adventure.id

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const descriptionChange = description =>
    setState(prevState => ({ ...prevState, description }))

  const save = async event => {
    event.preventDefault()

    const mutationResult = await updateQuest({
      refetchQueries: [
        { query: SINGLE_QUEST_QUERY, variables: { id } },
        { query: QUESTS_QUERY, variables: { adventureId } }
      ]
    })

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.updateQuest
    ) {
      await Router.push({ pathname: '/quest', query: { id } })
    }
  }

  return (
    <div>
      <Title title='Update Quest' />
      <header>
        <h1>Updating - {quest.title}</h1>
      </header>

      <Form onSubmit={save}>
        <ErrorMessage error={updateResult.error} />
        <fieldset
          aria-busy={updateResult.loading}
          disabled={updateResult.loading}
        >
          <label htmlFor='title'>
            Title
            <input
              id='title'
              type='text'
              name='title'
              defaultValue={quest.title}
              onChange={handleChange}
              required
            />
          </label>

          <div className='description'>
            Description
            <Editor
              initialText={quest.description}
              onSave={descriptionChange}
            />
          </div>

          <FormButton>Update Quest</FormButton>
        </fieldset>
      </Form>
    </div>
  )
}

UpdateQuest.defaultProps = {
  id: ''
}

export default UpdateQuest
