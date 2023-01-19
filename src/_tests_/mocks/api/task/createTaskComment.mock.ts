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
import { getTaskCommentUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getCreateTaskCommentMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, getTaskCommentUrl(taskId))

export const mockCreateTaskCommentSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<CreateTaskCommentSuccessResponse>>,
) => getSuccessMockFn(getCreateTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(getCreateTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentNotFoundError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getNotFoundErrorMockFn(getCreateTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentForbiddenError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getForbiddenErrorMockFn(getCreateTaskCommentMockFn(taskId), options)()

export const mockCreateTaskCommentServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getCreateTaskCommentMockFn(taskId), options)()
