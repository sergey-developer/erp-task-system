import { DeleteTaskSuspendRequestSuccessResponse } from 'modules/task/models'
import { deleteTaskSuspendRequestUrl } from 'modules/task/utils/apiUrls'

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

export const mockDeleteTaskSuspendRequestNotFoundError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getNotFoundErrorMockFn(deleteTaskSuspendRequestMockFn(taskId), options)()

export const mockDeleteTaskSuspendRequestBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(deleteTaskSuspendRequestMockFn(taskId), options)()

export const mockDeleteTaskSuspendRequestServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(deleteTaskSuspendRequestMockFn(taskId), options)()
