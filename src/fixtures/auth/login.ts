import { LoginSuccessResponse } from 'modules/auth/models'

import { fakeAccessToken, fakeRefreshToken } from './token'

export const fakeLoginResponseSuccess: LoginSuccessResponse = {
  access: fakeAccessToken,
  refresh: fakeRefreshToken,
}
