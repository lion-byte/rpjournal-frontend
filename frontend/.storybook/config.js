import React from 'react'
import { addDecorator, configure } from '@storybook/react'
import styled from 'styled-components'

import Theme from '../components/Theme'

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/)

configure(() => {
  req.keys().forEach(filename => req(filename))
}, module)

const Wrapper = styled.div`
  padding: 1em;
`

// Add global styles
addDecorator(story => (
  <Theme>
    <Wrapper>{story()}</Wrapper>
  </Theme>
))
