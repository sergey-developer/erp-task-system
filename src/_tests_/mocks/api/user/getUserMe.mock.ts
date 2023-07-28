import { UserApiEnum } from 'modules/user/constants/api'
import { GetUserMeSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserMeMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserMe)

export const mockGetUserMeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeSuccessResponse>>,
) => getSuccessMockFn(getUserMeMockFn(), options)()
