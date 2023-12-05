import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentBadRequestErrorResponse,
  CreateEquipmentsByFileSuccessResponse,
} from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'
import { ErrorData } from 'shared/services/baseApi'

import {
  getBadRequestErrorMockFn,
  getRequestMockFn,
  getServerErrorMockFn,
  getSuccessMockFn,
} from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const createEquipmentsByFileMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, EquipmentApiEnum.CreateEquipmentsByFile)

export const mockCreateEquipmentsByFileSuccess = (
  options?: Partial<ResponseResolverOptions<CreateEquipmentsByFileSuccessResponse>>,
) => getSuccessMockFn(createEquipmentsByFileMockFn(), options)()

export const mockCreateEquipmentsByFileBadRequestError = <
  T extends CreateEquipmentBadRequestErrorResponse,
>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createEquipmentsByFileMockFn(), options)()

export const mockCreateEquipmentsByFileServerError = (options?: Partial<ResponseResolverOptions>) =>
  getServerErrorMockFn(createEquipmentsByFileMockFn(), options)()
