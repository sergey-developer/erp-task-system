import { ReworkSubTaskSuccessResponse } from 'modules/subTask/models'
import { reworkSubTaskUrl } from 'modules/subTask/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const reworkSubTaskMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, reworkSubTaskUrl(id))

export const mockReworkSubTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ReworkSubTaskSuccessResponse>>,
) => getSuccessMockFn(reworkSubTaskMockFn(id), options)()

export const mockReworkSubTaskBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(reworkSubTaskMockFn(id), options)()

export const mockReworkSubTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(reworkSubTaskMockFn(id), options)()
