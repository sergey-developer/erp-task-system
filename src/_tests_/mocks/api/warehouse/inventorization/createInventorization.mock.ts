import { InventorizationsEndpointsEnum } from 'features/inventorizations/constants'
import { CreateInventorizationResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createInventorizationMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InventorizationsEndpointsEnum.CreateInventorization)

export const mockCreateInventorizationSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInventorizationResponse>>,
) => getSuccessMockFn(createInventorizationMockFn(), options)()
