import { UserEndpointEnum } from 'modules/user/constants/api'
import { GetUserProfileSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserProfileMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UserEndpointEnum.GetUserProfile)

export const mockGetUserProfileSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserProfileSuccessResponse>>,
) => getSuccessMockFn(getUserProfileMockFn(), options)()
