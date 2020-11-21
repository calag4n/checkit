import React from "react"
import "firebase/auth"
import "firebase/firestore"

import { FirebaseProvider } from "./src/contexts/firebaseContext"
import { CheckersProvider } from "./src/contexts/checkerContext"

const Contexts = ({ element }) => {
  return (
    <FirebaseProvider>
      <CheckersProvider>{element}</CheckersProvider>
    </FirebaseProvider>
  )
}

const Wrapper = ({ element }) => {
  return <Contexts element={element} />
}

export const wrapRootElement = Wrapper
