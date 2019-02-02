import React from 'react'

import UpdateAdventure from '../components/UpdateAdventure'

const UpdateAdventurePage = props => (
  <div>
    <UpdateAdventure id={props.query.id} />
  </div>
)

export default UpdateAdventurePage
