/**
 * @typedef {Object} CustomComponentOptions
 * @property {string} [prefix]
 */

/**
 * @param {string} text
 * @returns {string}
 */
const kebabize = (text) => text.split('').map((letter, idx) => (
  letter.toUpperCase() === letter
    ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
    : letter
)).join('');

/**
 * @param {string} moduleName
 * @param {CustomComponentOptions} options
 */
export const defineCustomComponents = async (moduleName, options = {}) => {
  const prefix = options.prefix !== undefined ? `${options.prefix}-` : '';
  const elements = await import(moduleName);
  Object.entries(elements).forEach(([name, value]) => {
    window.customElements.define(`${prefix}${kebabize(name)}`, value)
  })
}
