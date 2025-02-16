import { AuthenticatedUser, AuthSliceState } from 'features/auth/store/types'

import authFixtures from '_tests_/fixtures/auth'

type GetAuthStateConfig = { user: AuthenticatedUser } & Partial<
  Pick<AuthSliceState, 'accessToken' | 'refreshToken' | 'isLoggedIn'>
>

export const getAuthState = ({
  user,
  accessToken = authFixtures.fakeAccessToken,
  refreshToken = authFixtures.fakeRefreshToken,
}: GetAuthStateConfig): Required<GetAuthStateConfig> => ({
  user,
  isLoggedIn: !!accessToken && !!refreshToken,
  accessToken,
  refreshToken,
})
