import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBuCWtn_4RqtUyCpOJtQMrC1djCXGlknOw',
  authDomain: 'ecommerce-e8061.firebaseapp.com',
  databaseURL: 'https://ecommerce-e8061.firebaseio.com',
  projectId: 'ecommerce-e8061',
  storageBucket: 'ecommerce-e8061.appspot.com',
  messagingSenderId: '157919364845',
  appId: '1:157919364845:web:c3112a620bbde498396ee4',
  measurementId: 'G-2TLCTNH05S',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
