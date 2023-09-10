import { GetTaskSuccessResponse } from 'modules/task/models'
import { getTaskUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
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

const getTaskMockFn = (id: IdType) => getRequestMockFn(HttpMethodEnum.Get, getTaskUrl(id))

export const mockGetTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetTaskSuccessResponse>>,
) => getSuccessMockFn(getTaskMockFn(id), options)()

export const mockGetTaskNotFoundError = (id: IdType, options?: Partial<ResponseResolverOptions>) =>
  getNotFoundErrorMockFn(getTaskMockFn(id), options)()

export const mockGetTaskBadRequestError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getBadRequestErrorMockFn(getTaskMockFn(id), options)()

export const mockGetTaskForbiddenError = (id: IdType, options?: Partial<ResponseResolverOptions>) =>
  getForbiddenErrorMockFn(getTaskMockFn(id), options)()

export const mockGetTaskServerError = (id: IdType, options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getTaskMockFn(id), options)()
