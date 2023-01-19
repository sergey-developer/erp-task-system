import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import {
  UpdateTaskWorkGroupMutationArgs,
  UpdateTaskWorkGroupSuccessResponse,
} from 'modules/task/models'
import { getTaskWorkGroupUrl } from 'modules/task/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const updateTaskWorkGroupMockFn = (
  taskId: UpdateTaskWorkGroupMutationArgs['taskId'],
) => getRequestMockFn(HttpMethodEnum.Post, getTaskWorkGroupUrl(taskId))

export const mockUpdateTaskWorkGroupSuccess = (
  taskId: UpdateTaskWorkGroupMutationArgs['taskId'],
  options?: Partial<
    ResponseResolverOptions<UpdateTaskWorkGroupSuccessResponse>
  >,
) => getSuccessMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupBadRequestError = <T extends object>(
  taskId: UpdateTaskWorkGroupMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupNotFoundError = <T extends object>(
  taskId: UpdateTaskWorkGroupMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getNotFoundErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupServerError = <T extends object>(
  taskId: UpdateTaskWorkGroupMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupForbiddenError = <T extends object>(
  taskId: UpdateTaskWorkGroupMutationArgs['taskId'],
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getForbiddenErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()
