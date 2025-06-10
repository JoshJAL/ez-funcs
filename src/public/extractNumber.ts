/**
 * Extracts a numeric value from a string or number input by removing non-numeric characters
 * except for decimal points and commas.
 * 
 * @param {number|string} input - The input value to extract a number from
 * @returns {number|null} The extracted number as a float, or null if no valid number could be extracted
 * 
 * @example
 * // Returns 123.45
 * extractNumber("$123.45");
 * 
 * @example
 * // Returns 1234.56
 * extractNumber("1,234.56");
 * 
 * @example
 * // Returns 42
 * extractNumber(42);
 * 
 * @example
 * // Returns null
 * extractNumber("no numbers here");
 */
export function extractNumber(input: number | string) {
  input = input.toString();

  // Remove all characters except digits, commas, and decimal points
  const cleaned = input.replace(/[^0-9.,]/g, '');
  // Remove commas
  const normalized = cleaned.replace(/,/g, '');
  // Parse as float
  const number = parseFloat(normalized);
  return isNaN(number) ? null : number;
}
