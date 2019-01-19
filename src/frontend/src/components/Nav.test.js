import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Nav from './Nav'
import Theme from './Theme'

describe('Nav', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Theme>
          <Nav />
        </Theme>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
