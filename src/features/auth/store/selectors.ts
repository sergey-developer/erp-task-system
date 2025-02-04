import { RootState } from 'state/store'

export const isLoggedInSelector = (state: RootState): RootState['auth']['isLoggedIn'] =>
  state.auth.isLoggedIn

export const authUserSelector = (state: RootState): RootState['auth']['user'] => state.auth.user
