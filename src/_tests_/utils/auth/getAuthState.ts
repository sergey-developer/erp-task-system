import { AuthSliceState, AuthenticatedUser } from 'modules/auth/types'

import authFixtures from '_tests_/fixtures/auth'

type GetAuthStateConfig = { user: AuthenticatedUser } & Partial<
  Pick<AuthSliceState, 'accessToken' | 'refreshToken' | 'isAuthenticated'>
>

const getAuthState = ({
  user,
  accessToken = authFixtures.fakeAccessToken,
  refreshToken = authFixtures.fakeRefreshToken,
}: GetAuthStateConfig): Required<GetAuthStateConfig> => ({
  user,
  isAuthenticated: !!accessToken && !!refreshToken,
  accessToken,
  refreshToken,
})

export default getAuthState
