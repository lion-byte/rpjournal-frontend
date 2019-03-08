import React from 'react'

import PleaseLogin from '../components/PleaseLogin'
import UpdateSession from '../components/UpdateSession'

const UpdateSessionPage = props => (
  <div>
    <PleaseLogin>
      <UpdateSession id={props.query.id} />
    </PleaseLogin>
  </div>
)

export default UpdateSessionPage
