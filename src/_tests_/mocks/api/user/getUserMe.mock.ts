import { UserApiEnum } from 'features/user/api/constants'
import { GetUserMeSuccessResponse } from 'features/user/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserMeMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserMe)

export const mockGetUserMeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeSuccessResponse>>,
) => getSuccessMockFn(getUserMeMockFn(), options)()
