import { makeGetTaskReclassificationRequestApiPath } from 'features/tasks/api/helpers'
import { GetTaskReclassificationRequestResponse } from 'features/tasks/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getTaskReclassificationRequestMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetTaskReclassificationRequestApiPath(taskId))

export const mockGetTaskReclassificationRequestSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskReclassificationRequestResponse>>,
) => getSuccessMockFn(getTaskReclassificationRequestMockFn(taskId), options)()

export const mockGetTaskReclassificationRequestServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getTaskReclassificationRequestMockFn(taskId), options)()
