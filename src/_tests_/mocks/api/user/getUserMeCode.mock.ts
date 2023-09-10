import { UserApiEnum } from 'modules/user/constants'
import { GetUserMeCodeSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getUserMeCodeMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserMeCode)

export const mockGetUserMeCodeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeCodeSuccessResponse>>,
) => getSuccessMockFn(getUserMeCodeMockFn(), options)()
