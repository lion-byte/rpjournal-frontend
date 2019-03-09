import React from 'react'

import CreateQuest from '../components/CreateQuest'
import PleaseLogin from '../components/PleaseLogin'

const NewQuestPage = props => (
  <div>
    <PleaseLogin>
      <CreateQuest adventureId={props.query.adventureId} />
    </PleaseLogin>
  </div>
)

export default NewQuestPage
