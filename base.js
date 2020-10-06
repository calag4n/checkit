import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

let firebaseApp, base

if (typeof window !== 'undefined') {
firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDIr2ztE9qOQeAtjldnDB6pEhJRG3CMUpQ",
  authDomain: "antre-cool.firebaseapp.com",
  databaseURL: "https://antre-cool.firebaseio.com",
  storageBucket: "antre-cool.appspot.com"
})

base = Rebase.createClass(firebaseApp.database())
}



// this is a default export
export default base
