import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import Form from '../components/styles/Form'
import Editor from '../components/Editor'
import ErrorMessage from '../components/ErrorMessage'

storiesOf('3 - Organisms', module).add('Form', () => {
  const isError = boolean('Error', false)
  const isSubmitting = boolean('Submitting', false)
  const exampleErr = Error('Something went wrong.')

  return (
    <Form onSubmit={e => e.preventDefault()}>
      {isError ? (
        <ErrorMessage
          // @ts-ignore
          error={exampleErr}
        />
      ) : null}
      <fieldset aria-busy={isSubmitting} disabled={isSubmitting}>
        <label htmlFor='c-text'>
          Text
          <input id='c-text' type='text' />
        </label>

        <label htmlFor='c-textarea'>
          Text Area
          <textarea id='c-textarea' />
        </label>

        <div className='description'>
          Text
          <Editor />
        </div>

        <input type='submit' value='Submit' />
      </fieldset>
    </Form>
  )
})
