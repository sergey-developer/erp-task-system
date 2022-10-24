import { getRequestMockFn } from '_tests_/mocks/request'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { HttpMethodEnum } from 'shared/constants/http'

export const refreshTokenMockFn = getRequestMockFn(
  HttpMethodEnum.Post,
  AuthEndpointsEnum.RefreshToken,
)
