import { MaybeNull, MaybeUndefined } from 'shared/interfaces/utils'
import { ErrorResponse } from 'shared/services/api'

import { AuthenticatedUserModel, LoginMutationArgsModel } from './models'

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
