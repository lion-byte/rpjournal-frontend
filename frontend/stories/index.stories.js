import React from 'react'
import { storiesOf } from '@storybook/react'

import Form from '../components/styles/Form'
import Editor from '../components/Editor'
import { fillerImage } from '../lib/filler'

storiesOf('Typography', module)
  .add('Headers', () => (
    <div>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </div>
  ))
  .add('Text', () => (
    <div>
      <p>Plain text.</p>
      <p>
        <b>Bold text.</b>
      </p>
      <p>
        <u>Underlined text.</u>
      </p>
      <p>
        <i>Emphasized text.</i>
      </p>
      <p>
        <a href='#'>Link</a>
      </p>

      <hr />

      <blockquote>
        <p>Something something.</p>
      </blockquote>
    </div>
  ))
  .add('With Media', () => (
    <div>
      <p>Some text or whatever.</p>
      <figure>
        <img src={fillerImage({ text: 'Figure', width: 400, height: 250 })} />
        <figcaption>
          <p>Figure caption</p>
        </figcaption>
      </figure>
      <p>Moving on.</p>
      <img src={fillerImage({ text: 'Just image', width: 400, height: 250 })} />
      <p>Done.</p>
    </div>
  ))

storiesOf('Input Controls', module)
  .add('Form', () => (
    <Form onSubmit={e => e.preventDefault()}>
      <fieldset>
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
  ))
  .add('Form [Submitting]', () => (
    <Form onSubmit={e => e.preventDefault()}>
      <fieldset aria-busy disabled>
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
  ))
