import { WarehousesApiPathsEnum } from 'features/warehouses/api/constants'
import { GetWarehousesResponse } from 'features/warehouses/api/schemas'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehousesMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WarehousesApiPathsEnum.GetWarehouses)

export const mockGetWarehousesSuccess = (
  options?: Partial<ResponseResolverOptions<GetWarehousesResponse>>,
) => getSuccessMockFn(getWarehousesMockFn(), options)()
