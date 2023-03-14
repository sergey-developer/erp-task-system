import { LoginSuccessResponse } from 'modules/auth/models'

import { fakeAccessToken, fakeRefreshToken } from './token'

export const loginResponseSuccess: LoginSuccessResponse = {
  access: fakeAccessToken,
  refresh: fakeRefreshToken,
}
