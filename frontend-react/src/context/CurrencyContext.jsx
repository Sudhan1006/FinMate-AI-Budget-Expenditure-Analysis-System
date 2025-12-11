import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
    INR: { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
    USD: { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
    EUR: { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
    GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' }
};

export const CurrencyProvider = ({ children }) => {
    const [currencyCode, setCurrencyCode] = useState('INR');

    const currency = CURRENCIES[currencyCode];

    const formatAmount = (amount) => {
        return new Intl.NumberFormat(currency.locale, {
            style: 'currency',
            currency: currency.code,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    };

    const value = {
        currency,
        setCurrencyCode,
        availableCurrencies: Object.values(CURRENCIES),
        formatAmount
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};
