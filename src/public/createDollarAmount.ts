// Define a mapping from currency codes to their preferred locales
// Using 'as const' ensures the keys are specific strings and values are readonly,
// which helps in creating a precise 'SupportedCurrency' type.
const CURRENCY_LOCALE_MAP = {
  AUD: 'en-AU',
  BRL: 'pt-BR',
  CAD: 'en-CA',
  CHF: 'de-CH', // German (Switzerland)
  CNY: 'zh-CN',
  EUR: 'de-DE', // German (Germany) - common for Euro, though others exist (e.g., en-IE, fr-FR)
  GBP: 'en-GB',
  INR: 'en-IN',
  JPY: 'ja-JP',
  USD: 'en-US'
} as const;

// Automatically derive the supported currency type from the map's keys
export type SupportedCurrency = keyof typeof CURRENCY_LOCALE_MAP;

/**
 * Formats a numeric value as a localized currency string based on the specified currency.
 * 
 * @param {number|string} amountInput - The monetary amount to format. Can be a number or string that can be converted to a number.
 * @param {SupportedCurrency} [currency='USD'] - The ISO currency code to use for formatting (e.g., 'USD', 'EUR', 'GBP').
 *                                              Defaults to 'USD' if not specified.
 * @returns {string} The formatted currency string using appropriate locale and currency symbol.
 * 
 * @throws {TypeError} Throws an error if amountInput cannot be converted to a valid number.
 * 
 * @example
 * // Returns "$123.45" (for en-US locale)
 * createDollarAmount(123.45);
 * 
 * @example
 * // Returns "£123.45" (for en-GB locale)
 * createDollarAmount(123.45, 'GBP');
 * 
 * @example
 * // Returns "123,45 €" (for de-DE locale)
 * createDollarAmount(123.45, 'EUR');
 * 
 * @example
 * // Returns "$0.00" (for en-US locale)
 * createDollarAmount('');
 */
export function createDollarAmount(amountInput: number | string, currency: SupportedCurrency = 'USD'): string {
  if (amountInput === null || amountInput === undefined || amountInput === '') {
    const defaultAmount = 0; // Default amount if input is null, undefined, or empty string
    return defaultAmount.toLocaleString(CURRENCY_LOCALE_MAP[currency], {
      style: 'currency',
      currency: currency
    });
  }
  const numericAmount = Number(amountInput);

  // 1. Handle invalid numeric input
  if (isNaN(numericAmount)) {
    // You can decide how to handle this:
    // - Throw an error (often preferred for library functions)
    // - Return a specific string like "Invalid Amount" or an empty string
    // - Return a default formatted value like $0.00
    // For this example, let's throw an error.
    throw new TypeError("Invalid 'amountInput': failed to convert to a number.");
  }

  // 2. Get the locale from the map
  // This replaces the large switch statement.
  const locale = CURRENCY_LOCALE_MAP[currency];

  // 3. Use a try-catch block for the toLocaleString call
  // This can catch errors if the locale or options are somehow invalid,
  // though with the current setup, it's less likely for supported currencies.
  try {
    return numericAmount.toLocaleString(locale, {
      style: 'currency',
      currency: currency // The 'currency' option takes the ISO currency code
    });
  } catch (error) {
    console.error(`Error formatting currency ${currency} for locale ${locale}:`, error);
    // Fallback behavior: re-throw, or return a specific error string,
    // or even a basic formatting if possible.
    // For now, let's return an error message string.
    return `Error formatting ${currency}`; // Or throw the error
  }
}
