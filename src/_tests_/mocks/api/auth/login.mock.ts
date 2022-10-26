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
import { ErrorData } from 'shared/services/api'

const getLoginMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthEndpointsEnum.Login)

export const mockLoginSuccess = (response: LoginResponseModel) => {
  const mockLogin = getSuccessMockFn(getLoginMockFn(), {
    body: response,
  })

  mockLogin()
}

export const mockLoginBadRequestError = <T extends object>(
  response?: ErrorData<T>,
) => {
  const mockLogin = getBadRequestErrorMockFn(getLoginMockFn(), {
    body: response,
  })

  mockLogin()
}

export const mockLoginUnauthorizedError = <T extends object>(
  response?: ErrorData<T>,
) => {
  const mockLogin = getUnauthorizedErrorMockFn(getLoginMockFn(), {
    body: response,
  })

  mockLogin()
}

export const mockLoginServerError = <T extends object>(
  response?: ErrorData<T>,
) => {
  const mockLogin = getServerErrorMockFn(getLoginMockFn(), {
    body: response,
  })

  mockLogin()
}
