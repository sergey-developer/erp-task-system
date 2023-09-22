import { GetRelocationTaskSuccessResponse } from 'modules/warehouse/models'
import { getRelocationTaskUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTaskMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationTaskUrl(id))

export const mockGetRelocationTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationTaskSuccessResponse>>,
) => getSuccessMockFn(getRelocationTaskMockFn(id), options)()

export const mockGetRelocationTaskNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationTaskMockFn(id), options)()

export const mockGetRelocationTaskForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTaskMockFn(id), options)()

export const mockGetRelocationTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationTaskMockFn(id), options)()
