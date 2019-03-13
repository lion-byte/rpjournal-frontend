import React from 'react'
import Link from 'next/link'

/**
 * @param {object} props
 * @param {QuestModel} props.quest
 */
const Quest = props => {
  const { quest } = props

  return (
    <article className='quest'>
      <h1>
        <Link href={{ pathname: '/quest', query: { id: quest.id } }}>
          <a>{quest.title}</a>
        </Link>
      </h1>

      <section dangerouslySetInnerHTML={{ __html: quest.description }} />
    </article>
  )
}

export default Quest
