/**
 * @param {object} options
 * @param {string} options.text
 * @param {number} [options.height]
 * @param {number} [options.width]
 * @returns {string}
 */
export const fillerImage = options => {
  const { text, height = 480, width = 640 } = options

  return `https://via.placeholder.com/${width}x${height}.png/535353/eeeeee?text=${encodeURI(
    text
  )}`
}
