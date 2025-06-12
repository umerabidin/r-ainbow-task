import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loaderBox}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loaderText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Light overlay color
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  loaderBox: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 3}, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 6, // For iOS shadow
  },
  loaderText: {
    marginTop: 12,
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
});
export default LoadingIndicator;
