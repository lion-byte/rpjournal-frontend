import React from 'react'
import Helmet from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'

const META_QUERY = graphql`
  query META_QUERY {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`

const Meta = props => (
  <StaticQuery query={META_QUERY}>
    {({ site }) => (
      <Helmet
        titleTemplate={`%s | ${site.siteMetadata.title}`}
        defaultTitle={site.siteMetadata.title}
        htmlAttributes={{ lang: 'en' }}
      >
        <meta name='description' content={site.siteMetadata.description} />
      </Helmet>
    )}
  </StaticQuery>
)

export default Meta
