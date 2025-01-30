import {
  CancelSubTaskBadRequestErrorResponse,
  CancelSubTaskSuccessResponse,
} from 'features/task/models'
import { cancelSubTaskUrl } from 'features/task/utils/subTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

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
