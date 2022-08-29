import { StorageKeysEnum } from 'shared/constants/storage'
import { MaybeNull } from 'shared/interfaces/utils'

const setItem = (key: StorageKeysEnum, value: string): void => {
  localStorage.setItem(key, value)
}

const removeItem = (key: StorageKeysEnum): void => {
  localStorage.removeItem(key)
}

const getItem = (key: StorageKeysEnum): MaybeNull<string> => {
  return localStorage.getItem(key)
}

const localStorageService = {
  setItem,
  getItem,
  removeItem,
}

export default localStorageService
