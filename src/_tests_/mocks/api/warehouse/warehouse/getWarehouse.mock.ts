import { GetWarehouseResponse } from 'features/warehouse/models'
import { getWarehouseUrl } from 'features/warehouse/utils/warehouse'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'

import {
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehouseMockFn = (warehouseId: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getWarehouseUrl(warehouseId))

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
