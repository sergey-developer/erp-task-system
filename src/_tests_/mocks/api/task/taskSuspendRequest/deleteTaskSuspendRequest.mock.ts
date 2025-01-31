import { DeleteTaskSuspendRequestSuccessResponse } from 'features/task/models'
import { deleteTaskSuspendRequestUrl } from 'features/task/utils/taskSuspendRequest'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'
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
