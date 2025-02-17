import { makeGetWarehouseApiPath } from 'features/warehouses/api/helpers'
import { GetWarehouseResponse } from 'features/warehouses/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getWarehouseMockFn = (warehouseId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetWarehouseApiPath(warehouseId))

export const mockGetWarehouseSuccess = (
  warehouseId: IdType,
  options?: Partial<ResponseResolverOptions<GetWarehouseResponse>>,
) => getSuccessMockFn(getWarehouseMockFn(warehouseId), options)()

export const mockGetWarehouseNotFoundError = (
  warehouseId: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getWarehouseMockFn(warehouseId), options)()

export const mockGetWarehouseServerError = (
  warehouseId: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getWarehouseMockFn(warehouseId), options)()
