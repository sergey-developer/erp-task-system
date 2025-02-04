import { LoginSuccessResponse } from 'features/auth/api/schemas'

import { fakeAccessToken, fakeRefreshToken } from './token'

export const loginSuccessResponse: LoginSuccessResponse = {
  access: fakeAccessToken,
  refresh: fakeRefreshToken,
}
