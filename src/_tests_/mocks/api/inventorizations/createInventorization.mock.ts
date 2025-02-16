import { InventorizationsApiPathsEnum } from 'features/inventorizations/api/constants'
import { CreateInventorizationResponse } from 'features/inventorizations/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createInventorizationMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, InventorizationsApiPathsEnum.CreateInventorization)

export const mockCreateInventorizationSuccess = (
  options?: Partial<ResponseResolverOptions<CreateInventorizationResponse>>,
) => getSuccessMockFn(createInventorizationMockFn(), options)()
