import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import { CreateInventorizationSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createInventorizationMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InventorizationApiEnum.CreateInventorization)

export const mockCreateInventorizationSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInventorizationSuccessResponse>>,
) => getSuccessMockFn(createInventorizationMockFn(), options)()

export const mockCreateInventorizationForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(createInventorizationMockFn(), options)()

export const mockCreateInventorizationBadRequestError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getBadRequestErrorMockFn(createInventorizationMockFn(), options)()

export const mockCreateInventorizationServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(createInventorizationMockFn(), options)()
