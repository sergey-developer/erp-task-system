import { WarehouseApiEnum } from 'modules/warehouse/constants'
import { GetWarehouseListSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehouseListMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, WarehouseApiEnum.GetWarehouseList)

export const mockGetWarehouseListSuccess = (
  options?: Partial<ResponseResolverOptions<GetWarehouseListSuccessResponse>>,
) => getSuccessMockFn(getWarehouseListMockFn(), options)()

export const mockGetWarehouseListServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(getWarehouseListMockFn(), options)()
