require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [

    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'fr'
      }
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyCFIuE2-ljTvqC65uwDALHibAEwXeuXuho",
          authDomain: "checkit-1a1c5.firebaseapp.com",
          databaseURL: "https://checkit-1a1c5.firebaseio.com",
          projectId: "checkit-1a1c5",
          storageBucket: "checkit-1a1c5.appspot.com",
          messagingSenderId: "126717325093",
          appId: "1:126717325093:web:9e5056206355dad2d9b4cc",
        }
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
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
