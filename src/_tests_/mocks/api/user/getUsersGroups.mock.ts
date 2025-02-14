import { UsersEndpointsEnum } from 'features/users/api/constants'
import { GetUsersGroupsResponse } from 'features/users/api/dto'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUsersGroupsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UsersEndpointsEnum.GetUsersGroups)

export const mockGetUsersGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetUsersGroupsResponse>>,
) => getSuccessMockFn(getUsersGroupsMockFn(), options)()
