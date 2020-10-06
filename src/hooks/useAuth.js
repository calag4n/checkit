import { useEffect, useState } from "react"
import firebase from "../firebase/Proxy"

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      setAuthUser(user ? user : null)
    })

    return () => unsubscribe()
  }, [])
  return authUser
}

export default useAuth
