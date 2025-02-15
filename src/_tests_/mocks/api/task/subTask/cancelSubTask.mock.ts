import {
  CancelSubTaskBadRequestResponse,
  CancelSubTaskResponse,
} from 'features/tasks/api/schemas'
import { makeCancelSubTaskApiPath } from 'features/tasks/api/helpers'

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

const cancelSubTaskMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Delete, makeCancelSubTaskApiPath(id))

export const mockCancelSubTaskSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<CancelSubTaskResponse>>,
) => getSuccessMockFn(cancelSubTaskMockFn(id), options)()

export const mockCancelSubTaskBadRequestError = <
  T extends ErrorData<CancelSubTaskBadRequestResponse>,
>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<T>>,
) => getBadRequestErrorMockFn(cancelSubTaskMockFn(id), options)()

export const mockCancelSubTaskServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(cancelSubTaskMockFn(id), options)()
