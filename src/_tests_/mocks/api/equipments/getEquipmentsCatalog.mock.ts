import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { GetEquipmentsCatalogResponse } from 'features/equipments/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getEquipmentsCatalogMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsApiPathsEnum.GetEquipmentsCatalog)

export const mockGetEquipmentsCatalogSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentsCatalogResponse>>,
) => getSuccessMockFn(getEquipmentsCatalogMockFn(), options)()
