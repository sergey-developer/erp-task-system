import { CreateTaskSuspendRequestSuccessResponse } from 'modules/task/models'
import { createTaskSuspendRequestUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const createTaskSuspendRequestMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskSuspendRequestUrl(id))

export const mockCreateTaskSuspendRequestSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskSuspendRequestSuccessResponse>>,
) => getSuccessMockFn(createTaskSuspendRequestMockFn(id), options)()

export const mockCreateTaskSuspendRequestNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getNotFoundErrorMockFn(createTaskSuspendRequestMockFn(id), options)()

export const mockCreateTaskSuspendRequestBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createTaskSuspendRequestMockFn(id), options)()

export const mockCreateTaskSuspendRequestServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createTaskSuspendRequestMockFn(id), options)()
