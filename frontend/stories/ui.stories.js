import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import Form from '../components/styles/Form'
import Header from '../components/styles/Header'
import Editor from '../components/Editor'
import ErrorMessage from '../components/ErrorMessage'
import Nav from '../components/Nav'

storiesOf('UI', module)
  .add('Header', () => (
    <Header>
      <div className='bar'>
        <h1>
          <a>RPJournal</a>
        </h1>
      </div>
      <div className='sub-bar'>
        <Nav>
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Login</a>
            </li>
          </ul>
        </Nav>
      </div>
    </Header>
  ))
  .add('Editor', () => <Editor />)
  .add('Error Message', () => {
    const err = Error('Something happened.')
    // @ts-ignore
    return <ErrorMessage error={err} />
  })
  .add('Form', () => {
    const isError = boolean('Error', false)
    const isSubmitting = boolean('Submitting', false)
    const exampleErr = Error('Something went wrong.')

    return (
      <Form
        className='pure-form pure-form-stacked'
        onSubmit={e => e.preventDefault()}
      >
        {isError ? (
          <ErrorMessage
            // @ts-ignore
            error={exampleErr}
          />
        ) : null}
        <fieldset aria-busy={isSubmitting} disabled={isSubmitting}>
          <label htmlFor='c-text'>Text</label>
          <input id='c-text' className='pure-input-1' type='text' />

          <div>
            Text
            <Editor />
          </div>

          <button className='pure-button pure-button-primary' type='submit'>
            Submit
          </button>
        </fieldset>
      </Form>
    )
  })
