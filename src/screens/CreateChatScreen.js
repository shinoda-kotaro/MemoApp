import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import firebase from 'firebase';

export default function CreateChatScreen({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState([]);
  const [icon, setIcon] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [checkedCategory, setCheckedCategory] = useState('');
  const [owner, setOwner] = useState('');
  const db = route.params.db;
  const user = firebase.auth().currentUser;
  const email = user.email;

  useEffect(() => {
    let copyStatus = [];
    let copyIcon = [];
    let copyCategoryName = [];

    db.collection('categories')
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          copyStatus = copyStatus.slice().concat('unchecked');
          copyIcon = copyIcon.slice().concat(doc.data().icon);
          copyCategoryName = copyCategoryName.slice().concat(doc.data().name);
        });
        setStatus(copyStatus);
        setIcon(copyIcon);
        setCategoryName(copyCategoryName);
      });

    db.collection('users')
      .where('email', '==', email)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setOwner(doc.id);
        });
      })
      .catch((error) => {
        console.log('ユーザーを取得できませんでした', error);
      });
  }, []);

  const categories = status.map((status, index) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
        key={index.toString()}
      >
        <ToggleButton
          icon={icon[index]}
          size={40}
          color="white"
          value={icon[index]}
          status={status}
          onPress={() => onButtonToggle(index)}
          style={
            status === 'checked'
              ? styles.categoryItemChecked
              : styles.categoryItemUnchecked
          }
        />
        <Text>{categoryName[index]}</Text>
      </View>
    );
  });

  const onButtonToggle = (num) => {
    const statusArray = status.slice();
    statusArray.map((status, index) => {
      if (status === 'checked' && index !== num) {
        statusArray[index] = 'unchecked';
      }
    });
    statusArray[num] = statusArray[num] === 'checked' ? 'unchecked' : 'checked';
    if (statusArray[num] === 'checked') {
      setCheckedCategory(categoryName[num]);
    } else {
      setCheckedCategory('');
    }
    setStatus(statusArray);
  };

  const resetStack = (title) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'Chat',
          },
          {
            name: 'Group',
            params: {
              title: title,
            },
          },
        ],
      })
    );
  };

  const CreateChat = (title) => {
    if (!title) {
      title = '雑談';
    }

    if (!checkedCategory) {
      setCheckedCategory('その他');
    }

    db.collection('groups')
      .add({
        title: title,
        category: checkedCategory,
        owner: owner,
      })
      .then((docRef) => resetStack(docRef.title))
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Title</Text>
      <TextInput
        style={styles.titleInput}
        label="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Category</Text>
      <View style={styles.categoryContainer}>{categories}</View>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => CreateChat(title)}
      >
        <Text style={{ fontSize: 22, color: '#fff' }}>Create!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
  titleInput: {
    width: '80%',
    height: 30,
    textAlign: 'center',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 50,
    fontSize: 17,
  },
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
  },
  categoryItemUnchecked: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#85E5D8',
  },
  categoryItemChecked: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: '#38A3D8',
  },
  createButton: {
    backgroundColor: '#b3424a',
    padding: 10,
    borderRadius: 21,
  },
});
