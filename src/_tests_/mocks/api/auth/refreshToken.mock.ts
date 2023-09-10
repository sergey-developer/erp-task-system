import { AuthApiEnum } from 'modules/auth/constants'
import { RefreshTokenSuccessResponse } from 'modules/auth/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const refreshTokenMockFn = () => getRequestMockFn(HttpMethodEnum.Post, AuthApiEnum.RefreshToken)

export const mockRefreshTokenSuccess = (
  options?: Partial<ResponseResolverOptions<RefreshTokenSuccessResponse>>,
) => getSuccessMockFn(refreshTokenMockFn(), options)()
