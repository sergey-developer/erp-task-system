import { GetEquipmentRelocationHistorySuccessResponse } from 'features/warehouse/models'
import { getEquipmentRelocationHistoryUrl } from 'features/warehouse/utils/equipment'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentRelocationHistoryMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getEquipmentRelocationHistoryUrl(id))

export const mockGetEquipmentRelocationHistorySuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetEquipmentRelocationHistorySuccessResponse>>,
) => getSuccessMockFn(getEquipmentRelocationHistoryMockFn(id), options)()

export const mockGetEquipmentRelocationHistoryForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentRelocationHistoryMockFn(id), options)()

export const mockGetEquipmentRelocationHistoryNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getEquipmentRelocationHistoryMockFn(id), options)()

export const mockGetEquipmentRelocationHistoryServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentRelocationHistoryMockFn(id), options)()
