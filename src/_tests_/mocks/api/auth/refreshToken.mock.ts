import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { RefreshTokenResponseModel } from 'modules/auth/models'
import { HttpMethodEnum } from 'shared/constants/http'

const getRefreshTokenMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, AuthEndpointsEnum.RefreshToken)

export const mockRefreshTokenSuccess = (
  response?: RefreshTokenResponseModel,
) => {
  const mockRefreshToken = getSuccessMockFn(getRefreshTokenMockFn(), {
    body: response,
  })

  mockRefreshToken()
}
