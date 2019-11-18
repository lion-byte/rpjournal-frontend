import styled from 'styled-components'

export const DetailsMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  font-size: 0.8em;

  .details span,
  .options a {
    display: inline-block;
    margin: 0 0.5em 0.5em 0;
    padding: 0.5em 0.75em;
  }

  .details span {
    padding: 0 0.5em 0 0;
  }

  .options a {
    background-color: ${props => props.theme.primaryColor};
    border-radius: 1em;
    color: ${props => props.theme.white};
    font-weight: bold;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`

export default DetailsMenu
