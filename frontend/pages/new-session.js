import React from 'react'

import CreateSession from '../components/CreateSession'
import PleaseLogin from '../components/PleaseLogin'

const NewSessionPage = props => (
  <div>
    <PleaseLogin>
      <CreateSession adventureId={props.query.adventureId} />
    </PleaseLogin>
  </div>
)

export default NewSessionPage
