import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  getUnauthorizedErrorMockFn,
} from '_tests_/mocks/request'
import { loginResponseSuccess } from 'fixtures/auth'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { refreshTokenMockFn } from 'modules/auth/features/RefreshToken/_tests_/mocks'
import { HttpMethodEnum } from 'shared/constants/http'

const loginMockFn = getRequestMockFn(
  HttpMethodEnum.Post,
  AuthEndpointsEnum.Login,
)

export const mockLoginSuccess = getSuccessMockFn(loginMockFn, {
  body: loginResponseSuccess,
})

export const mockLoginBadRequestError = getBadRequestErrorMockFn(loginMockFn)

export const mockLoginUnauthorizedError = () => {
  const mockLogin = getUnauthorizedErrorMockFn(loginMockFn)
  const mockRefreshToken = getSuccessMockFn(refreshTokenMockFn)

  mockLogin()
  mockRefreshToken()
}

export const mockLoginServerError = getServerErrorMockFn(loginMockFn)
