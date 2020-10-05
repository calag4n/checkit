import { useEffect, useState } from "react"
import firebase from "../firebase"

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      setAuthUser(user ? user : null)
    })

    //TODO To see if it's browser closing persistent
    return () => unsubscribe()
  }, [])
  return authUser
}

export default useAuth
