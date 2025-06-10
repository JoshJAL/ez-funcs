/**
 * Capitalizes the first letter of each word in a string.
 * 
 * @param {string|null} str - The input string to process
 * @returns {string} A new string with the first letter of each word capitalized,
 *                  or an empty string if the input is null or empty
 * 
 * @example
 * // Returns "Hello World"
 * capitalizeFirstLetters("hello world");
 * 
 * @example
 * // Returns "John Doe"
 * capitalizeFirstLetters("john doe");
 * 
 * @example
 * // Returns ""
 * capitalizeFirstLetters(null);
 * 
 * @example
 * // Returns ""
 * capitalizeFirstLetters("");
 */
export function capitalizeFirstLetters(str: string | null) {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
