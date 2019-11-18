import styled from 'styled-components'

export const Nav = styled.nav`
  font-size: 1.5em;

  a,
  button {
    background-color: transparent;
    border: none;
    display: block;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 0.25em 0.5em;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  .menu-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    text-align: left;
    width: 100%;
  }

  .menu {
    transition: all 0.3s ease-out;
    max-height: 0;
    overflow: hidden;

    &.active {
      max-height: 25em;
    }

    ul {
      border-top: 1px solid ${props => props.theme.black};
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a,
    button {
      border-bottom: 1px solid ${props => props.theme.black};
    }

    button {
      color: ${props => props.theme.primaryColor};
      cursor: pointer;
      text-align: left;
      width: 100%;
    }
  }

  @media screen and (min-width: 55em) {
    .menu-button {
      display: none;
    }

    .menu {
      max-height: none;

      ul {
        border: 0;
        margin: 0 0 0 -0.25em;
      }

      li {
        display: inline-block;
        margin: 0 0.25em;
      }

      a,
      button {
        border: 0;
      }
    }
  }
`

export default Nav
