import { makeGetInventorizationEquipmentUrl } from 'features/inventorizations/api/helpers'
import { GetInventorizationEquipmentResponse } from 'features/warehouses/api/dto'
import { RequestWithEquipment } from 'features/warehouses/types'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationEquipmentMockFn = ({ equipmentId }: RequestWithEquipment) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationEquipmentUrl({ equipmentId }))

export const mockGetInventorizationEquipmentSuccess = (
  { equipmentId }: RequestWithEquipment,
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentMockFn({ equipmentId }), options)()
