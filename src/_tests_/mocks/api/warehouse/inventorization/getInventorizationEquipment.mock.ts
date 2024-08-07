import { GetInventorizationEquipmentSuccessResponse } from 'modules/warehouse/models'
import { EquipmentRequestArgs } from 'modules/warehouse/types'
import { makeGetInventorizationEquipmentUrl } from 'modules/warehouse/utils/inventorization'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationEquipmentMockFn = ({ equipmentId }: EquipmentRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationEquipmentUrl({ equipmentId }))

export const mockGetInventorizationEquipmentSuccess = (
  { equipmentId }: EquipmentRequestArgs,
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentSuccessResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentMockFn({ equipmentId }), options)()
