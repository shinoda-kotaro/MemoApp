import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const Logout = () => {
    Alert.alert(
      'Logout',
      '実行しますか？',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            firebase
              .auth()
              .signOut()
              .then(function () {
                navigation.navigate('Login');
              })
              .catch(function (error) {
                console.log(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const user = firebase.auth().currentUser;
  const [userName, setUserName] = useState(user.displayName);

  const userNameEditButton = () => {
    let iconColor;
    if (userName === user.displayName) {
      iconColor = 'limegreen';
    } else {
      iconColor = 'orange';
    }
    return <FontAwesome name="check-circle" size={22} color={iconColor} />;
  };

  const updateUserName = () => {
    // update user name
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}
        >
          <TextInput
            style={{ fontSize: 23, padding: 1, width: 300, height: 30 }}
            onChangeText={(text) => setUserName(text)}
            placeholder="名前を入力してください"
            value={userName}
          />
          <TouchableOpacity onPress={updateUserName}>
            {userNameEditButton()}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.optionConatainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={Logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoutButton: {
    padding: 10,

    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
  },
  profileContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  userNameEditButton: {
    // style
  },
  userNameContainer: {
    flexDirection: 'row',
  },
  optionConatainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    paddingTop: 30,
    paddingBottom: 30,
  },
});
