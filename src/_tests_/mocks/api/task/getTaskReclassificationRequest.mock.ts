import { GetTaskReclassificationRequestSuccessResponse } from 'modules/task/models'
import { getTaskReclassificationRequestUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskReclassificationRequestMockFn = (taskId: number) =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    getTaskReclassificationRequestUrl(taskId),
  )

export const mockGetTaskReclassificationRequestSuccess = (
  taskId: number,
  options?: Partial<
    ResponseResolverOptions<GetTaskReclassificationRequestSuccessResponse>
  >,
) => getSuccessMockFn(getTaskReclassificationRequestMockFn(taskId), options)()

export const mockGetTaskReclassificationRequestServerError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) =>
  getServerErrorMockFn(getTaskReclassificationRequestMockFn(taskId), options)()
