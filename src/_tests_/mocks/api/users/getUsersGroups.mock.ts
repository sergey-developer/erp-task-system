import { UsersApiPathsEnum } from 'features/users/api/constants'
import { GetUsersGroupsResponse } from 'features/users/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getUsersGroupsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, UsersApiPathsEnum.GetUsersGroups)

export const mockGetUsersGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetUsersGroupsResponse>>,
) => getSuccessMockFn(getUsersGroupsMockFn(), options)()
