import React, { createContext, useContext } from "react"
import firebase from "../firebase"
import useAuth from "../hooks/useAuth"

const FirebaseContext = createContext(null)

export const useFirebase  = ()=> useContext(FirebaseContext)

export const FirebaseProvider = ({ children }) => {
  const user = useAuth()
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

