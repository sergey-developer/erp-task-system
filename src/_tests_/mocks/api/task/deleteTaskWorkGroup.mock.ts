import { DeleteTaskWorkGroupSuccessResponse } from 'modules/task/models'
import { deleteTaskWorkGroupUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const deleteTaskWorkGroupMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Delete, deleteTaskWorkGroupUrl(id))

export const mockDeleteTaskWorkGroupSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<DeleteTaskWorkGroupSuccessResponse>>,
) => getSuccessMockFn(deleteTaskWorkGroupMockFn(id), options)()

export const mockDeleteTaskWorkGroupBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(deleteTaskWorkGroupMockFn(id), options)()

export const mockDeleteTaskWorkGroupNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(deleteTaskWorkGroupMockFn(id), options)()

export const mockDeleteTaskWorkGroupServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getServerErrorMockFn(deleteTaskWorkGroupMockFn(id), options)()

export const mockDeleteTaskWorkGroupForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(deleteTaskWorkGroupMockFn(id), options)()
