import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AuthForm({ onPress, transAuthText, transAuth }) {
  const nextButton = <AntDesign name="rightcircleo" size={40} color="black" />;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text>Email</Text>
        <TextInput
          style={styles.inputEmail}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text>Password</Text>
        <TextInput
          style={styles.inputPassword}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            onPress(email, password);
            setEmail('');
            setPassword('');
          }}
        >
          {nextButton}
        </TouchableOpacity>
        <TouchableOpacity style={styles.transAuthButton} onPress={transAuth}>
          <Text style={styles.transAuthText}>{transAuthText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 250,
  },
  inputEmail: {
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 30,
    height: 30,
    width: '80%',
    fontSize: 17,
    textAlign: 'center',
  },
  inputPassword: {
    borderWidth: 1,
    borderRadius: 15,
    textAlign: 'center',
    marginBottom: 30,
    height: 30,
    width: '80%',
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 30,
  },
  transAuthButton: {
    padding: 10,
    backgroundColor: '#b3424a',
    borderRadius: 5,
  },
  transAuthText: {
    fontSize: 18,
    color: '#fff',
  },
});
