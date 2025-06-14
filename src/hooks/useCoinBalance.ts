
import { useState, useEffect } from 'react';

// Shared coin balance state
let coinBalance = 120; // Initial balance
let balanceListeners: Array<(balance: number) => void> = [];

export const useCoinBalance = () => {
  const [balance, setBalance] = useState(coinBalance);

  useEffect(() => {
    // Add this component's setter to the listeners
    balanceListeners.push(setBalance);

    // Cleanup: remove listener when component unmounts
    return () => {
      balanceListeners = balanceListeners.filter(listener => listener !== setBalance);
    };
  }, []);

  const updateBalance = (newBalance: number) => {
    coinBalance = newBalance;
    // Notify all components using this hook
    balanceListeners.forEach(listener => listener(newBalance));
  };

  const addCoins = (amount: number) => {
    updateBalance(coinBalance + amount);
  };

  return {
    balance,
    updateBalance,
    addCoins
  };
};
