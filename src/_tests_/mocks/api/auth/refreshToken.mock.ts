import { AuthApiEnum } from 'modules/auth/constants'
import { RefreshTokenSuccessResponse } from 'modules/auth/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const refreshTokenMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthApiEnum.RefreshToken)

export const mockRefreshTokenSuccess = (
  options?: Partial<ResponseResolverOptions<RefreshTokenSuccessResponse>>,
) => getSuccessMockFn(refreshTokenMockFn(), options)()
