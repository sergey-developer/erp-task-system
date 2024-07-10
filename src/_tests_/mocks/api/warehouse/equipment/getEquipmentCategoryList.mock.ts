import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import { GetEquipmentCategoriesSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentCategoryListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentApiEnum.GetEquipmentCategories)

export const mockGetEquipmentCategoryListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentCategoriesSuccessResponse>>,
) => getSuccessMockFn(getEquipmentCategoryListMockFn(), options)()
