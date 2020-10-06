import app from "./Proxy"

// class Firebase {
//   constructor(){
//     this.auth = app.auth()
//     this.googleProvider =  app.auth.GoogleAuthProvider()
//     this.db = app.db()
//   }

//   login = async provider => {
//     const {user} = await app.auth.signInWithPopup(app[`${provider}Provider`])
//     console.log(user)
//   }

//   logout = async () => app.auth.signOut()

// }

// let firebase= new Firebase()

// // if (typeof window !== 'undefined') {
// // firebase = new Firebase()
// // } else{
// //   firebase = {}
// // }
// export default firebase

export default {
  login: provider => app.auth.signInWithPopup(app.providers[provider]),

  logout: () => app.auth.signOut(),
}
