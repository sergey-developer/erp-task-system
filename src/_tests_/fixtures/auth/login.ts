import { LoginResponse } from 'features/auth/api/schemas'

import { fakeAccessToken, fakeRefreshToken } from './token'

export const loginResponse: LoginResponse = {
  access: fakeAccessToken,
  refresh: fakeRefreshToken,
}
