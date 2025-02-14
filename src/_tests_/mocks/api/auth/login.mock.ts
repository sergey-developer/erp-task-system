import { AuthApiPathsEnum } from 'features/auth/api/constants'
import { LoginResponse } from 'features/auth/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const loginMockFn = () => getRequestMockFn(HttpMethodEnum.Post, AuthApiPathsEnum.Login)

export const mockLoginSuccess = (options: Partial<ResponseResolverOptions<LoginResponse>>) =>
  getSuccessMockFn(loginMockFn(), options)()

export const mockLoginBadRequestError = (options?: Partial<ResponseResolverOptions>) =>
  getBadRequestErrorMockFn(loginMockFn(), options)()

export const mockLoginUnauthorizedError = (options?: Partial<ResponseResolverOptions>) =>
  getUnauthorizedErrorMockFn(loginMockFn(), options)()

export const mockLoginServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(loginMockFn(), options)()
