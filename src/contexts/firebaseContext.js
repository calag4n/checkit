import React, { createContext, useContext } from "react"

import firebase from "../firebase/Proxy"
import useAuth from "../hooks/useAuth"

const FirebaseContext = createContext({ firebase: {}, auth: {}, user: {} })

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = ({ children }) => {
  const [user, login, logout] = useAuth()
  return (
    <FirebaseContext.Provider
      value={{
        firebase,

        user,
        login,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
