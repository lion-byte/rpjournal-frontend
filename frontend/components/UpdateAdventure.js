import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
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
 * @param {object} props
 * @param {string} props.id
 */
export function UpdateAdventure (props) {
  const { id } = props

  const [state, setState] = useState({})
  const { loading, error, data } = useQuery(SINGLE_ADVENTURE_QUERY, {
    variables: { id }
  })
  const [updateAdventure, updateResult] = useMutation(
    UPDATE_ADVENTURE_MUTATION,
    {
      variables: { id, ...state },
      refetchQueries: [
        { query: SINGLE_ADVENTURE_QUERY, variables: { id } },
        { query: CURRENT_USER_QUERY }
      ]
    }
  )

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!data.adventure) {
    return <p>No adventure found for ID {id}</p>
  }

  /** @type {AdventureModel} */
  const adventure = data.adventure

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const descriptionChange = description =>
    setState(prevState => ({ ...prevState, description }))

  const save = async event => {
    event.preventDefault()

    const mutationResult = await updateAdventure()

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.updateAdventure
    ) {
      await Router.push({ pathname: '/adventure', query: { id } })
    }
  }

  return (
    <div>
      <Title title='Update Adventure' />
      <header>
        <h1>Updating - {adventure.title}</h1>
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
              defaultValue={adventure.title}
              onChange={handleChange}
              required
            />
          </label>

          <div className='description'>
            Description
            <Editor
              initialText={adventure.description}
              onSave={descriptionChange}
            />
          </div>

          <FormButton>Update Adventure</FormButton>
        </fieldset>
      </Form>
    </div>
  )
}

UpdateAdventure.defaultProps = {
  id: ''
}

export default UpdateAdventure
