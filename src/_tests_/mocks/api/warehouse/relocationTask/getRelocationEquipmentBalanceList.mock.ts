import { getRelocationEquipmentBalanceListUrl } from 'features/relocationTasks/api/helpers'
import { GetRelocationEquipmentBalanceListResponse } from 'features/warehouse/models'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationEquipmentBalanceListMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationEquipmentBalanceListUrl(id))

export const mockGetRelocationEquipmentBalanceListSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetRelocationEquipmentBalanceListResponse>>,
) => getSuccessMockFn(getRelocationEquipmentBalanceListMockFn(id), options)()

export const mockGetRelocationEquipmentBalanceListForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationEquipmentBalanceListMockFn(id), options)()

export const mockGetRelocationEquipmentBalanceListNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationEquipmentBalanceListMockFn(id), options)()

export const mockGetRelocationEquipmentBalanceListServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationEquipmentBalanceListMockFn(id), options)()
