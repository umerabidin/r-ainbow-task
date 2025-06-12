// Format price as currency


export const formattedPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price / 100); // Assuming price is in cents
};


