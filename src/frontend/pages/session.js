import React from 'react'

import SingleSession from '../components/SingleSession'

const SessionPage = props => (
  <div>
    <SingleSession id={props.query.id} />
  </div>
)

export default SessionPage
