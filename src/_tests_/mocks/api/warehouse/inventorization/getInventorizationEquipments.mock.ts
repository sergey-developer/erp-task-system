import { GetInventorizationEquipmentsResponse } from 'features/warehouse/models'
import { RequestWithInventorization } from 'features/warehouse/types'
import { makeGetInventorizationEquipmentsUrl } from 'features/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationEquipmentsMockFn = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationEquipmentsUrl({ inventorizationId }))

export const mockGetInventorizationEquipmentsSuccess = (
  { inventorizationId }: Pick<RequestWithInventorization, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentsResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentsMockFn({ inventorizationId }), options)()
