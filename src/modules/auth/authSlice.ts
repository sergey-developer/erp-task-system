import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { StorageKeys } from 'shared/constants/storage'
import localStorageService from 'shared/services/localStorage'

import { IAuthSliceState } from './interfaces'
import { LoginResponseModel, RefreshTokenResponseModel } from './models'
import { parseJwt } from './utils'

function getInitialState(): IAuthSliceState {
  const accessToken = localStorageService.getItem(StorageKeys.accessToken)
  const refreshToken = localStorageService.getItem(StorageKeys.refreshToken)
  let userInfo = null
  if (accessToken) {
    userInfo = parseJwt(accessToken)
  }
  return {
    user: userInfo,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken && !!refreshToken,
  }
}

const slice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout: () => {
      localStorageService.removeItem(StorageKeys.accessToken)
      localStorageService.removeItem(StorageKeys.refreshToken)
      return getInitialState()
    },
    login: (state, { payload }: PayloadAction<LoginResponseModel>) => {
      localStorageService.setItem(StorageKeys.accessToken, payload.access)
      localStorageService.setItem(StorageKeys.refreshToken, payload.refresh)
      return getInitialState()
    },
    refreshToken: (
      state,
      { payload }: PayloadAction<RefreshTokenResponseModel>,
    ) => {
      localStorageService.setItem(StorageKeys.accessToken, payload.access)
      return getInitialState()
    },
  },
})

export default slice.reducer
export const { logout, refreshToken, login } = slice.actions
