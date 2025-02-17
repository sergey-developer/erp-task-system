import { RelocationTasksApiPathsEnum } from 'features/relocationTasks/api/constants'
import { GetRelocationTasksResponse } from 'features/relocationTasks/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getRelocationTasksMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, RelocationTasksApiPathsEnum.GetRelocationTasks)

export const mockGetRelocationTasksSuccess = (
  options?: Partial<ResponseResolverOptions<GetRelocationTasksResponse>>,
) => getSuccessMockFn(getRelocationTasksMockFn(), options)()

export const mockGetRelocationTasksForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationTasksMockFn(), options)()

export const mockGetRelocationTasksServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getRelocationTasksMockFn(), options)()
