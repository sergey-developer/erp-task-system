import { getRelocationEquipmentListUrl } from 'features/relocationTasks/api/helpers'
import { GetRelocationEquipmentsResponse } from 'features/warehouses/api/dto'
import { RequestWithRelocationTask } from 'features/warehouses/types'

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
  options?: Partial<ResponseResolverOptions<GetRelocationEquipmentsResponse>>,
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
