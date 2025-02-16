import { WarehousesApiPathsEnum } from 'features/warehouses/api/constants'
import { GetWarehousesResponse } from 'features/warehouses/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehouseListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WarehousesApiPathsEnum.GetWarehouses)

export const mockGetWarehouseListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWarehousesResponse>>,
) => getSuccessMockFn(getWarehouseListMockFn(), options)()

export const mockGetWarehouseListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWarehouseListMockFn(), options)()
