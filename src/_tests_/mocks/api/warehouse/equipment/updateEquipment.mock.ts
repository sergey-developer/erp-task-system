import { makeUpdateEquipmentEndpoint } from 'features/equipments/helpers'
import { UpdateEquipmentResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateEquipmentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, makeUpdateEquipmentEndpoint(id))

export const mockUpdateEquipmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateEquipmentResponse>>,
) => getSuccessMockFn(updateEquipmentMockFn(id), options)()
