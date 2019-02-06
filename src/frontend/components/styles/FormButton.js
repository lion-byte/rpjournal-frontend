import styled from 'styled-components'

const FormButton = styled.button`
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.white};
  border: 0;
  font-weight: bold;
  padding: 0.5em 1.25em;
`

export default FormButton
