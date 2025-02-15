import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { CreateEquipmentResponse } from 'features/equipments/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createEquipmentMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, EquipmentsApiPathsEnum.CreateEquipment)

export const mockCreateEquipmentSuccess = (
  options?: Partial<ResponseResolverOptions<CreateEquipmentResponse>>,
) => getSuccessMockFn(createEquipmentMockFn(), options)()
