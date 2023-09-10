import { CreateTaskCommentSuccessResponse } from 'modules/task/models'
import { createTaskCommentUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const createTaskCommentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, createTaskCommentUrl(id))

export const mockCreateTaskCommentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CreateTaskCommentSuccessResponse>>,
) => getSuccessMockFn(createTaskCommentMockFn(id), options)()

export const mockCreateTaskCommentBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createTaskCommentMockFn(id), options)()

export const mockCreateTaskCommentNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getNotFoundErrorMockFn(createTaskCommentMockFn(id), options)()

export const mockCreateTaskCommentForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(createTaskCommentMockFn(id), options)()

export const mockCreateTaskCommentServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createTaskCommentMockFn(id), options)()
