import { CloseRelocationTaskSuccessResponse } from 'features/warehouse/models'
import { closeRelocationTaskUrl } from 'features/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/services/baseApi'
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

const closeRelocationTaskMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, closeRelocationTaskUrl(id))

export const mockCloseRelocationTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CloseRelocationTaskSuccessResponse>>,
) => getSuccessMockFn(closeRelocationTaskMockFn(id), options)()

export const mockCloseRelocationTaskBadRequestError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(closeRelocationTaskMockFn(id), options)()

export const mockCloseRelocationTaskNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(closeRelocationTaskMockFn(id), options)()

export const mockCloseRelocationTaskForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(closeRelocationTaskMockFn(id), options)()

export const mockCloseRelocationTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(closeRelocationTaskMockFn(id), options)()
