import { GetInventorizationSuccessResponse } from 'modules/warehouse/models'
import { InventorizationRequestArgs } from 'modules/warehouse/types'
import { makeGetInventorizationUrl } from 'modules/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationMockFn = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationUrl({ inventorizationId }))

export const mockGetInventorizationSuccess = (
  { inventorizationId }: Pick<InventorizationRequestArgs, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<GetInventorizationSuccessResponse>>,
) => getSuccessMockFn(getInventorizationMockFn({ inventorizationId }), options)()
