import { StorageKeys } from 'shared/constants/storage'
import localStorageService from 'shared/services/localStorage'

const setAccessToken = (token: string) => {
  return localStorageService.setItem(StorageKeys.accessToken, token)
}

const getAccessToken = () => {
  return localStorageService.getItem(StorageKeys.accessToken)
}

const removeAccessToken = () => {
  return localStorageService.removeItem(StorageKeys.accessToken)
}

const setRefreshToken = (token: string) => {
  return localStorageService.setItem(StorageKeys.refreshToken, token)
}

const getRefreshToken = () => {
  return localStorageService.getItem(StorageKeys.refreshToken)
}

const removeRefreshToken = () => {
  return localStorageService.removeItem(StorageKeys.refreshToken)
}

const authLocalStorageService = {
  setAccessToken,
  getAccessToken,
  removeAccessToken,

  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
}

export default authLocalStorageService
