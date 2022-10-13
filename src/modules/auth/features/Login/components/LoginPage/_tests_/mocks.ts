import { loginResponseSuccess } from '_fixtures_/auth'
import {
  getBadRequestErrorMocker,
  getRequestMocker,
  getServerErrorMocker,
  getSuccessMocker,
  getUnauthorizedErrorMocker,
} from '_tests_/mocks/request'
import { getResponseResolver } from '_tests_/mocks/response'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { refreshTokenMocker } from 'modules/auth/features/RefreshToken/_tests_/mocks'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'

const loginMocker = getRequestMocker(
  HttpMethodEnum.Post,
  AuthEndpointsEnum.Login,
)

export const mockLoginSuccess = loginMocker(
  getResponseResolver({
    status: HttpCodeEnum.Ok,
    body: loginResponseSuccess,
  }),
)

export const mockLoginBadRequestError = getBadRequestErrorMocker(loginMocker)

export const mockLoginUnauthorizedError = () => {
  const mockLogin = getUnauthorizedErrorMocker(loginMocker)
  const mockRefreshToken = getSuccessMocker(refreshTokenMocker)

  mockLogin()
  mockRefreshToken()
}

export const mockLoginServerError = getServerErrorMocker(loginMocker)
