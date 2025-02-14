import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { GetEquipmentsCatalogResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentCatalogListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsApiPathsEnum.GetEquipmentsCatalog)

export const mockGetEquipmentCatalogListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentsCatalogResponse>>,
) => getSuccessMockFn(getEquipmentCatalogListMockFn(), options)()
