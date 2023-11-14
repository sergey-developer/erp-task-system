import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authLocalStorageService } from './services/authLocalStorage.service'
import { AuthSliceState, LoginActionPayload, RefreshTokenActionPayload } from './types'
import { parseJwt } from './utils'

export const getInitialState = (): AuthSliceState => {
  const accessToken = authLocalStorageService.getAccessToken()
  const refreshToken = authLocalStorageService.getRefreshToken()

  return {
    user: accessToken ? parseJwt(accessToken) : null,
    accessToken,
    refreshToken,
    isLoggedIn: !!accessToken && !!refreshToken,
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
      state.isLoggedIn = !!payload.access && !!payload.refresh
    },
    refreshToken: (state, { payload }: PayloadAction<RefreshTokenActionPayload>) => {
      state.user = payload.user
      state.accessToken = payload.access
      state.refreshToken = payload.refresh
      state.isLoggedIn = !!payload.access && !!payload.refresh
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isLoggedIn = false
    },
  },
})

export const { login, logout, refreshToken } = slice.actions

export default slice.reducer
