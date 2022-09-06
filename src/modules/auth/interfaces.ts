import { UserRolesEnum } from 'shared/constants/roles'
import { MaybeNull } from 'shared/interfaces/utils'

import { LoginResponseModel, RefreshTokenResponseModel } from './models'

export type JwtPayload = {
  userId: number
  userRole: UserRolesEnum
}

export type AuthenticatedUser = JwtPayload

export type AuthSliceState = {
  user: MaybeNull<AuthenticatedUser>
  accessToken: MaybeNull<string>
  refreshToken: MaybeNull<string>
  isAuthenticated: boolean
}

export type LoginActionPayload = LoginResponseModel & {
  user: JwtPayload
}

export type RefreshTokenActionPayload = RefreshTokenResponseModel & {
  user: JwtPayload
}
