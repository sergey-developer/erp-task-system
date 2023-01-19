import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { ReworkSubTaskSuccessResponse } from 'modules/subTask/models'
import { getCancelSubTaskUrl } from 'modules/subTask/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getCancelSubTaskMockFn = (subTaskId: number) =>
  getRequestMockFn(HttpMethodEnum.Delete, getCancelSubTaskUrl(subTaskId))

export const mockCancelSubTaskSuccess = (
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ReworkSubTaskSuccessResponse>>,
) => getSuccessMockFn(getCancelSubTaskMockFn(subTaskId), options)()

export const mockCancelSubTaskBadRequestError = <T extends object>(
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(getCancelSubTaskMockFn(subTaskId), options)()

export const mockCancelSubTaskServerError = <T extends object>(
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getCancelSubTaskMockFn(subTaskId), options)()
