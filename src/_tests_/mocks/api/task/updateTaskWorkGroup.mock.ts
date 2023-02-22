import { UpdateTaskWorkGroupSuccessResponse } from 'modules/task/models'
import { updateTaskWorkGroupUrl } from 'modules/task/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateTaskWorkGroupMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, updateTaskWorkGroupUrl(taskId))

export const mockUpdateTaskWorkGroupSuccess = (
  taskId: number,
  options?: Partial<
    ResponseResolverOptions<UpdateTaskWorkGroupSuccessResponse>
  >,
) => getSuccessMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupBadRequestError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupServerError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupForbiddenError = <T extends object>(
  taskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getForbiddenErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()
