const EXCHANGE_RATE = 83; // 1 USD = 83 INR

export const formatPriceINR = (priceUSD) => {
    if (typeof priceUSD !== 'number') return '₹0.00';
    const priceINR = priceUSD * EXCHANGE_RATE;
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(priceINR);
};
