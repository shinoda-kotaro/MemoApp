import React from 'react';
import firebase from 'firebase';
import AuthForm from '../components/AuthForm';

export default function SignupScreen({ navigation }) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      navigation.navigate('App');
    }
  });
  const Signup = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('success');
        navigation.navigate('App');
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
