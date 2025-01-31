import {
  ExecuteRelocationTaskBadRequestErrorResponse,
  ExecuteRelocationTaskSuccessResponse,
} from 'features/warehouse/models'
import { executeRelocationTaskUrl } from 'features/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'
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
  getRequestMockFn(HttpMethodEnum.Post, executeRelocationTaskUrl(id))

export const mockExecuteRelocationTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ExecuteRelocationTaskSuccessResponse>>,
) => getSuccessMockFn(executeRelocationTaskMockFn(id), options)()

export const mockExecuteRelocationTaskBadRequestError = (
  id: IdType,
  options?: Partial<
    ResponseResolverOptions<ErrorData<ExecuteRelocationTaskBadRequestErrorResponse>>
  >,
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
