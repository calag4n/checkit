import React from "react"
import "firebase/auth"
import "firebase/firestore"

import {FirebaseProvider} from './src/contexts/firebaseContext'

const Contexts = ({element}) => {
  return (
    <FirebaseProvider>
      {element}
    </FirebaseProvider>
  )
}


const Wrapper = ({element}) => {
  return <Contexts element={element}/>
}



export const wrapRootElement = Wrapper