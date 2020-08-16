import React from 'react';
import firebase from 'firebase';
import AuthForm from '../components/AuthForm';

export default function LoginScreen({ navigation }) {
  const Login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        navigation.navigate('App');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <AuthForm
      onPress={(email, password) => Login(email, password)}
      transAuthText="新規登録画面へ"
      transAuth={() => navigation.navigate('Signup')}
    />
  );
}
