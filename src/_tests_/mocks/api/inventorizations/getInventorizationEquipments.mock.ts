import { makeGetInventorizationEquipmentsApiPath } from 'features/inventorizations/api/helpers'
import { GetInventorizationEquipmentsResponse } from 'features/inventorizations/api/schemas'
import { RequestWithInventorization } from 'features/inventorizations/api/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getInventorizationEquipmentsMockFn = ({
  inventorizationId,
}: Pick<RequestWithInventorization, 'inventorizationId'>) =>
  getRequestMockFn(
    HttpMethodEnum.Get,
    makeGetInventorizationEquipmentsApiPath({ inventorizationId }),
  )

export const mockGetInventorizationEquipmentsSuccess = (
  { inventorizationId }: Pick<RequestWithInventorization, 'inventorizationId'>,
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentsResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentsMockFn({ inventorizationId }), options)()
