import { InventorizationApiEnum } from 'features/warehouse/constants/inventorization'
import { CreateInventorizationSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createInventorizationMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InventorizationApiEnum.CreateInventorization)

export const mockCreateInventorizationSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInventorizationSuccessResponse>>,
) => getSuccessMockFn(createInventorizationMockFn(), options)()
