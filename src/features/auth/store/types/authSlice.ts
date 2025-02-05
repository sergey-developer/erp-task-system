import { MaybeNull } from 'shared/types/utils'

import { AuthenticatedUser } from '../types'

export type AuthSliceState = {
  user: MaybeNull<AuthenticatedUser>
  accessToken: MaybeNull<string>
  refreshToken: MaybeNull<string>
  isLoggedIn: boolean
}
