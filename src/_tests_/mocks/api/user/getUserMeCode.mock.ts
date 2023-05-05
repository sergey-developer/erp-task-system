import { UserEndpointEnum } from 'modules/user/constants/api'
import { GetUserCodeSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserMeCodeMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UserEndpointEnum.GetUserCode)

export const mockGetUserMeCodeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserCodeSuccessResponse>>,
) => getSuccessMockFn(getUserMeCodeMockFn(), options)()
