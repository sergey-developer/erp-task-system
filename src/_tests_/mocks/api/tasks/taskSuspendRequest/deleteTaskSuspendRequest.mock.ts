import { makeDeleteTaskSuspendRequestApiPath } from 'features/tasks/api/helpers'
import { DeleteTaskSuspendRequestResponse } from 'features/tasks/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const deleteTaskSuspendRequestMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Delete, makeDeleteTaskSuspendRequestApiPath(id))

export const mockDeleteTaskSuspendRequestSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<DeleteTaskSuspendRequestResponse>>,
) => getSuccessMockFn(deleteTaskSuspendRequestMockFn(id), options)()

export const mockDeleteTaskSuspendRequestNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(deleteTaskSuspendRequestMockFn(id), options)()

export const mockDeleteTaskSuspendRequestBadRequestError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(deleteTaskSuspendRequestMockFn(id), options)()

export const mockDeleteTaskSuspendRequestServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(deleteTaskSuspendRequestMockFn(id), options)()
