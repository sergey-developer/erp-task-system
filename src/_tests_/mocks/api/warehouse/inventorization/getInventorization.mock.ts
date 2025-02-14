import { GetInventorizationResponse } from 'features/warehouse/models'
import { InventorizationRequestArgs } from 'features/warehouse/types'
import { makeGetInventorizationUrl } from 'features/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationMockFn = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationUrl({ inventorizationId }))

export const mockGetInventorizationSuccess = (
  { inventorizationId }: Pick<InventorizationRequestArgs, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<GetInventorizationResponse>>,
) => getSuccessMockFn(getInventorizationMockFn({ inventorizationId }), options)()
