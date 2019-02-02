/** @type {Intl.DateTimeFormatOptions} */
const defaultFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}

/**
 * @param {string | Date} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export const dateFormat = (date, options = {}) => {
  const formatOptions = { ...defaultFormatOptions, ...options }

  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('en-US', formatOptions)
  } else {
    return date.toLocaleDateString('en-US', formatOptions)
  }
}

export default dateFormat
