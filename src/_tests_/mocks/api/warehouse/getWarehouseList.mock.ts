import { WarehouseApiEnum } from 'modules/warehouse/constants'
import { GetWarehouseListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import {
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
  ResponseResolverOptions,
} from '_tests_/mocks/api'

const getWarehouseListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WarehouseApiEnum.GetWarehouseList)

export const mockGetWarehouseListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWarehouseListSuccessResponse>>,
) => getSuccessMockFn(getWarehouseListMockFn(), options)()

export const mockGetWarehouseListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWarehouseListMockFn(), options)()
