/** хелперы по работе с localStorage */

import { StorageKeys } from 'shared/constants/storage'

export const setItem = (key: StorageKeys, value: string) => {
  localStorage.setItem(key, value)
}

export const removeItem = (key: StorageKeys): void => {
  localStorage.removeItem(key)
}

export const getItem = (key: StorageKeys): string | null => {
  return localStorage.getItem(key)
}
