import { MaybeNull } from 'shared/interfaces/utils'

import { AuthenticatedUser } from './common'

export type AuthSliceState = {
  user: MaybeNull<AuthenticatedUser>
  accessToken: MaybeNull<string>
  refreshToken: MaybeNull<string>
  isAuthenticated: boolean
}
