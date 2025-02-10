import { GetWarehouseMSISuccessResponse } from 'features/user/api/dto'
import { getWarehouseMSIUrl } from 'features/user/utils'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getWarehouseMSIMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getWarehouseMSIUrl(id))

export const mockGetWarehouseMSISuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetWarehouseMSISuccessResponse>>,
) => getSuccessMockFn(getWarehouseMSIMockFn(id), options)()

export const mockGetWarehouseMSINotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getWarehouseMSIMockFn(id), options)()

export const mockGetWarehouseMSIServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getWarehouseMSIMockFn(id), options)()
