import React, { createContext, useContext, useState, ReactNode, use, useEffect } from 'react';
import { LoginDto, loginUser, RegisterDto } from '../services/auth';
import { registerUser } from '../services/auth';
import { AuthState } from '../types/states';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCatchBlockError } from './CatchErrorHandling';
import { User } from '../types/auth';
import { getDiscountCode } from '../services/orders';
interface AuthContextType {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, birthday: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        const checkUserSession = async () => {
            const userString = await AsyncStorage.getItem('logged_user');
            if (userString) {
                const user = JSON.parse(userString) as User
                setState({ user, isLoading: false, error: null });
            }
        }
        checkUserSession()


    }, [])

    const login = async (email: string, password: string) => {
        setState({ ...state, isLoading: true, error: null });
        try {
            const userCredentials: LoginDto = {
                email: email, // Example email
                password: password,  // Example password
            };
            const { message, accessToken, user } = await loginUser(userCredentials);
            await AsyncStorage.setItem('token', accessToken);
            const { discount } = await getDiscountCode()
            const updatedUser = { ...user, discount: discount ? discount : null }
            await AsyncStorage.setItem('logged_user', JSON.stringify(updatedUser));
            setState({ user: updatedUser, isLoading: false, error: null });


        } catch (error) {
            // Handle AxiosError specifically            
            setState({ user: null, isLoading: false, error: getCatchBlockError(error) });

        }
    };

    const register = async (name: string, email: string, password: string, birthday: string) => {
        setState({ ...state, isLoading: true, error: null });
        try {
            const userCredentials: RegisterDto = {
                name: name,
                email: email,
                password: password,
                birthDate: birthday
            }

            const { user, accessToken } = await registerUser(userCredentials);
            await AsyncStorage.setItem('token', accessToken);
            const { discount } = await getDiscountCode()
            const updatedUser = { ...user, discount: discount ? discount : null }
            await AsyncStorage.setItem('logged_user', JSON.stringify(updatedUser));

            setState({ user: updatedUser, isLoading: false, error: null });
        } catch (error) {
            setState({ user: null, isLoading: false, error: getCatchBlockError(error) });
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('logged_user');
        setState({ user: null, isLoading: false, error: null });
    };

    return (
        <AuthContext.Provider value={{ state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};