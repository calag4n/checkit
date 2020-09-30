import React, { useEffect } from "react"
import { SocialLogins, useAuth } from "gatsby-theme-firebase"
import styled from "styled-components"
import Title from "../components/Title"


const IndexPage = () => {
  const { isLoading, isLoggedIn, profile } = useAuth();

  useEffect(() => {
    console.log(isLoggedIn)
    console.log(profile)
  }, [])
  return (
  <Wrapper>
    <Title />

    <SocialLogins
      onSuccess={user => {
        console.log(user)
      }}
    />
  </Wrapper>
)}

export default IndexPage

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
`
