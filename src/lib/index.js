// place files you want to import through the `$lib` alias in this folder.

/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
