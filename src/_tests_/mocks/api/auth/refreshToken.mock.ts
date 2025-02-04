import { RefreshTokenSuccessResponse } from 'features/auth/api/schemas'
import { AuthEndpointsEnum } from 'features/auth/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const refreshTokenMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthEndpointsEnum.RefreshToken)

export const mockRefreshTokenSuccess = (
  options?: Partial<ResponseResolverOptions<RefreshTokenSuccessResponse>>,
) => getSuccessMockFn(refreshTokenMockFn(), options)()
