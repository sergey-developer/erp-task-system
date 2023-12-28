import { WarehouseApiEnum } from 'modules/warehouse/constants/warehouse'
import { GetWarehouseMySuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehouseMyMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WarehouseApiEnum.GetWarehouseMy)

export const mockGetWarehouseMySuccess = (
  options?: Partial<ResponseResolverOptions<GetWarehouseMySuccessResponse>>,
) => getSuccessMockFn(getWarehouseMyMockFn(), options)()

export const mockGetWarehouseMyNotFoundError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getWarehouseMyMockFn(), options)()

export const mockGetWarehouseMyServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWarehouseMyMockFn(), options)()
