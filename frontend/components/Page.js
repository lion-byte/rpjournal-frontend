import React from 'react'
import styled from 'styled-components'
import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'

import Header from './Header'
import Meta from './Meta'
import Theme from './Theme'

const StyledPage = styled.div`
  main {
    margin: 0 auto;
    max-width: 1400px;
    padding: 4em 2em;
  }
`

export const Page = ({ children }) => (
  <Theme>
    <StyledPage>
      <Meta />
      <SkipNavLink />
      <Header />
      <SkipNavContent />
      <main role='main'>{children}</main>
    </StyledPage>
  </Theme>
)

export default Page
