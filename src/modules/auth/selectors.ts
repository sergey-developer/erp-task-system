import { RootState } from 'state/store'

export const isAuthenticatedSelector = (
  state: RootState,
): RootState['auth']['isAuthenticated'] => state.auth.isAuthenticated

export const authenticatedUserSelector = (
  state: RootState,
): RootState['auth']['user'] => state.auth.user
