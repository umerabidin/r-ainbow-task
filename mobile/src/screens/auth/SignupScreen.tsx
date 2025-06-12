import React from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AppText } from '../../components/common';
import { theme } from '../../types/themes';
import SignupForm from '../../components/Auth/SignupForm';
import { RFValue } from 'react-native-responsive-fontsize';

const SignupScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

      <View style={styles.inner}>
        <Image
          source={require('../../assets/logo.png')}
          style={[styles.logo, { tintColor: theme.colors.primary }]} // Adjust tintColor as needed
          resizeMode="contain"
        />
        <AppText style={styles.title}>Create Account</AppText>
        <SignupForm />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inner: {
    flex: 1,

  },

  container: {
    flex: 1,
    padding: RFValue(20),
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: RFValue(150),
    height: RFValue(150),
    alignSelf: 'center',
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginBottom: RFValue(20),
    textAlign: 'center',
    color: theme.colors.primary,
  },
});

export default SignupScreen;