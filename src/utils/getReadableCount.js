const T = 1000 * 1000 * 1000 * 1000
const G = 1000 * 1000 * 1000
const M = 1000 * 1000
const K = 1000

const getReadableCount = size => {
  let str
  if (size > T) {
    str = `${Math.round((size / TB) * 10) / 10}T`
  } else if (size > G) {
    str = `${Math.round((size / GB) * 10) / 10}G`
  } else if (size > M) {
    str = `${Math.round((size / MB) * 10) / 10}M`
  } else if (size > K) {
    str = `${Math.round((size / KB) * 10) / 10}K`
  } else {
    str = `${size}`
  }

  return str
}

export default getReadableCount
