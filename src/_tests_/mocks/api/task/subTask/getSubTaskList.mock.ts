import { GetSubTasksResponse } from 'features/tasks/api/schemas'
import { getSubTaskListUrl } from 'features/tasks/helpers'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getSubTaskListMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getSubTaskListUrl(taskId))

export const mockGetSubTaskListSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetSubTasksResponse>>,
) => getSuccessMockFn(getSubTaskListMockFn(taskId), options)()

export const mockGetSubTaskListServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getSubTaskListMockFn(taskId), options)()
