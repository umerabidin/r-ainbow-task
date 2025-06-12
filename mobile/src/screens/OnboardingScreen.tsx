import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { theme } from '../types/themes';
import { OnBoardingScreenProps } from '../types/rootStackParams';

const OnboardingScreen = ({ navigation }: OnBoardingScreenProps) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.colors.secondary }}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <View >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        paddingHorizontal: RFValue(20),
                        backgroundColor: theme.colors.primary,
                        width: '80%',
                        alignSelf: 'center',
                        borderRadius: RFValue(20),
                        paddingVertical: RFValue(10),
                    }}
                    activeOpacity={0.8}>
                    <Text
                        style={{
                            color: theme.colors.background,
                            textAlign: 'center',
                            fontSize: RFValue(14),
                        }}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={{
                        alignSelf: 'center',
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.primary,
                        borderWidth: RFValue(1),
                        marginTop: RFValue(20),
                        width: '80%',
                        borderRadius: RFValue(20),
                        paddingVertical: RFValue(10),
                    }}
                    activeOpacity={0.8}>
                    <Text
                        style={{
                            color: theme.colors.primary,
                            textAlign: 'center',
                            fontSize: RFValue(14),
                        }}>
                        Signup
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    logo: {
        width: RFValue(150),
        height: RFValue(150),
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: RFValue(80),
    },
});
