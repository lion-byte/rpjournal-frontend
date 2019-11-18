import React from 'react'
import styled from 'styled-components'
import { ApolloError } from 'apollo-boost'

export const ErrorStyles = styled.div`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.accentColor};
`

/**
 * @param {object} props
 * @param {Error | ApolloError} [props.error]
 */
export const ErrorMessage = props => {
  const { error } = props

  if (!error || !error.message) {
    return null
  } else if (error instanceof ApolloError && error.graphQLErrors.length > 0) {
    return (
      <React.Fragment>
        {error.graphQLErrors.map((err, i) => (
          <ErrorStyles key={i}>
            <p data-test='graphql-error'>
              <strong>Dang!</strong> {err.message.replace('GraphQL error:', '')}
            </p>
          </ErrorStyles>
        ))}
      </React.Fragment>
    )
  }

  return (
    <ErrorStyles>
      <p data-test='graphql-error'>
        <strong>Dang!</strong> {error.message.replace('GraphQL error:', '')}
      </p>
    </ErrorStyles>
  )
}

ErrorMessage.defaultProps = {
  error: null
}

export default ErrorMessage
