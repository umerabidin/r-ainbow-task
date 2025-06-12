interface Product {
  name: string;
  image: string;
}

interface User {
  name: string;
  email: string;
  dateOfBirth: string | Date;
}

interface DiscountEmailData {
  user: User;
  discountCode: string;
  suggestedProducts: Product[];
}
