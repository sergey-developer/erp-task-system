import { CreateTaskSuspendRequestSuccessResponse } from 'modules/task/models'
import { createTaskSuspendRequestUrl } from 'modules/task/utils/apiUrls'

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

export const mockCreateTaskSuspendRequestNotFoundError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getNotFoundErrorMockFn(createTaskSuspendRequestMockFn(taskId), options)()

export const mockCreateTaskSuspendRequestBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createTaskSuspendRequestMockFn(taskId), options)()

export const mockCreateTaskSuspendRequestServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(createTaskSuspendRequestMockFn(taskId), options)()
