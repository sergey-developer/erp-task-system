import {
  CancelSubTaskBadRequestErrorResponse,
  CancelSubTaskSuccessResponse,
} from 'modules/subTask/models'
import { cancelSubTaskUrl } from 'modules/subTask/utils/apiUrls'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const cancelSubTaskMockFn = (subTaskId: number) =>
  getRequestMockFn(HttpMethodEnum.Delete, cancelSubTaskUrl(subTaskId))

export const mockCancelSubTaskSuccess = (
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<CancelSubTaskSuccessResponse>>,
) => getSuccessMockFn(cancelSubTaskMockFn(subTaskId), options)()

export const mockCancelSubTaskBadRequestError = <
  T extends ErrorData<CancelSubTaskBadRequestErrorResponse>,
>(
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<T>>,
) => getBadRequestErrorMockFn(cancelSubTaskMockFn(subTaskId), options)()

export const mockCancelSubTaskServerError = (
  subTaskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(cancelSubTaskMockFn(subTaskId), options)()
