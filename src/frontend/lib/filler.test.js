import { fillerImage } from './filler'

describe('Filler', () => {
  test('Create filler image URL', () => {
    const img = fillerImage({ text: 'ExampleText', height: 900, width: 1600 })

    expect(img).toMatchSnapshot()
  })
})
