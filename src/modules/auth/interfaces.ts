import { UserRolesEnum } from 'shared/constants/roles'
import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'

import {
  LoginMutationArgsModel,
  LoginResponseModel,
  RefreshTokenResponseModel,
} from './models'

export type JwtPayload = {
  userId: number
  userRole: UserRolesEnum
}

export type AuthenticatedUser = JwtPayload

export interface IAuthSliceState {
  user: MaybeNull<AuthenticatedUser>
  accessToken: MaybeNull<string>
  refreshToken: MaybeNull<string>
  isAuthenticated: boolean
}

export interface IUseLoginMutationResult {
  error: MaybeUndefined<ErrorResponse<LoginMutationArgsModel>>
  isLoading: boolean
}

export type LoginActionPayload = LoginResponseModel & {
  user: JwtPayload
}

export type RefreshTokenActionPayload = RefreshTokenResponseModel & {
  user: JwtPayload
}
