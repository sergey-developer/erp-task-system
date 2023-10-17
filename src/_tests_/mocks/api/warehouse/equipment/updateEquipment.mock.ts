import {
  UpdateEquipmentBadRequestErrorResponse,
  UpdateEquipmentSuccessResponse,
} from 'modules/warehouse/models'
import { updateEquipmentUrl } from 'modules/warehouse/utils/equipment'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getNotFoundErrorMockFn,
  getRequestMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const updateEquipmentMockFn = (id: IdType) =>
  getRequestMockFn(HttpMethodEnum.Post, updateEquipmentUrl(id))

export const mockUpdateEquipmentSuccess = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<UpdateEquipmentSuccessResponse>>,
) => getSuccessMockFn(updateEquipmentMockFn(id), options)()

export const mockUpdateEquipmentBadRequestError = <
  T extends UpdateEquipmentBadRequestErrorResponse,
>(
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(updateEquipmentMockFn(id), options)()

export const mockUpdateEquipmentNotFoundError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getNotFoundErrorMockFn(updateEquipmentMockFn(id), options)()

export const mockUpdateEquipmentForbiddenError = (
  id: IdType,
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(updateEquipmentMockFn(id), options)()
