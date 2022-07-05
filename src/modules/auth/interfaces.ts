import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'

import {
  AuthenticatedUserModel,
  LoginMutationArgsModel,
  LoginResponseModel,
  RefreshTokenResponseModel,
} from './models'
import { JwtPayload } from './utils/parseJwt'

export interface IAuthSliceState {
  user: MaybeNull<AuthenticatedUserModel>
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
