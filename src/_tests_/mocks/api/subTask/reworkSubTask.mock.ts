import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'
import { ReworkSubTaskSuccessResponse } from 'modules/subTask/models'
import { getReworkSubTaskUrl } from 'modules/subTask/utils/apiUrls'
import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

const getReworkSubTaskMockFn = (subTaskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, getReworkSubTaskUrl(subTaskId))

export const mockReworkSubTaskSuccess = (
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ReworkSubTaskSuccessResponse>>,
) => getSuccessMockFn(getReworkSubTaskMockFn(subTaskId), options)()

export const mockReworkSubTaskBadRequestError = <T extends object>(
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(getReworkSubTaskMockFn(subTaskId), options)()

export const mockReworkSubTaskServerError = <T extends object>(
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getServerErrorMockFn(getReworkSubTaskMockFn(subTaskId), options)()
