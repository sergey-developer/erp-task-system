import { makeGetInventorizationApiPath } from 'features/inventorizations/api/helpers'
import { GetInventorizationResponse } from 'features/inventorizations/api/schemas'
import { RequestWithInventorization } from 'features/inventorizations/api/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationMockFn = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationApiPath({ inventorizationId }))

export const mockGetInventorizationSuccess = (
  { inventorizationId }: Pick<RequestWithInventorization, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<GetInventorizationResponse>>,
) => getSuccessMockFn(getInventorizationMockFn({ inventorizationId }), options)()
