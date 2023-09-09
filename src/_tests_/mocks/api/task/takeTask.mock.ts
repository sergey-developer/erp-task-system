import { TakeTaskSuccessResponse } from 'modules/task/models'
import { takeTaskUrl } from 'modules/task/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const takeTaskMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, takeTaskUrl(taskId))

export const mockTakeTaskSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<TakeTaskSuccessResponse>>,
) => getSuccessMockFn(takeTaskMockFn(taskId), options)()

export const mockTakeTaskForbiddenError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(takeTaskMockFn(taskId), options)()

export const mockTakeTaskServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(takeTaskMockFn(taskId), options)()
