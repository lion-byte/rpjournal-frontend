import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const StyledSession = styled.article``

/**
 * @param {object} props
 * @param {SessionModel} props.session
 */
const Session = props => {
  const { session } = props

  return (
    <StyledSession>
      <h1>
        <Link href={{ pathname: '/session', query: { id: session.id } }}>
          <a>{session.title}</a>
        </Link>
      </h1>

      <p>{session.description}</p>
    </StyledSession>
  )
}

export default Session
