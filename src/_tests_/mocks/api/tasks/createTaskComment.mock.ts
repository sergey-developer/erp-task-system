import { makeCreateTaskCommentApiPath } from 'features/tasks/api/helpers'
import { CreateTaskCommentResponse } from 'features/tasks/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const createTaskCommentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, makeCreateTaskCommentApiPath(id))

export const mockCreateTaskCommentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskCommentResponse>>,
) => getSuccessMockFn(createTaskCommentMockFn(id), options)()

export const mockCreateTaskCommentBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createTaskCommentMockFn(id), options)()

export const mockCreateTaskCommentNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(createTaskCommentMockFn(id), options)()

export const mockCreateTaskCommentForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(createTaskCommentMockFn(id), options)()

export const mockCreateTaskCommentServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getServerErrorMockFn(createTaskCommentMockFn(id), options)()
