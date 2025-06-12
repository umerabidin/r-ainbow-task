import { Product } from "./products";
import { User } from "./auth";
import { UserPreferences } from "./userPreferences";


export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

export interface ProductsState {
    featuredProducts: Product[];
    birthdayProducts: Product[];
    tags: UserPreferences[];
    isLoading: boolean;
    error: string | null;
}