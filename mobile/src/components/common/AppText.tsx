import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { theme } from '../../types/themes';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  style?: object;
}

const AppText: React.FC<AppTextProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.text,
    fontSize: 16,
  },
});

export default AppText;