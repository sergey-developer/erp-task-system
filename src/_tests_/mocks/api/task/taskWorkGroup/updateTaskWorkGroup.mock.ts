import { UpdateTaskWorkGroupSuccessResponse } from 'modules/task/models'
import { updateTaskWorkGroupUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateTaskWorkGroupMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, updateTaskWorkGroupUrl(taskId))

export const mockUpdateTaskWorkGroupSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<UpdateTaskWorkGroupSuccessResponse>>,
) => getSuccessMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupBadRequestError = <T extends object>(
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()

export const mockUpdateTaskWorkGroupForbiddenError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(updateTaskWorkGroupMockFn(taskId), options)()
