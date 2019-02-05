import React from 'react'

import CreateQuest from '../components/CreateQuest'

const NewQuestPage = props => (
  <div>
    <CreateQuest adventureId={props.query.adventureId} />
  </div>
)

export default NewQuestPage
