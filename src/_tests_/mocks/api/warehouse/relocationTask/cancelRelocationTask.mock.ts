import { CancelRelocationTaskSuccessResponse } from 'modules/warehouse/models'
import { cancelRelocationTaskUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
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

const cancelRelocationTaskMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, cancelRelocationTaskUrl(id))

export const mockCancelRelocationTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CancelRelocationTaskSuccessResponse>>,
) => getSuccessMockFn(cancelRelocationTaskMockFn(id), options)()

export const mockCancelRelocationTaskBadRequestError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(cancelRelocationTaskMockFn(id), options)()

export const mockCancelRelocationTaskNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(cancelRelocationTaskMockFn(id), options)()

export const mockCancelRelocationTaskForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(cancelRelocationTaskMockFn(id), options)()

export const mockCancelRelocationTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(cancelRelocationTaskMockFn(id), options)()
