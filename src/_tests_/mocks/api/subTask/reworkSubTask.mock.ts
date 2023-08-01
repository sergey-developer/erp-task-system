import { ReworkSubTaskSuccessResponse } from 'modules/subTask/models'
import { reworkSubTaskUrl } from 'modules/subTask/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const reworkSubTaskMockFn = (subTaskId: number) =>
  getRequestMockFn(HttpMethodEnum.Post, reworkSubTaskUrl(subTaskId))

export const mockReworkSubTaskSuccess = (
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ReworkSubTaskSuccessResponse>>,
) => getSuccessMockFn(reworkSubTaskMockFn(subTaskId), options)()

export const mockReworkSubTaskBadRequestError = <T extends object>(
  subTaskId: number,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(reworkSubTaskMockFn(subTaskId), options)()

export const mockReworkSubTaskServerError = (
  subTaskId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(reworkSubTaskMockFn(subTaskId), options)()
