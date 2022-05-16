import { createSlice } from '@reduxjs/toolkit'

import { authService } from 'modules/auth/auth.service'
import { StorageKeys } from 'shared/constants/storage'
import localStorageService from 'shared/services/localStorage'

import { IAuthSliceState } from './interfaces'

function getInitialState(): IAuthSliceState {
  const accessToken = localStorageService.getItem(StorageKeys.accessToken)
  const refreshToken = localStorageService.getItem(StorageKeys.refreshToken)
  return {
    user: null /** todo может тоже хранить в localStorage */,
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
      /** может надо дергать метод апи */
      localStorageService.removeItem(StorageKeys.accessToken)
      localStorageService.removeItem(StorageKeys.refreshToken)
      return getInitialState()
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authService.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorageService.setItem(StorageKeys.accessToken, payload.access)
        localStorageService.setItem(StorageKeys.refreshToken, payload.refresh)
        return getInitialState()
      },
    )
  },
})

export default slice.reducer
