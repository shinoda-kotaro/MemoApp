import React, { useEffect } from 'react';
import firebase from 'firebase';
import AuthForm from '../components/AuthForm';

// firebase.initializeApp(firebaseConfig);

export default function SignupScreen({ route, navigation }) {
  const db = route.params.db;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        navigation.navigate('App');
      }
    });
  }, []);

  const Signup = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user
          .updateProfile({
            displayName: 'User',
          })
          .then(() => {
            db.collection('users')
              .add({
                name: 'user',
                email: email,
              })
              .then(() => {
                console.log('success!');
                navigation.navigate('App');
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthForm
      onPress={(email, password) => Signup(email, password)}
      transAuthText="アカウントをお持ちの方"
      transAuth={() => navigation.navigate('Login')}
    />
  );
}
