import { AuthApiPathsEnum } from 'features/auth/api/constants'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const logoutMockFn = () => getRequestMockFn(HttpMethodEnum.Post, AuthApiPathsEnum.Logout)

export const mockLogoutSuccess = (options?: Partial<ResponseResolverOptions>) =>
  getSuccessMockFn(logoutMockFn(), options)()
