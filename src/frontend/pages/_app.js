import React from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'

import Page from '../components/Page'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    // Expose query to page components
    pageProps.query = ctx.query

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Container>
    )
  }
}
