import { AuthEndpointsEnum } from 'modules/auth/constants'
import { LoginSuccessResponse } from 'modules/auth/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const loginMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthEndpointsEnum.Login)

export const mockLoginSuccess = (
  options: Partial<ResponseResolverOptions<LoginSuccessResponse>>,
) => getSuccessMockFn(loginMockFn(), options)()

export const mockLoginBadRequestError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(loginMockFn(), options)()

export const mockLoginUnauthorizedError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getUnauthorizedErrorMockFn(loginMockFn(), options)()

export const mockLoginServerError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(loginMockFn(), options)()
