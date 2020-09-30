require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-google-gapi`,
    //   options: {
    //     apiKey: `{API_KEY}`,
    //     clientId: `{CLIENT_ID}`,
    //     discoveryURLs: [
    //       // These are the discovery docs for various Google APIs.
    //       // This can be empty.
    //       // Find more here: https://developers.google.com/discovery
    //       // This one is for the Google Drive v3 api.
    //       "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    //     ],
    //     // The permission scopes your app needs.
    //     // For auth only, this can be empty.
    //     // Find more here: https://developers.google.com/identity/protocols/oauth2/scopes
    //     // This one is for reading a writing all files in Google Drive.
    //     scopes: ["https://www.googleapis.com/auth/drive"],
    //   },
    // },

    {
      resolve: "gatsby-theme-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
        },
        // loginPath: "/login",
        loginRedirectPath: "/home",
        socialLogins: ["google"],
      },
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
