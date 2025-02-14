import { GetRelocationEquipmentListResponse } from 'features/warehouse/models'
import { RequestWithRelocationTask } from 'features/warehouse/types'
import { getRelocationEquipmentListUrl } from 'features/warehouse/utils/relocationTask'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getRelocationEquipmentListMockFn = ({ relocationTaskId }: RequestWithRelocationTask) =>
  getRequestMockFn(HttpMethodEnum.Get, getRelocationEquipmentListUrl({ relocationTaskId }))

export const mockGetRelocationEquipmentListSuccess = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<GetRelocationEquipmentListResponse>>,
) => getSuccessMockFn(getRelocationEquipmentListMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentListForbiddenError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationEquipmentListMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentListNotFoundError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationEquipmentListMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentListServerError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationEquipmentListMockFn({ relocationTaskId }), options)()
