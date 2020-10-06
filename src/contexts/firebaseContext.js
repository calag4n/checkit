import React, { createContext, useContext } from "react"
import auth from "../firebase/Auth"
import firebase from "../firebase/Proxy"
import useAuth from "../hooks/useAuth"

const FirebaseContext = createContext({firebase: {}, auth: {}, user: {}})

export const useFirebase  = ()=> useContext(FirebaseContext)

export const FirebaseProvider = ({ children }) => {
  const user = useAuth()
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        auth,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

