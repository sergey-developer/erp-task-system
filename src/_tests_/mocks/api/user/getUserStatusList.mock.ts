import { UserApiEnum } from 'modules/user/constants'
import { GetUserStatusListSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getUserStatusListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserStatusList)

export const mockGetUserStatusListSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserStatusListSuccessResponse>>,
) => getSuccessMockFn(getUserStatusListMockFn(), options)()
