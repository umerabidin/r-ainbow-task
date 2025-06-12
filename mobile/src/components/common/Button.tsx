import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import AppText from './AppText';
import { theme } from '../../types/themes';
import { RFValue } from 'react-native-responsive-fontsize';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity

      style={[
        styles.button,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.primary} />
      ) : (
        <AppText style={[styles.buttonText, textStyle]}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(6),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: RFValue(100),
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(13),
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: theme.colors.gray,
    opacity: 0.6,
  },
});

export default Button;