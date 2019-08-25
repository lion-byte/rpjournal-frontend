import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import FormButton from './styles/FormButton'
import Editor from './Editor'
import ErrorMessage from './ErrorMessage'
import { SESSIONS_QUERY } from './Sessions'
import { SINGLE_SESSION_QUERY } from './SingleSession'
import Title from './Title'

export const UPDATE_SESSION_MUTATION = gql`
  mutation UPDATE_SESSION_MUTATION(
    $id: ID!
    $title: String
    $description: String
  ) {
    updateSession(id: $id, title: $title, description: $description) {
      id
    }
  }
`

/**
 * @param {object} props
 * @param {string} props.id
 */
export function UpdateSession (props) {
  const { id } = props

  const [state, setState] = useState({})
  const { loading, error, data } = useQuery(SINGLE_SESSION_QUERY, {
    variables: { id }
  })
  const [updateSession, updateResult] = useMutation(UPDATE_SESSION_MUTATION, {
    variables: { id, ...state }
  })

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!data.session) {
    return <p>No session found for ID {id}</p>
  }

  /** @type {SessionModel} */
  const session = data.session
  const adventureId = session.adventure.id

  const handleChange = event => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const descriptionChange = description =>
    setState(prevState => ({ ...prevState, description }))

  const save = async event => {
    event.preventDefault()

    const mutationResult = await updateSession({
      refetchQueries: [
        { query: SINGLE_SESSION_QUERY, variables: { id } },
        { query: SESSIONS_QUERY, variables: { adventureId } }
      ]
    })

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.updateSession
    ) {
      await Router.push({ pathname: '/session', query: { id } })
    }
  }

  return (
    <div>
      <Title title='Update Session' />
      <header>
        <h1>Updating - {session.title}</h1>
      </header>

      <Form method='post' onSubmit={save}>
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
              defaultValue={session.title}
              onChange={handleChange}
              required
            />
          </label>

          <div className='description'>
            Description
            <Editor
              initialText={session.description}
              onSave={descriptionChange}
            />
          </div>

          <FormButton>Update Session</FormButton>
        </fieldset>
      </Form>
    </div>
  )
}

UpdateSession.defaultProps = {
  id: ''
}

export default UpdateSession
