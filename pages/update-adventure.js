import React from 'react'

import PleaseLogin from '../components/PleaseLogin'
import UpdateAdventure from '../components/UpdateAdventure'

/** @type {import('next').NextPage<Record<string, any>>} */
const UpdateAdventurePage = props => (
  <div>
    <PleaseLogin>
      <UpdateAdventure id={props.query.id} />
    </PleaseLogin>
  </div>
)

UpdateAdventurePage.getInitialProps = async ctx => {
  return { query: ctx.query }
}

export default UpdateAdventurePage
