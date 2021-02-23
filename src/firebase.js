import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';

const app = firebase.initializeApp({
    //apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    apiKey: "AIzaSyCZtX_qQb7VpaYNVT373T6ElAd53WU4ZVE",
    //authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    authDomain: "rpitest-c0e23.firebaseapp.com",
    //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    databaseURL: "https://rpitest-c0e23-default-rtdb.firebaseio.com",
    //projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    projectId: "rpitest-c0e23",
    //storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    storageBucket: "rpitest-c0e23.appspot.com",
    //messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    messagingSenderId: "1588447735",
    //appId: process.env.REACT_APP_FIREBASE_APP_ID,
    appId: "1:1588447735:web:e34753d244693df0fbc6f2",
    //measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    measurementId: "G-VBT7DTCRTF"
})

export const auth = app.auth()
export default app