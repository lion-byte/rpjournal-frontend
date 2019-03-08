import React from 'react'

import CreateAdventure from '../components/CreateAdventure'
import PleaseLogin from '../components/PleaseLogin'

const NewAdventure = () => (
  <div>
    <PleaseLogin>
      <CreateAdventure />
    </PleaseLogin>
  </div>
)

export default NewAdventure
