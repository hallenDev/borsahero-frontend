const TB = 1024 * 1024 * 1024 * 1024
const GB = 1024 * 1024 * 1024
const MB = 1024 * 1024
const KB = 1024

const getReadableFileSize = size => {
  let str
  if (size > TB) {
    str = `${Math.round((size / TB) * 10) / 10}TB`
  } else if (size > GB) {
    str = `${Math.round((size / GB) * 10) / 10}GB`
  } else if (size > MB) {
    str = `${Math.round((size / MB) * 10) / 10}MB`
  } else if (size > KB) {
    str = `${Math.round((size / KB) * 10) / 10}KB`
  } else {
    str = `${size}B`
  }

  return str
}

export default getReadableFileSize
