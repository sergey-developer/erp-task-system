import { InventorizationApiEnum } from 'features/warehouse/constants/inventorization'
import { GetInventorizationsResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'

import {
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationsMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, InventorizationApiEnum.GetInventorizations)

export const mockGetInventorizationsSuccess = (
  options?: Partial<ResponseResolverOptions<GetInventorizationsResponse>>,
) => getSuccessMockFn(getInventorizationsMockFn(), options)()

export const mockGetInventorizationsForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getInventorizationsMockFn(), options)()

export const mockGetInventorizationsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getInventorizationsMockFn(), options)()
