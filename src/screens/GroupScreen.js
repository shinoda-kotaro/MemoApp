import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GroupScreen({ route }) {
  const db = route.params.db;
  return (
    <View style={styles.container}>
      <View style={styles.inputMessageContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMessageContainer: {
    height: 40,
    flex: 1,
  },
});
