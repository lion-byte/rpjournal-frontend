import styled from 'styled-components'

const Header = styled.header`
  .bar {
    align-items: stretch;
    border-bottom: 0.625em solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;

    h1 {
      font-family: ${props => props.theme.baseFont};
      font-size: 3em;
      margin: 0.25em 0.5em;
      position: relative;

      @media (max-width: 1300px) {
        margin: 0;
        text-align: center;
      }

      a {
        padding: 0.125em 0.25em;
        text-decoration: none;
      }
    }

    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.black};
  }
`

export default Header
