import { UserApiEnum } from 'features/user/constants'
import { GetUserMeSuccessResponse } from 'features/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserMeMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserMe)

export const mockGetUserMeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeSuccessResponse>>,
) => getSuccessMockFn(getUserMeMockFn(), options)()
