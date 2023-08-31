import { GetWarehouseSuccessResponse } from 'modules/warehouse/models'
import { getWarehouseUrl } from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehouseMockFn = (warehouseId: number) =>
  getRequestMockFn(HttpMethodEnum.Get, getWarehouseUrl(warehouseId))

export const mockGetWarehouseSuccess = (
  warehouseId: number,
  options?: Partial<ResponseResolverOptions<GetWarehouseSuccessResponse>>,
) => getSuccessMockFn(getWarehouseMockFn(warehouseId), options)()

export const mockGetWarehouseNotFoundError = (
  warehouseId: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getWarehouseMockFn(warehouseId), options)()

export const mockGetWarehouseServerError = (
  warehouseId: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getWarehouseMockFn(warehouseId), options)()
