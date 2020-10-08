import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import styled from "styled-components"

import Title from "../components/Title"
import google from "../images/google.svg"

import { useFirebase } from "../contexts/firebaseContext"

const IndexPage = () => {
  const { user, firebase, login} = useFirebase()



  useEffect(() => {
    if (user) {
      firebase.db.collection("users").doc(user.uid).set({
        id: user.uid,
        name: user.displayName,
        mail: user.email,
      })
      navigate("/home")
    }

  }, [user])

  return (
    <Wrapper>
        <>
          <Title />
          <GoogleSignIn onClick={() => login("google")}>
            <img src={google} alt="logo google" />
            Connexion avec Google
          </GoogleSignIn>
        </>

    </Wrapper>
  )
}

export default IndexPage

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const GoogleSignIn = styled.button`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 0.8em;
  background-color: white;
  border: 1px solid #ff3e00;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3em 0.8em 0.3em 0.3em;
  border-radius: 50px;
  box-shadow: 3px 4px 8px 0px rgba(0, 0, 0, 0.5);
  outline: none;
  transition: box-shadow 200ms;
  &:hover {
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
  }

  & img {
    margin: 0;
  }
`
