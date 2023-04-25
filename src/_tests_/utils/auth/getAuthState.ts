import { AuthSliceState, AuthenticatedUser } from 'modules/auth/interfaces'

import authFixtures from 'fixtures/auth'

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
