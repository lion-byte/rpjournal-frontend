import React from 'react'

import PleaseLogin from '../components/PleaseLogin'
import UpdateQuest from '../components/UpdateQuest'

const UpdateQuestPage = props => (
  <div>
    <PleaseLogin>
      <UpdateQuest id={props.query.id} />
    </PleaseLogin>
  </div>
)

export default UpdateQuestPage
