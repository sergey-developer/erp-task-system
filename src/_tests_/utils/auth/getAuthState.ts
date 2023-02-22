import { AuthSliceState, AuthenticatedUser } from 'modules/auth/interfaces'

import {
  CORRECT_ACCESS_TOKEN,
  CORRECT_REFRESH_TOKEN,
} from '_tests_/constants/auth'

type GetAuthStateConfig = { user: AuthenticatedUser } & Partial<
  Pick<AuthSliceState, 'accessToken' | 'refreshToken'>
>

const getAuthState = ({
  user,
  accessToken = CORRECT_ACCESS_TOKEN,
  refreshToken = CORRECT_REFRESH_TOKEN,
}: GetAuthStateConfig) => ({
  user,
  isAuthenticated: !!accessToken && !!refreshToken,
  accessToken,
  refreshToken,
})

export default getAuthState
