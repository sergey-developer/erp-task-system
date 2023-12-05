import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import {
  CreateEquipmentBadRequestErrorResponse,
  CreateEquipmentsByFileTemplateSuccessResponse,
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

const createEquipmentsByFileTemplateMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Post, EquipmentApiEnum.CreateEquipmentsByFileTemplate)

export const mockCreateEquipmentsByFileTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<CreateEquipmentsByFileTemplateSuccessResponse>>,
) => getSuccessMockFn(createEquipmentsByFileTemplateMockFn(), options)()

export const mockCreateEquipmentsByFileTemplateBadRequestError = <
  T extends CreateEquipmentBadRequestErrorResponse,
>(
  options?: Partial<ResponseResolverOptions<ErrorData<T>>>,
) => getBadRequestErrorMockFn(createEquipmentsByFileTemplateMockFn(), options)()

export const mockCreateEquipmentsByFileTemplateServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(createEquipmentsByFileTemplateMockFn(), options)()
