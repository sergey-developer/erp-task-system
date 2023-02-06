import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { CreateTaskCommentSuccessResponse } from 'modules/task/models'
import { createTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

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

export const mockCreateTaskCommentNotFoundError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getNotFoundErrorMockFn(createTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentForbiddenError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getForbiddenErrorMockFn(createTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(createTaskCommentMockFn(taskId), options)()
