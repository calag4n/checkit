import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { checkPeriods } from "../firebase/actions"
import Layout from "../components/layout"
import { useFirebase } from "../contexts/firebaseContext"
import { useCheckers } from "../contexts/checkerContext"

const Home = () => {
  const { firebase, user } = useFirebase()
  const { checkers, setCheckers, setCurrentChecker } = useCheckers()

  const handleSnapshot = snapshot => {
    const checkers = snapshot.docs.map(doc => checkPeriods(doc, firebase))
    setCheckers(checkers)
  }

  useEffect(() => {
    if (user) {
      const id = firebase.db.collection("users").doc(user.uid)

      const getCheckers = () => {
        firebase.db
          .collection("checkers")
          .where("user", "==", id)
          .onSnapshot(handleSnapshot)
      }
      return getCheckers()
    }
  }, [firebase, user])

  return (
    <Layout page="home">
      <CheckersList>
        {checkers
          ?.sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
          )
          ?.map((checker, index) => (
            <CheckerBlock
              key={checker.id}
              color={checker.color}
              onClick={() =>
                setCurrentChecker({ action: "open", value: index })
              }
            >
              {checker.title}
            </CheckerBlock>
          ))}
      </CheckersList>
    </Layout>
  )
}

export default Home

const CheckersList = styled.div`
  height: 100%;
  min-height: 92vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: auto;
`

const CheckerBlock = styled.div`
  place-self: center;
  border: 2px ${props => props.color} solid;
  padding: 0.5em;
  border-radius: 8px;
  width: 80%;
  box-shadow: 3px 4px 8px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  word-wrap: none;
  word-break: break-word;
  font-size: clamp(12px, 1em, 20px);
`
