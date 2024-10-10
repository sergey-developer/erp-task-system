import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import { CreateEquipmentSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createEquipmentMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, EquipmentApiEnum.CreateEquipment)

export const mockCreateEquipmentSuccess = (
  options?: Partial<ResponseResolverOptions<CreateEquipmentSuccessResponse>>,
) => getSuccessMockFn(createEquipmentMockFn(), options)()
