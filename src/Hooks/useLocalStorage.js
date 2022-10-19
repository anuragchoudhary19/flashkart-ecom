import { useCallback } from 'react';

export const useLocalStorage = () => {
  const addToLocalStorage = useCallback((key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, []);
  return [addToLocalStorage];
};
