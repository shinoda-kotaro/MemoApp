import React from 'react';
import Navigator from './src/navigation/Navigator';
import firebaseConfig from './firebase';
import firebase from 'firebase';

require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch(function (error) {
    console.log(error);
  });

export default function App() {
  return <Navigator db={db} />;
}
