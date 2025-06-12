import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../../types/themes';
import TextInputComponent from '../common/TextInput';
import AppText from '../common/AppText';
import Button from '../common/Button';
import { validateEmail } from '../../utils/validation';
import { useAuth } from '../../context/AuthContext';
import { LoginScreenProps } from '../../types/rootStackParams';
import { RFValue } from 'react-native-responsive-fontsize';


const LoginForm = ({ navigation, route }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { login, state } = useAuth();

  const handleLogin = async () => {
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (newErrors.email.length > 0 || newErrors.password.length > 0) {
      setErrors(newErrors);
    } else {
      await login(email, password);
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
    }


  };

  return (

    <View >
      <TextInputComponent
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />
      <TextInputComponent
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        error={errors.password}
      />

      {state.error && <Text style={styles.error}>{state.error}</Text>}

      {/* <TouchableOpacity activeOpacity={0.8} style={styles.forgotPassword}>
        <AppText style={styles.forgotPasswordText}>Forgot Password?</AppText>
      </TouchableOpacity> */}
      <Button
        title="Login"
        onPress={handleLogin}
        style={{marginTop:RFValue(10)}}
        loading={state.isLoading}
        disabled={state.isLoading}
      />
      {/* <Button
        style={{ marginTop: RFValue(12) }}
        textStyle={{ color: theme.colors.background }}
        title="Sign Up"
        onPress={() => navigation.navigate('Signup')}

      /> */}
    </View>
  );
};

const styles = StyleSheet.create({

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: RFValue(17),
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: RFValue(12),
  }, error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: RFValue(8),
  },
});

export default LoginForm;