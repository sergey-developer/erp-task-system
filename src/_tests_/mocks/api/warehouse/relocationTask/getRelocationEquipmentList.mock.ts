import { GetRelocationEquipmentListSuccessResponse } from 'modules/warehouse/models'
import { RelocationTaskRequestArgs } from 'modules/warehouse/types'
import { getRelocationEquipmentListUrl } from 'modules/warehouse/utils/relocationTask'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationEquipmentListMockFn = ({ relocationTaskId }: RelocationTaskRequestArgs) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationEquipmentListUrl({ relocationTaskId }))

export const mockGetRelocationEquipmentListSuccess = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions<GetRelocationEquipmentListSuccessResponse>>,
) => getSuccessMockFn(getRelocationEquipmentListMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentListForbiddenError = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationEquipmentListMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentListNotFoundError = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationEquipmentListMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentListServerError = (
  { relocationTaskId }: RelocationTaskRequestArgs,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationEquipmentListMockFn({ relocationTaskId }), options)()
