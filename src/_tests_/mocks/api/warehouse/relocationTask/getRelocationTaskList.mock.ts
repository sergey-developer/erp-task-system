import { RelocationTaskApiEnum } from 'modules/warehouse/constants/relocationTask'
import { GetRelocationTaskListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTaskListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, RelocationTaskApiEnum.GetRelocationTaskList)

export const mockGetRelocationTaskListSuccess = (
  options?: Partial<ResponseResolverOptions<GetRelocationTaskListSuccessResponse>>,
) => getSuccessMockFn(getRelocationTaskListMockFn(), options)()

export const mockGetRelocationTaskListForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTaskListMockFn(), options)()

export const mockGetRelocationTaskListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getRelocationTaskListMockFn(), options)()
