import React from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';

export default function ChatScreen({ navigation }) {
  const user = firebase.auth().currentUser;
  const addButton = (
    <FontAwesome name="plus-circle" size={40} color="#b3424a" />
  );

  const SortItem = (color, title) => {
    return (
      <TouchableOpacity
        style={[styles.sortContainer, { backgroundColor: color }]}
        onPress={() => navigation.navigate('Sort', { title: title })}
      >
        <Text style={{ fontSize: 25 }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {SortItem('skyblue', '新着')}
      {SortItem('limegreen', 'カテゴリー別')}
      <TouchableOpacity
        style={styles.addGroupButton}
        onPress={() => navigation.navigate('CreateChat')}
      >
        {addButton}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sortContainer: {
    height: 100,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  addGroupButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});
