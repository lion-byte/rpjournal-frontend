import React from 'react'

import CreateSession from '../components/CreateSession'

const NewSessionPage = props => (
  <div>
    <CreateSession adventureId={props.query.adventureId} />
  </div>
)

export default NewSessionPage
