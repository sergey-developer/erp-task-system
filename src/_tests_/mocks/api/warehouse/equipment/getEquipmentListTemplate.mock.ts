import { EquipmentApiEnum } from 'modules/warehouse/constants/equipment'
import { GetEquipmentListTemplateSuccessResponse } from 'modules/warehouse/models'

import { HttpMethodEnum } from 'shared/constants/http'

import { getRequestMockFn, getServerErrorMockFn, getSuccessMockFn } from '_tests_/mocks/request'
import { ResponseResolverOptions } from '_tests_/mocks/response'

const getEquipmentListTemplateMockFn = () =>
  getRequestMockFn(HttpMethodEnum.Get, EquipmentApiEnum.GetEquipmentListTemplate)

export const mockGetEquipmentListTemplateSuccess = (
  options?: Partial<ResponseResolverOptions<GetEquipmentListTemplateSuccessResponse>>,
) => getSuccessMockFn(getEquipmentListTemplateMockFn(), options)()

export const mockGetEquipmentListTemplateServerError = (
  options?: Partial<ResponseResolverOptions>,
) => getServerErrorMockFn(getEquipmentListTemplateMockFn(), options)()
