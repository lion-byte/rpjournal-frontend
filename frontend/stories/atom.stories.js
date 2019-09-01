import React from 'react'
import { storiesOf } from '@storybook/react'

import { fillerImage } from '../lib/filler'

storiesOf('1 - Atoms', module)
  .add('Typography', () => (
    <div>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
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
        <a href='#'>Link</a> followed by horizontal rule.
      </p>
      <hr />
      <blockquote>
        <p>Blockquote text.</p>
      </blockquote>
    </div>
  ))
  .add('Media', () => (
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
