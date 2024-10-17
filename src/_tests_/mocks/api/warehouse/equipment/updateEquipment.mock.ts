import { UpdateEquipmentSuccessResponse } from 'modules/warehouse/models'
import { updateEquipmentUrl } from 'modules/warehouse/utils/equipment'

import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateEquipmentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, updateEquipmentUrl(id))

export const mockUpdateEquipmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateEquipmentSuccessResponse>>,
) => getSuccessMockFn(updateEquipmentMockFn(id), options)()
