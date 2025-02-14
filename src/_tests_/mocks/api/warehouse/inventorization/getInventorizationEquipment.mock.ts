import { GetInventorizationEquipmentResponse } from 'features/warehouse/models'
import { EquipmentRequestArgs } from 'features/warehouse/types'
import { makeGetInventorizationEquipmentUrl } from 'features/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationEquipmentMockFn = ({ equipmentId }: EquipmentRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationEquipmentUrl({ equipmentId }))

export const mockGetInventorizationEquipmentSuccess = (
  { equipmentId }: EquipmentRequestArgs,
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentMockFn({ equipmentId }), options)()
