import { AuthApiPathsEnum } from 'features/auth/api/constants'
import { RefreshTokenResponse } from 'features/auth/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const refreshTokenMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthApiPathsEnum.RefreshToken)

export const mockRefreshTokenSuccess = (
  options?: Partial<ResponseResolverOptions<RefreshTokenResponse>>,
) => getSuccessMockFn(refreshTokenMockFn(), options)()
