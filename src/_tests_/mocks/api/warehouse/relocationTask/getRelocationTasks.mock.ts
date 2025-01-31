import { RelocationTaskApiEnum } from 'features/warehouse/constants/relocationTask'
import { GetRelocationTasksSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationTasksMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, RelocationTaskApiEnum.GetRelocationTasks)

export const mockGetRelocationTasksSuccess = (
  options?: Partial<ResponseResolverOptions<GetRelocationTasksSuccessResponse>>,
) => getSuccessMockFn(getRelocationTasksMockFn(), options)()

export const mockGetRelocationTasksForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTasksMockFn(), options)()

export const mockGetRelocationTasksServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getRelocationTasksMockFn(), options)()
