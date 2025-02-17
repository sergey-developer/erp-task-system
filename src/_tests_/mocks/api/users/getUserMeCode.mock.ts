import { UsersApiPathsEnum } from 'features/users/api/constants'
import { GetUserMeCodeResponse } from 'features/users/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getUserMeCodeMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UsersApiPathsEnum.GetUserMeCode)

export const mockGetUserMeCodeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeCodeResponse>>,
) => getSuccessMockFn(getUserMeCodeMockFn(), options)()
