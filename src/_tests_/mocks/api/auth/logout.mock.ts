import { AuthApiEnum } from 'features/auth/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const logoutMockFn = () => getRequestMockFn(HttpMethodEnum.Post, AuthApiEnum.Logout)

export const mockLogoutSuccess = (options?: Partial<ResponseResolverOptions>) =>
  getSuccessMockFn(logoutMockFn(), options)()
