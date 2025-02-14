import { UsersApiPathsEnum } from 'features/users/api/constants'
import { GetUserMeCodeResponse } from 'features/users/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserMeCodeMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UsersApiPathsEnum.GetUserMeCode)

export const mockGetUserMeCodeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeCodeResponse>>,
) => getSuccessMockFn(getUserMeCodeMockFn(), options)()
