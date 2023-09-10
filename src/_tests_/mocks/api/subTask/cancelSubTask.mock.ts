import {
  CancelSubTaskBadRequestErrorResponse,
  CancelSubTaskSuccessResponse,
} from 'modules/subTask/models'
import { cancelSubTaskUrl } from 'modules/subTask/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions
} from '_tests_/mocks/api'

const cancelSubTaskMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Delete, cancelSubTaskUrl(id))

export const mockCancelSubTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CancelSubTaskSuccessResponse>>,
) => getSuccessMockFn(cancelSubTaskMockFn(id), options)()

export const mockCancelSubTaskBadRequestError = <
  T extends ErrorData<CancelSubTaskBadRequestErrorResponse>,
>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<T>>,
) => getBadRequestErrorMockFn(cancelSubTaskMockFn(id), options)()

export const mockCancelSubTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(cancelSubTaskMockFn(id), options)()
