import React from 'react'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import useForm from 'react-hook-form'

import Form from './styles/Form'
import { ADVENTURES_QUERY } from './Adventures'
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
  const { handleSubmit, register, setValue } = useForm()
  const router = useRouter()
  const [
    createAdventure,
    { loading, error }
  ] = useMutation(CREATE_ADVENTURE_MUTATION, {
    refetchQueries: [{ query: ADVENTURES_QUERY }]
  })

  /** @param {string} desc */
  const handleEditor = desc => setValue('description', desc)

  /** @param {Record<string, any>} values */
  const onSubmit = async values => {
    const mutationResult = await createAdventure({ variables: { ...values } })

    if (
      mutationResult &&
      mutationResult.data &&
      mutationResult.data.createAdventure
    ) {
      await router.push({
        pathname: '/adventure',
        query: { id: mutationResult.data.createAdventure.id }
      })
    }
  }

  // Manually register Editor
  register({ name: 'description' }, { required: true })

  return (
    <div>
      <Title title='New Adventure' />
      <h1>Create New Adventure</h1>

      <Form method='post' onSubmit={handleSubmit(onSubmit)}>
        <ErrorMessage error={error} />
        <fieldset aria-busy={loading} disabled={loading}>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            name='title'
            ref={register({ required: true })}
          />

          <div>
            Description
            <Editor onSave={handleEditor} />
          </div>

          <button className='button button-primary' type='submit'>
            Create Adventure
          </button>
        </fieldset>
      </Form>
    </div>
  )
}

export default CreateAdventure
