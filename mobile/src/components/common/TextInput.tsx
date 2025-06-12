import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import AppText from './AppText';
import { theme } from '../../types/themes';
import { RFValue } from 'react-native-responsive-fontsize';

interface TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  style?: object;
}

const TextInputComponent: React.FC<TextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <TextInput
        style={[styles.input, error ? styles.errorInput : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && <AppText style={styles.errorText}>{error}</AppText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: RFValue(7),
    fontSize: RFValue(12),
    color: theme.colors.text,
  },
  input: {
    height: RFValue(40),
    borderWidth: RFValue(1),
    borderColor: theme.colors.gray,
    borderRadius: RFValue(7),
    paddingHorizontal: RFValue(13),
    fontSize: RFValue(13),
    color: theme.colors.text,
    backgroundColor: 'white',
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginTop: RFValue(3),
    fontSize: RFValue(11),
    color: theme.colors.error,
  },
});

export default TextInputComponent;