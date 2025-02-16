import { makeTakeTaskApiPath } from 'features/tasks/api/helpers'
import { TakeTaskResponse } from 'features/tasks/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const takeTaskMockFn = (taskId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, makeTakeTaskApiPath(taskId))

export const mockTakeTaskSuccess = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<TakeTaskResponse>>,
) => getSuccessMockFn(takeTaskMockFn(taskId), options)()

export const mockTakeTaskForbiddenError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(takeTaskMockFn(taskId), options)()

export const mockTakeTaskServerError = (
  taskId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(takeTaskMockFn(taskId), options)()
