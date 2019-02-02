import React from 'react'

import SingleAdventure from '../components/SingleAdventure'

const AdventurePage = props => (
  <div>
    <SingleAdventure id={props.query.id} />
  </div>
)

export default AdventurePage
