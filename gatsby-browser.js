import { element } from "prop-types"
import React from "react"

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