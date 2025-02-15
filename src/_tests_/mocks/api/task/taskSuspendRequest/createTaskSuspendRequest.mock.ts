import { CreateTaskSuspendRequestResponse } from 'features/tasks/api/schemas'
import { createTaskSuspendRequestUrl } from 'features/tasks/utils/taskSuspendRequest'

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

const createTaskSuspendRequestMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskSuspendRequestUrl(id))

export const mockCreateTaskSuspendRequestSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskSuspendRequestResponse>>,
) => getSuccessMockFn(createTaskSuspendRequestMockFn(id), options)()

export const mockCreateTaskSuspendRequestNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(createTaskSuspendRequestMockFn(id), options)()

export const mockCreateTaskSuspendRequestBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createTaskSuspendRequestMockFn(id), options)()

export const mockCreateTaskSuspendRequestServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createTaskSuspendRequestMockFn(id), options)()
