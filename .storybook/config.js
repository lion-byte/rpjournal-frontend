// @ts-check

import React from 'react'
import { addDecorator, addParameters, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import styled from 'styled-components'

import Theme from '../components/Theme'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/)

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module)

addParameters({
  options: {
    showPanel: false
  }
})

// Enable Knobs addon
addDecorator(withKnobs)

// Add global styles
const Wrapper = styled.div`
  padding: 1em;
`
addDecorator(story => (
  <Theme>
    <Wrapper>{story()}</Wrapper>
  </Theme>
))
