import { UsersApiPathsEnum } from 'features/users/api/constants'
import { GetUserMeResponse } from 'features/users/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getUserMeMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UsersApiPathsEnum.GetUserMe)

export const mockGetUserMeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeResponse>>,
) => getSuccessMockFn(getUserMeMockFn(), options)()
