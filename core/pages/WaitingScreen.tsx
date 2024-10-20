import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WaitingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bekleme süreniz devam ediyor...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
  },
});

export default WaitingScreen;
