/**
 * Formats a phone number string into a standard US format: (XXX) XXX-XXXX
 * 
 * @param {string} phoneNumber - The phone number to format. Can be in various formats including
 *                              with or without country code, and with various separators.
 * @returns {string|null} The formatted phone number as (XXX) XXX-XXXX if valid,
 *                       or null if the input cannot be formatted as a valid US phone number.
 * 
 * @example
 * // Returns "(555) 123-4567"
 * formatPhone("5551234567");
 * 
 * @example
 * // Returns "(555) 123-4567"
 * formatPhone("15551234567");
 * 
 * @example
 * // Returns "(555) 123-4567"
 * formatPhone("(555) 123-4567");
 * 
 * @example
 * // Returns null
 * formatPhone("123456");
 */
export function formatPhone(phoneNumber: string) {
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // Check for 10-digit number
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  // If no match, check for 11-digit number starting with 1
  if (!match && cleaned.length === 11 && cleaned.charAt(0) === '1') {
    match = cleaned.match(/^1(\d{3})(\d{3})(\d{4})$/);
  }

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return null;
}
