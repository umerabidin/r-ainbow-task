import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "./products";

export type AuthParamsList = {
    Login: undefined,
    Signup: undefined,
    Onboarding: undefined,
    Dashboard: undefined
};

export type BottomAppParamsList = {
    HomeNavigator: undefined
    Profile: undefined
};

export type AppParamsList = {
    Home: undefined
    Profile: undefined
    ProductDetails: { product: Product }
    AddToCart: { products: Product[] | undefined }
    Auth: undefined
};
export type HomeScreenProps = NativeStackScreenProps<
    AppParamsList, 'Home'
>;

export type ProductDetailsScreenProps = NativeStackScreenProps<
    AppParamsList, 'ProductDetails'
>;

export type AddToCartScreenProps = NativeStackScreenProps<
    AppParamsList, 'AddToCart'
>;

export type LoginScreenProps = NativeStackScreenProps<
    AuthParamsList, 'Login'
>;

export type SignUpScreenProps = NativeStackScreenProps<
    AuthParamsList, 'Signup'
>;
export type OnBoardingScreenProps = NativeStackScreenProps<
    AuthParamsList, 'Onboarding'
>;

