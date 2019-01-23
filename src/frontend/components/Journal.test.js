import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Journal from './Journal'
import Theme from './Theme'

/** @type {JournalModel} */
const exampleJournal = {
  id: '1',
  title: 'Example Journal',
  description: 'Lorem ipsum a et louve.',
  sessions: []
}

describe('Journal', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <Theme>
          <Journal journal={exampleJournal} />
        </Theme>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
