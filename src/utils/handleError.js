/**
 *
 * @param {*} setError
 * @returns
 */
const handleError =
  (setError = () => {}) =>
  (errors = {}, defaultField) => {
    if (Array.isArray(errors) && defaultField) {
      if (!defaultField) {
        return
      }

      errors.forEach(error => {
        setError(defaultField, {
          type: 'manual',
          message: error,
        })
      })
    } else {
      Object.keys(errors).forEach(key => {
        setError(key, {
          type: 'manual',
          message: errors[key],
        })
      })
    }
  }

export default handleError
