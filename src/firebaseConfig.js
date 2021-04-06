import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCfId5wef3bw_iSkDbjjdV3T3OAiV1Ovaw",
    authDomain: "react-pruebass.firebaseapp.com",
    projectId: "react-pruebass",
    storageBucket: "react-pruebass.appspot.com",
    messagingSenderId: "260319475039",
    appId: "1:260319475039:web:81c81bb8acb119b99732ea"
  };

  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const dbFireStore = fire.firestore()

  export {dbFireStore}