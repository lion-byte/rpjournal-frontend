import React from 'react'

import SingleQuest from '../components/SingleQuest'

const QuestPage = props => (
  <div>
    <SingleQuest id={props.query.id} />
  </div>
)

export default QuestPage
