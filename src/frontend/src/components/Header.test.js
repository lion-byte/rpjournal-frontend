import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Header from './Header'
import Theme from './Theme'

describe('Header', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Theme>
          <Header />
        </Theme>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
