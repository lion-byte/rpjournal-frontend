import React from 'react'

import UpdateQuest from '../components/UpdateQuest'

const UpdateQuestPage = props => (
  <div>
    <UpdateQuest id={props.query.id} />
  </div>
)

export default UpdateQuestPage
