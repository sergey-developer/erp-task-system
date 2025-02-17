import { makeGetSubTasksApiPath } from 'features/tasks/api/helpers'
import { GetSubTasksResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getSubTasksMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetSubTasksApiPath(taskId))

export const mockGetSubTasksSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetSubTasksResponse>>,
) => getSuccessMockFn(getSubTasksMockFn(taskId), options)()

export const mockGetSubTasksServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSubTasksMockFn(taskId), options)()
