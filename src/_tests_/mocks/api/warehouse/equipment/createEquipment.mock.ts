import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentBadRequestErrorResponse,
  CreateEquipmentSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getBadRequestErrorMockFn,
  getForbiddenErrorMockFn,
  getRequestMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createEquipmentMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, EquipmentApiEnum.CreateEquipment)

export const mockCreateEquipmentSuccess = (
  options?: Partial<ResponseResolverOptions<CreateEquipmentSuccessResponse>>,
) => getSuccessMockFn(createEquipmentMockFn(), options)()

export const mockCreateEquipmentBadRequestError = <
  T extends CreateEquipmentBadRequestErrorResponse,
>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createEquipmentMockFn(), options)()

export const mockCreateEquipmentForbiddenError = (
  options?: Partial<ResponseResolverOptions<ErrorData>>,
) => getForbiddenErrorMockFn(createEquipmentMockFn(), options)()
