import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import { GetEquipmentCatalogListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentCatalogListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentApiEnum.GetEquipmentCatalogList)

export const mockGetEquipmentCatalogListSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentCatalogListSuccessResponse>>,
) => getSuccessMockFn(getEquipmentCatalogListMockFn(), options)()

export const mockGetEquipmentCatalogListServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentCatalogListMockFn(), options)()
