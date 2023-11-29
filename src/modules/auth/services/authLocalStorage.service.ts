import { StorageKeysEnum } from 'shared/constants/storage'
import { localStorageService } from 'shared/services/localStorage.service'

const setAccessToken = (token: string) => {
  return localStorageService.setItem(StorageKeysEnum.AccessToken, token)
}

const getAccessToken = () => {
  return localStorageService.getItem(StorageKeysEnum.AccessToken)
}

const removeAccessToken = () => {
  return localStorageService.removeItem(StorageKeysEnum.AccessToken)
}

const setRefreshToken = (token: string) => {
  return localStorageService.setItem(StorageKeysEnum.RefreshToken, token)
}

const getRefreshToken = () => {
  return localStorageService.getItem(StorageKeysEnum.RefreshToken)
}

const removeRefreshToken = () => {
  return localStorageService.removeItem(StorageKeysEnum.RefreshToken)
}

const clearTokens = () => {
  removeAccessToken()
  removeRefreshToken()
}

export const authLocalStorageService = {
  setAccessToken,
  getAccessToken,
  removeAccessToken,

  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,

  clearTokens,
}
