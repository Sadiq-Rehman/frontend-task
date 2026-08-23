// src/hooks/useLocalStorage.js
import { useState, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a stable wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((prevStoredValue) => {
          // Allow value to be a function so we have the same API as useState
          const valueToStore = value instanceof Function ? value(prevStoredValue) : value;
          
          // Save to local storage
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          
          return valueToStore;
        });
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}