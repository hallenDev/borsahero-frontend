import debug from 'utils/debug'

const storage = typeof window !== 'undefined' ? window.localStorage : {}

export const getStorage = (key, defaultValue = null) => {
  try {
    const session = storage.getItem(key)
    return session ? JSON.parse(session) : defaultValue
  } catch (error) {
    return defaultValue
  }
}

export const setStorage = (key, value) => {
  try {
    return storage.setItem(key, JSON.stringify(value))
  } catch (error) {
    debug('setStorage', error)
  }
}

export const removeStorage = key => {
  try {
    return storage.removeItem(key)
  } catch (error) {
    debug('removeStorage', error)
  }
}

export const clearStorage = () => {
  try {
    return storage.clear()
  } catch (error) {
    debug('clearStorage', error)
  }
}

export const getWithExpiry = key => {
  const item = getStorage(key)
  if (!item) {
    return null
  }

  const now = new Date()

  if (now.getTime() > item.expiry) {
    removeStorage(key)
    return null
  }

  return item.value
}

export const setWithExpiry = (key, value, ttl) => {
  const now = new Date()

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }

  return setStorage(key, item)
}
