import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import { SESSIONS_QUERY } from './Sessions'
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
 * @param {object} props
 * @param {string} props.adventureId
 */
export function CreateSession (props) {
  const { adventureId } = props

  const [state, setState] = useState({
    title: '',
    description: ''
  })
  const { loading, error, data } = useQuery(SINGLE_ADVENTURE_QUERY, {
    variables: { id: adventureId }
  })
  const [createSession, createResult] = useMutation(CREATE_SESSION_MUTATION, {
    variables: { adventureId, ...state },
    refetchQueries: [{ query: SESSIONS_QUERY, variables: { adventureId } }]
  })

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleDescription = description =>
    setState(prevState => ({ ...prevState, description }))

  const create = async event => {
    event.preventDefault()
    const mutationResult = await createSession()

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.createSession
    ) {
      await Router.push({
        pathname: '/session',
        query: { id: mutationResult.data.createSession.id }
      })
    }
  }

  const { title } = state

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
      <Form method='post' onSubmit={create}>
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
            <Editor onSave={handleDescription} />
          </div>
          <FormButton>Create Session</FormButton>
        </fieldset>
      </Form>
    </div>
  )
}

CreateSession.defaultProps = { adventureId: '' }

export default CreateSession
