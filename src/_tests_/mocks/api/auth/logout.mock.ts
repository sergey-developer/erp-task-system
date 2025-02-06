import { AuthEndpointsEnum } from 'features/auth/api/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const logoutMockFn = () => getRequestMockFn(HttpMethodEnum.Post, AuthEndpointsEnum.Logout)

export const mockLogoutSuccess = (options?: Partial<ResponseResolverOptions>) =>
  getSuccessMockFn(logoutMockFn(), options)()
