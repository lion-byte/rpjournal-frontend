import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import 'modern-normalize'
import 'nprogress/nprogress.css'
import '@reach/skip-nav/styles.css'
import 'draft-js/dist/Draft.css'
import 'draftail/dist/draftail.css'
import 'typeface-open-sans'
import 'typeface-sarabun'

const theme = {
  white: '#ffffff',
  offWhite: '#dfdfdf',
  lightGray: '#c3c3c3',
  gray: '#767676',
  darkGray: '#525252',
  black: '#353535',
  primaryColor: '#ea45ba',
  accentColor: '',
  headerFont: `'Sarabun', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`,
  baseFont: `'Open Sans', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`
}

const GlobalStyles = createGlobalStyle`
  body {
    color: ${props => props.theme.black};
    font-family: ${props => props.theme.baseFont};
    font-size: 1em;
    padding: 0;
  }

  a {
    color: ${props => props.theme.primaryColor};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${props => props.theme.headerFont};
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
