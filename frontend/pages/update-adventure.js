import React from 'react'

import PleaseLogin from '../components/PleaseLogin'
import UpdateAdventure from '../components/UpdateAdventure'

const UpdateAdventurePage = props => (
  <div>
    <PleaseLogin>
      <UpdateAdventure id={props.query.id} />
    </PleaseLogin>
  </div>
)

export default UpdateAdventurePage
