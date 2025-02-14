import { UsersEndpointsEnum } from 'features/users/api/constants'
import { GetUserMeResponse } from 'features/users/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserMeMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UsersEndpointsEnum.GetUserMe)

export const mockGetUserMeSuccess = (
  options?: Partial<ResponseResolverOptions<GetUserMeResponse>>,
) => getSuccessMockFn(getUserMeMockFn(), options)()
