import { UsersEndpointsEnum } from 'features/users/api/constants'
import { GetUserMeCodeSuccessResponse } from 'features/users/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserMeCodeMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UsersEndpointsEnum.GetUserMeCode)

export const mockGetUserMeCodeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeCodeSuccessResponse>>,
) => getSuccessMockFn(getUserMeCodeMockFn(), options)()
