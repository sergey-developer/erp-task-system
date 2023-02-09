import { StorageKeysEnum } from 'shared/constants/storage'
import { localStorageService } from 'shared/services/localStorage.service'

const setAccessToken = (token: string) => {
  return localStorageService.setItem(StorageKeysEnum.accessToken, token)
}

const getAccessToken = () => {
  return localStorageService.getItem(StorageKeysEnum.accessToken)
}

const removeAccessToken = () => {
  return localStorageService.removeItem(StorageKeysEnum.accessToken)
}

const setRefreshToken = (token: string) => {
  return localStorageService.setItem(StorageKeysEnum.refreshToken, token)
}

const getRefreshToken = () => {
  return localStorageService.getItem(StorageKeysEnum.refreshToken)
}

const removeRefreshToken = () => {
  return localStorageService.removeItem(StorageKeysEnum.refreshToken)
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
