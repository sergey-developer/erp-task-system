import { makeGetUserActionsApiPath } from 'features/users/api/helpers'
import { GetUserActionsResponse } from 'features/users/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getUserActionsMockFn = (userId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetUserActionsApiPath(userId))

export const mockGetUserActionsSuccess = (
  userId: IdType,
  options?: Partial<ResponseResolverOptions<GetUserActionsResponse>>,
) => getSuccessMockFn(getUserActionsMockFn(userId), options)()
