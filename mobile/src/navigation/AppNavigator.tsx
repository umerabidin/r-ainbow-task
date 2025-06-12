import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import { BottomAppParamsList } from '../types/rootStackParams';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../types/themes';

const TabStack = createBottomTabNavigator<BottomAppParamsList>();
const AppNavigator = () => {

  return (

    <TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeNavigator') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName!} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <TabStack.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerShown:false, tabBarLabel: 'Home' }}
      />
      <TabStack.Screen name="Profile" component={ProfileScreen}
      options={{ headerShown:false}}
      />
    </TabStack.Navigator>

  );
};

export default AppNavigator;