import { UserApiEnum } from 'modules/user/constants'
import { GetUserMeSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getUserMeMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserMe)

export const mockGetUserMeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeSuccessResponse>>,
) => getSuccessMockFn(getUserMeMockFn(), options)()
