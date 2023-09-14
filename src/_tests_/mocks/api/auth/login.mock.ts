import { AuthApiEnum } from 'modules/auth/constants'
import { LoginSuccessResponse } from 'modules/auth/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const loginMockFn = () => getRequestMockFn(HttpMethodEnum.Post, AuthApiEnum.Login)

export const mockLoginSuccess = (options: Partial<ResponseResolverOptions<LoginSuccessResponse>>) =>
  getSuccessMockFn(loginMockFn(), options)()

export const mockLoginBadRequestError = (options?: Partial<ResponseResolverOptions>) =>
  getBadRequestErrorMockFn(loginMockFn(), options)()

export const mockLoginUnauthorizedError = (options?: Partial<ResponseResolverOptions>) =>
  getUnauthorizedErrorMockFn(loginMockFn(), options)()

export const mockLoginServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(loginMockFn(), options)()
