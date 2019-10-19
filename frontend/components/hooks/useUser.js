import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      name
      email
      permissions
    }
  }
`

export function useUser () {
  const result = useQuery(CURRENT_USER_QUERY)
  return result
}

export default useUser
