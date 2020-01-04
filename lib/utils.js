/**
 * @param {string | Date} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string}
 */
export function dateFormat (date, options = {}) {
  /** @type {Intl.DateTimeFormatOptions} */
  const formatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  }

  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString('en-US', formatOptions)
  } else {
    return date.toLocaleDateString('en-US', formatOptions)
  }
}
