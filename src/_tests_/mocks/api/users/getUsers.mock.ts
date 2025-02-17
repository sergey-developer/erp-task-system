import { UsersApiPathsEnum } from 'features/users/api/constants'
import { GetUsersResponse } from 'features/users/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getUsersMockFn = () => getRequestMockFn(HttpMethodEnum.Get, UsersApiPathsEnum.GetUsers)

export const mockGetUsersSuccess = (options?: Partial<ResponseResolverOptions<GetUsersResponse>>) =>
  getSuccessMockFn(getUsersMockFn(), options)()
