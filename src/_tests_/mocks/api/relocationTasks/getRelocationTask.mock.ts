import { makeGetRelocationTaskApiPath } from 'features/relocationTasks/api/helpers'
import { GetRelocationTaskResponse } from 'features/relocationTasks/api/schemas'
import { RequestWithRelocationTask } from 'features/relocationTasks/api/types'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getRelocationTaskMockFn = ({ relocationTaskId }: RequestWithRelocationTask) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetRelocationTaskApiPath({ relocationTaskId }))

export const mockGetRelocationTaskSuccess = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskResponse>>,
) => getSuccessMockFn(getRelocationTaskMockFn({ relocationTaskId }), options)()

export const mockGetRelocationTaskNotFoundError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationTaskMockFn({ relocationTaskId }), options)()

export const mockGetRelocationTaskForbiddenError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTaskMockFn({ relocationTaskId }), options)()

export const mockGetRelocationTaskServerError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationTaskMockFn({ relocationTaskId }), options)()
