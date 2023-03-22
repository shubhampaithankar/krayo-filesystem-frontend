import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

import config from '../config.json'

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: 'krayo-filesystem.firebaseapp.com',
  projectId: 'krayo-filesystem',
  storageBucket: 'krayo-filesystem.appspot.com',
  messagingSenderId: '66203677839',
  appId: '1:66203677839:web:a577d26645ef1d85d36cfa',
  measurementId: 'G-WSTRVWP2HQ'
}


const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const provider = new GoogleAuthProvider(auth)


export { auth, provider }