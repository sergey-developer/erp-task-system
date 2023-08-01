import { UserApiEnum } from 'modules/user/constants/api'
import { GetUserMeCodeSuccessResponse } from 'modules/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserMeCodeMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUserMeCode)

export const mockGetUserMeCodeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeCodeSuccessResponse>>,
) => getSuccessMockFn(getUserMeCodeMockFn(), options)()
