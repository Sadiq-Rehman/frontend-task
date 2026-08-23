// src/utils/validators.js

export const validators = {
  // Required check
  required: (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    return true;
  },

  // Email format check
  email: (value) => {
    if (!value) return true; // Let 'required' handle empty checks if optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  // Min length check
  minLength: (value, min) => {
    if (!value) return true;
    return String(value).length >= min;
  },

  // Max length check
  maxLength: (value, max) => {
    if (!value) return true;
    return String(value).length <= max;
  },

  // Numeric check (numbers only or valid number range)
  numeric: (value, { min, max } = {}) => {
    if (value === '' || value === null || value === undefined) return true;
    const num = Number(value);
    if (isNaN(num)) return false;
    if (min !== undefined && num < min) return false;
    if (max !== undefined && num > max) return false;
    return true;
  },

  // Select field check (ensures selected value exists in allowed options)
  select: (value, allowedOptions) => {
    if (!value) return false;
    return allowedOptions.includes(value);
  }
};