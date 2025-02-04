import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type JwtPayload = {
  userId: IdType
}

export type AuthTokensPayload = {
  access: string
  refresh: string
}

export type AuthenticatedUser = JwtPayload

export type AuthSliceState = {
  user: MaybeNull<AuthenticatedUser>
  accessToken: MaybeNull<string>
  refreshToken: MaybeNull<string>
  isLoggedIn: boolean
}

export type LoginActionPayload = AuthTokensPayload & {
  user: JwtPayload
}

export type RefreshTokenActionPayload = AuthTokensPayload & {
  user: JwtPayload
}
