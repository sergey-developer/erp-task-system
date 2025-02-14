import { WarehousesEndpointsEnum } from 'features/warehouse/constants/warehouse'
import { GetWarehouseListResponse } from 'features/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehouseListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WarehousesEndpointsEnum.GetWarehouseList)

export const mockGetWarehouseListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWarehouseListResponse>>,
) => getSuccessMockFn(getWarehouseListMockFn(), options)()

export const mockGetWarehouseListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWarehouseListMockFn(), options)()
