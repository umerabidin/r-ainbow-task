export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    image: string;
    category: string;
    quantity: number,
    rating: number;
    isBirthdayProduct?: boolean,
    tags: string[]; // Array of tag IDs

}