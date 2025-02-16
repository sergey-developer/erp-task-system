import { RequestWithEquipment } from 'features/equipments/api/types'
import { makeGetInventorizationEquipmentApiPath } from 'features/inventorizations/api/helpers'
import { GetInventorizationEquipmentResponse } from 'features/inventorizations/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getInventorizationEquipmentMockFn = ({ equipmentId }: RequestWithEquipment) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetInventorizationEquipmentApiPath({ equipmentId }))

export const mockGetInventorizationEquipmentSuccess = (
  { equipmentId }: RequestWithEquipment,
  options?: Partial<ResponseResolverOptions<GetInventorizationEquipmentResponse>>,
) => getSuccessMockFn(getInventorizationEquipmentMockFn({ equipmentId }), options)()
