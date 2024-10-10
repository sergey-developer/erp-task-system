import { GetRelocationTaskSuccessResponse } from 'modules/warehouse/models'
import { RelocationTaskRequestArgs } from 'modules/warehouse/types'
import { getRelocationTaskUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTaskMockFn = ({ relocationTaskId }: RelocationTaskRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationTaskUrl({ relocationTaskId }))

export const mockGetRelocationTaskSuccess = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskSuccessResponse>>,
) => getSuccessMockFn(getRelocationTaskMockFn({ relocationTaskId }), options)()

export const mockGetRelocationTaskNotFoundError = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationTaskMockFn({ relocationTaskId }), options)()

export const mockGetRelocationTaskForbiddenError = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTaskMockFn({ relocationTaskId }), options)()

export const mockGetRelocationTaskServerError = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationTaskMockFn({ relocationTaskId }), options)()
