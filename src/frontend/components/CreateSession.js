import React, { PureComponent } from 'react'

import Editor from './Editor'

export class CreateSession extends PureComponent {
  state = { details: '' }

  handleChange = deets => {
    const details = JSON.stringify(deets)

    this.setState({ details })
  }

  render () {
    return <Editor onSave={this.handleChange} />
  }
}

export default CreateSession
