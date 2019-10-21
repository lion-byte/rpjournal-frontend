import React from 'react'

import SingleAdventure from '../components/SingleAdventure'

/** @type {import('next').NextPage<Record<string, any>>} */
const AdventurePage = props => ((
  <div>
    <SingleAdventure id={props.query.id} />
  </div>
))

AdventurePage.getInitialProps = async ctx => {
  return { query: ctx.query }
}

export default AdventurePage
