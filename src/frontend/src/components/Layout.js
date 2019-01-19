import React from 'react'
import styled from 'styled-components'
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'

import Header from './Header'
import Meta from './Meta'
import Theme from './Theme'

const Page = styled.div`
  main {
    margin: 0 auto;
    max-width: 1400px;
    padding: 2em;
  }
`

const Layout = ({ children }) => (
  <Theme>
    <Page>
      <Meta />
      <SkipNavLink />
      <Header />
      <SkipNavContent />
      <main>{children}</main>
    </Page>
  </Theme>
)

export default Layout
