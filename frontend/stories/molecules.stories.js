import React from 'react'
import { storiesOf } from '@storybook/react'

import Header from '../components/styles/Header'
import Editor from '../components/Editor'
import ErrorMessage from '../components/ErrorMessage'
import Nav from '../components/Nav'

storiesOf('2 - Molecules', module)
  .add('Header', () => (
    <Header>
      <div className='bar'>
        <h1>
          <a>RPJournal</a>
        </h1>
      </div>
    </Header>
  ))
  .add('Nav', () => (
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
  ))
  .add('Editor', () => <Editor />)
  .add('Error Message', () => {
    const err = Error('Something happened.')
    // @ts-ignore
    return <ErrorMessage error={err} />
  })
