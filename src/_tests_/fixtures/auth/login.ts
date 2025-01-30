import { LoginSuccessResponse } from 'features/auth/models'

import { fakeAccessToken, fakeRefreshToken } from './token'

export const loginSuccessResponse: LoginSuccessResponse = {
  access: fakeAccessToken,
  refresh: fakeRefreshToken,
}
