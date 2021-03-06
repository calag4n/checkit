require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Check It`,
    description: `Simple periodic todo list`,
    author: `calag4n`,
  },
  plugins: [

    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'fr'
      }
    },

    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Check It !`,
        short_name: `Check it`,
        start_url: `/`,
        background_color: `#f4f5fd`,
        theme_color: `#ff3e00`,
        display: `standalone`,
        icon: `src/images/check.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
