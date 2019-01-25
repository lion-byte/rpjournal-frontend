import React, { PureComponent } from 'react'

import Form from './styles/Form'

export class CreateJournal extends PureComponent {
  state = {
    title: '',
    description: ''
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} event
   */
  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  handleSubmit = event => {
    event.preventDefault()
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor='title'>
            Title
            <input
              id='title'
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
              required
            />
          </label>

          <label htmlFor='description'>
            Description
            <textarea
              id='description'
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
              required
            />
          </label>

          <button type='submit'>Create Journal</button>
        </fieldset>
      </Form>
    )
  }
}

export default CreateJournal
