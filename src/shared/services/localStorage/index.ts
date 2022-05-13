import { StorageKeys } from 'shared/constants/storage'
import { MaybeNull } from 'shared/interfaces/utils'

const setItem = (key: StorageKeys, value: string): void => {
  localStorage.setItem(key, value)
}

const removeItem = (key: StorageKeys): void => {
  localStorage.removeItem(key)
}

const getItem = (key: StorageKeys): MaybeNull<string> => {
  return localStorage.getItem(key)
}

const localStorageService = {
  setItem,
  getItem,
  removeItem,
}

export default localStorageService
