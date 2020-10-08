import { navigate } from "gatsby"
import { useEffect, useState } from "react"
import firebase from "../firebase/Proxy"

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null)


  useEffect(() => {

    const unsubscribe = firebase.auth.onAuthStateChanged(user => {
      
      if (user) {
        setAuthUser(user)
      }

    })

    return () => unsubscribe()
  }, [])

  const login = provider => {
    firebase.auth.signInWithPopup(firebase.providers[provider])

  }

  const logout = () => firebase.auth.signOut().then(_=>{
    setAuthUser(null)
    navigate("/")})
  
  return [authUser, login, logout]
}

export default useAuth
