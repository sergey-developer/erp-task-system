import { EquipmentsEndpointsEnum } from 'features/equipments/api/constants'
import { GetEquipmentCategoriesResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentCategoryListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsEndpointsEnum.GetEquipmentCategories)

export const mockGetEquipmentCategoryListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentCategoriesResponse>>,
) => getSuccessMockFn(getEquipmentCategoryListMockFn(), options)()
