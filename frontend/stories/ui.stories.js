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
