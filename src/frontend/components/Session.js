import React from 'react'
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
      <h1>{session.title}</h1>

      <p>{session.description}</p>
    </StyledSession>
  )
}

export default Session
