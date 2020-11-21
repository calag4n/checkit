import { navigate } from "gatsby"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  addDays,
  addMonths,
  addWeeks,
  startOfDay,
  startOfMonth,
  startOfWeek,
  isPast,
} from "date-fns"

import Checker from "../components/Checker"

import Layout from "../components/layout"

import { useFirebase } from "../contexts/firebaseContext"
import { useCheckers } from "../contexts/checkerContext"

const Home = ({ location }) => {
  const { firebase, user } = useFirebase()
  const {checkers, setCheckers, currentChecker, setCurrentChecker} = useCheckers()

  const handleSnapshot = snapshot => {
    const checkers = snapshot.docs.map(doc => {
      let newInit = doc.data().nextInit
      let initTask = [...doc.data().tasks]

      if (isPast(doc.data().nextInit.toDate())) {
        if (doc.data().period === "monthly") {
          newInit = startOfMonth(addMonths(new Date(), 1))
        } else if (doc.data().period === "daily") {
          newInit = startOfDay(addDays(new Date(), 1))
        } else if (doc.data().period === "weekly") {
          newInit = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 })
        }

        initTask = doc
          .data()
          .tasks.map(({ task }) => ({ task, checked: false }))

        firebase.db
          .collection("checkers")
          .doc(doc.id)
          .update({ tasks: initTask, nextInit: newInit })
      }

      return { id: doc.id, ...doc.data(), nextInit: newInit, tasks: initTask }
    })

    setCheckers(checkers)
  }

  useEffect(() => {
    if (user) {
      const id = firebase.db.collection("users").doc(user.uid)

      const getCheckers = () => {
        firebase.db
          .collection("checkers")
          .where("user", "==", id)
          // .orderBy('created', 'asc')
          .onSnapshot(handleSnapshot)
      }
      return getCheckers()
    }
  }, [firebase, user])

  return (
    <Layout page="home">
      {currentChecker ? (
        <Checker
          checker={currentChecker}
        />
      ) : (
        <CheckersList>
          {checkers.map((checker, index) => (
            <CheckerBlock
              key={checker.id}
              color={checker.color}
              onClick={() => setCurrentChecker({action: 'open', value: index})}
            >
              {checker.title}
            </CheckerBlock>
          ))}
        </CheckersList>
      )}
    </Layout>
  )
}

export default Home

const CheckersList = styled.div`
  height: 100%;
  display: grid;
  /* grid-template-columns: repeat(2, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
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
