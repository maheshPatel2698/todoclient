import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import firebase from "firebase/compat/app"
const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_APP_ID}`
};

export const app = firebase.initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider(auth)

export const signUp = () => {
    const user = signInWithPopup(auth, provider)
    return user
}