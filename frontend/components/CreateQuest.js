import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import { QUESTS_QUERY } from './Quests'
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
 * @param {object} props
 * @param {string} props.adventureId
 */
export function CreateQuest (props) {
  const { adventureId } = props

  const [state, setState] = useState({
    title: '',
    description: ''
  })
  const { loading, error, data } = useQuery(SINGLE_ADVENTURE_QUERY, {
    variables: { id: adventureId }
  })
  const [createQuest, createResult] = useMutation(CREATE_QUEST_MUTATION, {
    variables: { adventureId, ...state },
    refetchQueries: [{ query: QUESTS_QUERY, variables: { adventureId } }]
  })

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleDescription = description =>
    setState(prevState => ({ ...prevState, description }))

  const create = async event => {
    event.preventDefault()
    const mutationResult = await createQuest()

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.createQuest
    ) {
      await Router.push({
        pathname: '/quest',
        query: { id: mutationResult.data.createQuest.id }
      })
    }
  }

  const { title, description } = state

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
      <Title title='New Quest' />
      <header>
        <h1>
          Create New Quest for <u>{adventure.title}</u>
        </h1>
      </header>

      <Form onSubmit={create}>
        <ErrorMessage error={createResult.error} />
        <fieldset
          aria-busy={createResult.loading}
          disabled={createResult.loading}
        >
          <label htmlFor='title'>
            Title
            <input
              id='title'
              type='text'
              name='title'
              value={title}
              onChange={handleChange}
              required
            />
          </label>
          <div className='description'>
            Description
            <Editor initialText={description} onSave={handleDescription} />
          </div>
          <FormButton>Create Quest</FormButton>
        </fieldset>
      </Form>
    </div>
  )
}

CreateQuest.defaultProps = { adventureId: '' }

export default CreateQuest
