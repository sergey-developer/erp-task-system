import { UserApiEnum } from 'features/user/constants'
import { GetUsersGroupsSuccessResponse } from 'features/user/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUsersGroupsMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UserApiEnum.GetUsersGroups)

export const mockGetUsersGroupsSuccess = (
  options?: Partial<ResponseResolverOptions<GetUsersGroupsSuccessResponse>>,
) => getSuccessMockFn(getUsersGroupsMockFn(), options)()
