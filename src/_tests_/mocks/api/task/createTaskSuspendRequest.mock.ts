import { CreateTaskSuspendRequestSuccessResponse } from 'modules/task/models'
import { createTaskSuspendRequestUrl } from 'modules/task/utils'

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

const createTaskSuspendRequestMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskSuspendRequestUrl(taskId))

export const mockCreateTaskSuspendRequestSuccess = (
  taskId: number,
  options?: Partial<
    ResponseResolverOptions<CreateTaskSuspendRequestSuccessResponse>
  >,
) => getSuccessMockFn(createTaskSuspendRequestMockFn(taskId), options)()

export const mockCreateTaskSuspendRequestNotFoundError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getNotFoundErrorMockFn(createTaskSuspendRequestMockFn(taskId), options)()

export const mockCreateTaskSuspendRequestBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createTaskSuspendRequestMockFn(taskId), options)()

export const mockCreateTaskSuspendRequestServerError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createTaskSuspendRequestMockFn(taskId), options)()
