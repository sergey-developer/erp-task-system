import { getRefreshTokenMockFn } from '_tests_/mocks/api'
import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { LoginResponseModel } from 'modules/auth/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getLoginMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthEndpointsEnum.Login)

export const mockLoginSuccess = (response: LoginResponseModel) => {
  const mockLogin = getSuccessMockFn(getLoginMockFn(), {
    body: response,
  })

  mockLogin()
}

export const mockLoginBadRequestError = getBadRequestErrorMockFn(
  getLoginMockFn(),
)

export const mockLoginUnauthorizedError = () => {
  const mockLogin = getUnauthorizedErrorMockFn(getLoginMockFn())
  const mockRefreshToken = getSuccessMockFn(getRefreshTokenMockFn())

  mockLogin()
  mockRefreshToken()
}

export const mockLoginServerError = getServerErrorMockFn(getLoginMockFn())
