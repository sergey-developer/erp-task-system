import { DeleteTaskSuspendRequestSuccessResponse } from 'modules/task/models'
import { deleteTaskSuspendRequestUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'
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
  getRequestMockFn(HttpMethodEnum.Delete, deleteTaskSuspendRequestUrl(id))

export const mockDeleteTaskSuspendRequestSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<DeleteTaskSuspendRequestSuccessResponse>>,
) => getSuccessMockFn(deleteTaskSuspendRequestMockFn(id), options)()

export const mockDeleteTaskSuspendRequestNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getNotFoundErrorMockFn(deleteTaskSuspendRequestMockFn(id), options)()

export const mockDeleteTaskSuspendRequestBadRequestError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(deleteTaskSuspendRequestMockFn(id), options)()

export const mockDeleteTaskSuspendRequestServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(deleteTaskSuspendRequestMockFn(id), options)()
