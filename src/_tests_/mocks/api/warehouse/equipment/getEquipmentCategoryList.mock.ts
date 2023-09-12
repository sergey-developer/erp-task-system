import { GetEquipmentCategoryListSuccessResponse } from 'modules/warehouse/models'
import { EquipmentApiEnum } from 'modules/warehouse/services/equipmentApiService'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentCategoryListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentApiEnum.GetEquipmentCategoryList)

export const mockGetEquipmentCategoryListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentCategoryListSuccessResponse>>,
) => getSuccessMockFn(getEquipmentCategoryListMockFn(), options)()

export const mockGetEquipmentCategoryListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentCategoryListMockFn(), options)()
