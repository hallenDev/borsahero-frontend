import { getStorage, setStorage, removeStorage } from 'utils/storage'

export const StorageType = {
  USER: 'user',
  ACCESSTOKEN: 'accessToken',
  DEVICES: 'devices',
}

export const setUserStore = value => setStorage(StorageType.USER, value)
export const getUserStore = defaultValue => getStorage(StorageType.USER, defaultValue)
export const removeUserStore = () => removeStorage(StorageType.USER)
export const setAuthToken = value => setStorage(StorageType.ACCESSTOKEN, value);
export const getAuthToken = defaultValue => getStorage(StorageType.ACCESSTOKEN, defaultValue)
export const removeAuthToken = () => removeStorage(StorageType.ACCESSTOKEN)
export const setDeviceStore = value => setStorage(StorageType.DEVICES, value)
export const getDeviceStore = defaultValue => getStorage(StorageType.DEVICES, defaultValue)
export const removeDeviceStore = () => removceStorage(StorageType.DEVICES)