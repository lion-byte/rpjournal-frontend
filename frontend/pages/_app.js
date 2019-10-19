import React from 'react'
import App from 'next/app'
import { ApolloProvider } from 'react-apollo'
import Router from 'next/router'
import NProgress from 'nprogress'

import Page from '../components/Page'
import UserProvider from '../components/UserProvider'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
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
    const { Component, apollo, pageProps } = this.props

    return (
      <ApolloProvider client={apollo}>
        <UserProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </UserProvider>
      </ApolloProvider>
    )
  }
}

export default withData(MyApp)
