import { GetEquipmentSuccessResponse } from 'modules/warehouse/models'
import { getEquipmentUrl } from 'modules/warehouse/utils'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/api'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentMockFn = (id: number) => getRequestMockFn(HttpMethodEnum.Get, getEquipmentUrl(id))

export const mockGetEquipmentSuccess = (
  id: number,
  options?: Partial<ResponseResolverOptions<GetEquipmentSuccessResponse>>,
) => getSuccessMockFn(getEquipmentMockFn(id), options)()

export const mockGetEquipmentForbiddenError = (
  id: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentMockFn(id), options)()

export const mockGetEquipmentNotFoundError = (
  id: number,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getEquipmentMockFn(id), options)()

export const mockGetEquipmentServerError = (
  id: number,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentMockFn(id), options)()
