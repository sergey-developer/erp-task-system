import { GetInventorizationEquipmentsSuccessResponse } from 'features/warehouse/models'
import { InventorizationRequestArgs } from 'features/warehouse/types'
import { makeGetInventorizationEquipmentsUrl } from 'features/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationEquipmentsMockFn = ({
  inventorizationId,
}: Pick<InventorizationRequestArgs, 'inventorizationId'>) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationEquipmentsUrl({ inventorizationId }))

export const mockGetInventorizationEquipmentsSuccess = (
  { inventorizationId }: Pick<InventorizationRequestArgs, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentsSuccessResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentsMockFn({ inventorizationId }), options)()
