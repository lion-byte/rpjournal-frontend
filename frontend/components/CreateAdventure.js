import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import { CURRENT_USER_QUERY } from './hooks/useUser'
import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import Title from './Title'

export const CREATE_ADVENTURE_MUTATION = gql`
  mutation CREATE_ADVENTURE_MUTATION($title: String!, $description: String!) {
    createAdventure(title: $title, description: $description) {
      id
    }
  }
`

export function CreateAdventure () {
  const [state, setState] = useState({
    title: '',
    description: ''
  })
  const [createAdventure, { loading, error }] = useMutation(
    CREATE_ADVENTURE_MUTATION,
    {
      variables: { ...state },
      refetchQueries: [{ query: CURRENT_USER_QUERY }]
    }
  )

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleDescription = description =>
    setState(prevState => ({ ...prevState, description }))

  const create = async event => {
    event.preventDefault()

    const mutationResult = await createAdventure()

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.createAdventure
    ) {
      await Router.push({
        pathname: '/adventure',
        query: { id: mutationResult.data.createAdventure.id }
      })
    }
  }

  const { title, description } = state

  return (
    <div>
      <Title title='New Adventure' />
      <h1>Create New Adventure</h1>

      <Form onSubmit={create}>
        <ErrorMessage error={error} />
        <fieldset aria-busy={loading} disabled={loading}>
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

          <FormButton>Create Adventure</FormButton>
        </fieldset>
      </Form>
    </div>
  )
}

export default CreateAdventure
