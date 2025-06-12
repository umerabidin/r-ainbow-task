import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { validateEmail } from '../../utils/validation';
import TextInputComponent from '../common/TextInput';
import { Button } from '../common';
import { useAuth } from '../../context/AuthContext';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    birthDate: '',
  });
  const { register, state } = useAuth();

  const handleSignup = async () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      birthDate: '',
    };

    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!birthDate) {
      newErrors.birthDate = 'Birth date is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      await register(name, email, password, birthDate);
    }
  };

  return (
    <View style={styles.form}>
      <TextInputComponent
        label="Full Name"
        value={name}
        onChangeText={setName}
        error={errors.name}
      />
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
      <TextInputComponent
        label="Birth Date (MM/DD/YYYY)"
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="MM/DD/YYYY"
        error={errors.birthDate}
      />
      <Button
        title="Sign Up"
        onPress={handleSignup}
        loading={state.isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
});

export default SignupForm;