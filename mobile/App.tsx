/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ProductsProvider } from './src/context/ProductsContext';
import { LoadingIndicator } from './src/components/common';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { CartProvider } from './src/context/CartContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const AppContent: React.FC = () => {
    const { state } = useAuth();

    if (state.isLoading) {
      return (
        <View style={styles.container}>
          <LoadingIndicator />
        </View>
      );
    }

    return (
      <NavigationContainer>
        {state.user ? 
        
        <CartProvider>
           <ProductsProvider>
            <AppNavigator />
            </ProductsProvider>
            </CartProvider>

          : <AuthNavigator />}
      </NavigationContainer>
    );
  };

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
