import { ReworkSubTaskResponse } from 'features/task/models'
import { reworkSubTaskUrl } from 'features/task/utils/subTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'
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
  options?: Partial<ResponseResolverOptions<ReworkSubTaskResponse>>,
) => getSuccessMockFn(reworkSubTaskMockFn(id), options)()

export const mockReworkSubTaskBadRequestError = <T extends object>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(reworkSubTaskMockFn(id), options)()

export const mockReworkSubTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(reworkSubTaskMockFn(id), options)()
