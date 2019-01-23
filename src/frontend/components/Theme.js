import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import '@reach/skip-nav/styles.css'

const theme = {
  black: '#353535',
  primaryColor: 'royalblue'
}

const GlobalStyles = createGlobalStyle`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  body {
    color: ${props => props.theme.black};
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1em;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${props => props.theme.primaryColor};
  }
`

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />

      {children}
    </React.Fragment>
  </ThemeProvider>
)

export default Theme
