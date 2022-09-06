import { getRequestMocker } from '_tests_/mocks/request'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { HttpMethodEnum } from 'shared/constants/http'

export const refreshTokenMocker = getRequestMocker(
  HttpMethodEnum.Post,
  AuthEndpointsEnum.RefreshToken,
)
