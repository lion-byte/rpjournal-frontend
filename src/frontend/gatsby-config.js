module.exports = {
  siteMetadata: {
    title: 'RPJournal',
    description: 'A journaling tool for holding RPG session notes.'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#28579d',
        showSpinner: true
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'RPJournal',
        short_name: 'RPJournal',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#28579d',
        display: 'minimal-ui',
        icon: './src/images/icon.png'
      }
    },
    'gatsby-plugin-netlify' // Must be last in list
  ]
}
