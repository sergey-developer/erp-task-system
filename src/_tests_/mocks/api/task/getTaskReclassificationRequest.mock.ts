import { GetTaskReclassificationRequestSuccessResponse } from 'modules/task/models'
import { getTaskReclassificationRequestUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn, ResponseResolverOptions } from '_tests_/mocks/api'

const getTaskReclassificationRequestMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskReclassificationRequestUrl(taskId))

export const mockGetTaskReclassificationRequestSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskReclassificationRequestSuccessResponse>>,
) => getSuccessMockFn(getTaskReclassificationRequestMockFn(taskId), options)()

export const mockGetTaskReclassificationRequestServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getTaskReclassificationRequestMockFn(taskId), options)()
