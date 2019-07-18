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
  white: 'rgb(255,255,255)',
  offWhite: 'rgb(225,225,225)',
  lightGray: 'rgb(175,175,175)',
  gray: 'rgb(125,125,125)',
  darkGray: 'rgb(75,75,75)',
  black: 'rgb(25,25,25)',
  primaryColor: '#ea45ba',
  accentColor: '#1d5e81',
  headerFont: `'Sarabun', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`,
  baseFont: `'Open Sans', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`
}

const GlobalStyles = createGlobalStyle`
  * {
    outline-width: 2px;
  }

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

  .detail-notes {
    line-height: 1.5;
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
