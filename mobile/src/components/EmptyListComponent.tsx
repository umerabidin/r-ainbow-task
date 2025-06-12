import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { theme } from '../types/themes';
interface EmptyListComponentProps {
  onPress?: () => void;
  buttonText?: string;
  emptyListText: string;
}
const EmptyListComponent = ({
  emptyListText,
}: EmptyListComponentProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{emptyListText}</Text>
    </View>
  );
};

export default EmptyListComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1, // Without it will dispay at the very top
    justifyContent: 'center',
  },
  text: {
    fontSize: RFValue(16),
    color: theme.colors.text,
    fontWeight: '600',
    textAlign: 'center',
    padding: RFValue(10),
  },
});
