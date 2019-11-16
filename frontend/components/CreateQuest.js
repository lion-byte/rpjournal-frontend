import React from 'react'
import useForm from 'react-hook-form'

import Form from './styles/Form'
import Editor from './Editor'

export function CreateQuest (props) {
  const { handleSubmit, register, setValue } = useForm()

  /** @param {Record<string, any>} values */
  const onSubmit = async values => {
    console.log(values)
  }

  /** @param {string} desc */
  const handleEditor = desc => setValue('description', desc)

  // Manually register Editor
  register({ name: 'description' }, { required: true })

  return (
    <div>
      <h1>New Quest</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
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

export default CreateQuest
