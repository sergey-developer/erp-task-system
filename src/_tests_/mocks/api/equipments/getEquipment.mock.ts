import { makeGetEquipmentApiPath } from 'features/equipments/api/helpers'
import { GetEquipmentResponse } from 'features/equipments/api/schemas'

import { ErrorData } from 'shared/api/baseApi'
import { HttpMethodEnum } from 'shared/constants/http'
import { IdType } from 'shared/types/common'

import {
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/api/request'
import { ResponseResolverOptions } from '_tests_/mocks/api/response'

const getEquipmentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Get, makeGetEquipmentApiPath(id))

export const mockGetEquipmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<GetEquipmentResponse>>,
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
