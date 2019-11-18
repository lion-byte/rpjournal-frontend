import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import { fillerImage } from '../lib/filler'

const Colors = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  grid-auto-rows: 15em;

  .primary-color {
    background-color: ${props => props.theme.primaryColor};
  }
  .accent-color {
    background-color: ${props => props.theme.accentColor};
  }
  .white {
    background-color: ${props => props.theme.white};
  }
  .off-white {
    background-color: ${props => props.theme.offWhite};
  }
  .light-gray {
    background-color: ${props => props.theme.lightGray};
  }
  .gray {
    background-color: ${props => props.theme.gray};
  }
  .dark-gray {
    background-color: ${props => props.theme.darkGray};
  }
  .black {
    background-color: ${props => props.theme.black};
  }

  /* & > * {
    display: inline-block;
    height: 10em;
    width: 10em;
  } */
`

storiesOf('Base', module)
  .add('Colors', () => (
    <Colors>
      <div className='primary-color' />
      <div className='accent-color' />
      <div className='white' />
      <div className='off-white' />
      <div className='light-gray' />
      <div className='gray' />
      <div className='dark-gray' />
      <div className='black' />
    </Colors>
  ))
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
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
        <img
          src={fillerImage({ text: 'Figure', width: 400, height: 250 })}
          alt='Figure'
        />
        <figcaption>
          <p>Figure caption</p>
        </figcaption>
      </figure>
      <p>Moving on.</p>
      <img
        src={fillerImage({ text: 'Just image', width: 400, height: 250 })}
        alt='Just a filler'
      />
      <p>Done.</p>
    </div>
  ))
