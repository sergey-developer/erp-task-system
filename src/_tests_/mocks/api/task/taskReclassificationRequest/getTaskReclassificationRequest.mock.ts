import { GetTaskReclassificationRequestSuccessResponse } from 'features/task/models'
import { getTaskReclassificationRequestUrl } from 'features/task/utils/taskReclassificationRequest'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

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
