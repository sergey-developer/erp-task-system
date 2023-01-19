import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { LoginSuccessResponse } from 'modules/auth/models'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getLoginMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthEndpointsEnum.Login)

export const mockLoginSuccess = (
  options: Partial<ResponseResolverOptions<LoginSuccessResponse>>,
) => {
  const mockLogin = getSuccessMockFn(getLoginMockFn(), options)
  mockLogin()
}

export const mockLoginBadRequestError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockLogin = getBadRequestErrorMockFn(getLoginMockFn(), options)
  mockLogin()
}

export const mockLoginUnauthorizedError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockLogin = getUnauthorizedErrorMockFn(getLoginMockFn(), options)
  mockLogin()
}

export const mockLoginServerError = <T extends object>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => {
  const mockLogin = getServerErrorMockFn(getLoginMockFn(), options)
  mockLogin()
}
