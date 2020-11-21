import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider } from "styled-components"

import { theme, GlobalStyle } from "../theme"
import Header from "./Header"
import "./layout.css"

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
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} page={page}/>
      <Container>
        {children}
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  page: PropTypes.string,
}

const LayoutContainer = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout {...props}></Layout>
    </ThemeProvider>
  )
}

export default LayoutContainer

const Container = styled.main`
  height: 92vh;
  margin: 0 auto;
  max-width: 960;
  padding: 1.25rem 1.0875rem 1.25rem;
`;

