import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'

import { LoginApiArg } from './models'

export interface IAuthSliceState {
  user: unknown
  accessToken: MaybeNull<string>
  refreshToken: MaybeNull<string>
  isAuthenticated: boolean
}

export interface IUseLoginMutationResult {
  error: MaybeUndefined<ErrorResponse<LoginApiArg>>
  isLoading: boolean
}
