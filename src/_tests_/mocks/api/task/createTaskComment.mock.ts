import { CreateTaskCommentSuccessResponse } from 'modules/task/models'
import { createTaskCommentUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createTaskCommentMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskCommentUrl(taskId))

export const mockCreateTaskCommentSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<CreateTaskCommentSuccessResponse>>,
) => getSuccessMockFn(createTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentNotFoundError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getNotFoundErrorMockFn(createTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentForbiddenError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(createTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentServerError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createTaskCommentMockFn(taskId), options)()
