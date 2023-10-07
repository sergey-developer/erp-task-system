import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  AuthSliceState,
  LoginActionPayload,
  RefreshTokenActionPayload,
} from './types'
import { authLocalStorageService } from './services/authLocalStorage.service'
import { parseJwt } from './utils'

export const getInitialState = (): AuthSliceState => {
  const accessToken = authLocalStorageService.getAccessToken()
  const refreshToken = authLocalStorageService.getRefreshToken()

  return {
    user: accessToken ? parseJwt(accessToken) : null,
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
      state.refreshToken = payload.refresh
      state.isAuthenticated = !!payload.access && !!payload.refresh
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
