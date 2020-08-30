import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function SortScreen({ route }) {
  const db = route.params.db;
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
