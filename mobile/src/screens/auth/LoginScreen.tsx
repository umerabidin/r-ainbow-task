import React from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AppText } from '../../components/common';
import LoginForm from '../../components/Auth/LoginForm';
import { theme } from '../../types/themes';
import { LoginScreenProps } from '../../types/rootStackParams';
import { RFValue } from 'react-native-responsive-fontsize';

const LoginScreen = ({ navigation, route }: LoginScreenProps) => {

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
        <AppText style={styles.title}>Welcome Back</AppText>
        <LoginForm navigation={navigation}
          route={route} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RFValue(30),
    backgroundColor: theme.colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',

  },
  logo: {
    width: RFValue(125),
    height: RFValue(125),
    alignSelf: 'center',
    marginBottom: RFValue(25),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.primary,
  },
});

export default LoginScreen;