import { createSlice } from '@reduxjs/toolkit'

import { api } from 'modules/auth/services'
import { getItem, removeItem, setItem } from 'shared/services/localStorage'
import { RootState } from 'state/store'

import { StorageKeys } from '../../shared/constants/storage'
import { IAuthSliceState } from './interfaces'

function getInitialState(): IAuthSliceState {
  const access = getItem(StorageKeys.access)
  const refresh = getItem(StorageKeys.refresh)
  return {
    user: null /** todo может тоже хранить в localStorage */,
    access,
    refresh,
    isAuthenticated: !!access && !!refresh,
  }
}

const slice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    logout: () => {
      /** может надо дергать метод апи */
      removeItem(StorageKeys.access)
      removeItem(StorageKeys.refresh)
      return getInitialState()
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.access = payload.access
        state.refresh = payload.refresh
        setItem(StorageKeys.access, payload.access)
        setItem(StorageKeys.refresh, payload.refresh)
      },
    )
  },
})

export default slice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
