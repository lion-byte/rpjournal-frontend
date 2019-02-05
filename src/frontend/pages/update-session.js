import React from 'react'
import UpdateSession from '../components/UpdateSession'

const UpdateSessionPage = props => (
  <div>
    <UpdateSession id={props.query.id} />
  </div>
)

export default UpdateSessionPage
