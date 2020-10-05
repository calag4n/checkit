import app from 'gatsby-plugin-firebase/app'
import 'gatsby-plugin-firebase/auth'
import 'gatsby-plugin-firebase/firestore'

import firebaseConfig from './config'

class Firebase {
  constructor(){
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.db = app.firestore()
  }

  login = async provider => {
    const {user} = await this.auth.signInWithPopup(this[`${provider}Provider`])
    console.log(user)
  }

  logout = async () => this.auth.signOut()

}

const firebase = new Firebase()
export default firebase