import { EquipmentApiEnum } from 'features/warehouse/constants/equipment'
import { GetEquipmentsCatalogSuccessResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentCatalogListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentApiEnum.GetEquipmentCatalogList)

export const mockGetEquipmentCatalogListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentsCatalogSuccessResponse>>,
) => getSuccessMockFn(getEquipmentCatalogListMockFn(), options)()
