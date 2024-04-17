import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import { GetInventorizationsSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

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
  options?: Partial<ResponseResolverOptions<GetInventorizationsSuccessResponse>>,
) => getSuccessMockFn(getInventorizationsMockFn(), options)()

export const mockGetInventorizationsForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getInventorizationsMockFn(), options)()

export const mockGetInventorizationsServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getInventorizationsMockFn(), options)()
