/**
 * Truncates a string to a specified maximum length and adds an ellipsis if truncated.
 * 
 * @param {string} text - The text to truncate
 * @param {number} length - The maximum length of the returned string (not including the ellipsis)
 * @returns {string} The original text if it's shorter than or equal to the specified length,
 *                   or the truncated text with an ellipsis appended
 */
export function truncateText(text: string, length: number) {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
}
