import { makeExecuteRelocationTaskApiPath } from 'features/relocationTasks/api/helpers'
import {
  ExecuteRelocationTaskBadRequestResponse,
  ExecuteRelocationTaskResponse,
} from 'features/relocationTasks/api/schemas'

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
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const executeRelocationTaskMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, makeExecuteRelocationTaskApiPath(id))

export const mockExecuteRelocationTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ExecuteRelocationTaskResponse>>,
) => getSuccessMockFn(executeRelocationTaskMockFn(id), options)()

export const mockExecuteRelocationTaskBadRequestError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<ExecuteRelocationTaskBadRequestResponse>>>,
) => getBadRequestErrorMockFn(executeRelocationTaskMockFn(id), options)()

export const mockExecuteRelocationTaskNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(executeRelocationTaskMockFn(id), options)()

export const mockExecuteRelocationTaskForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(executeRelocationTaskMockFn(id), options)()

export const mockExecuteRelocationTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(executeRelocationTaskMockFn(id), options)()
