import { DeleteTaskSuspendRequestSuccessResponse } from 'modules/task/models'
import { deleteTaskSuspendRequestUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getBadRequestErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const deleteTaskSuspendRequestMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Delete, deleteTaskSuspendRequestUrl(taskId))

export const mockDeleteTaskSuspendRequestSuccess = (
  taskId: number,
  options?: Partial<
    ResponseResolverOptions<DeleteTaskSuspendRequestSuccessResponse>
  >,
) => getSuccessMockFn(deleteTaskSuspendRequestMockFn(taskId), options)()

export const mockDeleteTaskSuspendRequestNotFoundError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getNotFoundErrorMockFn(deleteTaskSuspendRequestMockFn(taskId), options)()

export const mockDeleteTaskSuspendRequestBadRequestError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(deleteTaskSuspendRequestMockFn(taskId), options)()

export const mockDeleteTaskSuspendRequestServerError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(deleteTaskSuspendRequestMockFn(taskId), options)()
