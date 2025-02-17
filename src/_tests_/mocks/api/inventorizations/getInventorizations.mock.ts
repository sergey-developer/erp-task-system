import { InventorizationsApiPathsEnum } from 'features/inventorizations/api/constants'
import { GetInventorizationsResponse } from 'features/inventorizations/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getInventorizationsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InventorizationsApiPathsEnum.GetInventorizations)

export const mockGetInventorizationsSuccess = (
  options?: Partial<ResponseResolverOptions<GetInventorizationsResponse>>,
) => getSuccessMockFn(getInventorizationsMockFn(), options)()

export const mockGetInventorizationsForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getInventorizationsMockFn(), options)()

export const mockGetInventorizationsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getInventorizationsMockFn(), options)()
