import { InventorizationApiEnum } from 'modules/warehouse/constants/inventorization'
import { CreateInventorizationSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createInventorizationMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InventorizationApiEnum.CreateInventorization)

export const mockCreateInventorizationSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInventorizationSuccessResponse>>,
) => getSuccessMockFn(createInventorizationMockFn(), options)()
