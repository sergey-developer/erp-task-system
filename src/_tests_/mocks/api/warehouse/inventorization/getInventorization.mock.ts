import { GetInventorizationResponse } from 'features/warehouse/models'
import { RequestWithInventorization } from 'features/warehouse/types'
import { makeGetInventorizationUrl } from 'features/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationMockFn = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationUrl({ inventorizationId }))

export const mockGetInventorizationSuccess = (
  { inventorizationId }: Pick<RequestWithInventorization, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<GetInventorizationResponse>>,
) => getSuccessMockFn(getInventorizationMockFn({ inventorizationId }), options)()
