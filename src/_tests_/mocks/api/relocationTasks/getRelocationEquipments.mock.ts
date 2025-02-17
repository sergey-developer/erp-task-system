import { makeGetRelocationEquipmentsApiPath } from 'features/relocationTasks/api/helpers'
import { GetRelocationEquipmentsResponse } from 'features/relocationTasks/api/schemas'
import { RequestWithRelocationTask } from 'features/relocationTasks/api/types'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getRelocationEquipmentsMockFn = ({ relocationTaskId }: RequestWithRelocationTask) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetRelocationEquipmentsApiPath({ relocationTaskId }))

export const mockGetRelocationEquipmentsSuccess = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<GetRelocationEquipmentsResponse>>,
) => getSuccessMockFn(getRelocationEquipmentsMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentsForbiddenError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getRelocationEquipmentsMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentsNotFoundError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getRelocationEquipmentsMockFn({ relocationTaskId }), options)()

export const mockGetRelocationEquipmentsServerError = (
  { relocationTaskId }: RequestWithRelocationTask,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getRelocationEquipmentsMockFn({ relocationTaskId }), options)()
