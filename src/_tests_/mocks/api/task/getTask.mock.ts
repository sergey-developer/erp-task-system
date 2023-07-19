import { GetTaskSuccessResponse } from 'modules/task/models'
import { getTaskUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getTaskMockFn = (taskId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getTaskUrl(taskId))

export const mockGetTaskSuccess = (
  taskId: number,
  options?: Partial<ResponseResolverOptions<GetTaskSuccessResponse>>,
) => getSuccessMockFn(getTaskMockFn(taskId), options)()

export const mockGetTaskNotFoundError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getNotFoundErrorMockFn(getTaskMockFn(taskId), options)()

export const mockGetTaskBadRequestError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getBadRequestErrorMockFn(getTaskMockFn(taskId), options)()

export const mockGetTaskForbiddenError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getForbiddenErrorMockFn(getTaskMockFn(taskId), options)()

export const mockGetTaskServerError = (
  taskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getTaskMockFn(taskId), options)()
