import { navigate } from "gatsby"
import React, {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { checkerInitObject } from "./checkerInitObject"
import { useFirebase } from "./firebaseContext"

const checkersContext = createContext({})

export const useCheckers = () => useContext(checkersContext)

export const CheckersProvider = ({ children }) => {
  const [checkers, setCheckers] = useState([])
  const { firebase, user } = useFirebase()
  const [isDraggable, setIsDraggable] = useState(false)

  const reducer = (state, payload) => {
    let _state = Object.assign({}, state)
    let _tasks = state ? Array.from(state.tasks) : []
    const { action, value } = payload
    let index, task, checked

    const modifyDb = (id, tasks) => {
      firebase.db.collection("checkers").doc(id).update({ tasks })
    }

    switch (action) {
      case "open":
        _state = { ...checkers[value] }
        navigate("/checker")
        return _state

      case "close":
        navigate("/home")
        setIsDraggable(false)
        return checkerInitObject

      case "removeChecker":
        firebase.db.collection("checkers").doc(value).delete()
        return checkerInitObject

      case "updateChecker":
        ;({ index, task, checked } = value)
        _tasks[index] = { task, checked }
        modifyDb(_state.id, _tasks)
        return { ..._state, tasks: _tasks }

      case "deleteTask":
        console.log(_state)
        console.log(value)
        console.log(_tasks)
        _tasks.splice(value, 1)
        console.log(_tasks)
        modifyDb(_state.id, _tasks)
        return { ..._state, tasks: _tasks }

      case "addTask":
        _tasks.push({ task: "", checked: false })
        modifyDb(_state.id, _tasks)
        return { ..._state, tasks: _tasks }

      case "updateTasksOrder":
        if (!value.destination) return

        const source = value.source.index
        const destination = value.destination.index
        task = _tasks[source]

        _tasks.splice(source, 1)
        _tasks.splice(destination, 0, task)

        modifyDb(_state.id, _tasks)
        return { ..._state, tasks: _tasks }

      default:
        break
    }
  }

  const [currentChecker, setCurrentChecker] = useReducer(
    reducer,
    checkerInitObject
  )

  return (
    <checkersContext.Provider
      value={{
        currentChecker,
        setCurrentChecker,
        checkers,
        setCheckers,
        isDraggable,
        setIsDraggable,
      }}
    >
      {children}
    </checkersContext.Provider>
  )
}
