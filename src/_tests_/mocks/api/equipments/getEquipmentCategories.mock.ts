import { EquipmentsApiPathsEnum } from 'features/equipments/api/constants'
import { GetEquipmentCategoriesResponse } from 'features/equipments/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getEquipmentCategoriesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentsApiPathsEnum.GetEquipmentCategories)

export const mockGetEquipmentCategoriesSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentCategoriesResponse>>,
) => getSuccessMockFn(getEquipmentCategoriesMockFn(), options)()
