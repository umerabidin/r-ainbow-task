import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import { AuthParamsList } from '../types/rootStackParams';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator<AuthParamsList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name="Dashboard"
                component={AppNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;