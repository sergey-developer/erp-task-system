import { GetEquipmentSuccessResponse } from 'features/warehouse/models'
import { getEquipmentUrl } from 'features/warehouse/utils/equipment'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentMockFn = (id: IdType) => getRequestMockFn(HttpMethodEnum.Get, getEquipmentUrl(id))

export const mockGetEquipmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetEquipmentSuccessResponse>>,
) => getSuccessMockFn(getEquipmentMockFn(id), options)()

export const mockGetEquipmentForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(getEquipmentMockFn(id), options)()

export const mockGetEquipmentNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(getEquipmentMockFn(id), options)()

export const mockGetEquipmentServerError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentMockFn(id), options)()
