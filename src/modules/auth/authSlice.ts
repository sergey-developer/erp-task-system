import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { StorageKeys } from 'shared/constants/storage'
import localStorageService from 'shared/services/localStorage'

import { IAuthSliceState } from './interfaces'
import { LoginApiResponse, UserRefreshCreateApiResponse } from './models'

function getInitialState(): IAuthSliceState {
  const accessToken = localStorageService.getItem(StorageKeys.accessToken)
  const refreshToken = localStorageService.getItem(StorageKeys.refreshToken)
  return {
    user: null,
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
    login: (state, { payload }: PayloadAction<LoginApiResponse>) => {
      localStorageService.setItem(StorageKeys.accessToken, payload.access)
      localStorageService.setItem(StorageKeys.refreshToken, payload.refresh)
      return getInitialState()
    },
    tokenReceived: (
      state,
      { payload }: PayloadAction<UserRefreshCreateApiResponse>,
    ) => {
      localStorageService.setItem(StorageKeys.accessToken, payload.access)
      return getInitialState()
    },
  },
})

export default slice.reducer
export const { logout, tokenReceived, login } = slice.actions
