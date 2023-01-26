import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { DeleteTaskWorkGroupSuccessResponse } from 'modules/task/models'
import { deleteTaskWorkGroupUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const deleteTaskWorkGroupMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Delete, deleteTaskWorkGroupUrl(taskId))

export const mockDeleteTaskWorkGroupSuccess = (
  taskId: number,
  options?: Partial<
    ResponseResolverOptions<DeleteTaskWorkGroupSuccessResponse>
  >,
) => getSuccessMockFn(deleteTaskWorkGroupMockFn(taskId), options)()

export const mockDeleteTaskWorkGroupBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(deleteTaskWorkGroupMockFn(taskId), options)()

export const mockDeleteTaskWorkGroupNotFoundError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getNotFoundErrorMockFn(deleteTaskWorkGroupMockFn(taskId), options)()

export const mockDeleteTaskWorkGroupServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(deleteTaskWorkGroupMockFn(taskId), options)()

export const mockDeleteTaskWorkGroupForbiddenError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getForbiddenErrorMockFn(deleteTaskWorkGroupMockFn(taskId), options)()
