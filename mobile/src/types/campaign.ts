import { Product } from "../types/products";

export interface BirthdayCampaignData {
    suggestedProducts: Product[];
    discountCode: string;
    isBirthdayWeek: boolean;
    isValid: boolean;
}