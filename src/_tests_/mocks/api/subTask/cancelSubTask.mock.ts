import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { ReworkSubTaskSuccessResponse } from 'modules/subTask/models'
import { cancelSubTaskUrl } from 'modules/subTask/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const cancelSubTaskMockFn = (subTaskId: number) =>
  getRequestMockFn(HttpMethodEnum.Delete, cancelSubTaskUrl(subTaskId))

export const mockCancelSubTaskSuccess = (
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ReworkSubTaskSuccessResponse>>,
) => getSuccessMockFn(cancelSubTaskMockFn(subTaskId), options)()

export const mockCancelSubTaskBadRequestError = <T extends object>(
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(cancelSubTaskMockFn(subTaskId), options)()

export const mockCancelSubTaskServerError = <T extends object>(
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(cancelSubTaskMockFn(subTaskId), options)()
