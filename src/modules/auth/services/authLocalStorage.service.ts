import { MaybeNull } from 'shared/types/utils'

import { AuthStorageKeysEnum } from '../constants'

const setAccessToken = (token: string) =>
  localStorage.setItem(AuthStorageKeysEnum.AccessToken, token)

const getAccessToken = (): MaybeNull<string> =>
  localStorage.getItem(AuthStorageKeysEnum.AccessToken)

const removeAccessToken = () => localStorage.removeItem(AuthStorageKeysEnum.AccessToken)

const setRefreshToken = (token: string) =>
  localStorage.setItem(AuthStorageKeysEnum.RefreshToken, token)

const getRefreshToken = (): MaybeNull<string> =>
  localStorage.getItem(AuthStorageKeysEnum.RefreshToken)

const removeRefreshToken = () => localStorage.removeItem(AuthStorageKeysEnum.RefreshToken)

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
