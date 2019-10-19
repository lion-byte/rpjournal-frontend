import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import useForm from 'react-hook-form'

import { ADVENTURES_QUERY } from './Adventures'
import { objectExtract } from '../lib/utils'
import Form from './styles/Form'
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
  const { formState, handleSubmit, register, setValue } = useForm()
  const { loading, error, data } = useQuery(SINGLE_ADVENTURE_QUERY, {
    variables: { id }
  })
  const [updateAdventure, updateResult] = useMutation(
    UPDATE_ADVENTURE_MUTATION,
    {
      refetchQueries: [
        { query: SINGLE_ADVENTURE_QUERY, variables: { id } },
        { query: ADVENTURES_QUERY }
      ]
    }
  )

  /** @param {string} desc */
  const handleEditor = desc => setValue('description', desc)

  /** @param {Record<string, any>} values */
  const onSubmit = async values => {
    const changedValues = objectExtract(values, formState.touched)

    const mutationResult = await updateAdventure({
      variables: { id, ...changedValues }
    })

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.updateAdventure
    ) {
      await Router.push({ pathname: '/adventure', query: { id } })
    }
  }

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <ErrorMessage error={error} />
  } else if (!data.adventure) {
    return <p>No adventure found for ID {id}</p>
  }

  /** @type {AdventureModel} */
  const adventure = data.adventure

  // Manually register Editor
  register({ name: 'description' }, { required: true })

  return (
    <div>
      <Title title='Update Adventure' />
      <h1>Updating - {adventure.title}</h1>

      <Form
        className='pure-form pure-form-stacked'
        method='post'
        onSubmit={handleSubmit(onSubmit)}
      >
        <ErrorMessage error={updateResult.error} />
        <fieldset
          aria-busy={updateResult.loading}
          disabled={updateResult.loading}
        >
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            className='pure-input-1'
            type='text'
            name='title'
            ref={register({ required: true })}
            defaultValue={adventure.title}
            required
          />

          <div>
            Description
            <Editor initialText={adventure.description} onSave={handleEditor} />
          </div>

          <button className='pure-button pure-button-primary' type='submit'>
            Update Adventure
          </button>
        </fieldset>
      </Form>
    </div>
  )
}

UpdateAdventure.defaultProps = {
  id: ''
}

export default UpdateAdventure
