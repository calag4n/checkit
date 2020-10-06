import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from './config'

export default new Proxy(
  {
    get db() {
      return firebase.firestore();
    },
    get auth() {
      return firebase.auth();
    },
    providers: {
      get google() {
        return new firebase.auth.GoogleAuthProvider();
      },
    },
  },
  {
    get: function(target, name) {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      return target[name];
    },
  }
);