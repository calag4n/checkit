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

const Home = ({ location }) => {
  const { firebase, user } = useFirebase()
  const [checkers, setCheckers] = useState([])
  const [currentChecker, setCurrentChecker] = useState(null)

  const handleSnapshot = snapshot => {
    const checkers = snapshot.docs.map(doc => {
      let newInit = doc.data().nextInit
      let initTask = [...doc.data().tasks]
      console.log(doc.data())

      if (isPast(doc.data().nextInit.toDate())) {
        if (doc.data().period === "monthly") {
          console.log("monthly")
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
    console.log(checkers)

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

  const modifyDb = updatedTasks => {
    firebase.db
      .collection("checkers")
      .doc(currentChecker.id)
      .update({ tasks: updatedTasks })
  }

  const removeChecker = id => {
    firebase.db.collection("checkers").doc(id).delete()

    setCurrentChecker(null)
  }

  const updateChecker = (index, task, checked) => {
    const updatedTasks = [...currentChecker.tasks]
    updatedTasks[index] = { task, checked }

    setCurrentChecker(prev => ({ ...prev, tasks: updatedTasks }))

    modifyDb(updatedTasks)
  }

  const deleteTask = index => {
    const updatedTasks = [...currentChecker.tasks]
    console.log(updatedTasks)
    updatedTasks.splice(index, 1)
    console.log(updatedTasks)

    setCurrentChecker(prev => ({ ...prev, tasks: updatedTasks }))

    modifyDb(updatedTasks)
  }

  const addTask = () => {
    const updatedTasks = [...currentChecker.tasks]
    updatedTasks.push({ task: "", checked: false })

    setCurrentChecker(prev => ({ ...prev, tasks: updatedTasks }))

    modifyDb(updatedTasks)
  }

  return (
    <Layout page="home">
      {currentChecker ? (
        <Checker
          checker={currentChecker}
          closeChecker={() => setCurrentChecker(null)}
          removeChecker={removeChecker}
          updateChecker={updateChecker}
          deleteTask={deleteTask}
          addTask={addTask}
        />
      ) : (
        <CheckersList>
          {checkers.map((checker, index) => (
            <CheckerBlock
              key={checker.id}
              color={checker.color}
              onClick={() => setCurrentChecker(checkers[index])}
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
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`

const CheckerBlock = styled.div`
  place-self: center;
  border: 2px ${props => props.color} solid;
  padding: 0.5em;
  border-radius: 8px;
  width: 80%;
  box-shadow: 3px 4px 8px 0px rgba(0, 0, 0, 0.5);
`
