const isActiveLink = (path = '', include = [], exclude = []) => {
  let result = false

  include.forEach(item => {
    if (path.indexOf(item) === 0) {
      result = true
    }
  })

  return result
}

export default isActiveLink
