import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ENV } from '../config/env';
import Constants from 'expo-constants';

const EnvironmentInfo = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Environment Information</Text>
    <Text>Environment: {ENV.environment}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  }
});

export default EnvironmentInfo;