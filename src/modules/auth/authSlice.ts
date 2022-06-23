import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { StorageKeys } from 'shared/constants/storage'
import localStorageService from 'shared/services/localStorage'

import {
  IAuthSliceState,
  LoginActionPayload,
  RefreshTokenActionPayload,
} from './interfaces'
import parseJwt from './utils/parseJwt'

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
    login: (state, { payload }: PayloadAction<LoginActionPayload>) => {
      state.user = payload.user
      state.accessToken = payload.access
      state.refreshToken = payload.refresh
      state.isAuthenticated = !!payload.access && !!payload.refresh
    },
    refreshToken: (
      state,
      { payload }: PayloadAction<RefreshTokenActionPayload>,
    ) => {
      state.user = payload.user
      state.accessToken = payload.access
      state.isAuthenticated = !!payload.access && !!state.refreshToken
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
    },
  },
})

export const { login, logout, refreshToken } = slice.actions

export default slice.reducer
