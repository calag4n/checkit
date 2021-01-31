import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"

import { theme, GlobalStyle } from "../theme"
import Header from "./Header"
import "./layout.css"
import SEO from "./seo"

const Layout = ({ children, page }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <SEO />
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        page={page}
      />
      <Container>{children}</Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.string,
}

const LayoutContainer = props => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout {...props}></Layout>
    </ThemeProvider>
  )
}

export default LayoutContainer

const Container = styled.main`
  min-height: 92vh;
  margin: 0 auto;
  /* max-width: 960vw; */
  padding: 1.25rem 0;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`
