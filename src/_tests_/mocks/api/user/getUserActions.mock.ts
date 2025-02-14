import { GetUserActionsResponse } from 'features/users/api/dto'
import { makeGetUserActionsEndpoint } from 'features/users/helpers'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getUserActionsMockFn = (userId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetUserActionsEndpoint(userId))

export const mockGetUserActionsSuccess = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<GetUserActionsResponse>>,
) => getSuccessMockFn(getUserActionsMockFn(userId), options)()
